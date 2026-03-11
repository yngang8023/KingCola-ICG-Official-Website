import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { brotliCompress, constants as zlibConstants, gzip } from "node:zlib";

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

const DIST_DIR = path.resolve(process.cwd(), "dist");
const MIN_FILE_SIZE = 1024;
const COMPRESSIBLE_EXTENSIONS = new Set([
  ".html",
  ".js",
  ".mjs",
  ".css",
  ".svg",
  ".json",
  ".txt",
  ".xml",
  ".map",
  ".wasm",
]);

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
}

function shouldCompress(filePath, byteLength) {
  if (byteLength < MIN_FILE_SIZE) return false;
  const extension = path.extname(filePath).toLowerCase();
  if (filePath.endsWith(".gz") || filePath.endsWith(".br")) return false;
  return COMPRESSIBLE_EXTENSIONS.has(extension);
}

async function compressFile(filePath, sourceBuffer) {
  const [gzBuffer, brBuffer] = await Promise.all([
    gzipAsync(sourceBuffer, { level: zlibConstants.Z_BEST_COMPRESSION }),
    brotliAsync(sourceBuffer, {
      params: {
        [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
      },
    }),
  ]);

  await Promise.all([
    fs.writeFile(`${filePath}.gz`, gzBuffer),
    fs.writeFile(`${filePath}.br`, brBuffer),
  ]);
}

async function main() {
  const hasDist = await exists(DIST_DIR);
  if (!hasDist) {
    console.warn("[compress-dist] dist 目录不存在，已跳过压缩步骤。");
    return;
  }

  const allFiles = await walkFiles(DIST_DIR);
  let compressedCount = 0;

  for (const filePath of allFiles) {
    const sourceBuffer = await fs.readFile(filePath);
    if (!shouldCompress(filePath, sourceBuffer.byteLength)) {
      continue;
    }

    await compressFile(filePath, sourceBuffer);
    compressedCount += 1;
  }

  console.log(`[compress-dist] 完成，已生成 ${compressedCount} 个文件的 .gz/.br 预压缩版本。`);
}

main().catch((error) => {
  console.error("[compress-dist] 压缩失败:", error);
  process.exit(1);
});
