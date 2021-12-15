import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "./Card";
import Searchbar from "./Searchbar";
import Noty from "noty";
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";

export default function GridStories({ view }) {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [user, setUser] = useState([]);
  // const [isFavourite, setIsFavourite] = useState(false);

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
    requestStories(view);
    requestUser();
  }, [view]);

  // get logged in user info (object)
  const requestUser = async () => {
    try {
      const { data } = await axios("/api/users/dashboard/", {
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
  const requestStories = async (view) => {
    try {
      switch (view) {
        case "profile": {
          const { data } = await axios("/api/users/profile/", {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          setStories(data);
          break;
        }
        case "favs": {
          const { data } = await axios("/api/users/favourites", {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          setStories(data);
          break;
        }
        case "all": {
          const { data } = await axios("/api/stories/");
          setStories(data);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    try {
      if (!first) throw new Error("This story is not playable right now!");
      navigate(`/story/${id}/${first}`);
    } catch (error) {
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: `${error.message}`,
        timeout: 2000,
      }).show();
    }
  };

  const handleEdit = (id, name) => {
    navigate(`/create`, { state: { id, name } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/stories/${id}`);
    } catch (err) {
      console.log(err);
    }
    requestStories(view);
  };

  return (
    <div className="md:flex bg-grayCustom2 sm:flex-none ">
      {/* SIDEBAR */}
      <div className="md:flex basis-1/5 bg-white  justify-around items-top md:h-screen">
        <Searchbar
          view={view}
          user={user}
          options={options}
          setSearchQuery={setSearchQuery}
          setCategoryFilters={setCategoryFilters}
          // showFavourites={showFavourites}
        />
      </div>
      {/* CARDS DISPLAY SECTION */}

      <div className="basis-4/5">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 p-4">
          {stories &&
            stories
              .filter((story) => {
                if (hasSearchFilter(story) && hasCategoryFilter(story))
                  return story;
              })
              .map((story) => (
                <Card
                  key={story.id}
                  story={story}
                  user={user.id}
                  view={view}
                  handleEdit={() => handleEdit(story.id, story.name)}
                  handleDelete={() => handleDelete(story.id)}
                  handlePlay={() => handlePlay(story.id, story.first)}
                  onFavourited={requestStories}
                />
              ))}
        </div>
      </div>
      {/* END OF CARDS DISPLAY SECTION */}
    </div>
  );
}
