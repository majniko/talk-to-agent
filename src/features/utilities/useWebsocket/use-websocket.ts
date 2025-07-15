import { useAudioMessagesSelector } from '@redux/features/audio-messages/hooks';
import { useAppDispatch } from '@redux/hooks';
import { audioMessagesActions } from '@redux/features/audio-messages/slice';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const useWebsocket = () => {
  const socketUrl = 'wss://echo.websocket.org/';
  const dispatch = useAppDispatch();

  // Select the message history from the Redux store
  const audioMessages = useAudioMessagesSelector('messages');

  // This function is called when recording is complete
  const handleRecordingComplete = (blob: Blob) => {
    // 1. Send the audio blob to the WebSocket server
    sendMessage(blob);

    // 2. Create a local URL for the sent audio
    const url = URL.createObjectURL(blob);

    // 3. Dispatch an action to add the sent message to the Redux store
    dispatch(
      audioMessagesActions.addAudioMessage({ blobUrl: url, type: 'sent' }),
    );
  };

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket is Open'),
    // Handle incoming messages
    onMessage: (event: WebSocketEventMap['message']) => {
      if (event.data instanceof Blob) {
        console.log('Received audio blob from server');
        // Create a URL for the received audio
        const url = URL.createObjectURL(event.data);
        // Dispatch an action to add the received message to the store
        dispatch(
          audioMessagesActions.addAudioMessage({
            blobUrl: url,
            type: 'received',
          }),
        );
      }
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return { handleRecordingComplete, sendMessage, readyState, connectionStatus };
};
