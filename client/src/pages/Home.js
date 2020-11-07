import React from 'react';
// IMPORT COMPONENTS
// import Cart from '../components/Cart';
// - ProductList ?? 
import Blueprints from '../components/Blueprints';
import Courses from '../components/Courses';
import { Card } from 'semantic-ui-react';


const Home = () => {
    return (
        <div className="container">
            <Blueprints />
            <Courses />
        </div>
    );
};

export default Home;