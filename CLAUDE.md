# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
这是一个使用 React + Vite + PixiJS 构建的图形渲染演示项目，主要用于展示 2D 图形编程能力。项目集成了 @pixi/react 来实现 React 和 PixiJS 的无缝结合。

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
├── App.jsx              # 主应用组件
├── main.jsx             # 应用入口点
├── Canvas/              # PixiJS 画布相关组件
│   ├── Appliaction.jsx  # 主画布应用（注意拼写错误）
│   ├── BunnySprite.jsx  # 兔子精灵组件，演示动画和交互
│   └── CoordinateSystem.jsx # 坐标系组件，绘制网格和坐标轴
└── Layout/              # 布局组件（目前为空）
    ├── SiderPanel/
    └── Topbar/
```

## PixiJS React 集成模式
项目使用 `@pixi/react` 库实现 React 声明式编程与 PixiJS 的结合：

1. **Component Extension**: 使用 `extend()` 函数注册 PixiJS 组件到 React
2. **Application Wrapper**: `<Application>` 作为根容器
3. **React-style Props**: PixiJS 对象属性通过 React props 传递
4. **Hooks Integration**: 使用 `useTick`, `useApplication` 等专用钩子

## 坐标系设计
应用使用了翻转的 Y 轴坐标系（`scale={{ x: 1, y: -1 }}`），将屏幕中心作为原点(0,0)，这样符合数学坐标系的习惯（Y 轴向上为正）。

## 关键文件说明
- `Canvas/Appliaction.jsx` - 主画布组件，处理屏幕尺寸变化和坐标系设置
- `Canvas/BunnySprite.jsx` - 演示资源加载、动画循环和用户交互的示例组件
- `Canvas/CoordinateSystem.jsx` - 绘制网格和坐标轴的工具组件

## 开发注意事项
- 所有 PixiJS 组件需要在 React 中使用 `pixi` 前缀（如 `<pixiSprite>`, `<pixiContainer>`）
- 异步资源加载使用 `Assets.load()` API
- 动画循环使用 `useTick` 钩子
- 交互事件通过标准 React 事件处理器实现
- 查询文档时用 context7