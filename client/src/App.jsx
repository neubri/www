import { Home } from "./pages/Home";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Login } from "./pages/Login";
import { Categories } from "./pages/Categories";
import { UpdateImage } from "./pages/UpdateImage";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import { Articles } from "./pages/Articles";
import AddStaff from "./pages/AddStaff";
import FormArticle from "./pages/FormArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Route>

        <Route path="/cms" element={<MainLayout />}>
          <Route path="" element={<Articles />} />
          <Route path="add-staff" element={<AddStaff />} />
          <Route path="add" element={<FormArticle type="add" />} />
          <Route path="edit/:id" element={<FormArticle type="edit" />} />
          <Route path="update-image/:id" element={<UpdateImage />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
