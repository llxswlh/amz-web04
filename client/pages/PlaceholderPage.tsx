import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description = "此页面正在建设中，请稍后再来查看。",
}: PlaceholderPageProps) {
  return (
    <Layout>
      {/* Spacer for fixed header */}
      <div className="pt-20">
        {/* Main Content */}
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">{description}</p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                如需了解更多信息，请返回首页继续浏览或联系我们。
              </p>
              <Link to="/">
                <Button className="bg-red-600 hover:bg-red-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
