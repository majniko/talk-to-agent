# Talk to Agent 🗣️

This is a web application that allows users to have a real-time voice conversation with a virtual agent. It captures microphone input, sends it to a backend for processing, and plays back the agent's audio response, complete with dynamic audio visualizations.

## ✨ Features

* **Real-time Voice Chat**: Engage in a seamless, real-time conversation with a backend agent using WebSockets.
* **Voice Activity Detection (VAD)**: The app intelligently detects when you've finished speaking and automatically sends your message.
* **Live Audio Visualization**: See your voice visualized in real-time as you speak.
* **Audio Replay & Visualization**: Real-time waveform is displayed during recording using `wavesurfer.js`, giving user valuable feedback.
* **State Management**: Built with a scalable Redux Toolkit setup for predictable state management.
* **Modern Frontend**: A responsive and clean interface built with Next.js and React.

## 🛠️ Tech Stack

* **Framework**: Next.js
* **Library**: React
* **State Management**: Redux Toolkit
* **Audio Visualization**: `wavesurfer.js`
* **Communication**: WebSocket (`react-use-websocket`)

## 🚀 Getting Started

If you do not want to install and run this app yourself, just visit https://talk-to-agent.vercel.app. (Still requires backend running at `ws://localhost:8080`)

### Prerequisites

* Node.js (v18 or later recommended)
* npm

### Installation

1.  Clone the repository to your local machine.
    ```bash
    git clone https://github.com/majniko/talk-to-agent.git
    ```
2.  Navigate into the project directory.
    ```bash
    cd talk-to-agent
    ```
3.  Install the required dependencies.
    ```bash
    npm install
    ```

### Running the Application

1.  Start the development server.
    ```bash
    next dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.
3.  **Note**: This frontend application requires a running WebSocket backend server at `ws://localhost:8080` to function correctly.