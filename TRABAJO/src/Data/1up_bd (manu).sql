-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2024 a las 15:41:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `1up_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_compras`
--

CREATE TABLE `carrito_compras` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_compras_detalle`
--

CREATE TABLE `carrito_compras_detalle` (
  `id` int(11) NOT NULL,
  `id_carrito_compras` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `descripcion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `created_at`, `updated_at`, `deleted_at`, `descripcion`) VALUES
(1, NULL, NULL, NULL, 'Consolas'),
(2, NULL, NULL, NULL, 'Cartuchos'),
(3, NULL, NULL, NULL, 'Accesorios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `tipo_doc` varchar(3) DEFAULT NULL,
  `dni` varchar(8) DEFAULT NULL,
  `domicilio` varchar(255) DEFAULT NULL,
  `fk_localizacion` int(11) DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `created_at`, `updated_at`, `deleted_at`, `apellido`, `nombre`, `tipo_doc`, `dni`, `domicilio`, `fk_localizacion`, `fecha_nac`, `sexo`, `email`, `telefono`, `estado`) VALUES
(6, '2024-04-25 20:20:52', '2024-04-25 20:20:52', NULL, 'Tejerina', 'Emanuel', 'DNI', '31463710', 'dr balbin', NULL, '1985-04-30', 'M', 'emanueljtejerina@gmail.com', '3885175148', 1),
(7, '2024-05-27 13:23:04', '2024-05-27 13:23:04', NULL, 'perez', 'jose', 'DNI', '31463710', 'a', NULL, '1985-01-01', 'M', 'jose@prerez.com', '388', 1),
(8, '2024-05-27 23:39:05', '2024-05-27 23:39:05', NULL, 'conde', 'catriel', 'DNI', '1111', 'asd', NULL, '0001-01-01', 'M', 'catriel@conde.com', '333', 1),
(9, '2024-06-04 13:17:51', '2024-06-04 13:17:51', NULL, 'prueba', 'manu', 'DNI', '31463710', 'asd', NULL, '1985-01-01', 'M', 'asd@asd.com', '654654', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `descuento` decimal(10,2) NOT NULL,
  `oferta` tinyint(1) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `historia` text NOT NULL,
  `requisitos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `created_at`, `updated_at`, `deleted_at`, `nombre`, `descripcion`, `imagen`, `id_categoria`, `descuento`, `oferta`, `precio`, `historia`, `requisitos`) VALUES
(1, NULL, NULL, NULL, '007 The World is not Enough', 'En 007: The World Is Not Enough, juegas como James Bond, el famoso agente secreto del MI6, en una emocionante aventura llena de acción. Viaja por el mundo, desmantela organizaciones criminales y salva el día en este trepidante juego de disparos en primera persona para Nintendo 64.', 'n64_007worldisnotenough02.png', 2, 15.00, 0, 40000.00, 'Lanzado en el año 2000, 007: The World is not Enough continuó el legado de los videojuegos de James Bond. Recibió críticas positivas por su atractiva trama y su emocionante jugabilidad.', 'Procesador: Ricoh 5A22, basado en el procesador WDC W65C816 de 16 bits. Velocidad de reloj: 1.79, 2.68 MHz, o 3.58 MHz (NTSC); 1,77 MHz, 2,66 MHz o 3,55 MHz (PAL). Memoria RAM principal: 128 KB. Sonido: Sony SPC700 de 8 bits - Procesador digital de sonido: S-DSP de 16 bits. Video: Circuitos S-PPU1 y S-PPU2, unidades de procesamiento de imagen de 16 bits. Alimentación: La fuentes de alimentación varían dependiendo de los modelos liberados en los diferentes mercados.'),
(2, NULL, NULL, NULL, 'Sega Genesis', 'La Sega Genesis, también conocida como Mega Drive en algunas regiones, es una de las consolas de videojuegos más icónicas de la década de 1990. Con su amplio catálogo de juegos, gráficos impresionantes para su época y el legendario Sonic the Hedgehog, la Sega Genesis proporcionó horas de diversión a millones de jugadores en todo el mundo.', 'default-image.png', 1, 30.00, 1, 5000.00, 'Lanzada en 1988, Sega Genesis se convirtió en un nombre familiar, compitiendo con la dominación de Nintendo. Sonic the Hedgehog, la mascota icónica, contribuyó a su inmenso éxito.', 'Procesador: Procesador personalizado de Sega. Velocidad de reloj: Varía según el modelo. Memoria RAM principal: Depende del modelo. Sonido: Chip de sonido Yamaha. Video: Procesador de gráficos VDP de Sega. Alimentación: Varía dependiendo del modelo y región.'),
(3, NULL, '2024-04-25 12:00:16', NULL, 'Nintendo 64', 'La Nintendo 64, lanzada por Nintendo en 1996, es una de las consolas más queridas de todos los tiempos. Con su innovador controlador de tres asas y títulos clásicos como Super Mario 64, The Legend of Zelda: Ocarina of Time y Mario Kart 64, la Nintendo 64 dejó una huella imborrable en la historia de los videojuegos.\r\n                    \r\n                    ', 'Nintendo64.jpg', 1, 10.00, 1, 200000.00, 'Lanzada en 1996, Nintendo 64 conquistó los corazones de los jugadores con su innovador control de tres asas y clásicos atemporales como Super Mario 64 y The Legend of Zelda: Ocarina of Time.\r\n                    \r\n                    ', 'Procesador: NEC VR4300 de 64 bits. Velocidad de reloj: 93.75 MHz. Memoria RAM principal: 4 MB RDRAM. Sonido: Chip de sonido personalizado. Video: Circuito de gráficos Reality Co-Processor. Alimentación: Adaptador de corriente específico de la consola.\r\n                    \r\n                    '),
(4, NULL, NULL, NULL, 'Tamagotchi', 'Los Tamagotchis fueron mascotas virtuales muy populares en la década de 1990. Estos pequeños dispositivos permitían a los usuarios cuidar a una criatura digital, alimentarla, jugar con ella y asegurarse de que estuviera sana y feliz. Los Tamagotchis se convirtieron en una verdadera sensación, proporcionando a personas de todas las edades una experiencia única de cuidado de mascotas.', 'Tamagotchi.jpg', 2, 10.00, 0, 50000.00, 'Tamagotchi, lanzado en la década de 1990, se convirtió en un fenómeno cultural, permitiendo a los usuarios cuidar de mascotas virtuales. Proporcionó una experiencia única y adictiva para personas de todas las edades.', 'Requiere 1 batería CR2032 (incluida).'),
(5, NULL, NULL, NULL, 'PlayStation One', 'La PlayStation One, también conocida como PSX o PS1, revolucionó la industria de los videojuegos cuando se lanzó en 1994. Con su amplio catálogo de juegos, incluidos clásicos como Final Fantasy VII, Metal Gear Solid y Gran Turismo, la PS1 marcó el comienzo de la era de los juegos en 3D y proporcionó horas de entretenimiento a millones de jugadores en todo el mundo.', 'Play1.jpg', 1, 20.00, 1, 150000.00, 'La PlayStation One, lanzada en 1994, revolucionó la industria del juego. Sus capacidades 3D y una destacada alineación de juegos, incluyendo clásicos como Final Fantasy VII, la convirtieron en un ícono de los videojuegos.', 'Procesador: CPU R3000A a 33.8688 MHz. Memoria RAM principal: 2 MB. Sonido: Procesador de sonido y efectos 3D. Video: GPU a 1.5 MB de RAM de video. Alimentación: Adaptador de corriente específico de la consola.'),
(6, NULL, NULL, NULL, 'Donkey Kong 64', 'Donkey Kong 64 es un juego de plataformas en 3D lanzado para la Nintendo 64 en 1999. En este juego, controlas a Donkey Kong y otros personajes de la serie mientras te aventuras a través de diferentes mundos para rescatar a los amigos de Donkey Kong y recuperar las bananas robadas por el malvado King K. Rool. Con su jugabilidad divertida y su vasto mundo para explorar, Donkey Kong 64 es un clásico atemporal para los amantes de los juegos de plataformas.', 'n64_donkeykong64_jp.png', 2, 20.00, 1, 150000.00, 'Donkey Kong 64 es un clásico juego de plataformas lanzado para la Nintendo 64 en 1999. En esta aventura, controlas a Donkey Kong y otros personajes mientras te aventuras a través de diferentes mundos para rescatar a los amigos de Donkey Kong y recuperar las bananas robadas por el malvado King K. Rool. Con su jugabilidad divertida y su vasto mundo para explorar, Donkey Kong 64 es una joya atemporal para los amantes de los juegos de plataformas.', 'Procesador: NEC VR4300 de 64 bits. Velocidad de reloj: 93.75 MHz. Memoria RAM principal: 4 MB RDRAM. Sonido: Chip de sonido personalizado. Video: Circuito de gráficos Reality Co-Processor. Alimentación: Adaptador de corriente específico de la consola.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `descripcion` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `created_at`, `updated_at`, `deleted_at`, `descripcion`) VALUES
(1, NULL, NULL, NULL, 'Admin'),
(2, NULL, NULL, NULL, 'Saler'),
(3, NULL, NULL, NULL, 'Buyer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) DEFAULT NULL,
  `nombre_usuario` varchar(30) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_persona`, `nombre_usuario`, `password`, `id_rol`, `avatar`) VALUES
(2, 6, 'manu', '$2a$10$Phl8LpnGHpPFlIRC6R.NQOnKXqdg.1xrTVwUneYBxTvOk4O0gePye', 1, 'default.jpg'),
(3, 7, 'jose', '$2a$10$YT6UQUoNyvqbfyQ/uz3uTuaD2v2qtnoaVSBRHhT6iuBCIXeVFPe4S', 1, 'userAvatarjose@prerez.com-1716816184904.jpeg'),
(4, 8, 'catriel', '$2a$10$LJbSa6QDyD92l3ha19wxVeMAFQyn.h1d1YD2X8zAQyPjBpVzfoLYS', 1, 'default.jpg'),
(5, 9, 'asd', '$2a$10$If7CWJWsaVIDbVUkjW2ZVOw5V5w0gmNQ.OcuT2R.k7mTTaxi2qOX6', 1, 'userAvatarasd@asd.com-1717507071075.jpeg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `carrito_compras_detalle`
--
ALTER TABLE `carrito_compras_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_carrito_compras` (`id_carrito_compras`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_persona` (`id_persona`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carrito_compras_detalle`
--
ALTER TABLE `carrito_compras_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD CONSTRAINT `carrito_compras_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `carrito_compras_detalle`
--
ALTER TABLE `carrito_compras_detalle`
  ADD CONSTRAINT `carrito_compras_detalle_ibfk_1` FOREIGN KEY (`id_carrito_compras`) REFERENCES `carrito_compras` (`id`),
  ADD CONSTRAINT `carrito_compras_detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
