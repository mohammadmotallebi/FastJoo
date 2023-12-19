<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function getUsers($order = 'asc', $by = 'name'): JsonResponse
    {
        return response()->json([
            'users' => User::orderBy($by, $order)->get()
        ], 200);
    }

    public function getUser($id)
    {
        return User::find($id);
    }

    public function deleteUser($id)
    {
        return User::destroy($id);
    }

    public function updateUser($id)
    {
        $user = User::find($id);
        $user->name = request('name');
        $user->email = request('email');
        $user->role_id = request('role');
        $user->save();
        return $user;
    }

    public function addUser()
    {
        $user = new User();
        $user->name = request('name');
        $user->email = request('email');
        $user->password = \Hash::make(request('password'));
        $user->role_id = request('role');
        $user->save();
        return $user;
    }
}
