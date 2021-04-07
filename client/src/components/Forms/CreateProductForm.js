import React from "react";
import { Select } from "antd";
const { Option } = Select;
const CreateProductForm = ({
  values,
  handleSubmit,
  handleChange,
  getSubs,
  subOptions,
  subDropDown,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    categories,
    subCat,
    quantity,
    color,
  } = values;
  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
          placeholder="Price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="shipping">Shipping</label>
        <select
          name="shipping"
          id="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="">Select one</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="qty">Quantity</label>
        <input
          type="number"
          id="qty"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
      </div>
      <div className="form-group">
        <label htmlFor="clr">Color</label>
        <input
          type="text"
          id="clr"
          name="color"
          className="form-control"
          value={color}
          onChange={handleChange}
          placeholder="Color of the product"
        />
      </div>

      <div className="form-group">
        <label htmlFor="Category-list">Category</label>
        <select id="Category-list" className="form-control" onChange={getSubs}>
          <option value="">Select a Category</option>
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
      {subDropDown && (
        <div className="form-group">
          <label htmlFor="Sub-Category-list">Sub Categories</label>
          <Select
            id="Sub-Category-list"
            className="form-control"
            mode="multiple"
            value={subCat}
            onChange={(value) => setValues({ ...values, subCat: value })}
          >
            <Option value="">Select a Category</Option>
            {subOptions.length > 0 &&
              subOptions.map((s) => {
                return (
                  <Option value={s._id} key={s._id}>
                    {s.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      )}
      <button className="btn btn-outline-success btn-block mt-2">Save</button>
    </form>
  );
};

export default CreateProductForm;
