import React, { useState } from "react";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import useSound from "use-sound";

interface VolumnInputProps {
    icon: React.ReactNode;
    title: string;
    soundUrl: string | null;
}

const VolumnInput: React.FC<VolumnInputProps> = ({ icon, title, soundUrl }) => {
    const [volume, setVolume] = useState(0);
    const [play, { sound }] = useSound(soundUrl, {
        volume,
    });
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value) / 100;
        if (!isPlaying) {
            setIsPlaying(true);
            play();
        }

        setVolume(newVolume);
        if (sound) {
            sound.volume(newVolume);
        }
    };

    const handleMute = () => {
        if (volume === 0) {
            setVolume(0.5);
            sound.volume(0.5);
        } else {
            setVolume(0);
            sound.volume(0);
        }
    };

    return (
        <div className="flex flex-col gap-1 min-w-full">
            <p className="text-white m-0 text-left">
                {icon}
                <span className="ml-1">{title}</span>
            </p>
            <div className="flex items-center gap-2">
                <button className="text-white" onClick={() => handleMute()}>
                    {volume === 0 ? <FaVolumeMute /> : <FaVolumeHigh />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={handleVolumeChange}
                    className="m-0 p-0 w-full cursor-pointer"
                />
            </div>
        </div>
    );
};

export default VolumnInput;
