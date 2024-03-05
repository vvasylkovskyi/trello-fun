import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./card.scss";

const Card = ({ id, index, title }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          id={id}
          className={"card"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card__title-container">
            <h3>{title}</h3>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
