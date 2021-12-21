import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from "./views/NavBar/NavBar";
import Auth from '../hoc/auth';
import Footer from "./views/Footer/Footer";
// import { Suspense } from "react";
import MovieDetail from "./views/MovieDetail.js/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";


function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route exact path="/" element={Auth(LandingPage, null)} />
            <Route exact path="/login" element={Auth(LoginPage, false)} />
            <Route exact path="/register" element={Auth(RegisterPage, false)} />
            <Route exact path="/movie/:movieId" element={Auth(MovieDetail, null)} />
            <Route exact path="/favorite" element={Auth(FavoritePage, true)} />
          </Routes> 
        </div>
      {/* </Router> */}
      <Footer />
    </div>    
  );
}

export default App;
