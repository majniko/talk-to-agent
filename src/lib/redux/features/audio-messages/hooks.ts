import { createUseSliceSelector } from '@redux/selector-factory';

export const useAudioMessagesSelector = createUseSliceSelector(
  ({ audioMessages }) => audioMessages,
);
