import { showToast } from "@component";
import { Box, Stack, Typography } from "@mui/material";
import { COLORS } from "@theme";
import { isInteger, max } from "lodash";
import { useCallback, useEffect, useState } from "react";

export function InputIndex({
  props_value,
  max_value,
  onSubmit,
}: {
  props_value: number;
  onSubmit: (a: number) => void;
  max_value: number;
}) {
  const [value, setValue] = useState<number>(1);
  useEffect(() => {
    setValue(props_value);
  }, [props_value]);

  const handleSubmit = useCallback(() => {
    console.log("on submit: ", value, max_value);
    if (value > max_value || value < 0) {
      showToast({ content: "Enter wrong number", type: "warning" });
      return;
    }
    onSubmit(value - 1);
  }, [max_value, onSubmit, value]);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      sx={{ alignItems: "center" }}
    >
      <input
        key={props_value}
        defaultValue={value}
        type="number"
        onChange={(event) => {
          try {
            const val = event.target.value;
            if (val == "") {
              return;
            }
            const num = Number.parseInt(event.target.value);
            console.log("On change number:", num);
            if (isInteger(num)) {
              setValue(num);
            }
          } catch (e) {}
        }}
        style={{
          height: "30px",
          fontSize: "20px",
          color: COLORS.DarkCharcoal,
          padding: "2px 12px",
          width: "60px",
          backgroundColor: "#fff",
        }}
        max={max_value}
      />
      <Box
        sx={{
          padding: "2px 12px",
          borderRadius: "4px",
          backgroundColor: COLORS.CelticBlue,
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        <Typography
          style={{ fontSize: "12px", fontWeight: "600", color: COLORS.white }}
        >
          OK
        </Typography>
      </Box>
    </Stack>
  );
}
