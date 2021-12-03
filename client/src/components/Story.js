import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";

export default function Story() {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => getCurrentNode(page), [page]);
  //   useEffect(() => {if (currentNode&&currentNode.media)getImage()}, [currentNode])

  const getCurrentNode = async (id) => {
    setLoading(true);
    const node = await api.getNode(id);
    console.log(node);
    setCurrentNode(node);
    setLoading(false);
  };

  //   const getImage = async () => {
  //     import placeholder from "../img/placeholder.jpg"
  //     setImage(placeholder)
  //   }

  return (
    <div className="container flex-col mx-auto">
      {loading && <div>loading</div>}
      {currentNode && (
        <div className="bg-grey-300">
          <div>{image && <img src={image} />}</div>
          <div className="w-24 m-2">{currentNode.situation}</div>
          <div className="flex">
          {currentNode.Start ? (
            currentNode.Start.map((edge) => (
              <div>
                <button
                  className="bg-yellow-200 p-2 rounded m-2"
                  onClick={() => navigate(`/story/${id}/${edge.next}`)}
                >
                  {edge.option}
                </button>
              </div>
            ))
          ) : (
            <button
              className="bg-red-200 p-2 rounded"
              onClick={() => navigate(`/story/${id}/1`)}
            >
              finish
            </button>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
