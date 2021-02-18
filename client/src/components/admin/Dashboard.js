import React  from 'react';
import AdminNav from '../Nav/AdminNav';
export default function Dashboard() {

    return (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <AdminNav />
              </div>
              <div className="col-10">
                <h1>Admin Dashboard</h1>
            </div>
          </div>
          </div>
        </>
    )
}
