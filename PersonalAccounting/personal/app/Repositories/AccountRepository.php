<?php

namespace App\Repositories;

use App\Models\Account;
use App\Repositories\Interfaces\AccountRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class AccountRepository implements AccountRepositoryInterface
{
    public function paginate(
        int $perPage = 15
    ): LengthAwarePaginator {
        return Account::query()->latest()
            ->paginate($perPage);
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