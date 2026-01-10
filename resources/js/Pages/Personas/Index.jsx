import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Users,
    UserPlus,
    Edit,
    Trash2,
    Eye,
    Search,
    Filter,
    Download,
    MoreVertical,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { useState } from "react";

export default function Index({ auth, personas }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const destroy = (id) => {
        if (confirm("¿Está seguro de que desea eliminar esta persona?")) {
            router.delete(`/personas/${id}`);
        }
    };

    const filteredPersonas = personas.data.filter(
        (persona) =>
            persona.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
            persona.apellidos
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            persona.cedula.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Gestión de Personas
                            </h2>
                            <p className="text-sm text-gray-600">
                                Total de personas: {personas.total}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Personal" />

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header con búsqueda y acciones */}
                <div className="p-6 border-b">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, apellido o cédula..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                <Download className="w-4 h-4" />
                                Exportar
                            </button>
                            <Link
                                href="/personas/create"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <UserPlus className="w-4 h-4" />
                                Agregar Nuevo
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tabla de personas */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Personal
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Información
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPersonas.map((persona) => (
                                <tr
                                    key={persona.persona_id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Users className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {persona.nombres}{" "}
                                                    {persona.apellidos}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ID: {persona.persona_id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">
                                                    Cédula:
                                                </span>{" "}
                                                {persona.cedula}
                                            </div>
                                            {persona.telefono && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span className="font-medium">
                                                        Tel:
                                                    </span>{" "}
                                                    {persona.telefono}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                persona.activo
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {persona.activo ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3" />
                                                    Activo
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-3 h-3" />
                                                    Inactivo
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/personas/${persona.persona_id}`}
                                                className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded"
                                                title="Ver detalles"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/personas/${persona.persona_id}/edit`}
                                                className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded"
                                                title="Editar"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    destroy(persona.persona_id)
                                                }
                                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer con paginación */}
                {personas.links && (
                    <div className="px-6 py-4 border-t">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Mostrando {filteredPersonas.length} de{" "}
                                {personas.total} personas
                            </div>
                            <div className="flex gap-2">
                                {Object.entries(personas.links).map(
                                    ([key, link]) =>
                                        link.url && (
                                            <Link
                                                key={key}
                                                href={link.url}
                                                className={`px-3 py-1 rounded ${
                                                    link.active
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {filteredPersonas.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No se encontraron personas
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {searchTerm
                            ? "Intenta con otro término de búsqueda"
                            : "Comienza creando una nueva persona"}
                    </p>
                    {!searchTerm && (
                        <Link
                            href="/personas/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <UserPlus className="w-4 h-4" />
                            Crear primera persona
                        </Link>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
