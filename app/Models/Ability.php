<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
    /**
     * create table abilities
     * (
     * id           int auto_increment
     * primary key,
     * ability_name varchar(255) charset utf8mb3 null,
     * ability      varchar(255) charset utf8mb3 null,
     * table_name   varchar(255) charset utf8mb3 not null,
     * created_at   timestamp                    null,
     * updated_at   timestamp                    null
     * );
     * **************
     * Role has many abilities
     * create table ability_role
     * (
     * ability_id int null,
     * role_id    int null,
     * );
     */
    use HasFactory;

    protected $fillable = [
        'ability_name',
        'ability',
        'table_name',
    ];

    public function roles(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function allowTo($role): void
    {
        if (is_string($role)) {
            $role = Role::whereRole($role)->firstOrFail();
        }

        $this->roles()->syncWithoutDetaching($role);
    }


}
