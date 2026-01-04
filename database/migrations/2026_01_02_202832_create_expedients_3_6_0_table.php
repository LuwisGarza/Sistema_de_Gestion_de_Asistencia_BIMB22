<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('expedients_3_6_0', function (Blueprint $table) {
            $table->id('list'); // clave primaria
            $table->string('nombre');
            $table->string('identificacion')->unique();
            $table->unsignedBigInteger('origen_status_3_6_0_list');
            $table->text('notas')->nullable();
            $table->timestamps();

            $table->foreign('origen_status_3_6_0_list')
                  ->references('list')
                  ->on('origen_status_3_6_0');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expedients_3_6_0');
    }
};
