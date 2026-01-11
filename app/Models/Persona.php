<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Persona extends Model
{ // Implementación de SoftDeletes
    use SoftDeletes;

    protected $table = 'persona'; // Definición de la tabla
    protected $primaryKey = 'persona_id'; // Definición de la llave primaria

    protected $fillable = [
        'nombres', // Nombres de la persona
        'apellidos', // Apellidos de la persona
        'cedula', // Cédula de identidad
        'fecha_nacimiento', // Fecha de nacimiento
        'direccion', // Dirección de residencia
        'telefono', // Número de teléfono
        'activo', // Estado activo/inactivo
        'fecha_baja', // Fecha de baja (si aplica)
    ];

    // Relación: Persona -> DatosMilitares
    public function datosMilitares()
    {
        return $this->hasOne(DatosMilitares::class, 'persona_id', 'persona_id');
    }

    // Relación: Persona -> Asistencias
    public function asistencias()
    {
        return $this->hasMany(Asistencia::class, 'persona_id', 'persona_id');
    }
}
