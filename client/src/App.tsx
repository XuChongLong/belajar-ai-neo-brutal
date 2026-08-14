// Style reminder: Paper Playground — the app shell keeps every route in the same tactile workbook world.

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LearningProvider } from "./contexts/LearningContext";
import AppShell from "./components/AppShell";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import MaterialDetail from "./pages/MaterialDetail";
import Progress from "./pages/Progress";
import About from "./pages/About";
import Review from "./pages/Review";
import Glossary from "./pages/Glossary";
import Flashcards from "./pages/Flashcards";
import StudyFiles from "./pages/StudyFiles";
import Profile from "./pages/Profile";
import NpcPets from "./pages/NpcPets";
import PrdMaker from "./pages/PrdMaker";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/materi"} component={Materials} />
      <Route path={"/materi/:id"} component={MaterialDetail} />
      <Route path={"/progress"} component={Progress} />
      <Route path={"/review"} component={Review} />
      <Route path={"/glosarium"} component={Glossary} />
      <Route path={"/flashcards"} component={Flashcards} />
      <Route path={"/files"} component={StudyFiles} />
      <Route path={"/profil"} component={Profile} />
      <Route path={"/npc"} component={NpcPets} />
      <Route path={"/prd-maker"} component={PrdMaker} />
      <Route path={"/tentang"} component={About} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <LearningProvider>
            <Toaster position="bottom-right" />
            <AppShell><Router /></AppShell>
          </LearningProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
