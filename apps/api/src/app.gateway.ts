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
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('go_to_top_page')
  goToTopPage(@MessageBody() payload: string): WsResponse<string> {
    console.log(`現在のURL: http://localhost:4200${payload}`);

    return { event: 'go_to_designated_page', data: payload };
    // this.server.emit('message', message); // サーバーに接続しているすべてのユーザにemitとしたときは←のようにする
    // return { event: 'mapToClient', data: message }; // client.emit('mapToClient', data)と同じだが、型定義できない
  }

  @SubscribeMessage('go_to_cue_page')
  goToCuePage(@MessageBody() payload: string): void {
    console.log(`受け取ったURL: http://localhost:4200${payload}`);
    this.server.emit('go_to_designated_page', payload)
  }

  @SubscribeMessage('go_to_question_page')
  goToAnotherPage(@MessageBody() payload: string): void {
    console.log(`受け取ったURL: http://localhost:4200${payload}`);
    this.server.emit('go_to_designated_page', payload)
  }
}
