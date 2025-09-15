import { Assets, Sprite } from 'pixi.js';
import { POND_ASSETS } from './constants';
import { useMemo } from 'react';

export function DisplacementEffect() {
  const texture = Assets.get(POND_ASSETS.DISPLACEMENT);
  
  // 创建位移精灵
  const displacementSprite = useMemo(() => {
    if (!texture) return null;
    
    const sprite = new Sprite(texture);
    sprite.texture.baseTexture.wrapMode = 'repeat';
    return sprite;
  }, [texture]);

  if (!displacementSprite) {
    return null;
  }

  return (
    <pixiDisplacementFilter
      sprite={displacementSprite}
      scale={50}
    />
  );
}
