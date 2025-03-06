import { createSlice } from "@reduxjs/toolkit";

const buildingSlice = createSlice({
  name: "building",
  initialState: {
    buildingData: {
      buildingName: "",
      buildingImage: null,
      buildingType: "",
      location: "",
      area: "",
      totalFloors: "",
      totalRestrooms: "",
      buildingManager: "",
      phone: "",
      buildingModelPreview: null,
      buildingModelCoordinates: [],
      mapInfo: {},
      restrooms: [],
    },
  },
  reducers: {
    setBuilding: (state, action) => {
      const {
        buildingName,
        buildingImage,
        buildingType,
        location,
        area,
        totalFloors,
        totalRestrooms,
        buildingManager,
        phone,
        buildingModelPreview,
        buildingModelCoordinates,
        mapInfo,
      } = action.payload;
      state.buildingData.buildingName =
        buildingName || state.buildingData.buildingName;
      state.buildingData.buildingImage =
        buildingImage || state.buildingData.buildingImage;
      state.buildingData.buildingType =
        buildingType || state.buildingData.buildingType;
      state.buildingData.location = location || state.buildingData.location;
      state.buildingData.area = area || state.buildingData.area;
      state.buildingData.totalFloors =
        totalFloors || state.buildingData.totalFloors;
      state.buildingData.totalRestrooms =
        totalRestrooms || state.buildingData.totalRestrooms;
      state.buildingData.buildingManager =
        buildingManager || state.buildingData.buildingManager;
      state.buildingData.phone = phone || state.buildingData.phone;
      state.buildingData.buildingModelPreview =
        buildingModelPreview || state.buildingData.buildingModelPreview;
      state.buildingData.buildingModelCoordinates =
        buildingModelCoordinates || state.buildingData.buildingModelCoordinates;
      state.buildingData.mapInfo = mapInfo || state.buildingData.mapInfo;
    },
  },
});

export const { setBuilding } = buildingSlice.actions;
export default buildingSlice;
