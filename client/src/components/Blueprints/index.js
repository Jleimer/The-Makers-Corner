import React, { useEffect } from "react";
import BlueprintsItem from "../BlueprintsItem";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORY_BLUEPRINTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import store from '../../utils/store';
import { Card, Grid } from "semantic-ui-react";

function Blueprints() {
    const state = store.getState();
    const dispatch = useDispatch();
    useSelector(state => state);

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_CATEGORY_BLUEPRINTS);
    console.log(data);

    useEffect(() => {
        if(data) {
          dispatch({
               type: UPDATE_PRODUCTS,
                products: data.blueprints
            });
            data.blueprints.forEach((product) => {
              idbPromise('products', 'put', product);
            });
        } else if (!loading) {
          idbPromise('products', 'get').then((products) => {
            dispatch({
              type: UPDATE_PRODUCTS,
                products: products
            });
          });
        }
    }, [data, loading, dispatch]);
    
    function filterProducts() {
        if (!currentCategory) {
          return state.products;
        }
    
        return state.products.filter(
          (product) => product.category._id === currentCategory
        );
      }
    

    return (
        <div className="my-2">
            {state.products.length ? (
                <Grid columns={2} textAlign="center">
                    {filterProducts().map(blueprint => (
                        <BlueprintsItem
                            key={blueprint._id}
                            _id={blueprint._id}
                            name={blueprint.name}
                            price={blueprint.price}
                            description={blueprint.description}
                            username={blueprint.username}
                            difficulty={blueprint.difficulty}
                        />
                    ))}
                </Grid>
            ) : (
                <h3>You haven't added any blueprints yet!</h3>
            )}
            {/* { loading ? 
            <img src={spinner} alt="loading" />: null} */}
        </div>
    );
}

export default Blueprints;