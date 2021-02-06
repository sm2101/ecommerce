import React from 'react';
import {Link} from 'react-router-dom';

const AdminNav = ()=>{
   return(
    <nav>
    <ul className = "nav flex-column">
        <li className="nav-item">
            <Link to = "/admin/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/product">Create Product</Link>
        </li>
        <li className="navitem">
            <Link to = "/admin/products">All Products</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/category">Category</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/sub-category">Sub Category</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/coupons">Coupons</Link>
        </li>
    </ul>
</nav>
   )
}

export default AdminNav;