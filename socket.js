import { io } from "socket.io-client";
//socket emulator for host computer
export const API_URL = "http://10.0.2.2:5000";

export const USER_ID = "user123";

export const socket = io(API_URL, {
  transports: ["websocket"],
});