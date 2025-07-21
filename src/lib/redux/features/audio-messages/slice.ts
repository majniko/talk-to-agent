import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AudioMessage = {
  id: string;
  blobUrl: string;
  sender: 'user' | 'agent';
};

export type AudioMessagesState = {
  history: AudioMessage[];
  isCallActive: boolean;
  isMessagePlaying: boolean;
};

export const audioMessagesInitialState: AudioMessagesState = {
  history: [],
  isCallActive: false,
  isMessagePlaying: false,
};

const audioMessagesSlice = createSlice({
  name: 'audioMessages',
  initialState: audioMessagesInitialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<AudioMessage, 'id'>>) => {
      state.history.push({
        ...action.payload,
        id: new Date().toISOString(),
      });
    },
    setCallActive: (state, action: PayloadAction<boolean>) => {
      state.isCallActive = action.payload;
    },
    setIsMessagePlaying: (state, action: PayloadAction<boolean>) => {
      state.isMessagePlaying = action.payload;
    },
  },
});

export const audioMessagesActions = audioMessagesSlice.actions;
export default audioMessagesSlice;
