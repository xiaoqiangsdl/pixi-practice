import { Assets } from 'pixi.js';
import { useState, useEffect } from 'react';
import { useApplication, useTick } from '@pixi/react';
import { FISH_TYPES } from './constants';

const STAR_COUNT = 20;

export function Stars() {
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
      graphics.clear()
      stars.forEach(({ x, y, radius, rotation }) => {
        graphics
          .star(x, y, 5, radius, 0, rotation)
          .fill({ color: 0xffdf00, alpha: radius / 5 });
      })
    }}/>
  );
}
