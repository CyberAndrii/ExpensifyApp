import {MutableRefObject, useEffect} from "react";
import {TextInput, findNodeHandle, NativeModules} from "react-native";
import {InputFilter} from "./types";

const {InputFiltersModule} = NativeModules;

if(!InputFiltersModule) {
    throw new Error("Native module is missing. It might have been renamed or native code needs to be rebuilt");
}

function useInputFilters(ref: MutableRefObject<TextInput | null>, filters?: InputFilter[]) {
    useEffect(() => {
        const viewId = findNodeHandle(ref.current);

        if (viewId && filters && filters.length > 0) {
            const onError = (args: [string] | string) => {
                // Array of strings on iOS. String on Android
                const error = Array.isArray(args) ? args[0] : args;
                console.error(`An error occured while invoking native InputFilters module`, error);
            };

            // Call to native Java/Swift code
            InputFiltersModule.install(viewId, filters, onError);
        }

        // todo: clean up
        //return () => {
        //    InputFiltersModule.uninstall(viewId, filters);
        //};
    }, [ref.current, filters]);
}

export default useInputFilters;
