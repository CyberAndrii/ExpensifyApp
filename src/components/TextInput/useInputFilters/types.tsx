type DecimalNumberFilter = {
    type: 'DecimalNumber';
    maxDigitsBeforeDecimal: number;
    maxDigitsAfterDecimal: number;
}

type InputFilter = DecimalNumberFilter;

export type {InputFilter};
