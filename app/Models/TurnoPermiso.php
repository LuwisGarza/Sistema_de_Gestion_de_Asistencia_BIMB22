<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TurnoPermiso extends Model
{
    protected $table = 'turno_permiso';
    protected $primaryKey = 'turno_permiso_id';

    protected $fillable = [
        'tipo_permiso',
        'unidad',
        'fecha_inicio',
        'fecha_fin',
        'cupo_maximo',
        'cupo_actual',
    ];

    // Relación: TurnoPermiso -> DetalleIndisponibilidad
    public function detalleIndisponibilidad()
    {
        return $this->hasMany(DetalleIndisponibilidad::class, 'turno_permiso_id', 'turno_permiso_id');
    }
}
