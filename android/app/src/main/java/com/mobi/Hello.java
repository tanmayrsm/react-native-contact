package com.mobi;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import android.content.Context;

import android.net.Uri;

import android.content.Intent;

public class Hello extends ReactContextBaseJavaModule {
 
    public Hello(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }
 
    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() { 
        return "Hello";
    }
 
    @ReactMethod
    public void sayHi() {
        try {
            ReactApplicationContext context = getReactApplicationContext();
            Intent i = new Intent();
            i.setAction(Intent.ACTION_PICK);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            i.setData(Uri.parse("content://contacts/people/"));
            context.startActivity(i);
        } catch (IllegalViewOperationException e) {
            System.out.println(e.getMessage());
        }
    }
}