import {
  configureStore,
  createListenerMiddleware,
  TypedStartListening,
} from '@reduxjs/toolkit';
import callAgentModalSlice, {
  callAgentModalInitialState,
  CallAgentModalState,
} from '@redux/features/call-agent-modal/slice';
import {
  audioMessagesInitialState,
  audioMessagesSlice,
  AudioMessagesState,
} from '@redux/features/audio-messages/slice';

export type AppRootState = {
  [callAgentModalSlice.name]: CallAgentModalState;
  [audioMessagesSlice.name]: AudioMessagesState;
};

const listenerMiddleware = createListenerMiddleware();
export type AppStartListening = TypedStartListening<AppRootState, AppDispatch>;

export const makeStore = (initialState?: Partial<AppRootState>) => {
  const preloadedState = {
    [callAgentModalSlice.name]: callAgentModalInitialState,
    [audioMessagesSlice.name]: audioMessagesInitialState,
    ...initialState,
  };

  return configureStore({
    reducer: {
      [callAgentModalSlice.name]: callAgentModalSlice.reducer,
      [audioMessagesSlice.name]: audioMessagesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
    },
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
