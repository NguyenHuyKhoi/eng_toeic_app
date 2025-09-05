import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

export function CKEditor({
  data,
  height,
  onChange,
  onReady = () => {},
  disabled,
  minimal,
}: {
  data: string;
  height?: number;
  onChange: (a: any) => void;
  onReady?: () => void;
  disabled?: boolean;
  minimal?: boolean;
}) {
  const [value, setValue] = useState<string>("");
  const editorRef = useRef(null);

  useEffect(() => {
    onReady();
    setValue(data);
  }, []);

  const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div style={{ height: 400 }}>
      <Editor
        disabled={disabled}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={
          minimal
            ? {
                plugins: "paste textcolor link code",
                menubar: false,
                toolbar: "bold italic underline forecolor backcolor link code",
                height,
                skin: useDarkMode ? "oxide-dark" : "oxide",
                content_css: useDarkMode ? "dark" : "default",
                content_style:
                  "body {font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }
            : {
                plugins:
                  "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                imagetools_cors_hosts: ["picsum.photos"],
                menubar: false,
                toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor | emoticons | insertfile image media link | code",
                toolbar_sticky: true,
                autosave_ask_before_unload: true,
                autosave_interval: "30s",
                autosave_prefix: "{path}{query}-{id}-",
                autosave_restore_when_empty: false,
                autosave_retention: "2m",
                image_advtab: true,
                image_class_list: [
                  { title: "None", value: "" },
                  { title: "Some class", value: "class-name" },
                ],
                importcss_append: true,
                // images_upload_handler: async (blobInfo, success, failure) => {
                //   try {
                //     const image_url = await Api.common.upload_image(
                //       blobInfo.blob()
                //     );
                //     console.log("Uploaded url: ", image_url);
                //     return success(image_url);
                //   } catch (error) {
                //     console.log("error", error);
                //     return failure("Upload failed");
                //   }
                // },
                height: height ?? 400,
                image_caption: true,
                quickbars_selection_toolbar:
                  "bold italic | quicklink h2 h3 blockquote quicktable",
                noneditable_noneditable_class: "mceNonEditable",
                toolbar_mode: "sliding",
                contextmenu: "link image imagetools table",
                skin: useDarkMode ? "oxide-dark" : "oxide",
                content_css: useDarkMode ? "dark" : "default",
                content_style:
                  "body {font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }
        }
        value={value || data}
        onEditorChange={(content) => {
          onChange(content);
          setValue(content);
        }}
      />
    </div>
  );
}
