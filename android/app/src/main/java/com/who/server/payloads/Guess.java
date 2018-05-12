package com.who.server.payloads;

import com.who.server.RoomServer;
import com.who.server.sockets.models.Client;

import java.util.UUID;

/**
 * Created by Joaquin Campero
 * on 4/25/18.
 */
public class Guess extends WithPlayers {

    private final String type = Types.FLAG;

    private String ip;
    private String name;
    private boolean correct;

    public Guess () {}

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

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    @Override
    public void prepare(Client client) {
        key = UUID.randomUUID().toString();
        user = client.getNickName();
        secret = null;
        ip = null;
    }

    @Override
    public void prepare(RoomServer server, Client client) {
        key = UUID.randomUUID().toString();
        user = client.getNickName();
        secret = null;
        ip = null;
        this.players = server.getPlayers();
        this.playersLeft = 0;
        for (Player p : this.players) {
            this.playersLeft += p.isPlaying() ? 1 : 0;
        }
    }
}
