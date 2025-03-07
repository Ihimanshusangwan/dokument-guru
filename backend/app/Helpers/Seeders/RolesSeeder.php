<?php

namespace App\Helpers\Seeders;

use App\Models\Role;

class RolesSeeder
{
    public function run(): void
    {
        // Create roles
        $roles = [
            'tester',
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role]
            );
        }
    }
}
