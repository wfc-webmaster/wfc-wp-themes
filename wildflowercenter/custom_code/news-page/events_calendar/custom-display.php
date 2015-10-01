<div id="news-events-container" class="events-list-container">
    <div class="events-heading">
        <h6>Upcoming Events</h6>
        <p><em>What's happening at the Wildflower Center</em></p>
    </div>
    <div id="news-events-list" class="upcoming-events-list">

    <?php 
    // Ensure the global $post variable is in scope

    global $post;
     
    // Retrieve the next 5 upcoming events

    $events = tribe_get_events( 
        array(
            'posts_per_page' => 5,
            'start_date' => new DateTime(),
            'tax_query'=> array(
                        array(
                            'taxonomy' => 'tribe_events_cat',
                            'field' => 'slug',
                            'terms' => ['classes-programs', 'art-exhibit', 'kids']
                        )
                    )
        ) 
    );

    // The result set may be empty

    if (empty($events)) {
        echo 'Sorry, nothing found.';
    }
     
    // Loop through the events: set up each one as the current post then use template tags to display the title and content

    foreach ($events as $post) {
        setup_postdata($post);
     
        // This time, let's throw in an event-specific template tag to show the date after the title!
        ?>
        <a href="<?php echo tribe_get_event_link(); ?>">
        <?php
        the_title('<h6>', '</h6>');
        ?>
        </a>
        <?php
        echo '<p><em>' . tribe_get_start_date() . '</em></p>';
        // the_content();
    }
    ?>
    <div id="events-all"><a href="../events">View All Events</a></div>
    </div>
</div>