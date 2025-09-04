import { Stack, Typography } from "@mui/material";
import { COLORS } from "@theme";
import _ from "lodash";
import { CSSProperties, useCallback, useEffect, useRef } from "react";

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  style,
}: {
  label?: string;
  value: string;
  onChange: (a: any) => void;
  style?: CSSProperties;
  placeholder?: string;
}) {
  const debouncedChange = useCallback(
    _.debounce((e) => onChange(e.target.value), 200),
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value, inputRef?.current]);

  return (
    <Stack
      style={{
        width: "200px",
        ...(style ?? {}),
      }}
    >
      {label && (
        <Typography
          style={{
            fontSize: 14,
            color: COLORS.DarkCharcoal,
            fontWeight: 400,
            marginBottom: "6px",
          }}
        >
          {label}
        </Typography>
      )}
      <input
        ref={inputRef}
        defaultValue={value}
        placeholder={placeholder}
        onChange={debouncedChange}
        style={{
          fontSize: 14,
          color: COLORS.DarkCharcoal,
          fontWeight: 400,
          padding: "8px 16px",
          borderRadius: "4px",
        }}
      />
    </Stack>
  );
}
