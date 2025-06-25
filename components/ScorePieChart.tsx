
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

interface ScorePieChartProps {
  fitScore: number;
  engagementScore: number;
  activityScore: number;
}

const ScorePieChart: React.FC<ScorePieChartProps> = ({ fitScore, engagementScore, activityScore }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const rootStyles = getComputedStyle(document.documentElement);
        const textColorPrimary = rootStyles.getPropertyValue('--text-primary').trim();
        
        // Use fixed pie chart segment colors
        const segment1Rgb = rootStyles.getPropertyValue('--pie-chart-segment-1-rgb').trim() || 'rgb(54, 162, 235)'; // Blue fallback
        const segment2Rgb = rootStyles.getPropertyValue('--pie-chart-segment-2-rgb').trim() || 'rgb(255, 159, 64)'; // Orange fallback
        const segment3Rgb = rootStyles.getPropertyValue('--pie-chart-segment-3-rgb').trim() || 'rgb(75, 192, 192)'; // Green fallback
        
        const validRgb = (rgbStr: string) => /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(rgbStr) ? rgbStr : 'rgb(128,128,128)';

        chartInstanceRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Fit Score', 'Engagement Score', 'Activity Score'],
            datasets: [{
              label: 'Score Breakdown',
              data: [fitScore, engagementScore, activityScore],
              backgroundColor: [
                validRgb(segment1Rgb).replace(')', ', 0.7)'), 
                validRgb(segment2Rgb).replace(')', ', 0.7)'),
                validRgb(segment3Rgb).replace(')', ', 0.7)'),
              ],
              borderColor: [ 
                validRgb(segment1Rgb),
                validRgb(segment2Rgb),
                validRgb(segment3Rgb),
              ],
              borderWidth: 1.5,
              hoverOffset: 8,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true, 
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: textColorPrimary,
                  font: {
                    size: 12,
                    family: 'Roboto, sans-serif'
                  },
                  padding: 15,
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.75)', // Slightly more opaque tooltip
                titleColor: '#fff',
                bodyColor: '#fff',
                titleFont: { size: 13, weight: 'bold', family: 'Roboto, sans-serif' },
                bodyFont: { size: 12, family: 'Roboto, sans-serif' },
                padding: 10,
                cornerRadius: 4,
                displayColors: true,
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label = context.label || ''; // Use the segment label instead of dataset label
                    }
                    if (context.parsed !== null) {
                       if (label) label += ': ';
                      label += context.parsed;
                    }
                    return label;
                  }
                }
              }
            }
          }
        });
      }
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  // Re-render if scores change or if global styles affecting text color change (approximated by documentElement.className)
  }, [fitScore, engagementScore, activityScore, document.documentElement.className, document.documentElement.style.cssText]); 

  return (
    <div className="relative w-full max-w-xs mx-auto h-64 sm:h-72">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ScorePieChart;
