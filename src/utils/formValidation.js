const validateForm = (formData) => {

    const errors = {};

    if (!formData.client.name.trim()) {
        errors.name = "Client name is required";
    }

    if (!formData.client.email.trim()) {
        errors.email = "Email is required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.client.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!formData.client.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.client.phone)) {
        errors.phone = "Enter a valid phone number";
    }

    if (!formData.client.address.trim()) {
        errors.address = "Address is required";
    }

    if (!formData.payment.packageTotal) {
        errors.packageTotal = "Package total is required";
    };

    if(!formData.payment.additionalServices) {
        errors.additionalServices = "AdditionalServices is required";
    };

    if(!formData.payment.travelExpense) {
        errors.travelExpense = "TravelExpense is required";
    };

    if (!formData.payment.advance) {
        errors.advance = "Advance is required";
    };

    formData.programmes.forEach((programme, programmeIndex) => {
        if (!programme.programmeName) {
            errors[`programmeName${programmeIndex}`] =
                "Programme is required";
        }

        if (!programme.eventDate) {
            errors[`eventDate${programmeIndex}`] =
                "Event date is required";
        }

        if (!programme.side) {
            errors[`side${programmeIndex}`] =
                "Select Bride or Groom";
        }

        // Services Validation
        programme.services.forEach((service, serviceIndex) => {
            if (!service.service.trim()) {
                errors[
                    `service${programmeIndex}${serviceIndex}`
                ] = "Service name is required";
            }

            if (!service.quantity) {
                errors[
                    `quantity${programmeIndex}${serviceIndex}`
                ] = "Quantity is required";
            }
        });
    });

    return errors
}

export default validateForm;