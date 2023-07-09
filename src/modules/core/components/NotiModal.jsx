import  { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { updateNotiModal } from "../redux/modal";
const NotiModal = forwardRef(
  (
    {onClose},
    ref
  ) => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.modal.isShowNotiModal);
    const {title, body, btnCloseText, } = useSelector((state) => state.modal.notiModalConfig);
   function handleClose() {
        onClose && onClose();
        dispatch(updateNotiModal(false));
    }
    return ReactDOM.createPortal(
      <Modal show={show}  ref={ref}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary" onClick={handleClose}>
              {btnCloseText}
            </button>
        </Modal.Footer>
      </Modal>,
      document.body
    );
  }
);
NotiModal.displayName = "NotiModal";
export default NotiModal;
