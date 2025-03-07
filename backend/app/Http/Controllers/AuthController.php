<?php

namespace App\Http\Controllers;

use App\Helpers\Auth\AuthHelper;
use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login()
    {
        $IsInvalidRequest = $this->validateRequest([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($IsInvalidRequest) {
            return $IsInvalidRequest;
        }
        $authHelper = new AuthHelper();
        $token = $authHelper->handleLoginRequest($this->validatedData);
        if ($authHelper->hasErrors()) {
            return ResponseHelper::errorResponse($authHelper->getFirstError());
        }
        return ResponseHelper::successResponse(['token' => $token]);

    }

    public function signup()
    {
        $IsInvalidRequest = $this->validateRequest([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
        if ($IsInvalidRequest) {
            return $IsInvalidRequest;
        }
        $authHelper = new AuthHelper();
        $token = $authHelper->handleSignupRequest($this->validatedData);
        return ResponseHelper::successResponse(['token' => $token]);
    }

    public function test(Request $request)
    {
        return response()->json(['message' => 'Test done!']);
    }
}
