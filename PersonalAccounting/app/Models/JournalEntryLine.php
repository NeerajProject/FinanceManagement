<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * JournalEntryLine model — child line of a JournalEntry (One2Many).
 *
 * @property int    $id
 * @property int    $journal_entry_id  FK → journal_entries.id
 * @property string $account           GL account name
 * @property string $description
 * @property float  $debit
 * @property float  $credit
 */
class JournalEntryLine extends Model
{
    use HasFactory;

    protected $fillable = [
        'journal_entry_id',
        'account',
        'description',
        'debit',
        'credit',
    ];

    protected function casts(): array
    {
        return [
            'debit'  => 'float',
            'credit' => 'float',
        ];
    }

    /** Parent journal entry (Many2One). */
    public function journalEntry(): BelongsTo
    {
        return $this->belongsTo(JournalEntry::class);
    }
}
