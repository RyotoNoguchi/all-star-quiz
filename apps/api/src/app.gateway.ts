import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { MessageBody } from 'socket-controllers';
import { Logger } from '@nestjs/common';

type Person = {
  name: string
  age: number
}

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log(`Server(${server}: Initialized`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`以下のクライアントが接続しました: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`以下のクライアントの接続が切れました: ${client.id}`);
  }

  // サーバーに接続しているすべてのユーザにemitとしたときは↓のようにする
  // @WebSocketServer()
  // server: Server;


  @SubscribeMessage('mapToServer')
  handleMessage(@MessageBody() payload: Person): WsResponse<Person> {
    console.log(`受け取ったデータ:${payload.name}`);
    // const nameAndAge = `${payload.name}: ${payload.age}歳`

    const futureInfo = {
      ...payload,
      age: payload.age + 1
    }

    return { event: 'mapToClient', data: futureInfo}
    
    
    // this.server.emit('message', message); // サーバーに接続しているすべてのユーザにemitとしたときは←のようにする
    // return { event: 'mapToClient', data: message }; // client.emit('mapToClient', data)と同じだが、型定義できない
  }
}
