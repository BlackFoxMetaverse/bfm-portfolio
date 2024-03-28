import { HashRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/404_notfound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/profile/:userName" element={<UserProfile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
