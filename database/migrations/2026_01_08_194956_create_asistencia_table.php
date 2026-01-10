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
    {//Creación de tabla asistencia
        Schema::create('asistencia', function (Blueprint $table) {
            // Llave primaria
            $table->id('asistencia_id');

            // Llave foránea a tabla persona
            $table->foreignId('persona_id')
                ->constrained('persona', 'persona_id')
                ->restrictOnDelete();
            $table->date('fecha');

            // Llave foránea a tabla estado_asistencia
            $table->foreignId('estado_id')
                ->constrained('estado_asistencia', 'estado_id');
            $table->time('hora_registro');
            $table->text('observaciones')->nullable();

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asistencia');
    }
};
