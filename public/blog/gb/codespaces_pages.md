# Publish a **Vite** website with **GitHub Codespaces** and **GitHub Pages**

## GitHub Codespaces, GitHub Pages, and Vite

**GitHub Codespaces** is a cloud development environment. You open a repository in a codespace using **Code → Codespaces** on GitHub. The browser shows the **VS Code** interface; commands in its terminal run in the codespace, not on your own computer. See [What are GitHub Codespaces?](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces).

**GitHub Pages** publishes a **static website**: files such as HTML, CSS, JavaScript, and images that have been built in advance.

Those files are served to visitors; Pages does not start a custom backend or server for your project. That is why a website for Pages must produce a static production build.

**Vite** does that for this project. `vite build` processes the app code and its files, bundles and optimizes them for the browser, and puts the production-ready output in `dist/`. It does not start a development server; it creates the files that will be published.

JavaScript can still run interactive features in the visitor's browser. See [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## 1. Set the URL path in Vite

This repository is `Dominique8D/project-react`. Its project site is hosted at:

```text
https://dominique8d.github.io/project-react/
```

In `vite.config.ts`, `base` must match the part of the site URL after `github.io`. For this repository, that is:

```ts
base: '/project-react/',
```

For your own project, replace `project-react` with your repository name. For example, a repository named `my-website` uses `base: '/my-website/'`. A user site whose URL is directly `https://<owner>.github.io/` is hosted at the domain root and uses `base: '/'`.

Vite uses `base` to build links to files such as JavaScript and CSS. If the path does not match the published URL, the browser requests files from the wrong location and may get **404 errors**. See Vite's documentation: [Public Base Path](https://vite.dev/guide/build#public-base-path).

This repository also has the following in `package.json`:

```json
"homepage": "https://dominique8d.github.io/project-react/"
```

`homepage` is **not required** to build this Vite site or publish it on GitHub Pages: Vite uses the `base` setting for asset paths, and the deploy script does not read `homepage`. It is useful metadata for people and tools that need to know the public project URL. Create React App, for example, uses `homepage` to determine a site's public URL. If your project only uses Vite, you can omit `homepage`; changing it does not change Vite's asset paths.

## 2. Save your source code on `main`

The `main` branch contains the source code. Commit and push your changes to `main` before publishing so your source code is saved on GitHub.

The deployment command below publishes only the built website to a different branch, `gh-pages`. It does not push your source code to `main`.

You can also do this through VS Code: open **Source Control** (the branch icon in the sidebar), review your changes, stage the files you want to keep, enter a commit message, and choose **Commit**. Then choose **Sync Changes** or **Push** to send the commit to GitHub. See [Using Version Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview).

## 3. Add a deploy script and run it

Under `scripts` in this project's `package.json` are these commands:

```json
"build": "vite build",
"deploy": "npm run build && npx gh-pages -d dist"
```

If your project already has a `build` script, add only `deploy`. Replace `vite build` and `dist` with your framework's build command and output folder if they are different.

From your project's root folder, run this in the Codespaces terminal:

```sh
npm run deploy
```

This runs the commands in `deploy`:

1. `npm run build` starts the `build` script; here, that runs `vite build`. Vite creates the production version and puts the output files in `dist/`.
2. `&&` means the next command runs only if the build succeeds. If the build fails, nothing is published.
3. `npx gh-pages -d dist` runs the `gh-pages` CLI. `-d dist` tells the CLI that `dist/` is the folder containing the built website. The contents of that folder are pushed to the `gh-pages` branch; the `dist/` folder is not added as an extra folder inside that branch. `npx` can run `gh-pages` without you creating an npm script for it.

In short:

```text
source on main → Vite build in dist/ → contents pushed to gh-pages → GitHub Pages
```

Run `npm run deploy` again when you want to publish later changes. In this setup, a regular push to `main` does not automatically publish the latest website.

> **Using a framework other than Vite?** Have `npm run build` run that framework's production build command, and pass the folder containing the final static files to `gh-pages -d`. For example, if that folder is `build/`, the script becomes `"deploy": "npm run build && npx gh-pages -d build"`. Set the equivalent base path too if your framework needs one.

## 4. Configure GitHub Pages to use the deployment branch

On GitHub, open **Settings → Pages** and look under **Build and deployment**.

### Source

Choose **Source** `Deploy from a branch`. This tells Pages to publish files from a Git branch.

### Branch

Choose the `gh-pages` branch. This is where `npm run deploy` pushes the built website. If `gh-pages` is not in the selector yet, first run `npm run deploy` from Codespaces. This creates and pushes the branch. Then refresh **Settings → Pages** and select `gh-pages`.

### Folder

Choose `/(root)`. `npx gh-pages -d dist` puts the contents of `dist/` directly in the root of `gh-pages`. Do not select `dist/`: that folder is not on the `gh-pages` branch.

When you publish, GitHub Pages builds the selected branch and puts the site online. The Pages workflow appears under **Actions** as **pages build and deployment**. The `gh-pages` CLI does not create a GitHub Actions workflow file; it only pushes the built files. See GitHub's documentation: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

For this repository, the site URL is `https://dominique8d.github.io/project-react/`. For your own project, the URL depends on your GitHub account and repository name.

## Common problems and checks

- **The website loads, but some files are missing.** CSS, JavaScript, or images may return **404 errors**. Check `base` in the Vite config and look at the browser console for the missing path.
- **The entire website shows an error.** If it is a **404**, check under **Settings → Pages** that the source is `gh-pages` and the folder is `/(root)`. Also check under **Actions** that **pages build and deployment** succeeded. A similar issue was fixed by selecting the correct branch as the Pages source and publishing the built files to that branch: [GitHub Community discussion #153969](https://github.com/orgs/community/discussions/153969).
- **`gh-pages` is missing from the Pages settings.** Run `npm run deploy` first to create and push the branch; then refresh the settings page.
- **The deploy command stops with an error.** First check whether the build succeeds with `npm run build`. If the error occurs while pushing, check that your codespace is connected to GitHub and has write access to the repository.
- **Your changes are on `main`, but are not visible on the website.** That is expected in this setup: pushing to `main` does not trigger a deploy. After committing and pushing, run `npm run deploy` and then check the Pages status under **Actions**.
- **The path contains `/project-react/project-react/`.** This happened earlier in this project's history: `base` was accidentally set to `/project-react/project-react/`. For this project URL, the repository name should appear only once: `/project-react/`. Check the generated asset URL in the browser console and correct `base` if the repository name is duplicated.
- **A file is fetched at runtime but returns 404 only on GitHub Pages.** Vite adjusts paths for assets processed during the build, but it does not automatically adjust URL strings that your app later requests with `fetch()`. This project first fetched blog Markdown from `/blog/...`; on Pages the repository path had to be added, giving `/project-react/blog/...`. Add your own repository name for your project. See this project's [blog-utils.ts](https://github.com/Dominique8D/project-react/blob/main/src/utils/blog/blog-utils.ts) as an example.
