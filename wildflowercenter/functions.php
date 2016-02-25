<?php 

//Enable jQuery
wp_enqueue_script('jquery');
remove_filter( 'the_content', 'wpautop' );

//Remove default Headway styling
function remove_content_styling() {
  remove_theme_support('headway-content-styling-css');
}
add_action('headway_setup_child_theme', 'remove_content_styling');

//Register menus menu
function register_my_menus() {
	register_nav_menus(
		array(
			'wfc-action-nav' => __('WFC Action Nav'),
			'wfc-main-nav' => __( 'WFC Main Nav' ),
			'wfc-sub-nav-visit' => __( 'WFC Sub Nav - Visit' ),
			'wfc-sub-nav-plants' => __( 'WFC Sub Nav - Plants' ),
			'wfc-sub-nav-learn' => __( 'WFC Sub Nav - Learn' ),
			'wfc-sub-nav-work' => __( 'WFC Sub Nav - Our Work' ),
			'wfc-sub-nav-news' => __( 'WFC Sub Nav - News' ),
			'wfc-action-nav-mobile' => __('WFC Action Nav - Mobile'),
			'wfc-main-nav-mobile' => __( 'WFC Main Nav - Mobile' ),
			'wfc-sub-nav-mobile' => __( 'WFC Sub Nav - Mobile' ),
			'wfc-footer-visit' => __( 'WFC Footer Nav - Visit' ),
			'wfc-footer-news' => __( 'WFC Footer Nav - News' ),
			'wfc-footer-shortcuts' => __( 'WFC Footer Nav - Shortcuts' )
		)
	);
}
add_action( 'init', 'register_my_menus' );

//Add search function to mobile nav
function add_search_box($items, $args) {

	if ($args->theme_location == 'wfc-main-nav-mobile') {
	
        /*ob_start();
        get_search_form();
        $searchform = ob_get_contents();
        ob_end_clean();*/

        $search_args = 'Search Wildflower Center';

        $items .= '<li id="mobile-search" class="menu-item menu-item-type-post_type menu-item-object-page">' . headway_get_search_form($search_args) . '</li>';
    }
    return $items;
	
}
add_filter('wp_nav_menu_items','add_search_box', 10, 2);

//Add categories above titles
function add_categories_above_title() {
	?>
	<div class="post-category"><?php the_category(); ?></div>
	<?php
}

add_action('headway_before_entry_title', 'add_categories_above_title');

//Add social media share bar to single posts
function insert_tumblr_script() {
	echo '<script type="text/javascript" src="http://platform.tumblr.com/v1/share.js"></script>';
}

function add_sharebar_to_posts() {
	//if ( is_single() && !is_single('0') ) {		
	if ( is_singular('post') ) {		
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
	//if (is_single() && !is_single('0') ) {
	if (is_singular('post') ) {
		echo '<script type="text/javascript" src="http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/js/postNav.min.js"></script>';
	}
}

add_action('wp_footer', 'insert_post_nav_script');

//Sets up basic variables to manage hours display
function wfc_date_vars() {
	$today = date('M j');
	$currentYear = date("Y");
	$interval = new DateInterval('P1D');
	$date_vars_array = array(
			$today,
			$currentYear,
			$interval
		);
	return $date_vars_array;
} 

//Sets dates for annually closed days
function wfc_closed_dates() {
	$date_vars = wfc_date_vars();
	$MLK_day = date('M j', strtotime("third Monday of Jan $date_vars[1]"));
	$july_fourth = date('M j', strtotime("Jul 4"));
	$thanksgiving = date('M j', strtotime("fourth Thursday of Nov $date_vars[1]"));
	$black_friday = date('M j', strtotime("fourth Friday of Nov $date_vars[1]"));
	$wfc_closed_dates_array = array(
			$MLK_day,
			$july_fourth,
			$thanksgiving,
			$black_friday
		);
	return $wfc_closed_dates_array;
}

//Sets dates for Wildflower Days
function wfc_wildflower_days() {
	$date_vars = wfc_date_vars();	
	$wildflower_days_begin = new DateTime('2016-03-14'); //Set begin date
	$wildflower_days_end = new DateTime('2016-05-31'); //Set end date
	$wildflower_days_end = $wildflower_days_end->modify('+1 day');
	$wfc_wildflower_days_period = new DatePeriod($wildflower_days_begin, $date_vars[2], $wildflower_days_end);
	$wfc_wildflower_days_array = array();

	foreach ($wfc_wildflower_days_period as $date) {
		array_push($wfc_wildflower_days_array, $date->format('M j'));		
	}
	return $wfc_wildflower_days_array;	
}

//Sets dates for Winter Break
function wfc_winter_break() {
	$date_vars = wfc_date_vars();
	$winter_break_begin = new DateTime('2015-12-23'); //Set begin date
	$winter_break_end = new DateTime('2016-01-01'); //Set end date
	$winter_break_end = $winter_break_end->modify('+1 day');
	$wfc_winter_break_period = new DatePeriod($winter_break_begin, $date_vars[2], $winter_break_end);
	$wfc_winter_break_array = array();

	foreach ($wfc_winter_break_period as $date) {
		array_push($wfc_winter_break_array, $date->format('M j'));		
	}
	return $wfc_winter_break_array;
}

//Display Wildflower Center Hours
function wfc_hours() {
	$date_vars = wfc_date_vars();
	$closed_dates = wfc_closed_dates();
	$wildflower_days = wfc_wildflower_days();
	$winter_break = wfc_winter_break();		

	//Set regular hours
	$wfc_reg_hours = '
				<ul>
					<li>9am – 5pm Tuesday - Sunday</li>
					<li>Closed Monday</li>
				</ul>';		

	if (!in_array($date_vars[0], $closed_dates) && !in_array($date_vars[0], $wildflower_days) && !in_array($date_vars[0], $winter_break)) {
		return $wfc_reg_hours;
	}

	if (in_array($date_vars[0], $closed_dates)) {
		return '<p class="text-alert">Closed Today</p>' . $wfc_reg_hours;
	}

	if (in_array($date_vars[0], $wildflower_days)) { //Display hours during Wildflower Days
		return '
				<ul>
					<li>9am – 5pm Everyday</li>
					<li>Through ' . end($wildflower_days) . '</li>
				</ul> ';
	}

	if (in_array($date_vars[0], $winter_break)) {
		return '<p class="text-alert">Closed Through ' . end($winter_break) . '</p>' . $wfc_reg_hours;
	}	
}
add_shortcode('wfc_hours', 'wfc_hours');

//Display Wildflower Café Hours
function wfc_cafe_hours() {
	$date_vars = wfc_date_vars();
	$closed_dates = wfc_closed_dates();
	$wildflower_days = wfc_wildflower_days();
	$winter_break = wfc_winter_break();

	$wfc_cafe_reg_hours = '
				<ul>
					<li>10am – 4pm Tues – Sat</li>
					<li>11am – 4pm Sun</li>
					<li>Closed Monday</li>
				</ul>';

	if (!in_array($date_vars[0], $closed_dates) && !in_array($date_vars[0], $wildflower_days) && !in_array($date_vars[0], $winter_break)) {	
		return $wfc_cafe_reg_hours;
	}

	if (in_array($date_vars[0], $closed_dates)) {
		return '<p class="text-alert">Closed Today</p>' . $wfc_cafe_reg_hours;
	}

	if (in_array($date_vars[0], $wildflower_days)) { //Display hours during Wildflower Days
		return '
				<ul>
					<li>9am – 4pm Everyday</li>
					<li>Through ' . end($wildflower_days) . '</li>
				</ul> ';
	}
	if (in_array($date_vars[0], $winter_break)) {
		return '<p class="text-alert">Closed Through ' . end($winter_break) . '</p>' . $wfc_cafe_reg_hours;
	}
}
add_shortcode('wfc_cafe_hours', 'wfc_cafe_hours');

//Display Wildflower Admission Prices
function wfc_prices() {
	return '
		<table>
			<tr><td>Members</td><td class="wfc-price">FREE</td></tr>
			<tr><td>Adults</td><td class="wfc-price">$10</td></tr>
			<tr><td>Seniors (65+)</td><td class="wfc-price">$8</td></tr>
			<tr><td>Students (with ID)</td><td class="wfc-price">$8</td></tr>
			<tr><td>Youth (5-17)</td><td class="wfc-price">$4</td></tr>
			<tr><td>Children (4 and youger)</td><td class="wfc-price">FREE</td></tr>
		</table>
	';
}
add_shortcode('wfc_prices', 'wfc_prices');

//Display Wildflower Address
function wfc_address() {
	return '
		<ul>
			<li>4801 La Crosse Ave</li>
			<li>Austin, Texas 78739</li>
			<li>512-232-0100</li>
		</ul>
	';
}
add_shortcode('wfc_address', 'wfc_address');
?>