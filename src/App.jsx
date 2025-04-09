// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import HomePage from "./pages/HomePage";
// import ProfilePage from "./pages/ProfilePage";
// import SideBar from "./components/SideBar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="d-flex">
//           <SideBar />
//           <div className="flex-grow-1">
//             <Routes>
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/signup" element={<SignUpPage />} />
//               <Route path="/home" element={<HomePage />} />
//               {/* <Route
//                 path="/home"
//                 element={
//                   <ProtectedRoute>

//                   </ProtectedRoute>
//                 }
//               /> */}
//               <Route
//                 path="/profile"
//                 element={
//                   <ProtectedRoute>
//                     <ProfilePage />
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SideBar from "./components/SideBar";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ConnectionsPage from "./pages/ConnectionsPage";
import MessagesPage from "./pages/MessagesPage";

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Make sure this wraps your entire app */}
      <Router>
        <div className="d-flex">
          <SideBar />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <ProtectedRoute>
                    <UpdateProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/connections"
                element={
                  <ProtectedRoute>
                    <ConnectionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
