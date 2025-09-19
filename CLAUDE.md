# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
这是一个使用 React + Vite + PixiJS 构建的图形渲染演示项目，主要用于展示 2D 图形编程能力。项目集成了 @pixi/react 来实现 React 和 PixiJS 的无缝结合。项目采用演示集合的架构，包含多个独立的 PixiJS 演示场景。

## 开发命令
- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm lint` - 运行 ESLint 代码检查
- `pnpm preview` - 预览构建后的应用

## 核心技术栈
- **React 19** - UI 框架
- **PixiJS 8** - 2D WebGL 渲染引擎
- **@pixi/react** - React 集成库
- **Vite** - 构建工具和开发服务器
- **Tailwind CSS 4** - 样式框架
- **pnpm** - 包管理器

## 项目架构
```
src/
├── App.jsx              # 主应用组件，包含项目选择逻辑
├── main.jsx             # 应用入口点
├── consts.jsx           # 项目列表配置
├── Canvas/              # PixiJS 演示项目集合
│   ├── BunnyDemo/       # 兔子精灵演示
│   ├── ChooChooTrain/   # 火车场景演示
│   ├── FishPond/        # 鱼塘场景演示
│   └── components/      # 共享的 PixiJS 组件
└── Layout/              # 布局组件
    ├── SiderPanel/      # 侧边栏项目选择器
    └── Topbar/          # 顶部导航栏
```

## 演示项目架构模式
每个演示项目遵循统一的组织结构：
- **index.jsx** - 项目入口组件，处理资源加载和主要布局
- **constants.js** - 项目相关常量定义（如果需要）
- **assets/** - 项目专用资源文件
- **具体组件.jsx** - 实现特定功能的 PixiJS 组件

## PixiJS React 集成模式
项目使用 `@pixi/react` 库实现 React 声明式编程与 PixiJS 的结合：

1. **Component Extension**: 使用 `extend()` 函数注册 PixiJS 组件到 React
2. **Application Wrapper**: `<Application>` 作为根容器
3. **React-style Props**: PixiJS 对象属性通过 React props 传递
4. **Hooks Integration**: 使用 `useTick`, `useApplication` 等专用钩子

## 坐标系设计
部分应用使用了翻转的 Y 轴坐标系（`scale={{ x: 1, y: -1 }}`），将屏幕中心作为原点(0,0)，这样符合数学坐标系的习惯（Y 轴向上为正）。

## 代码规范

### 常量书写习惯
- **文件级常量**: 使用 `SCREAMING_SNAKE_CASE` 格式，如 `TREE_WIDTH`, `CROWN_COLOR`
- **常量分组**: 按功能分组并添加注释，如：
  ```javascript
  // 树木配置常量
  const TREE_WIDTH = 200;                // 每棵树的宽度
  const TREE_BASE_HEIGHT = 225;          // 树的基准高度
  
  // 树干配置常量
  const TRUNK_WIDTH = 30;                // 树干宽度
  const TRUNK_COLOR = 0x563929;          // 树干颜色
  ```
- **资源别名**: 在 constants.js 中定义资源映射对象，使用描述性常量名

### PixiJS 组件模式
- 使用 `useTick` 进行动画循环
- 使用 `useApplication` 获取应用实例
- Graphics 组件通过 `draw` 函数进行绘制
- 避免在 `draw` 函数中频繁计算，使用 `useRef` 或 `useState` 缓存计算结果

## 开发注意事项
- 所有 PixiJS 组件需要在 React 中使用 `pixi` 前缀（如 `<pixiSprite>`, `<pixiContainer>`）
- 异步资源加载使用 `Assets.load()` API
- 动画循环使用 `useTick` 钩子
- 交互事件通过标准 React 事件处理器实现
- 查询文档时用 context7
- 全程使用中文注释和文档

## 添加新演示项目
1. 在 `src/Canvas/` 下创建新文件夹
2. 创建 `index.jsx` 作为项目入口
3. 在 `src/consts.jsx` 中添加项目配置
4. 遵循现有的常量命名和组件结构模式