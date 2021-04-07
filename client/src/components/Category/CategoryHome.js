import React, { useState, useEffect } from "react";
import { getCategory } from "../../Functions/category";
import UserProductCard from "../cards/UserProductCard";
import SkeletonCard from "../cards/SkeletonCard";
const CategoryHome = ({ match }) => {
  const [products, setProducts] = useState([]),
    [category, setCategory] = useState({}),
    [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((cat) => {
      setLoading(false);
      setCategory(cat.data.category);
      setProducts(cat.data.products);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <h4>{category}</h4>
        </div>
        {loading ? (
          <SkeletonCard count={6} />
        ) : (
          <div className="row">
            {products.map((p) => (
              <div className="col-12 col-md-6 col-lg-3" key={p._id}>
                <UserProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryHome;
