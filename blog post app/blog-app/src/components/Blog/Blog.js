import React, { useState, useEffect } from 'react';
import { posts } from "../../utils/data";
import { apiUrl } from "../../utils/api";
const Blog = () => {
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    // const [postData, setPostData] = useState();
    const handleAddPost = () => {
        setOpenModal(true);
    }
    const handleClosePost = () => {
        setOpenModal(false);
    }
    const submitPost = async () => {
        const value1 = title;
        console.log("value1---",value1)
        const value2 = description;
        const value3 = image;
        console.log(value1, value2, value3, "lll");
         await fetch(`${apiUrl.api}/addPost`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'post',
            body:{
                title: value1,
                description: value2,
                image: value3
            },
           
        })
            .then((response) => {
                console.log(response, "iii");
                return response.json(); // do something with response JSON
            });
    };

    const fetchData = async () => {
        // You can await here
        await fetch(`${apiUrl.api}/post`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            // ...
            // .then((result) => {
            //     console.log(result, "response")
            //     return result;
            // })

            .then(response => response.json())
        // .then(data => setPostData(data))
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <><div className="container-fluid">
            <div className="main row">
                <div className="col-md-10 col-9"><h1>Blog Posts</h1></div>
                <div className="col-md-2 col-3 button" onClick={handleAddPost}>Add Posts</div>
            </div>
            <div className="row mt-4">
                {posts.map((blog) => {
                    return (
                        <div className="col-md-4">
                            <h3 className="heading">{blog.title}</h3>
                            <img className="post-img mt-4" src={blog.image} alt="post" />
                            <p className="post-content mt-4">{blog.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
            {
                openModal && (
                    <div className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">ADD POST</h5>
                                    <button onClick={handleClosePost} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={submitPost}>
                                        <div className="row">
                                            <div className="col-md-4 label">
                                                <label>
                                                    Title:
                                                </label>
                                            </div>
                                            <div className="col-md-8">
                                                <input
                                                    name="title"
                                                    type="text"
                                                    value={title}
                                                    onChange={e => setTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-4 label">
                                                <label>
                                                    Description:
                                                </label>
                                            </div>
                                            <div className="col-md-8">
                                                <input
                                                    type="text"
                                                    value={description}
                                                    onChange={e => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-4 label">
                                                <label>
                                                    Upload Image:
                                                </label>
                                            </div>
                                            <div className="col-md-8">
                                                <input
                                                    type="file"
                                                    value={image}
                                                    onChange={e => setImage(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary mt-4" />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Blog;