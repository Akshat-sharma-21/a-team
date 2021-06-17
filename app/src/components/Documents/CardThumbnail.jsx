import React, { useState, useEffect } from "react";
import { CardMedia } from "@material-ui/core";

function CardThumbnail(props) {
  let [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    updateThumbnail(props.getThumbnailFunction);
  }, []);

  const updateThumbnail = async (urlFunction) => {
    let thumbnailUrl = await urlFunction();
    setThumbnailUrl(thumbnailUrl);
  };
  return (
    <div
      style={{
        height: 200,
        backgroundImage:
          "linear-gradient(45deg,#efefef 25%,transparent 25%,transparent 75%,#efefef 75%,#efefef),linear-gradient(45deg,#efefef 25%,transparent 25%,transparent 75%,#efefef 75%,#efefef)",
        backgroundSize: "21px 21px",
        backgroundRepeat: "repeat",
        backgroundPosition: "0 0, 10px 10px",
        backgroundColor: "#ffffff",
      }}
    >
      {thumbnailUrl ? (
        <CardMedia
          image={thumbnailUrl}
          style={{
            height: 200,
            backgroundPositionY: "top",
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default CardThumbnail;
