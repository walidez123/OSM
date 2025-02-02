import React, { useState } from "react";
import { Package, Plus } from "lucide-react";
import { useOrderStore } from "../store/useOrderStore";

const OrderForm: React.FC = () => {
  const { createOrder, isCreatingOrder } = useOrderStore();

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone_number: "",
    status: "pending",
    total_price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrder({
      customer_name: formData.customer_name,
      email: formData.email,
      phone_number: formData.phone_number,
      status: formData.status,
      total_price: Number(formData.total_price),
    });

    setFormData({
      customer_name: "",
      email: "",
      phone_number: "",
      status: "pending",
      total_price: "",
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center gap-2">
          <Package className="w-6 h-6" />
          Add New Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Customer Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.customer_name}
              onChange={(e) =>
                setFormData({ ...formData, customer_name: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              className="input input-bordered"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              required
            />
          </div>

          {/* Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Order Status</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Total Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Total Price</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={formData.total_price}
              onChange={(e) =>
                setFormData({ ...formData, total_price: e.target.value })
              }
              required
            />
          </div>

         
          <button type="submit" className="btn btn-primary w-full">
            <Plus className="w-4 h-4" />
            {isCreatingOrder ? "Adding Order..." : "Add Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
