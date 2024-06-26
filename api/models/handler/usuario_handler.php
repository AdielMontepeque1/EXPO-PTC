<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class UsuarioHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $telefono = null;
    protected $cargo = null;
    protected $alias = null;
    protected $clave = null;
    protected $imagen = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_usuario, correo_electronico, contraseña
                FROM tb_usuarios
                WHERE correo_electronico = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['contraseña'])) {
            $_SESSION['idUsuario'] = $data['id_usuario'];
            $_SESSION['correoUsuario'] = $data['correo_electronico'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT contraseña
                FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($_SESSION['idUsuario']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['contraseña'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE administrador
                SET clave_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->clave, $_SESSION['idadministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, correo_administrador, alias_administrador
                FROM administrador
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE administrador
                SET nombre_administrador = ?, apellido_administrador = ?, correo_administrador = ?, alias_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->alias, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, correo_administrador, alias_administrador
                FROM administrador
                WHERE apellido_administrador LIKE ? OR nombre_administrador LIKE ?
                ORDER BY apellido_administrador';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios(imagen_usuario, nombre, apellido, numero_telefono, cargo, correo_electronico, contraseña )
                VALUES(?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->imagen, $this->nombre, $this->apellido, $this->telefono, $this->cargo, $this->correo, $this->clave);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_usuario, imagen_usuario, nombre, apellido, numero_telefono, cargo, correo_electronico, contraseña
                FROM tb_usuarios
                ORDER BY apellido';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, correo_administrador, alias_administrador
                FROM administrador
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE administrador
                SET nombre_administrador = ?, apellido_administrador = ?, correo_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM administrador
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
