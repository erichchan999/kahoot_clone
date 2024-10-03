import React from 'react';

function YoutubeEmbed ({ link }) {
  return (
    <iframe
      width="400"
      height="300"
      src={link}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
}

export default YoutubeEmbed;
