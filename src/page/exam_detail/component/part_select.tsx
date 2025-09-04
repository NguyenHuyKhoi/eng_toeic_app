import { TOEIC_PARTS } from "@model";
import { Checkbox, CheckboxOptionType } from "antd";

export function PartSelect({
  selected_list,
  onSelect,
}: {
  selected_list: number[];
  onSelect: (a: number[]) => void;
}) {
  const OPTIONS: CheckboxOptionType[] = TOEIC_PARTS.map((u) => ({
    label: `PART ${u.index} (${u.question_num ?? 0} câu hỏi)`,
    value: u.index,
  }));
  return (
    <div>
      <Checkbox.Group value={selected_list} onChange={onSelect}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {OPTIONS.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
    </div>
  );
}
