import React from "react";
// IMPORT COMPONENTS
// import Cart from '../components/Cart';
// - ProductList ??
import Blueprints from "../components/Blueprints";
import Courses from "../components/Courses";
import { Grid, Card } from "semantic-ui-react";

const Home = () => {
  return (
    <div className="container">
      <h2>Featured Blueprints</h2>
      <Blueprints />
      <h2>Featured Courses</h2>
      <Courses />
    </div>
  );
};

export default Home;
