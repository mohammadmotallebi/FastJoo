<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{

    //auth:sanctum middleware
    public function handle($request, Closure $next, ...$guards)
    {
        // return custom response if user is not authenticated

        if ($guards[0] === 'sanctum' && $request->user() === null) {
            return response()->json([
                'logged_in' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }
        return $next($request);


    }
}