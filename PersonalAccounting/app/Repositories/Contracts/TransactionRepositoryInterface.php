<?php

namespace App\Repositories\Contracts;

use App\Models\Transaction;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * TransactionRepositoryInterface
 *
 * Defines the contract for all transaction data-access operations.
 * Controllers and Services depend ONLY on this interface — never on
 * the concrete Eloquent implementation — enabling easy swapping (e.g. to
 * an API-backed or cached repository) without touching business logic.
 */
interface TransactionRepositoryInterface
{
    /**
     * Return a paginated list of transactions, optionally filtered.
     *
     * @param  array<string, mixed>  $filters  Keys: status, account_id, category_id, from, to
     * @param  int                   $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator;

    /**
     * Find a single transaction by primary key (with relationships eager-loaded).
     *
     * @param  int  $id
     * @return Transaction
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail(int $id): Transaction;

    /**
     * Create a new transaction together with its line items and category tags.
     *
     * @param  array<string, mixed>  $data
     *   Required keys: account_id, date, amount, status, reference
     *   Optional keys: description, notes, lines[], category_ids[]
     * @return Transaction  The newly created, fully loaded transaction
     */
    public function create(array $data): Transaction;

    /**
     * Update an existing transaction and sync its lines / categories.
     *
     * @param  int                   $id
     * @param  array<string, mixed>  $data
     * @return Transaction
     */
    public function update(int $id, array $data): Transaction;

    /**
     * Soft-delete a transaction.
     *
     * @param  int  $id
     * @return void
     */
    public function delete(int $id): void;
}
