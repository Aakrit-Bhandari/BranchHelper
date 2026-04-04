# Branch Helper

> Lost in branches? Never forget where you were.

A lightweight CLI tool that digs through your shell history and shows you the git commands you've recently used. No config, no setup — just install and go.

---

## Why?

You're deep in a project, juggling 5+ branches, and suddenly you can't remember the name of that feature branch you were on 20 minutes ago. Sound familiar?

**Branch Helper** reads your shell history and instantly shows your recent git commands, so you can find that lost branch in seconds.

## Install

```bash
npm install -g @aakritbhandari/branch-helper
```

## Usage

### Show your last `n` git commands

```bash
branchhelper <n>
```

`n` can be any number from **1 to 20**.

```bash
$ branchhelper 5
Last 5 git commands:
  1. git checkout feature/auth
  2. git pull origin main
  3. git commit -m "fix: resolve login bug"
  4. git checkout main
  5. git stash pop
```

### Filter by prefix

```bash
branchhelper <n> <prefix>
```

The prefix matches against everything **after `git `** in the command.

```bash
$ branchhelper 3 checkout
Last 3 git commands starting with "checkout":
  1. git checkout feature/auth
  2. git checkout main
  3. git checkout develop
```

You can get more specific:

```bash
$ branchhelper 3 "checkout feat"
Last 3 git commands starting with "checkout feat":
  1. git checkout feature/auth
  2. git checkout feature/dashboard
  3. git checkout feat/notifications
```

Or filter by any subcommand:

```bash
$ branchhelper 5 commit     # recent commits
$ branchhelper 3 push       # recent pushes
$ branchhelper 4 stash      # recent stash commands
```

## Features

- **Zero dependencies** — uses only Node.js built-ins
- **Cross-platform** — supports zsh, bash, and PowerShell
- **Deduped & ordered** — shows unique commands, most recent first
- **Fast** — reads directly from your shell history file

## Supported Shells

| Platform      | Shell      | History File                                          |
| ------------- | ---------- | ----------------------------------------------------- |
| Linux / macOS | zsh        | `~/.zsh_history`                                      |
| Linux / macOS | bash       | `~/.bash_history`                                     |
| Windows       | PowerShell | `%APPDATA%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt` |

## License

Fair

## Author

**Aakrit Bhandari** — [GitHub](https://github.com/Aakrit-Bhandari)

---

If this helped you, give it a star on [GitHub](https://github.com/Aakrit-Bhandari/BranchHelper)!
