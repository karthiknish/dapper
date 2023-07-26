import Router from "next/router";
import React, { useState } from "react";
import { register, signIn } from "../util/firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchModeHandler = () => {
    setError(null); // Clear errors on mode switch
    setIsLoginMode((prevMode) => !prevMode);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (isLoginMode) {
      try {
        await signIn(email, password).then(() => Router.push("/"));
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await register(email, password);
        alert("Account created successfully!");
      } catch (error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-5 px-6 py-4 shadow-md bg-white">
      <form className="space-y-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          {isLoading ? "Processing..." : isLoginMode ? "Login" : "Sign Up"}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <button
        onClick={switchModeHandler}
        className="mt-3 text-blue-500 hover:underline focus:outline-none"
      >
        Switch to {isLoginMode ? "Sign Up" : "Login"}
      </button>
    </div>
  );
};

export default Auth;
