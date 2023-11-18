<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('cors')->prefix('api')->group(static function () {

    Route::options('/{any}', static function () {
        return response('', 200);
    })->where('any', '.*');

    Route::middleware(['guest'])->group(static function () {
            Route::post('/register', [RegisteredUserController::class, 'store'])
                ->name('register');

            Route::post('/login', [AuthenticatedSessionController::class, 'login'])
                ->name('login');

            Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest')
                ->name('password.email');

            Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');

            Route::get('/auth', function (Request $request) {
                return auth()->user();
            });
    });
    Route::middleware(['auth:sanctum'])->group(static function () {
            Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

            Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['throttle:6,1'])
                ->name('verification.send');

            Route::post('/logout', [AuthenticatedSessionController::class, 'logout'])
                ->name('logout');

            Route::post('/gettoken', function (Request $request) {
                return auth()->check();
            })->middleware('api');

    });

});
