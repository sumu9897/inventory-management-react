function InventoryTable({ items, onEdit, onDelete }) {
  if (!items.length) {
    return <p className="empty-state">No inventory items found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>{item.supplier}</td>
              <td className="actions">
                <button className="btn btn-edit" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-delete" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;