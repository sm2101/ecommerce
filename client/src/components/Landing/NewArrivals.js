import React, { useState, useEffect } from "react";
import { getProductsLanding, getTotalProducts } from "../../Functions/products";
import UserProductCard from "../../components/cards/UserProductCard";
import SkeletonCard from "../../components/cards/SkeletonCard";
import { Pagination } from "antd";
const NewArrivals = () => {
  const [products, setProducts] = useState([]),
    [page, setPage] = useState(1),
    [count, setCount] = useState(),
    [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsLanding("createdAt", "desc", page, 4)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
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
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center p-3">
            <Pagination
              simple
              current={page}
              total={(count / 4) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </div>
        {loading ? (
          <SkeletonCard count={6} />
        ) : (
          <div className="row d-flex justify-content-center">
            {products.map((p) => (
              <div className="col-12 col-sm-10 col-md-3" key={p._id}>
                <UserProductCard product={p} wishlist={true} showBtn={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewArrivals;
