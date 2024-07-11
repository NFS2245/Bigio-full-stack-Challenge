import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideNav from './SideNav';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { format } from 'date-fns';


const DetailStoryPage = () => {
    return (
        <div className="App">
            <Header />
            <div className="section">
                <div className="columns">
                    <SideNav />
                    <main className="column">
                        <DetailStory />
                    </main>
                </div>
            </div>
        </div>
    );
}

const DetailStory = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [category, setCategory] = useState("Financial");
    const [cover, setCover] = useState("");
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState("Publish");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getStoryById();
    }, []);

    const detailStory = async (e) => {
        e.preventDefault();
        try {
            navigate("/story");
        } catch (error) {
            console.log(error);
        }
    }

    const getStoryById = async () => {
        const response = await axios.get(`http://localhost:5000/stories/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setSynopsis(response.data.synopsis);
        setCategory(response.data.category);
        setCover(response.data.cover);
        setTags(response.data.tags);
        setStatus(response.data.status);

    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setCover(URL.createObjectURL(selectedImage));
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column ">
                <form onSubmit={detailStory}>
                    <div className="columns is-centered">
                        <div className='column'>
                            <label className="label">Title</label>
                            <div className="control">
                                <input disabled type="text" className='input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                            </div>
                        </div>

                        <div className='column'>
                            <label className="label">Author</label>
                            <div className="control">
                                <input disabled type="text" className='input' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Author' />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Synopsis</label>
                        <div className="control">
                            <textarea disabled className="textarea" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} placeholder="Synopsis"></textarea>
                        </div>
                    </div>
                    <div className='columns is-centered'>
                        <div className='column'>
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="control">
                                    <div className='select is-fullwidth'>
                                        <select disabled value={category} onChange={(e) => setCategory(e.target.value)}>
                                            <option value="Financial">Financial</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Health">Health</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <label className="label">Tags/Keyword Story</label>
                            <div className="control">
                                <input disabled type="text" className='input' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Tags' />
                            </div>
                        </div>
                    </div>
                    <div className='columns is-centered'>
                        <div className='column'>
                            <div className="field">
                                <label className="label">Cover Image</label>
                                <div className="control">
                                    <input 
                                        disabled
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="input"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <div className="field">
                                <label className="label">Status</label>
                                <div className="control">
                                    <div className='select is-fullwidth'>
                                        <select disabled value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="Publish">Publish</option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <ChapterList />
                    <div className="field">
                        <button type='submit' className='button is-success'>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ChapterList = () => {
    const [chapter, setChapter] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getChapter();
    }, []);

    const getChapter = async () => {
        const response = await axios.get(`http://localhost:5000/stories/${id}/chapter`);
        setChapter(response.data);
    }
    return (
        <div className="columns mt-10 is-centered">
            <div className="column">
                {/* <Link to="/addChapter" className="button is-success">Add Chapter</Link> */}
                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Last Updated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapter.map((chapter, index) => (

                            <tr>
                                <td>{chapter.titleChapter}</td>
                                <td>{format(new Date(chapter.updatedAt), 'dd MMMM yyyy')}</td>
                                <td>
                                    <Link to={`/detailChapter/${chapter.id}`} className='button is-small is-info'>Detail</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DetailStoryPage