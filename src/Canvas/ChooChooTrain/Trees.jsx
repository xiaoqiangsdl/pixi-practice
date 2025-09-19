import { useState, useEffect } from 'react';
import { useApplication, useTick } from '@pixi/react';

// 树木配置常量
const TREE_WIDTH = 200;                // 每棵树的宽度
const TREE_BASE_HEIGHT = 225;          // 树的基准高度
const TREE_SPACING = 15;               // 每棵树之间的间距
const BOTTOM_OFFSET = 20;              // 树距离屏幕底部的偏移量-离地高度

// 树干配置常量
const TRUNK_WIDTH = 30;                // 树干宽度
const TRUNK_COLOR = 0x563929;          // 树干颜色

// 树冠配置常量
const CROWN_COLOR = 0x264d3d;          // 树冠颜色
const CROWN_LEVELS = 4;                // 树冠层级数

function createTree(graphics, width, height) {
  graphics.clear();
  
  const trunkHeight = height / 4;

  // 定义树冠层级的尺寸和参数
  const crownHeight = height - trunkHeight;
  const crownLevelHeight = crownHeight / CROWN_LEVELS;
  const crownWidthIncrement = width / CROWN_LEVELS;

  graphics
    // 绘制树干
    .rect(-TRUNK_WIDTH / 2, -trunkHeight, TRUNK_WIDTH, trunkHeight)
    .fill({ color: TRUNK_COLOR });

  for (let index = 0; index < CROWN_LEVELS; index++) {
    const y = -trunkHeight - crownLevelHeight * index;
    const levelWidth = width - crownWidthIncrement * index;
    const offset = index < CROWN_LEVELS - 1 ? crownLevelHeight / 2 : 0;

    // 绘制树冠层级
    graphics
      .moveTo(-levelWidth / 2, y)
      .lineTo(0, y - crownLevelHeight - offset)
      .lineTo(levelWidth / 2, y)
      .fill({ color: CROWN_COLOR });
  }

  return graphics;
}


export function Trees() {
  const { app } = useApplication();
  const [trees, setTrees] = useState([])

  useEffect(() => {
    // 树木在Y轴上的基准位置
    const y = app.screen.height - BOTTOM_OFFSET;

    // 计算水平填充屏幕所需的树木数量
    const count = app.screen.width / (TREE_WIDTH + TREE_SPACING) + 1;

    const treesData = [];

    for (let index = 0; index < count; index++) {
      // 在约束范围内随机化每棵树的高度
      const treeHeight = TREE_BASE_HEIGHT + Math.random() * 50;

      // 创建树实例
      const tree = {}

      tree.width = TREE_WIDTH;
      tree.height = treeHeight;

      // 初始定位树的位置
      tree.x = index * (TREE_WIDTH + TREE_SPACING);
      tree.y = y;

      // 将树添加到舞台和引用数组中
      treesData.push(tree);
    }

    setTrees(treesData)
  }, [app.screen.width, app.screen.height])

  useTick(({deltaTime}) => {
    const dx = deltaTime * 3;
   
    setTrees(prev => prev.map(({ x, ...item }) => {
      let newX = x - dx;
      if (newX < -item.width / 2) {
        newX += prev.length * (item.width + TREE_SPACING);
      } 

      return ({
        ...item,
        x: newX
      })
    }))
  })

  return (
    trees.map((tree) => (
      <pixiGraphics
        x={tree.x}
        y={tree.y}
        draw={(graphics) => createTree(graphics, tree.width, tree.height)}
      />
    ))
  );
}
