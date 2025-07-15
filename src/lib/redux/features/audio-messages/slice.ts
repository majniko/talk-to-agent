import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AudioMessage = {
  id: string;
  blobUrl: string; // The local URL for the audio blob
  type: 'sent' | 'received';
  timestamp: string;
};

export type AudioMessagesState = {
  messages: AudioMessage[];
};

export const audioMessagesInitialState: AudioMessagesState = {
  messages: [],
};

export const audioMessagesSlice = createSlice({
  name: 'audioMessages',
  initialState: audioMessagesInitialState,
  reducers: {
    addAudioMessage: (
      state,
      action: PayloadAction<Omit<AudioMessage, 'id' | 'timestamp'>>,
    ) => {
      const newMessage: AudioMessage = {
        id: `audio_${new Date().getTime()}_${Math.random()}`, // Simple unique ID
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.messages.push(newMessage);
    },
    clearAudioMessages: (state) => {
      state.messages.forEach((message) => URL.revokeObjectURL(message.blobUrl));
      state.messages = [];
    },
  },
});

export const audioMessagesActions = audioMessagesSlice.actions;

export default audioMessagesSlice;
