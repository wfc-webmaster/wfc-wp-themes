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

function insert_tumblr_script() {
	echo '<script type="text/javascript" src="http://platform.tumblr.com/v1/share.js"></script>';
}

function add_sharebar_to_posts() {
	if ( is_single() && !is_single('0') ) {		
		add_action('wp_footer', 'insert_tumblr_script');
	?>
	<div class="post-sharebar-wrapper">
		<ul id="post-sharebar">
			<li><a href="mailto:?subject=Wildflower Center article: <?php echo ucwords(get_the_title()); ?>&body=I read this and wanted to share: <?php echo ucwords(get_the_title()); ?> (<?php echo urlencode(the_permalink()); ?>)" title="E-Mail this"><i class="fa fa-envelope sharebar-icons"></i><span class="social-media-name">E-Mail</span></a></li>
			<li><a href="https://www.facebook.com/sharer.php?u=<?php the_permalink();?>&amp;t=<?php the_title(); ?>" title="Share on Facebook" target="_blank"><i class="fa fa-facebook sharebar-icons"></i><span class="social-media-name">Facebook</span></a></li>
			<li><a href="https://twitter.com/home/?status=<?php the_title(); ?> - <?php the_permalink(); ?>" title="Tweet this" target="_blank"><i class="fa fa-twitter sharebar-icons"></i><span class="social-media-name">Twitter</span></a></li>
			<li><a href="https://www.linkedin.com/shareArticle?mini=true&amp;title=<?php the_title(); ?>&amp;url=<?php the_permalink(); ?>" title="Share on LinkedIn" target="_blank"><i class="fa fa-linkedin sharebar-icons"></i><span class="social-media-name">LinkedIn</span></a></li>
			<li><a href="https://plus.google.com/share?url=<?php the_permalink(); ?>" target="_blank"><i class="fa fa-google-plus sharebar-icons"></i><span class="social-media-name">Google+</span></a></li>
			<li><a href="https://www.tumblr.com/share/" title="Share on Tumblr" target="_blank"><i class="fa fa-tumblr sharebar-icons"></i><span class="social-media-name">Tumblr</span></a></li>
		</ul>
	</div>
	<?php
	}
}

add_action('headway_before_entry_content', 'add_sharebar_to_posts');
add_action('headway_after_entry_content', 'add_sharebar_to_posts');

function insert_post_nav_script() {
	if (is_single() && !is_single('0') ) {
		echo '<script type="text/javascript" src="http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/js/postNav.min.js"></script>';
	}
}

add_action('wp_footer', 'insert_post_nav_script');

?>