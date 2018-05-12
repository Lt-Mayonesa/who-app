package com.who.server.payloads;

import com.who.server.sockets.models.Client;
import com.who.server.sockets.models.Packet;

import java.util.UUID;

/**
 * Created by Joaquin Campero
 * on 4/19/18.
 */
public abstract class Base {
    protected String key;
    protected String user;
    protected String secret;

    public Base() {

    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public void prepare(Client client) {
        key = UUID.randomUUID().toString();
        user = client.getNickName();
        secret = client.getSecret();
    }

    public static class Types {
        public static final String MESSAGE = "MESSAGE";
        public static final String FLAG = "FLAG";
    }
}