// 실습 1. useEffect 안에서 api.get('/posts')로 게시글 목록 받아보기
import { useEffect, useState } from "react";
import { getPosts, createPost } from "./api/posts";
import type { Post, NewPost } from "./types";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const addPost = async (data: NewPost) => {
    const created = await createPost(data);
    setPosts((prev) => [created, ...prev]);
  };

  return (
    <>
      <PostForm onAdd={addPost} />
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}

export default App;
