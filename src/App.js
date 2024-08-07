import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout/Layout";
import FlightPage from "./views/Flights/FlightPage";
import PaymentPage from "./views/Payment/PaymentPage";
import Home from "./views/Home/LandingPage";
import Refinement from "./views/Refinement/Refinement";
import HotelPage from "./views/Hotels/HotelPage";
import TransportPage from "./views/Transport/TransportPage";
import "./sass/global.scss";
import { CartContextProvider } from "./contexts/cartContext";
import ConfirmationPage from "./views/Confirmation/ConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="refinement" element={<Refinement />} />
            <Route path="flights" element={<FlightPage />} />
            <Route path="hotels" element={<HotelPage />} />
            <Route path="transport" element={<TransportPage />} />
            <Route path="payments" element={<PaymentPage />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
          </Route>
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
