import React from "react";
import "./Reg.css";

function Reg({ username, password, handleAction, setUsername, setPassword, actionName }) {
    const formClass = actionName === "Sign Up" ? " signup-form" : " login-form";
    const linkName = actionName === "Sign Up" ? " Log in" : " Sign up";

    return (
        <div className="signup-wrapper">
            <form className={"reg-form" + formClass} onSubmit={handleAction}>
                <h2>To-Do App</h2>
                <p className="reg-form-subtitle">Start organizing your life day by day</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{actionName}</button>
                <p>Already have an account? {linkName} <button className="switch-reg">here</button>.</p>
            </form>
        </div>
    );
}

export default Reg;
