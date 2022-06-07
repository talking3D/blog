import React  from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';


// TO:DO: Define types for <SyntaxHighlighter> component 'props'
const SyntaxHighlighter = (props: any) => {
  const className = props.children.props.className || '';
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
         <pre className={ className } style={ { ...style, padding: '20px' } }>
           { tokens.map((line, i) => (
             <div key={ i } { ...getLineProps({ line, key: i })}>
               { lineNumbers && <span className='pr-3'>{ i + 1 }</span> }
               { line.map((token, key) => (
                 <span key={ key } { ...getTokenProps({ token, key })} />
               )) }
             </div>
           ))}
         </pre>
       )}
    </Highlight>
  );
};

export default SyntaxHighlighter;