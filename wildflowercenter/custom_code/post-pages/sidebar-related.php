<?php
//Get the ID of the current post
$post_id = get_queried_object_id();

//Get the tags of the current post
$tags = wp_get_post_tags($post_id);

if ($tags) {
	$related_tags = array($tags[0]->term_id, $tags[1]->term_id, $tags[3]->term_id );
	
	$args = array(
		'tag__in' => $related_tags,
		'post__not_in' => array($post_id),
		'showposts' => 5,
		'ignore_sticky_posts' => true
		);

// WP_Query takes the same arguments as query_posts
$related_query = new WP_Query($args);

if ($related_query->have_posts()) {
?>
    <div id="related-posts-wrapper" class="sidebar-list-container sidebar-container">
        <div id="related-posts-heading" class="sidebar-list-heading">
            <h6>Related Stories</h6>
        </div>
        <div class="upcoming-events-list">
            <ul id="featured-posts">

        <?php
        while ($related_query->have_posts()) : $related_query->the_post();
        ?>
            <li class="feature-list-item">
                <?php the_category(); ?>
                <h6 class="sidebar-features"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
                <em><a href="<?php the_permalink(); ?>">Read More</a> <span class="lightorange-spot">></span></em>
            </li>
        <?php
        endwhile;
        ?>

        </ul>
    </div>
</div>
 
<?php }
    wp_reset_query(); // to reset the loop : http://codex.wordpress.org/Function_Reference/wp_reset_query
}

?>