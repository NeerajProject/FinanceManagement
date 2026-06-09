<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Dev / UI Preview Routes (no auth — for rapid UI iteration)
|--------------------------------------------------------------------------
*/
Route::get('/form-test', fn () => Inertia::render('FormTest'))->name('form-test');

/*
|--------------------------------------------------------------------------
| Transactions
|--------------------------------------------------------------------------
*/
Route::prefix('transactions')->name('transactions.')->group(function () {
    Route::get('/',    fn () => Inertia::render('Transactions/Index'))->name('index');
    Route::get('/{id}', fn ($id) => Inertia::render('Transactions/Show', ['id' => $id]))->name('show');
});

/*
|--------------------------------------------------------------------------
| Journal Entries
|--------------------------------------------------------------------------
*/
Route::prefix('journal-entries')->name('journal-entries.')->group(function () {
    Route::get('/',    fn () => Inertia::render('JournalEntries/Index'))->name('index');
    Route::get('/{id}', fn ($id) => Inertia::render('JournalEntries/Show', ['id' => $id]))->name('show');
});

/*
|--------------------------------------------------------------------------
| Entry Pipeline (stub — ready for future implementation)
|--------------------------------------------------------------------------
*/
Route::get('/entry-pipeline', fn () => Inertia::render('Transactions/Index'))->name('entry-pipeline');

/*
|--------------------------------------------------------------------------
| Dashboard (requires auth)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
