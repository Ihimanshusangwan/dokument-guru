<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckPermissions;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello From Himanshu!']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('test-permission', [AuthController::class, 'test'])->middleware([CheckPermissions::class . ':test_permission']);
});
