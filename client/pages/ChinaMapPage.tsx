import ChinaMap from '@/components/ChinaMap';
import Layout from '@/components/Layout';

export default function ChinaMapPage() {
  return (
    <Layout>
      <div className="w-full py-8">
        <div className="space-y-6">
          {/* 标题区域使用容器居中 */}
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight">中国地图展示</h1>
            <p className="text-muted-foreground mt-2">
              基于ECharts实现的中国地图可视化
            </p>
          </div>
          
          {/* 地图区域占用全宽度 */}
          <div className="w-full px-4">
            <ChinaMap className="w-full max-w-7xl mx-auto" />
          </div>
          
          {/* 说明文字使用容器居中 */}
          <div className="container mx-auto px-4">
            <div className="text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto">
              <p>功能说明：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>支持鼠标滚轮缩放地图</li>
                <li>支持拖拽平移地图</li>
                <li>鼠标悬停显示省份名称</li>
                <li>地图数据来源：阿里云DataV</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
