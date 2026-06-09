<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Account model — represents a bank/cash/card account.
 *
 * @property int    $id
 * @property string $name       e.g. "Chase Operating"
 * @property string $type       bank | cash | card
 * @property string $currency   ISO 4217 code, default "USD"
 * @property bool   $is_active
 */
class Account extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type', 'currency', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    const TYPE_BANK = 'bank';
    const TYPE_CASH = 'cash';
    const TYPE_CARD = 'card';

    /** Transactions against this account. */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
