<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates the payload for creating a new Transaction.
 *
 * Used by: TransactionController@store
 */
class StoreTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Add policy check here when auth is fully wired
    }

    public function rules(): array
    {
        return [
            'account_id'         => ['required', 'integer', 'exists:accounts,id'],
            'reference'          => ['required', 'string', 'max:50', 'unique:transactions,reference'],
            'date'               => ['required', 'date'],
            'amount'             => ['required', 'numeric'],
            'status'             => ['required', 'in:cleared,pending,overdue'],
            'description'        => ['nullable', 'string', 'max:1000'],
            'notes'              => ['nullable', 'string', 'max:1000'],
            'category_ids'       => ['nullable', 'array'],
            'category_ids.*'     => ['integer', 'exists:categories,id'],

            // One2Many line validation
            'lines'              => ['nullable', 'array'],
            'lines.*.account'    => ['required_with:lines', 'string', 'max:255'],
            'lines.*.description'=> ['nullable', 'string', 'max:500'],
            'lines.*.debit'      => ['required_with:lines', 'numeric', 'min:0'],
            'lines.*.credit'     => ['required_with:lines', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'account_id.exists'   => 'The selected account does not exist.',
            'reference.unique'    => 'This reference number is already in use.',
            'status.in'           => 'Status must be one of: cleared, pending, overdue.',
            'category_ids.*.exists' => 'One or more selected categories are invalid.',
        ];
    }
}
