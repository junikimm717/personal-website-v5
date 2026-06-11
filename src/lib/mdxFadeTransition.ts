const EASE_IN_OUT_QUART = "cubic-bezier(0.76, 0, 0.24, 1)";

const fadePair = {
  old: {
    name: "astroFadeOut",
    duration: "0.25s",
    easing: EASE_IN_OUT_QUART,
    fillMode: "both",
  },
  new: {
    name: "astroFadeIn",
    duration: "0.25s",
    easing: EASE_IN_OUT_QUART,
    fillMode: "both",
  },
};

export const mdxFadeTransition = {
  forwards: fadePair,
  backwards: fadePair,
};
