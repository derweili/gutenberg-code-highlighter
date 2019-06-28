/**
 * TODO: Frontend Code for Syntax Highlighting
 */
console.log('frontend syntax highlighting');

const { render } = wp.element;

import Highlight from 'react-highlight.js'


const codeElements = document.querySelectorAll(
".derweili-gutenberg-code-highlighter"
);
codeElements.forEach((codeElement, index) => {
    console.log('codeElement', codeElement);
    const language = codeElement.dataset.language;
    console.log(language);
    const code = codeElement.getElementsByTagName('pre')[0].childNodes[0].innerText;
    console.log(code);

    // const islightboxenabled = codeElement.dataset.islightboxenabled;
    // const images = codeElement.querySelectorAll("img");
    // const photos = [];
    // images.forEach(image => {
    //     photos.push({
    //     src: image.src,
    //     width: image.width,
    //     height: image.height,
    //     alt: image.alt,
    //     caption: image.title
    //     });
    // });
    render(
        <Highlight language={language}>
            {code}
        </Highlight>,
        codeElement
    );
});