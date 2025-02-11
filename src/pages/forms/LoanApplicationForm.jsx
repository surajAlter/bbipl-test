import { useState } from 'react';

export default function LoanApplicationForm() {
    const [maritalStatus, setMaritalStatus] = useState("N");
    const [showSpouseInfo, setShowSpouseInfo] = useState(false);
    const [rentalStatus, setRentalStatus] = useState("N");
    const [showRentalInfo, setShowRentalInfo] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = {};

        formData.forEach((value, key) => {
            if (key === "yearsPresent" || key === "yearsCity" || key === "loanAmount" || key === "salary" || key === "rentalAmount" || key === "yearsEmployed" || key === "yearsTotalEmployed") {
                value = isNaN(value) ? value : Number(value);
            }

            formObject[key] = value;
        });

        console.log(formObject);

        // Send form data to the server
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/loan-forms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject), // Send data as JSON
            });

            if (response.ok) {
                // Reset the form fields
                e.target.reset();

                // Reset conditional fields' state
                setMaritalStatus("N");
                setShowSpouseInfo(false);
                setRentalStatus("N");
                setShowRentalInfo(false);

                // Show success alert
                alert('Form submitted successfully!');
            } else {
                // Show error alert if the response is not OK
                alert('Failed to submit form!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Show error alert if there's an exception
            alert('Error submitting form!');
        }
    };

    return (
        <div className="min-h-screen p-4 bg">
            <div className="max-w-3xl mx-auto bg-zinc-200 p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-center mb-6">Loan Application Form</div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Details */}
                    <div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                                <input id="customerName" name="customerName" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input id="dateOfBirth" name="dateOfBirth" type="date" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
                                <input id="fatherName" name="fatherName" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">Mother's Maiden Name</label>
                                <input id="motherName" name="motherName" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input id="mobile" name="mobile" type="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone (Landline)</label>
                                <input id="telephone" name="telephone" type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="mt-2 space-y-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Current Address (with Landmark)</label>
                            <input id="address" name="address" className="w-full p-2 border border-gray-300 rounded-md" required />
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="yearsPresent" className="block text-sm font-medium text-gray-700">Years at Present Address</label>
                                <input id="yearsPresent" name="yearsPresent" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="yearsCity" className="block text-sm font-medium text-gray-700">Years in City</label>
                                <input id="yearsCity" name="yearsCity" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>

                        {/* Rental Status */}
                        <div className="mt-2">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="rentalStatus" className="block text-sm font-medium text-gray-700">
                                        Rental Status
                                    </label>
                                    <select
                                        name="rentalStatus"
                                        id="rentalStatus"
                                        value={rentalStatus}
                                        onChange={(e) => { setRentalStatus(e.target.value); setShowRentalInfo(e.target.value === "Y") }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="N">Not Renting</option>
                                        <option value="Y">Renting</option>
                                    </select>
                                </div>
                                {showRentalInfo && (
                                    <div className="space-y-2">
                                        <label htmlFor="rentalAmount" className="block text-sm font-medium text-gray-700">
                                            Monthly Rental Amount
                                        </label>
                                        <input
                                            id="rentalAmount"
                                            name="rentalAmount"
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                            {showRentalInfo && (
                                <div
                                    className="transition-all transform opacity-0 duration-1000 ease-out"
                                    style={{
                                        transform: showRentalInfo ? "translateY(0)" : "translateY(-20px)",
                                        opacity: showRentalInfo ? 1 : 0,
                                    }}
                                >
                                    <div className="space-y-4 mt-2">
                                        <div className="space-y-2">
                                            <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">
                                                Permanent Address
                                            </label>
                                            <input
                                                id="permanentAddress"
                                                name="permanentAddress"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required={showRentalInfo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Marital Status */}
                        <div className="mt-2 grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
                                <select
                                    name="maritalStatus"
                                    id="maritalStatus"
                                    value={maritalStatus}
                                    onChange={e => { setMaritalStatus(e.target.value); setShowSpouseInfo(e.target.value === "Y") }}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="N">Single</option>
                                    <option value="Y">Married</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">Dependents</label>
                                <select name="dependents" className="w-full p-2 border border-gray-300 rounded-md">
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>
                                </select>
                            </div>
                        </div>
                        {/* Spouse Information - only shows if married */}
                        {showSpouseInfo && (
                            <div
                                className="transition-transform transform translate-y-10 opacity-0 duration-1000 ease-out"
                                style={{
                                    transform: showSpouseInfo ? "translateY(0)" : "translateY(-20px)",
                                    opacity: showSpouseInfo ? 1 : 0,
                                }}
                            >
                                <div className="mt-2 grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="spouseName" className="block text-sm font-medium text-gray-700">
                                            Spouse's Name
                                        </label>
                                        <input
                                            id="spouseName"
                                            name="spouseName"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="spouseDob" className="block text-sm font-medium text-gray-700">
                                            Spouse's Date of Birth
                                        </label>
                                        <input
                                            id="spouseDob"
                                            name="spouseDob"
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Employment Details */}
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="officeName" className="block text-sm font-medium text-gray-700">Office Name</label>
                                <input id="officeName" name="officeName" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="officeAddress" className="block text-sm font-medium text-gray-700">Office Address</label>
                                <input id="officeAddress" name="officeAddress" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 mt-2">
                            <div className="space-y-2">
                                <label htmlFor="officePhone" className="block text-sm font-medium text-gray-700">Telephone No./Landline (Office)</label>
                                <input id="officePhone" name="officePhone" type="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="yearsEmployed" className="block text-sm font-medium text-gray-700">Years at Present Job</label>
                                <input id="yearsEmployed" name="yearsEmployed" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="yearsTotalEmployed" className="block text-sm font-medium text-gray-700">Years at Total Job Experience</label>
                                <input id="yearsTotalEmployed" name="yearsTotalEmployed" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="space-y-4">
                        <h3 className="font-medium">Banking</h3>
                        <div className="space-y-2">
                            <label htmlFor="bankDetails" className="block text-sm font-medium text-gray-700">Bank Details (Name/A/c No./Branch)</label>
                            <input id="bankDetails" name="bankDetails" className="w-full p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 mt-2">
                            <div className="space-y-2">
                                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Amount Required</label>
                                <input id="loanAmount" name="loanAmount" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    {/* References */}
                    <div className="space-y-4">
                        <h3 className="font-medium">References</h3>
                        {/* Relative */}
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Relative Details</p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="relativeName" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input id="relativeName" name="relativeName" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="relativeMobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input id="relativeMobile" name="relativeMobile" type="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                            </div>
                            <div className="space-y-2 mt-2">
                                <label htmlFor="relativeAddress" className="block text-sm font-medium text-gray-700">Address</label>
                                <input id="relativeAddress" name="relativeAddress" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>

                        {/* Friend */}
                        <div className="space-y-4 mt-4">
                            <p className="text-sm text-muted-foreground">Friend Details</p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="friendName" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input id="friendName" name="friendName" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="friendMobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input id="friendMobile" name="friendMobile" type="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                            </div>
                            <div className="space-y-2 mt-2">
                                <label htmlFor="friendAddress" className="block text-sm font-medium text-gray-700">Address</label>
                                <input id="friendAddress" name="friendAddress" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
}