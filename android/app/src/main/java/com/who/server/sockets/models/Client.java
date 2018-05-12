package com.who.server.sockets.models;

import com.who.server.utils.EncryptionUtil;

/**
 * Created by Joaquin Campero
 * on 4/18/18.
 */
public class Client {
    private boolean active;
    private String ip;
    private String name;
    private String nickName;

    public Client(String ipAddress) {
        this.active = true;
        this.ip = ipAddress;
    }

    public String getSecret() {
        return ip;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickName() {
        return nickName != null ? nickName : "Anon";
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}