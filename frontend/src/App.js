import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import './index.css';
import styled from "styled-components";
import Modal from "react-modal";

import MainPage from "./component/page/MainPage";
import CreateCommunityPage from "./component/page/CreateCommunityPage";
import LoginPage from "./component/page/LoginPage";
import SignupPage from "./component/page/SignupPage";
import PostWritePage from "./component/page/PostWritePage";

import SignupTest from "./component/page/SignupTest"; //test

function App() {
  return (
	
	<Routes>
		<Route index element={<LoginPage />} />
		<Route path="signup" element={<SignupPage />} />
		<Route path="signuptest" element={<SignupTest />} />
		<Route path="main" element={<MainPage />} />
		<Route path="main/create-community" element={<CreateCommunityPage />} />
		<Route path="main/post-write/:date" element={<PostWritePage />} />
	</Routes>
  );
}

export default App;
