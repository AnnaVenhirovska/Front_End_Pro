import { useState } from "react";
import "./ModalStyle.css";

interface IProps {
  StartProgress: number;
  ConfirmCall: Function;
  DenyCall: Function;
}

const ModalScript: React.FC<IProps> = ({
  StartProgress,
  ConfirmCall,
  DenyCall,
}) => {
  const [progress, setProgress] = useState<number>(StartProgress);

  const ModalHide = function (e: React.MouseEvent<HTMLDivElement> | null) {
    if (e == null || (e.target as Element).className === "modalOverride") {
      DenyCall();
    }
  };

  const ConfirmModal = function () {
    ConfirmCall(progress);
  };

  return (
    <div className="modalOverride" onClick={ModalHide}>
      <div className="ModalBody">
        <div className="modalTitle">Set Book Progress</div>

        <input
          className="modalInput"
          type="range"
          step="25"
          value={progress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProgress(+e.target.value);
            return false;
          }}
        ></input>
        <span>{progress}</span>
        <div
          className="modalButton"
          onClick={() => {
            ConfirmModal();
          }}
        >
          Set Progress
        </div>
        <div className="modalButton" onClick={() => ModalHide(null)}>
          Close
        </div>
      </div>
    </div>
  );
};

export default ModalScript;