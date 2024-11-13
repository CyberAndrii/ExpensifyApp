package com.expensify.chat.inputFiltersModule;

import android.text.InputFilter;
import android.text.Spanned;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class DecimalNumberFilter implements InputFilter {

    private final StringBuilder newInput;
    private final Pattern pattern;

    public DecimalNumberFilter(int maxDigitsBeforeDecimal, int maxDigitsAfterDecimal) {
        newInput = new StringBuilder();
        pattern = Pattern.compile("^\\d{0," + maxDigitsBeforeDecimal + "}(\\.\\d{0," + maxDigitsAfterDecimal + "})?$");
    }

    @Override
    public CharSequence filter(CharSequence source, int start, int end, Spanned dest, int dstart, int dend) {
        newInput.setLength(0);

        newInput.append(dest, 0, dstart); // Append part before the new input
        newInput.append(source, start, source.length()); // Append the modified input
        newInput.append(dest, dend, dest.length()); // Append part after the new input

        int resultStart = dstart;
        int resultEnd = resultStart + source.length();

        // Replace comma with a decimal point
        for (int i = resultStart; i < resultEnd; i++) {
            if (newInput.charAt(i) == ',') {
                newInput.setCharAt(i, '.');
            }
        }

        // todo: fix bug when removing 0 on 0.34 makes it 00.34

        // Prepend "0" if the first character is a decimal point
        if (resultStart == 0 && ((newInput.length() > resultStart && newInput.charAt(resultStart) == '.') || (dest.length() > dend && dest.charAt(dend) == '.'))) {
            newInput.insert(resultStart, '0');
            resultEnd++;
        }

        Matcher matcher = pattern.matcher(newInput);

        if (!matcher.matches()) {
            return "";
        }

        return newInput.subSequence(resultStart, resultEnd);
    }
}
