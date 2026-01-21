
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const data = [
  { name: 'MON', value: 40 },
  { name: 'TUE', value: 90 },
  { name: 'WED', value: 30 },
  { name: 'THU', value: 70 },
  { name: 'FRI', value: 45 },
  { name: 'SAT', value: 120 },
  { name: 'SUN', value: 80 },
];

const ViewsChart: React.FC = () => {
  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#70c1db" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#70c1db" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#70c1db"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewsChart;
