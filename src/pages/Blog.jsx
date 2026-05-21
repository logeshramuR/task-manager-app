import { useState } from "react";

function Blog() {
  const [posts, setPosts] = useState([
    {
      title: "My First Blog",
      content: "This is my first blog post.",
      comments: [],
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");

  const addPost = () => {
    if (!title || !content) return;

    setPosts([
      ...posts,
      {
        title,
        content,
        comments: [],
      },
    ]);

    setTitle("");
    setContent("");
  };

  const addComment = (index) => {
    if (!comment) return;

    const updatedPosts = [...posts];

    updatedPosts[index].comments.push(comment);

    setPosts(updatedPosts);

    setComment("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Blog Platform
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <textarea
          placeholder="Write Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <button
          onClick={addPost}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Add Blog
        </button>
      </div>

      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-lg mb-6"
        >
          <h2 className="text-2xl font-bold">
            {post.title}
          </h2>

          <p className="mt-3 text-gray-700">
            {post.content}
          </p>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Add Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 rounded-lg w-full mb-3"
            />

            <button
              onClick={() => addComment(index)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Comment
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-2">
              Comments:
            </h3>

            {post.comments.map((c, i) => (
              <p
                key={i}
                className="bg-gray-200 p-2 rounded-lg mb-2"
              >
                {c}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blog;