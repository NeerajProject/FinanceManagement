<?php

namespace App\Services;

use App\Models\Account;
use App\Repositories\Interfaces\AccountRepositoryInterface;

class AccountService
{
    public function __construct(
        protected AccountRepositoryInterface $repository
    ) {}

    public function create(array $data): Account
    {
        return $this->repository->create($data);
    }

    public function update(
        Account $account,
        array $data
    ): Account {
        return $this->repository->update(
            $account,
            $data
        );
    }

    public function delete(Account $account): bool
    {
        return $this->repository->delete($account);
    }
}