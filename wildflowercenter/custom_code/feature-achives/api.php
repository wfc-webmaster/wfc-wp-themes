<?php

        // set up the connection variables
        $db_name  = 'wfc_webdev';
        $hostname = 'mysqldb.its.utexas.edu';
        $username = 'wildflow';
        $password = 'VzseTzamEuSbXA58';

        // connect to the database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

        // a query get all the records from the users table
        // $sql = 'SELECT title FROM feature';
        $sql = 'SELECT summary FROM feature WHERE id=136';

        // use prepared statements, even if not strictly required is good practice
        $stmt = $dbh->prepare( $sql );

        // execute the query
        $stmt->execute();

        // fetch the results into an array
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        //print_r($result);

        // convert to json
        $json = json_encode($result, JSON_HEX_APOS | JSON_HEX_QUOT);

        // echo the json string
        echo $json;
?>

