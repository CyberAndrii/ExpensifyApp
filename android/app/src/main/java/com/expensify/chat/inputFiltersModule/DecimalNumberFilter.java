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

    // Alternative implementation without using Regex.

    /*
    private final int maxDigitsBeforeDecimal;
    private final int maxDigitsAfterDecimal;

    private final StringBuilder newInput;

    public DecimalNumberFilter(int maxDigitsBeforeDecimal, int maxDigitsAfterDecimal) {
        this.maxDigitsBeforeDecimal = maxDigitsBeforeDecimal;
        this.maxDigitsAfterDecimal = maxDigitsAfterDecimal;
        newInput = new StringBuilder();
    }

    @Override
    public CharSequence filter(CharSequence source, int start, int end, Spanned dest, int dstart, int dend) {
        newInput.setLength(0);

        // left side - the text to the left of the inserted content
        // right side - the text to the right of the inserted content
        // middle - the text being inserted

        final int leftSideIndexOfDecimal = indexOf(dest, 0, dstart, '.');
        final int rightSideIndexOfDecimal = indexOf(dest, dend, dest.length(), '.');

        final boolean leftSideHasDecimal = leftSideIndexOfDecimal != -1;
        final boolean rightSideHasDecimal = rightSideIndexOfDecimal != -1;
        boolean middleHasDecimal = false;

        int digitsBeforeDecimal = leftSideHasDecimal ? leftSideIndexOfDecimal : dstart + (rightSideHasDecimal ? rightSideIndexOfDecimal - dend : 0);
        int digitsAfterDecimal = leftSideHasDecimal ? dstart - leftSideIndexOfDecimal + dest.length() - dend - 1 : (rightSideHasDecimal ? dest.length() - rightSideIndexOfDecimal : 0);

        for (int i = start; i < end; i++) {
            char currentChar = source.charAt(i);

            // Replace comma with a decimal point
            if (currentChar == ',') {
                currentChar = '.';
            }

            if (currentChar == '.') {
                // Reject pasting a text that includes a decimal if it already exist
                if (leftSideHasDecimal || rightSideHasDecimal) {
                    return "";
                }

                // Remove decimal point if already exists
                if (middleHasDecimal) {
                    continue;
                }

                middleHasDecimal = true;

                // Exit early
                newInput.append(currentChar);
                continue;
            }

            // Remove non-digit characters
            if (!Character.isDigit(currentChar)) {
                continue;
            }

            final boolean isWritingWholePart = !leftSideHasDecimal && !middleHasDecimal;

            // Remove digits that exceed the specified length limit
            if (isWritingWholePart) {
                if (digitsBeforeDecimal + 1 > maxDigitsBeforeDecimal) {
                    continue;
                }
                digitsBeforeDecimal++;
            } else {
                if (digitsAfterDecimal + 1 > maxDigitsAfterDecimal) {
                    continue;
                }
                digitsAfterDecimal++;
            }

            newInput.append(currentChar);
        }

        // Prepend with "0" if the first character is a decimal point
        if (dstart == 0 && ((newInput.length() > 0 && newInput.charAt(0) == '.') || (dest.length() > dend && dest.charAt(dend) == '.'))) {
            digitsBeforeDecimal++;
            newInput.insert(0, '0');
        }

        return newInput;
    }

    private int indexOf(CharSequence source, int start, int end, char charToFind) {
        for (int i = start; i < end; i++) {
            char currentChar = source.charAt(i);

            if (currentChar == charToFind) {
                return i;
            }
        }

        return -1;
    }
    */
}
