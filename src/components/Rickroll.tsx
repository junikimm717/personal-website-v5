import React from "react";
import useMediaQuery from "@lib/mediaquery";

export default function Rickroll() {
  const small = useMediaQuery("(max-width: 400px)");
  const medium = useMediaQuery("(max-width: 700px)");
  let dimensions = [600, 400];
  if (small) {
    dimensions = [200, 400 / 3];
  } else if (medium) {
    dimensions = [(600 * 2) / 3, (400 * 2) / 3];
  }
  return (
    <div className="flex justify-center items-center w-full">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0"
        width={dimensions[0]}
        height={dimensions[1]}
        allowFullScreen
      />
    </div>
  );
}
