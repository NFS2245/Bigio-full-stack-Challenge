import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideNav from './SideNav';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateChapterPage = () => {
    return (
        <div className="App">
            <Header />
            <div className="section">
                <div className="columns">
                    <SideNav />
                    <main className="column">
                        <UpdateChapter />
                    </main>
                </div>
            </div>
        </div>
    )
}

const UpdateChapter = () => {
    const [titleChapter, setTitleChapter] = useState("");
    const [storyChapter, setStoryChapter] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() =>{
        getChapterById();
    },[]);

    const updateChapter = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/stories/chapter/${id}`, {
                titleChapter,
                storyChapter
            });
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }

    const getChapterById = async() =>{
        const response = await axios.get(`http://localhost:5000/stories/chapter/${id}`);
        setTitleChapter(response.data.titleChapter);
        setStoryChapter(response.data.storyChapter);

    }

    return (
        <div className="columns is-centered">
            <div className="column">
                <form onSubmit={updateChapter}>
                    <div className="columns is-centered">
                        <div className="column">
                            <label className="label">Title</label>
                            <div className="control">
                                <input type="text" className='input' value={titleChapter} onChange={(e) => setTitleChapter(e.target.value)} placeholder='Title' />
                            </div>
                        </div>
                    </div>
                    <div className="columns is-centered">
                        <div className="column is-fullwidth">
                            <ReactQuill
                                value={storyChapter}
                                onChange={(value) => setStoryChapter(value)}
                                theme="snow"
                                placeholder="Write something..."
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button type='submit' className='button is-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateChapterPage