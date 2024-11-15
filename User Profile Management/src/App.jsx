import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./App/store";
import AllProfiles from "./Components/AllProfiles";
import ProfileDetails from "./Components/ProfileDetails";
import AdminDashboard from "./Components/AdminDashboard";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-slate-800">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<AllProfiles />} />
              <Route path="/profile/:id" element={<ProfileDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
