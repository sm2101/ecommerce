import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { getProduct, productStar, getRelated } from "../Functions/products";
import ProductPage from "../components/cards/ProductPage";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserProductCard from "../components/cards/UserProductCard";
import SkeletonCard from "../components/cards/SkeletonCard";
const { TabPane } = Tabs;
const Product = ({ match }) => {
  const [product, setProduct] = useState({}),
    [star, setStar] = useState(0),
    [loading, setLoading] = useState(false),
    [related, setRelated] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        console.log(res);
        toast.success("Thanks for rating the product!");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    loadProduct();
  }, [slug]);
  useEffect(() => {
    if (product.rating && user) {
      let exist = product.rating.find((ele) => ele.postedBy == user._id);
      exist && setStar(exist.star);
    }
  }, []);
  const loadProduct = () => {
    setLoading(true);
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((r) => {
        setLoading(false);
        setRelated(r.data);
      });
    });
  };

  return (
    <div className="container-fluid m-0">
      <div className="container">
        <div className="row">
          <ProductPage
            product={product}
            star={star}
            onStarClick={onStarClick}
          />
        </div>
        <div className="row mt-3">
          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {product.description}
            </TabPane>
          </Tabs>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <hr />
            <h4>Related Products</h4>
          </div>
          {loading ? (
            <SkeletonCard count={4} />
          ) : (
            <div className="row mb-5">
              {related.length > 0 ? (
                related.map((p) => (
                  <div className="col-12 col-md-6 col-lg-3" key={p._id}>
                    <UserProductCard
                      product={p}
                      showBtn={true}
                      wishlist={true}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  No related product found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
