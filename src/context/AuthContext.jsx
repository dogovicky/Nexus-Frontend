// import React, { createContext, useContext, useReducer, useEffect } from "react";

// // Initial state
// const initialState = {
//   isAuthenticated: false,
//   username: null,
//   token: null,
// };

// // Reducer
// function authReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         isAuthenticated: true,
//         username: action.payload.username,
//         token: action.payload.token,
//       };
//     case "LOGOUT":
//       return {
//         isAuthenticated: false,
//         username: null,
//         token: null,
//       };
//     default:
//       return state;
//   }
// }

// // Create context
// const AuthContext = createContext();

// // Auth Provider
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const username = localStorage.getItem("username");
//     if (token && username) {
//       dispatch({ type: "LOGIN", payload: { token, username } });
//     }
//   }, []);

//   const login = (token, username) => {
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("username", username);
//     dispatch({ type: "LOGIN", payload: { token, username } });
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("username");
//     dispatch({ type: "LOGOUT" });
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook
// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On initial load, check if there's a token and username in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem("authToken", token); // Save token
    localStorage.setItem("username", username); // Save username
    setUser({ token, username }); // Set user state
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
