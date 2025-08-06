import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">联系我们</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>北京市朝阳区建国路93号万达广场</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>400-666-8888</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@tmg.com.cn</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">关于我们</h3>
            <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">业务咨询</h3>
            <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">合作洽谈</h3>
            <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>版权所有 © 2024 TMG Transport Media Group. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}
