import React ,{useState, useEffect} from 'react'
import {getProducts, getProductsFilter} from '../Functions/products';
import {useDispatch, useSelector} from 'react-redux';
import UserProductCard from '../components/cards/UserProductCard'
import SkeletonCard from '../components/cards/SkeletonCard'
import {Menu, Slider} from 'antd'
import {MoneyCollectTwoTone} from '@ant-design/icons'
const {SubMenu} = Menu
const Shop = () => {
    const [products, setProducts] = useState([]),
          [loading, setLoading] = useState(false),
          [price, setPrice] = useState([]);

    const {search} = useSelector((state) =>({...state}));
    const {text} = search
    useEffect(() =>{
        loadProducts();
    },[])

    // Method default
    const loadProducts = () =>{
        setLoading(true)
        getProducts(12).then(res =>{
            setProducts(res.data)
            setLoading(false)
        })
    }
    const getProductsByFilter = (txt) =>{
        getProductsFilter({query:txt}).then(res =>{
            setLoading(false)
            setProducts(res.data);
        })
    }
    useEffect(()=>{
        if(text !== ''){
        setLoading(true)
        const delayed = setTimeout(getProductsByFilter(text),400)
         return () => clearTimeout(delayed)}
    },[text])
    return (
        <div className = "container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4 className = "text-center">Filter</h4>
                    <Menu 
                    mode = "inline"
                    defaultOpenKeys = {["slider"]}
                    >
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
                                onChange = {(value) => setPrice(value)}
                                
                                 />
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9">
                {loading?(
                    <SkeletonCard count = {6}/>
                ):(<div className = "row">
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
