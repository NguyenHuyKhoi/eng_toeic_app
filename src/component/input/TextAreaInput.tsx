import { Stack, Typography } from "@mui/material";
import { COLORS } from "@theme";
import _ from "lodash";
import { CSSProperties, useCallback } from "react";

export function TextAreaInput({
  label,
  value,
  onChange,
  style,
}: {
  label?: string;
  value: string;
  onChange: (a: any) => void;
  style?: CSSProperties;
}) {
  const debouncedChange = useCallback(
    _.debounce((e) => {
      onChange(e.target.value);
    }, 200),
    []
  );
  return (
    <Stack
      style={{
        width: "100%",

        ...(style ?? {}),
      }}
    >
      {label && (
        <Typography
          style={{ fontSize: 14, color: COLORS.DarkCharcoal, fontWeight: 400 }}
        >
          {label}
        </Typography>
      )}
      <textarea
        placeholder="Nội dung"
        style={{
          height: "100%",
          fontSize: "14px",
          fontWeight: "400",
          color: COLORS.DarkCharcoal,
          borderRadius: "4px",
          paddingLeft: "12px",
          paddingTop: "10px",
        }}
        defaultValue={value}
        onChange={debouncedChange}
      />
    </Stack>
  );
}
