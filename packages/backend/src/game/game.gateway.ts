import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import {Logger} from "@nestjs/common";



@WebSocketGateway({namespace: "game"})
export class GameGateway implements OnGatewayConnection, OnGatewayInit {

  @WebSocketServer()
  private server: Server;

  private logger: Logger = new Logger('GameGateway');


  @SubscribeMessage('createGame')
  public createGame(client: Socket, payload: {name: string}): void {
    this.logger.log(`createGame: '${payload.name}'`);
  }

  @SubscribeMessage('joinGame')
  public joinGame(client: Socket, payload: {id: string}): void {
    this.logger.log("joinGame");
  }


  public handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log("Connection");
  }

  public afterInit(server: Server): any {
    this.logger.log("Initialize");
  }
}
