import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideNav from './SideNav';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddChapterPage = () => {
    return (
        <div className="App">
            <Header />
            <div className="section">
                <div className="columns">
                    <SideNav />
                    <main className="column">
                        <AddChapter/>
                    </main>
                </div>
            </div>
        </div>
    )
}

const AddChapter = ()=>{
    const [titleChapter, setTitleChapter] = useState("");
    const [storyChapter, setStoryChapter] = useState("");
    const navigate = useNavigate();

    const saveChapter = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/stories/chapter',{
                titleChapter, 
                storyChapter
            });
            navigate(-1);
        } catch (error){
            console.log(error);
        }
    }

    return(
        <div className="columns is-centered">
            <div className="column">
                <form onSubmit={saveChapter}>
                    <div className="columns is-centered">
                        <div className="column">
                            <label className="label">Title</label>
                            <div className="control">
                                <input type="text" className='input' value={titleChapter} onChange={(e)=> setTitleChapter(e.target.value)} placeholder='Title' />
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
                        <button type='submit' className='button is-success'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddChapterPage