import React from "react";
import NewArrivals from "../components/Landing/NewArrivals";
import BestSeller from "../components/Landing/BestSeller";
import Carosel from "../components/Landing/Carosel";
const Landing = () => {
  return (
    <>
      <div className="conatiner-fluid w-100 h-100 mb-5">
        <div className="row m-0 p-0 cara-cont">
          <Carosel />
        </div>
        <div className="container h-100 mt-5">
          <div className="row m-0 d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <BestSeller />
            </div>
          </div>
        </div>
        <div
          className="row landing-quote-cont d-flex justify-content-center align-items-center m-0"
          style={{ minHeight: "40vh" }}
        >
          <div className="col-12 col-md-6">
            <figure className="text-center landing-quote-box ">
              <blockquote className="blockquote">
                There are no gardening mistakes, only experiments.
              </blockquote>
              <figcaption class="blockquote-footer">
                <cite title="Source Title">Janet Kilburn Phillips</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="row m-0 h-100 w-100 mt-4">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 text-center">Experiment With our</div>
              <div className="text-cont col-12">
                <span>New Arrivals</span>
              </div>
            </div>
          </div>
          <div className="col-md-8 d-flex justify-content-center align-items-center">
            <NewArrivals />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
