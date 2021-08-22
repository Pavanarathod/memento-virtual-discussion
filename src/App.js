import React, { useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ClassInfo from "./pages/ClassInfo";
import Homepage from "./pages/Homepage";
import Members from "./pages/Members";
import Memo from "./pages/Memo";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Join from "./pages/Join";
import Profile from "./pages/Profile";

function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      {user ? (
        <div className="flex h-screen w-full">
          <div className="bg-[#4A154B] flex-[0.3]">
            <Sidebar />
          </div>
          <div className="flex-[0.7]">
            <Switch>
              <Route path="/join/session/id/:id" component={Join} />
              <Route path="/classInfo/:id" component={ClassInfo} />
              <Route path="/profile" component={Profile} />
              <Route path="/members/mem/:id" component={Members} />
              <Route exact path="/" component={Homepage} />
            </Switch>
          </div>
        </div>
      ) : (
        <div>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/" component={Memo} />
          </Switch>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
