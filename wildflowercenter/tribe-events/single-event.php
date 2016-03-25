<?php
/**
 * Single Event Template
 * A single event. This displays the event title, description, meta, and
 * optionally, the Google map for the event.
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/single-event.php
 *
 * @package TribeEventsCalendar
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

$events_label_singular = tribe_get_event_label_singular();
$events_label_plural = tribe_get_event_label_plural();

$event_id = get_the_ID();

?>

<div id="tribe-events-content" class="tribe-events-single">
	<!-- Notices -->
	<?php tribe_the_notices() ?>

	<div id="tribe-above-title-wrap" class="flex-container-row">
		<div class="tribe-events-back">
			<p><a class="tribe-events-back-button" href="<?php echo esc_url( tribe_get_events_link() ); ?>"> <?php printf( '&laquo; ' . esc_html__( 'All %s', 'the-events-calendar' ), $events_label_plural ); ?></a></p>
		</div>
		<div id="tribe-calendar-links">
			<p>Add To: <a class="tribe-events-ical tribe-events-button" href="<?php echo tribe_get_gcal_link(); ?>">Google Calendar</a>
						<a class="tribe-events-ical tribe-events-button" href="<?php echo tribe_get_single_ical_link(); ?>">iCal</a></p>
		</div>
	</div>

	<?php the_title( '<h2 id="single-event-head" class="tribe-events-single-event-title tribe-events-page-title">', '</h2>' ); ?>
	<div id="tribe-events-date-time">
		<h6>
			<?php 
				// If event is multiday, show next day's date
				if ($multiday_event && ($todays_date < $event_end_date)) {
				    echo 'Ongoing through ' . date('F j', $event_end_date) . '<br />';
				} else {
				    // Display upcoming event's start date
					echo tribe_get_start_date($event = null, $display_time=false, $date_format='', $timezone=null) . '<br />'; 					    
				}
				echo tribe_get_start_time() . ' &ndash; ' . tribe_get_end_time(); 
			?>
		</h6>
	</div>

	<?php while ( have_posts() ) :  the_post(); ?>		
		<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<!-- Event featured image, but exclude link -->
			<?php echo tribe_event_featured_image( $event_id, 'full', false ); ?>

			<!-- Event content -->
			<?php do_action( 'tribe_events_single_event_before_the_content' ) ?>
			<div class="tribe-events-single-event-description tribe-events-content">
				<h6 class="event-meta-title">Event Description</h6>
				<?php the_content(); ?>
			</div>
			<!-- .tribe-events-single-event-description -->
			<?php do_action( 'tribe_events_single_event_after_the_content' ) ?>
		</div> <!-- #post-x -->
		<?php if ( get_post_type() == Tribe__Events__Main::POSTTYPE && tribe_get_option( 'showComments', false ) ) comments_template() ?>
	<?php endwhile; ?>
	
	<!-- Event Meta -->
	<div class="tribe-events-event-meta flex-container-row">		
		
		<!-- Venue -->
		<div id="tribe-events-where">
			<h6 class="event-meta-title">Where</h6>
			<dd class="tribe-venue"> <?php echo tribe_get_venue() ?> </dd>

			<?php if ( tribe_address_exists() ) : ?>
				<dd class="tribe-venue-location">
					<address class="tribe-events-address">
						<?php 
						echo tribe_get_address() . '<br />';
						echo tribe_get_city() . ', ';
						echo tribe_get_stateprovince() . ' ';
						echo tribe_get_zip();
						?>
					</address>
				</dd>
			<?php endif; ?>
		</div>

		<!-- Event Cost -->
		<div id="tribe-events-cost">
		<h6 class="event-meta-title">Cost</h6>
			<div class="tribe-events-event-cost">
				<?php
				if ( tribe_get_cost() ) : 				
					echo tribe_get_cost( null, true ); 
					else : 
						echo "FREE";								
				endif; 
				?>
			</div>
		</div>

		<!-- Phone -->
		<div id="tribe-events-phone">
			<?php if ( tribe_get_phone() ) : 
						echo '<h6 class="event-meta-title">Phone</h6>';
						echo tribe_get_phone();
					endif;
			?>
		</div>

		<!-- Event Website -->
		<div id="tribe-events-website">
			<?php if ( tribe_get_event_website_link() ) :
					echo '<h6 class="event-meta-title">Website</h6>';
					echo tribe_get_event_website_link();
					endif;
			?>
		</div>

		<!-- Event Map -->
		<?php do_action( 'tribe_events_single_event_before_the_meta' ) ?>
			<?php tribe_get_template_part( 'modules/meta/map' ); ?>
		<div id="tribe-events-map">
			<?php 
				if ( tribe_show_google_map_link() ) :					
					echo '<a class="tribe-events-ical tribe-events-button" href="' . tribe_get_map_link() . '">View In Google Maps</a>';
				endif;
			?>
		</div>
		<?php do_action( 'tribe_events_single_event_after_the_meta' ) ?>
		
	</div>

</div><!-- #tribe-events-content -->
