<?php

use Illuminate\Http\Request;
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

Route::get('/', function () { // this is the default route
   // show index page in resources/repair/www/index.blade.php
    return view('index');
});



Route::get('/decrypt', function (Request $request) {
    return config('database.connections.mysql.database');
})->middleware('cors');


require __DIR__.'/api.php';
require __DIR__.'/auth.php';
