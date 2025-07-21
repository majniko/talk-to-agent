'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useWavesurfer } from '@wavesurfer/react';
import { PlayIcon, PauseIcon } from 'lucide-react';
import classes from './audio-visualizer.module.scss';
import { Button } from '@components/button';

type VisualizerProps = {
  stream?: MediaStream;
  url?: string;
};

export const AudioVisualizer = ({ stream, url }: VisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 60,
    waveColor: '#ff4500',
    progressColor: '#cc3700',
    barWidth: 2,
    barGap: 1,
    url: url, // The hook can take a URL directly
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  // This effect handles loading the live stream
  useEffect(() => {
    if (stream && wavesurfer) {
      const audioEl = document.createElement('audio');
      audioEl.srcObject = stream;
      audioEl.muted = true;
      // Use the loadElement method for HTML elements
      wavesurfer.setMediaElement(audioEl);
    }
  }, [stream, wavesurfer]);

  return (
    <div className={classes.wrapper}>
      {/* Show a play/pause button only when playing back a recorded URL */}
      {url && (
        <Button onClick={onPlayPause} className={classes.playButton}>
          {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </Button>
      )}
      <div ref={containerRef} className={classes.container} />
    </div>
  );
};
