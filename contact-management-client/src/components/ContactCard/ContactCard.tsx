import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useGetAllContactsQuery } from '../../redux/api/apiSlice';

interface Contact {
    _id:string
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
}

interface Props {
    contact: Contact;
}


const ContactCard: React.FC<Props> = ({ contact }) => {
    const {refetch} = useGetAllContactsQuery({});


      // delete contact card
  const handleDeleteContact = (id:string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Offer Card!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const resData = await fetch(`http://localhost:5000/api/v1/contacts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await resData.json();

        console.log(res);
        if (res.status === "Successful") {
          Swal.fire({
            icon: "success",
            title: "Data Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          })
          refetch();
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Deleted Failed",
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    })
  }

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img className='w-20 h-20 mt-5 rounded-full' src={contact?.profilePicture} alt="image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{contact?.name}</h2>
                <p>{contact?.email}</p>
                <p className='text-gray-600'>{contact?.phone}</p>
                <p className='text-gray-500'>{contact?.address}</p>
                <div className="card-actions flex items-center gap-3 justify-end">
                    <button className="btn btn-sm p-2 btn-primary"><FaEdit/></button>
                    <button onClick={() => handleDeleteContact(contact?._id)} className="btn btn-sm p-2 btn-accent"><FaTrashAlt/></button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;