<?php

namespace App\Events;

use App\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Facades\Auth;

class NewMessage implements ShouldBroadcastNow {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $userReceiver;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message, $userReceiver) {
        $this->message = $message;
        $this->userReceiver = $userReceiver;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn() {
        return [
            new Channel('messages.' . $this->userReceiver->id),
            new Channel('messages.' . $this->message->userId)
        ];
    }

    public function broadcastAs() {
        return 'NewMessage';
    }

    public function broadcastWith() {
        return [
            'message' => $this->message,
            'user' => $this->userReceiver
        ];
    }

    /**
     * Determine if this event should broadcast.
     *
     * @return bool
     */
    public function broadcastWhen() {
        $return = false;
        $ids_to_broadcast = [$this->message->userId, $this->message->receiverUserId];
        if (in_array($this->message->userId, $ids_to_broadcast) || in_array($this->message->receiverUserId, $ids_to_broadcast)) $return = true;
        return $return;
    }
}
