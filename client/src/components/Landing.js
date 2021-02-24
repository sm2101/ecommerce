import React from 'react'
import NewArrivals from '../components/Landing/NewArrivals'
import BestSeller from '../components/Landing/BestSeller'
const Landing = () => {
    return (
        <>
            <div className = "conatiner-fluid w-100 jumbotron">
                <div className = "row m-0 d-flex justify-content-center align-items-center">
                    <h1 className = "text-center">NEW ARRIVALS</h1>
                </div>
                <NewArrivals />
                <div className = "row m-0 d-flex justify-content-center align-items-center">
                    <h1 className = "text-center">BEST SELLER</h1>
                </div>
                <BestSeller />
            </div>
            {/* <div className = "conatiner-fluid w-100 jumbotron">
            </div> */}
        </>
    )
}

export default Landing

