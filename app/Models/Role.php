<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    /**
     * create table roles
     * (
     * id         int auto_increment
     * primary key,
     * role_name  varchar(255) charset utf8mb3 not null,
     * role       varchar(255) charset utf8mb3 not null,
     * created_at timestamp                    not null,
     * updated_at timestamp                    not null
     * );
     * *****************************
     * Role has many abilities
     * create table ability_role
     * (
     * ability_id int null,
     * role_id    int null,
     * );
     */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role_name',
        'role',
    ];

    /**
     * Get abilities for the role.
     *
     * @return BelongsToMany
     */
    public function abilities(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Ability::class);
    }

    /**
     * Get users for the role.
     *
     * @return HasMany
     */
    public function users(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Sync abilities for the role.
     *
     * @param $ability
     */
    public function allowTo($ability): void
    {
        if (is_string($ability)) {
            $ability = Ability::whereName($ability)->firstOrFail();
        }

        $this->abilities()->syncWithoutDetaching($ability);
    }

}
