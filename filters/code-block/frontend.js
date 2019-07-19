const { render } = wp.element;

import Highlight from 'react-highlight.js'


const codeElements = document.querySelectorAll( ".derweili-gutenberg-code-highlighter" );

codeElements.forEach( ( codeElement, index ) => {
    
    const language = codeElement.dataset.language;
    const code = codeElement.getElementsByTagName( 'pre' )[0].childNodes[0].innerText;

    render(
        <Highlight language={language}>
            {code}
        </Highlight>,
        codeElement
    );

});
