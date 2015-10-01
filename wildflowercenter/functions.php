<?php 

wp_enqueue_script('jquery');
remove_filter( 'the_content', 'wpautop' );

function remove_content_styling() {
  remove_theme_support('headway-content-styling-css');
}
add_action('headway_setup_child_theme', 'remove_content_styling');

function add_categories_above_title() {
	?>
	<div class="post-category"><?php the_category(); ?></div>
	<?php
}

add_action('headway_before_entry_title', 'add_categories_above_title');

?>