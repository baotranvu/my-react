import  { forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";
import { useSelector} from "react-redux";
const AppModal = forwardRef(
  (
    {
      handleSave,
      handleClose,
    },
    ref
  ) => {
    const show = useSelector((state) => state.modal.isShowModal);
    const {title, body, btnSaveText, btnCloseText, isHiddenCloseButton} = useSelector((state) => state.modal.modalConfig);
    return ReactDOM.createPortal(
      <Modal show={show} onHide={handleClose} ref={ref}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {!isHiddenCloseButton && (
            <button className="btn btn-danger" onClick={handleClose}>
              {btnCloseText}
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSave}>
            {btnSaveText}
          </button>
        </Modal.Footer>
      </Modal>,
      document.body
    );
  }
);
AppModal.displayName = "AppModal";
export default AppModal;
