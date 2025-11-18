import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect } from "react";

const useNotificationWS = (username: string, onMessage: (data: any) => void) => {
    useEffect(() => {
        if (!username) return;

        const socket = new SockJS("http://localhost:6868/ws");

        const stompClient = new Client({
            webSocketFactory: () => socket as any,
            reconnectDelay: 5000,
            debug: (msg) => console.log("[STOMP]", msg),
        });

        stompClient.onConnect = () => {
            console.log("WS Connected");

            stompClient.subscribe(`/topic/notifications/${username}`, (message) => {
                const body = JSON.parse(message.body);
                onMessage(body);
            });
        };

        stompClient.activate();

        // ⭐ CLEANUP — return void (không async)
        return () => {
            stompClient.deactivate();
        };
    }, [username, onMessage]);
};

export default useNotificationWS;
