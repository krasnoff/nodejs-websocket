import { Server as HttpServer } from "http";
import { Subscription } from "rxjs";
import { Socket, Server as SocketIoServer } from "socket.io";
import motivationSentenceService from "./motivation-sentence-service";

function chatService(httpServer: HttpServer): void {
    // Create socket.io server on top of the http server:
    const socketIoServer = new SocketIoServer(httpServer, { cors: { origin: "http://localhost:3000" } });
    let subscription: Subscription;
    
    // 1. Listen to client connections: 
    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("One client has been connected.");

        subscription = motivationSentenceService().subscribe((data => {
            socketIoServer.sockets.emit("random-sentence", data);
        }));

        // 3. Listen to client messages: 
        socket.on("msg-from-client", (msg: string) => {
            console.log("Client sent message: " + msg);

            // 6. Send back given message to all clients (per our chat logic): 
            socketIoServer.sockets.emit("msg-from-server", msg);

            // 6. Send back given message to our client only (per our chat logic): 
            // socket.emit("msg-from-server", msg);
            
            
        });

        // 7. Listen to client disconnect:
        socket.on("disconnect", () => {
            subscription.unsubscribe();
            console.log("One Client has disconnected");
        });
    });
}

export default chatService;