import React from 'react';
import ContentLoader from 'react-content-loader';

const ImagePlaceholder = (props) => (
  <ContentLoader
    speed={2}
    width={150}
    height={150}
    viewBox="0 0 150 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="8" y="64" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="0" rx="0" ry="0" width="150" height="150" />
  </ContentLoader>
);

export default ImagePlaceholder;
