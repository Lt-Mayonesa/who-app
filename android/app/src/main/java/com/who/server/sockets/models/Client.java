package com.who.server.sockets.models;

import com.who.server.utils.EncryptionUtil;

/**
 * Created by Joaquin Campero
 * on 4/18/18.
 */
public class Client {
    private String ip;
    private String name;
    private String nickName;

    public Client(String ipAdress) {
        this.ip = ipAdress;
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
}