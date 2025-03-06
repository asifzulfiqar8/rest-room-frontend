// Handle image upload and display on the canvas
const handleImageUpload = (
    event,
    setImageSrc,
    setShowCropper,
    setIsDrawingEnabled
  ) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        setIsDrawingEnabled(true);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Draw canvas content
  const drawCanvas = (
    canvasRef,
    image,
    isDrawingEnabled,
    polygons,
    currentPolygon
  ) => {
    const canvas = canvasRef.current;
    if (!canvas && !isDrawingEnabled) return;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    if (image) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  
    polygons.forEach((polygon) => {
      if (!polygon || !polygon.points) return;
      context.beginPath();
      context.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => context.lineTo(point.x, point.y));
      context.closePath();
      context.fillStyle = "#A449EB80";
      context.fill();
      context.strokeStyle = "#A449EB";
      context.lineWidth = 2;
      context.stroke();
  
      // Draw ID label with styling
      const idX = polygon.points[0].x;
      const idY = polygon.points[0].y - 5;
      const padding = 4;
      const text = polygon.id;
  
      context.font = "12px Arial";
      const textWidth = context.measureText(text).width;
      const textHeight = 14;
      const boxWidth = textWidth + padding * 2;
      const boxHeight = textHeight + padding * 2;
      const boxX = idX - padding;
      const boxY = idY - textHeight - padding;
  
      context.fillStyle = "#FFFFFF";
      context.beginPath();
      context.moveTo(boxX + 4, boxY);
      context.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
      context.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
      context.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
      context.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
      context.closePath();
      context.fill();
  
      context.fillStyle = "#000000";
      context.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
    });
  
    if (currentPolygon.length > 0) {
      context.beginPath();
      context.moveTo(currentPolygon[0].x, currentPolygon[0].y);
      currentPolygon.forEach((point) => context.lineTo(point.x, point.y));
      context.strokeStyle = "#A449EB66";
      context.lineWidth = 2;
      context.stroke();
    }
  };
  
  // Add point to current polygon
  const handleCanvasClick = (
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
    openSensorPopup
  ) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    if (isDeleteMode) {
      handleDeletePolygon(x, y, canvasRef, polygons, setPolygons);
    } else if (isCopyMode && draggedPolygon) {
      // Handle copy-pasting of polygons
      const newPolygon = {
        ...draggedPolygon,
        id: `RS-${polygonCount}`,
        points: draggedPolygon.points.map((point) => ({
          x: point.x + (x - draggedPolygon.points[0].x),
          y: point.y + (y - draggedPolygon.points[0].y),
        })),
      };
      setPolygons([...polygons, newPolygon]);
      setPolygonCount(polygonCount + 1);
      setDraggedPolygon(null);
    } else if (isEditMode) {
      // Handle creating a new polygon
      const newPolygon = [...currentPolygon, { x, y }];
      setCurrentPolygon(newPolygon);
  
      // console.log('polygons', polygons)

      if (newPolygon.length === 4) {
        const polygonWithId = {
          points: newPolygon,
          id: `RS-${polygonCount}`,
        };
        setPolygons([...polygons, polygonWithId]);
        setPolygonCount(polygonCount + 1);
        setCurrentPolygon([]);
      openSensorPopup(polygonWithId);
      }
    }
  };
  
  // getCroppedImg.js
  const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 500;
        const ctx = canvas.getContext("2d");
  
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
  
        canvas.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        }, "image/jpeg");
      };
    });
  };
  
  const sensors = [
    { option: "Sensor-01", value: "sensor-01" },
    { option: "Sensor-02", value: "sensor-02" },
    { option: "Sensor-03", value: "sensor-03" },
    { option: "Sensor-04", value: "sensor-04" },
    { option: "Sensor-05", value: "sensor-05" },
  ];
  
  // Toggle Copy Mode
  const handleCopyMode = (
    isCopyMode,
    setIsCopyMode,
    setIsEditMode,
    setIsMoveMode,
    setIsDeleteMode,
    setDraggedPolygon
  ) => {
    setIsCopyMode(!isCopyMode);
    setIsEditMode(false);
    setIsMoveMode(false);
    setIsDeleteMode(false);
    setDraggedPolygon(null);
  };
  
  // Toggle Move Mode
  const handleMoveMode = (
    isMoveMode,
    setIsCopyMode,
    setIsEditMode,
    setIsMoveMode,
    setIsDeleteMode,
    setDraggingPolygon
  ) => {
    setIsMoveMode(!isMoveMode);
    setIsEditMode(false);
    setIsCopyMode(false);
    setIsDeleteMode(false);
    setDraggingPolygon(null);
  };
  
  // Toggle Delete Mode
  const handleDeleteMode = (
    isDeleteMode,
    setIsCopyMode,
    setIsEditMode,
    setIsMoveMode,
    setIsDeleteMode
  ) => {
    setIsDeleteMode(!isDeleteMode);
    setIsEditMode(false);
    setIsCopyMode(false);
    setIsMoveMode(false);
  };
  
  // Enable Polygon Copying
  const handlePolygonCopy = (
    event,
    isCopyMode,
    canvasRef,
    polygons,
    setDraggedPolygon
  ) => {
    if (!isCopyMode) return;
  
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    const selectedPolygon = polygons.find((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();
  
      return canvas.getContext("2d").isPointInPath(path, x, y);
    });
  
    if (selectedPolygon) {
      setDraggedPolygon(selectedPolygon);
    }
  };
  
  // Start dragging polygon on mouse down in Move Mode
  const handleCanvasMouseDown = (
    event,
    isMoveMode,
    canvasRef,
    polygons,
    setDraggingPolygon,
    setDragOffset
  ) => {
    if (!isMoveMode) return;
  
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    const selectedPolygon = polygons.find((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();
  
      return canvas.getContext("2d").isPointInPath(path, x, y);
    });
  
    if (selectedPolygon) {
      setDraggingPolygon(selectedPolygon);
      setDragOffset({
        x: x - selectedPolygon.points[0].x,
        y: y - selectedPolygon.points[0].y,
      });
    }
  };
  
  // Handle polygon dragging in Move Mode
  const handleCanvasMouseMove = (
    event,
    isCopyMode,
    canvasRef,
    polygons,
    setDraggedPolygon,
    draggingPolygon,
    dragOffset,
    setPolygons
  ) => {
    if (isCopyMode) {
      handlePolygonCopy(
        event,
        isCopyMode,
        canvasRef,
        polygons,
        setDraggedPolygon
      );
    } else if (draggingPolygon) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
  
      const updatedPolygons = polygons.map((polygon) => {
        if (polygon.id === draggingPolygon.id) {
          const updatedPoints = polygon.points.map((point) => ({
            x: point.x + (x - dragOffset.x - polygon.points[0].x),
            y: point.y + (y - dragOffset.y - polygon.points[0].y),
          }));
          return { ...polygon, points: updatedPoints };
        }
        return polygon;
      });
  
      setPolygons(updatedPolygons);
    }
  };
  
  // Delete polygon
  const handleDeletePolygon = (x, y, canvasRef, polygons, setPolygons) => {
    const canvas = canvasRef.current;
    const updatedPolygons = polygons.filter((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();
  
      return !canvas.getContext("2d").isPointInPath(path, x, y);
    });
    setPolygons(updatedPolygons);
  };
  
  // attaching sensor to the polygon
  const updateSensorAttached = ({polygonId, sensor, polygons,sensorAttached,setPolygons}) => {
    const updatedPolygons = polygons?.map((polygon) => {
      return polygon?.id === polygonId
        ? { ...polygon, id: sensor, sensorAttached }
        : polygon;
    });
    setPolygons(updatedPolygons);
  };
  
  // Export SVG functionality
  const exportSVG = async (canvasRef, image, polygons) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
  
    // Convert blob URL to base64
    const toBase64 = async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };
  
    // Convert the image's blob URL to a base64 data URL
    const base64Image = await toBase64(image.src);
  
    // Create SVG content
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">`;
  
    // Embed the base64 image in the SVG
    svgContent += `<image href="${base64Image}" width="${canvas.width}" height="${canvas.height}" />`;
  
    // Add polygons and text labels to the SVG
    polygons.forEach((polygon) => {
      svgContent += `<polygon points="${polygon.points
        .map((point) => `${point.x},${point.y}`)
        .join(" ")}" id="${polygon.id}" sensorAttached="${
        polygon.sensorAttached || ""
      }" fill="#A449EB80" stroke="#A449EB" stroke-width="2"/>`;
      svgContent += `<text x="${polygon.points[0].x}" y="${
        polygon.points[0].y - 10
      }" font-size="12" fill="black">${polygon.id}</text>`;
    });
  
    svgContent += "</svg>";
  
    // Create a blob and download the SVG file
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "parking-slot.svg";
    link.click();
    URL.revokeObjectURL(url);
  };
  
  export {
    handleImageUpload,
    drawCanvas,
    handleCanvasClick,
    getCroppedImg,
    sensors,
    handleCopyMode,
    handleDeleteMode,
    handleMoveMode,
    handlePolygonCopy,
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleDeletePolygon,
    updateSensorAttached,
    exportSVG
  };
  