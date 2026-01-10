import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Home,
    Users,
    Shield,
    Calendar,
    FileText,
    Settings,
    BarChart3,
    Bell,
    ChevronLeft,
    ChevronRight,
    LogOut,
    User,
} from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");

    // Menú de navegación
    const menuItems = [
        {
            id: "dashboard",
            label: "Panel de Control",
            icon: Home,
            href: route("dashboard"),
            badge: null,
        },
        {
            id: "personas",
            label: "Personal",
            icon: Users,
            href: route("personas.index"),
            badge: "148",
        },
        {
            id: "asistencias",
            label: "Asistencias",
            icon: Calendar,
            href: "/asistencias",
            badge: "92%",
        },
        {
            id: "jerarquias",
            label: "Jerarquías",
            icon: Shield,
            href: "/jerarquias",
            badge: "8",
        },
        {
            id: "permisos",
            label: "Permisos",
            icon: FileText,
            href: "/permisos",
            badge: "5",
        },
        {
            id: "reportes",
            label: "Reportes",
            icon: BarChart3,
            href: "/reportes",
            badge: "12",
        },
        {
            id: "config",
            label: "Configuración",
            icon: Settings,
            href: "/configuracion",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* 🎯 SIDEBAR VERTICAL IZQUIERDA (Dashboard) */}
            <div
                className={`
                fixed inset-y-0 left-0 z-50
                bg-gray-900 text-white
                transition-all duration-300 ease-in-out
                ${sidebarCollapsed ? "w-20" : "w-64"}
                flex flex-col
            `}
            >
                {/* Logo y Botón Colapsar */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    {!sidebarCollapsed && (
                        <Link href="/" className="flex items-center space-x-3">
                            <ApplicationLogo className="h-8 w-8 text-white" />
                            <span className="text-xl font-bold">
                                Sistema Militar
                            </span>
                        </Link>
                    )}
                    {sidebarCollapsed && (
                        <Link href="/" className="flex justify-center">
                            <ApplicationLogo className="h-8 w-8 text-white" />
                        </Link>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <ChevronLeft className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Menú de Navegación */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    onClick={() => setActiveMenu(item.id)}
                                    className={`
                                        flex items-center px-3 py-2.5 rounded-lg
                                        transition-colors duration-200
                                        ${
                                            activeMenu === item.id
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-800 text-gray-300"
                                        }
                                    `}
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3 flex-1">
                                            {item.label}
                                        </span>
                                    )}
                                    {item.badge && !sidebarCollapsed && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-700 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Separador */}
                    <div className="px-3 py-4">
                        <div className="border-t border-gray-800"></div>
                    </div>

                    {/* Estadísticas Rápidas (solo cuando expandido) */}
                    {!sidebarCollapsed && (
                        <div className="px-3 space-y-3">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Hoy
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-gray-800 p-2 rounded">
                                    <div className="text-sm text-green-400">
                                        Presentes
                                    </div>
                                    <div className="text-lg font-bold">125</div>
                                </div>
                                <div className="bg-gray-800 p-2 rounded">
                                    <div className="text-sm text-red-400">
                                        Ausentes
                                    </div>
                                    <div className="text-lg font-bold">8</div>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Perfil de Usuario */}
                <div className="border-t border-gray-800 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6" />
                        </div>
                        {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        )}
                        {!sidebarCollapsed && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="text-gray-400 hover:text-white">
                                        <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="48">
                                    <Dropdown.Link href={route("profile.edit")}>
                                        <User className="h-4 w-4 mr-2 inline" />
                                        Perfil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <LogOut className="h-4 w-4 mr-2 inline" />
                                        Cerrar Sesión
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div
                className={`
                flex-1 transition-all duration-300 ease-in-out
                ${sidebarCollapsed ? "ml-20" : "ml-64"}
            `}
            >
                {/* Header Superior (opcional) */}
                {header && (
                    <header className="bg-white shadow-sm border-b border-gray-200">
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-900">
                                        {header}
                                    </h1>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date().toLocaleDateString(
                                            "es-ES",
                                            {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button className="relative p-2 text-gray-600 hover:text-gray-900">
                                        <Bell className="h-6 w-6" />
                                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                )}

                {/* Contenido de la Página */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
