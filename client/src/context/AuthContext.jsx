import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  loginUser,
  signupUser,
  getCurrentUser
} from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  async function signup(name, email, password) {
    const data = await signupUser(name, email, password);

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data;
  }

  async function login(email, password) {
    const data = await loginUser(email, password);

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}