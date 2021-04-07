import React, { useState, useEffect } from "react";
import AdminNav from "../../Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../Functions/products";
import { getAllCategories, getCategorySubs } from "../../../Functions/category";
import { loadingAction } from "../../../Actions/loadingAction";
import CreateProdductForm from "../../Forms/CreateProductForm";
import FileUpload from "../../Forms/FileUpload";
export default function CreateProduct() {
  const [values, setValues] = useState({
      title: "",
      description: "",
      price: "",
      category: "",
      categories: [],
      subCat: [],
      shipping: "",
      quantity: "",
      images: [],
      color: "",
    }),
    [subOptions, setSubOptions] = useState([]),
    [subDropDown, setSubDropDown] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const loadCategories = () => {
    getAllCategories()
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSubs = (e) => {
    e.preventDefault();
    const catId = e.target.value;
    setValues({ ...values, subCat: [], category: catId });
    getCategorySubs(catId)
      .then((res) => {
        setSubOptions(res.data);
        setSubDropDown(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadingAction(dispatch, true);
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert("Product created");
        window.location.reload();
        loadingAction(dispatch, false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
        loadingAction(dispatch, false);
      });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-12 col-md-8">
            <h3>Create Product</h3>
            <FileUpload values={values} setValues={setValues} />
            <CreateProdductForm
              getSubs={getSubs}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={values}
              subOptions={subOptions}
              subDropDown={subDropDown}
              setValues={setValues}
            />
          </div>
        </div>
      </div>
    </>
  );
}
