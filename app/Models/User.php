<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Laravel\Sanctum\HasApiTokens;

/**
 * @method static create(array $array)
 */
class User extends Authenticatable
{
    /**
     *create table users
     * (
     * id                bigint unsigned auto_increment
     * primary key,
     * name              varchar(255) not null,
     * email             varchar(255) not null,
     * email_verified_at timestamp    null,
     * password          varchar(255) not null,
     * remember_token    varchar(100) null,
     * role_id             int          not null,
     * created_at        timestamp    null,
     * updated_at        timestamp    null,
     * constraint users_email_unique
     * unique (email)
     * )
     * collate = utf8mb4_unicode_ci;
     * *****************************
     * User has one role
     * **** Roles Table ****
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
     * Roles has many abilities
     * **** Role_Ability Table ****
     * create table ability_role
     * (
     * ability_id int null,
     * role_id    int null
     * );
     */
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * Get the role that owns the User
     *
     * @return BelongsTo
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the personal_access_tokens that owns the User
     *
     * @return HasMany
     */
    public function personal_access_tokens(): HasMany
    {
        return $this->hasMany(PersonalAccessToken::class, 'tokenable_id');
    }

    /**
     * Get the abilities for the User
     *
     * @return Collection
     */
    public function abilities(): array
    {
        $abilities = $this->role()->first()?->abilities()->get();
        $abilitiesArray = [];
        if ($abilities) {
            foreach ($abilities as $ability) {
                $abilitiesArray += [$ability->ability.'-'.$ability->table_name];
            }
        }
        return $abilitiesArray;
    }

    /**
     * Get the role that owns the User
     *
     * @return string
     */
    public function getRoleAttribute(): string
    {
        return $this->role()->first()->role;
    }

    /**
     * Check if user is admin
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->getRoleAttribute() === 'admin';
    }

    public function hasAbility(array $abilities): bool
    {
        return count(array_intersect($abilities, $this->abilities())) > 0;
    }

    /**
     * Check if user has role
     *
     * @param  Role  $role
     * @return bool
     */
    public function hasRole(Role $role): bool
    {
        return $this->getRoleAttribute() === $role->role;
    }
    /**
     * Check if user is user
     *
     * @return bool
     */
    public function isUser(): bool
    {
        return $this->getRoleAttribute() === 'user';
    }

    /**
     * Check if user is super admin
     *
     * @return bool
     */
    public function isSuperAdmin(): bool
    {
        return $this->getRoleAttribute() === 'super_admin';
    }

    /**
     * Check if user is super admin or admin
     *
     * @return bool
     */
    public function isSuperAdminOrAdmin(): bool
    {
        return $this->getRoleAttribute() === 'super_admin' || $this->getRoleAttribute() === 'admin';
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

}
