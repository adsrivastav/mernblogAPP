import React, { useState } from 'react';

const EditPost = ({ post, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = () => {
    onUpdate(post._id, { title, content });
  };

  return (
    <div className="edit-post">
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Update Post</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditPost;
