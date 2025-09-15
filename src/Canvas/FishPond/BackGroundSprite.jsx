import { Assets } from 'pixi.js';
import { useState, useEffect } from 'react';
import { useApplication } from '@pixi/react';
import { POND_ASSETS } from './constants'

export function BackGroundSprite() {
  const { app } = useApplication();
  const [position, setPosition] = useState({
    x: app.screen.width / 2,
    y: app.screen.height / 2,
  });
  const [scale, setScale] = useState(1);

  // 直接获取已加载的 texture
  const backgroundTexture = Assets.get(POND_ASSETS.BACKGROUND);

  useEffect(() => {
    if (!backgroundTexture) return;
    
    const updateScaleAndPosition = () => {
      console.log('Updating scale and position');
      // 更新位置到屏幕中心
      setPosition({
        x: app.screen.width / 2,
        y: app.screen.height / 2,
      });
      
      // 计算缩放比例以完全覆盖屏幕（类似 CSS background-size: cover）
      const scaleX = app.screen.width / backgroundTexture.width;
      const scaleY = app.screen.height / backgroundTexture.height;
      
      // 取较大的缩放比例，确保图片完全覆盖屏幕
      setScale(Math.max(scaleX, scaleY));
    };

    // 初始化
    updateScaleAndPosition();

    // 监听窗口大小变化
    window.addEventListener('resize', updateScaleAndPosition);

    return () => {
      window.removeEventListener('resize', updateScaleAndPosition);
    };
  }, [app.screen, backgroundTexture]);

  console.log('backgroundTexture', backgroundTexture);
  

  return (
    <pixiSprite
      anchor={0.5}
      eventMode={'static'}
      scale={{ x: scale, y: scale }}
      position={position}
      texture={backgroundTexture}
    />
  );
}
