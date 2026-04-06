#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

function getHistoryPath() {
  if (process.platform === "win32") {
    return path.join(
      process.env.APPDATA,
      "Microsoft",
      "Windows",
      "PowerShell",
      "PSReadLine",
      "ConsoleHost_history.txt",
    );
  }
  const shell = process.env.SHELL || "";
  const historyFile = shell.includes("zsh") ? ".zsh_history" : ".bash_history";
  return path.join(os.homedir(), historyFile);
}

function parseCommand(line) {
  const match = line.match(/^:\s*\d+:\d+;(.*)$/);
  return (match ? match[1] : line).trim();
}

function isGitCommand(cmd) {
  return cmd.startsWith("git ");
}

function filterByPrefix(commands, prefix) {
  return commands.filter((cmd) => {
    const afterGit = cmd.replace(/^git\s+/, "");
    const commandSplitter = afterGit.split(" ");
    const res = commandSplitter.filter((word) => word.startsWith(prefix));
    return res.length > 0 ? cmd : "";
  });
}

const n = parseInt(process.argv[2]);
const prefix = process.argv.slice(3).join(" ");

if (!n || n < 1 || n > 20) {
  console.log("Usage:");
  console.log("  branchhelper <n>          Show last n git commands (n <= 20)");
  console.log(
    "  branchhelper <n> <letter>  Show last n git commands starting with <letter>",
  );
  console.log("\nExample:");
  console.log("  branchhelper 5            Last 5 git commands");
  console.log(
    "  branchhelper 3 c          Last 3 git checkout <branch> commands",
  );
  process.exit(1);
}

const historyPath = getHistoryPath();

fs.readFile(historyPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading history file:", err);
    return;
  }

  const lines = data.split("\n").filter(Boolean);
  let gitCommands = lines.map(parseCommand).filter(isGitCommand);

  if (prefix) {
    gitCommands = filterByPrefix(gitCommands, prefix);
  }

  const seen = new Set();
  const unique = [];
  for (let i = gitCommands.length - 1; i >= 0; i--) {
    if (!seen.has(gitCommands[i])) {
      seen.add(gitCommands[i]);
      unique.push(gitCommands[i]);
    }
  }
  const recent = unique.slice(0, n);

  if (recent.length === 0) {
    console.log("No matching git commands found.");
    return;
  }

  console.log(
    `Last ${recent.length} git command${recent.length > 1 ? "s" : ""}${prefix ? ` starting with "${prefix}"` : ""}:`,
  );
  recent.forEach((cmd, i) => console.log(`  ${i + 1}. ${cmd}`));
});
