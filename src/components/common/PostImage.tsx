/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

const PostImage = (props: any) => {
  // Replace gatsby-remark-images inline span wrappers with block level div elements
  // This is temportary ;) workaround for handling mdx markup inline images for my blog design requirements
  const elementId = uuidv4();
  const newProps = {
    ...props,
    id: `img_${elementId}`,
    style: {
      // eslint-disable-next-line react/destructuring-assignment
      ...props.style,
      borderRadius: '10px',
      objectFit: 'fill',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  };

  return (
  // eslint-disable-next-line jsx-a11y/alt-text, react/jsx-props-no-spreading
    <img {...newProps} />
  );
};

export default PostImage;
