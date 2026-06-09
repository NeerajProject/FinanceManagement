<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * TransactionLine model — child line item of a Transaction (One2Many).
 *
 * Each line represents one side of a double-entry posting for the parent
 * transaction. Debit and Credit are stored as separate unsigned columns.
 *
 * @property int         $id
 * @property int         $transaction_id   FK → transactions.id
 * @property string      $account          GL account name / code
 * @property string      $description      Line-level description
 * @property float       $debit            Debit amount (0 if credit line)
 * @property float       $credit           Credit amount (0 if debit line)
 */
class TransactionLine extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
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

    // ─── Relationships ────────────────────────────────────────────────────────

    /** Parent transaction (Many2One). */
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}
