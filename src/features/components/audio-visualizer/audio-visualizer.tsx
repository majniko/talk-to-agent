'use client';

import { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import classes from './audio-visualizer.module.scss';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<RecordPlugin | null>(null);

  useEffect(() => {
    if (containerRef.current && !wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        height: 60,
        waveColor: '#ff4500',
        progressColor: '#cc3700',
        barWidth: 2,
        barGap: 1,
      });

      const record = wavesurfer.registerPlugin(RecordPlugin.create());
      recordPluginRef.current = record;

      record.on('record-start', () => {
        console.log('Recording started');
      });

      record.on('record-end', (blob) => {
        console.log('Recording ended, blob:', blob);
      });

      record.startRecording();

      wavesurferRef.current = wavesurfer;
    }

    return () => {
      if (recordPluginRef.current) {
        recordPluginRef.current.stopRecording();
      }
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className={classes.container} />;
};
