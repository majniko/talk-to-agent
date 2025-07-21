'use client';

import { PhoneCallIcon } from 'lucide-react';
import clsx from 'clsx';
import { LOCALIZATION } from 'localization';

import { Modal } from '@components/modal';
import { Text } from '@components/text';
import { Button } from '@components/button';
import { AudioVisualizer } from '@components/audio-visualizer';

import { useCallAgentModal } from './use-call-agent-modal';

import classes from './call-agent-modal.module.scss';

export const CallAgentModal = () => {
  const {
    isCallActive,
    isModalOpen,
    isMessagePlaying,
    handleCallButtonClick,
    onClose,
    mediaRecorder,
  } = useCallAgentModal();

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <div className={classes.modalContentWrapper}>
        <div className={classes.titleWrapper}>
          {!isCallActive ? (
            <Text
              text={LOCALIZATION.en.menu.callAgentModal.title}
              variant={'bold-large'}
            />
          ) : (
            <Text
              text={LOCALIZATION.en.menu.callAgentModal.activeCall}
              variant={'bold-large'}
            />
          )}
        </div>

        <div className={classes.visualizerWrapper}>
          <AudioVisualizer
            stream={mediaRecorder?.stream}
            isMessagePlaying={isMessagePlaying}
          />
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
