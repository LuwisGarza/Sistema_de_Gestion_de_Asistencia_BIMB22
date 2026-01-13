import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    {/* Card de Login */}
                    <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
                        {/* Header con fondo */}
                        <div className="card-header bg-dark text-white py-4">
                            <div className="text-center">
                                <h2 className="h3 mb-2 fw-bold">
                                    Sistema de Gestión de asistencias
                                </h2>

                                <p className="mb-0 opacity-90">
                                    Personal disponible e indisponible.
                                </p>
                            </div>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {/* Mensaje de estado */}
                            {status && (
                                <div
                                    className="alert alert-success alert-dismissible fade show mb-4"
                                    role="alert"
                                >
                                    {status}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}

                            <form onSubmit={submit}>
                                {/* Campo Usuario */}
                                <div className="mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <User
                                                size={20}
                                                className="text-muted"
                                            />
                                        </span>
                                        <input
                                            id="username"
                                            type="text"
                                            name="username"
                                            value={data.username}
                                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                            autoComplete="username"
                                            autoFocus={true}
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ingresa tu usuario"
                                        />
                                    </div>
                                    {errors.username && (
                                        <div className="invalid-feedback d-block">
                                            {errors.username}
                                        </div>
                                    )}
                                </div>

                                {/* Campo Contraseña */}
                                <div className="mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <Lock
                                                size={20}
                                                className="text-muted"
                                            />
                                        </span>
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={data.password}
                                            className={`form-control ${errors.password ? "is-invalid" : ""} border-start-1`}
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ingresa tu contraseña"
                                        />
                                        <button
                                            type="button"
                                            className="input-group-text bg-light border-start-0"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            title={
                                                showPassword
                                                    ? "Ocultar contraseña"
                                                    : "Mostrar contraseña"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff
                                                    size={20}
                                                    className="text-muted"
                                                />
                                            ) : (
                                                <Eye
                                                    size={20}
                                                    className="text-muted"
                                                />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <div className="invalid-feedback d-block">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                {/* Recordarme y Olvidé contraseña */}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-decoration-none small text-primary"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    )}
                                </div>

                                {/* Botón de Iniciar Sesión */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-50 py-3 fw-bold mb-0 center-block d-block mx-auto rounded-pill"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        "Iniciar Sesión"
                                    )}
                                </button>

                                {/* Mensaje de bienvenida */}
                                <div className="text-center mt-4 pt-3 border-top border-secondary">
                                    <p className="text-muted small mb-0">
                                        Bienvenido al sistema de gestión de
                                        asistencias
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="text-center mt-4">
                        <p className="text-muted small">
                            Sistema desarrollado con Laravel, Inertia.js y React
                        </p>
                    </div>
                </div>
            </div>

            {/* Estilos adicionales */}
            <style jsx>{`
                .card {
                    transition: transform 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                }

                .input-group-text {
                    transition: all 0.2s ease;
                }

                .form-control:focus {
                    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
                }

                .btn-primary {
                    background: linear-gradient(
                        135deg,
                        #0d6efd 0%,
                        #0b5ed7 100%
                    );
                    border: none;
                    transition: all 0.3s ease;
                }

                .btn-primary:hover {
                    background: linear-gradient(
                        135deg,
                        #0b5ed7 0%,
                        #0a58ca 100%
                    );
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.25);
                }

                .btn-primary:disabled {
                    opacity: 0.65;
                    transform: none !important;
                }
            `}</style>
        </GuestLayout>
    );
}
