import React, { useState, useEffect } from "react";
import { useOrderStore } from "../store/useOrderStore"; 
import { Package, X } from "lucide-react";

interface EditOrderModalProps {
  order: {
    id: string;
    customer_name: string;
    email: string;
    phone_number: string;
    status: string;
    total_price: number;
  } | null;
  onClose: () => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ order, onClose }) => {
  const { updateOrder } = useOrderStore(); 

  const [formData, setFormData] = useState({
    total_price: "",
    status: "pending",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        total_price: order.total_price.toString(),
        status: order.status,
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    try {
      await updateOrder(order.id, {
        total_price: Number(formData.total_price),
        status: formData.status,
      });
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title flex items-center gap-2">
              <Package className="w-6 h-6" />
              Edit Order
            </h2>
            <button onClick={onClose} className="btn btn-ghost btn-circle">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Total Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                className="input input-bordered"
                value={formData.total_price}
                onChange={(e) => setFormData({ ...formData, total_price: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Order Status</span>
              </label>
              <select
                className="select select-bordered"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <button type="button" onClick={onClose} className="btn">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;