import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse
} from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import {Logger} from "@nestjs/common";



@WebSocketGateway({namespace: "game"})
export class GameGateway implements OnGatewayConnection, OnGatewayInit {

  @WebSocketServer()
  private server: Server;

  private logger: Logger = new Logger('GameGateway');


  @SubscribeMessage('createGame')
  public createGame(client: Socket, payload: {id: string, name: string}): void {
    this.logger.log(`createGame: '${payload.id}, ${payload.name}'`);

    client.join(payload.id);
    client.broadcast.emit("gameCreated", payload as any);
  }

  @SubscribeMessage('joinGame')
  public joinGame(client: Socket, payload: {id: string}): void {
    this.logger.log(`joinGame: '${payload.id}'`);

    client.join(payload.id);
    client.broadcast.emit("removeRoom", payload as any);
  }


  public handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log("Connection");
  }

  public afterInit(server: Server): any {
    this.logger.log("Initialize");
  }
}
