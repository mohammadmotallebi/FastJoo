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

Route::middleware(['auth:sanctum'])->get('/auth', function () {
    if (auth()->check()) {
        return response()->json([
            'authenticated' => true,
            'user' => auth()->user()
        ]);
    }

    return response()->json([
        'authenticated' => false,
        'user' => null
    ]);
})->can('view-users');

Route::get('/decrypt', function (Request $request) {
    try {
        return response()->json([
            'status' => 'success',
            'decrypted' => decrypt('8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', true)
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
});

//    return collect(DB::select('show tables'))->map(function ($val) {
//        foreach ($val as $key => $tbl) {
//            return $tbl;
//        }
//    });


