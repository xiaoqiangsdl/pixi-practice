import './App.css'
import { useState } from 'react'
import Topbar from './Layout/Topbar'
import SiderPanel from './Layout/SiderPanel'
import { PROJECTS } from './consts'

// 默认组件（当项目为空时显示）
const DefaultComponent = () => (
  <div className="flex items-center justify-center h-full bg-gray-100">
    <div className="text-center">
      <div className="text-gray-400 text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">项目开发中</h2>
      <p className="text-gray-500">该演示项目正在开发中，敬请期待</p>
    </div>
  </div>
);

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(3);
  
  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);
  const CurrentComponent = selectedProject?.project || DefaultComponent;

  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 flex">
        <SiderPanel 
          projects={PROJECTS} 
          selectedProjectId={selectedProjectId}
          onProjectSelect={setSelectedProjectId}
        />
        <div className="flex-1 height-full overflow-hidden">
          <CurrentComponent />
        </div>
      </div>
    </div>
  )
}

export default App
