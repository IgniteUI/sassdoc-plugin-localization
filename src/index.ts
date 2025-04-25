import path from "path/posix";
import { convert } from "./converter/convert.js";
import { render } from "./renderer/render.js";

type PluginOptions = {
  dir: string;
  mode: "import" | "export" | "both";
  languages?: string[];
};

export default function (options: PluginOptions) {
  return {
    beforeProcess: (ctx) => {
      const mode = options.mode || "both";
      const dir = options.dir;
      const languages = options.languages || ["en"];

      if (mode === "export" || mode === "both") {
        console.info(`[↓] Exporting localization data to ${dir}`);

        for (const lang of languages) {
          const langDir = path.join(dir, lang);
          convert(ctx.data, langDir);
        }

        if (mode === "export") {
          console.info(
            "[x] Terminating after export to allow for string modification",
          );
          return true;
        }
      }

      if (mode === "import" || mode === "both") {
        if (!ctx.lang || !options.languages?.includes(ctx.lang)) {
          console.warn(
            "[!] No valid language specified. Falling back to the default theme language.",
          );
          return false;
        }

        const langDir = path.join(dir, ctx.lang);

        console.info(`[↑] Importing localization data from ${langDir}`);
        render(ctx.data, langDir);
      }

      return false;
    },
  };
}
