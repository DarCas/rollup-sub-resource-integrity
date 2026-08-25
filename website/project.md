# Landing Page — Rollup Subresource Integrity

## Obiettivo

Realizzare una single-page landing professionale, moderna e altamente curata per il progetto open-source:

**Rollup Subresource Integrity**

Repository:

https://github.com/DarCas/rollup-sub-resource-integrity

Dominio previsto:

https://sri.darcas.app

La landing deve presentare il progetto come un tool open-source serio e production-ready per sviluppatori che utilizzano Rollup.

L'obiettivo principale è far capire in pochi secondi:

1. Cos'è Rollup Subresource Integrity.
2. Quale problema risolve.
3. Come funziona.
4. Quanto è semplice integrarlo.
5. Come installarlo.
6. Dove trovare il codice.
7. Perché utilizzare SRI.
8. Come iniziare immediatamente.

La pagina deve avere un forte focus tecnico, ma risultare estremamente curata dal punto di vista visuale.

Non deve sembrare una landing SaaS generica.

Deve sembrare il sito ufficiale di un progetto open-source moderno e autorevole.

---

# Principi di design

## Direzione estetica

Utilizzare un'estetica:

- developer-focused
- premium
- minimal
- tecnologica
- moderna
- professionale
- leggermente futuristica
- orientata a security/infrastructure/build tooling

Ispirazione generale:

- Vercel
- Stripe
- Linear
- GitHub
- Cloudflare
- modern developer tooling

NON copiare direttamente nessuno di questi design.

Creare una propria identità visiva.

---

# Tema

Utilizzare principalmente un tema dark.

Background principale:

quasi nero / charcoal.

Esempio concettuale:

#0A0A0B

Non utilizzare un nero assoluto ovunque.

Utilizzare leggere variazioni cromatiche per creare profondità.

Palette:

- background principale: quasi nero
- surface: grigio molto scuro
- border: grigio tenue
- testo principale: quasi bianco
- testo secondario: grigio freddo
- accent: verde/ciano/blue security-oriented

L'accent color deve essere utilizzato con moderazione.

Non trasformare la pagina in una pagina "neon cyberpunk".

L'estetica deve rimanere professionale.

---

# Typography

Utilizzare una combinazione di:

- font sans-serif moderno per il testo
- font monospace per codice, CLI e dettagli tecnici

Possibili font:

- Inter
- Geist
- IBM Plex Sans
- JetBrains Mono
- Geist Mono

Preferenza:

Inter/Geist per UI e testo.

JetBrains Mono/Geist Mono per codice.

La gerarchia tipografica deve essere molto evidente.

---

# Layout generale

La pagina deve essere responsive.

Breakpoints indicativi:

- mobile: < 640px
- tablet: 640px - 1024px
- desktop: > 1024px
- large desktop: > 1440px

La larghezza massima del contenuto deve essere circa:

1200-1280px.

Utilizzare molto spazio negativo.

Non comprimere le sezioni.

La pagina deve respirare.

---

# Navbar

Creare una navbar sticky/fixed nella parte superiore.

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│  ◈ Rollup SRI       Features  How it works  Docs  GitHub   │
│                                      [Get Started]          │
└─────────────────────────────────────────────────────────────┘
```

Logo:

utilizzare una rappresentazione grafica minimale associata al concetto:

Rollup + Security + Integrity.

Nome:

**Rollup SRI**

oppure:

**Rollup Subresource Integrity**

La navbar deve essere trasparente/glass-like inizialmente.

Durante lo scroll può diventare leggermente più opaca.

Link:

- Features
- How it works
- Usage
- GitHub

CTA:

**Get Started**

che porta alla sezione installazione.

Link GitHub:

https://github.com/DarCas/rollup-sub-resource-integrity

Su mobile utilizzare hamburger menu.

---

# HERO

Il Hero è la sezione più importante della pagina.

Deve occupare circa 85-100vh su desktop.

Layout centrato.

Struttura:

```text
                 SECURITY / BUILD TOOLING

        Subresource Integrity
        for Rollup.

        Automatically generate integrity hashes
        for your production assets.

        [ Get Started ]  [ View on GitHub ]

              ┌────────────────────────────┐
              │ npm install ...            │
              └────────────────────────────┘

        ─────────────────────────────────────

          build → hash → integrity → secure
```

## Hero headline

Utilizzare:

# Subresource Integrity for Rollup.

Seconda riga eventualmente:

**Automatically generate integrity hashes for your assets.**

Il titolo deve essere molto grande.

Desktop:

font-size indicativo:

64-80px.

Mobile:

42-52px.

Line-height stretto.

---

# Hero description

Copy:

> Automatically generate Subresource Integrity hashes for assets produced by your Rollup build.

Il testo deve essere breve.

Non creare un enorme paragrafo.

---

# Hero CTA

Due pulsanti:

Primary:

**Get Started**

Secondary:

**View on GitHub**

Il secondo deve aprire:

https://github.com/DarCas/rollup-sub-resource-integrity

---

# Hero visual

Sotto il testo inserire un elemento visuale tecnico.

Non utilizzare una semplice immagine stock.

Creare una rappresentazione visuale di una pipeline:

```text
Rollup
   │
   ▼
Build
   │
   ▼
Asset
   │
   ▼
SHA-384
   │
   ▼
Integrity
   │
   ▼
Secure Resource
```

Questa pipeline può essere rappresentata con:

- linee sottili
- nodi
- piccoli indicatori
- glow molto discreto
- animazioni leggere

L'animazione deve essere elegante.

Ad esempio un piccolo punto luminoso che attraversa la pipeline.

Non utilizzare animazioni aggressive.

---

# Install snippet

Nel Hero o immediatamente sotto il Hero mostrare:

```bash
npm install rollup-sub-resource-integrity
```

Con pulsante copy.

Il pulsante deve:

1. copiare il comando
2. mostrare feedback visivo
3. cambiare temporaneamente in "Copied"

---

# SECTION — The problem

Titolo:

## Your assets deserve integrity verification.

Spiegare brevemente il problema.

Concetto:

Quando il browser carica una risorsa esterna, SRI permette di verificare che il contenuto ricevuto corrisponda esattamente a quello previsto.

Il problema è che generare e mantenere manualmente gli integrity hash durante una build può essere scomodo e fragile.

Rollup Subresource Integrity automatizza questo passaggio.

Layout:

sinistra:

testo.

destra:

visualizzazione before/after.

---

## Before

Mostrare un esempio concettuale:

```html
<script src="/assets/app.js"></script>
```

oppure:

```html
<script
  src="/assets/app.js"
>
</script>
```

Indicatore:

`NO INTEGRITY`

---

## After

Mostrare:

```html
<script
  src="/assets/app.js"
  integrity="sha384-..."
  crossorigin="anonymous"
>
</script>
```

Indicatore:

`INTEGRITY VERIFIED`

La differenza deve essere immediatamente comprensibile.

---

# SECTION — What is SRI?

Titolo:

## What is Subresource Integrity?

Spiegazione semplice e tecnica.

Copy concettuale:

> Subresource Integrity (SRI) is a web security feature that allows browsers to verify that fetched resources have not been unexpectedly modified.

Spiegare:

- hash crittografico
- verifica del contenuto
- protezione contro modifiche inattese
- integrità degli asset

Non trasformare questa sezione in un articolo.

Massimo 2-3 paragrafi.

Inserire un link alla documentazione MDN relativa a SRI.

Link:

https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity

---

# SECTION — How it works

Titolo:

## From build to integrity.

Mostrare il funzionamento in 4 step.

Layout desktop:

```text
01
Rollup builds your assets

        ↓

02
The plugin calculates a cryptographic hash

        ↓

03
The generated HTML receives the integrity attribute

        ↓

04
The browser verifies the resource
```

Le quattro fasi devono essere visualizzate come una timeline orizzontale desktop.

Su mobile:

timeline verticale.

---

## Step 01

### Build

Rollup genera normalmente gli asset.

---

## Step 02

### Hash

Il plugin calcola automaticamente l'hash crittografico dell'asset.

---

## Step 03

### Inject

L'attributo `integrity` viene aggiunto dove necessario.

---

## Step 04

### Verify

Il browser può verificare l'integrità della risorsa.

---

# SECTION — Before / After

Titolo:

## Zero manual hash management.

Questa deve essere una delle sezioni visualmente più forti.

Mostrare due blocchi di codice.

### Without Rollup SRI

```html
<script src="/assets/index-abc123.js"></script>
```

### With Rollup SRI

```html
<script
  src="/assets/index-abc123.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

Aggiungere un'animazione o una transizione che evidenzi l'aggiunta dell'integrity hash.

---

# SECTION — Features

Titolo:

## Built for modern Rollup builds.

Creare una griglia di feature.

Non utilizzare 10-15 feature.

Utilizzare 6 feature principali.

## Feature 01

### Automatic hashing

Generate cryptographic hashes automatically during the build.

## Feature 02

### Rollup-native

Designed specifically to integrate into the Rollup build pipeline.

## Feature 03

### Zero manual maintenance

No need to manually calculate or update hashes when assets change.

## Feature 04

### Production ready

Designed to work as part of your normal production build process.

## Feature 05

### Security focused

Uses Subresource Integrity to help browsers detect unexpected asset modifications.

## Feature 06

### Minimal configuration

Keep your build configuration clean and focused.

---

# Feature visual style

Ogni feature deve avere:

- piccola icona lineare
- titolo
- descrizione
- eventuale micro-interazione

Non usare emoji.

Utilizzare icone SVG.

Le card non devono sembrare pesanti.

Preferire:

border sottile

background quasi trasparente

hover leggermente luminoso

---

# SECTION — Usage

Questa è una sezione fondamentale.

Titolo:

## Add it to your Rollup build.

Mostrare un esempio reale.

Esempio concettuale:

```js
import { rollup } from "rollup";
import subresourceIntegrity from "rollup-sub-resource-integrity";

export default {
  plugins: [
    subresourceIntegrity()
  ]
};
```

Il codice deve essere visualizzato con syntax highlighting.

Aggiungere pulsante:

**Copy**

---

## Install

Mostrare:

```bash
npm install rollup-sub-resource-integrity
```

oppure, se il package supporta altri package manager, mostrare tab:

```text
npm
pnpm
yarn
```

con relativi comandi.

Verificare prima nel package.json del progetto quali package manager/versioni sono effettivamente appropriati.

Non inventare API.

---

# SECTION — Generated output

Titolo:

## Your build. With integrity built in.

Mostrare il risultato prodotto dalla build.

Esempio:

```html
<script
  src="/assets/app-C8k92x.js"
  integrity="sha384-V9..."
  crossorigin="anonymous"
></script>
```

A fianco:

```text
✓ Asset generated
✓ Hash calculated
✓ Integrity attribute added
✓ Browser-ready
```

Utilizzare una piccola animazione di check.

---

# SECTION — Developer experience

Titolo:

## Security without the ceremony.

Copy:

> Add integrity verification to your build without introducing another complex workflow.

Mostrare una comparazione:

```text
Manual workflow

Build
  ↓
Find assets
  ↓
Calculate hashes
  ↓
Update HTML
  ↓
Keep hashes synchronized
```

vs

```text
Rollup SRI

Build
  ↓
Done
```

Questa sezione deve essere molto visuale.

Il messaggio:

**The plugin removes repetitive security-related build work.**

---

# SECTION — Compatibility

Titolo:

## Fits into your existing Rollup workflow.

Mostrare che il plugin è pensato per integrarsi nel normale ecosistema Rollup.

Se il repository/documentazione conferma compatibilità specifiche, mostrarle.

Esempi possibili:

- Rollup
- JavaScript
- TypeScript
- Vite

ATTENZIONE:

Non dichiarare compatibilità con Vite, framework o versioni specifiche se non sono effettivamente supportate dal progetto.

Prima dell'implementazione leggere:

- package.json
- README.md
- source
- eventuale documentation

e usare solo funzionalità realmente esistenti.

---

# SECTION — Security

Titolo:

## Integrity you can verify.

Questa sezione deve dare autorevolezza al progetto.

Spiegare che SRI consente al browser di confrontare il contenuto scaricato con un hash atteso.

Visualizzare:

```text
Expected resource
       │
       ▼
SHA-384 hash
       │
       ▼
Downloaded resource
       │
       ▼
Browser verification
       │
   ┌───┴───┐
   ▼       ▼
 MATCH   MISMATCH
   │       │
   ✓       ✕
```

La visualizzazione deve essere minimale.

---

# SECTION — Open Source

Titolo:

## Open source. Built for the ecosystem.

Il progetto deve essere presentato come open-source.

Mostrare:

- GitHub repository
- stars, se disponibili dinamicamente
- npm version, se disponibile
- license, se disponibile

Non hardcodare informazioni che possono cambiare.

Se non è possibile recuperarle dinamicamente, mostrare solo informazioni certe.

CTA:

**View on GitHub**

URL:

https://github.com/DarCas/rollup-sub-resource-integrity

---

# SECTION — GitHub CTA

Creare una sezione ampia e visivamente forte.

Background leggermente differente dal resto della pagina.

Titolo:

## Ready to add integrity to your build?

Testo:

> Install Rollup Subresource Integrity and let your build handle the hashes for you.

Pulsanti:

**Get Started**

**View on GitHub**

---

# FINAL CTA

Prima del footer inserire un'ultima CTA minimale.

```text
rollup-sub-resource-integrity

Automated Subresource Integrity for Rollup.

[ npm install ... ] [ GitHub ]
```

---

# Footer

Footer minimale.

Layout:

```text
Rollup SRI

Open source tooling for secure web builds.

GitHub
npm
Documentation

────────────────────────────────────────

© DarCas
```

Link:

GitHub:

https://github.com/DarCas/rollup-sub-resource-integrity

Homepage:

https://sri.darcas.app

Inserire eventualmente:

**Made by DarCas**

con link:

https://casertano.name

---

# Animazioni

Le animazioni devono essere molto curate.

NON usare:

- animazioni continue pesanti
- elementi che rimbalzano
- effetti troppo colorati
- parallax aggressivo
- testo che lampeggia
- glitch effects

Utilizzare invece:

### Scroll reveal

Le sezioni entrano gradualmente durante lo scroll.

Esempio:

opacity:

0 → 1

translateY:

20px → 0

Durata:

400-700ms.

### Hover

I pulsanti devono avere:

- leggero cambio luminosità
- transform minimo
- transition 150-250ms

Le card possono avere:

- border highlight
- background leggermente più chiaro

### Code blocks

Quando l'utente passa sopra un blocco codice:

- mostrare il pulsante Copy
- eventuale highlight molto leggero

### Hero animation

La pipeline del Hero deve avere una micro-animazione.

Un piccolo punto può muoversi:

```text
Rollup ───●──── Build ───── Asset ───── Hash ───── Integrity
```

Loop molto lento.

L'animazione deve essere quasi impercettibile.

---

# Background

Il background può avere una texture estremamente discreta.

Possibili elementi:

- radial gradients molto leggeri
- grid tecnica quasi invisibile
- noise texture
- piccoli punti

Non utilizzare un background troppo complesso.

Il contenuto deve rimanere dominante.

---

# Visual language

Utilizzare come metafora visuale:

```text
Build
   ↓
Hash
   ↓
Integrity
   ↓
Verification
```

Questa pipeline deve diventare il linguaggio grafico ricorrente della pagina.

Linee sottili.

Nodi.

Hash.

Check.

Security.

Build artifacts.

Questo rende il design coerente con il prodotto.

---

# Responsive

Mobile first.

Su mobile:

Navbar:

```text
[Logo]                       [☰]
```

Hero:

titolo centrato.

Pipeline:

verticale oppure semplificata.

Le griglie diventano una singola colonna.

I code block devono avere:

- horizontal scrolling
- font-size leggibile
- padding adeguato

Non permettere overflow orizzontale della pagina.

---

# Accessibility

La landing deve essere accessibile.

Obbligatorio:

- semantic HTML
- heading hierarchy corretta
- aria-label dove necessario
- focus state visibili
- keyboard navigation
- contrasto sufficiente
- reduced motion support

Implementare:

```css
@media (prefers-reduced-motion: reduce) {
  ...
}
```

Disabilitare o ridurre le animazioni quando richiesto dal sistema.

---

# SEO

Implementare metadata completi.

Title:

```text
Rollup Subresource Integrity — Automated SRI for Rollup
```

Description:

```text
Automatically generate Subresource Integrity hashes for assets produced by your Rollup build.
```

Open Graph:

```text
og:title
og:description
og:url
og:type
og:image
```

Twitter/X card:

```text
summary_large_image
```

Canonical URL:

```text
https://sri.darcas.app
```

Creare anche:

```text
robots.txt
sitemap.xml
```

quando appropriato.

---

# Favicon

Creare una favicon coerente con il brand.

Idea:

un simbolo che combina:

- hash
- check
- shield
- build artifact

Non utilizzare semplicemente il logo di Rollup.

Il progetto deve avere una propria identità.

---

# Performance

La landing deve essere estremamente veloce.

Obiettivo:

Lighthouse:

- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Evitare dipendenze inutili.

Non utilizzare librerie di animazione pesanti se non necessarie.

Preferire:

- CSS
- Web Animations API
- IntersectionObserver

per animazioni semplici.

Ottimizzare immagini e asset.

---

# Technical stack

Utilizzare lo stack già presente nel progetto se esiste.

Se la landing non esiste ancora:

Preferenza:

- React
- Vite
- TypeScript

CSS:

preferibilmente CSS moderno oppure il sistema già utilizzato nel repository.

Non introdurre Tailwind, shadcn, MUI o altre UI library senza una motivazione concreta.

La landing deve avere un design custom.

---

# Architecture

Organizzare il codice in componenti.

Struttura indicativa:

```text
src/
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── InstallCommand
│   ├── Problem
│   ├── WhatIsSRI
│   ├── HowItWorks
│   ├── BeforeAfter
│   ├── Features
│   ├── Usage
│   ├── GeneratedOutput
│   ├── DeveloperExperience
│   ├── Compatibility
│   ├── Security
│   ├── OpenSource
│   ├── CTA
│   └── Footer
│
├── sections/
├── assets/
├── styles/
└── App.tsx
```

Non creare componenti inutilmente piccoli.

La struttura deve rimanere facile da mantenere.

---

# GitHub Pages

La landing deve essere deployabile tramite GitHub Pages.

Dominio:

```text
https://sri.darcas.app
```

Utilizzare GitHub Actions per il deployment.

Il workflow deve:

1. checkout repository
2. installare Node.js
3. installare dipendenze
4. eseguire build
5. pubblicare `dist/` su GitHub Pages

Non richiedere alcun backend.

---

# Custom domain

Configurare GitHub Pages per:

```text
sri.darcas.app
```

Creare/configurare il file:

```text
CNAME
```

con:

```text
sri.darcas.app
```

Il deploy non deve dipendere da una VPS.

---

# Content rules

IMPORTANTE.

Prima di scrivere il copy definitivo:

Leggere attentamente il repository:

```text
README.md
package.json
src/
```

e qualsiasi documentazione disponibile.

Non inventare:

- API
- opzioni
- feature
- compatibilità
- versioni
- statistiche
- performance
- supporto browser
- integrazioni
- package manager
- configurazioni

Il contenuto della landing deve riflettere esclusivamente le funzionalità realmente implementate.

Se il README dice qualcosa di diverso dalle ipotesi contenute in questo documento, prevale il codice reale del progetto.

---

# Tone of voice

Il copy deve essere:

- tecnico
- sicuro
- sintetico
- autorevole
- diretto

Evitare:

- marketing aggressivo
- "revolutionary"
- "game changing"
- "next generation"
- "the ultimate"
- buzzword inutili

Non vendere il progetto.

Mostrare perché è utile.

---

# Important visual rule

La pagina NON deve essere una sequenza di:

```text
Titolo
Card
Card
Card
Card
Titolo
Card
Titolo
Card
```

Alternare invece:

- testo
- codice
- diagrammi
- whitespace
- timeline
- visualizzazioni tecniche
- confronti
- micro-interazioni

La pagina deve avere un ritmo visivo.

---

# Desired page flow

La sequenza finale deve essere:

```text
NAVBAR
   ↓
HERO
   ↓
INSTALL COMMAND
   ↓
PROBLEM
   ↓
WHAT IS SRI
   ↓
HOW IT WORKS
   ↓
BEFORE / AFTER
   ↓
FEATURES
   ↓
USAGE
   ↓
GENERATED OUTPUT
   ↓
DEVELOPER EXPERIENCE
   ↓
COMPATIBILITY
   ↓
SECURITY
   ↓
OPEN SOURCE
   ↓
FINAL CTA
   ↓
FOOTER
```

---

# Emotional goal

Quando uno sviluppatore arriva sulla pagina deve pensare:

> "Ok, ho capito immediatamente cosa fa."

Poi:

> "È esattamente il problema che voglio risolvere."

Poi:

> "L'integrazione sembra semplicissima."

Infine:

> "Lo installo."

Il percorso cognitivo deve essere:

```text
Understand
   ↓
Trust
   ↓
See it working
   ↓
Install
```

---

# Final quality bar

La landing deve sembrare un prodotto open-source reale, non una demo generata automaticamente.

Prestare particolare attenzione a:

- spacing
- typography
- code blocks
- responsive design
- micro-interactions
- visual hierarchy
- consistency
- accessibility
- performance

Ogni elemento deve avere una ragione.

Preferire meno elementi, ma estremamente curati.

La qualità percepita deve essere alta anche senza immagini fotografiche.

Il risultato finale deve poter essere pubblicato direttamente su:

https://sri.darcas.app

---

# Core visual concept

Il vero "hero visual" dovrebbe essere una rappresentazione tecnica della build pipeline:

```text
        ROLLUP BUILD

           ↓

    ┌──────────────┐
    │  app.js       │
    │  SHA-384      │
    └──────┬───────┘
           │
           ▼
    integrity="sha384..."
           │
           ▼
       ✓ VERIFIED
```

Questo elemento deve diventare il principale elemento distintivo della pagina.

È preferibile a immagini decorative perché comunica immediatamente la funzione del prodotto.
