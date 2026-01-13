<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExpedientController;
use App\Http\Controllers\PersonaController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 🔧 RUTAS CORREGIDAS:

// 1. Rutas de perfil (solo auth)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 2. Expedientes (solo auth)
Route::middleware(['auth'])->group(function () {
    Route::resource('expedients', ExpedientController::class);
});

// 3. Personas (auth + verified)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('personas', PersonaController::class);
});


Route::get('/register', [ProfileController::class, 'create'])
    ->middleware('guest')
    ->name('register');
require __DIR__ . '/auth.php';
