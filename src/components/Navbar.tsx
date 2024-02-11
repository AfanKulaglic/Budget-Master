// Navbar.tsx
import React from 'react';
import { CiTrophy, CiUser, CiEdit } from "react-icons/ci";

interface NavbarProps {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({page,setPage}) => {

  // Dobijanje trenutne rute
  console.log(page,'trenutna veza')

  return (
    <div className='navbar'>
      <CiTrophy className={`icon ${page === 'firstPage' ? 'active' : ''}`} onClick={() => setPage('firstPage')} />
      <CiUser className={`icon ${page === 'secondPage' ? 'active' : ''}`} onClick={() => setPage('secondPage')} />
      <CiEdit className={`icon ${page === 'thirdPage' ? 'active' : ''}`} onClick={() => setPage('thirdPage')} />
    </div>
  );
}

export default Navbar;
