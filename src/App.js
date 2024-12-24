
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ReviewList from "./pages/ReviewList";
import ReviewForm from "./pages/ReviewForm";
import UpdateReviewForm from "./pages/UpdateReviewForm";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ReviewList />} />
          <Route exact path="/addreview" element={<ReviewForm />} />
          <Route exact path="/updatereview/:id" element={<UpdateReviewForm />} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
