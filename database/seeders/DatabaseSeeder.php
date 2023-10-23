<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\User::insertOrIgnore([
                'name' => 'Mohammad Motalebi',
                'email' => 'mohamad.motalebi@gmail.com',
                'password' => bcrypt('09121242208'),
             'role_id' => 1,
         ]);

         \DB::table('roles')->truncate();
            \DB::table('abilities')->truncate();
            \DB::table('ability_role')->truncate();

            \App\Models\Role::create([
                'role_name' => 'admin',
                'role' => 'admin',
            ]);

            // Abilities
            \App\Models\Ability::create([
                'ability_name' => 'view',
                'ability' => 'view',
                'table_name' => 'users',
            ]);

            \DB::insert('insert into ability_role (ability_id, role_id) values (?, ?)', [1, 1]);



    }
}
