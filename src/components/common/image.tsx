import * as React from 'react';
// import { GatsbyImage, getImage, IGatsbyImageData, ImageDataLike } from 'gatsby-plugin-image';

interface PostImageProps {
  src: string
  alt: string
};

const PostImage = (props: any) => {
  // Replace gatsby-remark-images inline span wrapper with block level div element
  // This is temportary ;) workaround for handling mdx markup inline images for my blog design requirements
  React.useEffect(() => {
    if (window !== undefined) {
      // const parentSpanElement = document.querySelector('span.gatsby-resp-image-wrapper');
      // const bgSpanElement = document.querySelector('span.gatsby-resp-image-background-image');
      // const imgElement = document.querySelector('img.gatsby-resp-image-image');

      // const parentP = parentSpanElement?.parentNode;
      // parentP?.removeChild(parentSpanElement!);
      // const newDiv = document.createElement('div');
      // newDiv.classList.add('inline-image')
      // newDiv.appendChild(bgSpanElement!);
      // newDiv.appendChild(imgElement!);
      // parentP?.parentNode?.insertBefore(newDiv, parentP.nextSibling);

      // // Add next paragraph as description text to this image
      // const descrParagraph = newDiv.nextSibling;
      // newDiv.appendChild(descrParagraph!);

      // const parentP = document.querySelector('span.gatsby-resp-image-wrapper')?.parentElement;
      // !!parentP && parentP.classList.add('inline-image');
    }
  }, []);



  return (
      <img {...props } />
  );
};

export default PostImage;

