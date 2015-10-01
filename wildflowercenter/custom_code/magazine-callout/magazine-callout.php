<h2>Wildflower Magazine</h2>

<?php
//Include DB connection (from wp-config.php file)
global $wfc_db;

$wfc_db->show_errors();

//Get featured/latest magazine issue
$mag_query_curent = "
							SELECT *
	            FROM magazine
	            WHERE publish = 1
	            ORDER BY id DESC
	            LIMIT 1
							";

$mag_featured = $wfc_db->get_results($mag_query_curent);

foreach ($mag_featured as $featured) :

				$json_string = file_get_contents($featured->url);
				$parsed_json = json_decode($json_string, true);

				//var_dump($parsed_json);

				$title = $parsed_json['title'];
        $issue_url = $parsed_json['url'];
        $thumbnail = $parsed_json['thumbnail_url'];

        $issue_card = '<div id="magazine-featured" class="magazine-current-issue">';
        $issue_card .= '<a href="' . $issue_url . '" target="_blank"><img width="320" src="' . str_replace('_thumb_medium', '_thumb_large', $thumbnail) . '"></a>';
        $issue_card .= '<p>Wildflower magazine educates people about how native wildflowers, plants and landscapes affect our lives, not only through their beauty but also through the benefits they provide to ecosystems everywhere.</p>';
        $issue_card .= '<p>Published quarterly, the 36-page Wildflower magazine is available by joining the Wildflower Center.</p>';
        $issue_card .= '<a class="sidebar-button" href="' . $issue_url . '" target="_blank">Read Current Issue: ' . str_replace('Wildflower Magazine - ', '', $title) . '</a>';
        $issue_card .= '</div>';

        if ($parsed_json != null) {
                echo $issue_card;
        }

endforeach;

//Get recent magazine issues
$mag_query = "
	            SELECT *
	            FROM magazine
	            WHERE publish = 1
	            ORDER BY id DESC
	            LIMIT 3 OFFSET 1
	            ";

$results = $wfc_db->get_results($mag_query);

$i = 1;

foreach ($results as $issue) :
    
        $json_string = file_get_contents($issue->url);
        $parsed_json = json_decode($json_string, true);

        //var_dump($parsed_json);

        $title = $parsed_json['title'];
        $issue_url = $parsed_json['url'];
        $thumbnail = $parsed_json['thumbnail_url'];

        $issue_card = '<div id="magazine-' . $i . '" class="magazine-recent-issues">';
        $issue_card .= '<a href="' . $issue_url . '" target="_blank"><img width="230" src="' . str_replace('_thumb_medium', '_thumb_large', $thumbnail) . '"></a>';
        $issue_card .= '<h6><a href="' . $issue_url . '" target="_blank">' . str_replace(' - ', '<br />', $title) . '</a></h6>';
        $issue_card .= '</div>';
                        
        if ($parsed_json != null) {
                echo $issue_card;
        }
        $i++;
endforeach;

?>