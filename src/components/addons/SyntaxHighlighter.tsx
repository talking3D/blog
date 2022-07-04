import React  from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import  { v4 as uuidv4 } from 'uuid';

// TO:DO: Define types for <SyntaxHighlighter> component 'props'
const SyntaxHighlighter = (props: any) => {
  React.useEffect(() => {
    if (window !== undefined) {
      const parentPreId = uuidv4();
      const parentPre = document.querySelector('pre.prism-code:not([id])');
      const codeParagraphClasses: string[] = [
        'col-start-2',
        'col-span-2',
        'ml-auto',
        'pr-2',
        'md:pl-0',
        'pl-2',
        'md:pr-4',
        'pb-4',
        'md:pt-2',
        'text-justify'
      ];
      if (!!parentPre) {
        parentPre.id = parentPreId
        const siblingParagraph: any = !!parentPre!.nextSibling ? parentPre!.nextSibling : parentPre!.parentElement?.nextElementSibling;
        const wrapperDiv =parentPre.parentElement;
        codeParagraphClasses.length && codeParagraphClasses.map((cls) => siblingParagraph!.classList.add(cls)) ;
        wrapperDiv!.appendChild(siblingParagraph!);
      }

    }
  }, [])

  const className = props.children.props.className || '';
  const preStylingClass = 'col-span-3 rounded-xl min-w-[60%] max-w-min w-full mb-4 md:m-4 md:ml-0 ml-auto mr-auto py-8 overflow-scroll text-sm md:text-base';
  const lang = className.match(/language-(?<lang>.*)/);
  const lineNumbers = props.children.props.lineNumbers;
  
  return (
    <Highlight
      { ...defaultProps }
      code={ props.children.props.children.trim() }
      language={ lang && lang.groups && lang.groups.lang ? lang.groups.lang : '' }
      theme={ theme }
     >
       {({className, style, tokens, getLineProps, getTokenProps }) => (
        <div className='grid grid-cols-1 md:grid-cols-3 col-span-3 mt-4 mb-2 pr-4 md:pr-8 pl-4 bg-gradient-to-b from-white to-stone-400 md:bg-gradient-to-r lg:from-white lg:to-stone-400 rounded-b-xl md:rounded-r-xl'>
         <pre className={ `${className} ${preStylingClass}` } style={ { ...style, padding: '20px', paddingRight: '8%'} }>
           { tokens.map((line, i) => (
             <div key={ i } { ...getLineProps({ line, key: i })}>
               { lineNumbers && <span className='pr-3 text-right text-neutral-500'>{ i + 1 }</span> }
               { line.map((token, key) => (
                 <span key={ key } { ...getTokenProps({ token, key })} />
               )) }
             </div>
           ))}
         </pre>
        </div>
       )}
    </Highlight>
  );
};

export default SyntaxHighlighter;