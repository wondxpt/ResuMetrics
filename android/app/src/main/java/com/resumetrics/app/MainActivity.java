package com.resumetrics.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(NativePdfPrintPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
