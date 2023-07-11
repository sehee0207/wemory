import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import './index.css';
import styled from "styled-components";
import MainPage from "./component/page/MainPage";
import CreateCommunityPage from "./component/page/CreateCommunityPage";
import LoginPage from "./component/page/LoginPage";
import SignupPage from "./component/page/SignupPage";
import PostWritePage from "./component/page/PostWritePage";

function App() {
  return (
    <BrowserRouter>
			<Routes>
				<Route index element={<LoginPage />} />
				<Route path="signup" element={<SignupPage />} />
				<Route path="main" element={<MainPage />} />
				<Route path="main/create-community" element={<CreateCommunityPage />} />
				<Route path="main/post-write" element={<PostWritePage />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
