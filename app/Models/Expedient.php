<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expedient extends Model
{
    protected $fillable = [
        'nombre',
        'identificacion',
        'origen_status_id',
        'notas',
    ];
}