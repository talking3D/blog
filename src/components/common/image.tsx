import * as React from 'react';

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
  React.useEffect(() => {
    if (window !== undefined) {
      const spanRespImgWrapper =  document.querySelector('span.gatsby-resp-image-wrapper');

      // const spanRespImgBgImg =  document.querySelector('span.gatsby-resp-image-background-image');

      const imgRes = document.querySelector('img.gatsby-resp-image-image');

      const parentParagraphElement = spanRespImgWrapper!.parentElement
      const paragraphElementNextSibling: any = parentParagraphElement?.nextSibling //means next <p> element
      // paragraphElementNextSibling.classList.add('md:ml-2', 'min-w-[336px]', 'w-full', 'md:max-w-[600px]',  'border-2', 'border-red-400');
      paragraphElementNextSibling.classList.add('md:pl-4','md:pr-4', 'md:ml-2', 'lg:pt-0', 'md:pr-2', 'w-full', 'text-justify');

      const paragraphParent = parentParagraphElement?.parentElement

      // If paragraph tag has already got div parent ten replace css class from post paragraph to image
      if(paragraphParent!.tagName === 'DIV') {
        paragraphParent!.classList.replace('post-paragraph', 'inline-image');
        paragraphParent?.appendChild(paragraphElementNextSibling!);

      // Otherwise add DIV parent and and attach image style to i
      } else {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('inline-image');
        paragraphParent?.replaceChild(wrapperDiv, parentParagraphElement!);
        wrapperDiv.appendChild(parentParagraphElement!);
        wrapperDiv.appendChild(paragraphElementNextSibling!)
      };

      
      // const divRespImgWrapper = document.createElement('div');
      // coptyElementAttrs(spanRespImgWrapper!, divRespImgWrapper);
      
      // const divRespImgBgImg = document.createElement('div');
      // coptyElementAttrs(spanRespImgBgImg!, divRespImgBgImg);
      
      const newDivWrapper = document.createElement('div');
      newDivWrapper.classList.add('overflow-hidden','h-auto', 'px-2');
      newDivWrapper.appendChild(imgRes!);
      // newDivWrapper.appendChild(divRespImgWrapper);
      // divRespImgWrapper.appendChild(divRespImgBgImg);
      // divRespImgBgImg.appendChild(imgRes!);
      // divRespImgBgImg.style.paddingBottom = '';

      parentParagraphElement?.parentElement!.replaceChild(newDivWrapper, parentParagraphElement);

      // console.log(divRespImgBgImg.style.paddingBottom = '0')
    }
  }, []);

  const newProps ={ ...props, style: {
    position: '',
    borderRadius: '10px',
    objectFit: 'fill',
    marginLeft: 'auto',
    marginRight: 'auto',
  } }


  return (
      <img {...newProps } />
  );
};

export default PostImage;

