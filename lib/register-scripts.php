<?php

namespace Derweili\Gutenber_Code_Highlighter;

$js_dependencies = [ 'wp-plugins', 'wp-element', 'wp-edit-post', 'wp-i18n', 'wp-api-request', 'wp-data', 'wp-components', 'wp-blocks', 'wp-editor', 'wp-compose' ];

// add_action( 'init', __NAMESPACE__ . '\register_block_assets' );
/**
 * Enqueue block editor only JavaScript and CSS.
 */
function register_block_assets() {

	// Make paths variables so we don't write em twice ;)
	$editor_js_path = '/assets/js/blocks.editor.js';
	$editor_style_path = '/assets/css/blocks.editor.css';
	$style_path = '/assets/css/blocks.style.css';

	// Register the bundled block JS file
	wp_register_script(
		'jsforwp-adv-gb-editor-js',
		_get_plugin_url() . $editor_js_path,
		$js_dependencies,
		filemtime( _get_plugin_directory() . $editor_js_path ),
		true
	);	

	// Register editor only styles
	wp_register_style(
		'jsforwp-adv-gb-editor-css',
		_get_plugin_url() . $editor_style_path,
		[],
		filemtime( _get_plugin_directory() . $editor_style_path )
	);
	
	// Register shared editor and frontend styles
	wp_register_style(
		'jsforwp-adv-gb-css',
		_get_plugin_url() . $style_path,
		[],
		filemtime( _get_plugin_directory() . $style_path )
	);

}

/**
 * Enqueue block frontend JS & CSS
 */

error_log('register script file');
function plugin_assets(){
	// $plugin_js_path = "/assets/js/plugins.editor.js";
	// error_log('plugin assets' . _get_plugin_url() . $plugin_js_path );
	
	// wp_enqueue_script(
	// 	"derweilicontenttemplates-plugin-js",
	// 	_get_plugin_url() . $plugin_js_path,
	// 	$js_dependencies,
	// 	filemtime( _get_plugin_directory() . $plugin_js_path ),
	// 	true
	// );
	
	$plugin_css_path = "/assets/css/filters.editor.css";
	wp_enqueue_style(
		"gutenberg-code-highlighter-editor",
		_get_plugin_url() . $plugin_css_path,
		[],
		filemtime( _get_plugin_directory() . $plugin_css_path )
	);

	$filters_js_path = "/assets/js/filters.editor.js";

	// Enqueue our block filters
	wp_enqueue_script( 
		"gutenberg-code-highlighter-filters-js",
		_get_plugin_url() . $filters_js_path,
		['wp-hooks', 'lodash'],
		filemtime( _get_plugin_directory() . $filters_js_path ),
		true
	);

}

add_action("enqueue_block_editor_assets", __NAMESPACE__ . '\plugin_assets' );



add_action( "wp_enqueue_scripts", __NAMESPACE__ . '\frontend_assets' );
/**
 * Enqueue block frontend JavaScript
 */
function frontend_assets(){
	$frontend_js_path = "/assets/js/filters.frontend.js";
	wp_enqueue_script( 
		"gutenberg-code-highlighter-frontend",
		_get_plugin_url() . $frontend_js_path,
		$js_dependencies,
		filemtime( _get_plugin_directory() . $frontend_js_path ),
		true
	);

	$style_path = "/assets/css/filters.style.css";
	// Register shared editor and frontend styles
	wp_enqueue_style(
		'jsforwp-adv-gb-css',
		_get_plugin_url() . $style_path,
		[],
		filemtime( _get_plugin_directory() . $style_path )
	);
}