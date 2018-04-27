package com.who.server;

import com.facebook.react.bridge.Callback;
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

    private final int PORT = 63111;
    private RoomServer mServer;

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
        constants.put("PORT", PORT);
        return constants;
    }

    @ReactMethod
    public void start(String name, Promise promise) {
        if (mServer == null)
            mServer = new RoomServer(name, PORT);
        if (!mServer.isAlive()) {
            try {
                mServer.start();
            } catch (IOException e) {
                e.printStackTrace();
                promise.reject(e);
            }
        }
        promise.resolve(PORT);
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
