<?php

namespace App\Repositories\Contracts;

use App\Models\JournalEntry;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * JournalEntryRepositoryInterface
 *
 * Contract for all Journal Entry data-access operations.
 */
interface JournalEntryRepositoryInterface
{
    /**
     * Paginated list of journal entries, optionally filtered.
     *
     * @param  array<string, mixed>  $filters  Keys: status, from, to
     * @param  int                   $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator;

    /**
     * Find a single journal entry by ID with lines eager-loaded.
     *
     * @param  int  $id
     * @return JournalEntry
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail(int $id): JournalEntry;

    /**
     * Create a journal entry with its debit/credit lines.
     *
     * @param  array<string, mixed>  $data
     *   Required: created_by, date, memo, status
     *   Optional: lines[] (each with account, description, debit, credit)
     * @return JournalEntry
     */
    public function create(array $data): JournalEntry;

    /**
     * Update a journal entry and replace its lines.
     *
     * @param  int                   $id
     * @param  array<string, mixed>  $data
     * @return JournalEntry
     */
    public function update(int $id, array $data): JournalEntry;

    /**
     * Post a draft journal entry (set status → 'posted').
     *
     * @param  int  $id
     * @return JournalEntry
     *
     * @throws \LogicException  if the entry is not balanced or already posted
     */
    public function post(int $id): JournalEntry;

    /**
     * Delete a journal entry (only allowed when in draft status).
     *
     * @param  int  $id
     * @return void
     */
    public function delete(int $id): void;
}
