import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useGetAllContactsQuery } from '../../redux/api/apiSlice';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
}

interface UpdateContactModalProps {
    updateContact: Contact;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
}

const UpdateContactModal: React.FC<UpdateContactModalProps> = ({ updateContact }) => {
    const { _id, name, email, address, phone, profilePicture } = updateContact;
    const { refetch } = useGetAllContactsQuery({});
    const { register, handleSubmit, reset } = useForm<FormData>();

    const handleUpdateTour: SubmitHandler<FormData> = async (data) => {
        const contact = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            profilePicture: data.profilePicture,
        };

        // send to database
        fetch(`https://ctm-sercer.vercel.app/api/v1/contacts/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(contact),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.status === "Successful") {
                    toast.success("Contact Update Successfully");
                    reset();
                    refetch();
                    closeModal();
                } else {
                    toast.error("Failed to Update Contact");
                }
            });
    };

    const closeModal = () => {
        window.location.reload();
    };


    return (
        <div>
            <input type="checkbox" id="update-contact-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="update-contact-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Update Tour</h1>
                    <div className="w-full gap-3">
                        <form onSubmit={handleSubmit(handleUpdateTour)} className="py-3">
                            <input
                                {...register("name")}
                                defaultValue={name}
                                type="text"
                                required
                                placeholder="Enter Tour Package Name"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <input
                                {...register("phone")}
                                defaultValue={phone}
                                type="text"
                                required
                                placeholder="Enter Your Phone"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <input
                                {...register("email")}
                                defaultValue={email}
                                type="email"
                                required
                                placeholder="Enter Your Email"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <input
                                {...register("profilePicture")}
                                defaultValue={profilePicture}
                                type="text"
                                required
                                placeholder="Enter profilePicture Image URL"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <textarea
                                {...register("address")}
                                defaultValue={address}
                                required
                                placeholder="Enter Your Address"
                                className="input bg-slate-100 my-2 input-ghost w-full h-20 block mx-auto"
                            />
                            <input
                                className="btn px-7 btn-primary mt-5 block mx-auto"
                                type="submit"
                                value="Update Contact"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateContactModal;
