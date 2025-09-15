export default function Topbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-gray-800">PixiJS Demo</div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          操作按钮1
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          操作按钮2
        </button>
      </div>
    </div>
  );
}