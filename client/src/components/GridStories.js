import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "./Card";
import Searchbar from "./Searchbar";


export default function GridStories({ isProfile }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [user, setUser] = useState([]);
  

  const options = [
    { value: "Action", label: "Action" },
    { value: "Comedy", label: "Comedy" },
    { value: "Drama", label: "Drama" },
    { value: "Horror", label: "Horror" },
    { value: "Love", label: "Love" },
    { value: "Mystery", label: "Mystery" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    requestData();
    requestUser();
  }, []);

  // get logged in user info (object)
  const requestUser = async () => {
    try {
      const { data } = await axios("users/dashboard/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get stories
  const requestData = async () => {
    try {
      // if we're in profile, see user's stories
      if (isProfile) {
        const { data } = await axios("users/profile/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setStories(data);
      // else show all stories
      } else {
        const { data } = await axios("/stories/");
        setStories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // display all favourited stories
  const showFavourites = async () => {
    try{
      const { data } = await axios("users/favourites", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
        // const result = await data.map((story) => {story.Favouritee=[{id: story.Favourites.UserId}]})
        
        setStories(data);
        
    } catch (error) {
        console.log(error);
    }
  };

  // // add or remove story from favourites
  // const handleFavourite = async (story) => {
  //   if (!(story.Favouritee.some(fav => fav.id === user.id) || story.Favourites)){ 
  //   try {
  //     await axios('/users/favourites/', {
  //       method: "POST",
  //       headers: {
  //           authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //       data: {storyId: +story.id},
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //  } else {
  //     try {
  //       await axios(`/users/favourites/${story.id}`, {
  //         method: "DELETE",
  //         headers: {
  //             authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //  }
  // };

  const hasCategoryFilter = (story) => {
    return !categoryFilters.length || categoryFilters.includes(story.category);
  };

  const hasSearchFilter = (story) => {
    return (
      searchQuery === "" ||
      story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handlePlay = async (id, first) => {
    navigate(`/story/${id}/${first}`);
  };

  const handleEdit = (id, name) => {
    navigate(`/create`, { state: { id, name } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`stories/${id}`);
      requestData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <div className="flex w-1/4 bg-white  justify-around items-top h-screen">
        <Searchbar isProfile={isProfile} user={user} options={options} requestData={requestData} setSearchQuery={setSearchQuery} setCategoryFilters={setCategoryFilters} showFavourites={showFavourites} />
      </div>
      {/* CARDS DISPLAY SECTION */}
      <div className="w-4/5 bg-grayCustom2 justify-center">
        <div className="flex justify-center items-center m-20">
          <div className="flex justify-center items-center grid grid-cols-4 gap-10">
            {stories &&
              stories
                .filter((story) => {
                  if (hasSearchFilter(story) && hasCategoryFilter(story))
                    return story;
                })
                .map((story) => (
                  <Card
                    user={user.id}
                    story={story}
                    isProfile={isProfile}
                    handleEdit={() => handleEdit(story.id, story.name)}
                    handleDelete={() => handleDelete(story.id)}
                    handlePlay={() => handlePlay(story.id, story.first)}
                    requestData={requestData}
                  />
                ))}
          </div>
        </div>
      </div>
      {/* END OF CARDS DISPLAY SECTION */}
    </div>
  );
}
