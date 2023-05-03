// import autobahn from "./node_modules/autobahn/autobahn.js";

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
    
    // 4) call a remote procedure
    session.call("com.myapp.add2", [2, 3]).then(function (res) {
      console.log("Result:", res);
    });

    var enc = new TextEncoder();
       
    // 4) call a remote procedure
    session.call("com.myapp.logger", [], {
      x: enc.encode("This is a string converted to a Uint8Array"),
      y: 'hiii'
    }).then(function (res) {
      console.log("Result:", res);
    });
  };
  
  connection.open();
  