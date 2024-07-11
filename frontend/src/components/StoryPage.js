import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideNav from './SideNav';
import axios from "axios";
import { Link } from "react-router-dom";
import ModalFilter from './ModalFilter';

const StoryPage = () => {
    return (
        <div className="App">
            <Header />
            <div className="section">
                <div className="columns">
                    <SideNav />
                    <main className="column">
                        <StoryList />
                    </main>
                </div>
            </div>
        </div>
    );
}

const StoryList = () => {
    const [stories, setStories] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({ category: '', status: '' });

    useEffect(() => {
        getStories();
    }, [filters]);

    const getStories = async () => {
        try {
            if (filters.category.trim() === '' && filters.status.trim() === '') {
                if (search.trim() === '') {
                    const response = await axios.get('http://localhost:5000/stories');
                    setStories(response.data);
                    setSearchResults([]);
                } else {
                    const response = await axios.get(`http://localhost:5000/stories/search/${search}`);
                    setSearchResults(response.data);
                }
            } else {
                const response = await axios.get(`http://localhost:5000/stories/filters/${filters.category}/${filters.status}`);
                setStories(response.data);
                setSearchResults(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleResetFilter = () => {
        setSearchResults([]);
        setFilters({ category: '', status: '' });
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column">
                <div className="columns is-mobile is-multiline">
                    <div className="column is-two-thirds">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            getStories();
                        }}>
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input className="input" type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search" />
                                </div>
                                <div className="control">
                                    <button className='button is-info'>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="column">
                        <button className='button is-primary' onClick={handleResetFilter}>Reset</button>
                    </div>
                    <div className="column">
                        <ModalFilter onApplyFilter={(selectedFilters) => setFilters(selectedFilters)} />
                    </div>
                    <div className="column">
                        <Link to="/add" className="button is-success">Add Story</Link>
                    </div>
                </div>
                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.length > 0 ? (
                            searchResults.map((story, index) => (
                                <tr key={story.id}>
                                    <td>{story.title}</td>
                                    <td>{story.author}</td>
                                    <td>{story.category}</td>
                                    <td>{story.tags}</td>
                                    <td>{story.status}</td>
                                    <td>
                                        <Link to={`/updateStories/${story.id}`} className='button is-small is-info'>Edit</Link>
                                        <Link to={`/detailStories/${story.id}`} className='button is-small is-danger'>Detail</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                                stories.map((story, index) => (
                                    <tr key={story.id}>
                                        <td>{story.title}</td>
                                        <td>{story.author}</td>
                                        <td>{story.category}</td>
                                        <td>{story.tags}</td>
                                        <td>{story.status}</td>
                                        <td>
                                            <Link to={`/updateStories/${story.id}`} className='button is-small is-info'>Edit</Link>
                                            <Link to={`/detailStories/${story.id}`} className='button is-small is-danger'>Detail</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StoryPage;
