<?php

namespace App\Repositories\Interfaces;

use App\Models\Account;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface AccountRepositoryInterface
{
    public function paginate(
        array $filters = [],
        int $perPage = 15
    ): LengthAwarePaginator;

    public function all(): Collection;

    public function find(
        int $id
    ): ?Account;

    public function create(
        array $data
    ): Account;

    public function update(
        Account $account,
        array $data
    ): Account;

    public function delete(
        Account $account
    ): bool;
}