<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the personal_access_tokens that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function personal_access_tokens(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PersonalAccessToken::class);
    }

    /**
     * Get the role that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function abilities(): array
    {
        return $this->role()->first()->abilities()->get()->pluck('ability')->toArray();
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

    public function isAdmin(): bool
    {
        return $this->getRoleAttribute() === 'admin';
    }

    public function isUser(): bool
    {
        return $this->getRoleAttribute() === 'user';
    }

    public function isSuperAdmin(): bool
    {
        return $this->getRoleAttribute() === 'super_admin';
    }

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
