import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface BarChartProps {
  data: DataPoint[];
  dataKey: string;
  barColor?: string;
  xAxisDataKey?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  barColor = '#0D9488',
  xAxisDataKey = 'name',
  height = 300,
  showGrid = true,
  showTooltip = true,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          
          <XAxis 
            dataKey={xAxisDataKey} 
            scale="point" 
            padding={{ left: 20, right: 20 }} 
            tick={{ fontSize: 12 }}
          />
          
          <YAxis 
            allowDecimals={false} 
            tick={{ fontSize: 12 }}
          />
          
          {showTooltip && <Tooltip />}
          
          <Bar 
            dataKey={dataKey} 
            fill={barColor} 
            radius={[4, 4, 0, 0]} 
            maxBarSize={50}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;