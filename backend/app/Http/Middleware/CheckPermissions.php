<?php

namespace App\Http\Middleware;

use App\Helpers\ResponseHelper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next, ...$permissions)
    {
        $user = Auth::user();

        if (!$user) {
            return ResponseHelper::errorResponse('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

        $userPermissions = $user->roles()->with('permissions')->get()->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique();
        foreach ($permissions as $permission) {
            if (!$userPermissions->contains($permission)) {
                return ResponseHelper::errorResponse('Forbidden: You do not have permission for this resource', Response::HTTP_FORBIDDEN);
            }
        }

        return $next($request);
    }
}
