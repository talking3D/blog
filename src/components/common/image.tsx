import * as React from 'react';
import  { v4 as uuidv4 } from 'uuid';

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

      const parentParagraphElement = spanRespImgWrapper!.parentElement;
      const paragraphElementNextSibling: any = parentParagraphElement?.nextSibling;
      const paragraphParent = parentParagraphElement?.parentElement
      
      // If paragraph tag has already got div parent then replace css paragraph class with image class
      if(paragraphParent!.tagName === 'DIV') {
        const newFigureWrapper = document.createElement('figure');
        newFigureWrapper.className = 'from-inline-image';
        paragraphParent?.parentElement?.replaceChild(newFigureWrapper, paragraphParent);
        newFigureWrapper.appendChild(paragraphParent!)
        
        if (!!paragraphElementNextSibling && paragraphElementNextSibling.tagName === 'FIGCAPTION') {
          paragraphElementNextSibling.classList.add('pt-4', 'md:pl-4','md:pr-4', 'md:ml-2', 'lg:pt-0', 'md:pr-2', 'w-full', 'text-justify');
          paragraphParent?.appendChild(paragraphElementNextSibling!);
        } else {
          newFigureWrapper.className='from-inline-image-no-caption';
        }
        

      // Otherwise add DIV parent and and attach image style to it
      } else {
        const wrapperFigure = document.createElement('figure');
        wrapperFigure.classList.add('from-inline-image');
        paragraphParent?.replaceChild(wrapperFigure, parentParagraphElement!);
        wrapperFigure.appendChild(parentParagraphElement!);
        if (!!paragraphElementNextSibling && paragraphElementNextSibling.tagName === 'FIGCAPTION') {
          paragraphElementNextSibling.classList.add('col-start-1', 'col-end-4', 'pt-4', 'md:col-start-2', 'md:col-end-4', 'md:-ml-1', 'md:pr-2', 'lg:pl-4','lg:pr-4', 'lg:pt-0', 'w-full', 'text-justify');
          wrapperFigure.appendChild(paragraphElementNextSibling!)
        } else {
          wrapperFigure.className = 'from-inline-image-no-caption';
        };
      };
      
      const newDivWrapper = document.createElement('div');
      newDivWrapper.classList.add('col-start-1', 'col-end-4','lg:col-start-1', 'lg:col-end-2', 'overflow-hidden','h-auto', 'px-2');
  
      newDivWrapper.appendChild(imgRes!);


      parentParagraphElement?.parentElement!.replaceChild(newDivWrapper, parentParagraphElement);

    }
  }, []);
  
  return (
      <img {...props } />
  );
};

export default PostImage;

