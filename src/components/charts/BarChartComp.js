import React from "react";
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const BarChartComp = ({ data, name, value }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <BarChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 15,
      }}
      barSize={20}
    >
      <XAxis dataKey={name} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey={value} fill={COLORS[0]} background={{ fill: "#eee" }} />
    </BarChart>
  );
};

export default BarChartComp;
