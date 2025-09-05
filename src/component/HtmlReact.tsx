import { Parser, ProcessNodeDefinitions } from "html-to-react";
import React from "react";

interface Props {
  data: string;
}
const customElements: any = {};

// function CustomBarcode({ value }: { value?: string }) {
//   console.log('value: ', value)
//   return <Barcode value={value ?? '1234567'} />
// }

const htmlParser: any = new Parser(React);
const processNodeDefinitions: any = new ProcessNodeDefinitions(React);
function isValidNode() {
  return true;
}

const processingInstructions = [
  // Create instruction for custom elements
  {
    shouldProcessNode: (node: any) => {
      // Process the node if it matches a custom element
      return node.name && customElements[node.name];
    },
    processNode: (node: any) => {
      const OrignalElement = customElements[node.name];
      const { attribs } = node;

      const convertedAttribs = Object.keys(attribs).reduce((acc, key) => {
        let value = attribs[key];

        if (key === "options") {
          try {
            console.log("try parse to array", value);
            acc[key] = JSON.parse(value);
          } catch (e) {
            console.log('Parse fail", ', e);
            acc[key] = [];
          }
        }
        // Convert numeric strings to numbers
        else if (!isNaN(value) && value.trim() !== "") {
          acc[key] = Number(value);
        }
        // Convert boolean-like strings to booleans
        else if (value.toLowerCase() === "true") {
          acc[key] = true;
        } else if (value.toLowerCase() === "false") {
          acc[key] = false;
        }
        // Keep as string if no conversion applies
        else {
          acc[key] = value;
        }

        return acc;
      }, {} as Record<string, any>);
      return <OrignalElement {...convertedAttribs} />;
    },
  },
  // Default processing
  {
    shouldProcessNode: () => true,
    processNode: processNodeDefinitions.processDefaultNode,
  },
];
export function HtmlReact({ data }: Props) {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.6" }}>
      {htmlParser.parseWithInstructions(
        data,
        isValidNode,
        processingInstructions
      )}
    </div>
  );
}

export function getHtmlContent(content: string | undefined) {
  if (content == undefined) {
    return "";
  }
  return content;
}
