<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrigenStatus_3_6_0 extends Model
{
    use HasFactory;

    // 1. Especifica el nombre EXACTO de la tabla
    protected $table = 'origen_status_3_6_0';
    
    // 2. Especifica que la clave primaria se llama 'list'
    protected $primaryKey = 'list';
    
    // 3. Los campos que se pueden llenar (para futuros updates)
    protected $fillable = ['descripcion'];
    
    // 4. Indica que la clave es autoincremental
    public $incrementing = true;
}