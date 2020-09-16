<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Message extends Model {
    use Notifiable;

    protected $guarded = [];
    protected $fillable = [
        'text', 'userId', 'receiverUserId',
    ];

    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i:s',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
