const WebSocket = require(`ws`);
const ws = new WebSocket.Server({ port: 4000 });

todoCards = [
  {
    id: "Do1",
    title: "Do #1",
    columnTitle: "Todo",
  },
  {
    id: "Do2",
    title: "Do #2",
    columnTitle: "Todo",
  },
  {
    id: "Do3",
    title: "Do #3",
    columnTitle: "Todo",
  },
  {
    id: "Do4",
    title: "Do #4",
    columnTitle: "Todo",
  },
];

inProgressCards = [
  {
    id: "Progress1",
    title: "In Progress #1",
    columnTitle: "In Progress",
  },
];

doneCards = [];

let board = {
  todo: {
    title: "Todo",
    cards: todoCards,
  },
  inProgress: {
    title: "In Progress",
    cards: inProgressCards,
  },
  done: {
    title: "Done",
    cards: doneCards,
  },
};

ws.on("connection", (ws) => {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "update") {
      board = { ...parsedMessage.data };

      ws.send(
        JSON.stringify({
          data: {
            board: board,
          },
          msg: "update-board",
        })
      );
    }
  });

  ws.send(
    JSON.stringify({
      data: {
        board: board,
      },
      msg: "update-board",
    })
  );
});
