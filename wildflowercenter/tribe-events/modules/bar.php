<?php
/**
 * Events Navigation Bar Module Template
 * Renders our events navigation bar used across our views
 *
 * $filters and $views variables are loaded in and coming from
 * the show funcion in: lib/Bar.php
 *
 * @package TribeEventsCalendar
 *
 */
?>

<?php

$filters = tribe_events_get_filters();
$views   = tribe_events_get_views();

$current_url = tribe_events_get_current_filter_url();
?>
<!-- List Title -->
<?php do_action( 'tribe_events_before_the_title' ); ?> 

<?php 
	$page_title = single_cat_title($prefix = '', $display = false);
	if ($page_title == '') {
		echo '<h1>Calendar of Events</h1>';
	}
?>

<h1><?php single_cat_title(); ?></h1>
<?php do_action( 'tribe_events_after_the_title' ); ?>

<!-- Search Bar -->
<?php do_action( 'tribe_events_bar_before_template' ) ?>
<div id="tribe-events-bar">	
	<form id="tribe-bar-form" class="tribe-clearfix flex-container-row" name="tribe-bar-form" method="post" action="<?php echo esc_attr( $current_url ); ?>">

		<!-- Mobile Filters Toggle -->
		<div id="tribe-views-wrap" class="flex-container-row">
			<div id="tribe-bar-collapse-toggle" <?php if ( count( $views ) == 1 ) { ?> class="tribe-bar-collapse-toggle-full-width"<?php } ?>>
				<?php printf( esc_html__( 'List %s By', 'the-events-calendar' ), tribe_get_event_label_plural() ); ?>
			</div>

			<!-- Views -->
			<?php if ( count( $views ) > 1 ) { ?>
				<div id="tribe-bar-views">					
					<ul id="tribe-selected-views">
						<?php foreach ( $views as $view ) : ?>
							<li class="view-tribe-<?php echo tribe_is_view( $view['displaying'] ) ? 'selected' : 'inactive'; ?>">
								<a href="<?php echo esc_attr( $view['url'] ); ?>">
									<?php
										if ($view['anchor'] === 'List') {											
												echo '<i class="fa fa-list-ul"></i> ';
										} elseif ($view['anchor'] === 'Month') {
											echo '<i class="fa fa-calendar"></i> ';
										} else {
											echo '<i class="fa fa-calendar-o"></i> ';
										}
										echo $view['anchor']; 
									?>
								</a>			
							</li>
						<?php endforeach; ?>
					</ul>					
					<!-- .tribe-bar-views-inner -->
				</div><!-- .tribe-bar-views -->
			<?php } // if ( count( $views ) > 1 ) ?>
		</div>	

	</form>
	<!-- #tribe-bar-form -->

</div><!-- #tribe-events-bar -->
<?php
do_action( 'tribe_events_bar_after_template' );
