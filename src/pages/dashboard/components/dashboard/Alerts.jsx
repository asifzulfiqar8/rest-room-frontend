import { useState } from "react";
import Alert from "../../../../../public/assets/images/dashboard/Alert";
import Modal from "../../../../components/modals/Modal";

const alerts = [
  "Heating - 1 sensor has problem",
  "Heating - 1 sensor has problem",
  "Heating - 1 sensor has problem",
  "Heating - 1 sensor has problem",
  "Heating - 1 sensor has problem",
  "Heating - 2 sensors have problem",
  "Heating - 2 sensors have problem",
  "Heating - 2 sensors have problem",
  "Heating - 2 sensors have problem",
  "Heating - 2 sensors have problem",
  "Cooling - 1 sensor has problem",
];

const Alerts = () => {
  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border-[1px] p-5 h-full ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1">
          <Alert />
          <h2 className="text-sm md:text-lg leading-[30px] font-[500]">Alerts</h2>
        </div>
        <button onClick={() => handleModalOpen()} className="text-[#A449EB] text-xs">
          See all
        </button>
      </div>

      {alerts.length === 0 ? (
        <h2 className="bg-[#00000010] text-[#00000090] p-3 text-[21px]">
          No Alert Found!
        </h2>
      ) : (
        <>
          {alerts.slice(0, 5).map((alert, i) => (
            <div
              key={i}
              className="bg-[#FFECEC] text-[#F42F2F] rounded-[6px] p-[15px] flex gap-2 items-center mb-3 border-l-4 border-[#F42F2F]"
            >
              <p className="text-sm md:text-base">{alert}</p>
            </div>
          ))}
        </>
      )}

      {modal && (
        <Modal title="All Alerts" onClose={handleModalClose}>
          <div>
            <div className="modal-content overflow-y-auto max-h-64">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className="bg-[#FFECEC] text-[#F42F2F] rounded-[6px] p-[10px] flex gap-2 items-center mb-2 border-l-4 border-[#F42F2F]"
                >
                  <p>{alert}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Alerts;
