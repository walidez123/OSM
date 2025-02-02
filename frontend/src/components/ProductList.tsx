import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import EditProductModal from './EditProductModal';
import { useOrderStore } from '../store/useOrderStore';
import ConfirmationModal from './ConfirmationPopup';

const ProductList: React.FC = () => {
  const { orders, getOrders, isGettingOrders, deleteOrder, pagination } = useOrderStore();
  const [editingOrder, setEditingOrder] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [searchCustomerName, setSearchCustomerName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    getOrders(searchCustomerName, searchStatus, currentPage, perPage);
  }, [getOrders, searchCustomerName, searchStatus, currentPage, perPage]);

  const handleDelete = async () => {
    if (orderToDelete) {
      await deleteOrder(orderToDelete);
      setDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const openDeleteConfirmation = (orderId: string) => {
    setOrderToDelete(orderId);
    setDeleteModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCustomerName(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchStatus(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'processing':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  if (isGettingOrders) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Search by customer name"
          value={searchCustomerName}
          onChange={handleSearchChange}
        />
        <select
          className="select select-bordered"
          value={searchStatus}
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          className="select select-bordered"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

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
                <td className={` rounded `}>
                  <p className={`${getStatusColor(order.status)} p-2 rounded-md`}>{order.status}</p>
                </td>
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
                      onClick={() => openDeleteConfirmation(order.id)}
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

      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {pagination?.last_page || 1}
        </span>
        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === (pagination?.last_page || 1)}
        >
          Next
        </button>
      </div>

      {editingOrder && (
        <EditProductModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this order?"
      />
    </>
  );
};

export default ProductList;