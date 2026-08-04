import "./InstallToast.css";
import { FaCheckCircle } from "react-icons/fa";

function InstallToast({ store }) {
  return (
    <div className="install-toast" role="status">
      <FaCheckCircle className="install-toast-icon" />
      <div className="install-toast-text">
        <strong>Opening {store}…</strong>
        <span>Install the Hanioo app to continue on your device.</span>
      </div>
    </div>
  );
}

export default InstallToast;
