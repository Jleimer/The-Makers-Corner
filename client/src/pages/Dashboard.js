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
                                placeholder="Painting 101"
                                name="name"
                                type="text"
                                id="name"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Course Description: </label>
                            <textarea
                                className="text-area"
                                placeholder="A course on the basics every painter needs to know."
                                name="description"
                                type="text"
                                id="description"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price: </label>
                            <input
                                className="input"
                                placeholder="12.99"
                                name="price"
                                type="number"
                                id="price"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="date">Date: </label>
                            <input
                                className="input"
                                placeholder="01/01/2021"
                                name="date"
                                type="date"
                                id="date"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="difficulty">Difficulty: </label>
                            <input
                                className="input"
                                placeholder="Beginner"
                                name="difficulty"
                                type="text"
                                id="difficulty"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="items">Items Included: </label>
                            <input
                                className="input"
                                placeholder="Canvas, paint brush, acrylic paint"
                                name="items"
                                type="text"
                                id="items"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="category">Category: </label>
                            <select></select>
                        </div>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
            <div>
                <h3>Add a Blueprint</h3>
                <form>
                        <div>
                            <label htmlFor="name">Blueprint Title: </label>
                            <input
                                className="input"
                                placeholder="Mountain Landscape Painting"
                                name="name"
                                type="text"
                                id="name"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description: </label>
                            <textarea
                                className="text-area"
                                placeholder="A step by step guide on how to paint a beautiful mountain landscape."
                                name="description"
                                type="text"
                                id="description"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="file">File Type: </label>
                            <input
                                className="input"
                                placeholder="PDF"
                                name="file"
                                type="text"
                                id="file"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price: </label>
                            <input
                                className="input"
                                placeholder="5.99"
                                name="price"
                                type="number"
                                id="price"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="difficulty">Difficulty: </label>
                            <input
                                className="input"
                                placeholder="Beginner"
                                name="difficulty"
                                type="text"
                                id="difficulty"
                                required
                                // onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="category">Category: </label>
                            <select></select>
                        </div>
                        <input type="submit" value="Submit"></input>
                    </form>
            </div>
        </div>
    );
};

export default Dashboard;