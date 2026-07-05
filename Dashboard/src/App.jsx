import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Component/UserLayout/Layout";
import Dashboard from "./Component/Common/Dashboard";
import AddPost from "./Component/Common/Addpost";
import DisplayPost from "./Component/Common/DisplayPost";
import Users from "./Component/Common/Users";
import UserPosts from "./Pages/UserPosts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserPosts />} />
          <Route path="display-post" element={<DisplayPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;