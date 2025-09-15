import { cn } from '../../utils/cn'

export default function SiderPanel({ projects = [], selectedProjectId, onProjectSelect }) {

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">项目列表</h2>
      </div>
      
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {projects.map(project => (
          <div 
            key={project.id}
            onClick={() => onProjectSelect?.(project.id)}
            className={cn(
              // 基础样式
              'bg-white p-4 rounded-lg shadow-sm border transition-all cursor-pointer',
              // 选中状态样式
              selectedProjectId === project.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:shadow-md hover:border-blue-300'
            )}
          >
            <h3 className="font-medium text-gray-800 mb-2">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          新建项目
        </button>
      </div>
    </div>
  );
}