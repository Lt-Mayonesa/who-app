package com.who.server.payloads;

import java.util.ArrayList;

/**
 * Created by Joaquin Campero
 * on 4/19/18.
 */
public class Name extends Base {

    private final String type = Types.FLAG;
    private String value;
    private ArrayList<String> players;

    public Name() {

    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public ArrayList<String> getPlayers() {
        return players;
    }

    public void setPlayers(ArrayList<String> players) {
        this.players = players;
    }
}