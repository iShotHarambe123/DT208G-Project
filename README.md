# 🎓 Universitetet - Kurskatalog

En modern webbapplikation byggd med Angular och TypeScript för att hantera kurser och ramscheman. Applikationen låter studenter söka bland kurser, filtrera och sortera dem, samt skapa och hantera personliga ramscheman.

## ✨ Funktionalitet

### 📋 Grundkrav

**🔧 Teknisk implementation:**

- ✅ Angular med TypeScript
- ✅ Komponentbaserad arkitektur med routing
- ✅ Två services: `CourseService` och `ScheduleService`
- ✅ Responsiv design för alla skärmstorlekar
- ✅ Git-versionhantering
- ✅ Publicering på Netlify

**📚 Kursfunktionalitet:**

- ✅ Sortering på kurskod, kursnamn, poäng och ämne
- ✅ Filtrering på kurskod och kursnamn (sökfunktion)
- ✅ Ämnesfiltrering via dropdown
- ✅ Lägg till kurser i ramschema
- ✅ Visar antal kurser i aktuell sökning
- ✅ Förhindrar dubbletter i ramschema

**📅 Ramschema:**

- ✅ Visa valda kurser
- ✅ Beräkna totala högskolepoäng
- ✅ Ta bort kurser från ramschema
- ✅ localStorage för persistent lagring
- ✅ Automatisk inladdning vid sidstart

### 🚀 Valfri funktionalitet (Implementerad för överbetyg)

**1. 🏠 Startsida med statistik**

- Översikt över totalt antal kurser i systemet
- Antal unika ämnesområden
- Aktuell status för användarens ramschema (antal kurser och poäng)
- Snabblänkar till huvudfunktioner

**2. 🎨 Förbättrat användargränssnitt**

- Modern, ren design med CSS-variabler för konsekvent styling
- Visuell feedback för hover-effekter och interaktioner
- Tydlig navigation med aktiv länkmarkering
- Badge-indikator som visar antal kurser i ramschema
- Responsiv grid-layout för kursvisning

**3. 💫 Förbättrad användarupplevelse**

- Bekräftelsedialoger för kritiska åtgärder (ta bort kurs, rensa ramschema)
- Visuell indikation när kurser redan finns i ramschema
- Smidig navigation mellan sektioner
- Automatisk uppdatering av alla vyer vid ändringar

## 🏗️ Teknisk arkitektur

### 🧩 Komponenter

- `App` - Huvudkomponent med navigation
- `HomeComponent` - Startsida med statistik
- `CourseListComponent` - Kurssökning och -visning
- `ScheduleComponent` - Ramschemahantering
- `NavigationComponent` - Huvudnavigation

### ⚙️ Services

- `CourseService` - Hanterar kursdata, filtrering och sortering
- `ScheduleService` - Hanterar ramschema och localStorage

### 📊 Datamodell

- `Course` interface - Definierar kursstruktur enligt JSON-specifikation

## 🌐 Deployment

Applikationen är konfigurerad för automatisk deployment på Netlify via `netlify.toml`. Vid push till huvudbranchen byggs och publiceras applikationen automatiskt.
