// resources/js/Pages/Expedients/Create.jsx
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Layout de Breeze

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: "",
        identificacion: "",
        origen_status_3_6_0_list: 1, // 1 = Disponible por defecto
        notas: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("expedients.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Crear Nuevo Personal" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Registrar Nuevo Personal
                            </h2>
                            <Link
                                href={route("expedients.index")}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                ← Volver al Listado
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campo: Nombre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) =>
                                        setData("nombre", e.target.value)
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    required
                                />
                                {errors.nombre && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.nombre}
                                    </p>
                                )}
                            </div>

                            {/* Campo: Identificación */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Número de Identificación *
                                </label>
                                <input
                                    type="text"
                                    value={data.identificacion}
                                    onChange={(e) =>
                                        setData(
                                            "identificacion",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    required
                                />
                                {errors.identificacion && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.identificacion}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Observaciones / Notas
                                </label>
                                <textarea
                                    value={data.notas}
                                    onChange={(e) =>
                                        setData("notas", e.target.value)
                                    }
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <Link
                                    href={route("expedients.index")}
                                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Guardando..."
                                        : "Guardar Personal"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
