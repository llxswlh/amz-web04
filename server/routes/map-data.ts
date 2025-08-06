import { RequestHandler } from "express";

export const handleMapData: RequestHandler = async (req, res) => {
  try {
    // 设置CORS头
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // 代理请求到阿里云DataV API
    const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const geoData = await response.json();
    
    // 返回GeoJSON数据
    res.json(geoData);
  } catch (error) {
    console.error('Error fetching map data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch map data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
