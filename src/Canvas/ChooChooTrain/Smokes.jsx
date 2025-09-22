
import { useState, useEffect } from 'react';
import { useTick } from '@pixi/react';

// 烟雾配置常量
const SMOKE_RADIUS = 80;                
const SMOKE_COLOR = 0xc9c9c9;         

const SMOKE_COUNT = 7;             
const GROUP_COUNT = 5;             


export function Smokes({ baseX = 600, baseY = 600 }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const groupsData = [];
      

    for (let index = 0; index < GROUP_COUNT; index++) {
      const group = {
        x: baseX,
        y: baseY,
        scale: { x: 1, y: 1 },
        alpha: 1,
        tick: index * (1 / GROUP_COUNT),
        smokes: []
      };
      for(let j = 0; j < SMOKE_COUNT; j++) {
        group.smokes.push({
          x: (Math.random() * 2 - 1) * 40,
          y: (Math.random() * 2 - 1) * 40,
          radius: 20 + Math.random() * 20,
        });
      }
      groupsData.push(group);
    }
    setGroups(groupsData)
  }, [])

  useTick((time) => {
    const dt = time.deltaTime * 0.01;

    setGroups(prevGroups => 
      prevGroups.map(group => ({
        ...group,
        tick: (group.tick + dt) % 1,
        x: baseX - Math.pow((group.tick + dt) % 1, 2) * 400,
        y: baseY - ((group.tick + dt) % 1) * 200,
        scale: Math.pow((group.tick + dt) % 1, 0.75),
        alpha: 1 - Math.pow((group.tick + dt) % 1, 0.5)
      }))
    );
  })

  return (
    groups.map((group, index) => (
      <pixiContainer x={group.x} y={group.y} scale={group.scale} alpha={group.alpha} key={index}>
        {group.smokes.map((smoke, smokeIndex) => (
          <pixiGraphics
            x={smoke.x}
            y={smoke.y}
            key={smokeIndex}
            draw={(graphics) => {
              graphics.clear();
              graphics.circle(0, 0, SMOKE_RADIUS / 2);
              graphics.fill({ color: SMOKE_COLOR })
            }}
          />
        ))}
      </pixiContainer>
    ))
  );
}
