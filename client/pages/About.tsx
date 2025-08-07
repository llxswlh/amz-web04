import Layout from "@/components/Layout";
import { Clock, Monitor, MapPin, BarChart3 } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-widest text-gray-500">ABOUT US</h2>
          <h1 className="text-3xl font-light text-gray-800 mt-2">关于我们</h1>
        </div>

        {/* Company Introduction */}
        <div className="text-center max-w-4xl mx-auto text-gray-600 leading-relaxed mb-16">
          <p className="mb-4">
            TMG (Transport Media Group) 交运传媒是在华东地区注册的三四线城市媒体广告传媒公司，独立注册资金9600万,
          </p>
          <p className="mb-4">
            TMG打造的"<span className="font-semibold text-gray-800">百城千县战略媒体平台</span>"是针对三四线市场客运站媒体的广告平台;
          </p>
          <p className="mb-4">
            TMG专注交通轨道媒体、营销公关及城市空间资源的开发运营，重点开发全国公路客运站媒体;
          </p>
          <p className="mb-4">
            覆盖中国<span className="text-3xl font-bold text-gray-800 mx-1">26</span>个省份、含<span className="text-3xl font-bold text-gray-800 mx-1">300</span>余个城市、近<span className="text-3xl font-bold text-gray-800 mx-1">2000</span>个县市区域；
          </p>
          <p className="mb-4">
            整合全国各大城市公路客运站媒体，
          </p>
          <p>
            致力为品牌提供渠道和市场下沉轨道新传播模式和落地服务；
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light text-gray-800">为什么选择我们</h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-50 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
            <div className="text-blue-300 mb-6">
              <Monitor className="h-20 w-20" strokeWidth={1} />
            </div>
            <p className="text-5xl font-light text-gray-800">
              16<span className="text-3xl">年</span>
            </p>
            <p className="text-gray-600 mt-2">市场整合调研</p>
          </div>

          <div className="bg-yellow-50 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
            <div className="text-yellow-400 mb-6">
              <MapPin className="h-20 w-20" strokeWidth={1} />
            </div>
            <p className="text-5xl font-light text-gray-800">
              26<span className="text-3xl">个</span>
            </p>
            <p className="text-gray-600 mt-2">省市资源覆盖</p>
          </div>

          <div className="bg-blue-50 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
            <div className="text-blue-300 mb-6">
              <Clock className="h-20 w-20" strokeWidth={1} />
            </div>
            <p className="text-5xl font-light text-gray-800">
              1800<span className="text-3xl">个</span>
            </p>
            <p className="text-gray-600 mt-2">媒体监测服务点</p>
          </div>

          <div className="bg-yellow-50 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
            <div className="text-yellow-400 mb-6">
              <BarChart3 className="h-20 w-20" strokeWidth={1} />
            </div>
            <p className="text-5xl font-light text-gray-800">
              10000<span className="text-3xl">个</span>
            </p>
            <p className="text-gray-600 mt-2">媒体广告位</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
