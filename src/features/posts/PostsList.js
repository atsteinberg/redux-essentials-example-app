import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';

export const PostsList = () => {
  const posts = useSelector(state => state.posts);

  // Sort posts in reverse chronological order by datetime string

  const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div style={{display: 'flex', 'flexDirection': 'row', justifyContent: 'space-between'}}>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p>{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  })

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

