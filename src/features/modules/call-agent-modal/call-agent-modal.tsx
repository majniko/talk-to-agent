'use client';

import { useCallback } from 'react';

import { Modal } from '@components/modal';
import { useAppDispatch } from '@redux/hooks';

import { useCallAgentModalSelector } from '@redux/features/call-agent-modal/hooks';
import { callAgentModalActions } from '@redux/features/call-agent-modal/slice';

import classes from './call-agent-modal.module.scss';
import { Text } from '@components/text';
import { LOCALIZATION } from 'localization';
import { Button } from '@components/button';
import { PhoneCallIcon, PhoneIcon } from 'lucide-react';
import { useWebsocket } from '@utilities/useWebsocket/use-websocket';
import dynamic from 'next/dynamic';

const AudioRecorderClientOnly = dynamic(
  () =>
    import('@components/audio-recorder-wrapper').then(
      (mod) => mod.AudioRecorderWrapper,
    ),
  { ssr: false },
);

export const CallAgentModal = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useCallAgentModalSelector('isModalOpen');
  const { handleRecordingComplete } = useWebsocket();

  const onClose = useCallback(() => {
    dispatch(callAgentModalActions.toggleModal());
  }, [dispatch]);

  const onCallButtonClick = () => {};

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <div className={classes.modalContentWrapper}>
        <div className={classes.titleWrapper}>
          <Text
            text={LOCALIZATION.en.menu.callAgentModal.title}
            variant={'bold-large'}
          />
        </div>
        <Button onClick={onCallButtonClick} className={classes.callButton}>
          <PhoneCallIcon className={classes.callIcon} />
        </Button>
        <AudioRecorderClientOnly
          onRecordingComplete={handleRecordingComplete}
          showVisualizer={true}
          downloadFileExtension="wav"
        />
      </div>
    </Modal>
  );
};
