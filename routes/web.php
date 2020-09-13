<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Deactivate it, we use react router
 */
//Route::get('/', function () {
//    return view('index');
//});

/**
 * We use this to always set index blade, we take routes from react-router
 */
Route::view('/{path?}', 'index');
