import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import NavMenu from "./components/NavMenu";
import Component from "./pages/Component";
import ExpenseDetail from "./pages/ExpenseDetail";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";
import { AxiosResponse } from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { account } from "./models/account";
import { UserContext } from "./contexts/UserContext";

function App() {
  const navigate = useNavigate();
  const [showLoginError, setShowLoginError] = useState(false);
  const [showSignupError, setshowSignupError] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const [username, setUsername] = useState<string | null>("");
  function clearTokenCookie() {
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    // Check if the token exists in the cookie
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      // Token found in the cookie, set it in the component's state
      setAuthorized(true);
    }
  }, []);

  const handleAuthentication = (e: account) => {
    //sign_in and save jwtToken
    apiClient
      .post("/api/account/sign_in", e)
      .then(({ status, data }: AxiosResponse) => {
        if (status === 200) {
          Cookies.set("jwtToken", data.token, { expires: 7 });
          Cookies.set("account_id", data.account_id, { expires: 7 });
          console.log(data.account_name);
          setUsername(data.account_name);
          //setUser(userObject);
          setAuthorized(true);
          navigate("/home");
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setShowLoginError(true);
      });
  };

  return (
    <>
      <UserContext.Provider value={{ username, setUsername }}>
        {authorized && (
          <NavMenu
            onNavigate={(path) => {
              navigate(path);
            }}
            onLogout={() => {
              clearTokenCookie();
              setAuthorized(false);
              navigate("/");
            }}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Login
                onSignup={() => navigate("/signup")}
                showLoginError={showLoginError}
                onAuthenticate={handleAuthentication}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                showError={showSignupError}
                onLogin={() => navigate("/")}
                onSignup={(e) => {
                  apiClient
                    .post("/api/account/register", e)
                    .then(({ status, data }: AxiosResponse) => {
                      if (status === 200) {
                        navigate("/");
                      }
                    })
                    .catch((err) => {
                      if (err instanceof CanceledError) return;
                      setshowSignupError(true);
                    });
                }}
              />
            }
          />
          <Route
            path="/home"
            element={
              <div>
                <br />
                <Home isAuthorized={authorized} />
              </div>
            }
          />
          <Route path="/component" element={<Component />} />

          <Route
            path="/expensedetail/:id"
            element={
              <div>
                <br />
                <ExpenseDetail />
              </div>
            }
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
