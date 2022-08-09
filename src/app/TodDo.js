import { useCallback, useEffect, useState, useTransition } from "react";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";
import Card from "./components/Card.js";
import AddToDo from "./components/AddToDo.js";
import CustomModal from "./components/Modal.js";
import Spinner from "./components/Spinner.js";

const TodDo = () => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [cards, setCards] = useState([]);
  const [listId, setListId] = useState("");
  const [editedId, setEditedId] = useState("");
  const [edit, setEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    startTransition(() => {
      const newItem = { id: uuidv4(), text: value };
      newItem.text !== "" ? setCards([...cards, newItem]) : handleShow();
      setValue("");
    });
  };

  const handleDelete = (id) => setListId(id);

  useEffect(() => {
    const updatedCards = cards?.filter((card) => card.id !== listId);
    setCards(updatedCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const handleEdit = (id, text) => {
    setValue(text);
    setEditedId(id);
    setEdit(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    startTransition(() => {
      const newItem = { id: editedId, text: value };
      const updatedCards = cards?.filter((card) => card.id !== editedId);
      newItem.text !== "" || null
        ? setCards([...updatedCards, newItem])
        : handleShow();
      setEdit(false);
      setValue("");
    });
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moveCard]
  );

  return (
    <div className="toDo-container">
      <h3 className="header">Create your Todo List</h3>
      <CustomModal show={show} handleClose={handleClose} />
      <AddToDo
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        edit={edit}
        handleUpdate={handleUpdate}
      />
      {isPending && <Spinner/>}
      {cards.length ? (
        <div className="toDo">
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      ) : (
        <div className="empty-text">please add new item</div>
      )}
    </div>
  );
};

export default TodDo;
