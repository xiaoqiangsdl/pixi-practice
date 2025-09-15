import { useCallback } from 'react';

// 样式常量
const GRID_STYLE = { width: 1, color: 0x888888, alpha: 0.3 }; // 网格线样式：细灰色半透明
const AXIS_STYLE = { width: 3, color: 0x000000 }; // 坐标轴样式：粗黑色实线
const ARROW_SIZE = 10; // 箭头长度
const ARROW_OFFSET = 5; // 箭头宽度的一半

/**
 * 左上角坐标系组件
 * 绘制以左上角(0,0)为原点的标准屏幕坐标系，包含网格线和坐标轴
 * X轴向右为正，Y轴向下为正
 * @param {number} width - 坐标系宽度，默认400
 * @param {number} height - 坐标系高度，默认400  
 * @param {number} gridSize - 网格大小，默认50像素
 */
export function TopLeftCoordinateSystem({ width = 400, height = 400, gridSize = 50 }) {
  const drawAxes = useCallback((graphics) => {
    graphics.clear();
    
    // 绘制网格
    graphics.setStrokeStyle(GRID_STYLE);
    
    // 垂直网格线（从左到右）
    for (let x = 0; x <= width; x += gridSize) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, height);
      graphics.stroke();
    }
    
    // 水平网格线（从上到下）
    for (let y = 0; y <= height; y += gridSize) {
      graphics.moveTo(0, y);
      graphics.lineTo(width, y);
      graphics.stroke();
    }
    
    // 绘制坐标轴（放在网格线之后，这样轴线会更明显）
    graphics.setStrokeStyle(AXIS_STYLE);
    
    // X轴（沿着顶部边缘）
    graphics.moveTo(0, 0);
    graphics.lineTo(width, 0);
    graphics.stroke();
    
    // Y轴（沿着左侧边缘）
    graphics.moveTo(0, 0);
    graphics.lineTo(0, height);
    graphics.stroke();
    
    // 绘制箭头
    graphics.setStrokeStyle(AXIS_STYLE);
    
    // X轴箭头（指向右侧）
    graphics.moveTo(width - ARROW_SIZE, -ARROW_OFFSET);
    graphics.lineTo(width, 0);
    graphics.lineTo(width - ARROW_SIZE, ARROW_OFFSET);
    graphics.stroke();
    
    // Y轴箭头（指向下方）
    graphics.moveTo(-ARROW_OFFSET, height - ARROW_SIZE);
    graphics.lineTo(0, height);
    graphics.lineTo(ARROW_OFFSET, height - ARROW_SIZE);
    graphics.stroke();

    console.log('draw top-left coordinate system', { width, height, gridSize });
    
  }, [width, height, gridSize]);

  return <pixiGraphics draw={drawAxes} />;
}