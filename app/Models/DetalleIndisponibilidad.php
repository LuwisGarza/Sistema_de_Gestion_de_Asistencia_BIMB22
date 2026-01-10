<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleIndisponibilidad extends Model
{
    protected $table = 'detalle_indisponibilidad';
    protected $primaryKey = 'detalle_id';

    protected $fillable = [
        'asistencia_id',
        'tipo_indisponibilidad',
        'descripcion',
        'fecha_inicio',
        'fecha_fin_estimada',
        'turno_permiso_id',
    ];

    // Relaciones
    public function asistencia()
    {
        return $this->belongsTo(Asistencia::class, 'asistencia_id', 'asistencia_id');
    }

    public function turnoPermiso()
    {
        return $this->belongsTo(TurnoPermiso::class, 'turno_permiso_id', 'turno_permiso_id');
    }
}
