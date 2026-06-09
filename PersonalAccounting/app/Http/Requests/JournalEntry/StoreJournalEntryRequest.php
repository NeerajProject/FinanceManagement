<?php

namespace App\Http\Requests\JournalEntry;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates the payload for creating a new JournalEntry.
 *
 * Business rule enforced here: at least two lines are required
 * (one debit + one credit minimum for double-entry bookkeeping).
 */
class StoreJournalEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date'               => ['required', 'date'],
            'memo'               => ['required', 'string', 'max:500'],
            'status'             => ['sometimes', 'in:draft,posted'],

            // Lines — minimum 2 required
            'lines'              => ['required', 'array', 'min:2'],
            'lines.*.account'    => ['required', 'string', 'max:255'],
            'lines.*.description'=> ['nullable', 'string', 'max:500'],
            'lines.*.debit'      => ['required', 'numeric', 'min:0'],
            'lines.*.credit'     => ['required', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'lines.required' => 'A journal entry must have at least two lines.',
            'lines.min'      => 'A journal entry must have at least two lines.',
        ];
    }
}
