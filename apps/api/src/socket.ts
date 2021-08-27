import 'reflect-metadata'; // this shim is required
import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  })
  useSocketServer(io, {controllers: [__dirname + "./controllers/*.ts"]}) // "__dirname"とは現在のディレクトリのこと。つまりここでは"/apps/api/src/"になる
  return io;
}