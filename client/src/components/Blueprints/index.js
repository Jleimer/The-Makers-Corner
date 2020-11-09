import React, { useEffect } from "react";
import BlueprintsItem from "../BlueprintsItem";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_BLUEPRINTS } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CATEGORY_BLUEPRINTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import store from "../../utils/store";
import { Card, Grid } from "semantic-ui-react";

function Blueprints() {
  const state = store.getState();
  const dispatch = useDispatch();
  useSelector(state => state);

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_CATEGORY_BLUEPRINTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_BLUEPRINTS,
        blueprints: data.blueprints,
      });
      data.blueprints.forEach((blueprint) => {
        idbPromise("blueprints", "put", blueprint);
      });
    } else if (!loading) {
      idbPromise("blueprints", "get").then((blueprints) => {
        dispatch({
          type: UPDATE_BLUEPRINTS,
          blueprints: blueprints,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterBlueprints() {
    if (!currentCategory) {
      return state.blueprints;
    }

    return state.blueprints.filter(
      (blueprint) => blueprint.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      {state.blueprints.length ? (
        <Grid columns={2} textAlign="center">
          {filterBlueprints().map((blueprint) => (
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
