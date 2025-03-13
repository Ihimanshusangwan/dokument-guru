<?php

namespace Database\Seeders;

use App\Helpers\Seeders\PermissionsSeeder;
use App\Helpers\Seeders\RolesSeeder;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'test@example.com'], // Find by email
            [
                'name' => 'Test User',
                'password' => Hash::make('defaultpassword'), // Provide a hashed password
            ]
        );

        (new RolesSeeder())->run();
        (new PermissionsSeeder())->run();

    }
}
