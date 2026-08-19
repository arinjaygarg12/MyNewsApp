import NavBar from "./components/NavBar";
import "./App.css";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from "react";
import News from "./components/news";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(){
  const ApiKey = "c7c690a9aa4a45d2aadba0b10fa7d492";

  
  let [searchquery, setSearchQuery] = useState("");
  let [progress, setProgress] = useState(0);
  const setProgres = (progress) => {
    setProgress(progress);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };


    return (
      <div>
        <Router>
          <NavBar onSearch={handleSearch} />
          <LoadingBar
            color="#f11946"
            progress={progress}
            // loaderSpeed={1000}
            // transitionTime={1200}
          />
          <Routes>
            <Route
              exact
              path="/MyNewsApp"
              element={
                <News setProgress = {setProgres}
                  key="general"
                  pagesize={6}
                  country={"us"}
                  category={"general"}
                  searchQuery={searchquery}
                  ApiKey={ApiKey}
                />
              }
            />
            <Route
              exact
              path="/MyNewsApp/business"
              element={
                <News setProgress = {setProgres}
                  key="business"
                  pagesize={6}
                  country={"us"}
                  category={"business"}
                  searchQuery={searchquery}
                  ApiKey={ApiKey}
                />
              }
            />
            <Route
              exact
              path="/MyNewsApp/general"
              element={
                <News setProgress = {setProgres}
                  key="general"
                  pagesize={6}
                  country={"us"}
                  category={"general"}
                  searchQuery={searchquery} 
                  ApiKey={ApiKey}
                />
              }
            />
            <Route
              exact
              path="/MyNewsApp/entertainment"
              element={
                <News setProgress = {setProgres}
                  key="entertainment"
                  pagesize={6}
                  country={"us"}
                  category={"entertainment"}
                  searchQuery={searchquery} 
                  ApiKey={ApiKey}
                />
              }
            />
            <Route
              exact
              path="/MyNewsApp/health"
              element={
                <News setProgress = {setProgres}
                  key="health"
                  pagesize={6}
                  country={"us"}
                  category={"health"}
                  searchQuery={searchquery} 
                  ApiKey={ApiKey}
                />
              }
            />
            <Route
              exact
              path="/MyNewsApp/science"
              element={
                <News setProgress = {setProgres}
                  key="science"
                  pagesize={6}
                  country={"us"}
                  category={"science"}
                  searchQuery={searchquery} 
                  ApiKey={ApiKey}
                />
              }
            />
            <Route
              exact
              path="/MyNewsApp/sports"
              element={
                <News setProgress = {setProgres}
                  key="sports"
                  pagesize={6}
                  country={"us"}
                  category={"sports"}
                  searchQuery={searchquery} 
                  ApiKey={ApiKey}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
}

export default App;