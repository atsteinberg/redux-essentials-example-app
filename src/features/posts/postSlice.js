import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello',
    date: '2020-10-07T14:24:31.610Z',
    user: 2,
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 1,
      rocket: 0,
      eyes: 0
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'world!',
    date: sub(new Date(), {minutes: 5}).toISOString(),
    user: 1,
    reactions: {
      thumbsUp: 1,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 1,
    },
  }
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        // alternative: state.push(action.payload);
        return [...state, action.payload];
      },
      prepare(title, content, userId) {
        return ({
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            },
          }
        });
      }
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }

    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
