# Een **Vite**-website publiceren met **GitHub Codespaces** en **GitHub Pages**

## GitHub Codespaces, GitHub Pages en Vite

**GitHub Codespaces** is een cloudontwikkelomgeving. Je opent een repository in een Codespace via **Code → Codespaces** op GitHub. De browser toont de **VS Code**-interface; commando's in de terminal worden uitgevoerd in de Codespace, niet op je eigen computer. Zie [What are GitHub Codespaces?](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces).

**GitHub Pages** publiceert een **statische website**: vooraf gebouwde bestanden zoals HTML, CSS, JavaScript en afbeeldingen.

Die bestanden worden aan bezoekers geserveerd; Pages start geen eigen backend of server voor je project. Daarom moet een website voor Pages een statische productieversie kunnen opleveren.

**Vite** doet dat voor dit project. `vite build` verwerkt de app-code en bijbehorende bestanden, bundelt en optimaliseert ze voor gebruik in de browser en zet de publicatieklare uitvoer in `dist/`. Dit start dus geen ontwikkelserver; het maakt de bestanden die straks worden gepubliceerd.

JavaScript kan op de website nog steeds interactieve functies uitvoeren in de browser. Zie [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## 1. Stel het URL-pad in Vite in

Deze repository is `Dominique8D/project-react`. De projectwebsite staat daarom op:

```text
https://dominique8d.github.io/project-react/
```

In `vite.config.ts` moet `base` overeenkomen met het pad van de site na `github.io`. Voor deze repository is dat:

```ts
base: '/project-react/',
```

Voor je eigen project vervang je `project-react` door de naam van je repository. Een repository met de naam `mijn-website` gebruikt bijvoorbeeld `base: '/mijn-website/'`. Een gebruikerswebsite waarvan de URL direct `https://<owner>.github.io/` is, staat op het domein zelf en gebruikt `base: '/'`.

Vite gebruikt `base` om links naar bestanden zoals JavaScript en CSS te bouwen. Als het pad niet overeenkomt met de gepubliceerde URL, vraagt de browser bestanden op de verkeerde plek op en kunnen die **404-fouten** geven. Zie Vite's documentatie: [Public Base Path](https://vite.dev/guide/build#public-base-path).

In deze repository staat in `package.json` ook:

```json
"homepage": "https://dominique8d.github.io/project-react/"
```

`homepage` is **niet nodig** om deze Vite-site te bouwen of op GitHub Pages te publiceren: Vite gebruikt de instelling `base` voor assetpaden, en het deployscript leest `homepage` niet. De waarde is wel nuttige metadata voor mensen en tools die de publieke project-URL willen weten. Create React App gebruikt `homepage` bijvoorbeeld om de openbare URL van een website te bepalen. Als je project alleen Vite gebruikt, kun je `homepage` weglaten; aanpassen ervan verandert de Vite-assetpaden niet.

## 2. Bewaar je broncode op `main`

De branch `main` bevat de broncode. Commit en push je wijzigingen naar `main` voordat je publiceert, zodat je broncode in GitHub is opgeslagen.

Je kunt dit via VS Code doen: open **Source Control** (het vertakkings-icoon in de zijbalk), bekijk de wijzigingen, stage de bestanden die je wilt bewaren, voer een commitbericht in en kies **Commit**. Kies daarna **Sync Changes** of **Push** om de commit naar GitHub te sturen. Zie [Using Version Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview).

De deployopdracht hieronder publiceert alleen de gebouwde website naar een andere branch, `gh-pages`. Hij pusht je broncode niet naar `main`.

## 3. Voeg een deployscript toe en voer het uit

In `package.json` onder `scripts` staan in dit project deze opdrachten:

```json
"build": "vite build",
"deploy": "npm run build && npx gh-pages -d dist"
```

Als je project al een `build`-script heeft, voeg dan alleen `deploy` toe. Vervang `vite build` en `dist` door het buildcommando en de uitvoermap van je framework als die anders zijn.

Voer vanuit de hoofdmap van je project in de Codespaces-terminal uit:

```sh
npm run deploy
```

Dit voert de opdrachten in `deploy` uit:

1. `npm run build` start het `build`-script; hier voert dat `vite build` uit. Vite maakt de productieversie en zet de uitvoerbestanden in `dist/`.
2. `&&` betekent dat het commando erna alleen wordt uitgevoerd wanneer de build is geslaagd. Bij een mislukte build wordt er dus niet gepubliceerd.
3. `npx gh-pages -d dist` voert de `gh-pages`-CLI uit. `-d dist` vertelt die CLI dat `dist/` de map met de gebouwde website is. De inhoud van die map wordt naar de branch `gh-pages` gepusht; de map `dist/` komt niet als extra map in die branch te staan. `npx` kan `gh-pages` uitvoeren zonder dat je er zelf een npm-script voor maakt.

In het kort:

```text
broncode op main → Vite-build in dist/ → inhoud naar branch gh-pages → GitHub Pages
```

Voer `npm run deploy` opnieuw uit nadat je wijzigingen wilt publiceren. Een gewone push naar `main` publiceert in deze setup niet automatisch de nieuwste website.

> **Gebruik je een ander framework dan Vite?** Laat `npm run build` het productiecommando van dat framework uitvoeren en geef aan `gh-pages -d` de map door waarin dat commando de uiteindelijke statische bestanden opslaat. Bijvoorbeeld: als die map `build/` heet, wordt het script `"deploy": "npm run build && npx gh-pages -d build"`. Stel ook het equivalente basispad in als je framework dat nodig heeft.

## 4. Stel GitHub Pages in op de deploybranch

Open op GitHub **Settings → Pages** en kijk onder **Build and deployment**.

### Source

Kies **Source** `Deploy from a branch`. Daarmee vertel je Pages dat het gepubliceerde bestand uit een Git-branch moet komen.

### Branch

Kies branch `gh-pages`. Dit is de branch waar `npm run deploy` de gebouwde website naartoe pusht. Als `gh-pages` nog niet in de keuzelijst staat, voer dan eerst `npm run deploy` uit vanuit Codespaces. Dat maakt en pusht de branch. Ververs daarna **Settings → Pages** en selecteer `gh-pages`.

### Folder

Kies `/(root)`. `npx gh-pages -d dist` zet de inhoud van `dist/` direct in de hoofdmap van `gh-pages`. Kies dus niet `dist/`: die map staat niet op de `gh-pages`-branch.

Wanneer je publiceert, bouwt GitHub Pages de gekozen branch en zet de site online. De Pages-workflow is zichtbaar onder **Actions** als **pages build and deployment**. De `gh-pages`-CLI maakt zelf geen GitHub Actions-workflowbestand aan; die pusht alleen de gebouwde bestanden. Zie GitHub's documentatie: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Voor deze repository is de site-URL `https://dominique8d.github.io/project-react/`. Voor je eigen project is de URL afhankelijk van je GitHub-account en repositorynaam.

## Veelvoorkomende problemen en controles

- **De website laadt, maar CSS, JavaScript of afbeeldingen geven 404.** Controleer `base` in de Vite-configuratie: voor een projectwebsite moet het overeenkomen met de repositorynaam, zoals `/project-react/` in dit project. Een verkeerd `base`-pad kan voorkomen dat de browser de bestanden vindt. Zie ook [Vite's documentatie over het public base path](https://vite.dev/guide/build#public-base-path).
- **De website laadt, maar sommige bestanden ontbreken.** CSS, JavaScript of afbeeldingen kunnen **404-fouten** geven. Controleer `base` in de Vite-configuratie en kijk in de browserconsole naar het pad dat niet gevonden wordt.
- **De hele website geeft een foutmelding.** Als het een **404** is, controleer dan in **Settings → Pages** of de bron `gh-pages` en de map `/(root)` zijn. Controleer ook onder **Actions** of **pages build and deployment** is geslaagd. Een vergelijkbare fout werd opgelost door de juiste branch als Pages-bron te kiezen en de gebouwde bestanden naar die branch te publiceren: [GitHub Community discussion #153969](https://github.com/orgs/community/discussions/153969).
- **`gh-pages` verschijnt niet in de Pages-instellingen.** Voer eerst `npm run deploy` uit zodat de branch wordt aangemaakt en naar GitHub gepusht; ververs daarna de instellingenpagina.
- **De deployopdracht stopt met een fout.** Controleer eerst of de build slaagt met `npm run build`. Als de fout bij het pushen optreedt, controleer dan of je Codespace met GitHub is verbonden en schrijfrechten heeft voor de repository.
- **Je wijzigingen staan op `main`, maar zijn niet zichtbaar op de website.** Dat is in deze setup normaal: een push naar `main` triggert geen deploy. Voer na het committen en pushen `npm run deploy` uit en controleer daarna de Pages-status onder **Actions**.
- **Het pad bevat `/project-react/project-react/`.** Dit is eerder in de geschiedenis van dit project gebeurd: `base` stond toen per ongeluk op `/project-react/project-react/`. Voor deze project-URL hoort de repositorynaam er maar één keer in te staan: `/project-react/`. Controleer de gegenereerde asset-URL in de browserconsole en pas `base` aan als de repositorynaam dubbel voorkomt.
- **Een bestand wordt met `fetch()` opgehaald, maar geeft alleen op GitHub Pages 404.** Vite past paden aan van assets die tijdens de build worden verwerkt, maar niet automatisch van URL-strings die je app later met `fetch()` opvraagt. Dit project haalde blog-Markdown eerst op vanaf `/blog/...`; op Pages moest het repositorypad ervoor, dus `/project-react/blog/...`. Voeg voor je eigen project de eigen repositorynaam toe. Bekijk de [blog-utils.ts van dit project](https://github.com/Dominique8D/project-react/blob/main/src/utils/blog/blog-utils.ts) als voorbeeld.
