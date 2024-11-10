import {InputFilter} from "@components/TextInput/useInputFilters/types";

type InputFilterFunc = (currentValue: string, newValue: string) => string;

function getFilters(filters: InputFilter[]): InputFilterFunc[] {
    const filterFuncs: InputFilterFunc[] = [];

    filters.forEach((filter) => {
        if(filter.type === 'DecimalNumber') {
            filterFuncs.push(decimalNumberFilter(filter.maxDigitsBeforeDecimal, filter.maxDigitsAfterDecimal));
            return;
        }

        // Add more filters here

        throw new Error(`Input filter of type '${filter.type}' was not found`);
    });
    
    return filterFuncs;
}

function decimalNumberFilter(maxDigitsBeforeDecimal: number, maxDigitsAfterDecimal: number): InputFilterFunc {
    const pattern = new RegExp(`^\\d{0,${maxDigitsBeforeDecimal}}(\\.\\d{0,${maxDigitsAfterDecimal}})?$`);

    return (previousValue, newValue) => {
        let newInput = newValue.trim();

        newInput = newInput.replace(',', '.');

        if (newInput.startsWith('.')) {
            newInput = '0' + newInput;
        }

        if (pattern.test(newInput)) {
            return newInput;
        }

        return previousValue;
    }
}

export {getFilters};
export type {InputFilterFunc}
