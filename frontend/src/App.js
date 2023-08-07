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
import InviteCommunityPage from "./component/page/InviteCommunityPage";
import PostViewPage from "./component/page/PostViewPage";
import FirstPage from "./component/page/FirstPage";

function App() {
  return (
	
	<Routes>
		<Route index element={<FirstPage />} />
		<Route path="login" element={<LoginPage />} />
		<Route path="signup" element={<SignupPage />} />
		<Route path="start" element={<CreateCommunityPage />} />
		<Route path="main/:communityid" element={<MainPage />} />
		<Route path="main/:communityid/invite" element={<InviteCommunityPage />} />
		<Route path="main/create-community" element={<CreateCommunityPage />} />
	</Routes>
  );
}

export default App;
