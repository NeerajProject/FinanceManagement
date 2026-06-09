<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Http\Requests\Transaction\UpdateTransactionRequest;
use App\Models\Account;
use App\Models\Category;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * TransactionController
 *
 * Handles all Inertia-powered CRUD operations for Transactions.
 * Never touches the DB directly — delegates all data access to the
 * injected TransactionRepositoryInterface.
 *
 * Routes (see routes/web.php):
 *   GET    /transactions              → index()
 *   GET    /transactions/{id}         → show()
 *   GET    /transactions/create       → create()
 *   POST   /transactions              → store()
 *   GET    /transactions/{id}/edit    → edit()
 *   PATCH  /transactions/{id}         → update()
 *   DELETE /transactions/{id}         → destroy()
 */
class TransactionController extends Controller
{
    public function __construct(
        private readonly TransactionRepositoryInterface $transactions
    ) {}

    // ─────────────────────────────────────────────────────────────────────────
    // READ
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Display paginated list of transactions.
     * Accepts query params: status, account_id, category_id, from, to
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['status', 'account_id', 'category_id', 'from', 'to']);

        return Inertia::render('Transactions/Index', [
            'transactions' => $this->transactions->paginate($filters),
            'accounts'     => Account::select('id', 'name', 'type')->get(),
            'categories'   => Category::select('id', 'name', 'color')->get(),
            'filters'      => $filters,
        ]);
    }

    /**
     * Display a single transaction detail page.
     */
    public function show(int $id): Response
    {
        return Inertia::render('Transactions/Show', [
            'transaction' => $this->transactions->findOrFail($id),
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CREATE
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Render the "New Transaction" form.
     */
    public function create(): Response
    {
        return Inertia::render('Transactions/Create', [
            'accounts'   => Account::select('id', 'name', 'type')->get(),
            'categories' => Category::select('id', 'name', 'color')->get(),
        ]);
    }

    /**
     * Validate and persist a new transaction.
     */
    public function store(StoreTransactionRequest $request)
    {
        $transaction = $this->transactions->create(
            array_merge($request->validated(), ['created_by' => $request->user()->id])
        );

        return redirect()
            ->route('transactions.show', $transaction->id)
            ->with('success', "Transaction {$transaction->reference} created.");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UPDATE
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Render the "Edit Transaction" form pre-populated with existing data.
     */
    public function edit(int $id): Response
    {
        return Inertia::render('Transactions/Edit', [
            'transaction' => $this->transactions->findOrFail($id),
            'accounts'    => Account::select('id', 'name', 'type')->get(),
            'categories'  => Category::select('id', 'name', 'color')->get(),
        ]);
    }

    /**
     * Validate and apply updates to an existing transaction.
     */
    public function update(UpdateTransactionRequest $request, int $id)
    {
        $transaction = $this->transactions->update($id, $request->validated());

        return redirect()
            ->route('transactions.show', $id)
            ->with('success', "Transaction {$transaction->reference} updated.");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Soft-delete a transaction and redirect to the list.
     */
    public function destroy(int $id)
    {
        $this->transactions->delete($id);

        return redirect()
            ->route('transactions.index')
            ->with('success', 'Transaction deleted.');
    }
}
