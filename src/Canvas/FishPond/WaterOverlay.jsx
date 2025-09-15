import { Assets } from 'pixi.js';
import { useApplication, useTick } from '@pixi/react';
import { POND_ASSETS } from './constants';
import { useState } from 'react';

export function WaterOverlay() {
  const { app } = useApplication();
  const [tilePosition, setTilePosition] = useState({ x: 0, y: 0 });
 
  const texture = Assets.get(POND_ASSETS.OVERLAY);

  useTick(({ deltaTime }) => { 
    setTilePosition(prevPosition => ({
      x: prevPosition.x - deltaTime,
      y: prevPosition.y - deltaTime,
    }))
  });
  
  return (
    <pixiTilingSprite
      width={app.screen.width}
      height={app.screen.height}
      texture={texture}
      tilePosition={tilePosition}
    />
  );
}
