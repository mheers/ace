import commonjs from "@rollup/plugin-commonjs";

import recursive from "recursive-readdir";

const buildDir = "./build";
const inDir = `${buildDir}/src-min-noconflict`;
const outDir = `${buildDir}/esm`;

export default async () => {
  return recursive(inDir).then((f) => {
    const files = f.filter((file) => file.endsWith(".js"));
    return files.map(getConfig);
  });
};

function getConfig(file) {
  return {
    input: `${file}`,
    plugins: [
      commonjs({
        extensions: [".js", ".mjs"],
        ignoreGlobal: false,
        sourceMap: false,
      }),
    ],

    output: [
      {
        file: `${outDir}/${file}`.replace(inDir.replace(".", ""), ""),
        format: "es",
        freeze: false,
      },
    ],
  };
}
