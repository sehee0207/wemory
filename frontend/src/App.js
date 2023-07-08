import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
//import logo from './logo.svg';

// practice
//import AddTutorial from "./components/add-tutorial.component";
//import Tutorial from "./components/tutorial.component";
//import TutorialsList from "./components/tutorials-list.component";

// wemory
import MainPage from "./components/page/MainPage";
import CreateCommunityPage from "./components/page/CreateCommunityPage";
import LoginPage from "./components/page/LoginPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="create-community" element={<CreateCommunityPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;