package com.who.server.payloads;

/**
 * Created by Joaquin Campero
 * on 5/16/18.
 */
public class Event extends Base {
    private final String type = Types.EVENT;
    private String name;

    public Event(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
