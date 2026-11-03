# Supply-chain work report: eva-config-picker

Branch `feature/supply-chain`, based on `master` at `2c6d110`. Status: COMPLETE.

## What was done

### Step 1: caller workflow

Added `.github/workflows/compliance.yml`, byte-for-byte identical to the starter. It runs the four `supply-chain / *` checks on every pull request and a full-history scan every week.

### Step 2: quarantine config

The repository has one `package.json`, at the root. Added the starter's `.npmrc` next to it, with `min-release-age=7`. Packages younger than seven days are then refused.

The `.gitignore` file ignored `.npmrc` (rule `.npmrc` on line 30). I removed that rule. Without this, the file could not be committed. `git check-ignore -v .npmrc` now prints nothing.

The project does not use Bun (no `bun.lock` or `bun.lockb`), so no `bunfig.toml` was added.

### Step 3: CODEOWNERS

No CODEOWNERS file existed (not at the root, not in `.github/`, not in `docs/`). Created `.github/CODEOWNERS` with exactly the three lines from the steps document. The policy files then need an admin review.

### Step 4: gitleaks pre-push hook

No hook manager was found: no `.husky/` directory, no `prepare` script, no `simple-git-hooks`, no `lefthook` config and no `pre-commit` config. So I used Route A.

Added `.githooks/pre-push`, unchanged from the starter, with mode `100755`. The hook scans the commits you are about to push for secrets, before they reach GitHub. I ran `git config core.hooksPath .githooks` in this clone.

Hook self-test output:

```
Scanning 649697651c728f7ebbb4bdf154dd230080dfd30a..c9db54a1ae7015b8077827b9134c07408d2b38af for secrets
INF 1 commits scanned.
INF scanned ~2963 bytes (2.96 KB) in 59.4ms
INF no leaks found
exit=0
```

### Step 5: README

Updated `readme.md`. All project-specific content is kept. Changes:

- **Branch strategy and protection** (new). `master` is the default branch and the only long-lived branch. The other remote branches (`chore/upgrade-stencil-firebase` and three Dependabot branches) are short-lived. The section describes the active organisation ruleset "Enforce PR workflow": pull request required, code-owner review required, linear history (squash or rebase only), no force push, no deletion. It also names the four `supply-chain / *` checks and the admin review on the policy files.
- **Compliance** (new). Copied from the starter, with the Route A install lines in "Before you push". The `bunfig.toml` text is left out because the project does not use Bun.
- **Deploying** (replaces the old "Publishing" section, and keeps its sentence). Describes the `Build and release` workflow: on every push to `master` it runs `npm ci`, `npm run build` and `semantic-release`. semantic-release publishes `@springtree/eva-config-picker` to npm through trusted publishing (OIDC) and creates the tag and GitHub release.
- The "Naming Components" subsection moved up, under "Development", so that it is not under "Deploying". Its text is unchanged.

The README uses H1 headings for its top-level sections, so the new sections follow that level (H1 for Compliance and Deploying, H2 for subsections) rather than the starter's H2/H3.

### Step 6: long-lived tokens

The workflows use only `secrets.GITHUB_TOKEN`, which is short-lived. `gh secret list` shows no repository secrets. There is no CI outside GitHub Actions (no Bitrise, Cloud Build, GitLab, CircleCI or Travis config). See the table below.

## Notes

- This repository is one of 22 sharing the `0 5 * * 1` cron schedule in compliance.yml. The file was kept unchanged per instructions; an admin can stagger the minute later.
- Removed the `.npmrc` rule from `.gitignore` (step 2).
- No existing CODEOWNERS file, so `.github/CODEOWNERS` is new.
- The repository also has a repository-level ruleset named "master" with enforcement `disabled`. Only the organisation ruleset "Enforce PR workflow" is active.
- The README still has a Travis CI build badge. The project moved from Travis to GitHub Actions (commit `f4b49f2`), so the badge is probably stale. I left it, because it is project content outside the three sections.
- npm shows `@springtree/eva-config-picker` at version `1.17.2`, last modified 2026-10-30. I could not check from here that npm trusted publishing is configured for this package on npmjs.com. The workflow comment says it is.

## Tokens found (step 6)

| Secret name | File | Used for | Proposed replacement or why it cannot be replaced |
| --- | --- | --- | --- |
| `GITHUB_TOKEN` | `.github/workflows/release.yaml` (line 39) | semantic-release: git tag and GitHub release | None needed. It is short-lived. |

No long-lived tokens were found. npm publishing already uses trusted publishing (OIDC, `id-token: write`), not an `NPM_TOKEN`.

Workflows that push straight to the default branch: none. semantic-release runs with its default plugins (no `.releaserc`, no `release` key in `package.json`, no `@semantic-release/git`). It pushes a tag but no commit to `master`.

## Blockers

None.

## Questions for the owner

1. Is npm trusted publishing configured on npmjs.com for `@springtree/eva-config-picker` with this repository and `release.yaml`? The README now says it is, based on the workflow comment.
2. Should the stale Travis CI badge in the README be removed or replaced with a GitHub Actions badge?
3. Can the disabled repository ruleset "master" be deleted, since the organisation ruleset covers it?

## Still to do (steps 7 and 8, out of scope here)

Open the PR against `master`, watch the four `supply-chain / *` checks, fix findings, hand off to an admin with the token list.
