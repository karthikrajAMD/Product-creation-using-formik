import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="diamond-box">
        <div
          className="diamond1"
          onClick={() => {
            navigate("/product");
          }}
        ></div>
        <div
          className="diamond2"
          onClick={() => {
            navigate("/add");
          }}
        ></div>
      </div>
    </div>
  );
}

export default Home;
