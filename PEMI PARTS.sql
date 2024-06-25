DROP DATABASE IF EXISTS PemiDB;
CREATE DATABASE PemiDB;
USE PemiDB;

CREATE TABLE tb_usuarios(
    id_usuario INT PRIMARY KEY,
    imagen_usuario varchar(200),
    nombre VARCHAR(200) NOT NULL,
    apellido VARCHAR(200) NOT NULL,
    numero_telefono VARCHAR(60) NOT NULL, 
    cargo BOOLEAN NOT NULL,
    correo_electronico VARCHAR(200) UNIQUE NOT NULL,
    contraseña VARCHAR(200) NOT NULL
);

-- Falta pantalla de SCRUD
CREATE TABLE tb_categorias(
    id_categoria INT PRIMARY KEY,
    nombre VARCHAR(200)  
);

CREATE TABLE tb_productos(
    id_producto INT PRIMARY KEY,
    nombre_producto VARCHAR(200) NOT NULL,
    descripción_producto VARCHAR(200) NOT NULL,
    impuesto_producto DECIMAL(24,6) NOT NULL,
    imagen_producto VARCHAR(200),
    precio_producto DECIMAL(36,26) NOT NULL,
    costo_producción_producto DECIMAL(36,26),
    codigo_producto INT NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT fk_categoria_producto FOREIGN KEY (id_categoria)
    REFERENCES tb_categorias(id_categoria)
);

-- Falta pantalla de SCRUD
CREATE TABLE tb_almacenamientos(
    id_almacenamiento INT PRIMARY KEY,
    nombre_almacenamiento VARCHAR(200),
    tiempo_inicial TIME,
    tiempo_final TIME
);

-- Falta pantalla de SCRUD
CREATE TABLE tb_entidades(
    id_entidad INT PRIMARY KEY,
    id_almacenamiento INT,
    CONSTRAINT fk_almacenamiento FOREIGN KEY (id_almacenamiento)
    REFERENCES tb_almacenamientos(id_almacenamiento),
    id_producto INT,
    CONSTRAINT fk_entidad_almacenamiento FOREIGN KEY (id_producto)
    REFERENCES tb_productos(id_producto),
    existencias INT,
    estado ENUM('Disponible', 'Agotado', 'No disponible')
);

CREATE TABLE tb_empresas(
    id_empresa INT PRIMARY KEY,
    nombre_empresa VARCHAR(150) NOT NULL
);

-- Falta pantalla de SCRUD
CREATE TABLE tb_clientes(
    id_cliente INT PRIMARY KEY,
    nombre_cliente VARCHAR(200) NOT NULL,
    apellido_cliente VARCHAR(200) NOT NULL, 
    correo_electronico_cliente VARCHAR(200) UNIQUE NOT NULL,
    direccion_cliente VARCHAR(200) NOT NULL,
    id_empresa INT,
    CONSTRAINT fk_empresa_cliente FOREIGN KEY (id_empresa)
    REFERENCES tb_empresas(id_empresa),
    numero_telefono_cliente VARCHAR(200) NOT NULL,
    fax_cliente VARCHAR(200) NOT NULL,
    fecha_registro_cliente DATE NOT NULL,
    sufijo_cliente VARCHAR(150) NOT NULL
);

-- Falta pantalla de SCRUD
CREATE TABLE tb_envios(
    id_envio INT PRIMARY KEY,
    estado_envio ENUM('Entregado','Cancelado','Finalizado','Pendiente') DEFAULT 'Pendiente',
    fecha_estimada DATE NOT NULL,
    numero_seguimiento INT(100),
    etiqueta_edificacion VARCHAR(200) NOT NULL,
    id_cliente INT,
    CONSTRAINT fk_cliente_envio FOREIGN KEY (id_cliente)
    REFERENCES tb_clientes(id_cliente)
);

-- Falta pantalla de SCRUD
CREATE TABLE tb_detalle_envios(
    id_detalle_envio INT PRIMARY KEY,
    id_envio INT,
    CONSTRAINT fk_envio_producto FOREIGN KEY (id_envio)
    REFERENCES tb_envios(id_envio),
    medio_envio ENUM('Tierra', 'Mar', 'Aire'),
    costo_envio DECIMAL(36,26),
    impuesto_envio DECIMAL(36,26),
    id_entidad INT,
    CONSTRAINT fk_entidades_enviadas FOREIGN KEY (id_entidad)
    REFERENCES tb_entidades(id_entidad),
    cantidad_entidad INT,
    direccion_envio VARCHAR(100) NOT NULL
);

CREATE TABLE tb_notificaciones(
	id_notificacion INT PRIMARY KEY,
	estado_producto VARCHAR(50), -- estado_notificacion ENUM('Almacenes temporales','Almacenes duraderos','Chat de empleados')
	fecha_inicio DATE, -- fecha registro DATETIME DEFAULT NOW()
	fecha_final DATE, -- detalle
    id_usuario INT NOT NULL,
    CONSTRAINT fk_id_usuario_noti FOREIGN KEY (id_usuario)
    REFERENCES tb_usuarios(id_usuario)
);

CREATE TABLE tb_detalle_notificaciones(
    id_detalle_notificacion INT PRIMARY KEY,
    id_notificacion INT,
    CONSTRAINT fk_notis_entidades FOREIGN KEY (id_notificacion)
    REFERENCES tb_notificaciones(id_notificacion),
	nombre VARCHAR(150), -- detalle
	descripcion VARCHAR(200), -- detalle
    fecha_caducidad DATETIME NULL,
    factura VARCHAR(200) NULL
);

CREATE TABLE tb_chat(
    id_chat INT PRIMARY KEY,
    id_usuario_emisor INT,
    CONSTRAINT fk_id_usuario_emisor FOREIGN KEY (id_usuario_emisor)
    REFERENCES tb_usuarios(id_usuario),
    id_usuario_receptor INT,
    CONSTRAINT fk_id_usuario_receptor FOREIGN KEY (id_usuario_receptor)
    REFERENCES tb_usuarios(id_usuario),
    mensaje VARCHAR(250),
    fecha_registro DATE DEFAULT NOW()
);
