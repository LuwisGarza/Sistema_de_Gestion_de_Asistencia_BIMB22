<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoAsistencia extends Model
{
    protected $table = 'estado_asistencia';
    protected $primaryKey = 'estado_id';

    protected $fillable = [
        'nombre_estado',
        'tipo_disponibilidad',
        'descripcion',
    ];

    // Relación: Estado -> Asistencias
    public function asistencias()
    {
        return $this->hasMany(Asistencia::class, 'estado_id', 'estado_id');
    }
}
