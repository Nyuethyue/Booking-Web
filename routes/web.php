<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::any('{path}',[App\Http\Controllers\HomeController::class, 'index'])->where( 'path' , '([A-z\d\-\/_.]+)?' );