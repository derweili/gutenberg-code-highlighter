<?php
namespace Derweili\Gutenber_Code_Highlighter;

add_filter( 'render_block', __NAMESPACE__ . '\block_filters', 10, 3);
function block_filters( $block_content, $block ) {
    
    // only modify core code block
    if( "core/code" !== $block['blockName'] ) {
        return $block_content;
    }
    // only modify if language is set
    if( ! isset( $block["attrs"] ) || ! isset( $block["attrs"]["language"] ) ){
        return $block_content;
    }

    $language = $block["attrs"]["language"];

    $classes =  isset( $block["attrs"]["align"] ) ? 'align' . $block["attrs"]["align"] : '';

    $output = '<div class="derweili-gutenberg-code-highlighter language-' . $language . ' ' . $classes . '" data-language="' . $language . '">';
    $output .= $block_content;
    $output .= '</div>';
    return $output;
}