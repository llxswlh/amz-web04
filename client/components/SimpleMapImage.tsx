import React, { useState } from "react";

interface SimpleMapImageProps {
  className?: string;
}

const SimpleMapImage: React.FC<SimpleMapImageProps> = ({ className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className={className}>
      <div className="w-full rounded-lg overflow-hidden relative">
        <img
          src="https://java-tlias-wlh.oss-cn-beijing.aliyuncs.com/chinamap.jpg"
          alt="地图"
          className={`w-full h-auto object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="text-gray-400 text-sm">地图加载中...</div>
          </div>
        )}

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-gray-400 text-sm">地图加载失败</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleMapImage;
