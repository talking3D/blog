import * as React from 'react';

interface PostImageProps {
  src: string
  alt: string
};

const PostImage = (props: any) => {
  // Replace gatsby-remark-images inline span wrapper with block level div element
  // Also removes additional span element that wrapper
  // This is temportary ;) workaround for handling mdx markup inline images for my blog design requirements
  React.useEffect(() => {
    if (window !== undefined) {
      const paragraphElement = document.querySelector('span.gatsby-resp-image-wrapper')?.parentElement
      const paragraphElementNextSibling = paragraphElement?.nextSibling //means next <p> element
      const paragraphParent = paragraphElement?.parentElement


      // If paragraph tag has already got div parent ten replace css class from post paragraph to image
      if(paragraphParent!.tagName === 'DIV') {
        paragraphParent!.classList.replace('post-paragraph', 'inline-image');
        paragraphParent?.appendChild(paragraphElementNextSibling!);

      // Otherwise add DIV parent and and attach image style to i
      } else {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('inline-image');
        paragraphParent?.replaceChild(wrapperDiv, paragraphElement!);
        wrapperDiv.appendChild(paragraphElement!);
        wrapperDiv.appendChild(paragraphElementNextSibling!)
      }
    }
  }, []);

  const newProps ={ ...props }


  return (
      <img {...newProps } />
  );
};

export default PostImage;

