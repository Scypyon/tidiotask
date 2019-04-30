import React, { useState, useEffect } from "react";
import "./App.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function App({ availableUsers }) {
  const [user, setUser] = useState({});
  const [access, setAccess] = useState(
    JSON.parse(localStorage.getItem("UserAccess"))
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Todos")) === null)
      localStorage.setItem("Todos", JSON.stringify(["Dodaj Swoje Taski !"]));
  }, []);

  const checkUser = () => {
    if (
      availableUsers.every(
        value => value.login !== user.login || value.password !== user.password
      )
    )
      alert("Zły login lub hasło");
    else setAccess(true);
  };

  if (access) {
    localStorage.setItem("UserAccess", JSON.stringify(access));
    return <Redirect to="/todo" />;
  }

  return (
    <div className="loginPanel">
      <input
        placeholder="Login"
        type="text"
        onChange={e => setUser({ ...user, login: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={checkUser}>Sing In</button>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    availableUsers: state
  };
};
export default connect(mapStateToProps)(App);
