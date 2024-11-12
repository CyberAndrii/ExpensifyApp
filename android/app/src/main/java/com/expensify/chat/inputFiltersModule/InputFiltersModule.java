package com.expensify.chat.inputFiltersModule;

import androidx.annotation.NonNull;

import android.text.InputFilter;
import android.widget.EditText;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public final class InputFiltersModule extends ReactContextBaseJavaModule {

    public InputFiltersModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "InputFiltersModule";
    }

    @ReactMethod
    public void install(int viewId, ReadableArray filterOptions) {

        getCurrentActivity().runOnUiThread(() -> {
            EditText editText = getCurrentActivity().findViewById(viewId);

            if (editText == null) {
                return;
            }

            InputFilter[] currentFilters = editText.getFilters();
            InputFilter[] newFilters = getFilters(filterOptions);
            InputFilter[] combinedFilters = new InputFilter[currentFilters.length + newFilters.length];

            System.arraycopy(currentFilters, 0, combinedFilters, 0, currentFilters.length);
            System.arraycopy(newFilters, 0, combinedFilters, currentFilters.length, newFilters.length);

            editText.setFilters(combinedFilters);
        });
    }

    private InputFilter[] getFilters(ReadableArray filterOptions) {
        InputFilter[] filters = new InputFilter[filterOptions.size()];

        for (int i = 0; i < filterOptions.size(); i++) {
            ReadableMap options = filterOptions.getMap(i);
            String type = options.getString("type");

            // todo: use strategy pattern
            if (type.equals("DecimalNumber")) {
                int maxDigitsBeforeDecimal = options.getInt("maxDigitsBeforeDecimal");
                int maxDigitsAfterDecimal = options.getInt("maxDigitsAfterDecimal");

                filters[i] = new DecimalNumberFilter(maxDigitsBeforeDecimal, maxDigitsAfterDecimal);
            }
        }

        // todo: error handling

        return filters;
    }
}
