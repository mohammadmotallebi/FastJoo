<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

/*
   create table messages
(
    id      bigint unsigned auto_increment
        primary key,
    user_id int                                 null,
    message text                                null,
    sent_at timestamp default CURRENT_TIMESTAMP null,
    status  varchar(50) charset utf8mb3         null,
    constraint id
  */

    protected $guarded = [];

    public $timestamps = false;







}
