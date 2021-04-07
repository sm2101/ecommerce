import React from "react";
import { Carousel } from "antd";
const Carosel = () => {
  return (
    <Carousel autoplay autoplaySpeed={50000}>
      <div>
        <div className="carousel" id="c1">
          <div className="container h-100">
            <div className="row m-0 h-100 w-100">
              <div className="col-12 col-md-6 h-100">
                <div className="row d-flex align-items-center h-100">
                  <div className="col-12">
                    <h1 className="text-black display-3">Welcome</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Neque similique molestias sint aspernatur, amet saepe sit
                      fugiat facilis quisquam, ipsam nam magnam. Culpa autem
                      aliquam rem, hic veritatis praesentium pariatur?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="carousel" id="c2"></div>
      </div>
      {/* <div>
        <div className="carousel" id="c3">
          <h1>3</h1>
        </div>
      </div>
      <div>
        <div className="carousel" id="c4">
          <h1>4</h1>
        </div>
      </div> */}
    </Carousel>
  );
};

export default Carosel;
