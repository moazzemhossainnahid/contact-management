import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useGetAllContactsQuery } from '../../redux/api/apiSlice';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    image: FileList;
    address: string;
}

const AddContacts: React.FC = () => {
    const { refetch } = useGetAllContactsQuery({});

    const { register, handleSubmit, reset } = useForm<ContactFormData>();
    const imageAPIKey = 'f2d532c88848782b1dc45cebfdcd0290';

    const onSubmit: SubmitHandler<ContactFormData> = (data) => {
        const { name, email, phone, address } = data;
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageAPIKey}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    const img = result.data.url;

                    const ContactData = {
                        name,
                        email,
                        phone,
                        address,
                        profilePicture: img
                    };

                    // Post to database
                    fetch(`https://ctm-sercer.vercel.app/api/v1/contacts/create-contact`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                        body: JSON.stringify(ContactData),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log("data", data);
                            if (data.status === "Successful") {
                                toast.success(data.message);
                                refetch();
                                reset();
                            }
                        });
                }
            });
    }

    return (
        <div className="text-left h-full w-full lg:pt-10">
            <div className="w-full flex items-center justify-center my-12">
                <div className="bg-gray-200 shadow rounded py-12 lg:px-28 px-8">
                    <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
                        Add Contact Data
                    </p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mb-32"
                        action=""
                    >
                        <div className="md:flex items-center mt-12">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Name
                                </label>
                                <input
                                    {...register("name")}
                                    required
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Email
                                </label>
                                <input
                                    {...register("email")}
                                    required
                                    type="email"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 "
                                    placeholder="Enter Your Email"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-12">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Phone
                                </label>
                                <input
                                    {...register("phone")}
                                    required
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 "
                                    placeholder="Enter Your Phone"
                                />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Select Your Picture
                                </label>
                                <input
                                    {...register("image")}
                                    required
                                    type="file"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 "
                                    placeholder="Please select Image"
                                />
                            </div>
                        </div>


                        <div>
                            <div className="w-full flex flex-col mt-8">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Address
                                </label>
                                <textarea
                                    {...register("address")}
                                    required
                                    typeof='text'
                                    className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200  resize-none"
                                    placeholder="Enter Your Address"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <button
                                type="submit"
                                className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-secondary rounded hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:outline-none"
                            >
                                Submit Data
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContacts;
