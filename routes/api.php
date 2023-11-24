<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
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
Route::middleware('auth:sanctum')->prefix('api')->group(static function () {
    Route::get('/brands', function (Request $request) {
        return \App\Models\Brand::all();
    });

    Route::get('/types', function (Request $request) {
        return \App\Models\Type::all();
    });

    Route::post('/add-item', [\App\Http\Controllers\ItemController::class, 'addItem']);
    Route::get('/get-items', [\App\Http\Controllers\ItemController::class, 'getItems']);
    Route::delete('/delete-item', [\App\Http\Controllers\ItemController::class, 'deleteItem']);
    Route::post('/update-item', [\App\Http\Controllers\ItemController::class, 'updateItem']);
    Route::post('/get-item', [\App\Http\Controllers\ItemController::class, 'getItem']);
    Route::post('/get-messages', [\App\Http\Controllers\MessageController::class, 'getMessages']);

    // check user logged in Laravel Sanctum
    Route::post('sanctum/csrf-cookie', function (Request $request) {
        if (auth()->check()) {
            return response()->json(['logged_in'=> true, 'data' => $request->user()]);
        }
        return response()->json(['logged_in'=> false]);
    });
});

//    return collect(DB::select('show tables'))->map(function ($val) {
//        foreach ($val as $key => $tbl) {
//            return $tbl;
//        }
//    });


