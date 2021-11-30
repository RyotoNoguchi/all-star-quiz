import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

const GO_TO_DESIGNATED_PAGE = 'go_to_designated_page'

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log(`Server(${server}: Initialized`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`以下のクライアントが接続しました: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`以下のクライアントの接続が切れました: ${client.id}`);
  }

  // サーバーに接続しているすべてのユーザにemitとしたときは↓のようにする
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('go_to_question_page')
  goToAnotherPage(@MessageBody() nextQuestionId: string): void {
    this.server.emit(GO_TO_DESIGNATED_PAGE, nextQuestionId)
  }

  @SubscribeMessage('go_to_worst_ranking_page')
  goToWorstRankingPage(@MessageBody() path: string): void {
    this.server.emit('go_to_worst_ranking_page', path)
  }

  @SubscribeMessage('go_to_next_question')
  goToNextQuestion(@MessageBody() data: unknown): void {
    this.server.emit(GO_TO_DESIGNATED_PAGE, data)
  }

  @SubscribeMessage('display_cue_page')
  displayCuePage() {
    this.server.emit('display_cue_page')
  }

  @SubscribeMessage('display_top_page')
  displayTopPage() {
    this.server.emit('display_top_page')
  }

  @SubscribeMessage('ready_go')
  readyGo() {
    this.server.emit('ready_go')
  }

  @SubscribeMessage('final_ready_go')
  finalReadyGo() {
    this.server.emit('final_ready_go')
  }
  
  @SubscribeMessage('show_worst_ranking')
  showWorstRanking(@MessageBody() questionId: string): void {
    this.server.emit('show_worst_ranking', questionId)
  }

  @SubscribeMessage('go_to_champion_ranking_page')
  goToChampionRankingPage(@MessageBody() path: string): void {
    this.server.emit('go_to_champion_ranking_page', path) 
  }

  @SubscribeMessage('show_champion_ranking')
  showChampionRanking(@MessageBody() correctAnswer: string): void {
    this.server.emit('show_champion_ranking', correctAnswer)
  }

  @SubscribeMessage('check_answer')
  CheckAnswer(@MessageBody() correctAnswer: string): void {
    this.server.emit('check_answer', correctAnswer)
  }

  @SubscribeMessage('answer_displayed')
  AnswerDisplayed() {
    this.server.emit('answer_displayed')
  }

  @SubscribeMessage('ranking_display_completed')
  RankingDisplayCompleted() {
    this.server.emit('ranking_display_completed')
  }
}
