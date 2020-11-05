import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>Add a Course</h3>
                <div className="form-div">
                    <form>
                        <div>
                            <label htmlFor="name">Course Name: </label>
                            <input
                                className="input"
                                placeholder="johndoe@test.com"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <h3>Add a Blueprint</h3>
            </div>
        </div>
    );
};

export default Dashboard;