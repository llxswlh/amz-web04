import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import SimpleMapImage from "@/components/SimpleMapImage";
import LazyImage from "@/components/LazyImage";

// 合作案例数据����口
interface CompanyCase {
  id: string;
  name: string;
  logo: string;
  logo_index?: string;
  description: string;
}

interface CaseDetailData {
  id: string;
  name: string;
  logo: string;
  content: string;
  campaignImages: string[];
}

// 合作案例数据（从CooperationCases.tsx同步） - 移到组件外部避免重复创建
const companyCases: CompanyCase[] = [
  {
    id: "58tongcheng",
    name: "58同城",
    logo: "https://cdn.builder.io/api/v1/image/assets%2F63ba380bf58e417780bce9bd510b65ca%2F4a1e3fa8b95c4964a4b7c0a7839dde7e?format=webp&width=800",
    logo_index: "https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/58tc.png",
    description: "本地生活服务平台",
  },
  {
    id: "jingdong",
    name: "京东",
    logo: "https://cdn.builder.io/api/v1/image/assets%2F63ba380bf58e417780bce9bd510b65ca%2F4a1e3fa8b95c4964a4b7c0a7839dde7e?format=webp&width=800",
    logo_index:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=117&h=220&fit=crop",
    description: "电商零售平台",
  },
  {
    id: "wulianquan",
    name: "五粮泉",
    logo: "https://images.unsplash.com/photo-1606870620971-b4b65b67b7f7?w=200&h=200&fit=crop",
    logo_index:
      "https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/58tc.png",
    description: "酒类品牌",
  },
  {
    id: "gree",
    name: "GREE",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=117&h=220&fit=crop",
    logo_index:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=117&h=220&fit=crop",
    description: "家电制造商",
  },
  {
    id: "huawei",
    name: "HUAWEI",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=117&h=220&fit=crop",
    logo_index:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=117&h=220&fit=crop",
    description: "通信技术公司",
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    logo_index:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=117&h=220&fit=crop",
    description: "生活方式分享平台",
  },
];

// 案例详情数据（从CaseDetail.tsx同步） - 移到组件外部避免重复创建
const caseDetailsData: Record<string, CaseDetailData> = {
  "58tongcheng": {
    id: "58tongcheng",
    name: "58同城",
    logo: "https://cdn.builder.io/api/v1/image/assets%2F63ba380bf58e417780bce9bd510b65ca%2F4a1e3fa8b95c4964a4b7c0a7839dde7e?format=webp&width=800",
    content: "58同城是中国领先的本地生活服务平台...",
    campaignImages: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    ],
  },
  jingdong: {
    id: "jingdong",
    name: "京东",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/JD.com_Logo.svg",
    content: "京东是中国知名的综合性电商平台...",
    campaignImages: [
      "https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/2de830ec-a816-4d49-9ff8-2ebdd58c09c5.jpg",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop",
    ],
  },
  gree: {
    id: "gree",
    name: "GREE",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Gree_logo.svg",
    content: "格力电器是中国领先的空调制造商...",
    campaignImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop",
    ],
  },
  huawei: {
    id: "huawei",
    name: "HUAWEI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Huawei_Standard_logo.svg",
    content: "华为是全球领先的ICT解决方案提供商...",
    campaignImages: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=400&fit=crop",
    ],
  },
};

// 为没有详细数据的公司提供默认案��图片 - 移到组件外部避免重复创建
const getDefaultCaseImage = (id: string): string => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
  ];
  return defaultImages[0];
};

// 主营媒体 - 省份数据 - 移到组件外部避免重复创建
const provinces = [
  "上海市",
  "云南省",
  "北京市",
  "吉林省",
  "四川省",
  "天津市",
  "安徽省",
  "山东省",
  "山西省",
  "广东省",
  "江苏省",
  "江西省",
  "河北省",
  "河南省",
  "浙江省",
  "湖北省",
  "湖南省",
  "甘肃省",
  "福建省",
  "贵州省",
  "辽宁省",
  "重庆市",
  "陕西省",
  "黑龙江省",
  "广西壮族自治区",
];

const provinceImages: Record<string, string> = {
  北京市: "https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/xerxes.jpg",
  上海市:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
  广东省:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
  浙江省:
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop",
  江苏省:
    "https://images.unsplash.com/photo-1560346980-db8352163d6e?w=300&h=200&fit=crop",
};

export default function Index() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 简化的页面加载逻辑，避免跨浏览器兼容性问题
  useEffect(() => {
    // ��暂延迟后直接显示页面，避免不必要的预加载等待
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 自动滚动案例轮播
  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentCaseIndex((prev) => (prev + 1) % companyCases.length);
    }, 5000); // 每5秒切换��次

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  // 轮播导航函数
  const nextCase = () => {
    setCurrentCaseIndex((prev) => (prev + 1) % companyCases.length);
  };

  const prevCase = () => {
    setCurrentCaseIndex(
      (prev) => (prev - 1 + companyCases.length) % companyCases.length,
    );
  };

  // 获取当前显示的��例
  const currentCase = companyCases[currentCaseIndex];
  const currentCaseDetail = caseDetailsData[currentCase.id];
  const currentCaseImage = currentCaseDetail
    ? currentCaseDetail.campaignImages[0]
    : getDefaultCaseImage(currentCase.id);

  // 显示加载状态
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">页面加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* 主营媒体 Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-red-400"></div>
        </div>
        <div className="container mx-auto px-4 flex flex-col relative z-10">
          <div className="border-2 border-blue-200 rounded-xl p-8 max-w-[991px] mx-auto shadow-lg bg-white/90 backdrop-blur-sm">
            {/* Map Section with Overlay Text */}
            <div className="relative w-full mb-8">
              <SimpleMapImage className="w-full" />
              {/* Overlay Text */}
              <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 text-center z-10">
                <span
                  className="text-white text-xs px-3 py-1 rounded-md"
                  style={{ backgroundColor: "#008ecf" }}
                >
                  主营媒体
                </span>
                <h1 className="text-xl font-bold text-gray-800 mt-2 tracking-wider drop-shadow-sm">
                  PASSENGER STATION MEDIA
                </h1>
                <p className="text-sm text-gray-600 mt-1 drop-shadow-sm">
                  全国公路客运站媒体
                </p>
                <div className="leading-tight mt-1">
                  <Link
                    to="/china-map"
                    className="inline-block text-gray-500 ml-2 text-sm underline hover:text-blue-500 transition-colors"
                  >
                    &gt;&gt;&gt;
                  </Link>
                  <span className="text-gray-500 text-sm tracking-widest">
                    点击了解更多
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="py-1 bg-gray-50 rounded-lg mb-3">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-8 text-gray-600">
                  <div>
                    覆盖城市
                    <span
                      className="font-bold text-4xl ml-2"
                      style={{ color: "rgba(208, 2, 27, 1)" }}
                    >
                      26
                    </span>
                    个省行政区
                  </div>
                  <div>
                    含
                    <span
                      className="font-bold text-4xl ml-2"
                      style={{ color: "rgba(208, 2, 27, 1)" }}
                    >
                      300
                    </span>
                    余个城市
                  </div>
                  <div>
                    覆盖
                    <span
                      className="font-bold text-4xl ml-2"
                      style={{ color: "rgba(208, 2, 27, 1)" }}
                    >
                      2000
                    </span>
                    个县市区域
                  </div>
                </div>
              </div>
            </div>

            {/* Province Grid Section - 下方 */}
            <div className="flex flex-col">
              <div className="grid grid-cols-10 gap-1 mb-4">
                {provinces.map((province) => (
                  <div
                    key={province}
                    className="relative"
                    onMouseEnter={() => setHoveredProvince(province)}
                    onMouseLeave={() => setHoveredProvince(null)}
                  >
                    <button className="w-full p-1 text-xs bg-[#DCDCDC] text-black hover:bg-[#C0C0C0] transition-all duration-200 rounded">
                      {province}
                    </button>

                    {hoveredProvince === province &&
                      provinceImages[province] && (
                        <div className="absolute top-full left-0 z-20 mt-2">
                          <div className="shadow-lg rounded overflow-hidden">
                            <img
                              src={provinceImages[province]}
                              alt={province}
                              className="max-w-none rounded"
                              style={{
                                width: "auto",
                                height: "auto",
                                maxWidth: "300px",
                                maxHeight: "200px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-500">
                可点击���份查看媒体资源分布
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Resources Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 relative">
        {/* Decorative separator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-red-400 rounded-full"></div>

        <header className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-3xl font-bold tracking-widest text-gray-800 relative">
              COOPERATION CASE
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-red-400"></div>
            </h2>
            <p className="text-xl text-gray-600 mt-4 font-medium">其他媒体</p>
          </div>
        </header>
        <div className="container mx-auto px-4">
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* First Media Card */}
            <div className="bg-white rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-200">
              <div className="p-2">
                <LazyImage
                  src="https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E4%BA%A4%E5%AA%92%E4%BD%93.jpg"
                  alt="全国公交媒体"
                  className="w-full h-auto object-contain rounded-lg"
                  fallbackSrc="/placeholder.svg"
                />
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-center text-lg font-semibold text-gray-800">
                  全国公交媒体
                </h3>
              </div>
            </div>

            {/* Second Media Card */}
            <div className="bg-white rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-200">
              <div className="p-2">
                <LazyImage
                  src="https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/%E6%88%B7%E5%A4%96LED%E5%A4%A7%E5%B1%8F.jpg"
                  alt="全国户外LED大屏"
                  className="w-full h-auto object-contain rounded-lg"
                  fallbackSrc="/placeholder.svg"
                />
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-center text-lg font-semibold text-gray-800">
                  全国户外LED大屏
                </h3>
              </div>
            </div>

            {/* Third Media Card */}
            <div className="bg-white rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-200">
              <div className="p-2">
                <LazyImage
                  src="https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/%E7%A4%BE%E5%8C%BA%E5%AA%92%E4%BD%93.jpg"
                  alt="全国社区媒体"
                  className="w-full h-auto object-contain rounded-lg"
                  fallbackSrc="/placeholder.svg"
                />
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-center text-lg font-semibold text-gray-800">
                  全国社区媒体
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation Case Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16 relative">
        {/* Decorative separator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full"></div>

        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-3xl font-bold tracking-widest text-gray-800 relative">
                COOPERATION CASE
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-blue-400"></div>
              </h2>
              <p className="text-xl text-gray-600 mt-4 font-medium">合作案例</p>
              <div className="mt-4">
                <Link to="/cooperation-cases">
                  <span className="text-3xl font-bold text-gray-400 hover:text-blue-500 animate-pulse cursor-pointer transition-colors duration-300">
                    &gt;&gt;&gt;
                  </span>
                </Link>
              </div>
            </div>
          </header>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevCase}
              className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 transform hover:shadow-lg active:scale-95"
            >
              <ChevronLeft className="text-5xl transition-transform duration-200" />
            </button>

            {/* 显示两个案例 */}
            <div
              className="relative overflow-hidden flex justify-center"
              style={{ width: "1010px" }}
            >
              <div
                className="flex items-stretch space-x-4 transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentCaseIndex * 511}px)`,
                }}
              >
                {companyCases.concat(companyCases).map((caseItem, index) => {
                  const actualIndex = index % companyCases.length;
                  const caseDetail = caseDetailsData[caseItem.id];
                  const caseImage = caseDetail
                    ? caseDetail.campaignImages[0]
                    : getDefaultCaseImage(caseItem.id);

                  return (
                    <div
                      key={index}
                      className="flex items-stretch flex-shrink-0"
                      style={{ width: "496px", gap: "15px" }}
                    >
                      {/* Company Logo Card */}
                      <Link to={`/case/${caseItem.id}`}>
                        <div
                          className="border-2 border-gray-200 flex flex-col items-center justify-between p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          style={{ width: "117px", height: "255px" }}
                        >
                          <div className="flex flex-col items-center flex-1 justify-center">
                            <div className="w-full h-32 flex items-center justify-center mb-4">
                              <img
                                alt={`${caseItem.name} logo`}
                                className="max-w-full max-h-full object-contain"
                                src={caseItem.logo_index || caseItem.logo}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjVGNUY1Ci8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBmaWxsPSIjRERERERIIi8+CjwvcWc+Cg==";
                                }}
                              />
                            </div>
                          </div>
                          <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white w-full py-2 text-xs rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300 font-semibold">
                            {caseItem.name}
                          </button>
                        </div>
                      </Link>

                      {/* Campaign Image */}
                      <div
                        className="h-64 rounded-xl overflow-hidden shadow-lg"
                        style={{ width: "364px" }}
                      >
                        <img
                          alt={`${caseItem.name} 案例图片`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          src={caseImage}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getDefaultCaseImage(caseItem.id);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={nextCase}
              className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 transform hover:shadow-lg active:scale-95"
            >
              <ChevronRight className="text-5xl transition-transform duration-200" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {companyCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCaseIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCaseIndex
                    ? "bg-blue-500 scale-125 animate-pulse-dot"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
