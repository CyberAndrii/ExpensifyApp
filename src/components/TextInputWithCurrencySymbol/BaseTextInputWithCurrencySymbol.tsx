import React, {useMemo} from 'react';
import type {NativeSyntheticEvent, TextInputSelectionChangeEventData} from 'react-native';
import AmountTextInput from '@components/AmountTextInput';
import CurrencySymbolButton from '@components/CurrencySymbolButton';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as CurrencyUtils from '@libs/CurrencyUtils';
import type {BaseTextInputRef} from '@src/components/TextInput/BaseTextInput/types';
import type BaseTextInputWithCurrencySymbolProps from './types';
import {InputFilter} from "@components/TextInput/useInputFilters/types";
import CONST from "@src/CONST";

function BaseTextInputWithCurrencySymbol(
    {
        selectedCurrencyCode,
        onCurrencyButtonPress = () => {},
        onChangeAmount = () => {},
        formattedAmount,
        placeholder,
        selection,
        onSelectionChange = () => {},
        onKeyPress = () => {},
        isCurrencyPressable = true,
        hideCurrencySymbol = false,
        extraSymbol,
        style,
        ...rest
    }: BaseTextInputWithCurrencySymbolProps,
    ref: React.ForwardedRef<BaseTextInputRef>,
) {
    const {fromLocaleDigit} = useLocalize();
    const currencySymbol = CurrencyUtils.getLocalizedCurrencySymbol(selectedCurrencyCode);
    const isCurrencySymbolLTR = CurrencyUtils.isCurrencySymbolLTR(selectedCurrencyCode);
    const styles = useThemeStyles();

    const inputFilters: InputFilter[] = useMemo(() => [
        {type: 'DecimalNumber', maxDigitsBeforeDecimal: CONST.IOU.AMOUNT_MAX_LENGTH, maxDigitsAfterDecimal: 2}
    ], [])

    const currencySymbolButton = !hideCurrencySymbol && (
        <CurrencySymbolButton
            currencySymbol={currencySymbol ?? ''}
            onCurrencyButtonPress={onCurrencyButtonPress}
            isCurrencyPressable={isCurrencyPressable}
        />
    );

    const amountTextInput = (
        <AmountTextInput
            formattedAmount={formattedAmount}
            onChangeAmount={onChangeAmount}
            inputFilters={inputFilters}
            placeholder={placeholder}
            ref={ref}
            selection={selection}
            onSelectionChange={(event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
                onSelectionChange(event);
            }}
            onKeyPress={onKeyPress}
            style={[styles.pr1, style]}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    );

    if (isCurrencySymbolLTR) {
        return (
            <>
                {currencySymbolButton}
                {amountTextInput}
                {extraSymbol}
            </>
        );
    }

    return (
        <>
            {amountTextInput}
            {currencySymbolButton}
            {extraSymbol}
        </>
    );
}

BaseTextInputWithCurrencySymbol.displayName = 'BaseTextInputWithCurrencySymbol';

export default React.forwardRef(BaseTextInputWithCurrencySymbol);
