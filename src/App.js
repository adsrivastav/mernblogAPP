import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file here
import Post from './Post';
import EditPost from './EditPost'; // Import the EditPost component

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addPost = () => {
    axios.post('http://localhost:5000/api/posts', { title, content })
      .then(response => {
        setPosts([...posts, response.data]);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };

  const deletePost = id => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== id));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  const editPost = post => {
    setEditingPost(post);
  };

  const updatePost = (id, updatedPost) => {
    axios.put(`http://localhost:5000/api/posts/${id}`, updatedPost)
      .then(response => {
        setPosts(posts.map(post => (post._id === id ? response.data : post)));
        setEditingPost(null);
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <div className="App">
      <h1>Blog APP</h1>
      <div className="add-post">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={addPost}>Add Post</button>
      </div>
      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p> {/* Display a snippet of the content */}
            <button onClick={() => deletePost(post._id)}>Delete</button>
            <button onClick={() => editPost(post)}>Edit</button>
          </div>
        ))}
      </div>
      {editingPost && (
        <EditPost
          post={editingPost}
          onUpdate={updatePost}
          onCancel={() => setEditingPost(null)}
        />
      )}
    </div>
  );
};

export default App;
