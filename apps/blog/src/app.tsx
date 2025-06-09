import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { PostsList } from './components/posts-list';
import Post from './pages/posts/post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/blog" />} />
        <Route path="/blog" element={<PostsList />} />
        <Route path="/blog/posts" element={<PostsList />} />
        <Route path="/blog/posts/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
