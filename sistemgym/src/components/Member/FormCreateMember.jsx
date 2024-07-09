import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newMember } from "../../redux/actions/actions";

const FormCreateMember = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        password: "",
        dni: "",
        email: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});
    const member = useSelector(state => state.members.member);
    const dispatch = useDispatch();

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validar el campo que cambia
        if (name === "name") {
            if (!value) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "Name is required" }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        } else if (name === "lastname") {
            if (!value) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "Lastname is required" }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        } else if (name === "password") {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            if (!value) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "Password is required" }));
            } else if (!passwordRegex.test(value)) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
                }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        } else if (name === "dni") {
            if (!value) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "DNI is required" }));
            } else if (!/^\d+$/.test(value)) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "DNI must be a number" }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        } else if (name === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!value) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "Email is required" }));
            } else if (!emailRegex.test(value)) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "Invalid email format" }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        } else if (name === "phone") {
            if (!value) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "Phone is required" }));
            } else if (!/^\d+$/.test(value)) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: "Phone must be a number" }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valida el formulario
        const isValid = Object.values(errors).every(error => error === undefined);
        if (!isValid) return;

        try {
            // Enviar datos al servidor
            dispatch(newMember(formData));
            console.log(`Create a new Member ${member}`);
        } catch (error) {
            console.error("Error creating member:", error.message);
        }
    };

    return (
        <form className="text-center" onSubmit={handleSubmit}>
            <h1 className="text-4xl text-gray-500 p-2 mb-6 font-semibold">
                Create New Member
            </h1>
            <div className="flex flex-row gap-4">
                <div className="mb-4 flex flex-col w-64">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className={`border mt-2 focus:bg-gray-100 px-2 py-2 rounded-md ${errors.name ? 'border-red-500' : ''}`}
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleChange} // Validar cuando se pierda el foco
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-4 flex flex-col w-64">
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        type="text"
                        className={`border mt-2 focus:bg-gray-100 px-2 py-2 rounded-md ${errors.lastname ? 'border-red-500' : ''}`}
                        name="lastname"
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        onBlur={handleChange} // Validar cuando se pierda el foco
                    />
                    {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
                </div>
            </div>

            <div className="flex flex-row gap-4">
                <div className="mb-4 flex flex-col w-64">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className={`border mt-2 focus:bg-gray-100 px-2 py-2 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleChange} // Validar cuando se pierda el foco
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div className="mb-4 flex flex-col w-64">
                    <label htmlFor="dni">DNI</label>
                    <input
                        type="text"
                        className={`border mt-2 focus:bg-gray-100 px-2 py-2 rounded-md ${errors.dni ? 'border-red-500' : ''}`}
                        name="dni"
                        id="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        onBlur={handleChange} // Validar cuando se pierda el foco
                    />
                    {errors.dni && <p className="text-red-500">{errors.dni}</p>}
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="mb-4 flex flex-col w-64">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className={`border mt-2 focus:bg-gray-100 px-2 py-2 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleChange} // Validar cuando se pierda el foco
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="mb-4 flex flex-col w-64">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className={`border mt-2 focus:bg-gray-100 px-2 py-2 rounded-md ${errors.phone ? 'border-red-500' : ''}`}
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleChange} // Validar cuando se pierda el foco
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>
            </div>
            <button type="submit" className="w-full p-2 bg-green-500 text-gray-100 rounded-lg">
                Crear
            </button>
        </form>
    );
};

export default FormCreateMember;
