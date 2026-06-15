<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Account;
use App\Services\AccountService;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Repositories\Interfaces\AccountRepositoryInterface;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function __construct(
        protected AccountRepositoryInterface $repository,
        protected AccountService $service
    ) {}

   public function index(
        Request $request
    ) {

        $accounts =
            $this->repository->paginate(
                filters: $request->all(),
                perPage: $request->integer(
                    'per_page',
                    15
                )
            );

        return Inertia::render(
            'Accounts/Index',
            [
                'accounts' => $accounts,

                'filters' => [
                    'search' =>
                        $request->search,

                    'status' =>
                        $request->status,

                    'types' =>
                        $request->types,

                    'group_by' =>
                        $request->group_by,

                    'custom_filters' =>
                        $request->custom_filters,
                ],
            ]
        );
    }
    public function create()
    {
        return Inertia::render(
            'Accounts/Create',
            [
                'types' =>
                    Account::getAccountTypes(),

                'parentAccounts' =>
                    $this->repository->getParents(),
            ]
        );
    }

    public function store(
        StoreAccountRequest $request
    ) {
        $this->service->create(
            $request->validated()
        );

        return redirect()
            ->route('accounts.index')
            ->with(
                'success',
                'Account Created'
            );
    }

    public function edit(Account $account)
    {
        return Inertia::render(
            'Accounts/Edit',
            [
                'account' => $account,
                'types' => Account::getAccountTypes(),
                'parentAccounts' =>
                    $this->repository->getParents(),
            ]
        );
    }

    public function update(
        UpdateAccountRequest $request,
        Account $account
    ) {
        $this->service->update(
            $account,
            $request->validated()
        );

        return redirect()
            ->back()
            ->with(
                'success',
                'Updated Successfully'
            );
    }

    public function destroy(Account $account)
    {
        $this->service->delete($account);

        return redirect()
            ->back();
    }
}