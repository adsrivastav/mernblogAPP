import React from 'react';

const Post = ({ post, onDelete }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={() => onDelete(post.id)}>Delete</button>
    </div>
  );
};

export default Post;
