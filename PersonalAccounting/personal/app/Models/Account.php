<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    protected $fillable = [
        'code',
        'name',
        'account_type',
        'currency_code',
        'reconcile',
        'is_active',
        'parent_id',
        'notes',
    ];

    protected $casts = [
        'reconcile' => 'boolean',
        'is_active' => 'boolean',
    ];

    public const ACCOUNT_TYPES = [
        'asset_receivable'      => 'Receivable',
        'asset_cash'            => 'Bank and Cash',
        'asset_current'         => 'Current Assets',
        'asset_non_current'     => 'Non-current Assets',
        'asset_prepayments'     => 'Prepayments',
        'asset_fixed'           => 'Fixed Assets',

        'liability_payable'     => 'Payable',
        'liability_credit_card' => 'Credit Card',
        'liability_current'     => 'Current Liabilities',
        'liability_non_current' => 'Non-current Liabilities',

        'equity'                => 'Equity',
        'equity_unaffected'     => 'Current Year Earnings',

        'income'                => 'Income',
        'income_other'          => 'Other Income',

        'expense'               => 'Expenses',
        'expense_other'         => 'Other Expenses',
        'expense_depreciation'  => 'Depreciation',
        'expense_direct_cost'   => 'Cost of Revenue',

        'off_balance'           => 'Off-Balance Sheet',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Account::class, 'parent_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getAccountTypeLabelAttribute(): string
    {
        return self::ACCOUNT_TYPES[$this->account_type]
            ?? $this->account_type;
    }

    public function getDisplayNameAttribute(): string
    {
        return "{$this->code} - {$this->name}";
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeAssets(Builder $query): Builder
    {
        return $query->where('account_type', 'like', 'asset_%');
    }

    public function scopeLiabilities(Builder $query): Builder
    {
        return $query->where('account_type', 'like', 'liability_%');
    }

    public function scopeIncome(Builder $query): Builder
    {
        return $query->whereIn('account_type', [
            'income',
            'income_other',
        ]);
    }

    public function scopeExpenses(Builder $query): Builder
    {
        return $query->whereIn('account_type', [
            'expense',
            'expense_other',
            'expense_depreciation',
            'expense_direct_cost',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Helper Methods
    |--------------------------------------------------------------------------
    */

    public static function getAccountTypes(): array
    {
        return self::ACCOUNT_TYPES;
    }

    public function isReceivable(): bool
    {
        return $this->account_type === 'asset_receivable';
    }

    public function isPayable(): bool
    {
        return $this->account_type === 'liability_payable';
    }

    public function isIncome(): bool
    {
        return in_array($this->account_type, [
            'income',
            'income_other',
        ]);
    }

    public function isExpense(): bool
    {
        return in_array($this->account_type, [
            'expense',
            'expense_other',
            'expense_depreciation',
            'expense_direct_cost',
        ]);
    }
}