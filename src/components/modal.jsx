import { Link } from "react-router-dom";

export default function Modal({ title, text, linkPositive, linkNegative }) {
  return (
    <div className="modal-container-fullscreen">
      <div className="modal">
        <h1 className="modal-title">{title}</h1>
        <p className="modal-text">{text}</p>
        <div className="row">
          {linkNegative && (
            <Link className="button red-bg full" to={linkNegative}>
              Cancel
            </Link>
          )}
          <Link className="button green-bg full" to={linkPositive}>
            Ok
          </Link>
        </div>
      </div>
    </div>
  );
}
