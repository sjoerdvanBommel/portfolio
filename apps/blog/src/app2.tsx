import { BrowserRouter, Route, Routes } from 'react-router';
import { PostsList } from './components/posts-list';
import Post from './pages/posts/post';

function App() {
  return (
    <BrowserRouter basename="/blog">
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
