import { Assets } from 'pixi.js';
import { useState, useEffect } from 'react';
import { useApplication, useTick } from '@pixi/react';
import { FISH_TYPES } from './constants';

const STAR_COUNT = 20;

export function Mountains() {
  const { app } = useApplication();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starsData = []
    for (let index = 0; index < STAR_COUNT; index++) {
      const x = (index * 0.78695 * app.screen.width) % app.screen.width;
      const y = (index * 0.9382 * app.screen.height) % app.screen.height;
      const radius = 2 + Math.random() * 3;
      const rotation = Math.random() * Math.PI * 2;

      starsData.push({ x, y, radius, rotation })
    }

    setStars(starsData)
  }, [app])

  return (
    <pixiGraphics draw={(graphics) => {
      const width = app.screen.width / 2;

      // Starting point on the y-axis of all the mountains.
      // This is the bottom of the screen.
      const startY = app.screen.height;

      // Start point on the x-axis of the individual mountain.
      const startXLeft = 0;
      const startXMiddle = Number(app.screen.width) / 4;
      const startXRight = app.screen.width / 2;

      // Height of the individual mountain.
      const heightLeft = app.screen.height / 2;
      const heightMiddle = (app.screen.height * 4) / 5;
      const heightRight = (app.screen.height * 2) / 3;

      // Color of the individual mountain.
      const colorLeft = 0xc1c0c2;
      const colorMiddle = 0x7e818f;
      const colorRight = 0x8c919f;

      graphics
        // Draw the middle mountain
        .moveTo(startXMiddle, startY)
        .bezierCurveTo(
          startXMiddle + width / 2,
          startY - heightMiddle,
          startXMiddle + width / 2,
          startY - heightMiddle,
          startXMiddle + width,
          startY,
        )
        .fill({ color: colorMiddle })
    }}/>
  );
}
