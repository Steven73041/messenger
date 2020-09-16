<?php

namespace App\Http\Controllers;

use App\User;
use App\Events\NewPost;
use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $posts = Post::orderBy('created_at', 'desc')->get();
        if (!empty($posts)) {
            $response = [];
            foreach ($posts as $post) {
                $response[] = [
                    'post' => $post,
                    'user' => $post->user,
                ];
            }
            return response($response, 200);
        } else {
            return response(['errors' => ['There are no posts']], 200);
        }
    }

    /**
     * Fetch all posts of user
     * @param $userId
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function getUserPosts($userId) {
        $posts = Post::where('userId', $userId)->orderBy('created_at', 'desc')->get();
        if (!empty($posts)) {
            return response($posts, 200);
        } else {
            return response(['errors' => ['No Posts Found']], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $post = new Post();
        $current_userID = auth('api')->user()->id;
        $post->userId = $current_userID;
        $post->text = $request->text;
        $post->image = $request->image;
        date_default_timezone_set('Europe/Athens');
        $post->created_at = date('Y-m-d H:i:s');
        $post->save();
        event(new NewPost($post->text));
        return response(['message' => 'success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post) {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post) {
        //
    }
}
