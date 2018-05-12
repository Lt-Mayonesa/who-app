package com.who.server.payloads;

import java.util.ArrayList;

/**
 * Created by Joaquin Campero
 * on 4/19/18.
 */
public class Name extends WithPlayers {

    private final String type = Types.FLAG;
    private String value;

    public Name() {

    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}