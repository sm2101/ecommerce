import React, { useEffect, useState } from "react";
import AdminNav from "../../Nav/AdminNav";
import { getProducts, removeProduct } from "../../../Functions/products";
import ProductCard from "../../cards/ProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function AllProducts() {
  const [products, setProducts] = useState([]),
    [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const loadAllProduct = () => {
    getProducts(10)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    setLoading(true);
    loadAllProduct();
  }, []);

  const handleRemove = (slug) => {
    let ans = window.confirm("Delete?");
    if (ans) {
      removeProduct(slug, user.token)
        .then((res) => {
          toast.success("Product deleted");
          loadAllProduct();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Product cant't be delted");
        });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-10">
            <div className="row my-3">
              {loading ? <h3>Loading...</h3> : <h3>All Products</h3>}
              {products.map((product) => (
                <div
                  key={product._id}
                  className="col-12 col-md-4 col-lg-3 pb-2"
                >
                  <ProductCard product={product} handleRemove={handleRemove} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
