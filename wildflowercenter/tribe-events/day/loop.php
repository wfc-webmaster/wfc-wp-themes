<?php
/**
 * Day View Loop
 * This file sets up the structure for the day loop
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/loop.php
 *
 * @package TribeEventsCalendar
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
} ?>

<?php

global $more, $post, $wp_query;
$more = false;
$current_timeslot = null;

?>

<div class="tribe-events-loop flex-container-row">
	<div class="tribe-events-day-time-slot">

	<?php while ( have_posts() ) : the_post(); ?>
		<?php do_action( 'tribe_events_inside_before_loop' ); ?>		
	</div>
	<!-- .tribe-events-day-time-slot -->

	<div class="tribe-events-day-time-slot">
		<!-- Event  -->
		<div id="post-<?php the_ID() ?>" class="<?php tribe_events_event_classes() ?> flex-container-row">
			<?php tribe_get_template_part( 'day/single', 'event' ) ?>
		</div>

		<?php do_action( 'tribe_events_inside_after_loop' ); ?>
	<?php endwhile; ?>

	</div>
	<!-- .tribe-events-day-time-slot -->
</div><!-- .tribe-events-loop -->
