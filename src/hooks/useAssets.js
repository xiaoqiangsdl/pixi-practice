import { useState, useEffect } from 'react';
import { Assets } from 'pixi.js';

/**
 * 自定义 Hook 用于加载 PixiJS 资源
 * @param {Array} assets - 资源配置数组，支持字符串或对象格式
 * @returns {Object} { loaded, loading, error } - 加载状态
 */
export function useAssets(assets) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!assets || assets.length === 0) return;

    setLoading(true);
    setError(null);

    // 检查是否已经加载过
    const checkIfAlreadyLoaded = () => {
      if (Array.isArray(assets)) {
        return assets.every(asset => {
          const alias = typeof asset === 'string' ? asset : asset.alias;
          return Assets.get(alias);
        });
      }
      return false;
    };

    if (checkIfAlreadyLoaded()) {
      setLoaded(true);
      setLoading(false);
      return;
    }

    // 加载资源
    Assets.load(assets)
      .then(() => {
        console.log('Assets loaded:', assets);
        setLoaded(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [assets]);

  return { loaded, loading, error };
}