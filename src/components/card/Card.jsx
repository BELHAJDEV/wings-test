import React from 'react';
import './card.css'

function Card({post}) {
  return (
    <div className="post-card">
        <span className="title">{post.title}</span>
        <p className="body">{post.body}</p>
        </div>
  )
}

export default Card