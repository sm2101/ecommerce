import React from "react";
import { Link } from "react-router-dom";
import {
  InstagramFilled,
  GithubFilled,
  LinkedinFilled,
  BehanceCircleFilled,
} from "@ant-design/icons";
const Footer = () => {
  return (
    <div className="conatiner-fluid">
      <div className="container">
        <div className="row mt-5">
          <div
            className="col-12 col-md-4 fs-5 text-center mb-3"
            id="quickLinks"
          >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">QuickLinks</li>
              <li className="list-group-item">
                <Link to="/">Home</Link>
              </li>
              <li className="list-group-item">
                <Link to="/shop">Shop</Link>
              </li>
              <li className="list-group-item">
                <Link to="/user/wishlist">Whishlist</Link>
              </li>
              <li className="list-group-item">
                <Link to="/user/history">History</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-8 text-center">
            <div className="credits">
              Image Credits:
              <br />
              Carousel Image 1 - Photo by{" "}
              <a href="https://unsplash.com/@scottwebb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Scott Webb
              </a>{" "}
              on{" "}
              <a href="/s/photos/leaves-on-white-background?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
              <br />
              Carousel Image 2 - Photo by{" "}
              <a href="https://unsplash.com/@timchowstudio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Tim Chow
              </a>{" "}
              on{" "}
              <a href="/s/photos/leaves-on-white-background?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
              <br />
              Quote Image - Photo by{" "}
              <a href="https://unsplash.com/@jplenio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Johannes Plenio
              </a>{" "}
              on{" "}
              <a href="/s/photos/green?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
            </div>
            <div className="fs-5 mt-5">
              Made by{" "}
              <a
                href="https://github.com/sm2101"
                target="_blank"
                rel="noreferrer"
              >
                Siddharth Mittal
              </a>
              , in <a href="https://reactjs.org/">React JS.</a>
              <br />
            </div>
            <div className="social-links fs-4">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    href="https://instagram.com/sm_2101?igshid=pk8cflh1n5cm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramFilled />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.behance.net/sidarthmittal"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BehanceCircleFilled />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://github.com/sm2101"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubFilled />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.linkedin.com/in/siddharth-mittal-2101"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedinFilled />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
