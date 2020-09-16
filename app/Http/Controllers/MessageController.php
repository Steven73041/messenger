<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;

class MessageController extends Controller {

    /**
     * Display a listing of the messages between the chat users
     * @return \Illuminate\Http\Response
     */
    public function index($from, $to) {
        $user_from = User::firstWhere('email', $from);
//        $user_from = auth('api')->user();
        $user_to = User::firstWhere('email', $to);
        $messages = DB::table('messages')
            //query where sender is in ids of user send/receive
            ->whereIn('userId', [$user_to->id, $user_from->id])
            //where receiver is the current user
            ->where(function ($q) use ($user_from, $user_to) {
                $q->where('receiverUserId', $user_to->id)
                    //or where receiver is the sender
                    ->orWhere(function ($q) use ($user_from, $user_to) {
                        $q->where('receiverUserId', $user_from->id);
                    });
            })
            //order by date asc
            ->orderBy('created_at', 'asc')->get();
        $response = [];
        foreach ($messages as $message) {
            date_default_timezone_set('Europe/Athens');
            $message->created_at = date('m/d/Y H:i:s', strtotime($message->created_at));
            $response[] = [
                'message' => $message,
                'user' => User::firstWhere('id', $message->userId)
            ];
        }
        return response($response, 200);
    }

    /**
     * Store a newly created message in storage.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $message = new Message();
        $current_userID = auth('api')->user()->id;
        $message->userId = $current_userID;
        $message->text = $request->text;
        $userReceiver = User::firstWhere('email', $request->receiverUserId);
        $message->receiverUserId = $userReceiver->id;
        date_default_timezone_set('Europe/Athens');
        $message->created_at = date('Y-m-d H:i:s');
        $message->save();
        event(new NewMessage($message, $userReceiver));
        return response($message, 200);
    }

    /**
     * Update the specified resource in storage.
     * @param \Illuminate\Http\Request $request
     * @param \App\Message $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Message $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        $message = Message::find($request->id);
        $message->delete();
        event(new NewMessage($message, User::find($message->receiverUserId)));
        return response(['messages' => 'success'], 200);
    }
}
