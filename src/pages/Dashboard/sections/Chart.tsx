import React, { useMemo } from "react";
import { Box, Card, Typography, Select, MenuItem, FormControl, Stack } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MonthlyData {
  month: string;
  approved: number;
  pilot: number;
}

const RAW_DATA: MonthlyData[] = [
  { month: "January",  approved: 590, pilot: 490 },
  { month: "February", approved: 400, pilot: 100 },
  { month: "March",    approved: 500, pilot: 300 },
  { month: "April",    approved: 590, pilot: 490 },
  { month: "May",      approved: 300, pilot: 200 },
  { month: "June",     approved: 400, pilot: 200 },
];

const COLORS = {
  approved: "#22c55e",
  pilot: "#ff8a48",
  text: "#94a3b8",
  grid: "#e2e8f0",
};

// Stable outside component — never recreated on render
const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const CURSOR_STYLE = { fill: "#f8fafc" };

const LEGEND_ITEMS = [
  { label: "Approved Ideas", color: COLORS.approved },
  { label: "Pilot",          color: COLORS.pilot },
];

const IdeaPipelineChart: React.FC = () => {
  // Memoize so data reference is stable across parent re-renders
  const data = useMemo(() => RAW_DATA, []);

  return (
    <Card elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid #f0f0f0", width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography sx={{ color: "#64748b", fontWeight: 600, fontSize: "1rem" }}>
          Idea Pipeline Breakdown
        </Typography>

        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" spacing={3}>
            {LEGEND_ITEMS.map(({ label, color }) => (
              <Stack key={label} direction="row" alignItems="center" spacing={1}>
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: color }} />
                <Typography sx={{ fontSize: "0.75rem", color: "#475569", fontWeight: 500 }}>
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <FormControl size="small">
            <Select
              value="this-year"
              sx={{
                fontSize: "0.75rem",
                borderRadius: 2,
                minWidth: 100,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
              }}
            >
              <MenuItem value="this-year">This Year</MenuItem>
              <MenuItem value="last-year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Box sx={{ width: "100%", height: 400 }}>
        {/* debounce prevents resize thrashing */}
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={12}>
            <CartesianGrid vertical={false} strokeDasharray="5 5" stroke={COLORS.grid} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: COLORS.text, fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: COLORS.text, fontSize: 12 }}
              domain={[0, 600]}
              ticks={[0, 100, 200, 300, 400, 500, 600]}
            />
            <Tooltip
              cursor={CURSOR_STYLE}
              contentStyle={TOOLTIP_STYLE}
              // isAnimationActive={false} // uncomment if data updates frequently
            />
            <Bar dataKey="approved" fill={COLORS.approved} radius={[4, 4, 4, 4]} barSize={32} isAnimationActive={false} />
            <Bar dataKey="pilot"    fill={COLORS.pilot}    radius={[4, 4, 4, 4]} barSize={32} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default React.memo(IdeaPipelineChart);