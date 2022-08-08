import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes.js";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

 const Card = ({ id, text, index, moveCard,handleEdit,handleDelete }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="card border-secondary mb-3"
    >
      <div className="card-body text-secondary">
        <p className="card-text" data-handler-id={handlerId}>
          {text}
        </p>
      </div>
      <div className="card-footer bg-transparent border-secondary">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-outline-secondary"  onClick={()=>handleEdit(id,text)} >
            Edit
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={()=>handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    moveCard: PropTypes.func,
    id: PropTypes.any,
    text: PropTypes.any,
    index: PropTypes.any,

  };

export default Card;