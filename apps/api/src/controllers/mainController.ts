import {
  ConnectedSocket,
  OnConnect,
  SocketController,
  SocketIO,
} from 'socket-controllers';
import { Socket, Server } from 'socket.io';

@SocketController() // decorator - JavaのAnnotaionのようなもの
export class MainController {
  @OnConnect()
  /**
   * onConnection
   * 新しいユーザがsocketに接続するために発火するイベントハンドラ
   * io.on("connection", (socket)=> {})を記述するのと同じ
   */
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    console.log(`New Socket connected: ${socket.id}`);
  }
}
