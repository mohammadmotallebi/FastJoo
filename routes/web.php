<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return [
        'status' => 'success',
        'message' => 'Welcome to the API',
        'version' => config('app.version')
    ];
});
Route::prefix('api')->group(function () {
    require __DIR__.'/api.php';
});


require __DIR__.'/auth.php';
