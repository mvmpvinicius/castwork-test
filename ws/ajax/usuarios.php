<?php

	$return = new stdClass();

	switch ($_POST['_p']['acao']) {
		case 'create':
			$salt = substr(md5(microtime(true)), 0, 8);
			$pass = md5(md5($_POST['_p']['usuario']['senha']).$salt);

			$database->insert('tb_usuarios', [
				'nome' => $_POST['_p']['usuario']['nome'],
				'login' => $_POST['_p']['usuario']['login'],
				'email' => $_POST['_p']['usuario']['email'],
				'senha' => $pass,
				'microtime' => $salt
			]);
			break;
		case 'read':
			$return = $database->select('tb_usuarios', '*', [
				'id' => $_POST['_p']['id']
			]);
			break;
		case 'update':
			$database->update('tb_usuarios', [
				'nome' => $_POST['_p']['usuario']['nome'],
				'login' => $_POST['_p']['usuario']['login'],
				'email' => $_POST['_p']['usuario']['email']
			], [
				'id' => $_POST['_p']['usuario']['id']
			]);
			break;
		case 'delete':
			$database->delete('tb_usuarios', [
				'id' => $_POST['_p']['id']
			]);
			break;
		case 'getAll':
			$return = $database->select('tb_usuarios', '*');
			break;
		case 'updatePass':
			$salt = substr(md5(microtime(true)), 0, 8);
			$pass = md5(md5($_POST['_p']['nova_senha']).$salt);

			$database->update('tb_usuarios', [
				'senha' => $pass
			], [
				'id' => $_POST['_p']['id']
			]);
			break;
	}

	echo json_encode($return);

?>