//this document defines routes

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; //Dashboard page location
import Customers from "./pages/Customers"; //Customers page location
import MainLayout from "./layout/MainLayout"; //Imports the layout of page from MainLayout.tsx located in layout folder in src
import Jobs from "./pages/Jobs";


// Defining a function App with Main Layout
 
  export default function App() {
  return (                          //using BrowserRouter, Routes and Routefrom react router dom
    <BrowserRouter> 
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/jobs" Component={Jobs} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}