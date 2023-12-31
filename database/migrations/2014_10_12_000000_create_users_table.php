<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * create table users
     *  (
     *  id                bigint unsigned auto_increment
     *  primary key,
     *  name              varchar(255) not null,
     *  email             varchar(255) not null,
     *  email_verified_at timestamp    null,
     *  password          varchar(255) not null,
     *  remember_token    varchar(100) null,
     *  role_id             int          not null,
     *  created_at        timestamp    null,
     *  updated_at        timestamp    null,
     *  constraint users_email_unique
     *  unique (email)
     *  )
     *  collate = utf8mb4_unicode_ci;
     */

     public function up(): void
     {
         $db = config('database.connections.mysql.database');
         \DB::statement("CREATE DATABASE IF NOT EXISTS {$db} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");

         // create table users
         Schema::create('users', function (Blueprint $table) {
             $table->id();
             $table->string('name');
             $table->string('email')->unique();
             $table->timestamp('email_verified_at')->nullable();
             $table->string('password');
             $table->integer('role_id')->nullable();
             $table->rememberToken();
             $table->timestamps();
         });


     }




    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
