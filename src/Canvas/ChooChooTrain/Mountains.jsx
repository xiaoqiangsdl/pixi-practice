import { useState, useEffect } from 'react';
import { useApplication, useTick } from '@pixi/react';

// 获取山峰配置
const getMountainConfig = (screenWidth, screenHeight) => {
  const mountainWidth = screenWidth / 2;
  const baseY = screenHeight;

  return [
     {
      name: 'middle',
      startX: screenWidth / 4,
      startY: baseY,
      width: mountainWidth,
      height: (screenHeight * 4) / 5,
      color: 0x7e818f,
    },
    {
      name: 'left',
      startX: 0,
      startY: baseY,
      width: mountainWidth,
      height: screenHeight / 2,
      color: 0xc1c0c2,
    },
    {
      name: 'right',
      startX: screenWidth / 2,
      startY: baseY,
      width: mountainWidth,
      height: (screenHeight * 2) / 3,
      color: 0x8c919f,
    },
  ];
};

// 绘制单个山峰的函数
const drawMountain = (graphics, config) => {
  const { startX, startY, width, height, color } = config;
  
  graphics
    .moveTo(startX, startY)
    .bezierCurveTo(
      startX + width / 2,
      startY - height,
      startX + width / 2,
      startY - height,
      startX + width,
      startY,
    )
    .fill({ color });
};

export function Mountains() {
  const { app } = useApplication();
  const [xs, setXs] = useState([0, -app.screen.width])

  useTick(({deltaTime}) => {
    const dx = deltaTime * 0.5;
    setXs((xs) => {
      return xs.map(x => {
        x -= dx
        if (x <  -app.screen.width) {
          x += app.screen.width * 2;
        }
        return x;
      })
    })
  })

  return (
    xs.map((x) => (
      <pixiGraphics
        x={x}
        draw={(graphics) => {
          graphics.clear();
          const mountainConfigs = getMountainConfig(app.screen.width, app.screen.height);
          // 绘制所有山峰
          mountainConfigs.forEach(config => {
            drawMountain(graphics, config);
          });
        }}
      />
    ))
  );
}
