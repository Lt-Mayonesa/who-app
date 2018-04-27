package com.who.server;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdServiceInfo;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Joaquin Campero
 * on 4/22/18.
 */
public class ServerHandlerModule extends ReactContextBaseJavaModule {

    private final String PROTOCOL = "who-server-ws";
    private RoomServer mServer;
    private NsdManager.RegistrationListener mRegistrationListener;
    private NsdManager mNsdManager;

    public ServerHandlerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ServerHandler";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("PROTOCOL", PROTOCOL);
        return constants;
    }


    public void initializeRegistrationListener() {
        mRegistrationListener = new NsdManager.RegistrationListener() {

            @Override
            public void onServiceRegistered(NsdServiceInfo NsdServiceInfo) {

            }

            @Override
            public void onRegistrationFailed(NsdServiceInfo serviceInfo, int errorCode) {
                // Registration failed! Put debugging code here to determine why.
            }

            @Override
            public void onServiceUnregistered(NsdServiceInfo arg0) {
                // Service has been unregistered. This only happens when you call
                // NsdManager.unregisterService() and pass in this listener.
            }

            @Override
            public void onUnregistrationFailed(NsdServiceInfo serviceInfo, int errorCode) {
                // Unregistration failed. Put debugging code here to determine why.
            }
        };
    }

    private void registerService(String name, int port) {
        NsdServiceInfo serviceInfo = new NsdServiceInfo();

        serviceInfo.setServiceName("WhoServer " + name);
        serviceInfo.setServiceType("_" + PROTOCOL + "._tcp");
        serviceInfo.setPort(port);

        mNsdManager = (NsdManager) getReactApplicationContext().getSystemService(Context.NSD_SERVICE);

        if (mNsdManager != null)
            mNsdManager.registerService(
                    serviceInfo, NsdManager.PROTOCOL_DNS_SD, mRegistrationListener);
    }

    @ReactMethod
    public void start(String name, Promise promise) {
        if (mServer == null)
            mServer = new RoomServer(0);
        if (!mServer.isAlive()) {
            try {
                mServer.start();
            } catch (IOException e) {
                e.printStackTrace();
                promise.reject(e);
            }
        }

        int port = mServer.getListeningPort();
        initializeRegistrationListener();
        registerService(name, port);
        promise.resolve(port);
    }

    @ReactMethod
    public void stop(Promise promise) {
        if (mServer != null && mServer.isAlive()) {
            mServer.stop();
            promise.resolve(true);
        } else
            promise.resolve(false);
    }
}
