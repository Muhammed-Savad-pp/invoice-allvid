import { RxCalendar } from "react-icons/rx";
import { forwardRef, useImperativeHandle, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";


const InvoicePDF = forwardRef(({ data }, ref) => {

    const componentRef = useRef(null);

    const invoiceNumber = Math.floor(1000 + Math.random() * 9000);

    const now = new Date();

    const invoiceDate = `${String(now.getDate()).padStart(2, "0")}/${String(
        now.getMonth() + 1
    ).padStart(2, "0")}/${now.getFullYear()}`;

    const invoiceTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const subTotal = Number(data?.payment?.packageTotal || 0) + 
                     Number(data?.payment?.additionalServices || 0) +
                     Number(data?.payment?.travelExpense || 0);

    const balance = subTotal - Number(data?.payment?.advance || 0);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `${data?.client?.name}_${data?.client?.address}`,
    });

    useImperativeHandle(ref, () => ({
        print: handlePrint,
    }))

    if (!data) return null

    return (
        <>
            <div className="bg-gray-200 py-10 print:bg-white print:p-0">

                <div
                    ref={componentRef}
                    className="mx-auto w-[210mm] min-h-[297mm] bg-white shadow-lg print:shadow-none"
                >
                    <div className="p-10">

                        <div className="mt-20 border-b pb-6">
                            <div className="flex flex-col items-center text-center">


                                <h1 className="allvid-title  mt-4 text-4xl font-extrabold  tracking-wide">
                                    ALLVID WEDDING FILMS
                                </h1>

                                <p className="open-sans mt-2 text-sm font-medium text-gray-700">
                                    Kondotty, Malappuram, Kerala
                                </p>

                                <div className="mt-4 flex justify-between items-start w-full max-w-md border-t pt-4 text-sm text-gray-600">
                                    <div className="text-left flex flex-col">
                                        <span className="open-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Us</span>
                                        <span className="mt-1 font-medium text-gray-900">allvidw@gmail.com</span>
                                    </div>

                                    <div className="h-10 w-[1px] bg-gray-200 self-center"></div>

                                    <div className="text-right flex flex-col">
                                        <span className="open-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Us</span>
                                        <span className="mt-1 font-medium text-gray-900">9544067605</span>
                                        <span className="font-medium text-gray-900">9544425714</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-end bg-gray-100 p-4 rounded-lg border border-gray-100">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">
                                        Invoice

                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        <span className="font-semibold text-gray-700">Invoice No :</span> {invoiceNumber}
                                    </p>
                                </div>
                                <div className="text-left text-sm text-gray-500">
                                    <p>
                                        <span className="open-sans font-semibold text-gray-800">Invoice Date :</span> {invoiceDate}
                                    </p>
                                    <p className="mt-1 ">
                                        <span className="open-sans font-semibold text-gray-800">Invoice Time : </span> {invoiceTime}

                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="max-w-md">
                                <h3 className="open-sans text-lg font-bold  pb-1">
                                    Bill To
                                </h3>

                                <div className="open-sans mt-2 space-y-1.5 text-sm text-gray-600">
                                    <p>
                                        <span className=" font-semibold text-gray-800">Customer Name :</span> {data?.client?.name}
                                    </p>

                                    <p>
                                        <span className=" font-semibold text-gray-800">Contact No :</span> {data?.client?.phone}
                                    </p>

                                    <p>
                                        <span className=" font-semibold text-gray-800">Address :</span> {data?.client?.address}
                                    </p>

                                    <p>
                                        <span className=" font-semibold text-gray-800">Email ID :</span> {data?.client?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="page-break"></div>
                        <div className="mt-10">
                            <div className="space-y-16">
                                {data?.programmes.map((event, i) => {

                                    const date = new Date(event.eventDate);

                                    const month = date
                                        .toLocaleString("en-US", { month: 'short' })
                                        .toUpperCase();

                                    const day = date.getDate().toString().padStart(2, "0")

                                    return (

                                        <div key={i} className="border-b border-gray-200 pb-5">

                                            <div className="flex items-center gap-3 text-gray-600">
                                                <RxCalendar size={26} />

                                                <h2 className="text-xl font-bold uppercase">
                                                    {month} - {day}
                                                </h2>
                                            </div>

                                            <h2 className="sequel-content-area-programe mt-6 text-2xl font-bold uppercase">
                                                {event.programmeName.toUpperCase()}
                                                <span className="text-gray-500">
                                                    {" "}
                                                    - {event.side.toUpperCase()} SIDE
                                                </span>
                                            </h2>

                                            <div className="mt-6 space-y-2">
                                                {event.services.map((service, index) => (
                                                    <p
                                                        key={index}
                                                        className="open-sans text-lg text-gray-800"
                                                    >
                                                        {service.service} - {service.quantity}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="page-break"></div>

                        <div className="min-h-[297mm] flex flex-col">
                            <div className="flex-1"></div>
                            <div className="flex justify-end px-10 pb-5 bg-gray-100 rounded-lg">
                                <div className="w-96 p-5">

                                    <div className="space-y-3 text-sm">

                                        <div className=" flex justify-between">
                                            <span className="open-sans font-bold text-gray-600">Package Total</span>
                                            <span className="font-medium">₹ {data?.payment?.packageTotal}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="open-sans font-bold text-gray-600">Additional Services</span>
                                            <span className="font-medium">₹ {data?.payment?.additionalServices}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="open-sans font-bold text-gray-600">Travel Expense</span>
                                            <span className="font-medium">₹ {data?.payment?.travelExpense}</span>
                                        </div>

                                        <div className="border-t pt-3 flex justify-between font-semibold">
                                            <span className="open-sans font-bold">Subtotal</span>
                                            <span>₹{subTotal}</span>
                                        </div>

                                        <div className="flex justify-between font-semibold">
                                            <span className="open-sans font-bold">Advance Paid</span>
                                            <span>- ₹ {data?.payment?.advance}</span>
                                        </div>

                                        <div className="border-t pt-3 flex justify-between text-xl font-bold ">
                                            <span className="open-sans">Balance Due</span>
                                            <span>₹{balance}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="page-break"></div>
                        <div className=" pt-10">

                            <h1 className="sequel-content-area-terms  text-center">
                                Terms & Conditions
                            </h1>

                            <div className="mt-8 space-y-4 text-sm leading-7 text-gray-700">

                                <div>
                                    <h2 className="open-sans font-bold text-md text-base">1. Payment Terms</h2>

                                    <ul className="open-sans list-disc pl-7  ">
                                        <li>A <strong>30% advance payment</strong> is required to confirm the booking.</li>

                                        <li>The remaining <strong>70% of the event coverage charges</strong> must be paid on the event day.</li>

                                        <li>
                                            <strong>If the selected package includes a photo album, the album charges are excluded from the event day payment. The album fee shall be paid at the time of album delivery, and the album will be delivered only after the album payment has been completed.</strong>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-md text-base">2. Booking Confirmation</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>The booking will be confirmed only after the advance payment has been received.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">3. Cancellation Policy</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>The advance payment is non-refundable in the event of cancellation by the client.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">4. Travel, Food & Accommodation</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>Travel expenses, fuel charges, accommodation, and other outstation expenses (if applicable) will be charged additionally.</li>

                                        <li>During the event, the client is responsible for providing food and suitable accommodation for the photography team. Accommodation, where required, should be in a standard air-conditioned room.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">5. Taxes</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>All quoted prices are exclusive of applicable taxes unless otherwise specified.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">6. Photo & Video Selection</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>For packages that include albums, the photographs for album design will be selected by our editing team.</li>

                                        <li>The album preview will be shared with the client for approval. One round of reasonable corrections is included. Additional revisions may incur extra charges.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">7. Album Delivery</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>Album printing will begin only after the final design has been approved and the album payment has been received.</li>

                                        <li>The completed album will be delivered within <strong>5–7 working days</strong>, subject to printing and production timelines.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">8. Digital Deliverables</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>Edited photographs and videos will be delivered digitally through an online gallery or download link, according to the selected package.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">9. Additional Coverage</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>Coverage beyond the agreed event duration will be charged at <strong>₹1,500 per camera for each additional hour</strong>.</li>

                                        <li>Any additional events or services not included in the quotation will be billed separately.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">10. Changes to the Agreement</h2>

                                    <ul className="open-sans list-disc pl-7">
                                        <li>Any changes to the agreed package or services must be made through a revised quotation. Verbal agreements will not be considered valid.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">11. Client Responsibilities</h2>

                                    <ul className="open-sans list-disc pl-7">
                                        <li>Delays in photo selection, album approval, or pending payments from the client's side may affect the delivery schedule. The company shall not be responsible for delays resulting from such circumstances.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">12. Social Media & Promotional Rights</h2>

                                    <ul className="open-sans list-disc pl-7 ">
                                        <li>The client grants the company permission to use selected photographs and videos from the event for portfolio display, advertising, branding, website content, and social media promotion.</li>

                                        <li><strong>The sole discretion to decide which photographs and videos are published on social media or any other promotional platform rests exclusively with the company. The company is under no obligation to publish or share any specific photographs or videos requested by the client.</strong></li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">13. Copyright</h2>

                                    <ul className="open-sans list-disc pl-7">
                                        <li>All photographs, videos, films, and creative content produced by the company remain the intellectual property and copyright of the company unless otherwise agreed in writing.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="open-sans font-bold text-base">14. Limitation of Liability</h2>

                                    <ul className="open-sans list-disc pl-7">
                                        <li>The company shall not be held liable for delays or losses caused by circumstances beyond its reasonable control, including but not limited to natural disasters, severe weather, power failures, equipment malfunction, fire, government restrictions, or any other unforeseen events affecting event coverage, editing, or post-production.</li>
                                    </ul>
                                </div>

                            </div>

                        </div>


                        <div className="mt-20  pt-8 text-center">
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <h3 className="sequel-content-area-terms text-xl font-bold">
                                    Thank You for Choosing Us!
                                </h3>

                                <p className="open-sans mt-4 text-sm leading-7 text-gray-600">
                                    Thank you for choosing <strong>Allvid Wedding Films</strong>.
                                    It is our privilege to capture one of the most memorable days of your life.
                                    We sincerely appreciate your trust and look forward to delivering timeless
                                    memories that you will treasure forever.
                                </p>

                                <p className="mt-4 text-sm text-gray-600">
                                    Follow us on Instagram:{" "}
                                    <a
                                        href="https://www.instagram.com/allvid_wedding_films?igsh=ZzN0N2JmeXVhOTZu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold"
                                    >
                                        @allvid_wedding_films
                                    </a>
                                </p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handlePrint}
                className="mb-5 rounded bg-blue-600 px-5 py-2 text-white"
            >
                Download PDF
            </button>
        </>

    );
});

export default InvoicePDF;