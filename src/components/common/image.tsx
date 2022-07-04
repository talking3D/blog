import * as React from 'react';
import  { v4 as uuidv4 } from 'uuid';

interface PostImageProps {
  src: string
  alt: string
};

const PostImage = (props: any) => {
  // Replace gatsby-remark-images inline span wrappers with block level div elements
  // This is temportary ;) workaround for handling mdx markup inline images for my blog design requirements
  const coptyElementAttrs = (source: Element, target: Element) => {
    const attributes:any =  source.attributes;
    for (let attr of attributes) {
      target.setAttribute(attr.name, attr.value)
    }
  }
  const elementId = uuidv4();
  props = { ...props, 
    id: `img_${elementId}`,
    style: {
      position: '',
      borderRadius: '10px',
      objectFit: 'fill',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
  React.useEffect(() => {
    if (window !== undefined) {
      const spanRespImgWrapper = document.querySelector('span.gatsby-resp-image-wrapper');

      const imgRes = document.querySelector(`#img_${elementId}`);
      const imageParent = imgRes?.parentElement;
      console.log((imageParent?.parentElement));
      const parentParagraphElement = spanRespImgWrapper!.parentElement;
      // console.log(parentParagraphElement);
      const paragraphElementNextSibling: any = parentParagraphElement?.nextSibling; //means next <p> element
      paragraphElementNextSibling.classList.add('pt-4', 'md:pl-4','md:pr-4', 'md:ml-2', 'lg:pt-0', 'md:pr-2', 'w-full', 'text-justify');

      const paragraphParent = parentParagraphElement?.parentElement

      // If paragraph tag has already got div parent then replace css paragraph class with image class
      if(paragraphParent!.tagName === 'DIV') {
        paragraphParent!.classList.replace('post-paragraph', 'inline-image');
        paragraphParent?.appendChild(paragraphElementNextSibling!);

      // Otherwise add DIV parent and and attach image style to it
      } else {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('inline-image');
        paragraphParent?.replaceChild(wrapperDiv, parentParagraphElement!);
        wrapperDiv.appendChild(parentParagraphElement!);
        wrapperDiv.appendChild(paragraphElementNextSibling!)
      };
      
      const newDivWrapper = document.createElement('div');
      newDivWrapper.classList.add('overflow-hidden','h-auto', 'px-2');
  
      newDivWrapper.appendChild(imgRes!);


      parentParagraphElement?.parentElement!.replaceChild(newDivWrapper, parentParagraphElement);

    }
  }, []);

  return (
      <img {...props } />
  );
};

export default PostImage;

