<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class AuthenticatedSessionController extends Controller
{
    /*
     * Handle an incoming authentication request.
     */
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
            $request->authenticate();

            $request->session()->regenerate();

            $request->user()->tokens()->delete();

            return response()->json([
                'status' => 'success',
                'user' => $request->user(),
                'token' => 'Bearer '.$request->user()->createToken('token')->plainTextToken
            ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request): JsonResponse
    {

        $request->user()->personal_access_tokens()->delete();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['status' => 'success']);
    }
}
