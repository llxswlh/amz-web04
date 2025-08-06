import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CaseDetailData {
  id: string;
  name: string;
  logo: string;
  content: string;
  campaignImages: string[];
}

const caseDetailsData: Record<string, CaseDetailData> = {
  "58tongcheng": {
    id: "58tongcheng",
    name: "58同城",
    logo: "https://cdn.builder.io/api/v1/image/assets%2F63ba380bf58e417780bce9bd510b65ca%2F4a1e3fa8b95c4964a4b7c0a7839dde7e?format=webp&width=800",
    content:
      "58同城是中国领先的本地生活服务平台，为用户提供招聘、房产、二手物品等全方位服务。通过与TMG集团的深度合作，58同城在二三线城市的品牌知名度得到显著提升。我们在全国重要交通枢纽投放品牌广告，覆盖大量流动人群，特别针对求职人���进行精准投放，有效扩大了58同城在求职招聘业务方面的用户关注度和市场影响力。",
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
    content:
      "京东是中国知名的综合性电商平台，提供优质的购物体验和快速的物流服务。与TMG集团合作期间，京东成功在下沉市场扩大了影响力，提升了品牌在二三线城市的市场占有率。通过在全国公路客运站投放品牌广告，重点宣传正品保证和快速配送服务，成功建立了品牌信任度，获得了大量新用户的认可和信任。",
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
    content:
      "格力电器是中国领先的空调制造商，以技术创新和品质保证著称。通过与TMG的战略合作，格力在夏季空调销售旺季前成功提升了品牌曝光度，特别是在南方城市市场表现突出。我们在南方重点城市的公路客运站投放季节性广告，突出格力空调的节能环保和静音特点，有效提升了品牌知名度和市场占有率。",
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
    content:
      "华为是全球领先的ICT解决方案提供商，致力于构建万物互联的智能世界。与TMG集团合作推广华为最新5G智能手机产品，成功提升了在年轻消费群体中的品牌影响力。通过在主要交通枢纽投放互动式5G体验广告，直观展示华为5G手机的高速网络和AI摄影功能，让消费者切实感受到5G技术的实际应用价值。",
    campaignImages: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=400&fit=crop",
    ],
  },
};

// 为没有详细数据的公司提供默认模板
const getDefaultCaseData = (id: string, name: string): CaseDetailData => ({
  id,
  name,
  logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
  content: `${name}是行业内的知名企业，致力于为用户提供优质的产品和服务。通过与TMG集团的合作，${name}在目标市场取得了显著的成果，品牌影响力得到有效提升。我们通过精准的媒体投放策略，在重要交通枢纽进行品牌宣传，实现了高效的用户触达和良好的市场反响。`,
  campaignImages: [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
  ],
});

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // TODO: Replace with actual backend API call
  // const [caseData, setCaseData] = useState<CaseDetailData | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCaseData = async () => {
  //     try {
  //       const response = await fetch(`/api/cases/${id}`);
  //       const data = await response.json();
  //       setCaseData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch case data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   if (id) {
  //     fetchCaseData();
  //   }
  // }, [id]);

  if (!id) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              案例不存在
            </h1>
            <Link to="/cooperation-cases">
              <Button>返回案例列表</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Current frontend data (will be replaced by backend API)
  const caseData =
    caseDetailsData[id] ||
    getDefaultCaseData(id, id.charAt(0).toUpperCase() + id.slice(1));

  return (
    <Layout>
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/cooperation-cases"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回合作案例
            </Link>

            {/* Article Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {caseData.name} 合作案例
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <article className="max-w-none">
            {/* Centered Logo */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <img
                  src={caseData.logo}
                  alt={caseData.name}
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBmaWxsPSIjRERERERIIi8+CjwvcWc+Cg==";
                  }}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-gray-700 leading-relaxed text-center">
                <p>{caseData.content}</p>
              </div>
            </div>

            {/* Case Images List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                案例图片
              </h2>
              <div className="grid gap-6">
                {caseData.campaignImages.map((image, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={image}
                      alt={`${caseData.name} 案例图片 ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                想要了解更多合作案例？
              </h3>
              <p className="text-gray-600 mb-6">
                我们为各行业客户提供专业的媒体投放服务，助力品牌成长
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  联系我们
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
