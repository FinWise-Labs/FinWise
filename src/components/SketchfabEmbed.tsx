import React from 'react';

const SketchfabEmbed: React.FC = () => {
  return (
    <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '500px' }}>
      <iframe
        title="Robot"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/22f4c6a62200469d83af78eded1c040d/embed"
        style={{ width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
};

export default SketchfabEmbed;
