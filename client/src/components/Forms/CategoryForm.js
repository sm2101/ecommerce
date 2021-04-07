import React from "react";

export default function CategoryForm({ handleSubmit, name, setName }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="w-100">
        <div className="form-group">
          <label htmlFor="name">Name the Category</label>
          <input
            type="text"
            className="form-control my-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="btn btn-primary btn-block">Save</button>
        </div>
      </form>
    </>
  );
}
