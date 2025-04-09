import { convert } from "./converter/convert.js";
import { render } from "./renderer/render.js";

type PluginOptions = {
  dir: string;
  mode: "import" | "export" | "both";
};

export default function (options: PluginOptions) {
  return {
    beforeProcess: (ctx) => {
      const mode = options.mode || "both";
      const dir = options.dir;

      if (mode === "export" || mode === "both") {
        console.info(`[↓] Exporting localization data to ${dir}`);
        convert(ctx.data, dir);

        if (mode === "export") {
          console.info("[x] Terminating after export to allow for string modification");
          return true;
        }
      }

      if (mode === "import" || mode === "both") {
        console.info(`[↑] Importing localization data from ${dir}`);
        render(ctx.data, dir);
      }

      return false;
    },
  };
}
