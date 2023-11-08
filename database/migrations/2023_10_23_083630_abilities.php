<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * **** Abilities Table ****
     *  create table abilities
     *  (
     *  id           int auto_increment
     *  primary key,
     *  ability_name varchar(255) charset utf8mb3 null,
     *  ability      varchar(255) charset utf8mb3 null,
     *  table_name   varchar(255) charset utf8mb3 not null,
     *  created_at   timestamp                    null,
     *  updated_at   timestamp                    null
     *  );
     *  **** Roles Table ****
     *  create table roles
     *  (
     *  id         int auto_increment
     *  primary key,
     *  role_name  varchar(255) charset utf8mb3 not null,
     *  role       varchar(255) charset utf8mb3 not null,
     *  created_at timestamp                    not null,
     *  updated_at timestamp                    not null
     *  );
     *  *****************************
     *  Roles has many abilities
     *  **** Role_Ability Table ****
     *  create table ability_role
     *  (
     *  ability_id int null,
     *  role_id    int null
     *  );
     */
    public function up(): void
    {
        $db = config('database.connections.mysql.database');
        \DB::statement("CREATE DATABASE IF NOT EXISTS {$db} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
          Schema::create('abilities', function (Blueprint $table) {
                $table->id();
                $table->string('ability_name')->nullable();
                $table->string('ability')->nullable();
                $table->string('table_name');
                $table->timestamps();
            });

            Schema::create('roles', function (Blueprint $table) {
                    $table->id();
                    $table->string('role_name');
                    $table->string('role');
                    $table->timestamps();
                });

            Schema::create('ability_role', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('ability_id')->nullable();
                    $table->unsignedBigInteger('role_id')->nullable();
                    $table->timestamps();
                });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
