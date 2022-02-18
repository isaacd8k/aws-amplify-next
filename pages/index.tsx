import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import { API } from "aws-amplify";
import { listPosts } from "../graphql/queries";

const Home: NextPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    console.log("fetchPosts() sent");
  }, []);

  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    });
    console.log("received data: ");
    console.log(postData);
    setPosts(postData.data.listPosts.items);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>

      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <a>
            <div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
              <h2 className="text-xl font-semibold">{post.name}</h2>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
