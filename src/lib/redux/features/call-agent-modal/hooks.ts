import { createUseSliceSelector } from '@redux/selector-factory';

export const useCallAgentModalSelector = createUseSliceSelector(
  ({ callAgentModal }) => callAgentModal,
);
