import React from "react";

import { Droppable } from "react-beautiful-dnd";

import Card from "../card/card";

import "./column.scss";

const Column = ({ title, id, cards }) => {
  return (
    <div className="column col-4">
      <div className="column__title-container">
        <h2>{title}</h2>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="cards-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card, index) => (
              <Card
                id={card.id}
                index={index}
                key={`${card.title}-${card.description}`}
                title={card.title}
                columnTitle={card.columnTitle}
                description={card.description}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
