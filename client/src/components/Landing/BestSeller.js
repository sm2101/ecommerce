import React, { useState, useEffect } from "react";
import { getProductsLanding, getTotalProducts } from "../../Functions/products";
import UserProductCard from "../../components/cards/UserProductCard";
import SkeletonCard from "../../components/cards/SkeletonCard";
import { Pagination } from "antd";
const BestSeller = () => {
  const [products, setProducts] = useState([]),
    [page, setPage] = useState(1),
    [count, setCount] = useState(),
    [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsLanding("sold", "desc", page, 6)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getCount = () => {
    getTotalProducts().then((res) => {
      setCount(res.data);
    });
  };
  useEffect(() => {
    loadAllProducts();
  }, [page]);
  useEffect(() => {
    getCount();
  }, []);
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-between"
          style={{ margin: "0 0 2rem 1rem", fontSize: "x-large" }}
        >
          <div className="col-12 col-md-3 badge bg-success my-1">
            Popular Products
          </div>
          <div className="col-12 col-md-3 my-1 justify-content-center">
            <Pagination
              simple
              current={page}
              total={(count / 6) * 10}
              onChange={(value) => setPage(value)}
            />
          </div>
        </div>
        {loading ? (
          <SkeletonCard count={6} />
        ) : (
          <div className="row d-flex justify-content-center">
            {products.map((p) => (
              <div className="col-12 col-sm-10 col-md-5 col-lg-4" key={p._id}>
                <UserProductCard product={p} wishlist={true} showBtn={true} />
              </div>
            ))}
          </div>
        )}
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center p-3">
            <Pagination
              current={page}
              total={(count / 5) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
