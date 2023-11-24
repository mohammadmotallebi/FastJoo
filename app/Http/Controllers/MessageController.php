<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // get all messages
    public function getMessages(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => true, // This is a success indicator
            'message' => 'Messages fetched successfully',
            'data' => Message::all(),
        ], 200);
    }
}
