import React from 'react';
import Lottie from 'react-lottie';

export default function LottieAnimation({ width, height, ...props }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
    ...props
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
