<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model {
    protected $guarded = [];

    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
