<?php

namespace App\Http\Controllers;

use App\Events\Messages;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // get all messages
    public function getMessages(): \Illuminate\Http\JsonResponse
    {

        $messages = Message::where('sender_id', auth()->user()->id)
            ->orWhere('receiver_id', auth()->user()->id)
            ->orderBy('sent_at')
            ->get();


        return response()->json([
            'count' => count($messages),
            'unread' => count($messages->where('status', 'unread')),
            'messages' => $messages
        ], 200);

    }

    // send message
    public function sendMessage(Request $request): \Illuminate\Http\JsonResponse
    {
        $message = Message::create([
            'sender_id' => auth()->user()->id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'sent_at' => now()->format('Y-m-d H:i:s'),
            'status' => 'unread'
        ]);

        return response()->json([
            'message' => $message
        ], 200);
    }


}
