<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
//    /**
//     * Handle an incoming request.
//     *
//     * @param Closure(Request): (Response) $next
//     */
//    public function handle(Request $request, Closure $next): Response
//    {
////        $request->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
////        $request->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
////        $request->headers->set('vary', 'Origin');
////        $request->headers->set('Access-Control-Allow-Credentials', 'true');
////        $request->headers->set('Access-Control-Max-Age', '86400');
////        $request->headers->set('Access-Control-Allow-Headers', 'x-api-key, Content-Type, X-Auth-Token, Origin, Authorization, X-Requested-With, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Max-Age');
//
//        return $next($request);
//    }

    // Middleware preflight CORS response
    public function handle($request, Closure $next)
    {
            return $next($request)
                ->header('Access-Control-Allow-Origin', 'http://10.0.0.94:5173')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'x-api-key, Content-Type, X-Auth-Token, Origin, Authorization, X-Requested-With, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Max-Age')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Expose-Headers', '*')
                ->header('Access-Control-Max-Age', '86400')
                ->header('Vary', 'Origin');

    }
}
