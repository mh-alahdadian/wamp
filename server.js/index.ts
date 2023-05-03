import autobahn from "autobahn";
import type { FileBlob } from "bun";

const connection = new autobahn.Connection({
  url: "ws://localhost:8080/ws",
  realm: "realm1",
  transports: [
    {
      type: "websocket",
      url: "ws://localhost:8080/ws",
      protocols: ["wamp.2.msgpack"],
    },
  ],
});

connection.onopen = function (session) {
  session.register("com.myapp.add2", (args?: [number, number]) => {
    if (!args) return 0;
    return args[0] + args[1];
  });

  var blob = Buffer.from('Result text');
  session.register(
    "com.myapp.logger",
    (args?: [{ x: Buffer; y: string }]) => {
      if (!args) return 0;
      console.log(typeof args[0].x, typeof args[0].y);
      console.log(args[0]);
      return blob;
    }
  );
};

connection.open();
