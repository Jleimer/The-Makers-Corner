import React from 'react';
import CategoryMenu from '../components/CategoryMenu';
import Courses from '../components/Courses';
import { Card, Grid } from 'semantic-ui-react';

const Course = () => {
    return (
        <div>
            <h2>Courses</h2>
            <Grid columns={2} stackable>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <CategoryMenu />
                    </Grid.Column>
                    <Grid.Column>
                        <Card.Group>
                            <Courses />
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Course;