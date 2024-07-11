import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideNav from './SideNav';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const DetailChapterPage = () => {
    return (
        <div className="App">
            <Header />
            <div className="section">
                <div className="columns">
                    <SideNav />
                    <main className="column">
                        <DetailChapter />
                    </main>
                </div>
            </div>
        </div>
    )
}

const DetailChapter = () => {
    const [titleChapter, setTitleChapter] = useState("");
    const [storyChapter, setStoryChapter] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getChapterById();
    }, []);

    const detailChapter = async (e) => {
        e.preventDefault();
        try {
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }

    const getChapterById = async () => {
        const response = await axios.get(`http://localhost:5000/stories/chapter/${id}`);
        setTitleChapter(response.data.titleChapter);
        setStoryChapter(response.data.storyChapter);

    }

    return (
        <div className="columns is-centered">
            <div className="column">
                <form onSubmit={detailChapter}>
                    <div className="columns is-centered">
                        <div className="column">
                            <label className="label">Title</label>
                            <div className="control">
                                <input disabled type="text" className='input' value={titleChapter} onChange={(e) => setTitleChapter(e.target.value)} placeholder='Title' />
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
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button type='submit' className='button is-success'>Back</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DetailChapterPage