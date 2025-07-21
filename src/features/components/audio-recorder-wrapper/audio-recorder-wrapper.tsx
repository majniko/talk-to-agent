'use client';

import React from 'react'; // Make sure React is imported
import { AudioRecorder } from 'react-audio-voice-recorder';

// ✅ Infer the props type directly from the AudioRecorder component
type AudioRecorderProps = React.ComponentProps<typeof AudioRecorder>;

// Your wrapper component now uses the correctly inferred type
export const AudioRecorderWrapper = (props: AudioRecorderProps) => {
  return <AudioRecorder {...props} />;
};
