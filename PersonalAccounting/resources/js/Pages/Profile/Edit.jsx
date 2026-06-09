import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <LedgerFlowLayout activePath="/profile">
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your account information and preferences.</p>
                    </div>
                </div>

                <div className="bg-white p-4 shadow-sm border border-gray-200 sm:rounded-xl sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white p-4 shadow-sm border border-gray-200 sm:rounded-xl sm:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white p-4 shadow-sm border border-gray-200 sm:rounded-xl sm:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </LedgerFlowLayout>
    );
}
