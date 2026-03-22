import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { ProjectsPage } from "./components/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "projects", Component: ProjectsPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "project/:slug", Component: CaseStudyPage },
    ],
  },
]);