<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class PersonalAccessToken extends Model
{
    /**
     * create table personal_access_tokens
     * (
     * id             bigint unsigned auto_increment
     * primary key,
     * tokenable_type varchar(255)    not null,
     * tokenable_id   bigint unsigned not null,
     * name           varchar(255)    not null,
     * token          varchar(64)     not null,
     * abilities      text            null,
     * last_used_at   timestamp       null,
     * expires_at     timestamp       null,
     * created_at     timestamp       null,
     * updated_at     timestamp       null,
     * constraint personal_access_tokens_token_unique
     * unique (token)
     * )
     * collate = utf8mb4_unicode_ci;
     *
     * create index personal_access_tokens_tokenable_type_tokenable_id_index
     * on personal_access_tokens (tokenable_type, tokenable_id);
     */
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
