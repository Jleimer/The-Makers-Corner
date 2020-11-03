import React from 'react';
// IMPORT COMPONENTS
import Cart from '../components/Cart';
// - ProductList ?? 

const Home = () => {
    return (
        <div className="container">
            <Cart/>
            <h1>Home</h1>
            {/* INSERT COMPONENTS */}
            {/* -- INSERT PRODUCTLIST... ONLY TOP 5 */}
        </div>
    );
};

export default Home;