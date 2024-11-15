import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoPage from "./pages/noPage/NoPage";
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <div>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
