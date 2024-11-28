-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2024 a las 04:05:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `supleprodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `nombre`, `slug`, `parent_id`) VALUES
(1, 'Vitaminas', 'vitaminas', NULL),
(2, 'Ropa', 'ropa', NULL),
(3, 'Barritas y Snacks', 'barritas-snacks', NULL),
(4, 'Suplementos', 'suplementos', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meta`
--

CREATE TABLE `meta` (
  `id` bigint(20) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `entity_type` varchar(255) NOT NULL,
  `valor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `meta`
--

INSERT INTO `meta` (`id`, `clave`, `entity_id`, `entity_type`, `valor`) VALUES
(1, 'marca', 1, 'product', 'GymPro'),
(2, 'sabor', 1, 'product', 'Sin Sabor'),
(3, 'marca', 2, 'product', 'HealthBoost'),
(4, 'sabor', 2, 'product', 'Naranja'),
(5, 'marca', 3, 'product', 'NatureFit'),
(6, 'sabor', 3, 'product', 'Limón'),
(7, 'marca', 4, 'product', 'BoneCare'),
(8, 'sabor', 4, 'product', 'Neutro'),
(9, 'marca', 5, 'product', 'SolarShield'),
(10, 'tipo_uso', 5, 'product', 'Protección Solar'),
(11, 'marca', 6, 'product', 'GymWear'),
(12, 'material', 6, 'product', 'Algodón'),
(13, 'marca', 7, 'product', 'FitShorts'),
(14, 'material', 7, 'product', 'Poliéster'),
(15, 'marca', 8, 'product', 'GymStyle'),
(16, 'material', 8, 'product', 'Mezcla de Algodón'),
(17, 'marca', 9, 'product', 'GymCap'),
(18, 'material', 9, 'product', 'Poliéster'),
(19, 'marca', 10, 'product', 'LiftStrong'),
(20, 'material', 10, 'product', 'Cuero Sintético'),
(21, 'marca', 11, 'product', 'ProteinBarCo'),
(22, 'sabor', 11, 'product', 'Chocolate'),
(23, 'marca', 12, 'product', 'EnergySnack'),
(24, 'sabor', 12, 'product', 'Frutos Rojos'),
(25, 'marca', 13, 'product', 'FitCookies'),
(26, 'sabor', 13, 'product', 'Vainilla'),
(27, 'marca', 14, 'product', 'OatBar'),
(28, 'sabor', 14, 'product', 'Avena y Miel'),
(29, 'marca', 15, 'product', 'NutMix'),
(30, 'sabor', 15, 'product', 'Natural'),
(31, 'marca', 16, 'product', 'WheyMax'),
(32, 'sabor', 16, 'product', 'Fresa'),
(33, 'marca', 17, 'product', 'CreatineX'),
(34, 'sabor', 17, 'product', 'Sin Sabor'),
(35, 'marca', 18, 'product', 'BCAAPower'),
(36, 'sabor', 18, 'product', 'Limonada'),
(37, 'marca', 19, 'product', 'GlutaPure'),
(38, 'sabor', 19, 'product', 'Neutro'),
(39, 'marca', 20, 'product', 'PreBlast'),
(40, 'sabor', 20, 'product', 'Frutas Tropicales'),
(41, 'direccion_envio', 2, 'user', 'Calle Falsa 123, Ciudad Fit, PaísFit'),
(42, 'direccion_envio', 3, 'user', 'Avenida Saludable 456, Ciudad Fit, PaísFit'),
(44, 'direccion_envio', 5, 'user', '{\"calle\":\"Jr. Los Cerezos \",\"numero\":\"119\",\"distrito\":\"Cajamarca\",\"provincia\":\"FL\",\"pais\":\"Estados Unidos\"}'),
(45, 'direccion_envio', 5, 'user', '{\"calle\":\"\",\"numero\":\"\",\"distrito\":\"\",\"provincia\":\"\",\"pais\":\"\"}'),
(46, 'direccion_envio', 5, 'user', '{\"calle\":\"Jr. Los Olivos \",\"numero\":\"119\",\"distrito\":\"Cajamarca\",\"provincia\":\"FL\",\"pais\":\"Estados Unidos\"}'),
(47, 'direccion_envio', 5, 'user', '{\"calle\":\"Jr. Los Olivos \",\"numero\":\"119\",\"distrito\":\"Cajamarca\",\"provincia\":\"Cajamarca\",\"pais\":\"Perú\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `fecha_pedido` varchar(255) NOT NULL,
  `meta_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta_data`)),
  `total` double NOT NULL,
  `cliente_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `estado`, `fecha_pedido`, `meta_data`, `total`, `cliente_id`) VALUES
(15, 'pendiente', '2024-11-28', '{\"envio\":{\"calle\":\"Jr. Los Olivos \",\"numero\":\"119\",\"distrito\":\"Cajamarca\",\"provincia\":\"Cajamarca\",\"pais\":\"Perú\"}}', 138.94, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `pedido_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order_details`
--

INSERT INTO `order_details` (`id`, `cantidad`, `precio`, `pedido_id`, `producto_id`) VALUES
(18, 3, 38.97, 15, 2),
(19, 1, 29.99, 15, 7),
(20, 2, 69.98, 15, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `imagen_url` varchar(255) NOT NULL,
  `meta_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta_data`)),
  `nombre` varchar(255) NOT NULL,
  `precio` double NOT NULL,
  `slug` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `estado`, `imagen_url`, `meta_data`, `nombre`, `precio`, `slug`, `stock`) VALUES
(1, 'activo', '1-vit_multi_big.webp', '{\"categoria\": \"vitaminas\"}', 'Multivitaminas A-Z', 19.99, 'multivitaminas-a-z', 50),
(2, 'activo', '2-vitamina-c-polvo-1_1024x.webp', '{\"categoria\": \"vitaminas\"}', 'Vitamina C 1000mg', 12.99, 'vitamina-c-1000mg', 30),
(3, 'activo', '3-omega.jpg', '{\"categoria\": \"vitaminas\"}', 'Omega 3 500mg', 14.99, 'omega-3-500mg', 40),
(4, 'activo', '4-calcio-800x800-v34120.jpeg', '{\"categoria\": \"vitaminas\"}', 'Calcio + Vitamina D', 17.99, 'calcio-vitamina-d', 25),
(5, 'activo', '', '{\"categoria\": \"vitaminas\"}', 'Protector Solar Deportivo', 11.99, 'protector-solar-deportivo', 15),
(6, 'activo', '', '{\"categoria\": \"ropa\"}', 'Camiseta Deportiva', 24.99, 'camiseta-deportiva', 20),
(7, 'activo', '', '{\"categoria\": \"ropa\"}', 'Pantalones Cortos', 29.99, 'pantalones-cortos', 25),
(8, 'activo', '', '{\"categoria\": \"ropa\"}', 'Sudadera de Gimnasio', 39.99, 'sudadera-gimnasio', 15),
(9, 'activo', '', '{\"categoria\": \"ropa\"}', 'Gorra Deportiva', 14.99, 'gorra-deportiva', 10),
(10, 'activo', '', '{\"categoria\": \"ropa\"}', 'Guantes de Levantamiento', 19.99, 'guantes-levantamiento', 18),
(11, 'activo', '', '{\"categoria\": \"barritas-snacks\"}', 'Barrita de Proteína', 2.99, 'barrita-proteina', 100),
(12, 'activo', '', '{\"categoria\": \"barritas-snacks\"}', 'Snack Energético', 1.99, 'snack-energetico', 80),
(13, 'activo', '', '{\"categoria\": \"barritas-snacks\"}', 'Galletas con Proteína', 3.49, 'galletas-proteina', 60),
(14, 'activo', '', '{\"categoria\": \"barritas-snacks\"}', 'Barrita de Avena', 2.49, 'barrita-avena', 90),
(15, 'activo', '', '{\"categoria\": \"barritas-snacks\"}', 'Mix de Frutos Secos', 4.99, 'mix-frutos-secos', 70),
(16, 'activo', '', '{\"categoria\": \"suplementos\"}', 'Proteína Whey', 49.99, 'proteina-whey', 40),
(17, 'activo', '', '{\"categoria\": \"suplementos\"}', 'Creatina Monohidratada', 34.99, 'creatina-monohidratada', 35),
(18, 'activo', '', '{\"categoria\": \"suplementos\"}', 'BCAA 2:1:1', 29.99, 'bcaa-2-1-1', 45),
(19, 'activo', '', '{\"categoria\": \"suplementos\"}', 'Glutamina 300g', 24.99, 'glutamina-300g', 30),
(20, 'activo', '', '{\"categoria\": \"suplementos\"}', 'Pre-Entreno Explosivo', 39.99, 'pre-entreno-explosivo', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `contrasena`, `correo`, `nombre_usuario`, `rol`) VALUES
(1, 'admin123', 'admin@gymstore.com', 'admin', 'administrador'),
(2, 'cliente123', 'cliente1@gymstore.com', 'cliente1', 'cliente'),
(3, 'cliente123', 'cliente2@gymstore.com', 'cliente2', 'cliente'),
(4, 'cliente123', 'cliente3@gymstore.com', 'cliente3', 'cliente'),
(5, '123456', 'mgcaro06@gmail.com', 'mycmel', 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKoul14ho7bctbefv8jywp5v3i2` (`slug`),
  ADD KEY `FKsaok720gsu4u2wrgbk10b5n8d` (`parent_id`);

--
-- Indices de la tabla `meta`
--
ALTER TABLE `meta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKj1vdjhsauersb6fp3cqfmrj2p` (`cliente_id`);

--
-- Indices de la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjpu1lb1j697mt9t1gjlyc34rv` (`pedido_id`),
  ADD KEY `FKhy3d4ahbhu5h2n0r8s0vfaopk` (`producto_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKostq1ec3toafnjok09y9l7dox` (`slug`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKqs4hlsdf7l1k1u4on057c0949` (`correo`),
  ADD UNIQUE KEY `UKqxirxn3nb5jw736uid7kcy3t2` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `meta`
--
ALTER TABLE `meta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `FKsaok720gsu4u2wrgbk10b5n8d` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKj1vdjhsauersb6fp3cqfmrj2p` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `FKhy3d4ahbhu5h2n0r8s0vfaopk` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKjpu1lb1j697mt9t1gjlyc34rv` FOREIGN KEY (`pedido_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
