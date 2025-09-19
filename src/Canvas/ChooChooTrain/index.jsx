import {
  Application,
  extend,
} from '@pixi/react';
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js';

import { TopLeftCoordinateSystem } from '../components/TopLeftCoordinateSystem'
import { useContainerSize } from '../../hooks/useContainerSize'
import { Stars } from './Stars';
import { Moon } from './Moon';
import { Mountains } from './Mountains';
import { Trees } from './Trees';
import { Ground } from './Ground';
import { Train } from './Train';

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});


export default function App() {
  // 使用自定义 Hook 监听容器尺寸变化
  const { containerRef, canvasSize } = useContainerSize();

  if (!containerRef.current) {
    return <div ref={containerRef} className="w-full h-full">loading...</div>
  }
  
  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <Application 
        background="#021f4b"
        resizeTo={containerRef.current}
      >
        <TopLeftCoordinateSystem
          width={canvasSize.width} 
          height={canvasSize.height}
          gridSize={50}
        />
        <Stars />
        <Moon />
        <Mountains />
        <Trees/>
        <Ground />
        <Train />
      </Application>
    </div>
  );
}