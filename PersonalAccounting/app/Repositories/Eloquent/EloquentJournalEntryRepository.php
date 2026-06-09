<?php

namespace App\Repositories\Eloquent;

use App\Models\JournalEntry;
use App\Repositories\Contracts\JournalEntryRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use LogicException;

/**
 * EloquentJournalEntryRepository
 *
 * Concrete Eloquent implementation of JournalEntryRepositoryInterface.
 */
class EloquentJournalEntryRepository implements JournalEntryRepositoryInterface
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = JournalEntry::with(['lines', 'createdBy'])->latest('date');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (!empty($filters['from'])) {
            $query->whereDate('date', '>=', $filters['from']);
        }
        if (!empty($filters['to'])) {
            $query->whereDate('date', '<=', $filters['to']);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    public function findOrFail(int $id): JournalEntry
    {
        return JournalEntry::with(['lines', 'createdBy'])->findOrFail($id);
    }

    public function create(array $data): JournalEntry
    {
        return DB::transaction(function () use ($data) {
            $entry = JournalEntry::create([
                'created_by' => $data['created_by'],
                'reference'  => $data['reference'],
                'date'       => $data['date'],
                'memo'       => $data['memo'],
                'status'     => $data['status'] ?? JournalEntry::STATUS_DRAFT,
            ]);

            foreach ($data['lines'] ?? [] as $line) {
                $entry->lines()->create($line);
            }

            return $entry->load(['lines', 'createdBy']);
        });
    }

    public function update(int $id, array $data): JournalEntry
    {
        return DB::transaction(function () use ($id, $data) {
            $entry = JournalEntry::findOrFail($id);

            $entry->update([
                'date'   => $data['date']  ?? $entry->date,
                'memo'   => $data['memo']  ?? $entry->memo,
                'status' => $data['status'] ?? $entry->status,
            ]);

            if (array_key_exists('lines', $data)) {
                $entry->lines()->delete();
                foreach ($data['lines'] as $line) {
                    $entry->lines()->create($line);
                }
            }

            return $entry->load(['lines', 'createdBy']);
        });
    }

    public function post(int $id): JournalEntry
    {
        $entry = $this->findOrFail($id);

        if ($entry->status !== JournalEntry::STATUS_DRAFT) {
            throw new LogicException("Only draft entries can be posted. Current status: {$entry->status}");
        }

        if (!$entry->isBalanced()) {
            throw new LogicException("Cannot post an unbalanced journal entry (debits ≠ credits).");
        }

        $entry->update(['status' => JournalEntry::STATUS_POSTED]);

        return $entry;
    }

    public function delete(int $id): void
    {
        $entry = JournalEntry::findOrFail($id);

        if ($entry->status !== JournalEntry::STATUS_DRAFT) {
            throw new LogicException("Only draft journal entries may be deleted.");
        }

        $entry->delete();
    }
}
