import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Users,
    Calendar,
    Shield,
    FileText,
    TrendingUp,
    AlertCircle,
    Clock,
    CheckCircle,
} from "lucide-react";

export default function Dashboard({ auth }) {
    // Tarjetas de estadísticas
    const statCards = [
        {
            title: "Personal Total",
            value: "2",
            change: "+2 este mes",
            icon: Users,
            color: "bg-blue-500",
            href: "/personas",
        },
        {
            title: "Asistencia Hoy",
            value: "92%",
            change: "+3% vs ayer",
            icon: Calendar,
            color: "bg-green-500",
            href: "/asistencias",
        },
        {
            title: "Disponibles",
            value: "135",
            change: "91% del total",
            icon: Shield,
            color: "bg-emerald-500",
            href: "/personas?activo=1",
        },
        {
            title: "Permisos",
            value: "5",
            change: "2 por terminar",
            icon: FileText,
            color: "bg-amber-500",
            href: "/permisos",
        },
    ];

    // Actividades recientes
    const recentActivities = [
        {
            time: "Hace 5 min",
            action: "Sargento García registró asistencia",
            user: "Luis García",
            type: "success",
        },
        {
            time: "Hace 15 min",
            action: "Nueva persona agregada",
            user: "Carlos Pérez",
            type: "info",
        },
        {
            time: "Hace 1 hora",
            action: "Permiso aprobado para Rodríguez",
            user: "Ana Rodríguez",
            type: "warning",
        },
        {
            time: "Hace 2 horas",
            action: "Reporte mensual generado",
            user: "Sistema",
            type: "info",
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user} header="Panel de Control">
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* 🎯 Tarjetas de Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.href}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        {card.title}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {card.value}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {card.change}
                                    </p>
                                </div>
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <card.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 📊 Gráfico de Asistencia (Placeholder) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Asistencia Semanal
                        </h3>
                        <Link
                            href="/asistencias"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            Ver detalles →
                        </Link>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">
                                Gráfico de asistencia semanal
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                (Se integrará con datos reales)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* ⚠️ Alertas y Recordatorios */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                            Alertas del Sistema
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start p-3 bg-red-50 border border-red-100 rounded-lg">
                                <div className="bg-red-100 p-2 rounded mr-3">
                                    <Users className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-red-800">
                                        Datos incompletos
                                    </h4>
                                    <p className="text-sm text-red-600 mt-1">
                                        3 personas sin datos militares completos
                                    </p>
                                    <Link
                                        href="/datos-militares"
                                        className="text-red-700 text-sm mt-2 inline-block"
                                    >
                                        Completar ahora →
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-start p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="bg-blue-100 p-2 rounded mr-3">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-800">
                                        Documentos por vencer
                                    </h4>
                                    <p className="text-sm text-blue-600 mt-1">
                                        5 documentos vencen este mes
                                    </p>
                                    <Link
                                        href="/documentos"
                                        className="text-blue-700 text-sm mt-2 inline-block"
                                    >
                                        Revisar →
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-start p-3 bg-green-50 border border-green-100 rounded-lg">
                                <div className="bg-green-100 p-2 rounded mr-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-green-800">
                                        Cumpleaños hoy
                                    </h4>
                                    <p className="text-sm text-green-600 mt-1">
                                        Sargento García cumple años hoy
                                    </p>
                                    <Link
                                        href="/personas/1"
                                        className="text-green-700 text-sm mt-2 inline-block"
                                    >
                                        Felicitar →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 📝 Actividad Reciente */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Actividad Reciente
                        </h3>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                                >
                                    <div
                                        className={`p-2 rounded mr-3 ${
                                            activity.type === "success"
                                                ? "bg-green-100"
                                                : activity.type === "warning"
                                                ? "bg-amber-100"
                                                : "bg-blue-100"
                                        }`}
                                    >
                                        {activity.type === "success" && (
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        )}
                                        {activity.type === "warning" && (
                                            <AlertCircle className="h-4 w-4 text-amber-600" />
                                        )}
                                        {activity.type === "info" && (
                                            <FileText className="h-4 w-4 text-blue-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900">
                                            {activity.action}
                                        </p>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-gray-500">
                                                {activity.user}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/actividad"
                            className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block"
                        >
                            Ver toda la actividad →
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
