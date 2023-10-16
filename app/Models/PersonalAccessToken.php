<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class PersonalAccessToken extends Model
{
    use HasFactory;

    protected $table = 'personal_access_tokens';

    protected $guarded = [];

   protected $hidden = [];

    protected $casts = [
         'abilities' => 'array',
         'last_used_at' => 'datetime',
    ];
    public function getPlainTokenAttribute(): string
    {
        return Crypt::decryptString($this->attributes['token']);
    }

}
