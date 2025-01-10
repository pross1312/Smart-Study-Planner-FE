import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";

type PeerInfo = {
    peer: Peer.Instance;
    stream: MediaStream;
};

const VideoRoom: React.FC = () => {
    const [peers, setPeers] = useState<PeerInfo[]>([]);
    const [micEnabled, setMicEnabled] = useState(true);
    const [cameraEnabled, setCameraEnabled] = useState(true);

    const localVideo = useRef<HTMLVideoElement>(null);
    const localStream = useRef<MediaStream | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const peersRef = useRef<{ id: string; peer: Peer.Instance }[]>([]);

    const roomId = "exampleRoom";

    useEffect(() => {
        // Kết nối socket.io
        socketRef.current = io("http://localhost:3000");

        // Lấy stream của người dùng
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localStream.current = stream;

                if (localVideo.current) {
                    localVideo.current.srcObject = stream;
                }

                socketRef.current?.emit(
                    "join-room",
                    roomId,
                    socketRef.current.id
                );

                socketRef.current?.on("user-connected", (userId: string) => {
                    const peer = createPeer(userId, stream);
                    console.log(peer);
                    peersRef.current.push({ id: userId, peer });
                });

                socketRef.current?.on("signal", ({ from, signal }) => {
                    let peer = peersRef.current.find(
                        (p) => p.id === from
                    )?.peer;
                    if (!peer) {
                        peer = addPeer(from, stream); // Use addPeer here for incoming signals
                        peersRef.current.push({ id: from, peer });
                    }
                    peer.signal(signal);
                });

                socketRef.current?.on("user-disconnected", (userId: string) => {
                    // setPeers((prev) =>
                    //     // prev.filter((peerInfo) => peerInfo.peer !== userId)
                    // );
                    console.log(userId);
                });
            });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const addPeer = (userId: string, stream: MediaStream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current?.emit("signal", { to: userId, signal });
        });

        peer.on("stream", (userStream) => {
            setPeers((prev) => [...prev, { peer, stream: userStream }]);
        });

        return peer;
    };

    const createPeer = (userId: string, stream: MediaStream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current?.emit("signal", { to: userId, signal });
        });

        peer.on("stream", (userStream) => {
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

    useEffect(() => {
        console.log(peers.length);
    }, [peers]);

    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden bg-slate-600">
            <div className="w-5/6 h-5/6 grid grid-cols-4 gap-4 p-4 bg-black rounded-lg">
                <div>
                    <video
                        className="col-start-1 max-w-[360px] max-h-96"
                        ref={localVideo}
                        autoPlay
                        playsInline
                        muted
                    />

                    <div>
                        <button onClick={toggleMic}>
                            {micEnabled ? "Mute Mic" : "Unmute Mic"}
                        </button>
                        <button onClick={toggleCamera}>
                            {cameraEnabled
                                ? "Turn Off Camera"
                                : "Turn On Camera"}
                        </button>
                    </div>
                </div>
                {peers.map((peerInfo, index) => (
                    <video
                        key={index}
                        ref={(video) => {
                            if (video) {
                                video.srcObject = peerInfo.stream;
                            }
                        }}
                        autoPlay
                        playsInline
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoRoom;
