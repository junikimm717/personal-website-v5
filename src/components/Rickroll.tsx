import React from "react";

export default function Rickroll() {
  return (
    <div className="flex justify-center items-center w-full">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0"
        className="rickroll-frame"
        title="Rick Astley - Never Gonna Give You Up"
        allowFullScreen
      />
    </div>
  );
}
