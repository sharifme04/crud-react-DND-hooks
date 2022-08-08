import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ToDo Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Input field is empty......</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CustomModal.propTypes = {
    handleClose: PropTypes.func,
    show: PropTypes.bool
  };

export default CustomModal;
