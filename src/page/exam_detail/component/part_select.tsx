import { useUI } from "@common";
import { TOEIC_PARTS } from "@model";
import { COLORS } from "@theme";
import { Checkbox, CheckboxOptionType, Typography } from "antd";

export function PartSelect({
  selected_list,
  onSelect,
}: {
  selected_list: number[];
  onSelect: (a: number[]) => void;
}) {
  const OPTIONS: CheckboxOptionType[] = TOEIC_PARTS.map((u) => ({
    label: `PART ${u.index}`,
    value: u.index,
  }));
  const { is_mobile, viewport_width } = useUI();
  return (
    <div style={{}}>
      <Checkbox.Group value={selected_list} onChange={onSelect} style={{}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {OPTIONS.map((option, option_index) => (
            <Checkbox
              key={option.value}
              value={option.value}
              style={{
                fontSize: is_mobile ? "16px" : "16px",
                marginLeft: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",

                  alignItems: "center",
                  justifyContent: "space-between",
                  width: is_mobile ? "75vw" : "500px",
                  padding: "8px 0px 8px 0px",
                  marginLeft: "12px",
                  borderBottom: `1px solid ${COLORS.bright_Gray}`,
                }}
              >
                <Typography.Text
                  style={{
                    fontSize: "16px",
                    color: COLORS.DarkCharcoal,
                    fontWeight: "500",
                    display: "flex",
                    flex: 1,
                  }}
                >
                  {option.label}
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "14px",
                    color: COLORS.nickel,
                    marginRight: is_mobile ? "0px" : "12px",
                  }}
                >
                  {TOEIC_PARTS[option_index].question_num + " questions"}
                </Typography.Text>
              </div>
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
    </div>
  );
}
