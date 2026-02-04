<?php

use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\TransactionController;
use Illuminate\Support\Facades\Route;




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/login', [AuthController::class, 'login']);
Route::get('/products', function () {
    return \App\Models\Product::latest()->get();
});

Route::middleware(['auth:sanctum', 'admin'])
    ->apiResource('/admin/products', ProductController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
Route::middleware('auth:sanctum')->group(function () {
        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart', [CartController::class, 'store']);
        Route::put('/cart/{id}', [CartController::class, 'update']);
        Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    });

Route::middleware('auth:sanctum')->post('/checkout', [CheckoutController::class, 'checkout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
});

Route::middleware(['auth:sanctum','admin'])->group(function () {
    Route::get('/admin/transactions', [TransactionController::class, 'adminIndex']);
    Route::put('/admin/transactions/{id}', [TransactionController::class, 'updateStatus']);
});






    
});
