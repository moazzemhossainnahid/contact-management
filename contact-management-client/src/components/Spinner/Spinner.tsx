import React from 'react';
import { PuffLoader } from 'react-spinners';

const Spinner:React.FC = () => {
    return (
        <div className='w-full flex justify-center mx-auto h-full'>
            <PuffLoader color="#FC4B1E" />
        </div>
    );
};

export default Spinner;