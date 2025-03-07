<?php

namespace App\Http\Middleware;

use App\Helpers\ResponseHelper;
use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return ResponseHelper::errorResponse('Token not provided', Response::HTTP_UNAUTHORIZED);
        }

        $token = str_replace('Bearer ', '', $token);

        try {
            $credentials = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $user = User::find($credentials->sub);

            if (!$user) {
                return ResponseHelper::errorResponse('User not found', Response::HTTP_UNAUTHORIZED);
            }

            Auth::login($user);
        } catch (\Exception $e) {
            return ResponseHelper::errorResponse('Invalid token', Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
