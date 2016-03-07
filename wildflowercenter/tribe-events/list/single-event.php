<?php
/**
 * List View Single Event
 * This file contains one event in the list view
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/list/single-event.php
 *
 * @package TribeEventsCalendar
 *
 */
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

$todays_date = strtotime(current_time( 'Y-m-d' ));
$multiday_event = tribe_event_is_multiday();
$event_end_date = strtotime(tribe_get_end_date($event = null, $display_time = true, $date_format = 'Y-m-d', $timezone = null));
$next_day_date = strtotime(tribe_get_next_day_date());

// Setup an array of venue details for use later in the template
$venue_details = tribe_get_venue_details();

// Venue
$has_venue_address = ( ! empty( $venue_details['address'] ) ) ? ' location' : '';

// Organizer
$organizer = tribe_get_organizer();

?>
<div class="tribe-event-wrap">
	<!-- Event Title -->
	<?php do_action( 'tribe_events_before_the_event_title' ) ?>
	<h3 class="tribe-events-list-event-title">
		<a class="tribe-event-url" href="<?php echo esc_url( tribe_get_event_link() ); ?>" title="<?php the_title_attribute() ?>" rel="bookmark">
			<?php the_title() ?>
		</a>
	</h3>
	<?php do_action( 'tribe_events_after_the_event_title' ) ?>


	<!-- Event Meta -->
	<?php do_action( 'tribe_events_before_the_meta' ) ?>
	<div class="tribe-events-event-meta">
		<div class="author <?php echo esc_attr( $has_venue_address ); ?>">

			<!-- Schedule & Recurrence Details -->
			<div class="tribe-event-schedule-details">
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
			</div>		

		</div>
		<!-- Event Cost -->
		<?php if ( tribe_get_cost() ) : ?>
			<div class="tribe-events-event-cost">
				<span><?php echo tribe_get_cost( null, true ); ?></span>
			</div>
		<?php endif; ?>
	</div><!-- .tribe-events-event-meta -->
	<?php do_action( 'tribe_events_after_the_meta' ) ?>


	<!-- Event Content -->
	<?php do_action( 'tribe_events_before_the_content' ) ?>
	<div class="tribe-events-list-event-description tribe-events-content">
		<?php echo tribe_events_get_the_excerpt( null, wp_kses_allowed_html( 'post' ) ); ?>		
	</div><!-- .tribe-events-list-event-description -->
</div>
<div class="tribe-event-img-wrap">
	<!-- Event Image -->
	<?php echo tribe_event_featured_image( null, 'medium' ); ?>
</div>
<?php
do_action( 'tribe_events_after_the_content' );
