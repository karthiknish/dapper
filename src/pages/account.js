import { useState, useEffect } from "react";
import Head from "next/head";
function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem("email");

        if (!email) {
          setError("Email not found. Please login.");
          return;
        }

        const response = await fetch(`/api/login?email=${email}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  if (loading)
    return <div className="text-center mt-4 text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-4 text-red-600 text-xl">
        Error: {error}
      </div>
    );

  return (
    <>
      <Head>
        <title>Your Account</title>
      </Head>
      <div className="w-full max-w-lg mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Account Details</h2>
        {user && (
          <div>
            <div className="mb-4 flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="font-medium">Age:</span>
              <span>{user.age}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="font-medium">Sex:</span>
              <span>{user.sex}</span>
            </div>{" "}
            <div className="mb-4 flex justify-between">
              <span className="font-medium">Credits:</span>
              <span>£{user.credits}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Account;
