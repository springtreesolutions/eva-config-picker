# eva config picker ![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square) [![Build Status](https://travis-ci.com/springtreesolutions/eva-config-picker.svg?branch=master)](https://travis-ci.com/springtreesolutions/eva-config-picker)


This will be for eva projects that support switching endpoints runtime.

## Usage

The only component you will need in order to render all the required UI is the `eva-config-picker`, you will do so the following way.

```html
<eva-config-picker></eva-config-picker>
```

This component dispatches a custom event named `endPointSelect`, you can listen to this event in multiple ways.

- Plain JS
  ```javascript
  document.querySelector('eva-config-picker').addEventListener( 'endPointSelect', event => {
    console.log(event.detail); // BaseEnvironment (endpoint, type, customerName)
  })
  ```
- Angular
  ```html
  <eva-config-picker (endPointSelect)="onEndPointSelect($event"></eva-config-picker>
  ```

  ```typescript
  import { BaseEnvironment } from '@springtree/eva-config-picker';
  class Component {
    onEndPointSelect(event: CustomEvent<BaseEnvironment>) {
      console.log(event.detail); // BaseEnvironment
    }
  }
  ```

Please refer to the [stencil documentation](https://stenciljs.com/docs/overview) on how to consume web components created in this project. Also this project has a dependency on two image assets under `src/assets/images/` make sure those are bundled in your final version.

This is how to do so for angular projects

`angular.json` under `build.options.assets`
```json
{
  "glob": "**",
  "input": "node_modules/@springtree/eva-config-picker/dist/collection/assets/images",
  "output": "assets/images"
}
```

# Development

Make sure you first run the `nvm use` command as this project has an `.nvmrc` file

the `start` will run a web server pointing to `index.html` in this project.


Need help? Check out the stencil docs [here](https://stenciljs.com/docs/my-first-component).

## Naming Components

When creating new component tags, we recommend _not_ using `stencil` in the component name (ex: `<stencil-datepicker>`). This is because the generated component has little to nothing to do with Stencil; it's just a web component! Instead, use the `eva-config` prefix.

## :twisted_rightwards_arrows: Branch strategy and protection

The `master` branch is the default branch and the only long-lived branch. Other
branches are short-lived feature, chore or Dependabot branches.

The `master` branch has protection enabled against direct pushes.
All changes need to be done through a pull request. The organisation ruleset
also blocks force pushes and branch deletion, requires a linear history
(squash or rebase merges only) and requires a code-owner review.

Every pull request runs the four `supply-chain / *` checks (`secrets`,
`licences`, `code` and `quarantine`, see [Compliance](#lock-compliance)). An
admin makes them required checks for `master`. The policy files
(`.github/CODEOWNERS`, `.github/workflows/compliance.yml` and
`licence-exemptions.json`) need a review from
`@springtreesolutions/springtree-admins`, as set in `.github/CODEOWNERS`.

# :lock: Compliance

This repository is gated by SpringTree's shared supply-chain workflow
(`.github/workflows/compliance.yml`), which runs four checks on every pull
request and a full-history scan weekly:

| Gate         | Refuses                                                 |
| ------------ | ------------------------------------------------------- |
| `secrets`    | a credential committed anywhere in the scanned range    |
| `licences`   | a dependency whose licence is not on the allow-list     |
| `code`       | a code pattern the ruleset classes as a security defect |
| `quarantine` | missing or incorrect package-cooldown configuration     |

A red gate is fixed here, in this repository. What each gate does and which
inputs it takes is documented in
[`springtree-ci-workflows`](https://github.com/SpringTree/springtree-ci-workflows).

Packages younger than seven days are refused (`min-release-age` in `.npmrc`).
That window is a management decision recorded in the secure development
standard, not a local preference — raise it there first.

## :mag: Before you push

```bash
git config core.hooksPath .githooks   # once per clone
brew install gitleaks                 # once per machine
```

The hook scans the commits you are about to push and refuses the push when
gitleaks is not installed. It is feedback, not enforcement: `--no-verify` skips
it and CI does not. Skipping is break-glass.

# :up: Deploying

This project automatically publishes when pushed to master with [semantic-release](https://github.com/semantic-release/semantic-release).

The `Build and release` workflow (`.github/workflows/release.yaml`) runs on
every push to `master`, so on every merged pull request. It runs `npm ci`,
`npm run build` and then `npm run semantic-release`. semantic-release uses its
default plugins: it reads the Conventional Commit messages since the last
release to decide the next version, publishes `@springtree/eva-config-picker`
to npm, and creates the git tag and GitHub release. It does not commit back to
`master`.

The workflow uses no stored npm token. npm publishing uses npm trusted
publishing (OIDC, `id-token: write`), and the GitHub release uses the
short-lived `GITHUB_TOKEN`.
