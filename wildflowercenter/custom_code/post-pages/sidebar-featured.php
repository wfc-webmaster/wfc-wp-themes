<?php
$query = new WP_Query(array(
    'posts_per_page'   => 5,
    'ignore_sticky_posts' => true,
));
?>

<div id="featured-posts-wrapper" class="sidebar-list-container sidebar-container">
	<div id="featured-posts-heading" class="sidebar-list-heading">
		<h6>Featured Stories</h6>
	</div>
	<div class="upcoming-events-list">
		<ul id="featured-posts">

<?php	
while ($query->have_posts()): $query->the_post(); ?>
    
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

<?php
wp_reset_query();
?>