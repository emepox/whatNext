import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Select from 'react-select'

export default function GridStories({isProfile}) {

  const auth = useAuth();
  const [stories, setStories ] = useState( [] );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  //["Comedy", "Drama", "Horror", "Love", "Mystery", "Other"]

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
    console.log(isProfile)
    // const url = isProfile ? "users/profile/" : "/stories/";
    // console.log(url)

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
  

  return (
    <div>
      HELLO I AM THE GRID OF STORIES
      <div className="md:container md:mx-auto">
        <div className="grid justify-items-center lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
          <div>
            <p>SEARCH for</p>
            <input  className="border-2 border-gray-200 pr-10 pl-2 py-1 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="searchWord" placeholder = "title, description..." onChange={(event) => setSearchQuery(event.target.value)} />
          </div>
          <div>
            <p> Category filter</p>
            <Select 
            options={options} 
            isMulti 
            onChange={(selectedOptions) => handleMultiChange(selectedOptions)}
            theme={(theme) => ({
              ...theme,
              borderRadius: 2,
              colors: {
                ...theme.colors,
                primary: '#7C3AED',
                primary25: '#EDE9FE',
              }
            })}
            />
          </div>
        </div>
      </div>
      <div className="md:container md:mx-auto">
      <div className="grid justify-items-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {stories.filter((story) => {
        if (hasSearchFilter(story) && hasCategoryFilter(story)) return story})
      .map((story) => (
        // <article className="bg-gray-100 border-solid border-4 border-light-blue-500">
        //   <div>
        //     <p>{story.name}</p>
        //     <p>{story.category}</p>
        //     <p>{story.description}</p>
        //   </div>
        // </article>
        <div className="my-5">
        <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
          <div className="md:flex">
            <div className="md:flex-initial">
              <img className="object-cover h-48 w-screen" src={story.media} alt="whatever" />
              <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
                {story.category}
                </div>
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">{story.name}</a>
                <p className="mt-2 text-gray-500 ml-2 mr-2">{story.description}</p>
              </div>
          </div>
        </div>
      </div>
      ))}
      </div>
      </div>
    </div>
  );
}
