<?php

namespace App\Repositories\Eloquent;

use App\Models\Transaction;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

/**
 * EloquentTransactionRepository
 *
 * Concrete Eloquent implementation of TransactionRepositoryInterface.
 * All database logic is encapsulated here — controllers and services
 * never touch the query builder directly.
 */
class EloquentTransactionRepository implements TransactionRepositoryInterface
{
    /**
     * {@inheritdoc}
     */
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Transaction::with(['account', 'categories', 'createdBy'])
            ->latest('date');

        // ── Apply filters ─────────────────────────────────────────────────────
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['account_id'])) {
            $query->where('account_id', $filters['account_id']);
        }

        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', fn ($q) =>
                $q->where('categories.id', $filters['category_id'])
            );
        }

        if (!empty($filters['from'])) {
            $query->whereDate('date', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('date', '<=', $filters['to']);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * {@inheritdoc}
     */
    public function findOrFail(int $id): Transaction
    {
        return Transaction::with(['account', 'categories', 'lines', 'createdBy'])
            ->findOrFail($id);
    }

    /**
     * {@inheritdoc}
     *
     * Wraps creation + line insertion + category sync in a DB transaction
     * so any failure rolls everything back atomically.
     */
    public function create(array $data): Transaction
    {
        return DB::transaction(function () use ($data) {
            /** @var Transaction $transaction */
            $transaction = Transaction::create([
                'account_id'  => $data['account_id'],
                'created_by'  => $data['created_by'],
                'reference'   => $data['reference'],
                'date'        => $data['date'],
                'amount'      => $data['amount'],
                'status'      => $data['status'],
                'description' => $data['description'] ?? null,
                'notes'       => $data['notes'] ?? null,
            ]);

            // Insert line items (One2Many)
            foreach ($data['lines'] ?? [] as $line) {
                $transaction->lines()->create($line);
            }

            // Sync categories (Many2Many)
            if (!empty($data['category_ids'])) {
                $transaction->categories()->sync($data['category_ids']);
            }

            return $transaction->load(['account', 'categories', 'lines', 'createdBy']);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function update(int $id, array $data): Transaction
    {
        return DB::transaction(function () use ($id, $data) {
            $transaction = Transaction::findOrFail($id);

            $transaction->update([
                'account_id'  => $data['account_id']  ?? $transaction->account_id,
                'reference'   => $data['reference']   ?? $transaction->reference,
                'date'        => $data['date']         ?? $transaction->date,
                'amount'      => $data['amount']       ?? $transaction->amount,
                'status'      => $data['status']       ?? $transaction->status,
                'description' => $data['description']  ?? $transaction->description,
                'notes'       => $data['notes']        ?? $transaction->notes,
            ]);

            // Replace line items
            if (array_key_exists('lines', $data)) {
                $transaction->lines()->delete();
                foreach ($data['lines'] as $line) {
                    $transaction->lines()->create($line);
                }
            }

            // Sync categories
            if (array_key_exists('category_ids', $data)) {
                $transaction->categories()->sync($data['category_ids']);
            }

            return $transaction->load(['account', 'categories', 'lines', 'createdBy']);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function delete(int $id): void
    {
        Transaction::findOrFail($id)->delete();
    }
}
