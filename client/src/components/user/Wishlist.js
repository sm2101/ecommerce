/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getWishlist, updateWishlisht } from "../../Functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SkeletonCard from "../../components/cards/SkeletonCard";
import UserProductCard from "../../components/cards/UserProductCard";
import { toast } from "react-toastify";
const Wishlist = () => {
  const [list, setList] = useState([]),
    [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const loadWishlist = () => {
    getWishlist(user.token)
      .then((res) => {
        setList(res.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  const handleRemove = (productId) => {
    updateWishlisht(productId, user.token).then((res) => {
      if (res.data.ok) {
        loadWishlist();
        toast.success("Item removed from your wishlist");
      }
    });
  };
  useEffect(() => {
    setLoading(true);
    loadWishlist();
  }, []);
  return (
    <div className="container-fluid m-0 p-5">
      <div className="container">
        <div className="row text-center">
          <h1>
            <span className="badge bg-info">Your Wishlist</span>
          </h1>
        </div>
        <div className="row">
          <div className="col-12">
            {loading ? (
              <SkeletonCard count={6} />
            ) : (
              <div className="row">
                {list.map((p) => (
                  <div className="col-12 col-md-6 col-lg-3" key={p._id}>
                    <UserProductCard
                      product={p}
                      wishlist={false}
                      showBtn={true}
                    />
                    <span
                      className="btn btn-danger btn-block mt-2"
                      onClick={() => handleRemove(p._id)}
                    >
                      {" "}
                      Remove
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
