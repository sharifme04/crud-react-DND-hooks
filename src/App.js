import React, { useTransition } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./app/Dashboard";
import TodDo from "./app/TodDo";
import Home from "./app/Home";
import Navbar from "./app/components/Navbar";
import Spinner from "./app/components/Spinner";

const App = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition({ timeoutMs:30000 });

  const goToPage = (url) => {
    startTransition(() => {
      navigate(url);
    });
  };

  console.log(isPending);
  return (
    <div className="App">
      <Navbar goToPage={goToPage} />
      {isPending && <Spinner/>}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard goToPage={goToPage}/>} />
        <Route path="dashboard/todo" element={<TodDo />} />
      </Routes>
    </div>
  );
};

export default App;
