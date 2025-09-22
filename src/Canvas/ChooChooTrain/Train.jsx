import { useState, useRef } from 'react';
import { useApplication, useTick } from '@pixi/react';

// 火车头配置常量
const FRONT_HEIGHT = 100;
const FRONT_WIDTH = 140;
const FRONT_RADIUS = FRONT_HEIGHT / 2;

// 驾驶室配置常量
const CABIN_HEIGHT = 200;
const CABIN_WIDTH = 150;
const CABIN_RADIUS = 15;

// 烟囱配置常量
const CHIMNEY_BASE_WIDTH = 30;
const CHIMNEY_TOP_WIDTH = 50;
const CHIMNEY_HEIGHT = 70;
const CHIMNEY_DOME_HEIGHT = 25;

// 屋顶配置常量
const ROOF_HEIGHT = 25;
const ROOF_EXCESS = 20;

// 车门配置常量
const DOOR_WIDTH_RATIO = 0.7;
const DOOR_HEIGHT_RATIO = 0.7;

// 车窗配置常量
const WINDOW_WIDTH_RATIO = 0.8;
const WINDOW_HEIGHT_RATIO = 0.4;

// 车厢配置常量
const CONTAINER_HEIGHT = 125;
const CONTAINER_WIDTH = 200;
const CONTAINER_RADIUS = 15;
const EDGE_HEIGHT = 25;
const EDGE_EXCESS = 20;
const CONNECTOR_WIDTH = 30;
const CONNECTOR_HEIGHT = 10;
const CONNECTOR_GAP = 10;
const CONNECTOR_OFFSET_Y = 20;

// 车轮配置常量
const BIG_WHEEL_RADIUS = 55;
const SMALL_WHEEL_RADIUS = 35;
const WHEEL_GAP = 5;
const WHEEL_OFFSET_Y = 5;

// 动画配置常量
const SHAKE_DISTANCE = 3;
const ANIMATION_SPEED = 0.5;
const TRAIN_SCALE = 0.75;

// 颜色配置常量
const CHIMNEY_COLOR = 0x121212;
const HEAD_FRONT_COLOR = 0x7f3333;
const CABIN_COLOR = 0x725f19;
const ROOF_COLOR = 0x52431c;
const DOOR_BORDER_COLOR = 0x52431c;
const WINDOW_COLOR = 0x848484;
const WHEEL_COLOR = 0x848484;
const TYRE_COLOR = 0x121212;
const SPOKE_COLOR = 0x4f4f4f;
const CONNECTOR_COLOR = 0x121212;

function TrainWheel({ radius, x, y, rotationSpeed = 1 }) {
  const strokeThickness = radius / 3;
  const innerRadius = radius - strokeThickness;
  const [rotation, setRotation] = useState(0);

  useTick(({ deltaTime }) => {
    const dr = deltaTime * 0.15 * rotationSpeed;
    setRotation(prev => prev + dr);
  });

  return (
    <pixiGraphics
      x={x}
      y={y}
      rotation={rotation}
      draw={(graphics) => {
        graphics.clear();
        // 绘制车轮
        graphics.circle(0, 0, radius).fill({ color: WHEEL_COLOR });
        // 绘制轮胎
        graphics.stroke({ color: TYRE_COLOR, width: strokeThickness, alignment: 1 });
        // 绘制辐条
        graphics.rect(-strokeThickness / 2, -innerRadius, strokeThickness, innerRadius * 2);
        graphics.rect(-innerRadius, -strokeThickness / 2, innerRadius * 2, strokeThickness);
        graphics.fill({ color: SPOKE_COLOR });
      }}
    />
  );
}

function TrainHead() {
  // 计算各部件的尺寸和位置
  const chimneyTopOffset = (CHIMNEY_TOP_WIDTH - CHIMNEY_BASE_WIDTH) / 2;
  const chimneyStartX = CABIN_WIDTH + FRONT_WIDTH - FRONT_RADIUS - CHIMNEY_BASE_WIDTH;
  const chimneyStartY = -FRONT_HEIGHT;
  
  const doorWidth = CABIN_WIDTH * DOOR_WIDTH_RATIO;
  const doorHeight = CABIN_HEIGHT * DOOR_HEIGHT_RATIO;
  const doorStartX = (CABIN_WIDTH - doorWidth) * 0.5;
  const doorStartY = -(CABIN_HEIGHT - doorHeight) * 0.5 - doorHeight;
  
  const windowWidth = doorWidth * WINDOW_WIDTH_RATIO;
  const windowHeight = doorHeight * WINDOW_HEIGHT_RATIO;
  const windowOffset = (doorWidth - windowWidth) / 2;

  // 车轮位置计算
  const backWheelX = BIG_WHEEL_RADIUS;
  const midWheelX = backWheelX + BIG_WHEEL_RADIUS + SMALL_WHEEL_RADIUS + WHEEL_GAP;
  const frontWheelX = midWheelX + SMALL_WHEEL_RADIUS * 2 + WHEEL_GAP;

  return (
    <pixiContainer>
      {/* 火车头主体 */}
      <pixiGraphics
        draw={(graphics) => {
          graphics.clear();
          
          // 绘制烟囱
          graphics.moveTo(chimneyStartX, chimneyStartY);
          graphics.lineTo(chimneyStartX - chimneyTopOffset, chimneyStartY - CHIMNEY_HEIGHT + CHIMNEY_DOME_HEIGHT);
          graphics.quadraticCurveTo(
            chimneyStartX + CHIMNEY_BASE_WIDTH / 2,
            chimneyStartY - CHIMNEY_HEIGHT - CHIMNEY_DOME_HEIGHT,
            chimneyStartX + CHIMNEY_BASE_WIDTH + chimneyTopOffset,
            chimneyStartY - CHIMNEY_HEIGHT + CHIMNEY_DOME_HEIGHT,
          );
          graphics.lineTo(chimneyStartX + CHIMNEY_BASE_WIDTH, chimneyStartY);
          graphics.fill({ color: CHIMNEY_COLOR });

          // 绘制火车头前部
          graphics.roundRect(
            CABIN_WIDTH - FRONT_RADIUS - CABIN_RADIUS,
            -FRONT_HEIGHT,
            FRONT_WIDTH + FRONT_RADIUS + CABIN_RADIUS,
            FRONT_HEIGHT,
            FRONT_RADIUS,
          );
          graphics.fill({ color: HEAD_FRONT_COLOR });

          // 绘制驾驶室
          graphics.roundRect(0, -CABIN_HEIGHT, CABIN_WIDTH, CABIN_HEIGHT, CABIN_RADIUS);
          graphics.fill({ color: CABIN_COLOR });

          // 绘制屋顶
          graphics.rect(-ROOF_EXCESS / 2, CABIN_RADIUS - CABIN_HEIGHT - ROOF_HEIGHT, CABIN_WIDTH + ROOF_EXCESS, ROOF_HEIGHT);
          graphics.fill({ color: ROOF_COLOR });

          // 绘制车门
          graphics.roundRect(doorStartX, doorStartY, doorWidth, doorHeight, CABIN_RADIUS);
          graphics.stroke({ color: DOOR_BORDER_COLOR, width: 3 });

          // 绘制车窗
          graphics.roundRect(doorStartX + windowOffset, doorStartY + windowOffset, windowWidth, windowHeight, 10);
          graphics.fill({ color: WINDOW_COLOR });
        }}
      />

      {/* 火车头车轮 */}
      <TrainWheel
        radius={BIG_WHEEL_RADIUS}
        x={backWheelX}
        y={WHEEL_OFFSET_Y}
        rotationSpeed={SMALL_WHEEL_RADIUS / BIG_WHEEL_RADIUS}
      />
      <TrainWheel
        radius={SMALL_WHEEL_RADIUS}
        x={midWheelX}
        y={WHEEL_OFFSET_Y + BIG_WHEEL_RADIUS - SMALL_WHEEL_RADIUS}
        rotationSpeed={1}
      />
      <TrainWheel
        radius={SMALL_WHEEL_RADIUS}
        x={frontWheelX}
        y={WHEEL_OFFSET_Y + BIG_WHEEL_RADIUS - SMALL_WHEEL_RADIUS}
        rotationSpeed={1}
      />
    </pixiContainer>
  );
}

function TrainCarriage() {
  const centerX = (CONTAINER_WIDTH + EDGE_EXCESS) / 2;
  const wheelGap = 40;
  const offsetX = SMALL_WHEEL_RADIUS + wheelGap / 2;

  return (
    <pixiContainer x={-(CONTAINER_WIDTH + EDGE_EXCESS / 2 + CONNECTOR_WIDTH)}>
      {/* 车厢主体 */}
      <pixiGraphics
        draw={(graphics) => {
          graphics.clear();
          
          // 绘制车厢主体
          graphics.roundRect(EDGE_EXCESS / 2, -CONTAINER_HEIGHT, CONTAINER_WIDTH, CONTAINER_HEIGHT, CONTAINER_RADIUS);
          graphics.fill({ color: CABIN_COLOR });

          // 绘制顶部边缘
          graphics.rect(0, CONTAINER_RADIUS - CONTAINER_HEIGHT - EDGE_HEIGHT, CONTAINER_WIDTH + EDGE_EXCESS, EDGE_HEIGHT);
          graphics.fill({ color: ROOF_COLOR });

          // 绘制连接器
          graphics.rect(CONTAINER_WIDTH + EDGE_EXCESS / 2, -CONNECTOR_OFFSET_Y - CONNECTOR_HEIGHT, CONNECTOR_WIDTH, CONNECTOR_HEIGHT);
          graphics.rect(
            CONTAINER_WIDTH + EDGE_EXCESS / 2,
            -CONNECTOR_OFFSET_Y - CONNECTOR_HEIGHT * 2 - CONNECTOR_GAP,
            CONNECTOR_WIDTH,
            CONNECTOR_HEIGHT,
          );
          graphics.fill({ color: CONNECTOR_COLOR });
        }}
      />

      {/* 车厢车轮 */}
      <TrainWheel
        radius={SMALL_WHEEL_RADIUS}
        x={centerX - offsetX}
        y={25}
        rotationSpeed={1}
      />
      <TrainWheel
        radius={SMALL_WHEEL_RADIUS}
        x={centerX + offsetX}
        y={25}
        rotationSpeed={1}
      />
    </pixiContainer>
  );
}

export function Train({ onPositionChange }) {
  const { app } = useApplication();
  const [shakeOffset, setShakeOffset] = useState(0);
  const elapsedRef = useRef(0);

  // 计算火车位置
  const headWidth = CABIN_WIDTH + FRONT_WIDTH;
  const trainX = app.screen.width / 2 - headWidth / 2;
  const baseY = app.screen.height - 35 - 55 * TRAIN_SCALE;

  useTick(({ deltaTime }) => {
    elapsedRef.current += deltaTime;
    const offset = (Math.sin(elapsedRef.current * 0.5 * ANIMATION_SPEED) * 0.5 + 0.5) * SHAKE_DISTANCE;
    setShakeOffset(offset);

    // 传递烟囱位置给父组件
    if (onPositionChange) {
      const currentChimneyX = trainX + (CABIN_WIDTH + FRONT_WIDTH - FRONT_RADIUS - CHIMNEY_BASE_WIDTH / 2) * TRAIN_SCALE;
      const currentChimneyY = (baseY + offset) + (-FRONT_HEIGHT - CHIMNEY_HEIGHT) * TRAIN_SCALE;
      onPositionChange(currentChimneyX, currentChimneyY);
    }
  });

  return (
    <pixiContainer 
      x={trainX} 
      y={baseY + shakeOffset} 
      scale={{ x: TRAIN_SCALE, y: TRAIN_SCALE }}
    >
      <TrainHead />
      <TrainCarriage />
    </pixiContainer>
  );
}