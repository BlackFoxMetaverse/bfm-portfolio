import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/404_notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/profile/:userName" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
