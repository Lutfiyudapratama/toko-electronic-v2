<?php

namespace App\Http\Controllers\Api;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Transactions;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        return Transactions::where('user_id', $request->user()->id)
            ->latest()
            ->get();
    }

    public function show($id)
    {
        return Transactions::with('details.product')->findOrFail($id);
    }

    public function adminIndex()
{
    return Transactions::latest()->get();
}

public function updateStatus(Request $request, $id)
{
    $trx = Transactions::findOrFail($id);

    $trx->update([
        'status' => $request->status
    ]);

    return $trx;
}

}
