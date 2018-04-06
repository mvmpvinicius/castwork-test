<?php

	require_once("/classes/medoo.php");

	// error_reporting(0);

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	$database = new medoo([
		'database_type' => 'mysql',
		'database_name' => 'castwork',
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8',
	]);

?>