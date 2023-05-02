import Spinner from "./spinner.jsx";
import "./modal.css";

export default function PaymentModal({ confirmation, cancellation }) {
  return (
    <div className="modal-container-fullscreen">
      <div className="modal payment">
        <h1 className="heading">Waiting for payment...</h1>
        <Spinner>
          <i class="fa-solid fa-circle-notch"></i>
        </Spinner>
        <div className="button-bar">
          <button className="button red" onclick={cancellation}>
            Cancel
          </button>
          <button className="button" onclick={confirmation}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
