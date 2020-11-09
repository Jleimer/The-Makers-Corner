import React from 'react';
import CategoryMenu from '../components/CategoryMenu';
import Blueprints from '../components/Blueprints';
import { Card, Grid, Container } from 'semantic-ui-react';

const BluePrints = () => {
    return (
        <div>
            <h2>Blueprints</h2>
            <Grid columns={2} stackable>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <CategoryMenu />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Card.Group>
                            <Blueprints />
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            
            
            </Grid>
        </div>
    );
};

export default BluePrints;