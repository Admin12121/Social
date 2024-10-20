import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Pagenotfound from "@/pages/empty/pagenotfound";
import { Toaster } from "sonner";
import Spinner from "@/components/ui/spinner";
import Feed from "@/pages/main/index"
import Login from "@/pages/auth/login";
import { PostsProvider } from "./pages/main/_components/postProvider";
import Docs from "@/pages/docs";

function App() {

  const routes = useMemo(
    () => (
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route index element={ <Feed /> } >
          </Route>
          <Route path="docs" element={<Docs/>}/>
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
    ),
    [ ]
  );

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            height: "50px",
            padding: "10px",
          },
        }}
        icons={{ loading: <Spinner /> }}
        invert={true}
        pauseWhenPageIsHidden={true}
        theme="system"
        position="top-right"
      />
      <PostsProvider>
        {routes}
      </PostsProvider>
    </>
  );
}

export default App;
