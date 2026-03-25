import { useEffect, useState } from "react";
import Header from "./components/Header";
import MessageBox from "./components/MessageBox";
import InventoryForm from "./components/InventoryForm";
import InventoryTable from "./components/InventoryTable";
import LoadingSpinner from "./components/LoadingSpinner";

const API_URL = "https://inventory-management-api-sage.vercel.app/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch items");
      }

      setItems(result.data || []);
    } catch (error) {
      showMessage(error.message || "Failed to load items", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      quantity: "",
      price: "",
      supplier: ""
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      supplier: formData.supplier.trim()
    };

    if (!payload.name || !payload.category || !payload.supplier) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    if (payload.quantity < 0 || payload.price < 0) {
      showMessage("Quantity and price must be non-negative.", "error");
      return;
    }

    setSubmitting(true);

    try {
      let response;
      if (editId) {
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Request failed");
      }

      showMessage(
        editId ? "Item updated successfully." : "Item added successfully.",
        "success"
      );

      resetForm();
      fetchItems();
    } catch (error) {
      showMessage(error.message || "Something went wrong.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      supplier: item.supplier
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete item");
      }

      showMessage("Item deleted successfully.", "success");
      fetchItems();
    } catch (error) {
      showMessage(error.message || "Delete failed", "error");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header />

        <MessageBox message={message.text} type={message.type} />

        <InventoryForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditing={!!editId}
          onCancel={resetForm}
          submitting={submitting}
        />

        <section className="card">
          <div className="section-header">
            <h2>All Inventory Items</h2>
            <button className="btn btn-refresh" onClick={fetchItems}>
              Refresh
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <InventoryTable
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;