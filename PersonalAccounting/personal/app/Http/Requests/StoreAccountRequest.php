<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|unique:accounts',
            'name' => 'required',
            'account_type' => 'required',
            'currency_code' => 'nullable',
            'reconcile' => 'boolean',
            'is_active' => 'boolean',
            'parent_id' => 'nullable|exists:accounts,id',
            'notes' => 'nullable'
        ];
    }
}