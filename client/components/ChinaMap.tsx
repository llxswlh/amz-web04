import React, { useEffect, useRef, useState, useCallback } from "react";
import * as echarts from "echarts/core";
import { MapChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// Register the required components
echarts.use([
  CanvasRenderer,
  MapChart,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
]);
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChinaMapProps {
  className?: string;
}

// 动画函数：从山东开始向周围扩散变色，带渐变效果
const startAnimation = (
  chart: echarts.ECharts,
  provinces: Record<string, number>,
  maxLevel: number,
  setIsAnimating: (value: boolean) => void,
) => {
  setIsAnimating(true);
  const blueColor = "#2563eb"; // 统一蓝色
  const orangeColor = "#f59e0b"; // 山东橙黄色

  let currentLevel = 0;
  let animationStep = 0;
  const stepsPerLevel = 8; // 每层分8步渐变

  const animateStep = () => {
    if (currentLevel > maxLevel) {
      setIsAnimating(false);
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

      // 其他省份的���变逻辑
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

const ChinaMap: React.FC<ChinaMapProps> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

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

      // 等待DOM完全渲染，给更多时间
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

      if (container.offsetWidth <= 0) {
        console.warn("容器宽度异常，使用默认宽度");
      }

      // 获取中国地图GeoJSON数据 - 使用本地API代理，添加错误重试
      let response;
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          response = await fetch("/api/map-data", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            break;
          }
        } catch (fetchError) {
          console.warn(`Fetch attempt ${retryCount + 1} failed:`, fetchError);
        }
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      let geoData;
      if (!response || !response.ok) {
        console.warn("API失败，尝试使用备用数据源");

        // 备用方案：直接访问原始API
        try {
          const backupResponse = await fetch(
            "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
          );
          if (backupResponse.ok) {
            geoData = await backupResponse.json();
          } else {
            throw new Error("备用数据源也无法访问");
          }
        } catch (backupError) {
          const errorData = (await response?.json().catch(() => ({}))) || {};
          throw new Error(
            `获取地图数据失败: ${response?.status || "Network Error"} ${errorData.message || response?.statusText || ""}。备用方案也失败: ${backupError}`,
          );
        }
      } else {
        geoData = await response.json();
      }

      // 初始化ECharts实例���使用更安全���尺寸��置
      const chart = echarts.init(container, null, {
        width: Math.max(container.offsetWidth, 800), // 确保最小宽度
        height: 600,
        renderer: "canvas",
      });

      chartInstanceRef.current = chart;

      // 过滤地图数据，移除南沙群岛
      const filteredGeoData = {
        ...geoData,
        features: geoData.features.filter((feature: any) => {
          const name = feature.properties?.name || "";
          // 过滤掉南沙群岛相关区域
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
        title: {
          text: "中华人民共和国地图",
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        },
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
            roam: false, // 禁用拖动和缩放
            zoom: 1.2,
            center: [104.195, 35.86],
            itemStyle: {
              areaColor: "#f0f0f0",
              borderColor: "#ccc",
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                areaColor: "#4da6ff",
              },
            },
            label: {
              show: true,
              fontSize: 10,
              color: "#333",
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
        startAnimation(chart, animationProvinces, maxLevel, setIsAnimating);
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
      <Card className={className}>
        <CardHeader>
          <CardTitle>中国地图</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[600px] space-y-4">
            <div className="text-red-500 text-center">
              <p className="font-semibold">❌ 地图加载失败</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
            <Button onClick={initChart} variant="outline" size="sm">
              🔄 重试加载
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>中国地图</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-muted-foreground">正在加载地图...</div>
          </div>
        )}
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              onClick={() => {
                if (chartInstanceRef.current) {
                  startAnimation(
                    chartInstanceRef.current,
                    {
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
                    },
                    7,
                    setIsAnimating,
                  );
                }
              }}
              disabled={isAnimating}
              variant="outline"
              size="sm"
            >
              {isAnimating ? "🎬 动画播放中..." : "🎬 重新播放动画"}
            </Button>
          </div>
          <div
            ref={chartRef}
            className="w-full h-[600px] min-w-0"
            style={{
              display: loading ? "none" : "block",
              minWidth: "800px",
              width: "100%",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChinaMap;
