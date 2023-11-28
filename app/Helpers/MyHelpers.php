<?php

namespace App\Helpers;


function currentUser($field = 'all')
{
    $user = auth()->user();

    if ($field === 'all') {
        return auth()->user();
    }

    return $user->$field;
}

function getRole(): string
{
    return auth()->user()->role;
}

function isAdmin(): bool
{
    return getRole() === 'admin';
}

function isSuperAdmin(): bool
{
    return getRole() === 'super_admin';
}

function isSuperAdminOrAdmin(): bool
{
    return isSuperAdmin() || isAdmin();
}

function isUser(): bool
{
    return getRole() === 'user';
}
