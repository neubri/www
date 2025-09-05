import { useState } from "react";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LandingPage } from "./pages/LandingPage";
import { ArticlePage } from "./pages/ArticlePage";
import { Login } from "./components/Login";
// import { Dashboard } from "./src/pages/ArticlesCMS";
import { Categories } from "./components/Categories";
import { UpdateImage } from "./components/UpdateImage";
import { Register } from "./components/Register";

function App() {
  let content = null;
  const [page, setPage] = useState("LandingPage");

  if (page === "LandingPage") {
    content = <LandingPage />;
  } else if (page === "ArticlePage") {
    content = <ArticlePage />;
  } else if (page === "Login") {
    content = <Login />;
  }else if (page === "Dashboard"){
    content = <Dashboard />
  }else if (page === "Categories"){
    content = <Categories />
  }else if (page === "UpdateImage"){
    content = <UpdateImage />
  }else if (page === "Register"){
    content = <Register />
  }
  // }else if (currentPage === "AddArticle"){
  //   content = <AddArticle setCurrentPage={currentPage}/>
  // }

  return (
    <>
      <Navbar setPage={setPage} />
      {content}
      <Footer />
    </>
  );
}

export default App;
