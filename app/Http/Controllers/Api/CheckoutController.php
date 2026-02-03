<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\DetailTransaksi;
use App\Models\Transactions;
use App\Models\transactions_detail;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        return DB::transaction(function () use ($request) {

            $carts = Cart::where('user_id', $request->user()->id)
                ->with('product')
                ->get();

            if ($carts->isEmpty()) {
                return response()->json(['message' => 'Cart kosong'], 400);
            }

            $total = 0;

            foreach ($carts as $cart) {
                $total += $cart->qty * $cart->product->price;
            }

            $transaction = Transactions::create([
                'user_id' => $request->user()->id,
                'total_price' => $total,
                'status' => 'pending'
            ]);

            foreach ($carts as $cart) {

                transactions_detail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $cart->product_id,
                    'qty' => $cart->qty,
                    'price' => $cart->product->price
                ]);

                Product::where('id', $cart->product_id)
                    ->decrement('stock', $cart->qty);
            }

            Cart::where('user_id', $request->user()->id)->delete();

            return $transaction;
        });
    }
}
