<?php

namespace App\Helpers;

abstract class BaseHelper
{
    protected $errors = [];

    public function getErrors(): array
    {
        return $this->errors;
    }

    protected function addError(string $error): void
    {
        $this->errors[] = $error;
    }

    public function hasErrors(): bool
    {
        return count($this->errors) > 0;
    }

    protected function clearErrors(): void
    {
        $this->errors = [];
    }

    public function getFirstError(): string
    {
        return $this->errors[0];
    }

    public function getLastError(): string
    {
        return $this->errors[count($this->errors) - 1];
    }

}
