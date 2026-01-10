<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Persona extends Model
{
    use SoftDeletes;

    protected $table = 'persona';
    protected $primaryKey = 'persona_id';

    protected $fillable = [
        'nombres',
        'apellidos',
        'cedula',
        'fecha_nacimiento',
        'direccion',
        'telefono',
        'activo',
        'fecha_baja',
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

