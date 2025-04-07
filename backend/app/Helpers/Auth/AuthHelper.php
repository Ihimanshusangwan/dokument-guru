<?php

namespace App\Helpers\Auth;

use App\Helpers\BaseHelper;
use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthHelper extends BaseHelper
{
    private function generateToken(User $user)
    {
        $payload = [
            'sub' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'role' => 'admin',
            'iat' => time(),
            'exp' => time() + env('JWT_EXPIRATION_TIME', 86400),
        ];

        return JWT::encode($payload, env('JWT_SECRET'), 'HS256');
    }

    public function handleLoginRequest(array $credentials): ?string
    {
        $user = User::where('email', $credentials['email'])->first();
        if (!$user) {
            $this->addError('User not found');
            return null;
        }
        if (!Auth::attempt($credentials)) {
            $this->addError('Invalid Password');
            return null;
        }
        return $this->generateToken($user);

    }

    public function handleSignupRequest(array $validatedData): ?string
    {
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);
        return $this->generateToken($user);

    }

}
