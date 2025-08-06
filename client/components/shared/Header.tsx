import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const [currentBgSlide, setCurrentBgSlide] = useState(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const heroBackgrounds = [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=600&fit=crop", // city skyline
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=600&fit=crop", // highway/bridge
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1920&h=600&fit=crop", // logistics/transportation
    "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1920&h=600&fit=crop", // smart city/technology
  ];

  // Dropdown menu functions with delay
  const handleMouseEnterDropdown = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShowMediaDropdown(true);
  };

  const handleMouseLeaveDropdown = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowMediaDropdown(false);
    }, 300); // 300ms delay before hiding
  };

  // Auto-scroll effect for hero backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(interval);
  }, [heroBackgrounds.length]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-white text-gray-800 shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Main navigation row */}
          <nav className="flex justify-between py-4">
            {/* Logo and Company Name on Left-Center */}
            <div className="flex items-start flex-1 pr-[200px]">
              <img
                src="https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/logo-2.jpg"
                alt="TMG Logo"
                className="h-[102px] w-auto ml-[181px] mr-3"
              />
              <img
                src="https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/468ea2be-4093-4712-92aa-cf8e17655b1c.png"
                alt="Company Description"
                className="h-[60px] w-auto"
                style={{ marginTop: "25px" }}
              />
            </div>

            {/* Navigation Links in Center-Right - aligned to bottom */}
            <div className="flex space-x-8 text-sm self-end pb-3">
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors text-gray-700"
              >
                首页
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors text-gray-700"
              >
                公司简介
              </Link>

              {/* Media Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterDropdown}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <Link
                  to="/business"
                  className="hover:text-blue-600 transition-colors flex items-center text-gray-700"
                >
                  媒体资源
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>

                {showMediaDropdown && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-200 py-2 z-20"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <Link
                      to="/bus-stations"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      全国公路客运站
                    </Link>
                    <Link
                      to="/bus-media"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      全国公交媒体
                    </Link>
                    <Link
                      to="/highway-media"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      全国公路媒体
                    </Link>
                    <Link
                      to="/other-media"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      其他媒体
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/cooperation-cases"
                className="hover:text-blue-600 transition-colors text-gray-700"
              >
                合作案例
              </Link>
              <Link
                to="/china-map"
                className="hover:text-blue-600 transition-colors text-gray-700"
              >
                中国地图
              </Link>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition-colors text-gray-700"
              >
                联系我们
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden group mt-[110px]">
        {/* Image Container */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentBgSlide * 100}%)` }}
          >
            {heroBackgrounds.map((bg, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={bg}
                  alt={`Hero background ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrentBgSlide((prev) =>
              prev === 0 ? heroBackgrounds.length - 1 : prev - 1,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() =>
            setCurrentBgSlide((prev) => (prev + 1) % heroBackgrounds.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBgSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
