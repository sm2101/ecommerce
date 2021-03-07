import React ,{useState, useEffect} from 'react'
import {getProducts, getProductsFilter} from '../Functions/products';
import {useDispatch, useSelector} from 'react-redux';
import UserProductCard from '../components/cards/UserProductCard'
import SkeletonCard from '../components/cards/SkeletonCard'
import {Menu, Slider, Checkbox} from 'antd'
import {MoneyCollectTwoTone, DownSquareOutlined, StarOutlined} from '@ant-design/icons'
import {SEARCH_QUERY} from '../Actions/types'
import {getAllCategories} from '../Functions/category'
import {getAllSubCat} from '../Functions/subCat'
import Star from '../components/Forms/Star'
const {SubMenu} = Menu
const Shop = () => {
    const [products, setProducts] = useState([]),
          [loading, setLoading] = useState(false),
          [price, setPrice] = useState([0,0]),
          [ok, setOk] = useState(false),
          [categories, setCategories] = useState([]),
          [selectedCat, setSelectedCat] = useState([]),
          [subCategories, setSubCateories] = useState([]),
          [selectedSub, setSelectedSub] = useState(""),
          [star, setStar] = useState(""),
          [shipping, setShipping] = useState("");

    const {search} = useSelector((state) =>({...state}));
    const {text} = search

    const dispatch = useDispatch();

    useEffect(() =>{
        loadProducts();
        getAllCategories().then(res =>{
            setCategories(res.data)
        })
        getAllSubCat().then(res =>{
            setSubCateories(res.data)
        })
    },[])

    // Method default
    const loadProducts = () =>{
        setLoading(true)
        getProducts(12).then(res =>{
            setProducts(res.data)
            setLoading(false)
        })
    }
    const getProductsByFilter = (arg) =>{
        getProductsFilter(arg).then(res =>{
            setProducts(res.data);
        })
        setLoading(false)
    }
    useEffect(()=>{
        setLoading(true)
        const delayed = setTimeout(() =>{
            getProductsByFilter({ query:text });
        },300);
        return () => clearTimeout(delayed);
    },[text])

    useEffect(() =>{
            setLoading(true)
            getProductsByFilter({price});
    },[ok])

    const handleSlider = (value)=>{
        setPrice(value)
        setSelectedCat([]);
        setStar("");
        setSelectedSub("");
        setShipping("");
        dispatch({
            type: SEARCH_QUERY,
            payload:{
                text:""
            }
        })
        setTimeout(()=>{
            setOk(!ok)
        },300)
    }

    const showCategories = () =>
        categories.map(c =>(
            <div key = {c._id} className = "mt-3">
                <Checkbox
                onChange = {handleCheck}
                className = "pb-2 pl-4 pr-4"
                value = {c._id}
                name = "category"
                checked = {selectedCat.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                </div>
        ));

    const handleCheck = (e) =>{
        dispatch({
            type: SEARCH_QUERY,
            payload:{text:""}
        })
        setPrice([0,0])
        setStar("");
        setSelectedSub("");
        setShipping("");

        let inTheState = [...selectedCat]
        let justChecked = e.target.value;
        let foundinState = inTheState.indexOf(justChecked);

        if(foundinState == -1){
            inTheState.push(justChecked);
        }else{
            inTheState.splice(foundinState,1);
        }
        setSelectedCat(inTheState);
        getProductsByFilter({category: inTheState})
    }

    const handleStarClick = (num) =>{
        dispatch({
            type: SEARCH_QUERY,
            payload:{text:""}
        })
        setPrice([0,0])
        setSelectedCat([])
        setSelectedSub("")
        setStar(num);
        setShipping("");
        getProductsByFilter({stars:num})
    };

    const showStars = () =>(
        <div className = "px-4 pb-2 mt-3">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    )
    const showSubs = () =>
        subCategories.map(s =>(
                <div
                key = {s._id}
                onClick = {() => handleSub(s)}
                className = "p-1 m-1 badge bg-secondary"
                style = {{cursor:"pointer"}}
                >
                    {s.name}
                </div>
        ));
    const handleSub = (sub) =>{
        setSelectedSub(sub);
        dispatch({
            type:SEARCH_QUERY,
            payload:{text:""}
        })
        setPrice([0,0])
        setSelectedCat([]);
        setStar("");
        setShipping("");
        getProductsByFilter({sub});
    }
    
    const handleShippingChange = (e) =>{
        setSelectedSub("");
        dispatch({
            type:SEARCH_QUERY,
            payload:{text:""}
        })
        setPrice([0,0])
        setSelectedCat([])
        setStar("");
        setShipping(e.target.value);
        getProductsByFilter({shipping: e.target.value});
    }

    const showShipping = () => (
        <div className = "mt-3">
        <Checkbox
        className = "pb-2 pl-4 pr-4"
        onChange = {handleShippingChange}
        value = "Yes"
        checked = {shipping === "Yes"}
        >
            Yes
        </Checkbox>
        <Checkbox
        className = "pb-2 pl-4 pr-4"
        onChange = {handleShippingChange}
        value = "No"
        checked = {shipping === "No"}
        >
            No
        </Checkbox>
        </div>
    )
    return (
        <div className = "container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4 className = "text-center">Filter</h4>
                    <Menu 
                    mode = "inline"
                    defaultOpenKeys = {["slider","category","stars","subs","shipping"]}
                    >
                        {/* price */}
                        <SubMenu 
                        key = "slider" 
                        title = "Price"
                        icon = {<MoneyCollectTwoTone />}
                        >
                            <div>
                                <Slider 
                                className = "mx-4" 
                                tipFormatter = {(v) => `Rs.${v}`}
                                range
                                max = "100000"
                                value = {price}
                                onChange = {handleSlider}
                                
                                 />
                            </div>
                        </SubMenu>
                        {/* Categoris */}
                        <SubMenu 
                        key = "category" 
                        title = "Category"
                        icon = {<DownSquareOutlined />}
                        >
                            {showCategories()};
                        </SubMenu>
                        {/* Stars */}
                        <SubMenu
                        key = "stars"
                        title = "Ratings"
                        icon = {<StarOutlined />}
                        >
                            {showStars()}
                        </SubMenu>
                        {/* subCategory */}
                        <SubMenu
                        key = "subs"
                        title = "Sub Categories"
                        icon = {<DownSquareOutlined />}
                        >
                            {showSubs()}
                        </SubMenu>
                        {/* shipping */}
                        <SubMenu
                        key  = "shipping"
                        title = "Shipping"
                        icon = {<DownSquareOutlined />}
                        >
                            {showShipping()}
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9">
                {loading?(
                    <SkeletonCard count = {6}/>
                ):(<div className = "row">
                    {products.length < 1 && <p>No products found</p>}
                    {products.map(p =>(
                        <div className = "col-12 col-md-6 col-lg-3" key = {p._id}>
                            <UserProductCard product = {p}/>
                        </div>
                    ))}
                </div>)}
                </div>
            </div>
            
        </div>
    )
}

export default Shop
