import React, { useRef, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import validateForm from "../utils/formValidation";

function Home({ onSubmit }) {

    const invoiceRef = useRef(null)

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({

        client: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },

        payment: {
            packageTotal: "",
            additionalServices: "",
            travelExpense: "",
            advance: "",
        },

        programmes: [
            {
                programmeName: "",
                eventDate: "",
                side: "",
                services: [
                    {
                        service: "",
                        quantity: "",
                    },
                ],
            },
        ],

    })

    const handleClientChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            client: {
                ...prev.client,
                [name]: value,
            },
        }));
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            payment: {
                ...prev.payment,
                [name]: value,
            },
        }));
    };

    const addProgramme = () => {
        setFormData((prev) => ({
            ...prev,
            programmes: [
                ...prev.programmes,
                {
                    programmeName: "",
                    eventDate: "",
                    side: "",
                    services: [
                        {
                            service: "",
                            quantity: "",
                        },
                    ],
                },
            ],
        }));
    };

    const removeProgramme = (index) => {
        setFormData((prev) => ({
            ...prev,
            programmes: prev.programmes.filter((_, i) => i !== index),
        }));
    };

    const handleProgrammeChange = (index, field, value) => {
        setFormData((prev) => {
            const updated = [...prev.programmes];

            updated[index] = {
                ...updated[index],
                [field]: value,
            };

            return {
                ...prev,
                programmes: updated,
            };
        });
    };

    const addService = (programmeIndex) => {
        setFormData((prev) => ({
            ...prev,
            programmes: prev.programmes.map((programme, index) =>
                index === programmeIndex
                    ? {
                        ...programme,
                        services: [
                            ...programme.services,
                            {
                                service: "",
                                quantity: "",
                            },
                        ],
                    }
                    : programme
            ),
        }));
    };

    const handleServiceChange = (
        programmeIndex,
        serviceIndex,
        field,
        value
    ) => {
        setFormData((prev) => {
            const updated = [...prev.programmes];

            updated[programmeIndex].services[serviceIndex] = {
                ...updated[programmeIndex].services[serviceIndex],
                [field]: value,
            };

            return {
                ...prev,
                programmes: updated,
            };
        });
    };

    const removeService = (programmeIndex, serviceIndex) => {
        setFormData((prev) => ({
            ...prev,
            programmes: prev.programmes.map((programme, index) =>
                index === programmeIndex
                    ? {
                        ...programme,
                        services: programme.services.filter(
                            (_, i) => i !== serviceIndex
                        ),
                    }
                    : programme
            ),
        }));
    };


    const handleFormSubmit = (e) => {

        e.preventDefault();

        const validationErrors = validateForm(formData);
        console.log(validationErrors);
        

        if (Object.keys(validationErrors).length > 0) {
            
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        onSubmit(formData)

    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Event Information
                </h1>

                <form className="space-y-8 mt-5" onSubmit={handleFormSubmit}>
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
                            Client Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">Client Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.client.name}
                                    onChange={handleClientChange}
                                    placeholder="Enter Client name"
                                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1 ml-1">
                                        {errors.name}
                                    </p>
                                )

                                }
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.client.email}
                                    onChange={handleClientChange}
                                    placeholder="Enter email"
                                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1 ml-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.client.phone}
                                    onChange={handleClientChange}
                                    placeholder="Enter phone"
                                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1 ml-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.client.address}
                                    onChange={handleClientChange}
                                    placeholder="Enter address"
                                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1 ml-1">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Programme Details
                            </h2>

                            <button
                                type="button"
                                onClick={addProgramme}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                            >
                                <FiPlus size={18} />
                                Add Programme
                            </button>
                        </div>

                        <div className="space-y-6">
                            {formData.programmes.map((programme, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 border border-gray-200 rounded-2xl shadow-sm p-6"
                                >
                                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            Programme {index + 1}
                                        </h3>

                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeProgramme(index)}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                            >
                                                <FiTrash2 size={18} />
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <div>
                                            <label className="block mb-2 font-medium">
                                                Programme Name
                                            </label>

                                            <select
                                                value={programme.programmeName}
                                                onChange={(e) => handleProgrammeChange(
                                                    index,
                                                    "programmeName",
                                                    e.target.value
                                                )}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3" name="" id=""
                                            >
                                                <option value="">Select Programme</option>
                                                <option value="wedding">Wedding</option>
                                                <option value="save the date">Save The Date</option>
                                                <option value="nikkah">Nikkah</option>
                                                <option value="day night">Day Night</option>
                                                <option value="wedding reception">Wedding Reception</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-medium">
                                                Event Date
                                            </label>

                                            <input
                                                type="date"
                                                value={programme.eventDate}
                                                onChange={(e) =>
                                                    handleProgrammeChange(
                                                        index,
                                                        "eventDate",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                            />
                                            {errors[`eventDate${index}`] && (
                                                <p className="text-red-500 text-sm mt-1 ml-1">
                                                    {errors[`eventDate${index}`]}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-medium">
                                                Side
                                            </label>

                                            <select
                                                value={programme.side}
                                                onChange={(e) =>
                                                    handleProgrammeChange(
                                                        index,
                                                        'side',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                            >
                                                <option value="">Select Side</option>
                                                <option value="Bride">Bride</option>
                                                <option value="Groom">Groom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-6 bg-white p-3 rounded-lg">
                                        <div className="flex justify-between items-center mb-4 border-b pb-3 ">
                                            <h3 className="text-lg font-semibold">
                                                Services
                                            </h3>

                                            <button
                                                type="button"
                                                onClick={() => addService(index)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                            >
                                                + Add Service
                                            </button>
                                        </div>

                                        {programme.services.map((service, serviceIndex) => (
                                            <div
                                                key={serviceIndex}
                                                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                                            >
                                                <div className="md:col-span-2">
                                                    <label className="block mb-2 font-medium">
                                                        Service
                                                    </label>

                                                    <input
                                                        type="text"
                                                        placeholder="Enter service"
                                                        value={service.service}
                                                        onChange={(e) =>
                                                            handleServiceChange(
                                                                index,
                                                                serviceIndex,
                                                                "service",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                                    />
                                                    {errors[`service${index}${serviceIndex}`] && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors[`service${index}${serviceIndex}`]}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block mb-2 font-medium">
                                                        Quantity
                                                    </label>

                                                    <input
                                                        type="number"
                                                        placeholder="1"
                                                        min={1}
                                                        value={service.quantity}
                                                        onChange={(e) =>
                                                            handleServiceChange(
                                                                index,
                                                                serviceIndex,
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                                    />
                                                </div>

                                                {serviceIndex > 0 && (
                                                    <div className="md:col-span-3 flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeService(index, serviceIndex)}
                                                            className="text-red-600 font-medium"
                                                        >
                                                            Remove Service
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">Payment Information</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gray-100 border border-gray-200 rounded-2xl shadow-sm p-6 mt-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-medium mb-2">Package Total</label>
                                        <input
                                            name="packageTotal"
                                            value={formData.payment.packageTotal}
                                            onChange={handlePaymentChange}
                                            placeholder="Enter Package Total "
                                            type="text"
                                            className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                        />
                                        {errors.packageTotal && (
                                            <p className="text-red-500 text-sm mt-1 ml-1">
                                                {errors.packageTotal}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">Additional Services</label>
                                        <input
                                            name="additionalServices"
                                            value={formData.payment.additionalServices}
                                            onChange={handlePaymentChange}
                                            placeholder="Enter Additional Services"
                                            type="text"
                                            className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                        />
                                        {errors.additionalServices && (
                                            <p className="text-red-500 text-sm mt-1 ml-1">
                                                {errors.additionalServices}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">Travel Expense</label>
                                        <input
                                            name="travelExpense"
                                            value={formData.payment.travelExpense}
                                            onChange={handlePaymentChange}
                                            placeholder="Enter Travel Expense"
                                            type="text"
                                            className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                        />
                                        {errors.travelExpense && (
                                            <p className="text-red-500 text-sm mt-1 ml-1">
                                                {errors.travelExpense}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">Advance</label>
                                        <input
                                            name="advance"
                                            value={formData.payment.advance}
                                            onChange={handlePaymentChange}
                                            placeholder="Enter Advance"
                                            type="text"
                                            className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                                        />
                                        {errors.advance && (
                                            <p className="text-red-500 text-sm mt-1 ml-1">
                                                {errors.advance}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;