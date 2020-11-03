import React from 'react';
import CategoryMenu from '../components/CategoryMenu';
// IMPORT CLASSES COMPONENT
import Cart from '../components/Cart';

const Classes = () => {
    return (
        <div>
            <h2>Classes Page</h2>
            <CategoryMenu />
            {/* CLASSES COMPONENT */}
            <Cart />
        </div>
    );
};

export default Classes;