package com.who.server.payloads;

/**
 * Created by Joaquin Campero
 * on 4/25/18.
 */
public class Guess extends Base {

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
}
