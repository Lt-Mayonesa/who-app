package com.who.server.sockets.models;

import com.google.gson.JsonElement;

/**
 * Created by Joaquin Campero
 * on 4/19/18.
 */
public class Packet {

    public static class Actions {
        public static final String JOIN = "join";
        public static final String RECEIVED_NAME = "received_name";
        public static final String MESSAGE = "message";
        public static final String GUESS = "guess";
    }

    private String action;
    private JsonElement payload;

    public Packet() {
    }

    public Packet(String action) {
        this.action = action;
    }

    public boolean isJoin() {
        return action.equals(Actions.JOIN);
    }

    public boolean isMessage() {
        return action.equals(Actions.MESSAGE);
    }

    public boolean isGuess() {
        return action.equals(Actions.GUESS);
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public JsonElement getPayload() {
        return payload;
    }

    public void setPayload(JsonElement payload) {
        this.payload = payload;
    }
}