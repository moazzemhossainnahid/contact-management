import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';

interface Link {
  name: string;
  to: string;
}

const Header = () => {
  const navigate = useNavigate();

  const Links: Link[] = [
    { name: 'AddContact', to: '/' },
    { name: 'AllContacts', to: '/allcontacts' },
  ];

  const [open, setOpen] = useState(false);
  return (
    <nav className="shadow-md w-full fixed top-0 left-0 text-left z-50">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          onClick={() => {
            navigate('/');
          }}
          className="font-bold text-3xl cursor-pointer flex items-center text-[#0f52ba]"
        >
          <img
            src="https://cdn-icons-png.freepik.com/512/5365/5365990.png"
            alt="logo"
            className="w-10"
          />
          <span className="px-2 md:px-1">C Management</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 text-black top-6 cursor-pointer md:hidden"
        >
          {open ? <AiOutlineClose /> : <FaBars />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? 'top-20 opacity-100' : 'top-[-490px] opacity-0 md:opacity-100'
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-md capitalize md:my-0 my-5"
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#0f52ba] duration-300 border-b-2 border-[#0f52ba]'
                    : 'text-gray-800 duration-100'
                }
                to={link.to}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
