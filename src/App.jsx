import { useEffect, useState, useCallback } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()-_=+[]{}|:' ";
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, numberAllowed, characterAllowed]);

  const copyHandler = () => {
    window.navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <div className=" space-y-10 my-24  text-cyan-200">
        <h1 className=" font-semibold text-4xl">Password Generator</h1>
        <div className=" text-black ">
          <input
            type="text"
            placeholder="Password"
            readOnly
            value={password}
            className=" h-10 w-96 rounded-l-3xl p-3"
          />
          <button
            type="button"
            onClick={copyHandler}
            className="py-2.5 h-10 px-5 rounded-r-3xl me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Copy
          </button>
          <ToastContainer />
        </div>
        <div className=" space-x-4">
          <input
            id="default-range"
            type="range"
            min={6}
            max={35}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className=" h-2 bg-gray-200 text-black rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <label htmlFor="length"> Length ({length}) </label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((e) => !e)}
            name="Number"
          />
          <label htmlFor="length"> Number </label>
          <input
            type="checkbox"
            defaultChecked={characterAllowed}
            onChange={() => setCharacterAllowed((e) => !e)}
            name="Character"
          />
          <label htmlFor="length"> Character </label>
        </div>
      </div>
    </>
  );
}

export default App;
