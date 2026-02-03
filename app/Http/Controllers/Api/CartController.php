<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    public function index(Request $request)
    {
        return Cart::with('product')
            ->where('user_id', $request->user()->id)
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'qty' => 'required|integer|min:1'
        ]);

        return Cart::create([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id,
            'qty' => $request->qty
        ]);
    }

    public function update(Request $request, $id)
    {
        $cart = Cart::findOrFail($id);

        $cart->update([
            'qty' => $request->qty
        ]);

        return $cart;
    }

    public function destroy($id)
    {
        Cart::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
