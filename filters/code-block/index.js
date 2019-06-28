const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, RadioControl } = wp.components;

import Highlight from 'react-highlight.js'


import classnames from "classnames";
import "./editor.scss";
import "./style.scss";

addFilter(
    "blocks.registerBlockType",
    "gutenbergcodehighlighter/code-attributes",
    addCodeAttributes
)

addFilter(
    "editor.BlockEdit",
    "gutenbergcodehighlighter/code-inspector-controls",
    addCodeInspectorControls
)
console.log('demo', addFilter);

function addCodeAttributes( settings, name ){
    console.log('filter');
    // only filter code block
    if("core/code" !== name ) return settings;

    settings.supports = lodash.merge({}, settings.supports, {
        align: ["full"]
    });

    settings.attributes.align = {
        type: "string",
        default: "wide"
    }

    settings.attributes.language = {
        type: "string",
        default: ""
    }



    return settings;

}


function addCodeInspectorControls( BlockEdit ) {
    console.log('addCodeInspectorControls');

    const withInspectorControls =  createHigherOrderComponent( BlockEdit => {
        
        return props => {
            console.log(props);
            if( "core/code" !== props.name ) return <BlockEdit {...props} />;

            if( !props.isSelected){
                return (
                    <Highlight language={props.attributes.language}>
                        {props.attributes.content}
                    </Highlight>
                );
            }

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={__("Language", 'gutenberg-code-highlighter')}>
                            <PanelRow>
                            <RadioControl
                                label="Language"
                                help="Language of your Code"
                                selected={ props.attributes.language }
                                options={ [
                                    { label: 'Default', value: '' },
                                    { label: 'PHP', value: 'php' },
                                    { label: 'JavaScript', value: 'javascript' },
                                    { label: 'JavaScript ES6', value: 'es6' },
                                    { label: 'HTML', value: 'html' },
                                    { label: 'CSS', value: 'css' },
                                    { label: 'SASS', value: 'sass' },
                                    { label: 'SCSS', value: 'scss' }
                                ] }
                                onChange={ ( language ) => { props.setAttributes( {language} ) } }
                            />

                            </PanelRow>
                        </PanelBody>
                    </InspectorControls>
                    <div className={ `gutenberg-code-highlighter ${props.attributes.language} ` }>
                        <BlockEdit {...props} />
                    </div>
                </Fragment>
            );

        }   

    });

    return withInspectorControls(BlockEdit);

}

