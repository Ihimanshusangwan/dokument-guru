<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseHelper
{
    public static function errorResponse($message, $statusCode = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'errorMessage' => $message,
        ], $statusCode);
    }

    public static function successResponse($data, $statusCode = 200): JsonResponse
    {
        $data['success'] = true;
        return response()->json($data, $statusCode);
    }
}
