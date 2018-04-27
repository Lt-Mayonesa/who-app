package com.who.server.payloads;

/**
 * Created by Joaquin Campero
 * on 4/19/18.
 */
public class Message extends Base {
    private final String type = Types.MESSAGE;
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}