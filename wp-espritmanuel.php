<?php
/*
Plugin Name: Esprit Manuel
Plugin URI: http://www.espritmanuel.com
Description: Bouton dans l'éditeur de wordpress pour insérer un guide EspritManuel
Author: Vincent Brossier
Version: 1.0
Author URI: http://www.espritmanuel.com/
*/

function espritmanuel_shortcode($atts, $content = null){
	extract( shortcode_atts( array(	
	'guide_id' => false
	), $atts));
	$guide = '<iframe frameborder="0" scrolling="no" type="text/html"';
	if(($width)=="560")
		$height="580";
	if(($width)=="640")
		$height="660";
	if (!$width)
	{
		$width="560";
		$height="580";
	}
	$guide .= ' style="width: '.$width.'px; height: '.$height.'px; display: block;" src="http://www.espritmanuel.com/creation/embed/'.$guide_id.'"';
	$guide .= ' ></iframe>';
	if($content != null): $guide .= '<p>'.$content.'</p>';endif;
	$guide .= '';
	return $guide;
}

add_shortcode('espritmanuel', 'espritmanuel_shortcode');
add_action('init', 'espritmanuel_add_bt');


function espritmanuel_add_bt(){
	//On vérifie que l'utilisateur peut éditer des articles
	if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
		return;
	}
	//Si l'éditeur est en mode visuel, on execute les filtres suivants :
	if ( get_user_option('rich_editing') == 'true' ) {
		//Ajout du plugin
		add_filter( 'mce_external_plugins', 'espritmanuel_add_plugin');
		//Enregistrement du boutton
		add_filter( 'mce_buttons', 'espritmanuel_register_button');
	}
}

/**
* Filtre permettant d'initialiser un bouton dans l'éditeur de WordPress
*/
function espritmanuel_register_button( $buttons ) {
	array_push( $buttons, "|", "espritmanuel" );
	return $buttons;
}

/**
* Filtre permettant d'initialiser un plugin TinyMCE
*/
function espritmanuel_add_plugin( $plugin_array ) {
//$plugin_array['espritmanuel'] = URLPATH.'editor_plugin.js';// plugins_url( 'editor_plugin.js', __FILE__ );
$plugin_array['espritmanuel'] = plugins_url( 'espritmanuel_editor_plugin.js?1111', __FILE__ );
return $plugin_array;
}

