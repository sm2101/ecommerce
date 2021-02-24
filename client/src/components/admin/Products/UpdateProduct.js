import React, {useState, useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { 
    updateProduct,
    getProduct
} from "../../../Functions/products";
import {  
    getAllCategories,
    getCategorySubs 
} from "../../../Functions/category";
// import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
// import { Link } from 'react-router-dom';
import UpdateProdductForm from '../../Forms/UpdateProductForm';
import FileUpload from '../../Forms/FileUpload';
export default function UpdateProduct({match,history}) {
    const slug = match.params.slug;
    const [loading, setLoading] = useState(""),
          [values, setValues] = useState({
              title:"",
              description:"",
              price:"",
              category:"",
              shipping:"",
              quantity:"",
              images:[],
              color:""
          }),
          [subOptions, setSubOptions] = useState([]),
          [categories, setCategories] = useState([]),
          [subCatIds, setSubCatIds] = useState([]);

    const {user} = useSelector((state) =>({...state}));

    const loadProduct = () =>{
        getProduct(slug).then(res =>{
            setValues({...values, ...res.data})
            getCategorySubs(res.data.category._id).then(s =>{
                setSubOptions(s.data)
            })
            let arr =[]
            res.data.subCat.map(s =>{
                arr.push(s._id)
            })
            setSubCatIds(prev => arr);
        }).catch(err =>{
            console.log(err);
        })
    }

    const loadCategories = () =>{
        getAllCategories().then(res =>{
            setCategories(res.data)
        }).catch(err =>{
            console.log(err)
        })
    }

    const getSubs = (e) =>{
        e.preventDefault()
        const catId = e.target.value;
        setValues({...values, subCat:[] ,category:catId});
        getCategorySubs(catId).then(res =>{
            setSubOptions(res.data)
        }).catch(err =>{
            console.log(err);
        })
        setSubCatIds([])
        }
    

    useEffect(() =>{
        loadProduct();
        loadCategories();

    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true)
        values.subCat = subCatIds;
        updateProduct(slug,values,user.token).then(res =>{
            console.log(res)
            toast.success("Product updated!");
            history.push("/admin/products")
            setLoading(false);
        }).catch(err =>{
            console.log(err);
            toast.error("Some error occured")
            setLoading(false);
        })
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setValues({...values,[e.target.name]:e.target.value})
    }
    return (
        <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <AdminNav />
            </div>
            <div className="col">
              {loading?<h3>Loading...</h3>:<h3>Update Product</h3>}
              <FileUpload 
              values = {values}
              setValues = {setValues}
              setLoading = {setLoading}
              />
             <UpdateProdductForm 
             getSubs = {getSubs} 
             handleChange = {handleChange} 
             handleSubmit = {handleSubmit} 
             values = {values} 
             categories = {categories}
             subOptions = {subOptions}
             setValues = {setValues}
             subCatIds = {subCatIds}
             setSubCatIds = {setSubCatIds}
             />
          </div>
          </div>
        </div>
      </>
    )
}
