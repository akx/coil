import * as React from 'react';

export default ({path, props}: { path: string, props?: object }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d={path} />
  </svg>
);
