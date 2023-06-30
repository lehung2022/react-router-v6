import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import NewPost from "./components/posts/NewPost";
import PostPage from "./components/posts/PostPage";
import About from "./components/about/About";
import Missing from "./components/missing/Missing";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './index.css';


function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My 1st Post",
      datetime: "June 28th, 2023 16:44 PM",
      body: "It is so easy to be great nowadays"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "June 28th, 2023 16:44 PM",
      body: "The moment you assume somebody is smarter than you, they immediately become stupid"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "June 28th, 2023 16:44 PM",
      body: "Living with the Communists long enough makes me understand how selfish and stupid they are"
    },
    {
      id: 4,
      title: "My 4th Post",
      datetime: "June 28th, 2023 16:44 PM",
      body: "Everything nowadays is about Feelings and Moods. No one controls them anymore. And, that leads to total Chaos"
    }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout
          search={search}
          setSearch={setSearch}
        />}>
          <Route index element={<Home posts={searchResults} />} />
          <Route path="post">
            <Route index element={<NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />} />
            <Route path=":id" element={<PostPage
              posts={posts}
              handleDelete={handleDelete}
            />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
