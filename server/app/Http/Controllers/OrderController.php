<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class OrderController extends Controller
{
    
    public function index()
    {
        try {
            $orders = Order::all();
            return response()->json($orders, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch orders', 'message' => $e->getMessage()], 500);
        }
    }

   
    public function store(Request $request)
    {
        try {
            $request->validate([
                'customer_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone_number' => 'required|string|max:20',
                'status' => 'required|in:pending,processing,completed,cancelled',
                'total_price' => 'required|numeric|min:0',
            ]);

            $existingOrder = Order::where('email', $request->email)
                ->where('status', $request->status)
                ->first();

            if ($existingOrder) {
                return response()->json(['error' => 'An order with this email and status already exists'], 409);
            }

            $order = Order::create([
                'customer_name' => $request->customer_name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'status' => $request->status,
                'total_price' => $request->total_price,
            ]);

            return response()->json($order, 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation failed', 'messages' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create order', 'message' => $e->getMessage()], 500);
        }
    }

    
    public function show($id)
    {
        try {
            $order = Order::findOrFail($id);
            return response()->json($order, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Order not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to retrieve order', 'message' => $e->getMessage()], 500);
        }
    }

    
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'sometimes|in:pending,processing,completed,cancelled',
                'total_price' => 'sometimes|numeric|min:0',
            ]);

            $order = Order::findOrFail($id);
            $order->update($request->only(['status', 'total_price']));

            return response()->json($order, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Order not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation failed', 'messages' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update order', 'message' => $e->getMessage()], 500);
        }
    }

    
    public function destroy($id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->delete();

            return response()->json(['message' => 'Order deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Order not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete order', 'message' => $e->getMessage()], 500);
        }
    }
}
