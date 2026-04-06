import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import {
  ArrowDownwardIcon,
  ArrowUpIcon,
  InfoIcon,
  VerticalEllipsisDark,
} from "@/assets";
import type { CardData } from "@/types";

const StatCard: React.FC<{ data: CardData }> = ({ data }) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "grey.100",
        backgroundColor: "background.paper",
        borderRadius: "10px",
        p: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={2}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography sx={{ fontWeight: "600", color: "#1a237e", fontSize: "13px" }}>
              {data.title}
            </Typography>
            <InfoIcon sx={{ fontSize: 14, color: "#9e9e9e" }} />
          </Stack>
          <IconButton size="small">
            <VerticalEllipsisDark sx={{ fontSize: 18, color: "#9e9e9e" }} />
          </IconButton>
        </Stack>

        {/* Main Content: Value and Graph */}
        <Grid container alignItems="center">
          <Grid size={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  bgcolor: "#f5faff",
                  p: 0.5,
                  borderRadius: 1,
                  display: "flex",
                  border: "1px solid #e3f2fd",
                }}
              >
                {data.icon}
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1a237e">
                {data.value}
              </Typography>
              {data.badge && (
                <Box
                  sx={{
                    bgcolor: "#fce4ec",
                    color: "#d81b60",
                    px: 0.5,
                    borderRadius: 0.5,
                    fontSize: "0.65rem",
                    fontWeight: "bold",
                    border: "1px solid #f8bbd0",
                  }}
                >
                  {data.badge}
                </Box>
              )}
            </Stack>
          </Grid>

          <Grid size={6} sx={{ height: 40 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={data.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>

        {/* Footer */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {data.trend === "up" ? (
            <ArrowUpIcon sx={{ fontSize: 12, color: "#9e9e9e" }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: 12, color: "#9e9e9e" }} />
          )}
          <Typography variant="caption" color="#9e9e9e">
            {data.footerText}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StatCard;