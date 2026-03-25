function InventoryForm({
  formData,
  onChange,
  onSubmit,
  isEditing,
  onCancel,
  submitting
}) {
  return (
    <section className="card">
      <h2>{isEditing ? "Edit Item" : "Add New Item"}</h2>

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={onChange}
              placeholder="Enter category"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={onChange}
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={onChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="supplier">Supplier</label>
            <input
              id="supplier"
              name="supplier"
              type="text"
              value={formData.supplier}
              onChange={onChange}
              placeholder="Enter supplier name"
              required
            />
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Item"
              : "Add Item"}
          </button>

          {isEditing && (
            <button className="btn btn-secondary" type="button" onClick={onCancel}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default InventoryForm;