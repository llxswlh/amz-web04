import { Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

interface CompanyCase {
  id: string;
  name: string;
  logo: string;
  description: string;
}

// 移到组件外部避免重复创建
const companyCases: CompanyCase[] = [
  {
    id: "58tongcheng",
    name: "58同城",
    logo: "https://cdn.builder.io/api/v1/image/assets%2F63ba380bf58e417780bce9bd510b65ca%2F4a1e3fa8b95c4964a4b7c0a7839dde7e?format=webp&width=800",
    description: "本地生活服务平台",
  },
  {
    id: "jingdong",
    name: "京东",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    description: "电商零售平台",
  },
  {
    id: "wuliangye",
    name: "五粮液",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    description: "酒类品牌",
  },
  {
    id: "gree",
    name: "GREE",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    description: "家电制造商",
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    description: "生活方式分享平台",
  },
  {
    id: "huawei",
    name: "HUAWEI",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    description: "通信技术公司",
  },
  {
    id: "ganjizuche",
    name: "赶集租车",
    logo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=200&fit=crop",
    description: "汽车租赁服务",
  },
  {
    id: "yiqizhuxing",
    name: "一嗨租车",
    logo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=200&fit=crop",
    description: "租车服务平台",
  },
  {
    id: "yidian",
    name: "一点",
    logo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop",
    description: "新闻资讯平台",
  },
  {
    id: "tianyancha",
    name: "天眼查",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    description: "企业信息查询",
  },
  {
    id: "chengjianshui",
    name: "晨简水",
    logo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop",
    description: "水资源管理",
  },
  {
    id: "baidu",
    name: "百度",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    description: "搜索引擎平台",
  },
  {
    id: "anjuke",
    name: "安居客",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop",
    description: "房地产服务",
  },
  {
    id: "zhouliu",
    name: "周大福",
    logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
    description: "珠宝首饰品牌",
  },
  {
    id: "huituoba",
    name: "惠拓巴",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop",
    description: "金融服务",
  },
  {
    id: "nongfu",
    name: "农夫山泉",
    logo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop",
    description: "饮用水品牌",
  },
  {
    id: "beike",
    name: "贝壳",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop",
    description: "房产服务平台",
  },
  {
    id: "changanqiche",
    name: "长安汽车",
    logo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=200&fit=crop",
    description: "汽车制造商",
  },
];

export default function CooperationCases() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">合作案例</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们与众多知名企业建立了深度合作关系，为他们提供专业的媒体投放服务，助力品牌传播与业务增长。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyCases.map((company) => (
              <Link
                key={company.id}
                to={`/case/${company.id}`}
                className="group"
              >
                <Card className="h-32 hover:shadow-lg transition-all duration-300 group-hover:scale-105 bg-white border border-gray-200">
                  <CardContent className="flex items-center justify-center h-full p-3">
                    <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden p-3">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBmaWxsPSIjRERERERIIi8+CjwvcWc+Cg==";
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">点击任意企业logo查看详细合作案例</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
