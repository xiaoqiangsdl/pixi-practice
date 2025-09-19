import { useState, useRef } from 'react';
import { useApplication, useTick } from '@pixi/react';
import MoonSvg from './assets/Moon.svg?raw';

export function Moon() {
  const { app } = useApplication();
  const [rotation, setRotation] = useState(0);
  const pivotSet = useRef(false);
  
  useTick(({deltaTime}) => {
    setRotation(prev => prev + deltaTime * 0.01);
  });

  return (
    <pixiGraphics
      x={app.screen.width - 100}
      y={100}
      rotation={Math.sin(rotation) * 0.1}
      draw={(graphics) => {
        graphics.clear();
        graphics.svg(MoonSvg);
        
        // 只在第一次设置中心点
        if (!pivotSet.current) {
          const bounds = graphics.getBounds();
          graphics.pivot.set(bounds.width / 2, bounds.height / 2);
          pivotSet.current = true;
        }
      }}
    />
  );
}
