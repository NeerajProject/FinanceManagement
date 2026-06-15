<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $accountId = $this->route('account') instanceof \App\Models\Account
            ? $this->route('account')->id
            : $this->route('account');

        return [
            'code' => 'required|unique:accounts,code,' . $accountId,
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
