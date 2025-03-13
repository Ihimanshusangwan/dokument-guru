<?php

namespace App\Helpers\Seeders;

use App\Models\Permission;

class PermissionsSeeder
{
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'test_permission',
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission]
            );
        }
    }
}
