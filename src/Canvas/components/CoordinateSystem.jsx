import { useCallback } from 'react';

// 样式常量
const GRID_STYLE = { width: 1, color: 0x888888, alpha: 0.3 }; // 网格线样式：细灰色半透明
const AXIS_STYLE = { width: 3, color: 0x000000 }; // 坐标轴样式：粗黑色实线
const ARROW_SIZE = 10; // 箭头长度
const ARROW_OFFSET = 5; // 箭头宽度的一半

/**
 * 中心原点坐标系组件
 * 绘制以中心(0,0)为原点的数学坐标系，包含网格线和坐标轴
 * X轴向右为正，Y轴向上为正（符合数学坐标系习惯）
 * @param {number} size - 坐标系半径大小，默认200（当未指定 sizeX/sizeY 时使用）
 * @param {number} sizeX - X轴方向的半径大小，覆盖 size 参数
 * @param {number} sizeY - Y轴方向的半径大小，覆盖 size 参数  
 * @param {number} gridSize - 网格大小，默认50像素
 */
export function CoordinateSystem({ size = 200, sizeX, sizeY, gridSize = 50 }) {
  // 如果提供了 sizeX 和 sizeY，则使用它们，否则使用 size
  const xSize = sizeX !== undefined ? sizeX : size;
  const ySize = sizeY !== undefined ? sizeY : size;
  
  const drawAxes = useCallback((graphics) => {
    graphics.clear();
    
    // 绘制网格
    graphics.setStrokeStyle(GRID_STYLE);
    
    // 垂直网格线
    for (let x = -Math.ceil(xSize / gridSize) * gridSize; x <= Math.ceil(xSize / gridSize) * gridSize; x += gridSize) {
      graphics.moveTo(x, -ySize);
      graphics.lineTo(x, ySize);
      graphics.stroke();
    }
    
    // 水平网格线
    for (let y = -Math.ceil(ySize / gridSize) * gridSize; y <= Math.ceil(ySize / gridSize) * gridSize; y += gridSize) {
      graphics.moveTo(-xSize, y);
      graphics.lineTo(xSize, y);
      graphics.stroke();
    }
    
    // 绘制坐标轴（放在网格线之后，这样轴线会更明显）
    graphics.setStrokeStyle(AXIS_STYLE);
    
    // X轴（就是 y=0 的网格线，但更粗）
    graphics.moveTo(-xSize, 0);
    graphics.lineTo(xSize, 0);
    graphics.stroke();
    
    // Y轴（就是 x=0 的网格线，但更粗）
    graphics.moveTo(0, -ySize);
    graphics.lineTo(0, ySize);
    graphics.stroke();
    
    // 绘制箭头
    graphics.setStrokeStyle(AXIS_STYLE);
    
    // X轴箭头
    graphics.moveTo(xSize - ARROW_SIZE, -ARROW_OFFSET);
    graphics.lineTo(xSize, 0);
    graphics.lineTo(xSize - ARROW_SIZE, ARROW_OFFSET);
    graphics.stroke();
    
    // Y轴箭头
    graphics.moveTo(-ARROW_OFFSET, ySize - ARROW_SIZE);
    graphics.lineTo(0, ySize);
    graphics.lineTo(ARROW_OFFSET, ySize - ARROW_SIZE);
    graphics.stroke();
    
  }, [xSize, ySize, gridSize]);

  return <pixiGraphics draw={drawAxes} />;
}