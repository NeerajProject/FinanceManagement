<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Category model — a tag/label that can be attached to many Transactions.
 *
 * This is the "Many" side of a Many2Many (Transactions ↔ Categories).
 *
 * @property int    $id
 * @property string $name   e.g. "Software", "Travel"
 * @property string $color  Hex color for UI badge, e.g. "#3b82f6"
 */
class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'color'];

    /** Transactions tagged with this category (Many2Many). */
    public function transactions(): BelongsToMany
    {
        return $this->belongsToMany(Transaction::class, 'category_transaction')
                    ->withTimestamps();
    }
}
