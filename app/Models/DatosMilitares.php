<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DatosMilitares extends Model
{
    protected $table = 'datos_militares';
    protected $primaryKey = 'militar_id';

    protected $fillable = [
        'persona_id',
        'grado_id',
        'matricula',
        'cargo_resolucion',
        'fecha_fin_servicio',
    ];

    // Relaciones
    public function persona()
    {
        return $this->belongsTo(Persona::class, 'persona_id', 'persona_id');
    }

    public function jerarquia()
    {
        return $this->belongsTo(JerarquiaMilitar::class, 'grado_id', 'grado_id');
    }
}
