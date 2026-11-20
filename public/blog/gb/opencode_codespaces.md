# Using OpenCode in GitHub Codespaces: setup, models, and limits

> **In short:** OpenCode started in this Codespace, and eight of the eleven tested models followed a simple instruction exactly. Free model access reached its limit sooner than expected. This smoke test does not show which model is best at coding.

## What runs where?

**OpenCode** is a coding agent that runs in a terminal. In GitHub Codespaces, that terminal runs in the Codespace's Linux development environment. **GitHub Pages**, by contrast, publishes the static website; it does not run OpenCode or AI models. Model requests go to the selected provider, with its own terms and limits.

See [What are GitHub Codespaces?](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces), [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), and [GitHub Codespaces billing](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces).

## 1. Install OpenCode in the Codespace

Open a terminal in your Codespace. In this repository, start OpenCode with:

```sh
npm run opencode
```

This project-specific command uses an existing OpenCode installation if available and otherwise installs OpenCode automatically.

For another project, you can use the official installer directly:

```sh
curl -fsSL https://opencode.ai/v2/install | bash
```

Open a new terminal and verify the installation:

```sh
opencode --version
```

Then go to your project directory and start OpenCode:

```sh
cd /workspaces/<your-project>
opencode
```

The installation is in that Codespace's user environment. Within the same Codespace, you can also start OpenCode from another project directory. A separate Codespace has its own environment; install OpenCode there if needed. See the [OpenCode installation guide](https://opencode.ai/docs).

## 2. Connect a provider and choose a model

In the OpenCode interface, run `/connect` and follow a provider's authentication steps. Then choose an available model with `/models`.

```text
/connect
/models
```

Do not put provider credentials in the repository. Do not send API keys or sensitive project data to a provider; check its privacy and data-retention policies.

## 3. Choose Plan or Build

OpenCode has built-in **Plan** and **Build** agents. Plan is for exploring and making a plan without changing normal project files. Build can edit code and run commands.

- Use `/agents` to see the available agents.
- Use `Shift+Tab` to cycle between agents.
- Use `/models` to choose a model.

OpenCode reads project instructions from an `AGENTS.md` file in the project directory. Reusable workflows can go in `.opencode/skills/<skill-id>/SKILL.md`; OpenCode loads a skill when relevant. The built-in agents are enough for a first session. See the documentation for [Instructions](https://opencode.ai/docs/rules), [Agents](https://opencode.ai/docs/agents), and [Skills](https://opencode.ai/docs/skills).

## 4. Test which model fits you

Models differ by task, price, speed, and provider. A general ranking is therefore less reliable than a short personal test. Use the exact same task for a few models and record the outcome.

A suitable first test is a task you want to automate:

1. Ask the model in Plan mode to analyze an existing component and produce a concrete implementation plan.
2. Ask it in Build mode to make one small, clearly defined change.
3. Run `npm test -- --run` and `npm run build` to verify the result.
4. Compare clarity, required corrections, speed, and measured usage.

Start with one free model, then try one alternative without changing multiple variables at once. This will show which model fits this project, this task, and the selected provider.

## 5. Expect free usage limits

After the smoke test, follow-up requests with two different models received a `429 Free usage limit reached` error. Switching to another free model did not help at that point. Free access ran out **sooner than expected**. The remaining quota was not shown; this single session does not establish a fixed request allowance.

OpenCode can show locally recorded usage:

```sh
opencode stats --days 0 --models --cost
```

These statistics show usage and recorded costs for local OpenCode sessions, but not the remaining free provider quota. In this session the command reported `$0.00`; this does not guarantee that other providers are free.

A follow-up test involving a small code change could not run because of the provider limit. An earlier README-edit attempt was also not a valid comparison because the requested text was already in the test copy. Therefore, there is **no reliable conclusion about coding quality or a best model**.

## What this test shows

The test shows that OpenCode could start in this Codespace, that several models could answer a simple prompt, and that the free provider can reach a usage limit. It does not compare models on a real coding task.

GitHub Pages does not count OpenCode model requests. Track Codespaces usage and the selected AI provider's limits and costs separately. Check current provider details in the [OpenCode provider documentation](https://opencode.ai/docs/providers).
