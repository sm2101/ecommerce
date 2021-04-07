import React, { useState, useEffect } from "react";
import AdminNav from "../../Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../Functions/category";
import {
  createSubCat,
  removeSubCat,
  getAllSubCat,
} from "../../../Functions/subCat";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../Forms/CategoryForm";
import SearchForm from "../../Forms/SearchForm";
export default function CreateSubCat() {
  const [name, setName] = useState(""),
    [loading, setLoading] = useState(false),
    [categories, setCategories] = useState([]),
    [subCategories, setSubCategories] = useState([]),
    [searchQuery, setQuery] = useState(""),
    [category, setCategory] = useState("");

  const loadCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadSubCats = () => {
    getAllSubCat()
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCategories();
    loadSubCats();
  }, []);

  const { user } = useSelector((state) => ({ ...state }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubCat({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success("Sub Category Created");
        loadSubCats();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Some error occured");
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSubCat(slug, user.token)
        .then((value) => {
          setLoading(false);
          toast.success(" Sub Category Deleted");
          loadSubCats();
        })
        .catch((err) => {
          setLoading(false);
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
          <div className="col">
            {loading ? <h3>Loading...</h3> : <h3>Create Sub-Category</h3>}

            <div className="form-group">
              <label htmlFor="Category-list">Parent Category</label>
              <select
                id="Category-list"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a Parent Category</option>
                {categories.length > 0 &&
                  categories.map((c) => {
                    return (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <hr />
            <SearchForm searchQuery={searchQuery} setQuery={setQuery} />
            {subCategories.filter(search(searchQuery)).map((s) => (
              <div className="alert alert-info" key={s._id}>
                {s.name}
                <span
                  onClick={() => handleRemove(s.slug)}
                  class="btn btn-sm float-end btn-danger mx-1"
                >
                  <DeleteOutlined />
                </span>
                <Link to={`/admin/sub-category/${s.slug}`}>
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
}
