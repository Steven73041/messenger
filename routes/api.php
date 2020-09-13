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
    Route::post('/logout', 'Auth\ApiAuthController@logout')->name('logout.api');
    Route::get('/messages/{from}/{to}', 'MessageController@index');
    Route::get('/users', 'UserController@index');
    Route::put('/users/update/', 'UserController@update');
    Route::post('/messages/delete', 'MessageController@destroy');
    Route::post('/messages/store', 'MessageController@store');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/login', 'Auth\ApiAuthController@login')->name('login.api');
    Route::post('/register', 'Auth\ApiAuthController@register')->name('register.api');
});
