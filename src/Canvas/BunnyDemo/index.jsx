import {
  Application,
  extend,
} from '@pixi/react';
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js';
import { useState, useEffect, useRef } from 'react';

import { BunnySprite } from './BunnySprite'
// import { CoordinateSystem } from './components/CoordinateSystem'
import { TopLeftCoordinateSystem } from '../components/TopLeftCoordinateSystem'

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

export default function App() {
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 1000,
    height: 1000
  });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setCanvasSize({
          width: clientWidth,
          height: clientHeight
        });
      }
    };

    // 初始化尺寸
    updateSize();

    // 使用 ResizeObserver 监听容器尺寸变化
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  console.log('canvasSize', canvasSize);
  console.log('containerRef', containerRef.current);

  if (!containerRef.current) { 
    return <div ref={containerRef} className="w-full h-full">loading...</div>;
  }
  
  return (
    <div ref={containerRef} className="w-full h-full">
      <Application 
        background="#e2e2e2"
        resizeTo={containerRef.current}
      >
        <TopLeftCoordinateSystem
          width={canvasSize.width} 
          height={canvasSize.height}
          gridSize={50}
        />
        <BunnySprite/>
      </Application>
    </div>
  );
}