import React from "react";
import { useLocation } from "react-router-dom";
import RefinementForm from "./RefinementForm";
import "../../sass/refinement.scss";

const Refinement = () => {
  const location = useLocation();
  const initialLocation = location.state?.location || "";

  return (
    <div className="refinement-page">
      <div className="refinement-page__container">
        <h1 className="refinement-page__title">Book your flights</h1>
        <RefinementForm initialLocation={initialLocation} />
      </div>
    </div>
  );
};

export default Refinement;