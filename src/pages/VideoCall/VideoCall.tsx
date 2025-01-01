import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';

type PeerInfo = {
  peer: Peer.Instance;
  stream: MediaStream;
};

const VideoCall: React.FC = () => {
  const [peers, setPeers] = useState<PeerInfo[]>([]);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const localVideo = useRef<HTMLVideoElement>(null);
  const localStream = useRef<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<{ id: string; peer: Peer.Instance }[]>([]);

  const roomId = 'exampleRoom';

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localStream.current = stream;

      if (localVideo.current) {
        localVideo.current.srcObject = stream;
      }

      socketRef.current?.emit('join-room', roomId, socketRef.current.id);

      socketRef.current?.on('user-connected', (userId: string) => {
        const peer = createPeer(userId, stream);
        peersRef.current.push({ id: userId, peer });
      });

      socketRef.current?.on('signal', ({ from, signal }) => {
        const peer = peersRef.current.find((p) => p.id === from)?.peer;
        if (peer) peer.signal(signal);
      });

      socketRef.current?.on('user-disconnected', (userId: string) => {
        setPeers((prev) => prev.filter((peerInfo) => peerInfo.peer !== userId));
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const createPeer = (userId: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current?.emit('signal', { to: userId, signal });
    });

    peer.on('stream', (userStream) => {
      setPeers((prev) => [...prev, { peer, stream: userStream }]);
    });

    return peer;
  };

  const toggleMic = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicEnabled(audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setCameraEnabled(videoTrack.enabled);
    }
  };

  return (
    <div>
      <video ref={localVideo} autoPlay playsInline muted />
      {peers.map((peerInfo, index) => (
        <video key={index} srcObject={peerInfo.stream} autoPlay playsInline />
      ))}
      <div>
        <button onClick={toggleMic}>{micEnabled ? 'Mute Mic' : 'Unmute Mic'}</button>
        <button onClick={toggleCamera}>{cameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}</button>
      </div>
    </div>
  );
};

export default VideoCall;
