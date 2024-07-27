import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./views/Layout/Layout";
import FlightPage from "./views/Flights/FlightPage";
import PaymentPage from "./views/Payment/PaymentPage";

import "./sass/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="flights" element={<FlightPage />} />
          <Route path="payments" element={<PaymentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
