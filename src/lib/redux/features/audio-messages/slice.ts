import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Use 'type' for all definitions, no interfaces
export type AudioMessage = {
  id: string;
  blobUrl: string; // <-- Store the URL string, not the Blob object
  sender: 'user' | 'agent';
};

export type AudioMessagesState = {
  history: AudioMessage[];
  isCallActive: boolean;
};

export const audioMessagesInitialState: AudioMessagesState = {
  history: [],
  isCallActive: false,
};

const audioMessagesSlice = createSlice({
  name: 'audioMessages',
  initialState: audioMessagesInitialState,
  reducers: {
    // The payload now expects an object with a blobUrl
    addMessage: (state, action: PayloadAction<Omit<AudioMessage, 'id'>>) => {
      state.history.push({
        ...action.payload,
        id: new Date().toISOString(),
      });
    },
    setCallActive: (state, action: PayloadAction<boolean>) => {
      state.isCallActive = action.payload;
    },
  },
});

export const audioMessagesActions = audioMessagesSlice.actions;
export default audioMessagesSlice;
