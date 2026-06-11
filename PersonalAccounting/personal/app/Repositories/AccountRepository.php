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
        | Advanced Filters
        |--------------------------------------------------------------------------
        */

        $condition =
            $filters['condition']
            ?? 'and';

        foreach (
            $filters['filters']
            ?? []
            as $filter
        ) {

            if (
                empty(
                    $filter['field']
                )
            ) {
                continue;
            }

            $field =
                $filter['field'];

            $operator =
                $filter['operator']
                ?? '=';

            $value =
                $filter['value']
                ?? null;

            $method =
                $condition === 'or'
                    ? 'orWhere'
                    : 'where';

            switch ($operator) {

                case '=':

                    $query->{$method}(
                        $field,
                        '=',
                        $value
                    );

                    break;

                case '!=':

                    $query->{$method}(
                        $field,
                        '!=',
                        $value
                    );

                    break;

                case 'contains':

                    $query->{$method}(
                        $field,
                        'like',
                        "%{$value}%"
                    );

                    break;

                case 'starts_with':

                    $query->{$method}(
                        $field,
                        'like',
                        "{$value}%"
                    );

                    break;

                case 'ends_with':

                    $query->{$method}(
                        $field,
                        'like',
                        "%{$value}"
                    );

                    break;

                case '>':

                    $query->{$method}(
                        $field,
                        '>',
                        $value
                    );

                    break;

                case '<':

                    $query->{$method}(
                        $field,
                        '<',
                        $value
                    );

                    break;

                case 'between':

                    if (
                        !empty(
                            $filter[
                                'value_to'
                            ]
                        )
                    ) {

                        $query->whereBetween(
                            $field,
                            [
                                $value,
                                $filter[
                                    'value_to'
                                ],
                            ]
                        );
                    }

                    break;
            }
        }

        return $query
            ->latest()
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
                dd('paginate method called with perPage: ' . $perPage);

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