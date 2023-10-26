import React from "react";
import ReactModal from "react-modal";

const customStyles = {
  overlay : {
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
  },
  content: {
    height: 'auto',
    outline: 'none'
  },
};

function CustomModal({isOpen, closeModal, children}) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
}

export default CustomModal;