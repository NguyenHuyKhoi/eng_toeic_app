import { Stack, Tooltip, Typography } from "@mui/material";
import { COLORS } from "@theme";
import React from "react";

export interface TabEntity {
  label: string;
  value: string | number;
  label_tooltip?: string;
}
interface Props {
  style?: any;
  data: TabEntity[];
  value?: string | number;
  onSelect: (a: string | number) => void;
}
export function Tabs({ data, value, onSelect, style }: Props) {
  return (
    <Stack
      direction={"row"}
      sx={{ ...(style ?? {}), alignSelf: "baseline" }}
      spacing={3}
    >
      {data.map((item) => (
        <Stack
          key={item.value}
          onClick={() => onSelect(item.value)}
          sx={{
            cursor: "pointer",
            py: "2px",
            borderBottom: `2px solid ${
              value === item.value ? COLORS.CelticBlue : "rgba(0,0,0,0)"
            }`,
            px: "10px",
          }}
        >
          <Tooltip title={item.label_tooltip}>
            <Typography
              sx={{
                fontSize: 16,
                color:
                  value === item.value
                    ? COLORS.CelticBlue
                    : COLORS.AuroMetalSaurus,
                fontWeight: value === item.value ? "500" : "400",
              }}
            >
              {item.label}
            </Typography>
          </Tooltip>
        </Stack>
      ))}
    </Stack>
  );
}
