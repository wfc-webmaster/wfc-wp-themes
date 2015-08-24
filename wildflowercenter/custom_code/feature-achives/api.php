<?php

        // set up the connection variables
        $db_name  = 'wfc_webdev';
        $hostname = 'mysqldb.its.utexas.edu';
        $username = 'wildflow';
        $password = 'VzseTzamEuSbXA58';

        // connect to the database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name;charset=utf8", $username, $password);

        // a query get all the records from the users table
        // $sql = 'SELECT title FROM feature';
        $sql = 'SELECT * FROM feature WHERE id>=1';

        // use prepared statements, even if not strictly required is good practice
        $stmt = $dbh->prepare( $sql );

        // execute the query
        $stmt->execute();

        // fetch the results into an array
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // convert to json
        $json = json_encode($result);


        // echo the json string
        echo $json;
?>

