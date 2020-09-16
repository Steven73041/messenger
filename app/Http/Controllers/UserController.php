<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
    public function index() {
        return response(User::where('id', '!=', auth('api')->user()->id)->get(), 200);
    }

    public function show($userId) {
        return response(User::where('id', $userId)->get(), 200);
    }

    public function update(Request $request) {
        $current_userID = auth('api')->user()->id;
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'password' => 'string|min:6|confirmed',
            'photoUrl' => 'string|min:7',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 200);
        }
        $user = User::find($current_userID);
        $data = [];
        if ($request->photoUrl) $data['photoUrl'] = $request->photoUrl;
        if ($request->name) $data['name'] = $request->name;
        if ($request->password) $data['password'] = Hash::make($request->password);
        $user->update($data);
        return response(['user' => $user], 200);
    }
}
