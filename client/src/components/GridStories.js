import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";


export default function GridStories({isProfile}) {
  
  const navigate = useNavigate();
  const auth = useAuth();
  const [stories, setStories ] = useState( [] );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);

  const options = [
    { value: 'Action', label: 'Action' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Love', label: 'Love' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Other', label: 'Other' }
  ]

  useEffect(() => {
  requestData();
  }, []);

  const requestData = async () => {
    try {
      if ( isProfile ) {
        const { data } = await axios("users/profile/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        } );
        console.log(data)
        setStories( data );
      } else {
        const { data } = await axios("/stories/");
        console.log(data)
        setStories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleMultiChange = (selectedOptions) => {
    setCategoryFilters((state) => selectedOptions.map(selectedOption => selectedOption.value));
  };

  const hasCategoryFilter = (story) => {
    return !categoryFilters.length || categoryFilters.includes(story.category);
  };

  const hasSearchFilter = (story) => {
    return searchQuery === "" || story.name.toLowerCase().includes(searchQuery.toLowerCase()) || story.description.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const handlePreview = async (id) => {
    navigate(`/story/${id}/preview`)
  };

  const handlePlay = async (id, first) => {
    navigate(`/story/${id}/${first}`)
  };

  //TODO: MAKE THIS WORK
  const handleEdit = (id) => {
    console.log(`Click edit ${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete( `stories/${ id }` )
      requestData();
      
    } catch ( err ) {
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <p className="text-2xl text-white font-mono italic mb-10 ">Your Stories</p> */}
      <div>
        <p className="text-white font-mono">SEARCH for</p>
        <input
          className="border-2 border-gray-200 pr-10 pl-2 py-1 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          name="searchWord"
          placeholder="title, description..."
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <div>
        <p className="text-white font-mono"> Category filter</p>
        <Select
          options={options}
          isMulti
          onChange={(selectedOptions) => handleMultiChange(selectedOptions)}
          theme={(theme) => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary: "#7C3AED",
              primary25: "#EDE9FE",
            },
          })}
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-7">
        {stories
          .filter((story) => {
            if (hasSearchFilter(story) && hasCategoryFilter(story))
              return story;
          })
          .map((story) => (
            // this is a card
            <div key={ story.id } className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
              <div className="md:flex">
                <div className="md:flex-initial">
                  <img
                    className="object-cover h-48 w-screen"
                    src={story.media}
                    alt="Game's image"
                  />
                  <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2">
                    <p>{story.category}</p>
                  </div>
                  <a
                    href="#"
                    className="block text-lg leading-tight font-medium text-black hover:underline ml-2 mt-6"
                  >
                    <p>{story.name}</p>
                  </a>
                  <p className="mt-3 text-gray-500 ml-2 mr-2">
                    {story.description} 
                  </p>
                  {!isProfile && (
                    <div className="flex justify-center">
                      <button onClick={() => handlePreview(story.id) } className="bg-purple-400 text-white p-1 rounded m-2 hover:bg-purple-500 hover:shadow-lg">Play</button>
                    </div>
                  )}
                  {isProfile && (
                    <div className="flex justify-center">
                      <button onClick={() => handlePlay(story.id, story.first) } className="bg-purple-400 text-white p-1 rounded m-2 hover:bg-purple-500 hover:shadow-lg">Play</button>
                      <button onClick={() => handleEdit(story.id) } className="bg-purple-400 text-white p-1 rounded m-2 hover:bg-purple-500 hover:shadow-lg">Edit</button>
                      <button onClick={() => handleDelete(story.id)} className="bg-red-400 text-white p-1 rounded m-2 hover:bg-red-500 hover:shadow-lg">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}