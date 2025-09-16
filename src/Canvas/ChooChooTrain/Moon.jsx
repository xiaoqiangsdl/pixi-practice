import { Assets } from 'pixi.js';
import { useState, useEffect } from 'react';
import { useApplication, useTick } from '@pixi/react';
import MoonSvg from './assets/Moon.svg?raw';

export function Moon() {
  const { app } = useApplication();

  return (
    <pixiGraphics
      x={app.screen.width - 110 - 100}
      y={100}
      draw={(graphics) => {
        graphics.svg(MoonSvg)
        console.log('graphics', graphics)
      }}
    />
  );
}
