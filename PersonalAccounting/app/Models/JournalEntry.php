<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * JournalEntry model.
 *
 * A Journal Entry is a double-entry record posted to the General Ledger.
 * It contains many JournalEntryLine records (One2Many) that must balance
 * (total debits == total credits).
 *
 * @property int         $id
 * @property int         $created_by   FK → users.id
 * @property string      $reference    e.g. "JE-00142"
 * @property string      $date         Posting date (Y-m-d)
 * @property string      $memo         Short description
 * @property string      $status       draft | posted | reversed
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class JournalEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'reference',
        'date',
        'memo',
        'status',
    ];

    protected function casts(): array
    {
        return ['date' => 'date'];
    }

    const STATUS_DRAFT    = 'draft';
    const STATUS_POSTED   = 'posted';
    const STATUS_REVERSED = 'reversed';

    // ─── Relationships ────────────────────────────────────────────────────────

    /** Child debit/credit lines (One2Many). */
    public function lines(): HasMany
    {
        return $this->hasMany(JournalEntryLine::class);
    }

    /** Author of this entry (Many2One). */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    /** Check if total debits equal total credits. */
    public function isBalanced(): bool
    {
        $debit  = $this->lines->sum('debit');
        $credit = $this->lines->sum('credit');
        return abs($debit - $credit) < 0.001;
    }

    // ─── Scopes ───────────────────────────────────────────────────────────────

    public function scopePosted($query)
    {
        return $query->where('status', self::STATUS_POSTED);
    }

    public function scopeDraft($query)
    {
        return $query->where('status', self::STATUS_DRAFT);
    }
}
