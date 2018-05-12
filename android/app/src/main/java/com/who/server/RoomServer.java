package com.who.server;

import android.os.AsyncTask;
import android.os.CountDownTimer;

import com.google.gson.Gson;

import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import com.who.server.payloads.Guess;
import com.who.server.payloads.WithPlayers;
import com.who.server.sockets.RoomWS;
import com.who.server.sockets.models.Packet;

import fi.iki.elonen.NanoWSD;

/**
 * Created by joaco on 4/8/18.
 */

public class RoomServer extends NanoWSD {
    private final String TAG = this.getClass().getCanonicalName();

    private CountDownTimer timer;
    private ArrayList<RoomWS> sockets = new ArrayList<>();

    public RoomServer(int port) {
        super(port);
    }

    @Override
    public void start() throws IOException {
        super.start();
        timer = new CountDownTimer(10 * 60 * 1000, 1000) {

            public void onTick(long millisUntilFinished) {
                new PingSocketsTask().execute();
            }

            public void onFinish() {
                stop();
            }
        }.start();
    }

    @Override
    public void stop() {
        super.stop();
        if (timer != null)
            timer.cancel();
        try {
            closeAll();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected WebSocket openWebSocket(IHTTPSession handshake) {
        RoomWS s = new RoomWS(this, handshake);
        addSocket(s);
        return s;
    }

    public ArrayList<RoomWS> getSockets() {
        return sockets;
    }

    public void setSockets(ArrayList<RoomWS> sockets) {
        this.sockets = sockets;
    }

    public void removeSocket(RoomWS socket) {
        this.sockets.remove(socket);
    }

    private void addSocket(RoomWS socket) {
        this.sockets.add(socket);
    }

    public void broadcast(RoomWS sender, NanoWSD.WebSocketFrame message) throws IOException {
        for (RoomWS socket : this.sockets) {
            if (!socket.equals(sender) && socket.isOpen())
                socket.sendFrame(message);
        }
    }

    public void broadcast(RoomWS sender, JSONObject payload) throws IOException {
        for (RoomWS socket : this.sockets) {
            if (!socket.equals(sender) && socket.isOpen())
                socket.send(payload.toString());
        }
    }

    public void broadcastAll(String payload) throws IOException {
        for (RoomWS socket : this.sockets) {
            if (socket.isOpen())
                socket.send(payload);
        }
    }

    public void broadcastAll(Packet packet) throws IOException {
        Gson g = new Gson();
        for (RoomWS socket : this.sockets) {
            if (socket.isOpen())
                socket.send(g.toJson(packet));
        }
    }

    private void closeAll() throws IOException {
        for (RoomWS socket : this.sockets) {
            if (socket.isOpen())
                socket.close(WebSocketFrame.CloseCode.GoingAway, "Server has stopped", true);
        }
    }

    private void keepAlive() throws IOException {
        for (RoomWS socket : this.sockets) {
            if (socket.isOpen())
                socket.ping("keepAlive".getBytes());
        }
    }

    public int guessedCorrectly(Guess guess) {
        for (RoomWS socket : this.sockets) {
            if (socket.getUser().getIp().equals(guess.getIp()) &&
                    socket.getUser().getName().equals(guess.getName())) {
                if (socket.getUser().isActive()) {
                    socket.getUser().setActive(false);
                    return 1;
                } else {
                    return 2;
                }
            }
        }
        return 0;
    }

    public ArrayList<WithPlayers.Player> getPlayers() {
        ArrayList<WithPlayers.Player> l = new ArrayList<>();
        for (RoomWS socket : this.sockets) {
            if (socket.isOpen())
                l.add(new WithPlayers.Player(socket.getUser().getName(), socket.getUser().isActive()));
        }
        return l;
    }

    private class PingSocketsTask extends AsyncTask<Void, Void, Void> {
        @Override
        protected Void doInBackground(Void... voids) {
            try {
                keepAlive();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
    }
}