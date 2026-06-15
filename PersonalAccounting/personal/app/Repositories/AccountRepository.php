<?php

namespace App\Repositories;

use App\Models\Account;
use App\Repositories\Interfaces\AccountRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class AccountRepository implements AccountRepositoryInterface
{


      public function paginate(
        array $filters = [],
        int $perPage = 15
    ): LengthAwarePaginator {

        $query = Account::query();

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if (!empty($filters['search'])) {

            $search = trim(
                $filters['search']
            );

            $query->where(
                function ($q) use ($search) {

                    $q->where(
                        'code',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'name',
                        'like',
                        "%{$search}%"
                    );
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Status Filter
        |--------------------------------------------------------------------------
        */
        if (!empty($filters['status'])) {
            if ($filters['status'] === 'active') {
                $query->where('is_active', true);
            } elseif ($filters['status'] === 'inactive') {
                $query->where('is_active', false);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Types Filter
        |--------------------------------------------------------------------------
        */
        if (!empty($filters['types'])) {
            $types = is_array($filters['types']) ? $filters['types'] : [$filters['types']];
            $query->whereIn('account_type', $types);
        }

        /*
        |--------------------------------------------------------------------------
        | Group By / Sorting
        |--------------------------------------------------------------------------
        */
        if (!empty($filters['group_by'])) {
            $query->orderBy($filters['group_by'], 'asc');
        } else {
            $query->latest();
        }

        return $query
            ->paginate($perPage)
            ->withQueryString();
    }









public function all(): Collection
    {
        return Account::all();
    }

    public function find(int $id): ?Account
    {
        return Account::find($id);
    }

    public function create(array $data): Account
    {
        return Account::create($data);
    }

    public function update(
        
        Account $account,
        array $data
    ): Account {
        $account->update($data);

        return $account->refresh();
    }

    public function delete(Account $account): bool
    {
        return $account->delete();
    }

    public function getActive(): Collection
    {
        return Account::active()->get();
    }

    public function getParents(): Collection
    {
        return Account::active()
            ->orderBy('code')
            ->get();
    }
}