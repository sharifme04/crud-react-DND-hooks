import React from "react";
import PropTypes from "prop-types";

const AddToDo = ({ handleSubmit, handleChange, value, handleUpdate, edit }) => {
  return (
    <form className="form-inline" onSubmit={edit ? handleUpdate : handleSubmit}>
      <label>
        <input
          type="text"
          id="name"
          name="name"
          value={value}
          className="form-control"
          placeholder="write your task here...."
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        className={`custom-button btn ${
          edit ? "btn-info" : "btn-primary"
        } mb-2`}
      >
        {edit ? "Update" : "Add"}
      </button>
    </form>
  );
};

AddToDo.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleUpdate: PropTypes.func,
  value: PropTypes.any,
  edit: PropTypes.bool
};

export default AddToDo;
