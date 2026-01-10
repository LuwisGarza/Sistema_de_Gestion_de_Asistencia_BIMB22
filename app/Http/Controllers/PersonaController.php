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
        return Inertia::render('Personas/Index', [
            'personas' => Persona::paginate(10),
            
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
            'cedula' => 'required|string|max:13|unique:persona,cedula',
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
        ]);

        Persona::create(array_merge($validated, [
            'activo' => true, // por defecto activo al crear
        ]));

        return redirect()->route('personas.index');
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
                'required',
                'string',
                'max:13',
                Rule::unique('persona')->ignore($persona->persona_id, 'persona_id'),
            ],
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
            'activo' => 'boolean',
        ]);

        $persona->update($validated);

        return redirect()->route('personas.index');
    }

    public function destroy(Persona $persona)
    {
        $persona->delete(); // soft delete

        return redirect()->route('personas.index');
    }
}
