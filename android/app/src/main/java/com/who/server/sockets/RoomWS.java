package com.who.server.sockets;

import android.util.Log;

import com.google.gson.Gson;

import java.io.IOException;

import com.who.server.RoomServer;
import com.who.server.payloads.Event;
import com.who.server.payloads.Guess;
import com.who.server.payloads.Message;
import com.who.server.payloads.Name;
import com.who.server.sockets.models.Packet;
import com.who.server.sockets.models.Client;

import fi.iki.elonen.NanoHTTPD;
import fi.iki.elonen.NanoWSD;

/**
 * Created by Joaquin Campero
 * on 4/18/18.
 */
public class RoomWS extends NanoWSD.WebSocket {
    private final String TAG = this.getClass().getCanonicalName();
    private final RoomServer server;
    private Client mClient;

    public RoomWS(RoomServer server, NanoHTTPD.IHTTPSession handshakeRequest) {
        super(handshakeRequest);
        this.server = server;
        mClient = new Client(handshakeRequest.getRemoteIpAddress());
    }

    @Override
    protected void onOpen() {
    }

    @Override
    protected void onClose(NanoWSD.WebSocketFrame.CloseCode code, String reason, boolean initiatedByRemote) {
        this.server.removeSocket(this);
        Log.d(TAG, code + " reason: " + reason + " by remote: " + initiatedByRemote);
    }

    public void send(Packet packet) throws IOException {
        Gson gson = new Gson();
        super.send(gson.toJson(packet));
    }

    @Override
    protected void onMessage(NanoWSD.WebSocketFrame frame) {
        boolean respond = true;
        frame.setUnmasked();
        Gson gson = new Gson();
        Packet packet = gson.fromJson(frame.getTextPayload(), Packet.class);
        switch (packet.getAction()) {

            case Packet.Actions.START:

                Event event = new Event("START");
                event.prepare(this.mClient);
                packet.setPayload(gson.toJsonTree(event));
                break;

            case Packet.Actions.JOIN:

                Name name = gson.fromJson(packet.getPayload(), Name.class);
                this.mClient.setName(name.getValue());
                name.prepare(this.mClient);
                // send confirmation of JOIN received
                Packet confirmation = new Packet(Packet.Actions.RECEIVED_NAME);
                confirmation.setPayload(gson.toJsonTree(name));
                try {
                    send(confirmation);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                // broadcast new player
                name.setPlayers(this.server.getPlayers());
                packet.setPayload(gson.toJsonTree(name));
                break;

            case Packet.Actions.GUESS:

                Guess guess = gson.fromJson(packet.getPayload(), Guess.class);
                int guessed = this.server.guessedCorrectly(guess);
                if (guessed < 2) {
                    guess.setCorrect(guessed == 1);
                    guess.prepare(this.server, this.mClient);
                    packet.setPayload(gson.toJsonTree(guess));
                } else
                    respond = false;
                break;

            case Packet.Actions.MESSAGE:

                Message m = gson.fromJson(packet.getPayload(), Message.class);
                m.prepare(this.mClient);
                packet.setPayload(gson.toJsonTree(m));
                break;
        }
        if (respond) {
            try {
                this.server.broadcastAll(packet);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void onPong(NanoWSD.WebSocketFrame pong) {
        Log.d(TAG, "P " + pong);
    }

    @Override
    protected void onException(IOException exception) {

    }

    public Client getUser() {
        return this.mClient;
    }
}