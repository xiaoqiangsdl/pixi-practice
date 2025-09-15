import { useState, useEffect, useRef } from 'react';

/**
 * 自定义 Hook 用于监听容器尺寸变化
 * @param {Object} initialSize - 初始尺寸，默认 { width: 1000, height: 1000 }
 * @returns {Object} { containerRef, canvasSize } - 容器引用和当前尺寸
 */
export function useContainerSize(initialSize = { width: 1000, height: 1000 }) {
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState(initialSize);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setCanvasSize({
          width: clientWidth,
          height: clientHeight
        });
      }
    };

    // 初始化尺寸
    updateSize();

    // 使用 ResizeObserver 监听容器尺寸变化
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { containerRef, canvasSize };
}