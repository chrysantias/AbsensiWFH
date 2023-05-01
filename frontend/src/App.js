import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AbsenList from "./components/AbsenList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={
          <Login />
        } /> */}
        <Route path="/" element={<Login />} />
        <Route path="/absen" element={<><Navbar /><Dashboard /></>} />
        <Route path="/absensi" element={<><Navbar /><AbsenList /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
