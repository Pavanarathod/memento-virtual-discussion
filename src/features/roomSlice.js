import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomData: null,
  webCam: false,
  model: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRoomData: (state, action) => {
      state.roomData = action.payload;
    },
    enableWebcam: (state) => {
      state.webCam = true;
    },

    disableWebcam: (state) => {
      state.webCam = false;
    },

    enableModel(state) {
      state.model = true;
    },

    disbleModel(state) {
      state.model = false;
    },
  },
});

export const {
  getRoomData,
  enableWebcam,
  disableWebcam,
  enableModel,
  disbleModel,
} = roomSlice.actions;

export const selectRoomDa = (state) => state.room.roomData;

export const selectWebcam = (state) => state.room.webCam;

export const selectModel = (state) => state.room.model;

export default roomSlice.reducer;
