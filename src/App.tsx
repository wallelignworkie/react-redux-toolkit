import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { decrement, increment, incrementByAmount } from "./store/counterSlice";

import { useMutation } from "@tanstack/react-query";
import { dataType, loginUser } from "./api/authApi";
import { loginRequest, loginSuccess, loginFailure } from "./store/authSlice";
import { useState } from "react";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Define mutation for logging in using TanStack Query
  const mutation = useMutation({
    mutationFn: (data: dataType) => loginUser(data),
    onMutate: () => {
      dispatch(loginRequest()); // Set loading to true and clear errors
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data)); // Store user data in Redux state
    },
    onError: (error: any) => {
      dispatch(loginFailure(error?.message || "Something went wrong"));
      setErrorMessage(error?.message || "Something went wrong");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ phone, password });
  };

  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <div>Please log in to view your profile.</div>;

  const counterSelector = useSelector(
    (state: RootState) => state.counter.count
  );

  console.log({ counterSelector });

  return (
    <>
      <div>
        <h2>Welcome, {user.name}</h2>
        <p>phone: {user.email}</p>
      </div>
      <div className="text-center space-y-3">
        <h1>Counter :{counterSelector}</h1>
        <button
          className=" border bg-gray-300 rounded-md mt-2"
          type="button"
          onClick={() => dispatch(increment())}
        >
          Increment{" "}
        </button>{" "}
        <br />
        <button
          onClick={() => {
            dispatch(decrement());
          }}
          className="border bg-gray-300 rounded-md "
          type="button"
        >
          Decrement{" "}
        </button>{" "}
        <br />
        <button
          onClick={() => dispatch(incrementByAmount(3))}
          className="border bg-gray-300 rounded-md "
          type="button"
        >
          IncrementByAmount{" "}
        </button>{" "}
        <br />
      </div>

      {/* login */}
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>phone:</label>
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
