<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Gate;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware(['auth:sanctum'])->get('/auth', function (Request $request) {
//   dd(auth());
//})->can('view-users');
Route::middleware('cors')->prefix('api')->group(static function () {
    Route::get('/brands', function (Request $request) {
        return \App\Models\Brand::all();
    });

    Route::get('/types', function (Request $request) {
        return \App\Models\Type::all();
    });

    Route::post('/add-item', [\App\Http\Controllers\ItemController::class, 'addItem']);
    Route::get('/get-items', [\App\Http\Controllers\ItemController::class, 'getItems']);

});

//    return collect(DB::select('show tables'))->map(function ($val) {
//        foreach ($val as $key => $tbl) {
//            return $tbl;
//        }
//    });


