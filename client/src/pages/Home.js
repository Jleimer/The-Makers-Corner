import React from 'react';
// IMPORT COMPONENTS
import Cart from '../components/Cart';
// - ProductList ?? 
import Blueprints from '../components/Blueprints';
import Courses from '../components/Courses';

const Home = () => {
    return (
        <div className="container">
            <div>
                <h2>Checkout out the latest blueprints:</h2>
                <Blueprints />
                <h2>Checkout out the latest Classes:</h2>
                <Courses />
            </div>
            {/* INSERT COMPONENTS */}
            {/* -- INSERT PRODUCTLIST... ONLY TOP 5 */}
        </div>
    );
};

export default Home;