import commonjs from "@rollup/plugin-commonjs";

import * as fs from "fs";

const buildDir = "./build";
const inDir = `${buildDir}/src-min-noconflict`;
const outDir = `${buildDir}/esm`;

const files = getFiles(inDir);

const configs = files.map(getConfig);

export default configs;

function getConfig(file) {
  return {
    input: `${inDir}/${file}`,
    plugins: [
      commonjs({
        extensions: [".js", ".mjs"],
        ignoreGlobal: false,
        sourceMap: false,
      }),
    ],

    output: [
      {
        file: `${outDir}/${file}`,
        format: "es",
        freeze: false,
      },
    ],
  };
}

function getFiles(folder) {
  const f = fs.readdirSync(folder);
  return f.filter((file) => file.endsWith(".js"));
}
