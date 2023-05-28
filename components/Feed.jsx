"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  const filterPrompts = (searchText) => {
    const searchTerm = searchText.toLowerCase();
    return allPosts.filter((item) => {
      const username = item.creator.username.toLowerCase();
      const tag = item.tag.toLowerCase();
      const prompt = item.prompt.toLowerCase();
      return username.includes(searchTerm) || tag.includes(searchTerm) || prompt.includes(searchTerm);
    });
  };
  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    
    if (!searchTimeout) {
      setSearchTimeout(setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        // console.log(searchResult)
        setSearchedResults(searchResult);
        setSearchTimeout(null);
      }, 300));
    }
  };


  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;