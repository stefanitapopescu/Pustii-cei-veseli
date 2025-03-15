import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("/login", {
        // Datorită proxy-ului, se face request la backend-ul de pe portul 5000
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setLoggedIn(true);
        setUser(data.user);
        setMessage("Login successful!");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Platforma de Voluntariat și Propuneri</h1>
        {!loggedIn ? (
          <form onSubmit={handleLogin}>
            <div>
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <p>Bine ai venit, {user.username}!</p>
            <p>Ai {user.points} puncte acumulate.</p>
            {/* Poți adăuga aici și alte componente sau navigații */}
          </div>
        )}
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
