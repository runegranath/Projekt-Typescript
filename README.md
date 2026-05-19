# Studentportal - Projektuniversitetet
Detta är en Single Page Application (SPA) byggd med **Angular**. Applikationen är utformad för att hjälpa studenter att navigera genom ett stort utbud av kurser, filtrera och sortera dem i realtid, samt ge möjlighet att sammanställa ett skräddarsytt, personligt ramschema med automatisk poängberäkning.

Länk till publicerat projekt: [Projekt](https://projekt-typescript.onrender.com/kurser)

---

## Funktioner

* **Asynkron dataladdning:** Kursdata hämtas asynkront från en lokal JSON-fil i `public/`-katalogen med hjälp av Angulars `HttpClient`.
* **Reaktiv filtrering & sökning:** Sökning på fritext (kursnamn/kod) samt filtrering på specifika ämnen sker reaktivt i realtid via **Angular Signals** (`computed`).
* **Blixtsnabb sortering:** Sortering av kurser baserat på namn, kurskod, ämne eller poäng (hanterar svenska tecken via `localeCompare`).
* **Ramschema:** Valda kurser sparas i webbläsarens `localStorage` och behålls även om sidan laddas om.
* **Validering & Dubblettkoll:** Systemet validerar automatiskt och förhindrar att samma kurs läggs till flera gånger.

---

## Extra funktioner för överbetyg

* **Ternary operator:** Operator som hanterar grammatikändring för det visade antalet kurser 
* **Extra undersida:** 404-sida för ogiltiga URLs
* **Användarfeedback:** Ersatt traditionella popups med moderna animationer från **Angular Material Snackbar** vid tillägg och borttagning.

---

## Teknisk stack

* **Ramverk:** Angular (Version 17+)
* **Logik & Arkitektur:** TypeScript, Angular Signals, Services, Custom Interfaces
* **Design & UI:** SCSS (inkapslad styling), Angular Material (knappar, ikoner, snackbars)
* **Routing:** Angular Router 


---

##  Kom igång lokalt

Följ dessa steg för att köra projektet på din egen dator:

### 1. Klona repot
```bash
git clone <URL-TILL-DITT-GIT-REPO>
cd universitet-projekt