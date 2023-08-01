import Router from "next/router";
import { useState, useEffect } from "react";
import Head from "next//head";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
const switchModeHandler = () => {
  setError(null);
  setIsLoginMode((prevMode) => !prevMode);
};
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    Router.push("/");
  }
}, []);
const submitHandler = async (event) => {
  event.preventDefault();
  setIsLoading(true);
  setError(null);
  const url = isLoginMode ? "/api/login" : "/api/register";
  const payload = isLoginMode
    ? { email, password }
    : { email, password, name, age, sex };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    if (isLoginMode) {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        Router.push("/");
      }
      Router.push("/");
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setAge("");
      setSex("");
      setSuccess("Account created successfully!");
    }
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
};

return (
  <>
    <Head>
      <title>Sign In | Sign Up</title>
    </Head>
    <div className="w-full max-w-md mx-auto mt-5 px-6 py-4 shadow-md bg-white">
      <form className="space-y-4" onSubmit={submitHandler}>
        {!isLoginMode && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </>
        )}
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
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-500">{success}</p>}
      </form>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <button
        onClick={switchModeHandler}
        className="mt-3 text-blue-500 hover:underline focus:outline-none"
      >
        Switch to {isLoginMode ? "Sign Up" : "Login"}
      </button>
    </div>
  </>
);
};

export default Auth;
