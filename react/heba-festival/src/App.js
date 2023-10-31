import { useLocation } from "react-router-dom";
import { useEffect, React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckIn } from "pages/CheckIn";
import { Landing } from "pages/Landing";
import Home from "pages/Home";
import { Error } from "pages/Error";
import { Enter } from "pages/Enter";
import Admin from "pages/Admin";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
          <Routes>
            <Route path="/checkin" element={< CheckIn />} />
            <Route path="/landing" element={< Landing />} />
            <Route path="/home" element={< Home />} />
            <Route path="/admin" element={< Admin />} />
	    <Route path="/enter/:token/:reset?" element={ < Enter /> } />
            {/* TODO : 에러페이지 루트를 일단 알 수 없는 경로이면 뜨게 해놨는데 다른 로직이 있을까요? */}
            <Route path="/*" element={< Error />} />
          </Routes>
      </Router>
    </div>
  )
}
export default App;
