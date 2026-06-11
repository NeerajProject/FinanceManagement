<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();

            // Basic Information
            $table->string('code', 50)->unique();
            $table->string('name');

            // Odoo Account Type
            $table->enum('account_type', [
                'asset_receivable',
                'asset_cash',
                'asset_current',
                'asset_non_current',
                'asset_prepayments',
                'asset_fixed',

                'liability_payable',
                'liability_credit_card',
                'liability_current',
                'liability_non_current',

                'equity',
                'equity_unaffected',

                'income',
                'income_other',

                'expense',
                'expense_other',
                'expense_depreciation',
                'expense_direct_cost',

                'off_balance',
            ]);

            // Optional Fields
            $table->string('currency_code', 10)->nullable();
            $table->boolean('reconcile')->default(false);
            $table->boolean('is_active')->default(true);

            // Parent Account (for hierarchy)
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('accounts')
                ->nullOnDelete();

            $table->text('notes')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('account_type');
            $table->index('is_active');
            $table->index('parent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};