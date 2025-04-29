import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface LineChartProps {
  data: DataPoint[];
  dataKeys: { key: string; color: string; name?: string }[];
  xAxisDataKey?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showDots?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKeys,
  xAxisDataKey = 'name',
  height = 300,
  showGrid = true,
  showTooltip = true,
  showDots = true,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          
          <XAxis 
            dataKey={xAxisDataKey} 
            padding={{ left: 20, right: 20 }} 
            tick={{ fontSize: 12 }}
          />
          
          <YAxis 
            tick={{ fontSize: 12 }}
          />
          
          {showTooltip && <Tooltip />}
          
          {dataKeys.map((item) => (
            <Line
              key={item.key}
              type="monotone"
              dataKey={item.key}
              name={item.name || item.key}
              stroke={item.color}
              strokeWidth={2}
              dot={showDots}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;