import { useEffect, useCallback, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import { useAppDispatch } from '@redux/hooks';
import { callAgentModalActions } from '@redux/features/call-agent-modal/slice';
import { audioMessagesActions } from '@redux/features/audio-messages/slice';
import { useCallAgentModalSelector } from '@redux/features/call-agent-modal/hooks';
import { useAudioMessagesSelector } from '@redux/features/audio-messages/hooks';

import { useVoiceActivityDetection } from '@utilities/use-voice-activity-detection';

const SOCKET_URL = 'ws://localhost:8080';

export const useCallAgentModal = () => {
  const isModalOpen = useCallAgentModalSelector('isModalOpen');
  const isCallActive = useAudioMessagesSelector('isCallActive');
  const isMessagePlaying = useAudioMessagesSelector('isMessagePlaying');
  const dispatch = useAppDispatch();
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    mediaRecorder,
  } = useAudioRecorder();

  const { sendMessage, lastMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
  });

  const handleCallButtonClick = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    audioRef.current = null;
    const nextIsCallActive = !isCallActive;
    dispatch(audioMessagesActions.setCallActive(nextIsCallActive));
    if (nextIsCallActive) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isCallActive, dispatch, startRecording, stopRecording]);

  useVoiceActivityDetection({
    mediaRecorder,
    isRecording,
    silenceTimerRef,
    stopRecording,
  });

  useEffect(() => {
    if (recordingBlob) {
      const blobUrl = URL.createObjectURL(recordingBlob);
      dispatch(audioMessagesActions.addMessage({ blobUrl, sender: 'user' }));
      sendMessage(recordingBlob);
    }
  }, [recordingBlob, sendMessage]);

  useEffect(() => {
    if (lastMessage?.data instanceof Blob) {
      const blobUrl = URL.createObjectURL(lastMessage.data);
      dispatch(audioMessagesActions.addMessage({ blobUrl, sender: 'agent' }));
      if (isCallActive) {
        audioRef.current = new Audio(blobUrl);
        audioRef.current
          .play()
          .then(() => dispatch(audioMessagesActions.setIsMessagePlaying(true)));
        audioRef.current.onended = () => {
          dispatch(audioMessagesActions.setIsMessagePlaying(false));
          if (isCallActive) startRecording();
        };
      }
    }
  }, [lastMessage]);

  const onClose = useCallback(() => {
    if (isCallActive) {
      dispatch(audioMessagesActions.setCallActive(false));
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = null;
      stopRecording();
    }
    dispatch(callAgentModalActions.toggleModal());
  }, [dispatch, isCallActive, stopRecording]);

  return {
    isCallActive,
    isMessagePlaying,
    isModalOpen,
    handleCallButtonClick,
    onClose,
    mediaRecorder,
  };
};
