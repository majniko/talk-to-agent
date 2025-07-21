'use client';

import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import classes from './audio-visualizer.module.scss';

export const AudioVisualizer = ({ stream }: { stream?: MediaStream }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<RecordPlugin | null>(null);

  useEffect(() => {
    if (containerRef.current && !wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        height: 60,
        width: 100,
        waveColor: '#ff4500',
        progressColor: '#cc3700',
        barWidth: 2,
        barGap: 1,
      });

      recordPluginRef.current = wavesurfer.registerPlugin(
        RecordPlugin.create(),
      );
      wavesurferRef.current = wavesurfer;

      if (stream) recordPluginRef.current.renderMicStream(stream);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [stream, containerRef, wavesurferRef, recordPluginRef]);

  return <div ref={containerRef} className={classes.container} />;
};
