import React from 'react';
import CategoryMenu from '../components/CategoryMenu';
// IMPORT BLUEPRINTS COMPONENT
import Cart from '../components/Cart';

const Blueprints = () => {
    return (
        <div>
            <h2>Blueprints Page</h2>
            <CategoryMenu />
            {/* BLUE PRINT COMPONENT */}
            <Cart />
        </div>
    );
};

export default Blueprints;