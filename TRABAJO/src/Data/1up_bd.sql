DROP DATABASE IF EXISTS 1up_bd;
CREATE DATABASE 1up_bd;
USE 1up_bd;

-- Aquí se guardarán los roles, los cuales pueden ser ADMINISTRADOR, VENDEDOR, ETC
DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
	id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    descripcion VARCHAR(20)
);

-- Aquí se guardarán todos los datos personales de cada persona que se registre en el sistema
DROP TABLE IF EXISTS personas;
CREATE TABLE personas(
	id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    apellido VARCHAR(50),
    nombre VARCHAR(50),
    tipo_doc VARCHAR(3),
    dni VARCHAR(8),
    domicilio VARCHAR(255),
    fecha_nac DATE,
    sexo VARCHAR(1),
    email VARCHAR(100),
    telefono VARCHAR(11),
    estado BOOLEAN NOT NULL DEFAULT TRUE);

-- Aquí se guardarán los usuarios de las personas y se les asignará un rol específico
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    id_persona INT,
    nombre_usuario VARCHAR(30),
    contraseña VARCHAR(255),
    id_rol INT,
    avatar VARCHAR(255),
    FOREIGN KEY (id_persona) REFERENCES personas(id),
    FOREIGN KEY (id_rol) REFERENCES roles(id)
);

-- Aquí se guardarán las categorias que puede tener cada producto 
DROP TABLE IF EXISTS categorias;
CREATE TABLE categorias(
	id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    descripcion VARCHAR(30) NOT NULL
);

-- Aquí se guardarán los productos de nuestra base de datos con su categoría correspondiente
DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    id_categoria INT NOT NULL,
    descuento DECIMAL(10 , 2 ) NOT NULL,
    oferta BOOLEAN,
    precio DECIMAL(10 , 2 ) NOT NULL,
    historia TEXT NOT NULL,
    requisitos TEXT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

-- Aquí se guardarán los encabezado de la compra que haga un usuario
DROP TABLE IF EXISTS carrito_compras;
CREATE TABLE carrito_compras(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    fecha TIMESTAMP NOT NULL,
    estado VARCHAR(25),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Aquí se guardarán todos los productos que el usuario haya puesto para comprar
DROP TABLE IF EXISTS carrito_compras_detalle;
CREATE TABLE carrito_compras_detalle(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito_compras INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10 , 2 ),
    descuento DECIMAL(10 , 2 ),
    total DECIMAL(10 , 2 ),
    FOREIGN KEY (id_carrito_compras) REFERENCES carrito_compras(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- DATOS PARA PRUEBAS

INSERT INTO categorias (id, descripcion) VALUES
(1, 'Consolas'),
(2, 'Cartuchos'),
(3, 'Accesorios');

INSERT INTO productos (nombre, imagen, precio, descuento, oferta, descripcion, requisitos, historia, id_categoria) VALUES
('007 The World is not Enough', 'n64_007worldisnotenough02.png', 40000, '15', 0, 'En 007: The World Is Not Enough, juegas como James Bond, el famoso agente secreto del MI6, en una emocionante aventura llena de acción. Viaja por el mundo, desmantela organizaciones criminales y salva el día en este trepidante juego de disparos en primera persona para Nintendo 64.', 'Procesador: Ricoh 5A22, basado en el procesador WDC W65C816 de 16 bits. Velocidad de reloj: 1.79, 2.68 MHz, o 3.58 MHz (NTSC); 1,77 MHz, 2,66 MHz o 3,55 MHz (PAL). Memoria RAM principal: 128 KB. Sonido: Sony SPC700 de 8 bits - Procesador digital de sonido: S-DSP de 16 bits. Video: Circuitos S-PPU1 y S-PPU2, unidades de procesamiento de imagen de 16 bits. Alimentación: La fuentes de alimentación varían dependiendo de los modelos liberados en los diferentes mercados.', 'Lanzado en el año 2000, 007: The World is not Enough continuó el legado de los videojuegos de James Bond. Recibió críticas positivas por su atractiva trama y su emocionante jugabilidad.', 2),
('Sega Genesis', 'default-image.png', 5000, '30', 1, 'La Sega Genesis, también conocida como Mega Drive en algunas regiones, es una de las consolas de videojuegos más icónicas de la década de 1990. Con su amplio catálogo de juegos, gráficos impresionantes para su época y el legendario Sonic the Hedgehog, la Sega Genesis proporcionó horas de diversión a millones de jugadores en todo el mundo.', 'Procesador: Procesador personalizado de Sega. Velocidad de reloj: Varía según el modelo. Memoria RAM principal: Depende del modelo. Sonido: Chip de sonido Yamaha. Video: Procesador de gráficos VDP de Sega. Alimentación: Varía dependiendo del modelo y región.', 'Lanzada en 1988, Sega Genesis se convirtió en un nombre familiar, compitiendo con la dominación de Nintendo. Sonic the Hedgehog, la mascota icónica, contribuyó a su inmenso éxito.', 1),
('Nintendo 64', 'Nintendo64.jpg', 200000, '10', 0, 'La Nintendo 64, lanzada por Nintendo en 1996, es una de las consolas más queridas de todos los tiempos. Con su innovador controlador de tres asas y títulos clásicos como Super Mario 64, The Legend of Zelda: Ocarina of Time y Mario Kart 64, la Nintendo 64 dejó una huella imborrable en la historia de los videojuegos.', 'Procesador: NEC VR4300 de 64 bits. Velocidad de reloj: 93.75 MHz. Memoria RAM principal: 4 MB RDRAM. Sonido: Chip de sonido personalizado. Video: Circuito de gráficos Reality Co-Processor. Alimentación: Adaptador de corriente específico de la consola.', 'Lanzada en 1996, Nintendo 64 conquistó los corazones de los jugadores con su innovador control de tres asas y clásicos atemporales como Super Mario 64 y The Legend of Zelda: Ocarina of Time.', 1),
('Tamagotchi', 'Tamagotchi.jpg', 50000, '10', 0, 'Los Tamagotchis fueron mascotas virtuales muy populares en la década de 1990. Estos pequeños dispositivos permitían a los usuarios cuidar a una criatura digital, alimentarla, jugar con ella y asegurarse de que estuviera sana y feliz. Los Tamagotchis se convirtieron en una verdadera sensación, proporcionando a personas de todas las edades una experiencia única de cuidado de mascotas.', 'Requiere 1 batería CR2032 (incluida).', 'Tamagotchi, lanzado en la década de 1990, se convirtió en un fenómeno cultural, permitiendo a los usuarios cuidar de mascotas virtuales. Proporcionó una experiencia única y adictiva para personas de todas las edades.', 2),
('PlayStation One', 'Play1.jpg', 150000, '20', 1, 'La PlayStation One, también conocida como PSX o PS1, revolucionó la industria de los videojuegos cuando se lanzó en 1994. Con su amplio catálogo de juegos, incluidos clásicos como Final Fantasy VII, Metal Gear Solid y Gran Turismo, la PS1 marcó el comienzo de la era de los juegos en 3D y proporcionó horas de entretenimiento a millones de jugadores en todo el mundo.', 'Procesador: CPU R3000A a 33.8688 MHz. Memoria RAM principal: 2 MB. Sonido: Procesador de sonido y efectos 3D. Video: GPU a 1.5 MB de RAM de video. Alimentación: Adaptador de corriente específico de la consola.', 'La PlayStation One, lanzada en 1994, revolucionó la industria del juego. Sus capacidades 3D y una destacada alineación de juegos, incluyendo clásicos como Final Fantasy VII, la convirtieron en un ícono de los videojuegos.', 1),
('Donkey Kong 64', 'n64_donkeykong64_jp.png', 150000, '20', 1, 'Donkey Kong 64 es un juego de plataformas en 3D lanzado para la Nintendo 64 en 1999. En este juego, controlas a Donkey Kong y otros personajes de la serie mientras te aventuras a través de diferentes mundos para rescatar a los amigos de Donkey Kong y recuperar las bananas robadas por el malvado King K. Rool. Con su jugabilidad divertida y su vasto mundo para explorar, Donkey Kong 64 es un clásico atemporal para los amantes de los juegos de plataformas.','Procesador: NEC VR4300 de 64 bits. Velocidad de reloj: 93.75 MHz. Memoria RAM principal: 4 MB RDRAM. Sonido: Chip de sonido personalizado. Video: Circuito de gráficos Reality Co-Processor. Alimentación: Adaptador de corriente específico de la consola.', 'Donkey Kong 64 es un clásico juego de plataformas lanzado para la Nintendo 64 en 1999. En esta aventura, controlas a Donkey Kong y otros personajes mientras te aventuras a través de diferentes mundos para rescatar a los amigos de Donkey Kong y recuperar las bananas robadas por el malvado King K. Rool. Con su jugabilidad divertida y su vasto mundo para explorar, Donkey Kong 64 es una joya atemporal para los amantes de los juegos de plataformas.',2)