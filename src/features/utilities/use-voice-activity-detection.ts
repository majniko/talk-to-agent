import React, { useEffect } from 'react';

const VAD_SILENCE_TIMEOUT_MS = 2000;
const VAD_THRESHOLD = 5;

export type UseVoiceActivityDetectionProps = {
  isRecording: boolean;
  mediaRecorder?: MediaRecorder;
  silenceTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
  stopRecording: () => void;
};

export const useVoiceActivityDetection = ({
  isRecording,
  mediaRecorder,
  silenceTimerRef,
  stopRecording,
}: UseVoiceActivityDetectionProps) => {
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
      const isSilent = dataArray.every(
        (v) => Math.abs(v - 128) < VAD_THRESHOLD,
      );

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
};
