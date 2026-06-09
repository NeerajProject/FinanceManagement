<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Transaction model.
 *
 * Represents a single financial movement (debit or credit) against an Account.
 * A Transaction may carry many TransactionLine child records (One2Many) and
 * be tagged with many Category records (Many2Many).
 *
 * @property int         $id
 * @property int         $account_id       FK → accounts.id
 * @property int         $created_by       FK → users.id
 * @property string      $reference        Unique reference number e.g. "TXN-94821"
 * @property string      $date             Transaction date (Y-m-d)
 * @property float       $amount           Signed amount (negative = debit)
 * @property string      $status           cleared | pending | overdue
 * @property string|null $description      Long-form description / memo
 * @property string|null $notes            Internal notes
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */
class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    // ─── Fillable ────────────────────────────────────────────────────────────

    protected $fillable = [
        'account_id',
        'created_by',
        'reference',
        'date',
        'amount',
        'status',
        'description',
        'notes',
    ];

    // ─── Casts ───────────────────────────────────────────────────────────────

    protected function casts(): array
    {
        return [
            'date'   => 'date',
            'amount' => 'float',
        ];
    }

    // ─── Status constants ─────────────────────────────────────────────────────

    const STATUS_CLEARED = 'cleared';
    const STATUS_PENDING = 'pending';
    const STATUS_OVERDUE = 'overdue';

    // ─── Relationships ────────────────────────────────────────────────────────

    /**
     * The account this transaction belongs to (Many2One).
     */
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    /**
     * The user who created this transaction (Many2One).
     */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Child line items — journal lines for this transaction (One2Many).
     */
    public function lines(): HasMany
    {
        return $this->hasMany(TransactionLine::class);
    }

    /**
     * Categories / tags assigned to this transaction (Many2Many).
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_transaction')
                    ->withTimestamps();
    }

    // ─── Scopes ───────────────────────────────────────────────────────────────

    /** Filter by status. */
    public function scopeStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /** Filter by date range. */
    public function scopeDateRange($query, string $from, string $to)
    {
        return $query->whereBetween('date', [$from, $to]);
    }
}
