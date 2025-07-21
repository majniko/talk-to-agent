'use client';

import { Modal } from '@components/modal';
import { Text } from '@components/text';
import { Button } from '@components/button';
import { PhoneCallIcon } from 'lucide-react';
import { LOCALIZATION } from 'localization';
import { useCallAgentModal } from './use-call-agent-modal';
import { useCallAgentModalSelector } from '@redux/features/call-agent-modal/hooks';
import classes from './call-agent-modal.module.scss';
import clsx from 'clsx';
import { AudioVisualizer } from '@components/audio-visualizer';

export const CallAgentModal = () => {
  const isModalOpen = useCallAgentModalSelector('isModalOpen');
  const {
    isCallActive,
    isRecording,
    handleCallButtonClick,
    onClose,
    mediaRecorder,
  } = useCallAgentModal();

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <div className={classes.modalContentWrapper}>
        <div className={classes.titleWrapper}>
          <Text
            text={LOCALIZATION.en.menu.callAgentModal.title}
            variant={'bold-large'}
          />
        </div>

        <div className={classes.visualizerWrapper}>
          <AudioVisualizer stream={mediaRecorder?.stream} />
        </div>

        <Button
          onClick={handleCallButtonClick}
          className={clsx(classes.callButton, {
            [classes.callActive]: isCallActive,
          })}
        >
          <PhoneCallIcon className={classes.callIcon} />
        </Button>
      </div>
    </Modal>
  );
};
