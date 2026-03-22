#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function printUsage() {
  console.error(
    "Usage: node scripts/inventory_case_assets.mjs <markdownPath> <assetsDir> [--format json|markdown]",
  );
}

function parseArgs(argv) {
  if (argv.length < 2) {
    printUsage();
    process.exit(1);
  }

  const [markdownPath, assetsDir, ...rest] = argv;
  let format = "json";

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (token === "--format") {
      format = rest[index + 1] ?? format;
      index += 1;
    }
  }

  if (!["json", "markdown"].includes(format)) {
    console.error("Invalid format. Use json or markdown.");
    process.exit(1);
  }

  return {
    markdownPath: path.resolve(markdownPath),
    assetsDir: path.resolve(assetsDir),
    format,
  };
}

function ensureReadableFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} not found: ${filePath}`);
  }
  if (!fs.statSync(filePath).isFile()) {
    throw new Error(`${label} is not a file: ${filePath}`);
  }
}

function ensureReadableDir(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`${label} not found: ${dirPath}`);
  }
  if (!fs.statSync(dirPath).isDirectory()) {
    throw new Error(`${label} is not a directory: ${dirPath}`);
  }
}

function walkFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

function normalizeStem(fileName) {
  return path
    .basename(fileName, path.extname(fileName))
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function clusterName(fileName) {
  return normalizeStem(fileName)
    .replace(/[-_ ]+\d+$/u, "")
    .replace(/\s*\(\d+\)$/u, "")
    .trim();
}

function inferRole(name) {
  const normalized = normalizeStem(name);
  const rules = [
    [/login|senha/u, "autenticação"],
    [/extrato|receb/i, "extrato ou recebíveis"],
    [/menu/u, "navegação"],
    [/dialog|modal/u, "estado modal"],
    [/simulador|taxa/u, "simulação ou cálculo"],
    [/terminais|terminal/u, "gestão de terminais"],
    [/frame/u, "mockup genérico"],
  ];

  for (const [pattern, label] of rules) {
    if (pattern.test(normalized)) {
      return label;
    }
  }

  return "não classificado";
}

function extractImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".png" && buffer.length >= 24) {
    const signature = buffer.toString("hex", 0, 8);
    if (signature === "89504e470d0a1a0a") {
      return {
        width: buffer.readUInt32BE(16),
        height: buffer.readUInt32BE(20),
      };
    }
  }

  if ((ext === ".jpg" || ext === ".jpeg") && buffer.length > 4) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const segmentLength = buffer.readUInt16BE(offset + 2);
      const isStartOfFrame =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isStartOfFrame) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + segmentLength;
    }
  }

  return {
    width: null,
    height: null,
  };
}

function extractMarkdownReferences(markdown) {
  const referenced = new Set();
  const imageSyntax = /!\[[^\]]*\]\(([^)]+)\)/gu;
  const rawAssetSyntax = /\b([\w./ -]+\.(?:png|jpg|jpeg|webp|gif|svg))\b/giu;

  for (const match of markdown.matchAll(imageSyntax)) {
    referenced.add(path.basename(match[1].trim()));
  }

  for (const match of markdown.matchAll(rawAssetSyntax)) {
    referenced.add(path.basename(match[1].trim()));
  }

  return referenced;
}

function buildInventory(markdownPath, assetsDir) {
  ensureReadableFile(markdownPath, "Markdown file");
  ensureReadableDir(assetsDir, "Assets directory");

  const markdown = fs.readFileSync(markdownPath, "utf8");
  const referenced = extractMarkdownReferences(markdown);
  const assetFiles = walkFiles(assetsDir).filter((filePath) =>
    /\.(png|jpg|jpeg|webp|gif|svg)$/iu.test(filePath),
  );

  const fileEntries = assetFiles
    .map((filePath) => {
      const stats = fs.statSync(filePath);
      const relativePath = path.relative(process.cwd(), filePath);
      const baseName = path.basename(filePath);
      const dimensions = extractImageDimensions(filePath);
      return {
        file: relativePath.replace(/\\/gu, "/"),
        name: baseName,
        cluster: clusterName(baseName),
        role: inferRole(baseName),
        sizeBytes: stats.size,
        width: dimensions.width,
        height: dimensions.height,
        referencedInMarkdown: referenced.has(baseName),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name, "pt-BR"));

  const groupsMap = new Map();
  for (const file of fileEntries) {
    if (!groupsMap.has(file.cluster)) {
      groupsMap.set(file.cluster, []);
    }
    groupsMap.get(file.cluster).push(file);
  }

  const groups = [...groupsMap.entries()]
    .map(([cluster, files]) => ({
      cluster,
      count: files.length,
      recommendedReview: files.length > 2 || cluster === "frame",
      files: files.map((file) => file.name),
    }))
    .sort((left, right) => right.count - left.count || left.cluster.localeCompare(right.cluster, "pt-BR"));

  return {
    markdownPath: path.relative(process.cwd(), markdownPath).replace(/\\/gu, "/"),
    assetsDir: path.relative(process.cwd(), assetsDir).replace(/\\/gu, "/"),
    summary: {
      totalAssets: fileEntries.length,
      referencedAssets: fileEntries.filter((file) => file.referencedInMarkdown).length,
      unreferencedAssets: fileEntries.filter((file) => !file.referencedInMarkdown).length,
      largeClusters: groups.filter((group) => group.count > 2).length,
    },
    groups,
    files: fileEntries,
  };
}

function renderMarkdown(inventory) {
  const lines = [];
  lines.push("# Asset Inventory");
  lines.push("");
  lines.push(`- Markdown: \`${inventory.markdownPath}\``);
  lines.push(`- Assets: \`${inventory.assetsDir}\``);
  lines.push(`- Total de imagens: ${inventory.summary.totalAssets}`);
  lines.push(`- Já referenciadas no markdown: ${inventory.summary.referencedAssets}`);
  lines.push(`- Ainda não referenciadas: ${inventory.summary.unreferencedAssets}`);
  lines.push("");
  lines.push("## Clusters");
  lines.push("");
  lines.push("| Cluster | Qtde | Revisar com atenção | Arquivos |");
  lines.push("| --- | --- | --- | --- |");
  for (const group of inventory.groups) {
    lines.push(
      `| ${group.cluster} | ${group.count} | ${group.recommendedReview ? "sim" : "não"} | ${group.files.join(", ")} |`,
    );
  }
  lines.push("");
  lines.push("## Arquivos");
  lines.push("");
  lines.push("| Arquivo | Cluster | Papel provável | Dimensões | Referenciado |");
  lines.push("| --- | --- | --- | --- | --- |");
  for (const file of inventory.files) {
    const dimensions =
      file.width && file.height ? `${file.width}x${file.height}` : "desconhecido";
    lines.push(
      `| ${file.name} | ${file.cluster} | ${file.role} | ${dimensions} | ${file.referencedInMarkdown ? "sim" : "não"} |`,
    );
  }
  return `${lines.join("\n")}\n`;
}

function main() {
  try {
    const { markdownPath, assetsDir, format } = parseArgs(process.argv.slice(2));
    const inventory = buildInventory(markdownPath, assetsDir);
    if (format === "markdown") {
      process.stdout.write(renderMarkdown(inventory));
      return;
    }
    process.stdout.write(`${JSON.stringify(inventory, null, 2)}\n`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
