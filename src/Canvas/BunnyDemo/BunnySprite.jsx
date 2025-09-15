import {
  Assets,
  Texture,
} from 'pixi.js';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTick, useApplication } from '@pixi/react';

export function BunnySprite() {
  // The Pixi.js `Sprite`
  const spriteRef = useRef(null)
  const { app } = useApplication();

  const [texture, setTexture] = useState(Texture.EMPTY)
  const [isHovered, setIsHover] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [position] = useState({
    x: 100,
    y: 100,
  })

  useTick((ticker) => { 
    if (spriteRef.current && isHovered) {
      spriteRef.current.rotation += 0.1 * ticker.deltaTime;
    }
  });
  
  // Preload the sprite if it hasn't been loaded yet
  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load('https://pixijs.com/assets/bunny.png')
        .then((result) => {
          setTexture(result)
        });
    }
  }, [texture]);

  if (!app || texture === Texture.EMPTY) {
    return null;
  }

  return (
    <pixiContainer>
      <pixiSprite
        ref={spriteRef}
        anchor={0.5}
        eventMode={'static'}
        position={position}
        
        onClick={() => setIsActive(!isActive)}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => setIsHover(false)}
        scale={isActive ? 1 : 1.5}
        texture={texture}
      />
      
      {isHovered && (
        <pixiGraphics
          draw={(graphics) => {
            const sprite = spriteRef.current;
            const bounds = sprite.getBounds();
            
            graphics.clear();
            graphics.rect(bounds.x, bounds.y, bounds.width, bounds.height);
            graphics.stroke({ color: 0xff0000, width: 2 });
          }}
        />
      )}
    </pixiContainer>
  );
}
