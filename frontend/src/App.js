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
import PostViewPage from "./component/page/PostViewPage";

function App() {
  return (
	
	<Routes>
		<Route index element={<LoginPage />} />
		<Route path="signup" element={<SignupPage />} />
		<Route path="start" element={<CreateCommunityPage />} />
		<Route path="main/:communityname" element={<MainPage />} />
		<Route path="main/create-community" element={<CreateCommunityPage />} />
		{/* <Route path="main/post-write/:date" element={<PostWritePage />} /> */}
		<Route path="main/post-view/:date" element={<PostViewPage />} />
	</Routes>
  );
}

export default App;
