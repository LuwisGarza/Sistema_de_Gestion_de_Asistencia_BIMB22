import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import {
    User,
    UserCircle,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Check,
    ArrowRight,
    UserPlus,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registro de Usuario" />

            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    {/* Card de Registro */}
                    <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
                        {/* Header */}
                        <div className="card-header bg-black bg-gradient text-white py-4">
                            <div className="text-center">
                                {/*centrar icono*/}
                                <div className="d-flex flex-column align-items-center">
                                    <UserPlus className="mb-3" size={40} />
                                </div>
                                <h2 className="h3 mb-2 fw-bold">
                                    Crear Cuenta
                                </h2>
                                <p className="mb-0 opacity-75 small">
                                    Registrate si es tu primera vez aquÍ
                                </p>
                            </div>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={submit}>
                                {/* Nombre Completo */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="form-label fw-medium"
                                    >
                                        Nombre Completo
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <User
                                                size={20}
                                                className="text-muted"
                                            />
                                        </span>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className={`form-control ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
                                            autoComplete="name"
                                            autoFocus={true}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Ej: Juan Pérez"
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="invalid-feedback d-block mt-1">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                {/* Nombre de Usuario */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="form-label fw-medium"
                                    >
                                        Nombre de Usuario
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <UserCircle
                                                size={20}
                                                className="text-muted"
                                            />
                                        </span>
                                        <input
                                            id="username"
                                            type="text"
                                            name="username"
                                            value={data.username}
                                            className={`form-control ${
                                                errors.username
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ej: juanperez"
                                            required
                                        />
                                    </div>
                                    {errors.username && (
                                        <div className="invalid-feedback d-block mt-1">
                                            {errors.username}
                                        </div>
                                    )}
                                </div>

                                {/* Correo Electrónico */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="form-label fw-medium"
                                    >
                                        Correo Electrónico
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <Mail
                                                size={20}
                                                className="text-muted"
                                            />
                                        </span>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className={`form-control ${
                                                errors.email ? "is-invalid" : ""
                                            }`}
                                            autoComplete="email"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="Ej: juan@ejemplo.com"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <div className="invalid-feedback d-block mt-1">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                {/* Contraseña */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="form-label fw-medium"
                                    >
                                        Contraseña
                                    </label>
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
                                            className={`form-control ${
                                                errors.password
                                                    ? "is-invalid"
                                                    : ""
                                            } border-start-0`}
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Mínimo 8 caracteres"
                                            required
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
                                        <div className="invalid-feedback d-block mt-1">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                {/* Confirmar Contraseña */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="form-label fw-medium"
                                    >
                                        Confirmar Contraseña
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <Lock
                                                size={20}
                                                className="text-muted"
                                            />
                                        </span>
                                        <input
                                            id="password_confirmation"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className={`form-control ${
                                                errors.password_confirmation
                                                    ? "is-invalid"
                                                    : ""
                                            } border-start-0`}
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Repite tu contraseña"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="input-group-text bg-light border-start-0"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                )
                                            }
                                            title={
                                                showConfirmPassword
                                                    ? "Ocultar contraseña"
                                                    : "Mostrar contraseña"
                                            }
                                        >
                                            {showConfirmPassword ? (
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
                                    {errors.password_confirmation && (
                                        <div className="invalid-feedback d-block mt-1">
                                            {errors.password_confirmation}
                                        </div>
                                    )}
                                </div>

                                {/* Requisitos de Contraseña */}
                                <div className="alert alert-light border mb-4">
                                    <h6 className="fw-bold mb-2">
                                        Tu contraseña debe incluir:
                                    </h6>
                                    <ul className="mb-0 small">
                                        <li>Mínimo 8 caracteres</li>
                                        <li>Letras mayúsculas y minúsculas</li>
                                        <li>Al menos un número</li>
                                        <li>
                                            Un carácter especial, ejemplo:
                                            @$!%*?&
                                        </li>
                                    </ul>
                                </div>

                                {/* Botón de Registro */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-50 py-3 fw-bold mb-0 center-block d-block mx-auto rounded-pill"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2 rounded-pill"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Creando cuenta...
                                        </>
                                    ) : (
                                        <>Crear Cuenta</>
                                    )}
                                </button>

                                {/* Enlace a Login */}
                                <div className="text-center mt-4 pt-3 border-top">
                                    <p className="text-muted mb-2">
                                        ¿Ya tienes una cuenta?
                                    </p>
                                    <Link
                                        href={route("login")}
                                        className="btn btn-outline-primary btn-sm d-inline-flex align-items-center"
                                    >
                                        Iniciar Sesión
                                        <ArrowRight
                                            className="ms-2"
                                            size={16}
                                        />
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estilos adicionales */}
            <style jsx>{`
                .card {
                    transition:
                        transform 0.6s ease,
                        box-shadow 0.6s ease;
                }
                .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
                }
                .input-group-text {
                    transition: all 0.2s ease;
                }
                .form-control:focus {
                    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
                    border-color: #86b7fe;
                }
                .btn-primary {
                    background: linear-gradient(
                        135deg,
                        #6c7985 0%,
                        #212529 100%
                    );
                    border: none;
                    transition: all 0.3s ease;
                }
                .btn-primary:hover:not(:disabled) {
                    background: linear-gradient(
                        135deg,
                        #0b5ed7 0%,
                        #0a58ca 100%
                    );
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
                }
                .btn-primary:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }
                .btn-outline-primary:hover {
                    transform: translateY(-1px);
                }
                .alert-light {
                    background-color: #f8f9fa;
                }
            `}</style>
        </GuestLayout>
    );
}
