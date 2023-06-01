import { createRequire } from "node:module";
const { platform, arch } = process;

const require = createRequire(import.meta.url);

let nativeBinding = undefined;

if (platform === "linux") {
  if (arch === "x64") {
    nativeBinding = require("./dist/pragmatic-segmenter-bindings.linux-x64-gnu.node");
  } else if (arch === "arm64") {
    nativeBinding = require("./dist/pragmatic-segmenter-bindings.linux-arm64-gnu.node");
  }
} else if (platform === "darwin") {
  if (arch === "x64") {
    nativeBinding = require("./dist/pragmatic-segmenter-bindings.darwin-x64.node");
  } else if (arch === "arm64") {
    nativeBinding = require("./dist/pragmatic-segmenter-bindings.darwin-arm64.node");
  }
} else {
  throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
}

export default nativeBinding;
