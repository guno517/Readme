import React,{useState, useEffect} from 'react';
import { HashRouter, Route} from "react-router-dom";
import Header from './pages/Header';
import Footer from './pages/Footer';

import Content from './pages/Content';

function App() {
  return (
    <div className="App">
      <HashRouter>
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
      </HashRouter>
    </div>
  );
}

export default App;
