/**
 * Spinner.tsx
 *
 * Componente de spinner de carga reutilizable para la aplicación Boost A Project.
 * Proporciona feedback visual durante operaciones asíncronas (login, registro, envío de formularios).
 * Utiliza los colores de la marca para mantener consistencia visual en toda la aplicación.
 */

const Spinner = ({ size = 20, color = "white" }) => {
    const getColorClass = () => {
        if (color === "primary") return "border-[#1A1341] border-t-transparent";
        if (color === "secondary") return "border-[#6290C3] border-t-transparent";
        return "border-white border-t-transparent";
    };

    return (
        <div
            className={`border-2 rounded-full animate-spin ${getColorClass()}`}
            style={{ width: size, height: size }}
        />
    );
};

export default Spinner;