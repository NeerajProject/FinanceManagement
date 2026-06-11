<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Account;
use App\Services\AccountService;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Repositories\Interfaces\AccountRepositoryInterface;

class AccountController extends Controller
{
    public function __construct(
        protected AccountRepositoryInterface $repository,
        protected AccountService $service
    ) {}

    public function index()
    {
        return Inertia::render(
            'Accounts/Index',
            [
                'accounts' =>
                    $this->repository->paginate(),
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

                'parents' =>
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
                'parents' =>
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