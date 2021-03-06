import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  external: ["react", "react/jsx-runtime"],
  input: "src/index.tsx",
  output: [
    {
      dir: "dist-cjs",
      format: "cjs",
      compact: true,
      sourcemap: true,
    },
    {
      dir: "dist-esm",
      format: "esm",
      compact: true,
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      extract: "styles.css",
      minimize: true,
      sourceMap: true,
    }),
    typescript(),
    commonjs(),
    terser()
  ],
};
