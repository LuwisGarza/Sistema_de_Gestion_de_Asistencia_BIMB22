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

        return Inertia::render('Personas/Index', [
            'personas' => $personas,
            // NOTA: Ya NO enviamos 'stats' aquí
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
                'nullable',
                'string',
                'max:13',
                Rule::unique('persona', 'cedula')->where(function ($query) {
                    return $query->whereNull('deleted_at');
                }),
            ],
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
            'rango_militar' => 'nullable|string|max:100',
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
                'nullable',
                'string',
                'max:13',
                Rule::unique('persona', 'cedula')
                    ->where(function ($query) {
                        return $query->whereNull('deleted_at');
                    })
                    ->ignore($persona->persona_id, 'persona_id'),
            ],
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
            'rango_militar' => 'nullable|string|max:100',
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

    // Mantenemos este método por si necesitas una API para estadísticas
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
