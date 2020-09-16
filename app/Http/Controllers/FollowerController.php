<?php

namespace App\Http\Controllers;

use App\Follower;
use App\User;
use Illuminate\Http\Request;

class FollowerController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        //
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $follower = User::find($request->userId);
        if ($follower) {
            $follower->followers()->attach(auth('api')->user()->id);
            return response(['message' => 'followed'], 200);
        } else {
            return response(['error' => 'There was an error during the process'], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Follower $follower
     * @return \Illuminate\Http\Response
     */
    public function show(Follower $follower) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Follower $follower
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        $follower = User::find($request->userId);
        if ($follower) {
            $follower->followers()->detach(auth('api')->user()->id);
            return response(['message' => 'unfollowed'], 200);
        } else {
            return response(['errors' => ['There was an error during the process']], 200);
        }
    }
}
