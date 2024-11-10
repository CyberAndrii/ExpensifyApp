import React, {useMemo} from 'react';
import type {ForwardedRef} from 'react';
import useLocalize from '@hooks/useLocalize';
import {replaceAllDigits} from '@libs/MoneyRequestUtils';
import CONST from '@src/CONST';
import TextInput from './TextInput';
import type {BaseTextInputProps, BaseTextInputRef} from './TextInput/BaseTextInput/types';
import {InputFilter} from "@components/TextInput/useInputFilters/types";

type AmountFormProps = {
    /** Amount supplied by the FormProvider */
    value?: string;

    /** Callback to update the amount in the FormProvider */
    onInputChange?: (value: string) => void;
} & Partial<BaseTextInputProps>;

function AmountWithoutCurrencyForm(
    {value: amount, onInputChange, inputID, name, defaultValue, accessibilityLabel, role, label, ...rest}: AmountFormProps,
    ref: ForwardedRef<BaseTextInputRef>,
) {
    const {toLocaleDigit} = useLocalize();

    const formattedAmount = useMemo(
        () => (typeof amount === 'string' ? replaceAllDigits(amount, toLocaleDigit) : ''), 
        [amount, toLocaleDigit]
    );

    const inputFilters: InputFilter[] = useMemo(() => [
        {type: 'DecimalNumber', maxDigitsBeforeDecimal: CONST.IOU.AMOUNT_MAX_LENGTH, maxDigitsAfterDecimal: 2}
    ], [])

    return (
        <TextInput
            value={formattedAmount}
            onChangeText={onInputChange}
            inputFilters={inputFilters}
            inputID={inputID}
            name={name}
            label={label}
            defaultValue={defaultValue}
            accessibilityLabel={accessibilityLabel}
            role={role}
            ref={ref}
            keyboardType={CONST.KEYBOARD_TYPE.DECIMAL_PAD}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    );
}

AmountWithoutCurrencyForm.displayName = 'AmountWithoutCurrencyForm';

export default React.forwardRef(AmountWithoutCurrencyForm);
