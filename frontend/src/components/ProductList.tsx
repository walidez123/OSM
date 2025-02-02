import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import EditProductModal from './EditProductModal';
import { useOrderStore } from '../store/useOrderStore';

const ProductList: React.FC = () => {
  const { orders, getOrders, isGettingOrders, deleteOrder } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const [editingOrder, setEditingOrder] = useState(null);

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
  };

  if (isGettingOrders) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.customer_name}</td>
                <td>{order.email}</td>
                <td>{order.phone_number}</td>
                <td>{order.status}</td>
                <td>${order.total_price}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-square btn-sm btn-warning"
                      onClick={() => setEditingOrder(order)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-square btn-sm btn-error"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingOrder && (
        <EditProductModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
        />
      )}
    </>
  );
};

export default ProductList;
