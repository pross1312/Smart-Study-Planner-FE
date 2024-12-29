import React, { useState, useEffect } from "react";

function VideoPlayer() {
    return (
        <div className="absolute w-full h-0 pb-[56.25%] ">
            <iframe
                id="video-player"
                className="absolute -top-5 left-0 w-full h-full border-0 pointer-events-none"
                src="https://www.youtube.com/embed/uDNr-y7xdiQ?start=60&loop=1&playlist=uDNr-y7xdiQ&showinfo=0&controls=0&disablekb=0&fs=0&rel=0&iv_load_policy=3&autoplay=1&mute=1&modestbranding=1&playsinline=1&enablejsapi=1"
                title="Peaceful Village Ambience - Birds, Farm animals, Distant River"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default VideoPlayer;
