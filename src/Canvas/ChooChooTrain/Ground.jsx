import { useState, useEffect } from 'react';
import { useApplication, useTick } from '@pixi/react';

// 地面配置常量
const GROUND_COLOR = 0xdddddd;               
const GROUND_HEIGHT = 20;

// 铁轨配置常量
const RAIL_COLOR = 0x5c5c5c;               
const RAIL_HEIGHT = 7.5;     

// 轨道板配置常量
const PLANK_COLOR = 0x241811;         
const PLANK_HEIGHT = 7.5;                
const PLANK_WIDTH = 50;                
const PLANK_GAP = 20;                

export function Ground() {
  const { app } = useApplication();
  const [planks, setPlanks] = useState([])

  useEffect(() => {
    // 计算水平填充屏幕所需的树木数量
    const count = app.screen.width / (PLANK_WIDTH + PLANK_GAP) + 1;

    const planksData = [];

    for (let index = 0; index < count; index++) {
      // 创建树实例
      const plank = {}
      // 初始定位树的位置
      plank.x = index * (PLANK_WIDTH + PLANK_GAP);
      plank.c = index;
      // 将树添加到舞台和引用数组中
      planksData.push(plank);
    }

    setPlanks(planksData)
  }, [app.screen.width, app.screen.height])

  useTick(({deltaTime}) => {
    const dx = deltaTime * 3;
   
    setPlanks(prev => prev.map(({ x, ...item }) => {
      let newX = x - dx;
      if (newX < -PLANK_WIDTH) {
        newX += prev.length * (PLANK_WIDTH + PLANK_GAP);
      } 

      return ({
        ...item,
        x: newX
      })
    }))
  })

  return (
    <>
      <pixiGraphics
        draw={(graphics) => {
          graphics.clear();
          graphics.rect(0, app.screen.height - GROUND_HEIGHT, app.screen.width, GROUND_HEIGHT).fill({ color: GROUND_COLOR });
        }}
      />
      <pixiGraphics
        draw={(graphics) => {
          graphics.clear();
          graphics.rect(0, app.screen.height - GROUND_HEIGHT - RAIL_HEIGHT - PLANK_HEIGHT, app.screen.width, RAIL_HEIGHT).fill({ color: RAIL_COLOR });
        }}
      />
      {planks.map((tree) => (
        <pixiGraphics
          key={tree.index}
          draw={(graphics) => {
            graphics.clear();
            graphics.rect(tree.x, app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT, PLANK_WIDTH, PLANK_HEIGHT).fill({ color: PLANK_COLOR });
          }}
        />
      ))}
    </>
  );
}
