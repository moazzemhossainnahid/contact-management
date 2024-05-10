import React from 'react';
import { useGetAllContactsQuery } from '../../redux/api/apiSlice';
import ContactCard from '../../components/ContactCard/ContactCard';
import Spinner from '../../components/Spinner/Spinner';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
}

interface ApiResponse {
    data: {
        result: Contact[];
    };
}

const AllContacts: React.FC = () => {
    const { data, isLoading } = useGetAllContactsQuery({});
    const contacts = data && (data as ApiResponse).data.result;

    console.log(contacts);

    return (
        <div className="w-full h-full py-20">
            <h1 className="text-3xl md:text-5xl pb-10 font-semibold leading-10 text-gray-800 text-center">
                Total Contacts - {contacts?.length ? contacts?.length : 0}
            </h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner />
                </div>
            ) : (
                <div className="w-full md:w-5/6 mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center">
                    {contacts?.map((contact: Contact, index: number) => (
                        <ContactCard contact={contact} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllContacts;