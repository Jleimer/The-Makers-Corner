import React, { useEffect } from "react";
import BlueprintsItem from "../BlueprintsItem";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_BLUEPRINTS } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BLUEPRINTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function Blueprints() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_BLUEPRINTS);
    console.log(data);

    useEffect(() => {
        if(data) {
          dispatch({
               type: UPDATE_BLUEPRINTS,
                blueprints: data.blueprints
            });
            data.blueprints.forEach((blueprint) => {
              idbPromise('blueprints', 'put', blueprint);
            });
        } else if (!loading) {
          idbPromise('blueprints', 'get').then((blueprints) => {
            dispatch({
              type: UPDATE_BLUEPRINTS,
                blueprints: blueprints
            });
          });
        }
    }, [data, loading, dispatch]);
    
    function filterBlueprints() {
        if (!currentCategory) {
            return state.blueprints;
        }

        return state.blueprints.filter(blueprint => blueprint.category._id === currentCategory);
    }

    return (
        <div className="my-2">
            <h2>Our Blueprints:</h2>
            {state.blueprints.length ? (
                <div className="flex-row">
                    {filterBlueprints().map(blueprint => (
                        <BlueprintsItem
                            key={blueprint._id}
                            _id={blueprint._id}
                            image={blueprint.image}
                            name={blueprint.name}
                            price={blueprint.price}
                            quantity={blueprint.quantity}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any blueprints yet!</h3>
            )}
            {/* { loading ? 
            <img src={spinner} alt="loading" />: null} */}
        </div>
    );
}

export default Blueprints;