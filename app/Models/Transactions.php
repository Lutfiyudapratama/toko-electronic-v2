<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    protected $table = 'transactions';

    protected $fillable = [
        'user_id',
        'total_harga',
        'status'
    ];

    // RELATION
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detailTransaksi()
{
    return $this->hasMany(transactions_detail::class, 'transaction_id');
}

}
