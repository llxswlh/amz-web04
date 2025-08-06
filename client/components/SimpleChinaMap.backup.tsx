import React, { useEffect, useRef, useState, useCallback } from "react";
import * as echarts from "echarts";

interface SimpleChinaMapProps {
  className?: string;
}

// 动画函数：从山东开始向周围扩散变色，带渐变效果
const startAnimation = (
  chart: echarts.ECharts,
  provinces: Record<string, number>,
  maxLevel: number,
) => {
  const blueColor = "#2563eb"; // 统一蓝色
  const orangeColor = "#f59e0b"; // 山东橙黄色

  let currentLevel = 0;
  let animationStep = 0;
  const stepsPerLevel = 8; // 每层分8步渐变

  const animateStep = () => {
    if (currentLevel > maxLevel) {
      return;
    }

    // 计算当前步骤的不透明度
    const progress = animationStep / stepsPerLevel;
    const opacity = Math.min(1, progress);

    // 更新当前层级省份的颜色
    const newData = Object.keys(provinces).map((name) => {
      const level = provinces[name];

      // 山东始终保持橙黄色
      if (name === "山东省") {
        return {
          name,
          value: 1,
          itemStyle: {
            areaColor: orangeColor,
            borderColor: "#ccc",
            borderWidth: 1,
          },
        };
      }

      // 其他省份的渐变逻辑
      if (level < currentLevel) {
        // 已经完全变色的省份
        return {
          name,
          value: level + 1,
          itemStyle: {
            areaColor: blueColor,
            borderColor: "#ccc",
            borderWidth: 1,
          },
        };
      } else if (level === currentLevel) {
        // 正在变色的省份，使用渐变效果
        const r = parseInt(blueColor.slice(1, 3), 16);
        const g = parseInt(blueColor.slice(3, 5), 16);
        const b = parseInt(blueColor.slice(5, 7), 16);

        // 从灰色(240,240,240)渐变到蓝色
        const fromR = 240,
          fromG = 240,
          fromB = 240;
        const currentR = Math.round(fromR + (r - fromR) * opacity);
        const currentG = Math.round(fromG + (g - fromG) * opacity);
        const currentB = Math.round(fromB + (b - fromB) * opacity);

        const currentColor = `rgb(${currentR}, ${currentG}, ${currentB})`;

        return {
          name,
          value: level + 1,
          itemStyle: {
            areaColor: currentColor,
            borderColor: "#ccc",
            borderWidth: 1,
          },
        };
      } else {
        // 未变色的省份
        return {
          name,
          value: 0,
          itemStyle: {
            areaColor: "#f0f0f0",
            borderColor: "#ccc",
            borderWidth: 1,
          },
        };
      }
    });

    // 更新图表，添加动画效果
    chart.setOption({
      animation: true,
      animationDuration: 50,
      series: [
        {
          data: newData,
        },
      ],
    });

    animationStep++;

    // 检查是否需要进入下一层
    if (animationStep >= stepsPerLevel) {
      animationStep = 0;
      currentLevel++;
    }

    // 继续下一步动画
    setTimeout(animateStep, 50); // 每50ms一步，更流畅
  };

  animateStep();
};

const SimpleChinaMap: React.FC<SimpleChinaMapProps> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initChart = useCallback(async () => {
    if (!chartRef.current) return;

    try {
      setLoading(true);
      setError(null);

      // 清理旧的实例
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }

      // 等待DOM完全渲染
      await new Promise((resolve) => setTimeout(resolve, 200));

      // 确保容器存在且有正确的尺寸
      const container = chartRef.current;
      if (!container) {
        throw new Error("容器不存在");
      }

      // 等待容器尺寸计算完成
      let retries = 0;
      while (container.offsetWidth <= 0 && retries < 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        retries++;
      }

      // 获取中国地图GeoJSON数据
      let geoData;

      try {
        // 首先尝试直接使用外部数据源，避免内部API的潜在问题
        console.log("尝试获取地图数据...");
        const response = await fetch(
          "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (response.ok) {
          geoData = await response.json();
          console.log("成功获取地图数据");
        } else {
          throw new Error(`外部API响应错误: ${response.status}`);
        }
      } catch (directError) {
        console.warn("直接获取外部数据失败，尝试通过内部API:", directError);

        // 如果直接获取失败，尝试通过内部API
        try {
          const response = await fetch("/api/map-data", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            geoData = await response.json();
            console.log("通过内部API成功获取地图数据");
          } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
              `内部API错误: ${response.status} ${errorData.message || response.statusText}`,
            );
          }
        } catch (internalError) {
          throw new Error(
            `无法获取地图数据。直接获取失败: ${directError}。内部API失败: ${internalError}`,
          );
        }
      }

      // 获取容器实际尺寸
      const containerWidth = container.offsetWidth || 800;
      const containerHeight = 400;

      // 初始化ECharts实例
      const chart = echarts.init(container, null, {
        width: containerWidth,
        height: containerHeight,
        renderer: "canvas",
      });

      chartInstanceRef.current = chart;

      // 过滤地图数据，移除南沙群岛
      const filteredGeoData = {
        ...geoData,
        features: geoData.features.filter((feature: any) => {
          const name = feature.properties?.name || "";
          return !name.includes("南沙") && !name.includes("南沙群岛");
        }),
      };

      // 注册地图
      echarts.registerMap("china", filteredGeoData);

      // 定义参与动画的省份和它们从山东的距离层级
      const animationProvinces = {
        山东省: 0,
        河北省: 1,
        河南省: 1,
        江苏省: 1,
        北京市: 2,
        天津市: 2,
        安徽省: 2,
        山西省: 2,
        辽宁省: 3,
        浙江省: 3,
        湖北省: 3,
        上海市: 4,
        江西省: 4,
        湖南省: 4,
        吉林省: 4,
        福建省: 5,
        广东省: 5,
        黑龙江省: 5,
        重庆市: 6,
        四川省: 6,
        贵州省: 6,
        海南省: 7,
        云南省: 7,
        陕西省: 7,
      };

      const maxLevel = Math.max(...Object.values(animationProvinces));

      // 初始化数据，山东是橙黄色，其他省份都是灰色
      const initialData = Object.keys(animationProvinces).map((name) => ({
        name,
        value: name === "山东省" ? 1 : 0,
        itemStyle: {
          areaColor: name === "山东省" ? "#f59e0b" : "#f0f0f0",
          borderColor: "#ccc",
          borderWidth: 1,
        },
      }));

      // 配置选项
      const option = {
        tooltip: {
          trigger: "item",
          formatter: function (params: any) {
            return `${params.name}`;
          },
        },
        series: [
          {
            name: "中国地图",
            type: "map",
            map: "china",
            roam: false,
            zoom: 1.0,
            center: [104.195, 35.86],
            itemStyle: {
              areaColor: "#f0f0f0",
              borderColor: "#ccc",
              borderWidth: 1,
            },
            label: {
              show: false,
              fontSize: 8,
              color: "#333",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 10,
                color: "#333",
              },
              itemStyle: {
                areaColor: "#4da6ff",
              },
            },
            select: {
              disabled: true,
            },
            data: initialData,
          },
        ],
      };

      chart.setOption(option);

      // 确保图表正确渲染
      setTimeout(() => {
        chart.resize();
      }, 100);

      setLoading(false);

      // 开始动画效果
      setTimeout(() => {
        startAnimation(chart, animationProvinces, maxLevel);
      }, 500);
    } catch (err) {
      console.error("初始化地图失败:", err);
      const errorMessage =
        err instanceof Error ? err.message : "初始化地图失败";
      setError(`地图加载失败: ${errorMessage}`);
      setLoading(false);
    }
  }, []);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    initChart();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, [initChart]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center h-[400px] ${className}`}
      >
        <div className="text-red-500 text-center">
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {loading && (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-muted-foreground">正在加载地图...</div>
        </div>
      )}
      <div
        ref={chartRef}
        className="w-full h-[400px]"
        style={{
          display: loading ? "none" : "block",
          width: "100%",
        }}
      />
    </div>
  );
};

export default SimpleChinaMap;
