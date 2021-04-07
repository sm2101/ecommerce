import React, { useState, useEffect } from "react";
import AdminNav from "../../Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  removeCategory,
  getAllCategories,
} from "../../../Functions/category";
import { loadingAction } from "../../../Actions/loadingAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../Forms/CategoryForm";
import SearchForm from "../../Forms/SearchForm";
const CreateCategory = () => {
  const [name, setName] = useState(""),
    [categories, setCategories] = useState([]),
    [searchQuery, setQuery] = useState("");

  const dispatch = useDispatch();

  const loadCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const { user } = useSelector((state) => ({ ...state }));
  const handleSubmit = (e) => {
    e.preventDefault();
    loadingAction(dispatch, true);
    createCategory({ name }, user.token)
      .then((res) => {
        loadingAction(dispatch, false);
        setName("");
        toast.success("Category Added");
        loadCategories();
      })
      .catch((err) => {
        loadingAction(dispatch, false);
        console.log(err);
        toast.error("Some error occured");
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      loadingAction(dispatch, true);
      removeCategory(slug, user.token)
        .then((value) => {
          loadingAction(dispatch, false);
          toast.success("Category Deleted");
          loadCategories();
        })
        .catch((err) => {
          loadingAction(dispatch, false);
          console.log(err);
          toast.error("Category can't be deleted. Try again!");
        });
    }
  };

  const search = (searchQuery) => (c) => {
    return c.name.toLowerCase().includes(searchQuery);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-12 col-md-8 mt-3">
            <h3>Create Category</h3>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <hr />
            <SearchForm searchQuery={searchQuery} setQuery={setQuery} />
            {categories.filter(search(searchQuery)).map((c) => (
              <div className="alert alert-info" key={c._id}>
                {c.name}
                <span
                  onClick={() => handleRemove(c.slug)}
                  class="btn btn-sm float-end btn-danger mx-1"
                >
                  <DeleteOutlined />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
                  <span class="btn btn-sm float-end btn-warning mx-1">
                    <EditOutlined />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
