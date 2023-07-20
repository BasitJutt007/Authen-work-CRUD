// import {useState} from "react";

// import UploadButton from "./UploadButton";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignInForm from "./Components/SignInForm";
import SignUpForm from "./Components/SignUpForm";
import DashBoardPage from "./Components/DashBoardPage";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route
            path="/dashboard"
            element={
              <>
                <NavBar />
                <DashBoardPage />
              </>
            }
          />
        </Routes>
      </Router>

      {/* <UploadButton /> */}
      {/* <Navbar /> */}
      {/* <h1>Hello</h1> */}
    </>
  );
}

export default App;
