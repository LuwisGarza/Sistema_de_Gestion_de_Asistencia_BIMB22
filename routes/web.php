<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExpedientController;


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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    // OPCIÓN A (Recomendada): Route::resource genera TODAS las rutas automáticamente
    Route::resource('expedients', ExpedientController::class);
    
    // OPCIÓN B: Si quieres definir manualmente solo las que necesitas ahora:
    // Route::get('/expedients', [ExpedientController::class, 'index'])->name('expedients.index');
    // Route::get('/expedients/create', [ExpedientController::class, 'create'])->name('expedients.create');
    // Route::post('/expedients', [ExpedientController::class, 'store'])->name('expedients.store');
});
require __DIR__.'/auth.php';