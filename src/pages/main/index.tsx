import Main from "./layout";
import { Outlet } from "react-router-dom";
export default function Feed() {
  return (
    <Main>
      <Outlet/>
    </Main>
  );
}
