<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->group(function () {
    //auth
    Route::post('/logout', 'Auth\ApiAuthController@logout')->name('logout.api');

    //messages
    Route::get('/messages/{from}/{to}', 'MessageController@index');
    Route::post('/messages/delete', 'MessageController@destroy');
    Route::post('/messages/store', 'MessageController@store');

    //users
    Route::get('/users', 'UserController@index');
    Route::get('/users/get/{userId}', 'UserController@show');

    //posts
    Route::get('/posts', 'PostController@index');
    Route::get('/posts/get/{userId}', 'PostController@getUserPosts');
    Route::post('/posts/store', 'PostController@store');
    Route::put('/users/update/', 'UserController@update');

    //follow
    Route::post('/follow/', 'FollowerController@store');
    Route::post('/unfollow/', 'FollowerController@destroy');
});

Route::group(['middleware' => ['cors', 'json.response']], function () {
    //auth
    Route::post('/login', 'Auth\ApiAuthController@login')->name('login.api');
    Route::post('/register', 'Auth\ApiAuthController@register')->name('register.api');
});
