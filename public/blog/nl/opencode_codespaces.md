# OpenCode gebruiken in GitHub Codespaces: setup, modellen en limieten

> **Kort samengevat:** OpenCode startte in deze Codespace en acht van de elf geteste modellen volgden een eenvoudige instructie precies. De gratis modeltoegang raakte sneller dan verwacht beperkt. Deze rooktest zegt niets over welk model het beste code schrijft.

## Wat draait waar?

**OpenCode** is een coding agent die in een terminal draait. In GitHub Codespaces draait die terminal in de Linux-ontwikkelomgeving van de Codespace. **GitHub Pages** publiceert daarentegen de statische website; het voert OpenCode of AI-modellen niet uit. Modelverzoeken gaan naar de gekozen provider, met eigen gebruiksvoorwaarden en limieten.

Zie [What are GitHub Codespaces?](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces), [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) en de informatie over [GitHub Codespaces billing](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces).

## 1. Installeer OpenCode in de Codespace

Open een terminal in je Codespace. In deze repository start je OpenCode met:

```sh
npm run opencode
```

Dit projectspecifieke commando gebruikt een bestaande OpenCode-installatie als die beschikbaar is en installeert OpenCode anders automatisch.

Voor een ander project kun je de officiële installer rechtstreeks gebruiken:

```sh
curl -fsSL https://opencode.ai/v2/install | bash
```

Open daarna een nieuwe terminal en controleer de installatie:

```sh
opencode --version
```

Ga vervolgens naar de map van je project en start OpenCode:

```sh
cd /workspaces/<jouw-project>
opencode
```

De installatie staat in de gebruikersomgeving van die Codespace. Binnen dezelfde Codespace kun je OpenCode ook vanuit een andere projectmap starten. Een aparte Codespace heeft een eigen omgeving; installeer OpenCode daar zo nodig opnieuw. Zie de [OpenCode-installatiehandleiding](https://opencode.ai/docs).

## 2. Koppel een provider en kies een model

Voer in de OpenCode-interface `/connect` uit en volg de authenticatiestappen van een provider. Kies daarna een beschikbaar model met `/models`.

```text
/connect
/models
```

Providergegevens horen niet in de repository. Deel geen API-sleutels of gevoelige projectgegevens met een provider; controleer diens privacy- en bewaarbeleid.

## 3. Kies Plan of Build

OpenCode heeft ingebouwde **Plan**- en **Build**-agenten. Plan is bedoeld om te verkennen en een aanpak te maken zonder normale projectbestanden te wijzigen. Build kan code aanpassen en commando's uitvoeren.

- Gebruik `/agents` om de agenten te bekijken.
- Gebruik `Shift+Tab` om tussen agenten te wisselen.
- Gebruik `/models` om een model te kiezen.

Voor projectregels gebruikt OpenCode een `AGENTS.md`-bestand in de projectmap. Herbruikbare werkwijzen kunnen in `.opencode/skills/<skill-id>/SKILL.md` staan; OpenCode laadt een skill wanneer die relevant is. Voor een eerste sessie zijn de ingebouwde agenten genoeg. Zie de documentatie over [Instructions](https://opencode.ai/docs/rules), [Agents](https://opencode.ai/docs/agents) en [Skills](https://opencode.ai/docs/skills).

## 4. Test welk model bij je past

Modellen verschillen per taak, prijs, snelheid en provider. Daarom is een algemene ranglijst minder betrouwbaar dan een korte persoonlijke test. Gebruik exact dezelfde opdracht voor een paar modellen en houd de uitkomst bij.

Een geschikte eerste test is een taak die je echt wilt automatiseren:

1. Vraag het model in Plan-mode om een bestaande component te analyseren en een concrete planbeschrijving te geven.
2. Vraag in Build-mode om daarna een kleine, afgebakende wijziging te maken.
3. Voer `npm test -- --run` en `npm run build` uit om het resultaat te controleren.
4. Vergelijk duidelijkheid, benodigde correcties, snelheid en gemeten verbruik.

Start met één gratis model, probeer daarna één alternatief en wijzig niet meerdere variabelen tegelijk. Zo wordt duidelijk welk model bij dit project, deze taak en de gekozen provider past.

## 5. Houd rekening met gratis gebruikslimieten

Na de rooktest kregen vervolgverzoeken met twee verschillende modellen een `429 Free usage limit reached`-fout. Wisselen naar een ander gratis model hielp op dat moment niet. De gratis toegang bleek dus **sneller op dan verwacht**. De precieze resterende quota is niet zichtbaar gemaakt; uit deze ene sessie valt geen vast aantal verzoeken af te leiden.

OpenCode kan lokaal geregistreerd gebruik tonen:

```sh
opencode stats --days 0 --models --cost
```

Deze statistieken tonen gebruik en geregistreerde kosten van de lokale OpenCode-sessies, maar geen resterende gratis providerquota. In deze sessie rapporteerde het commando `$0.00`; dat is geen garantie dat andere providers gratis zijn.

Een vervolgtest met een kleine codewijziging kon door de providerlimiet niet worden uitgevoerd. Een eerdere README-editproef was bovendien geen geldige vergelijking, omdat de gevraagde tekst al in de testkopie stond. Er is daarom **geen betrouwbare conclusie over codekwaliteit of een beste model**.

## Wat je uit deze test kunt meenemen

De test laat zien dat OpenCode in deze Codespace kon starten, dat verschillende modellen een eenvoudige prompt konden beantwoorden en dat de gratis provider een limiet kan bereiken. Zij vergelijkt de modellen niet op een echte programmeertaak.

GitHub Pages telt geen OpenCode-modelverzoeken mee. Houd de limieten en kosten van Codespaces en de gekozen AI-provider apart in de gaten. Controleer actuele providerinformatie in de [OpenCode providerdocumentatie](https://opencode.ai/docs/providers).
