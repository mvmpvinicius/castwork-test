<?php

	$return = new stdClass();

	if ($_POST['_p']['usuario']['senha'] != '' && $_POST['_p']['usuario']['login'] != '') {
		$getUser = $database->select('tb_usuarios', '*', [
			'login' => $_POST['_p']['usuario']['login']
		]);

		$pass = $getUser[0]['senha'];
		$compare_pass = md5(md5($_POST['_p']['usuario']['senha']).$getUser[0]['microtime']);

		if ($pass === $compare_pass) {
			$return->data = $getUser[0];
			$return->status = 'logged_on';
		} else {
			$return->status = 'wrong_pass';
		}
	} else {
		$return->status = 'missing_data';
	}

	echo json_encode($return);

?>