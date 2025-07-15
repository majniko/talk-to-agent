import { createSlice } from '@reduxjs/toolkit';

export type CallAgentModalState = {
  isModalOpen: boolean;
};

export const callAgentModalInitialState: CallAgentModalState = {
  isModalOpen: false,
};

export const callAgentModalSlice = createSlice({
  name: 'callAgentModal',
  initialState: callAgentModalInitialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const callAgentModalActions = callAgentModalSlice.actions;

export default callAgentModalSlice;
