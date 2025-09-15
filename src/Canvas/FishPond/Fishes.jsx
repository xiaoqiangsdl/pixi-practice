import { Assets } from 'pixi.js';
import { useState, useEffect } from 'react';
import { useApplication, useTick } from '@pixi/react';
import { FISH_TYPES } from './constants';

const FISH_COUNT = 20;
const FISH_TYPES_ARRAY = Object.values(FISH_TYPES);

export function Fishes() {
  const { app } = useApplication();
  const [fishes, setFishes] = useState([]);

  useEffect(() => {
    const fishesData = []
    for (let i = 0; i < FISH_COUNT; i++) {  
      const fish = {};

      fish.id = Math.random();

      const asset = FISH_TYPES_ARRAY[i % FISH_TYPES_ARRAY.length];
      fish.texture = Assets.get(asset);

      fish.direction = Math.random() * Math.PI * 2;
      fish.speed = 2 + Math.random() * 2;
      fish.turnSpeed = Math.random() - 0.8;

      fish.x = Math.random() * app.screen.width;
      fish.y = Math.random() * app.screen.height;

      fish.scale = 0.5 + Math.random() * 0.2;
      fishesData.push(fish);
    }
    setFishes(fishesData);
  }, [app]);

  useTick(({ deltaTime }) => { 
    setFishes(prevFishes => prevFishes.map((fish) => {

      fish.direction += fish.turnSpeed * 0.01;

      fish.x += Math.sin(fish.direction) * fish.speed * deltaTime;
      fish.y += Math.cos(fish.direction) * fish.speed * deltaTime;
      fish.rotation = -fish.direction - Math.PI / 2;

      const stagePadding = 50;
      // 边界处理，鱼游出屏幕后从另一侧出现
      if (fish.x < -stagePadding) fish.x = app.screen.width + stagePadding;
      if (fish.x > app.screen.width + stagePadding) fish.x = -stagePadding;
      if (fish.y < -stagePadding) fish.y = app.screen.height + stagePadding;
      if (fish.y > app.screen.height + stagePadding) fish.y = -stagePadding;

      return fish;
    }));
  });


  // 点击鱼时翻转方向
  const handleFishClick = (fishId) => {
    setFishes(prevFishes => 
      prevFishes.map(fish => 
        fish.id === fishId 
          ? { ...fish, direction: fish.direction + Math.random() * 2 * Math.PI }
          : fish
      )
    );
  };

  return (
    <pixiContainer>
      {fishes.map((fish) => (
        <pixiSprite
          key={fish.id}
          anchor={0.5}
          texture={fish.texture}
          x={fish.x}
          y={fish.y}
          scale={fish.scale}
          rotation={fish.rotation}
          interactive={true}
          cursor="pointer"
          onClick={() => handleFishClick(fish.id)}
        />
      ))}
    </pixiContainer>
  );
}
