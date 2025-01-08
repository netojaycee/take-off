import { io } from "socket.io-client";


const url = "http://localhost:3003";
// const url = "https://take-off-r3fp.onrender.com/api"

const socket = io(url, {
    withCredentials: true,
});

export default socket;
