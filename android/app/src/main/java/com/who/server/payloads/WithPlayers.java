package com.who.server.payloads;

import com.who.server.RoomServer;
import com.who.server.sockets.models.Client;

import java.util.ArrayList;

/**
 * Created by Joaquin Campero
 * on 5/8/18.
 */
public abstract class WithPlayers extends Base {

    protected ArrayList<Player> players;
    protected int playersLeft;

    public WithPlayers() {

    }

    private int countActivePlayers() {
        int c = 0;
        for (Player p : this.players) {
            c += p.isPlaying() ? 1 : 0;
        }
        return c;
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public void setPlayers(ArrayList<Player> players) {
        this.players = players;
        this.playersLeft = countActivePlayers();
    }

    public void prepare(RoomServer server, Client client) {
        super.prepare(client);
        this.players = server.getPlayers();
        this.playersLeft = countActivePlayers();
    }

    public int getPlayersLeft() {
        return playersLeft;
    }

    public void setPlayersLeft(int playersLeft) {
        this.playersLeft = playersLeft;
    }

    public static class Player {

        private boolean playing;
        private String name;

        public Player(String name, boolean playing) {
            this.name = name;
            this.playing = playing;
        }

        public boolean isPlaying() {
            return playing;
        }

        public void setPlaying(boolean playing) {
            this.playing = playing;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
