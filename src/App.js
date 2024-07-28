import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./views/Layout/Layout";
import FlightPage from "./views/Flights/FlightPage";
import PaymentPage from "./views/Payment/PaymentPage";
import Home from "./views/Home/LandingPage";

import "./sass/global.scss";
import Test from "./views/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="flights" element={<FlightPage />} />
          <Route path="payments" element={<PaymentPage />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
