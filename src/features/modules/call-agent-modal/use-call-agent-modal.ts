import { useEffect, useCallback, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { callAgentModalActions } from '@redux/features/call-agent-modal/slice';
import { audioMessagesActions } from '@redux/features/audio-messages/slice';

const SOCKET_URL = 'ws://localhost:8080';
const VAD_SILENCE_TIMEOUT_MS = 2000;

export const useCallAgentModal = () => {
  const dispatch = useAppDispatch();
  const { isCallActive } = useAppSelector((state) => state.audioMessages);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // react-audio-voice-recorder remains the owner of the stream.
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    mediaRecorder, // We will pass this to our UI component.
  } = useAudioRecorder();

  const { sendMessage, lastMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
  });

  const handleCallButtonClick = useCallback(() => {
    const nextIsCallActive = !isCallActive;
    dispatch(audioMessagesActions.setCallActive(nextIsCallActive));
    if (nextIsCallActive) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isCallActive, dispatch, startRecording, stopRecording]);

  // The VAD logic remains the same, using the stream from the mediaRecorder.
  useEffect(() => {
    if (!isRecording || !mediaRecorder?.stream) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(mediaRecorder.stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let animationFrameId: number;

    const checkSilence = () => {
      analyser.getByteTimeDomainData(dataArray);
      const isSilent = dataArray.every((v) => Math.abs(v - 128) < 5);

      if (isSilent) {
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            stopRecording();
          }, VAD_SILENCE_TIMEOUT_MS);
        }
      } else if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      animationFrameId = requestAnimationFrame(checkSilence);
    };

    animationFrameId = requestAnimationFrame(checkSilence);

    return () => {
      cancelAnimationFrame(animationFrameId);
      audioContext.close();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, [isRecording, mediaRecorder, stopRecording]);

  // Other effects (sending blob, receiving messages) remain unchanged.
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
      const audio = new Audio(blobUrl);
      audio.play().then(() => {
        if (isCallActive) startRecording();
      });
    }
  }, [lastMessage]);

  const onClose = useCallback(() => {
    if (isCallActive) {
      dispatch(audioMessagesActions.setCallActive(false));
      stopRecording();
    }
    dispatch(callAgentModalActions.toggleModal());
  }, [dispatch, isCallActive, stopRecording]);

  // Return the mediaRecorder instance so the UI can access its stream.
  return {
    isCallActive,
    isRecording,
    handleCallButtonClick,
    onClose,
    mediaRecorder,
  };
};
