import {useCallback} from "react";
import {InputFilter} from "./types";
import {getFilters, InputFilterFunc} from "@components/TextInput/useInputFilters/filters";

function useInputFilters(filters?: InputFilter[]): InputFilterFunc {
    // Unlike native, on web we have to invoke the filters manually
    return useCallback((currentValue, newValue) => {
        const filterFuncs = filters ? getFilters(filters) : null;

        if(!filterFuncs || filterFuncs.length == 0) {
            return newValue;
        }

        let filteredValue = currentValue;

        filterFuncs.forEach((filter) => {
            filteredValue = filter(filteredValue, newValue);
        });

        return filteredValue;
    }, [filters]);
}

export default useInputFilters;
