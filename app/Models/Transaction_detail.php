<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class transactions_detail extends Model
{
    protected $table = 'transactions_detail';

    protected $fillable = [
        'tansactions_id',
        'product_id',
        'qty',
        'harga'
    ];

    // RELATION
    public function transaksi()
    {
        return $this->belongsTo(Transactions::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
