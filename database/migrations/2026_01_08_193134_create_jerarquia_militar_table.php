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
    {   //Creación de tabla jerarquia_militar
        Schema::create('jerarquia_militar', function (Blueprint $table) {
            // Llave primaria
            $table->id('grado_id');
            $table->string('nombre_grado', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jerarquia_militar');
    }
};
