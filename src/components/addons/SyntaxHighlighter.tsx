/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import { v4 as uuidv4 } from 'uuid';

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
        'text-justify',
      ];
      if (parentPre !== null) {
        parentPre.id = parentPreId;
        const siblingParagraph: Element | null | undefined = parentPre!.nextElementSibling
          ? parentPre!.nextElementSibling : parentPre!.parentElement?.nextElementSibling;
        const wrapperDiv = parentPre.parentElement;
        if (codeParagraphClasses.length && siblingParagraph !== null) {
          codeParagraphClasses.map((cls) => siblingParagraph!.classList.add(cls));
          wrapperDiv!.appendChild(siblingParagraph!);
        }
      }
    }
  }, []);

  const { className } = props.children.props || '';
  const preStylingClass = 'col-span-3 rounded-xl min-w-[60%] max-w-min w-full mb-4 md:m-4 md:ml-0 ml-auto mr-auto py-8 overflow-scroll text-sm md:text-base';
  const lang = className.match(/language-(?<lang>.*)/);
  const { lineNumbers } = props.children.props;

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={lang && lang.groups && lang.groups.lang ? lang.groups.lang : ''}
      theme={theme}
    >
      {({
        // eslint-disable-next-line no-shadow
        className, style, tokens, getLineProps, getTokenProps,
      }) => (
        <div className="grid grid-cols-1 md:grid-cols-3 col-span-3 mt-4 mb-2 pr-4 md:pr-8 pl-4 bg-gradient-to-b from-white dark:from-transparent to-stone-100 dark:to-zinc-800 md:bg-gradient-to-r lg:from-white dark:lg:from-transparent lg:to-stone-100 dark:lg:to-zinc-800 rounded-b-xl md:rounded-r-xl">
          <pre className={`${className} ${preStylingClass}`} style={{ ...style, padding: '20px', paddingRight: '8%' }}>
            { tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                { lineNumbers && <span className="pr-3 text-right text-neutral-500">{ i + 1 }</span> }
                { line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
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
