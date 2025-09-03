// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-inferrable-types */
// /* eslint-disable react/require-default-props */
// import {
//   Autocomplete,
//   AutocompleteProps,
//   FormControl,
//   FormHelperText,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { COLORS } from "@theme";
// import _ from "lodash";
// import { CSSProperties, JSX, ReactNode, useCallback, useState } from "react";

// interface Props<ItemT>
//   extends Omit<
//     AutocompleteProps<
//       ItemT,
//       boolean | undefined,
//       boolean | undefined,
//       boolean | undefined
//     >,
//     "renderInput" | "options" | "getOptionLabel"
//   > {
//   label?: string;
//   placeholder?: string;
//   label_style?: CSSProperties;
//   value_style?: CSSProperties;
//   err_msg?: string;
//   options: ItemT[];
//   getOptionLabel?: (item: ItemT) => string;
//   getOptionCaption?: (item: ItemT) => string;
//   selectOption?: (item: ItemT) => void;
//   selectOptions?: (items: ItemT[]) => void;
//   filterFunc?: (item: ItemT, searchKey: string) => boolean;
//   renderInput?: (a: string) => JSX.Element;
// }

// export function DropdownPicker<ItemT>({
//   placeholder,
//   options,
//   fullWidth,
//   value,
//   label_style,
//   label,
//   err_msg,
//   value_style,
//   isOptionEqualToValue,
//   getOptionLabel,
//   selectOption,
//   selectOptions,
//   filterFunc,
//   getOptionCaption,
//   disabled,
//   ...others
// }: Props<ItemT>) {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [searchKey, setSearchKey] = useState<string>("");
//   const [data, setData] = useState<ItemT[]>([]);
//   const debouncedSearch = useCallback(
//     _.debounce((value) => setSearchKey(value), 1000),
//     []
//   );

//   const renderLabel = useCallback(
//     (option: any) => {
//       if (option == null) return "";
//       return getOptionLabel
//         ? getOptionLabel(option)
//         : typeof option === "string" || option instanceof String
//         ? (option as string)
//         : "";
//     },
//     [getOptionLabel]
//   );

//   return (
//     <FormControl fullWidth={fullWidth === undefined ? true : fullWidth}>
//       {label && (
//         <Typography
//           sx={{
//             fontFamily: "Be Vietnam Pro, sans-serif",
//             fontSize: "14px",
//             lineHeight: "20px",
//             color: "#525252",
//             mb: "8px",
//           }}
//         >
//           {label}
//         </Typography>
//       )}
//       <Autocomplete
//         disabled={disabled}
//         disableCloseOnSelect
//         onChange={(_e, v: any) =>
//           Array.isArray(v)
//             ? selectOptions?.(v as ItemT[])
//             : selectOption?.(v as ItemT)
//         }
//         size="small"
//         value={value}
//         defaultValue={value}
//         filterOptions={(options) =>
//           filterFunc
//             ? options.filter((option) => filterFunc(option, inputValue))
//             : options
//         }
//         options={options ? [...options] : [...data]}
//         onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
//         renderOption={(props, option) => (
//           <Stack {...props} alignItems="flex-start">
//             <Typography
//               sx={{
//                 fontSize: 14,
//                 fontWeight: 600,
//                 color: COLORS.DarkCharcoal,
//                 ...label_style,
//               }}
//             >
//               {renderLabel(option)}
//             </Typography>
//             {getOptionCaption && (
//               <Typography
//                 sx={{
//                   fontSize: 13,
//                   fontWeight: 400,
//                   color: COLORS.nickel,
//                 }}
//               >
//                 {getOptionCaption(option)}
//               </Typography>
//             )}
//           </Stack>
//         )}
//         getOptionLabel={(option: string | ItemT) => renderLabel(option)}
//         isOptionEqualToValue={
//           isOptionEqualToValue || ((a: any, b: any) => a?.id === b?.id)
//         }
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             placeholder={placeholder ?? ""}
//             fullWidth
//             onChange={(e: any) => debouncedSearch(e.target.value)}
//             sx={{
//               ...value_style,
//             }}
//           />
//         )}
//         sx={{
//           "& .MuiAutocomplete-tag": {
//             backgroundColor: "#FFF",
//             borderRadius: 0,
//           },
//         }}
//         {...others}
//       />
//       {err_msg && <FormHelperText error>{err_msg}</FormHelperText>}
//     </FormControl>
//   );
// }
