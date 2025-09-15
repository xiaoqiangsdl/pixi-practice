import {
  Application,
  extend,
} from '@pixi/react';
import {
  Container,
  Graphics,
  Sprite,
  TilingSprite,
  DisplacementFilter,
} from 'pixi.js';

import { BackGroundSprite } from './BackGroundSprite'
// import { CoordinateSystem } from './components/CoordinateSystem'
import { TopLeftCoordinateSystem } from '../components/TopLeftCoordinateSystem'
import { useAssets } from '../../hooks/useAssets'
import { useContainerSize } from '../../hooks/useContainerSize'
import { FISH_POND_ASSETS } from './constants'
import { Fishes } from './Fishes';
import { WaterOverlay } from './WaterOverlay';
import { DisplacementEffect } from './DisplacementEffect';

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  TilingSprite,
  DisplacementFilter,
});


export default function App() {
  // 使用自定义 Hook 监听容器尺寸变化
  const { containerRef, canvasSize } = useContainerSize();

  // 使用自定义 Hook 加载资源
  const { loaded, loading, error } = useAssets(FISH_POND_ASSETS);

  // 加载状态处理
  if (loading) {
    return <div ref={containerRef} className="w-full h-full flex items-center justify-center">Loading assets...</div>;
  }
  
  if (error) {
    return <div ref={containerRef} className="w-full h-full flex items-center justify-center text-red-500">Error: {error.message}</div>;
  }
  
  if (!loaded || !containerRef.current) {
    return <div ref={containerRef} className="w-full h-full flex items-center justify-center">Initializing...</div>;
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
        <BackGroundSprite/>
        <Fishes />
        <WaterOverlay />
        <DisplacementEffect />
      </Application>
    </div>
  );
}