'use client'
import { useState, useEffect } from 'react'
import PromptCard from '@components/PromptCard'
import { set } from 'mongoose'
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <PromptCard data={item} handleTagClick={handleTagClick} />
        </li>
      ))}
    </ul>
  )

}
function Feed() {
  const [serachText, setSearchText] = useState('')
  const [posts, setPosts] = useState([]) // [{}
  const handleSearchChange = () => {
  }

  useEffect(() => {
    // fetch data
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/prompt`)
        const data =await response.json()
        setPosts(data)
        // if (response.ok) {
        //   const data = await response.json()
        //   console.log(data)
        // }
      } catch (error) {
        console.error('An error occurred while fetching the prompts:', error)
      }
      setPosts([])
    }
  }, [serachText]);
  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input
          required
          type="text"
          value={serachText}
          onChange={handleSearchChange}
          placeholder="Search for  a tag or a username"
          className="search_input peer" />

      </form>
      <PromptCard
        data={posts}
        handleTagClick={() => { }} />
    </section>
  )
}

export default Feed