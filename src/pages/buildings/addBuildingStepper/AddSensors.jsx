/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { CiEdit } from "react-icons/ci";
import { VscCopy } from "react-icons/vsc";
import { SlCursorMove } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import { CiExport } from "react-icons/ci";
import {
  drawCanvas,
  handleCanvasClick,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCopyMode,
  handleDeleteMode,
  handleDeletePolygon,
  handleImageUpload,
  handleMoveMode,
  getCroppedImg,
  exportSVG,
  updateSensorAttached,
} from "../utils/addSensors";
import Modal from '../../../components/modals/Modal'
import Input from '../../../components/shared/input/Input'
import Dropdown from '../../../components/shared/dropdown/Dropdown'
import Button from '../../../components/shared/button/Button'

const BookParkingSpace = ({croppedImage}) => {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState(null);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [polygonCount, setPolygonCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [draggedPolygon, setDraggedPolygon] = useState(null);
  const [draggingPolygon, setDraggingPolygon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sensorPopup, setSensorPopup] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [sensorIdInput, setSensorIdInput] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");

  const openSensorPopup = (polygon) => {
    setSelectedPolygon(polygon);
    setSensorPopup(true);
    setSensorIdInput("");
  };

  const handleAddSensor = () => {
    if (sensorIdInput) {
      updateSensorAttached({
        polygonId: selectedPolygon.id,
        sensor: sensorIdInput,
        sensorAttached: selectedSensor,
        polygons,
        setPolygons
      });
      setSensorPopup(false);
    }
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("restroom cropped image:", croppedImage)
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => setImage(img);
      setShowCropper(false);
    } catch (error) {
      console.error("Crop failed:", error);
    }
  };

  // Stop dragging on mouse up
  const handleCanvasMouseUp = () => {
    setDraggingPolygon(null);
  };

  useEffect(() => {
    if (isDrawingEnabled) {
      // Draw canvas content
      drawCanvas(canvasRef, image, isDrawingEnabled, polygons, currentPolygon);
    }
  }, [image, polygons, currentPolygon, isDrawingEnabled]);

  // logging all the coordinates
  useEffect(() => {
    if (polygons.length > 0) {
      console.log("All Polygons Coordinates:", polygons);
    }
  }, [polygons]);

  return (
    <div className="flex justify-center">
      <div className="relative">
        {!isDrawingEnabled && (
          <BrowseFileBtn
            onFileChange={(event) =>
              handleImageUpload(
                event,
                setImageSrc,
                setShowCropper,
                setIsDrawingEnabled
              )
            }
          />
        )}
        <canvas
          width={800}
          height={500}
          ref={canvasRef}
          className="border border-primary border-dashed rounded-lg"
          onClick={(event) =>
            handleCanvasClick(
              event,
              canvasRef,
              isDeleteMode,
              isCopyMode,
              draggedPolygon,
              polygonCount,
              polygons,
              isEditMode,
              setPolygons,
              currentPolygon,
              setPolygonCount,
              setDraggedPolygon,
              setCurrentPolygon,
              handleDeletePolygon,
              openSensorPopup,
            )
          }
          onMouseDown={(event) =>
            handleCanvasMouseDown(
              event,
              isMoveMode,
              canvasRef,
              polygons,
              setDraggingPolygon,
              setDragOffset
            )
          }
          onMouseMove={(event) =>
            handleCanvasMouseMove(
              event,
              isCopyMode,
              canvasRef,
              polygons,
              setDraggedPolygon,
              draggingPolygon,
              dragOffset,
              setPolygons
            )
          }
          onMouseUp={handleCanvasMouseUp}
        />
        {showCropper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-3/4 max-w-lg">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={8 / 6}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <div className="flex items-center gap-2 mt-4 z-[999] absolute bottom-6 right-6">
                <button
                  onClick={() => setShowCropper(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Crop
                </button>
              </div>
            </div>
          </div>
        )}
        {isDrawingEnabled && (
          <>
            <div className="flex flex-col items-center gap-4 absolute top-0 right-[-6%]">
              <button
                onClick={() => {
                  setIsEditMode(!isEditMode);
                  setIsCopyMode(false);
                  setIsMoveMode(false);
                  setIsDeleteMode(false);
                }}
                className={`p-2 border rounded-md text-white ${
                  isEditMode ? "border-primary" : "border-[#565656]"
                }`}
              >
                <CiEdit
                  fontSize={20}
                  color={isEditMode ? "#A449EB" : "#565656"}
                />
              </button>
              <button
                onClick={() =>
                  handleCopyMode(
                    isCopyMode,
                    setIsCopyMode,
                    setIsEditMode,
                    setIsMoveMode,
                    setIsDeleteMode,
                    setDraggedPolygon
                  )
                }
                className={`p-2 border rounded-md text-white ${
                  isCopyMode ? "border-primary" : "border-[#565656]"
                }`}
              >
                <VscCopy
                  fontSize={20}
                  color={isCopyMode ? "#A449EB" : "#565656"}
                />
              </button>
              <button
                onClick={() =>
                  handleMoveMode(
                    isMoveMode,
                    setIsCopyMode,
                    setIsEditMode,
                    setIsMoveMode,
                    setIsDeleteMode,
                    setDraggingPolygon
                  )
                }
                className={`p-2 border rounded-md text-white ${
                  isMoveMode ? "border-primary" : "border-[#565656]"
                }`}
              >
                <SlCursorMove
                  fontSize={20}
                  color={isMoveMode ? "#A449EB" : "#565656"}
                />
              </button>
              <button
                onClick={() =>
                  handleDeleteMode(
                    isDeleteMode,
                    setIsCopyMode,
                    setIsEditMode,
                    setIsMoveMode,
                    setIsDeleteMode
                  )
                }
                className={`p-2 border rounded-md text-white ${
                  isDeleteMode ? "border-primary" : "border-[#565656]"
                }`}
              >
                <AiOutlineDelete
                  fontSize={20}
                  color={isDeleteMode ? "#A449EB" : "#565656"}
                />
              </button>
              <button
                className="border rounded-md border-[#565656] hover:border-primary p-2"
                onClick={() => exportSVG(canvasRef, image, polygons)}
              >
                <CiExport />
              </button>
            </div>
          </>
        )}
        {sensorPopup && selectedPolygon && (
        <Modal title="Add Sensor" onClose={() => setSensorPopup(false)}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Sensor Id"
              label="Sensor Id"
              value={sensorIdInput}
              onChange={(e) => setSensorIdInput(e.target.value)}
            />
            <Dropdown
              options={[
                { option: "Sensor 1", value: "sensor-1" },
                { option: "Sensor 2", value: "sensor-2" },
              ]}
              label="Sensor Name"
              onSelect={(value) => setSelectedSensor(value)}
            />
            <div className="flex justify-center">
              <Button
                text="Add"
                width="w-fit"
                onClick={() => handleAddSensor()}
              />
            </div>
          </div>
        </Modal>
      )}
      </div>
    </div>
  );
};

export default BookParkingSpace;

const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 cursor-pointer rounded-lg bg-primary text-white font-semibold">
      Upload Restroom Model
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onFileChange}
      />
    </button>
  );
};