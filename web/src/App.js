import React, { useState, useRef, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./components/column/column";
import "./app.scss";

const App = () => {
  const [localBoard, setBoard] = useState({});
  let socketConnection = useRef();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:4000`);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);

      if (data.msg === "update-board") {
        let { board } = data.data;

        setBoard(board);
      }
    };

    ws.onclose = function () {
      console.log("Connection is closed!");
    };

    ws.onerror = function (err) {
      console.error("WebSocket error: ", err);
    };

    socketConnection.current = ws;
  }, []);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const columnSource = localBoard[source.droppableId];
    const columnDestination = localBoard[destination.droppableId];

    const updateCardsInSameColumn = () => {
      const newList = columnSource.cards.filter(
        (_, index) => index !== source.index
      );

      newList.splice(destination.index, 0, columnSource.cards[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        ...columnSource,
        cards: newList,
      };

      const board = { ...localBoard, [source.droppableId]: newCol };

      socketConnection.current.send(
        JSON.stringify({
          type: "update",
          data: board,
        })
      );
    };

    const updateCardsMultiColumns = () => {
      const newStartList = columnSource.cards.filter(
        (_, index) => index !== source.index
      );

      // Create a new start column
      const newStartCol = {
        ...columnSource,
        cards: newStartList,
      };

      // Make a new end list array
      const newEndList = columnDestination.cards;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, columnSource.cards[source.index]);

      // Create a new end column
      const newEndCol = {
        ...columnDestination,
        cards: newEndList,
      };

      const board = {
        ...localBoard,
        [source.droppableId]: newStartCol,
        [destination.droppableId]: newEndCol,
      };

      socketConnection.current.send(
        JSON.stringify({
          type: "update",
          data: board,
        })
      );
    };

    if (columnSource === columnDestination) {
      updateCardsInSameColumn();
    } else {
      updateCardsMultiColumns();
    }

    return null;
  };

  return (
    <div className="main-container row">
      <h1 className="main-header">Your Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-container">
          {Object.entries(localBoard).map(([id, column]) => {
            return (
              <Column
                key={id}
                title={column.title}
                id={id}
                cards={column.cards}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
