<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

abstract class Controller
{
    private $request;
    public $validatedData = [];

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    protected function validateRequest(array $rules): ?JsonResponse
    {
        $validator = Validator::make($this->request->all(), $rules);

        if ($validator->fails()) {
            return ResponseHelper::errorResponse($validator->messages(), Response::HTTP_BAD_REQUEST);
        }

        $this->validatedData = $validator->validated();
        return null;
    }
}
