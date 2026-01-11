<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PersonaController extends Controller
{
    public function index()
    {
        $personas = Persona::whereNull('deleted_at')->paginate(10);

        // Calcular estadísticas básicas
        $stats = [
            'total' => Persona::whereNull('deleted_at')->count(),
            'activas' => Persona::whereNull('deleted_at')->where('activo', true)->count(),
            'inactivas' => Persona::whereNull('deleted_at')->where('activo', false)->count(),
        ];

        return Inertia::render('Personas/Index', [
            'personas' => $personas,
            'stats' => $stats, // ← Agregar esto
        ]);
    }

    public function create()
    {
        return Inertia::render('Personas/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:180',
            'apellidos' => 'required|string|max:180',
            'cedula' => [
                'nullable', // Cambiado a nullable
                'string',
                'max:13',
                // Validar unicidad solo en registros NO eliminados
                Rule::unique('persona', 'cedula')->where(function ($query) {
                    return $query->whereNull('deleted_at');
                }),
            ],
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
            'rango_militar' => 'nullable|string|max:100', // Agregado
        ]);

        Persona::create(array_merge($validated, [
            'activo' => true,
        ]));

        return redirect()->route('personas.index')
            ->with('success', 'Persona creada exitosamente.');
    }

    public function edit(Persona $persona)
    {
        return Inertia::render('Personas/Edit', [
            'persona' => $persona,
        ]);
    }

    public function update(Request $request, Persona $persona)
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:180',
            'apellidos' => 'required|string|max:180',
            'cedula' => [
                'nullable', // Cambiado a nullable
                'string',
                'max:13',
                // Validar unicidad solo en registros NO eliminados, excluyendo esta persona
                Rule::unique('persona', 'cedula')
                    ->where(function ($query) {
                        return $query->whereNull('deleted_at');
                    })
                    ->ignore($persona->persona_id, 'persona_id'),
            ],
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
            'rango_militar' => 'nullable|string|max:100', // Agregado
            'activo' => 'boolean',
        ]);

        $persona->update($validated);

        return redirect()->route('personas.index')
            ->with('success', 'Persona actualizada exitosamente.');
    }

    public function destroy(Persona $persona)
    {
        $persona->delete(); // soft delete

        return redirect()->route('personas.index')
            ->with('success', 'Persona eliminada exitosamente.');
    }

    // Método opcional para obtener estadísticas generales
    public function estadisticas()
    {
        $total = Persona::whereNull('deleted_at')->count();
        $activas = Persona::whereNull('deleted_at')->where('activo', true)->count();
        $inactivas = Persona::whereNull('deleted_at')->where('activo', false)->count();

        return response()->json([
            'total' => $total,
            'activas' => $activas,
            'inactivas' => $inactivas,
            'porcentajeActivas' => $total > 0 ? round(($activas / $total) * 100, 2) : 0,
        ]);
    }
}
