<?php
/**
 * All of the global functions to be used everywhere in Headway.
 *
 * @package Headway
 * @author Clay Griffiths
 **/

class Headway {
	
	
	public static $loaded_classes = array();
	
	
	/**
	 * Let's get Headway on the road!  We'll define constants here, run the setup function and do a few other fun things.
	 * 
	 * @return void
	 **/
	public static function init() {

		global $wpdb;

		/* Legacy element default handling */
		$GLOBALS['headway_default_element_data'] = array();
				
		/* Define simple constants */
		define('THEME_FRAMEWORK', 'headway');
		define('HEADWAY_VERSION', '3.8.7');

		/* Define directories */
		define('HEADWAY_DIR', headway_change_to_unix_path(TEMPLATEPATH));
		define('HEADWAY_LIBRARY_DIR', headway_change_to_unix_path(HEADWAY_DIR . '/library'));

		/* Site URLs */
		define('HEADWAY_SITE_URL', 'http://headwaythemes.com/');
		define('HEADWAY_DASHBOARD_URL', HEADWAY_SITE_URL . 'dashboard');
		define('HEADWAY_EXTEND_URL', HEADWAY_SITE_URL . 'extend');

		/* Skins */
		define('HEADWAY_DEFAULT_SKIN', 'base');

		/* MySQL Table names */
		$wpdb->hw_blocks = $wpdb->prefix . 'hw_blocks';
		$wpdb->hw_wrappers = $wpdb->prefix . 'hw_wrappers';
		$wpdb->hw_snapshots = $wpdb->prefix . 'hw_snapshots';
		$wpdb->hw_layout_meta = $wpdb->prefix . 'hw_layout_meta';

		/* Handle child themes */
		if ( get_template_directory_uri() !== get_stylesheet_directory_uri() ) {
			define('HEADWAY_CHILD_THEME_ACTIVE', true);
			define('HEADWAY_CHILD_THEME_DIR', get_stylesheet_directory());
		} else {
			define('HEADWAY_CHILD_THEME_ACTIVE', false);
			define('HEADWAY_CHILD_THEME_DIR', null);
		}

		/* Handle uploads directory and cache */
		$uploads = wp_upload_dir();
		
		define('HEADWAY_UPLOADS_DIR', headway_change_to_unix_path($uploads['basedir'] . '/headway'));		
		define('HEADWAY_CACHE_DIR', headway_change_to_unix_path(HEADWAY_UPLOADS_DIR . '/cache'));

		/* Make directories if they don't exist */
		if ( !is_dir(HEADWAY_UPLOADS_DIR) )
			wp_mkdir_p(HEADWAY_UPLOADS_DIR);
			
		if ( !is_dir(HEADWAY_CACHE_DIR) )
			wp_mkdir_p(HEADWAY_CACHE_DIR);

		self::add_index_files_to_uploads();
		
		/* Load locale */
		load_theme_textdomain('headway', headway_change_to_unix_path(HEADWAY_LIBRARY_DIR . '/languages'));
			
		/* Add support for WordPress features */
		add_action('after_setup_theme', array(__CLASS__, 'add_theme_support'), 1);
				
		/* Setup */
		add_action('after_setup_theme', array(__CLASS__, 'child_theme_setup'), 2);
		add_action('after_setup_theme', array(__CLASS__, 'load_dependencies'), 3);
		add_action('after_setup_theme', array(__CLASS__, 'maybe_db_upgrade'));
		add_action('after_setup_theme', array(__CLASS__, 'initiate_updater'));

	}


	public static function add_index_files_to_uploads() {

		$content = '<?php' . "\n" .
		'/* Disallow directory browsing */';

		$uploads_index = trailingslashit( HEADWAY_UPLOADS_DIR ) . 'index.php';
		$cache_index = trailingslashit( HEADWAY_CACHE_DIR ) . 'index.php';

		if ( ! is_file( $uploads_index  ) ) {

			$file_handle = @fopen( $uploads_index, 'w' );
			@fwrite( $file_handle, $content );
			@chmod( $uploads_index, 0644 );

		}

		if ( ! is_file( $cache_index ) ) {

			$file_handle = @fopen( $cache_index, 'w' );
			@fwrite( $file_handle, $content );
			@chmod( $cache_index, 0644 );

		}

	}

	
	/**
	 * Loads all of the required core classes and initiates them.
	 * 
	 * Dependency array setup: class (string) => init (bool)
	 **/
	public static function load_dependencies() {
						
		//Load route right away so we can optimize dependency loading below
		Headway::load(array('common/route' => true));		
						
		//Core loading set
		$dependencies = array(
			'defaults/default-design-settings',

			'data/data-options' => 'Option',
			'data/data-layout-options' => 'LayoutOption',
			'data/data-skin-options',
			'data/data-blocks',
			'data/data-wrappers',
			'data/data-snapshots',

			'common/layout' => true,
			'common/capabilities' => true,
			'common/responsive-grid' => true,
			'common/seo' => true,
			'common/social-optimization' => true,
			'common/feed' => true,
			'common/compiler' => true,
			'common/templates',
						
			'admin/admin-bar' => true,		
			
			'api/api-panel',

			'updater/plugin-updater',
			'updater/theme-updater',
				
			'blocks' => true,
			'wrappers' => true,
			'elements' => true,

			'fonts/web-fonts-api',
			'fonts/web-fonts-loader' => true,
			'fonts/traditional-fonts',
			'fonts/google-fonts',
						
			'display' => true,

			'widgets' => true,

			'compatibility/woocommerce/compatibility-woocommerce' => 'CompatibilityWooCommerce'
		);
		
		//Child theme API
		if ( HEADWAY_CHILD_THEME_ACTIVE === true )
			$dependencies['api/api-child-theme'] = 'ChildThemeAPI';
		
		//Visual editor classes
		if ( HeadwayRoute::is_visual_editor() || (defined('DOING_AJAX') && DOING_AJAX && strpos($_REQUEST['action'], 'headway') !== false ) )
			$dependencies['visual-editor'] = true;

		//Admin classes
		if ( is_admin() )
			$dependencies['admin'] = true;
			
		//Load stuff now
		Headway::load(apply_filters('headway_dependencies', $dependencies));
		
		do_action('headway_setup');

	}
	
	
	/**
	 * Tell WordPress that Headway supports its features.
	 **/
	public static function add_theme_support() {

		/* Headway Functionality */
		add_theme_support( 'headway-grid' );
		add_theme_support( 'headway-responsive-grid' );
		add_theme_support( 'headway-design-editor' );

		/* Headway CSS */
		add_theme_support( 'headway-reset-css' );
		add_theme_support( 'headway-live-css' );
		add_theme_support( 'headway-block-basics-css' );
		add_theme_support( 'headway-dynamic-block-css' );
		add_theme_support( 'headway-content-styling-css' );

		/* WordPress Functionality */
		add_theme_support( 'html5', array( 'caption' ) );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'widgets' );
		add_theme_support( 'editor-style' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );

		/* Loop Standard by PluginBuddy */
		require_once HEADWAY_LIBRARY_DIR . '/resources/dynamic-loop.php';
		add_theme_support('loop-standard');
				
	}
	
	
	/**
	 **/
	public static function child_theme_setup() {
		
		if ( !HEADWAY_CHILD_THEME_ACTIVE )
			return false;
			
		do_action('headway_setup_child_theme');
		
	}
	
	
	/**
	 * This will process upgrades from one version to another.
	 **/
	public static function maybe_db_upgrade() {

		global $wpdb;

		$headway_settings = get_option('headway', array('version' => 0));
		$db_version = $headway_settings['version'];

		/* If this is a fresh install then we need to merge in the default design editor settings */
			if ( $db_version === 0 && !get_option('headway_option_group_general') ) {

				HeadwayElementsData::merge_core_default_design_data();

				self::mysql_dbdelta();

				/* Update the version here. */
				$headway_settings = get_option('headway', array('version' => 0));
				$headway_settings['version'] = HEADWAY_VERSION;

				update_option('headway', $headway_settings);

				return $headway_settings;

			}
			
		/* If the version in the database is already up to date, then there are no upgrade functions to be ran. */
		if ( version_compare($db_version, HEADWAY_VERSION, '>=') ) {
			if ( get_option('headway_upgrading') ) {
				delete_option('headway_upgrading');
			}

			return false;
		}

		Headway::load('maintenance/upgrades');

		return HeadwayMaintenance::do_upgrades();
		
	}


	public static function mysql_drop_tables() {

		global $wpdb;

		/* Drop tables first */
		$wpdb->query( "DROP TABLE IF EXISTS $wpdb->hw_blocks" );
		$wpdb->query( "DROP TABLE IF EXISTS $wpdb->hw_wrappers" );
		$wpdb->query( "DROP TABLE IF EXISTS $wpdb->hw_layout_meta" );
		$wpdb->query( "DROP TABLE IF EXISTS $wpdb->hw_snapshots" );

	}

	public static function mysql_dbdelta() {

		global $wpdb;

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		$charset_collate = '';

		if ( ! empty( $wpdb->charset ) ) {
			$charset_collate = "DEFAULT CHARACTER SET $wpdb->charset";
		}
		if ( ! empty( $wpdb->collate ) ) {
			$charset_collate .= " COLLATE $wpdb->collate";
		}

		$hw_blocks_sql = "CREATE TABLE $wpdb->hw_blocks (
					  id char(20) NOT NULL,
					  template varchar(100) NOT NULL,
					  layout varchar(80) NOT NULL,
					  type varchar(30) NOT NULL,
					  wrapper_id char(20) NOT NULL,
					  position blob NOT NULL,
					  dimensions blob NOT NULL,
					  settings mediumblob,
					  mirror_id char(20) DEFAULT NULL,
					  legacy_id int(11) unsigned DEFAULT NULL,
					  PRIMARY KEY  (id,template),
					  KEY layout (layout),
					  KEY type (type)
					) $charset_collate;";

		dbDelta($hw_blocks_sql);


		$hw_wrappers_sql = "CREATE TABLE $wpdb->hw_wrappers (
					  id char(20) NOT NULL,
					  template varchar(100) NOT NULL,
					  layout varchar(80) NOT NULL,
					  position tinyint(2) unsigned DEFAULT NULL,
					  settings mediumblob,
					  mirror_id char(20) DEFAULT NULL,
					  legacy_id int(11) unsigned DEFAULT NULL,
					  PRIMARY KEY  (id,template),
					  KEY layout (layout)
					) $charset_collate;";

		dbDelta($hw_wrappers_sql);


		$hw_layout_meta_sql = "CREATE TABLE $wpdb->hw_layout_meta (
					  meta_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
					  template varchar(100) NOT NULL,
					  layout varchar(80) NOT NULL,
					  meta_key varchar(255),
					  meta_value mediumblob,
					  PRIMARY KEY  (meta_id,template),
					  KEY template (layout)
					) $charset_collate;";

		dbDelta($hw_layout_meta_sql);


		$hw_snapshots_sql = "CREATE TABLE $wpdb->hw_snapshots (
					  id int(11) unsigned NOT NULL AUTO_INCREMENT,
					  template varchar(100) NOT NULL,
					  timestamp datetime NOT NULL,
					  comments text,
					  data_wp_options longblob,
					  data_wp_postmeta longblob,
					  data_hw_layout_meta longblob,
					  data_hw_wrappers longblob,
					  data_hw_blocks longblob,
					  data_other longblob,
					  PRIMARY KEY  (id),
					  KEY template (template)
					) $charset_collate;";

		dbDelta($hw_snapshots_sql);

		if ( function_exists('maybe_convert_table_to_utf8mb4') ) {

			maybe_convert_table_to_utf8mb4( $wpdb->hw_blocks );
			maybe_convert_table_to_utf8mb4( $wpdb->hw_wrappers );
			maybe_convert_table_to_utf8mb4( $wpdb->hw_layout_meta );
			maybe_convert_table_to_utf8mb4( $wpdb->hw_snapshots );

		}

	}


	public static function set_autoload($template = null) {

		global $wpdb;

		if ( !$template ) {
			$template = HeadwayOption::$current_skin;
		}

		$wpdb->query( "UPDATE $wpdb->options SET autoload = 'no' WHERE option_name LIKE 'headway_%'" );

		$wpdb->update( $wpdb->options, array(
			'autoload' => 'yes'
		), array(
			'option_name' => 'headway_option_group_general'
		) );

		$wpdb->update( $wpdb->options, array(
			'autoload' => 'yes'
		), array(
			'option_name' => 'headway_|template=' . $template . '|_option_group_general'
		) );

	}


	/**
	 * Initiate the HeadwayUpdaterAPI class for Headway itself.
	 **/
	public static function initiate_updater() {
		
		$GLOBALS['headway_updater'] = new Headway_Theme_Updater(array(
			'remote_api_url' 	=> HEADWAY_SITE_URL,
			'version' 			=> HEADWAY_VERSION,
			'license' 			=> headway_get_license_key('headway'),
			'slug'				=> 'headway',
			'item_name'			=> 'Headway',
			'author'			=> 'Headway Themes'
		));

	}

	
	/**
	 * Here's our function to load classes and files when needed from the library.
	 **/
	public static function load($classes, $init = false) {
		
		//Build in support to either use array or a string
		if ( !is_array($classes) ) {
			$load[$classes] = $init;
		} else {
			$load = $classes;
		}
		
		$classes_to_init = array();
		
		//Remove already loaded classes from the array
		foreach ( Headway::$loaded_classes as $class ) {
			unset($load[$class]);
		}
				
		foreach ( $load as $file => $init ) {
			
			//Check if only value is used instead of both key and value pair
			if ( is_numeric($file) ){
				$file = $init;
				$init = false;
			} 
						
			//Handle anything with .php or a full path
			if ( strpos($file, '.php') !== false ) 
				require_once HEADWAY_LIBRARY_DIR . '/' . $file;
				
			//Handle main-helpers such as admin, data, etc.
			elseif ( strpos($file, '/') === false )
				require_once HEADWAY_LIBRARY_DIR . '/' . $file . '/' . $file . '.php';
				
			//Handle anything and automatically insert .php if need be
			elseif ( strpos($file, '/') !== false )
				require_once HEADWAY_LIBRARY_DIR . '/' . $file . '.php';
				
			//Add the class to the main variable so we know that it has been loaded
			Headway::$loaded_classes[] = $file;
			
			//Set up init, if init is true, just figure out the class name from filename.  If argument is string, use that.
			if ( $init === true ) {
				
				$class = array_reverse(explode('/', str_replace('.php', '', $file)));
				
				//Check for hyphens/underscores and CamelCase it
				$class = str_replace(' ', '', ucwords(str_replace('-', ' ', str_replace('_', ' ', $class[0]))));
				
				$classes_to_init[] = $class;
				
			} else if ( is_string($init) ) {
				
				$classes_to_init[] = $init;
				
			}
			
		}	
		
		//Init everything after dependencies have been loaded
		foreach($classes_to_init as $class){
			
			if ( method_exists('Headway' . $class, 'init') ) {
				
				call_user_func(array('Headway' . $class, 'init'));
				
			} else {
				
				trigger_error('Headway' . $class . '::init is not a valid method', E_USER_WARNING);
				
			}
			
		}
		
	}


	public static function get() {
		_deprecated_function(__FUNCTION__, '3.1.3', 'headway_get()');
		$args = func_get_args();
		return call_user_func_array('headway_get', $args);
	}


	public static function post() {
		_deprecated_function(__FUNCTION__, '3.1.3', 'headway_post()');
		$args = func_get_args();
		return call_user_func_array('headway_post', $args);
	}

	
}