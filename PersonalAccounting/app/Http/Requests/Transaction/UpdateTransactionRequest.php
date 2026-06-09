<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Validates the payload for updating an existing Transaction.
 *
 * Used by: TransactionController@update
 */
class UpdateTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('transaction');

        return [
            'account_id'         => ['sometimes', 'integer', 'exists:accounts,id'],
            'reference'          => ['sometimes', 'string', 'max:50', Rule::unique('transactions', 'reference')->ignore($id)],
            'date'               => ['sometimes', 'date'],
            'amount'             => ['sometimes', 'numeric'],
            'status'             => ['sometimes', 'in:cleared,pending,overdue'],
            'description'        => ['nullable', 'string', 'max:1000'],
            'notes'              => ['nullable', 'string', 'max:1000'],
            'category_ids'       => ['nullable', 'array'],
            'category_ids.*'     => ['integer', 'exists:categories,id'],
            'lines'              => ['nullable', 'array'],
            'lines.*.account'    => ['required_with:lines', 'string', 'max:255'],
            'lines.*.description'=> ['nullable', 'string', 'max:500'],
            'lines.*.debit'      => ['required_with:lines', 'numeric', 'min:0'],
            'lines.*.credit'     => ['required_with:lines', 'numeric', 'min:0'],
        ];
    }
}
