-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2026 a las 08:47:10
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
-- Base de datos: `flavorwell_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `breakfast`
--

CREATE TABLE `breakfast` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `instruction` text DEFAULT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `items` int(11) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `breakfast`
--

INSERT INTO `breakfast` (`id`, `name`, `description`, `instruction`, `img_path`, `created_at`, `author`, `items`, `verified`) VALUES
('0889caad-e1e8-4960-9911-84ac4f32a21f', 'Licuado de plátano y fresa', 'Primero juntamos los ingredientes, fresa, leche y plátano, una vez lavados, ponemos leche en la licuadora seguido de la fruta picada para que se licue correctamente, después solo se sirve y se le puede colocar fresa picada y plátano para decorar', '[\"1. Obtener ingredientes\",\"2. Licuar ingredientes\",\"3. Servir y ofrecer\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763056398/image_recipes/jl8md67aj3ncro8gze0n.jpg', '2025-11-13 17:53:19', '49', 3, 1),
('140ba62f-b186-4a2a-910b-a364a6230f2b', 'Huevos con jamón', 'Receta barata, fácil y rápida', '[\"Coloca el aceite y espera a que se caliente a fuego medio.\",\"Corta el jamón el cuadritos o tiras pequeñas.\",\"Rompe los huevos directamente en la sartén o batelos antes si prefieres.\",\"Revuelvelos\",\"Añade el jamón.\",\"Agrega sal al gusto, también puedes agregar pimienta.\",\"El platillo estará listo para servir.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1761153964/image_recipes/oimfc1s81xqu8j5gkhz4.jpg', '2025-10-22 11:26:05', '20', 4, 1),
('19923584-5d23-401b-8540-c74f590b06e9', 'Huevos a la mexicana', 'Freír la cebolla, el jitomate y el chile, después de verter los huevos y deja cocinar por 20 minutos.', '[\"Cortar los tomates y el chile.\",\"Batir los huevos.\",\"Freír los ingredientes cortados.\",\"Después de verter los huevos batidos.\",\"Dejar cocinar por 20 minutos.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763062303/image_recipes/fhs6blyfhqpszsyvy5jw.jpg', '2025-11-13 19:31:44', '69', 4, 1),
('1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Huevos a la Mexicana', 'Un desayuno clásico en la cocina mexicana. Rápido, colorido y lleno de sabor, esta receta combina huevos revueltos con jitomate, cebolla y chile verde. Ideal para acompañar con tortillas, frijoles refritos o pan.', '[\"Lava y pica finamente los jitomates, la cebolla y el chile (retira las semillas si prefieres menos picante).\",\"En un sartén a fuego medio, añade el aceite o mantequilla. Agrega la cebolla y el chile y sofríe por 1–2 minutos hasta que estén suaves. Añade el jitomate y cocina por 3–4 minutos más, hasta que se suavice y suelte jugo.\",\"Bate ligeramente los huevos en un tazón con sal y pimienta. Vierte sobre el sartén con las verduras y revuelve suavemente hasta que estén cocidos pero aún cremosos (no secos).\",\"Sirve calientes, espolvorea un poco de cilantro fresco si lo deseas y acompaña con tortillas calientes o pan y frijoles refritos.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752896170/image_recipes/qm3lx8epyet0kzdwtn4n.jpg', '2025-07-19 03:36:10', '2', 7, 1),
('45b9bf89-af65-44d1-9b78-1471de37f75d', 'Hotcakes Esponjosos', 'Un desayuno clásico, suave y esponjoso, ideal para acompañar con miel, frutas, mermelada o incluso chocolate. Se preparan rápido y con ingredientes básicos que probablemente ya tienes en casa.', '[\"En un tazón, mezcla la harina, el azúcar, el polvo para hornear y la sal.\",\"En otro tazón, bate el huevo, la leche, la mantequilla derretida y la vainilla.\",\"Agrega los ingredientes húmedos sobre los secos y mezcla con una espátula o batidor de mano hasta integrar. No mezcles en exceso (es normal que queden algunos grumos).\",\"Calienta una sartén antiadherente a fuego medio y unta un poco de mantequilla. Vierte un poco de mezcla formando círculos (aprox. 1/4 de taza por hotcake). Cocina 1–2 minutos hasta que veas burbujas en la superficie, luego voltea y cocina 1 minuto más o hasta que estén dorados.\",\"Apila los hotcakes en un plato y acompaña con miel de maple, fruta fresca, yogurt, crema batida, mermelada o lo que prefieras.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752896398/image_recipes/wnsw8ee7jxo41dbuobt2.jpg', '2025-07-19 03:39:59', '2', 5, 1),
('55bfa4f4-0a06-46fe-b1c2-7825fe20591d', 'Panqueques de avena', 'Esponjosos panqueques de avena con plátano', '[\"Vierte todos los ingredientes en la licuadora\",\"En un sartén agrega un poco de mantequilla, una vez derretida agrega un poco de mezcla.\",\"Voltea cuando le salgan burbujas y luego retira cuando se haya esponjado el panqueque\",\"Vierte la mezcla hasta terminarla y finalmente sirve y decora a tu gusto, puedes agregar miel de maple o cualquier fruta de tu preferencia.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763060135/image_recipes/yrkwtofnsavdeyfvbc1o.jpg', '2025-11-13 18:55:36', '45', 5, 1),
('7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Chilaquiles Rojos con Pollo', 'Un desayuno mexicano lleno de sabor y tradición. Los chilaquiles verdes combinan totopos crujientes con una salsa de tomatillo y se coronan con pollo deshebrado, crema, queso y cebolla. ¡Perfectos para un desayuno contundente!', '[\"Cuece los tomatillos, chiles, cebolla y ajo en agua hirviendo por 10 minutos. Licúa con sal, un poco del agua de cocción y el cilantro si deseas. Ajusta la sazón.\",\"En una sartén con un poco de aceite caliente, vierte la salsa y cocina por 5 minutos hasta que espese ligeramente.\",\"Añade los totopos a la salsa caliente y mezcla con cuidado para que se cubran bien pero sin que se deshagan. Cocina 1–2 minutos.\",\"Sirve los chilaquiles en platos individuales. Agrega el pollo deshebrado encima y decora con crema, queso, cebolla y aguacate si deseas.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752897108/image_recipes/g0ttqnfgqq0uhz9xo14y.jpg', '2025-07-19 03:51:48', '2', 8, 1),
('85bb6c99-7d91-4da3-8a34-067761bb6967', 'Licuado de plátano con avena', 'Inicia el día con este licuado de platana con avena hechi con carnation. Ideal para no salir de casa sin desayunar.!Les encantará!', '[\"Licuadora la.lecje con la avena y el plátano\",\"Sirve en baso\",\"Ofrece\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763056331/image_recipes/upoedm4pqozagy2icczj.jpg', '2025-11-13 17:52:12', '34', 3, 1),
('8e7e473b-27a8-4686-955b-14b00c117119', 'Avena Cocida con Frutas y Canela', 'Un desayuno caliente, saludable y muy saciante. La avena cocida es perfecta para empezar el día con energía, y puedes personalizarla con tus frutas favoritas, nueces y especias.', '[\"En una olla mediana, agrega la leche y la avena. Lleva a fuego medio y cocina durante 5–7 minutos, removiendo constantemente para que no se pegue.\",\"Añade la canela y la miel o azúcar. Mezcla bien y cocina 1–2 minutos más hasta que tenga la consistencia deseada (más espesa o más líquida, según tu gusto).\",\"Sirve la avena caliente en tazones. Añade por encima el plátano, la manzana y el resto de las frutas o nueces que desees.\",\"Puedes agregar un chorrito extra de leche fría al servir, o una cucharadita de mantequilla de maní o yogurt para más sabor y cremosidad.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752898411/image_recipes/qsmog8zoihzcqcmpspox.jpg', '2025-07-19 04:13:33', '2', 9, 1),
('a3ce9072-af95-486b-bbc1-b3eb0d63b69e', 'Huevo a la mexicana', 'Son huevos con chile, tomate y cebolla', '[\"1.- Pica la cebolla, tomate en cubitos y el chile en rodajas o cuadritos según tú preferencia.\",\"2.- Calienta un poco de aceite en una sartén a fuego medio. Agrega la cebolla picada hasta que esté dorado.\",\"3.- Añade el tomate y el chile, cocina por un par de minutos hasta que el tomate se haya ablandado .\",\"4.-Bate ligeramente los huevos en un tazón con un poco de sal. Vierte los huevos batidos en la sartén sobre las verduras sofritas.\",\"5.- Revuelve constantemente para evitar que se peguen y para que se cocinen de manera uniforme .\",\"6.- Continúa cocinando los huevos, revolviendo ocasionalmente, hasta que estén a tu gusto.\",\"7.- Siver en tu plato los huevos, puedes acompañarlos con frijoles, tortillas calientes o aguacate .\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763060373/image_recipes/tyfzfmxsehdrohvvi9dk.jpg', '2025-11-13 18:59:34', '66', 5, 1),
('a709ab7b-aa57-4982-a345-b8dccc38091a', 'Huevo con tortilla', 'Huevo con tortilla is a delicious and hearty twist on the classic egg dish. The eggs are fried perfectly and served hot with crispy tortilla, perfect for a satisfying meal.', '[\"Step 1: Chop the onion and garlic finely.\",\"Step 2: Heat vegetable oil in a pan.\",\"Step 3: Saute the chopped onion and garlic until translucent.\",\"Step 4: Crack the eggs into the pan and stir gently.\",\"Step 5: Season with salt and pepper as per taste.\",\"Step 6: Fry the tortilla in a separate pan until crispy.\",\"Step 7: Serve the eggs hot with the crispy tortilla.\",\"Step 8: Garnish with parsley before serving.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1761147400/image_recipes/ofoarakms0k3oxen8g0o.jpg', '2025-10-22 15:36:41', '24', 6, 1),
('d48b1e5a-3c51-4452-b488-02720d397574', 'Huevo con jamón', 'Es un desayuno muy ligero y rico el cual combina huevo como proteína y carne como lo es el jamón', '[\"Primero enciende la estufa y en una sartén coloca una pequeña cantidad de aceite comestible para que esté se caliente\",\"Después en un recipiente hondo de preferencia vierte los huevos seguidos de el jamón cortado en cuadritos y revuelve\",\"Una vez lista la mezcla, viertela en la sartén con el aceite caliente, puedes colocar sal en caso de que quieras agregar un poco de sabor al huevo\",\"Revuelve un poco para que no se peguen los huevos durante 5 min. O hasta que estos estén listos\",\"Listo, ya tienes tu huevo preparado\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763056465/image_recipes/drzatsng6dwtx5exv52c.jpg', '2025-11-13 17:54:26', '50', 4, 1),
('de15caaa-5226-4b30-865c-83df68d5ef66', 'Tostadas de Aguacate con Huevo', 'Un desayuno nutritivo, rápido y lleno de energía. Las tostadas de aguacate con huevo combinan grasas saludables, proteína y carbohidratos en una presentación sencilla y sabrosa.', '[\"Tuesta las rebanadas de pan en un sartén o tostadora hasta que estén doradas y crujientes.\",\"Parte el aguacate, retira la pulpa y colócala en un tazón. Aplástala con un tenedor. Añade jugo de limón, sal y pimienta al gusto. Mezcla bien.\",\"Cocina los huevos al gusto (estrellados, pochados, revueltos o duros). Para una opción saludable, fríelos con un poco de aceite de oliva o agua.\",\"Unta el puré de aguacate sobre el pan tostado. Coloca encima el huevo cocido. Si deseas, añade chile en hojuelas, tomate cherry en mitades o germinados.\",\"Sirve caliente, acompañado de jugo natural o café.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752897856/image_recipes/yq8xqqvrukufn7vennfk.jpg', '2025-07-19 04:04:17', '2', 8, 1),
('e1bc158e-1aab-4b2e-8c1e-72554a1e3c25', 'Huevo con salchicha', 'Receta fácil de huevos con salchicha', '[\"1.-parte los huevos\",\"2.- hecha los huevos en un recipiente\",\"3.- Bate los huevos\",\"4.-  corta la salchicha\",\"5.-Prende la estufa y pon el sarten\",\"6.- Pon aceite al sarten\",\"7.- hecha las salchichas cortadas\",\"8.- Hecha el huevo\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763059337/image_recipes/kl297urhxequcioqooao.jpg', '2025-11-13 18:42:18', '44', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `recipe_id` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `recipe_id`, `user_id`, `content`, `created_at`) VALUES
(4, '0', NULL, 'Hola', '2026-01-21 03:46:07'),
(5, '0', 2, 'Hola', '2026-01-22 19:23:17'),
(6, 'f3c0c3a2-a201-4383-afe2-587c575f1f48', 2, 'Holaaa xd', '2026-01-22 19:28:25'),
(7, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 2, 'Hollaaaaaa', '2026-01-22 19:42:00'),
(8, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 2, 'Hola desde aqui jeje', '2026-01-22 19:56:44'),
(9, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 2, 'Hola la receta esta buena', '2026-01-22 20:25:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desserts`
--

CREATE TABLE `desserts` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `instruction` text DEFAULT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `items` int(11) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `desserts`
--

INSERT INTO `desserts` (`id`, `name`, `description`, `instruction`, `img_path`, `created_at`, `author`, `items`, `verified`) VALUES
('0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'Brownie de Chocolate con Nueces', 'Un postre clásico, húmedo por dentro y con una ligera capa crujiente por fuera. Este brownie combina el intenso sabor del chocolate con la textura crocante de las nueces, perfecto para acompañar con una bola de helado o un café.', '[\"Precalienta el horno a 180 °C (350 °F). Engrasa un molde cuadrado (aproximadamente 20x20 cm) y cúbrelo con papel para hornear.\",\"En un recipiente a baño maría (o en microondas a intervalos cortos), derrite la mantequilla junto con el chocolate troceado hasta que esté completamente fundido. Mezcla bien y deja enfriar un poco.\",\"En un bowl grande, bate los huevos con el azúcar y la vainilla hasta que la mezcla esté pálida y espesa (unos 3–5 minutos).\",\"Añade el chocolate fundido (ya tibio) a la mezcla de huevos y revuelve con una espátula o batidor de mano hasta integrar completamente.\",\"Tamiza la harina, el cacao en polvo y la sal sobre la mezcla anterior. Incorpora con movimientos envolventes, sin batir en exceso.\",\"Agrega las nueces picadas y mezcla suavemente.\",\"Vierte la mezcla en el molde y distribúyela de manera uniforme. Hornea durante 25–30 minutos, o hasta que al insertar un palillo, este salga con unas pocas migas húmedas (no completamente seco).\",\"Deja enfriar completamente antes de cortar en cuadros. Puedes espolvorear un poco de azúcar glas o servir con helado.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752892587/image_recipes/qc2zk3ywqgentcwym4ye.jpg', '2025-07-19 02:36:27', '2', 6, 1),
('56401dc2-cb30-4107-9f70-c29917a183d5', 'Pay de limón', 'los pasos principales consisten en preparar la base de galleta, mezclar los ingredientes del relleno y refrigerar el postre hasta que cuaje.', '[\"Acomodar las galletas en un recipiente\",\"Agregar la crema,un poco de azúcar y por último agregar el jugo de limón\",\"Vertir un poco la mezcla en las galletas luego agregar otra capa de galletas\",\"Repetir el mismo procedimiento hasta terminarse los ingredientes tapar el recipiente y meterlo al refrigerador, esperar una hora aproximadamente\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763061045/image_recipes/xul7whkygs0sgeus9nif.jpg', '2025-11-13 19:10:46', '67', 5, 1),
('57b6bb2f-6f14-468b-b84c-89f544d995bb', 'Coctel de fruta (Navideña)', 'El cóctel es una preparación fresca y colorida elaborada a base de diversas frutas naturales cortadas en trozos pequeños y mezclados con jugo y almíbar. Se caracteriza por su sabor dulce y equilibrado así como su atractivo visual resultado de la combinación de colores y texturas.', '[\"Lava y corta todas las frutas en trozos pequeños\",\"Colocarlas en un recipiente grande.\",\"Agregar el jugo de limón y mezclar suavemente.\",\"Añade el jugo de naranja o Piña y se lo prefieres más dulce incorporar la miel o el azúcar.\",\"Mezcla con cuidado para no maltratar la fruta.\",\"Refrigera por unos 30 minutos antes de que servir para que esté bien frío.\",\"Sirve en copas o vasos con un poco de hielo.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763063948/image_recipes/evci6zodnpkf3nxd9imi.jpg', '2025-11-13 19:59:10', '47', 8, 1),
('77b8faa9-b807-43d2-b222-05966753fd79', 'Banoffee Pie', 'El Banoffee Pie es un postre británico irresistible que combina una base crujiente de galleta, capas de dulce de leche, rodajas de plátano y una nube de crema batida. No necesita horno y se prepara en poco tiempo.', '[\"Tritura las galletas hasta hacerlas polvo y mézclalas con la mantequilla derretida. Presiona la mezcla en el fondo de un molde para tarta (20–22 cm) hasta formar una base compacta. Refrigera por 20–30 minutos.\",\"Saca la base del refrigerador y extiende el dulce de leche sobre ella de manera uniforme. Puedes alisarlo con una espátula o cuchara.\",\"Corta los plátanos en rodajas y colócalos sobre el dulce de leche, cubriendo toda la superficie.\",\"Bate la crema para batir con el azúcar glas y la vainilla hasta que forme picos suaves. Cubre la tarta con esta crema montada, alisando o formando picos con una espátula.\",\"Espolvorea chocolate rallado o cacao en polvo por encima. Refrigera al menos 2 horas antes de servir (mejor si es de un día para otro).\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752895549/image_recipes/vr8ol6p1rs5hggtuv2ux.jpg', '2025-07-19 03:25:50', '2', 6, 1),
('88449258-abf0-4798-a36a-e650a5014bdd', 'Mojito de fresa virgen', '¡Disfruta del sabor refrescante de la fresa y el limón en este delicioso mojito! Perfecto para un día caluroso o una noche de fiesta con amigos.', '[\"Limpia y corta las fresas en trozos pequeños.\",\"En un vaso grande, mezcla las fresas, el jugo de limón y el azúcar.\",\"Machaca las fresas con un machacador o la parte posterior de una cuchara hasta que estén suaves y bien mezclados con el jugo de limón.\",\"Llena el vaso con hielo picado.\",\"Agrega la mezcla de fresas y el limón al vaso.\",\"Decora con menta fresca y una rodaja de limón.\",\"Si deseas, agrega un poco de soda o agua con gas para darle un toque burbujeante.\",\"Sirve inmediatamente y disfruta!.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763063222/image_recipes/pvqekcyrihf9sb51ztlm.jpg', '2025-11-13 19:47:03', '37', 6, 1),
('9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'Donas', 'Es un postre sabroso y muy fácil de hacer', '[\"Paso 1: Activar la levadura (si es necesario) Si usas levadura seca, en un bol pequeño, mezcla la leche tibia con una cucharadita del azúcar y la levadura. Deja reposar durante 10 minutos hasta que se forme espuma en la superficie. Esto indica que la levadura está activa.\",\"Paso 2: Preparar la masa En un tazón grande, combina la harina, el resto del azúcar y la sal. Agrega la mezcla de levadura activada (o la levadura fresca desmenuzada directamente si está muy activa), los huevos, la mantequilla a temperatura ambiente y la esencia de vainilla.\",\"Paso 3: Amasar Mezcla todos los ingredientes hasta formar una masa. Amasa sobre una superficie ligeramente enharinada durante unos 10-15 minutos, hasta obtener una masa suave y elástica. Como alternativa, puedes usar una batidora con gancho amasador.\",\"Paso 4: Primer levado Forma un bollo con la masa y colócalo en un bol engrasado. Cubre el bol con un paño húmedo o papel film y deja reposar en un lugar cálido hasta que la masa duplique su tamaño (aproximadamente 1-2 horas, dependiendo de la temperatura ambiente).\",\"Paso 5: Cortar las donas Una vez levada, estira la masa con un rodillo sobre una superficie enharinada hasta que tenga un grosor de aproximadamente 1-2 cm. Con un cortador de donas o dos cortadores redondos de diferentes tamaños, corta los anillos de masa.\",\"Paso 6: Segundo levado Coloca las donas cortadas sobre bandejas ligeramente enharinadas o papel de horno. Cúbrelas y déjalas reposar nuevamente durante unos 15-20 minutos, hasta que leuden ligeramente por segunda vez.\",\"Paso 7: Freír Calienta abundante aceite en una olla profunda a una temperatura de aproximadamente 180°C (350°F). Fríe las donas por ambos lados hasta que estén doradas (aproximadamente 1-2 minutos por lado). Retíralas y déjalas escurrir sobre papel absorbente o una rejilla.\",\"Paso 8: Preparar el glaseado y decorar Mientras las donas se enfrían un poco, mezcla el azúcar glas con la leche y la vainilla hasta obtener una consistencia espesa, similar a la de la pasta de dientes. Sumerge las donas tibias en el glaseado y déjalas reposar sobre una rejilla para que el glaseado se seque.\",\"¡Disfruta de tus donas caseras!\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763057559/image_recipes/y1ngovkxtp8piuqdjlmw.jpg', '2025-11-13 18:12:40', '50', 8, 1),
('a24a7611-8ea2-42d1-b93e-c4691e26b088', 'Calabaza en dulce', 'Postre tradicional mexicano otoñal, pero rico en cualquier época del año.', '[\"Lava la calabaza y trozala en pedazos del tañamo de la palma de tu mano\",\"Posteriormente llena una olla con agua aproximadamente a la mitad\",\"Sumergue los pedazos de calabaza y una panela, en trozos\",\"Deja hervir durante 10 min a fuego alto\",\"Emplata puedes comparar con leche o lo que más te guste\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763058450/image_recipes/ox701wmel8gja9ryoose.jpg', '2025-11-13 18:27:31', '48', 3, 1),
('a33da413-8fce-4290-8b26-b69179c6634d', 'Flan Casero de Vainilla', 'Un clásico de la repostería latinoamericana, este flan tiene una textura suave y sedosa, con un irresistible caramelo dorado que se derrite en la boca. Perfecto para cualquier ocasión.', '[\"En una sartén a fuego medio, coloca el azúcar y el agua. Cocina sin remover hasta que el azúcar se derrita y tome un color dorado ámbar. Vierte inmediatamente en un molde para flan (o moldes individuales) y gira el molde para cubrir el fondo con el caramelo. Deja enfriar y endurecer.\",\"En una licuadora, agrega los huevos, la leche condensada, la leche evaporada y la vainilla. Licúa por 30 segundos hasta que todo esté bien integrado.\",\"Vierte la mezcla del flan en el molde acaramelado. Coloca el molde dentro de una bandeja grande con agua caliente (baño maría).\",\"Precalienta el horno a 180 °C (350 °F) y hornea por 50–60 minutos, o hasta que al insertar un palillo en el centro, salga limpio. También puedes hacerlo al vapor o en olla exprés durante 25–30 minutos.\",\"Deja enfriar a temperatura ambiente, luego refrigera al menos 4 horas (mejor si es de un día para otro). Para desmoldar, pasa un cuchillo por los bordes y voltea sobre un plato grande.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752894799/image_recipes/ukovit48our0bsbzu75e.jpg', '2025-07-19 03:13:19', '2', 5, 1),
('c0cbb51a-b36d-4287-9810-71b215169cea', 'Pastel de 3 leches', 'Un esponjoso pastel bañado con una mezcla de tres leches (evaporada, condensada y crema), cubierto con crema batida y un toque de canela. Perfecto para celebraciones o simplemente para consentirte con algo dulce y delicioso.', '[\"1. Precalienta el horno a 180 °C y engrasa un molde.\",\"2. Separa las claras de las yemas y bate las claras hasta que formen picos.\",\"3. Agrega poco a poco el azúcar y luego las yemas, la vainilla y la leche.\",\"4. Incorpora la harina y el polvo para hornear con movimientos envolventes.\",\"5. Hornea por 30–40 minutos o hasta que al insertar un palillo, salga limpio.\",\"6. Mezcla la leche evaporada, condensada y crema en un recipiente.\",\"7. Pincha el pastel con un tenedor y vierte la mezcla de tres leches sobre él.\",\"8. Refrigera por al menos 3 horas.\",\"9. Cubre con crema batida y espolvorea canela o decora con frutas.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763057793/image_recipes/s7wepcqhrm4ntexvihy1.jpg', '2025-11-13 18:16:34', '52', 4, 1),
('c84d8adf-f721-4dd8-97b5-853df15fbf08', 'Soda italiana de fresa', 'Deliciosa soda italiana a base de agua mineral y jugo de fresa con perlas explosivas, ideal para un día caluroso.', '[\"En un vaso colocar las tres cucharadas de perlas explosivas.\",\"Colocar en el vaso 2/3 de hielo picado.\",\"Colocar 6 cucharadas de jugo de fresa dentro del vaso.\",\"Rellenar 2/3 partes del vaso con agua mineral.\",\"Rellenar la parte restante del vaso con refresco de limón, de preferencia Sprite.\",\"Colocar un popote.\",\"Cortar una fresa fresca y decorar el vaso.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755149201/image_recipes/aguovgtchws6flogoymi.jpg', '2025-08-14 05:26:41', '2', 6, 1),
('ce4185ef-1a21-406c-8087-d7b01aa313af', 'Pan de Elote Casero', 'El pan de elote es un postre tradicional mexicano, suave, ligeramente dulce y con el sabor natural del maíz. Es perfecto para acompañar con café o disfrutar como merienda.', '[\"Precalienta el horno a 180 °C (350 °F). Engrasa un molde para pastel (redondo o rectangular) con mantequilla y un poco de harina o usa papel encerado.\",\"En la licuadora, coloca los granos de elote, la leche condensada, los huevos, la mantequilla, el polvo para hornear, la vainilla y la sal. Licúa hasta obtener una mezcla homogénea. Si deseas una textura más espesa, añade queso crema o un poco de harina.\",\"Vierte la mezcla en el molde y hornea durante 40–50 minutos, o hasta que al insertar un palillo en el centro, éste salga limpio.\",\"Deja enfriar antes de desmoldar. Puedes espolvorear azúcar glas encima o acompañar con un poco de crema.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752895867/image_recipes/zwjuugfe11iddsoieh5v.jpg', '2025-07-19 03:31:07', '2', 6, 1),
('d757daf5-656a-489f-b357-c9082e7714f1', 'Cheesecake Frío de Fresa', 'Un postre suave, cremoso y refrescante, ideal para días calurosos o cuando no quieres usar el horno. Esta versión de cheesecake combina una base crujiente con un relleno de queso crema y un toque de fresa natural.', '[\"Tritura las galletas hasta obtener un polvo fino (puedes usar una bolsa y un rodillo o una licuadora). Mezcla con la mantequilla derretida hasta formar una masa arenosa. Vierte esta mezcla en un molde desmontable (aprox. 20 cm) y presiona con una cuchara hasta que quede compacta. Refrigera 20 minutos.\",\"Lava, desinfecta y tritura las fresas hasta obtener un puré. Reserva.\",\"Coloca la gelatina sin sabor en un recipiente con las 4 cucharadas de agua fría. Deja reposar 5 minutos y luego caliéntala ligeramente (microondas o baño maría) hasta que se disuelva completamente.\",\"En un bowl grande, bate el queso crema con el azúcar glas y la vainilla hasta obtener una mezcla suave. Añade el puré de fresas y mezcla. Aparte, bate la crema para batir hasta que esté firme y mézclala suavemente con la crema de queso. Incorpora la gelatina disuelta y mezcla hasta integrar.\",\"Vierte el relleno sobre la base de galleta y alisa la superficie. Lleva al refrigerador al menos 6 horas, idealmente toda la noche.\",\"Desmolda con cuidado. Decora con fresas frescas, un poco de mermelada de fresa y hojas de menta si deseas.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752892952/image_recipes/i3ji6p0nu3nhvib9hewk.png', '2025-07-19 02:42:32', '2', 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredients_list`
--

CREATE TABLE `ingredients_list` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `name_es` text DEFAULT NULL,
  `src_reference` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingredients_list`
--

INSERT INTO `ingredients_list` (`id`, `name`, `name_es`, `src_reference`) VALUES
(1, 'ham', 'jamon', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624545/ham_ymrplf.png'),
(2, 'lemon', 'limon', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624546/lemon_casiyf.png'),
(3, 'onion', 'cebolla', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624519/onion_xgxlqt.png'),
(4, 'breadsticks', 'palitos_de_pan', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624519/bread_t4vb4w.png'),
(5, 'bacon', 'tocino', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624519/bacon_s49snj.png'),
(6, 'olives', 'aceitunas', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624519/olives_c1iehe.png'),
(7, 'blueberries', 'arandanos', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624520/blueberries_owmtha.png'),
(8, 'pineapple', 'piña', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624520/pineapple_c4mt9l.png'),
(9, 'cucumber', 'pepino', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624521/cucumber_dnq9uo.png'),
(10, 'strawberry', 'fresa', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624521/strawberry_xulzsc.png'),
(11, 'mustard', 'mostaza', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624522/mustard_yxqqy5.png'),
(12, 'grain', 'trigo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624523/grain_z1aurb.png'),
(13, 'oat', 'avena', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624524/oat_cjw83p.png'),
(14, 'spaghetti', 'espaguetis', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624524/oat_cjw83p.png'),
(15, 'egg', 'huevo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624526/egg_viddrs.png'),
(16, 'salmon', 'salmon', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624526/salmon_p1cssr.png'),
(17, 'beans', 'frijoles', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624526/beans_nhfda0.png'),
(18, 'brocoli', 'brocoli', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624528/broccoli_kfaatf.png'),
(19, 'toffee', 'toffee', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624528/toffee_dvjegq.png'),
(20, 'hazelnut', 'avellana', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624530/hazelnut_xlzlxo.png'),
(21, 'chives', 'cebollines', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624530/chives_xcesn1.png'),
(22, 'baguette', 'baguette', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624531/baguette_h42vbw.png'),
(23, 'potatoes', 'papa', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624532/potatoes_uarrjh.png'),
(24, 'pasta', 'pasta', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624533/pasta_paz3v6.png'),
(25, 'canned_tuna', 'atún_enlatado', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624535/canned_tuna_to4esy.png'),
(26, 'raspberry', 'frambuesa', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624535/raspberry_fn8lte.png'),
(27, 'garlic', 'ajo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624536/garlic_plqe1r.png'),
(28, 'cheese', 'queso', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624539/cheese_mv8mz0.png'),
(29, 'apple', 'manzana', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624539/apple_gtgfib.png'),
(30, 'carrot', 'zanahoria', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624539/carrot_rlauhh.png'),
(31, 'tomato', 'jitomate', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624539/tomato_qydfev.png'),
(32, 'grapes', 'uvas', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624542/grapes_u6hbj1.png'),
(33, 'lettuce', 'lechuga', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624543/salad_vtuc6h.png'),
(34, 'cherries', 'cerezas', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624543/cherries_h8wvzb.png'),
(35, 'orange', 'naranja', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752624545/orange_n0kkwr.png'),
(38, 'chicken', 'pollo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631041/chicken_j9jyot.png'),
(39, 'chili', 'chile', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631041/chili_pigfox.png'),
(40, 'octopus', 'pulpo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631042/octopus_tz6h6j.png'),
(41, 'coconut', 'coco', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631048/coconut_szbzix.png'),
(42, 'fish', 'pescado_fresco', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631048/fish_njimhj.png'),
(43, 'suggar', 'azúcar', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631050/suggar_rrqi1y.png'),
(44, 'milk', 'leche', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631054/milk_pawrru.png'),
(45, 'butter', 'mantequilla', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752969711/butter_lflz5j.png'),
(46, 'peach', 'durazno', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631057/peach_w9wklc.png'),
(47, 'aubergine', 'berenjena', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631060/aubergine_eprtmk.png'),
(48, 'candy', 'caramelo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631076/candy_eprnlq.png'),
(49, 'risotto', 'risotto', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631077/risotto_u3yul6.png'),
(50, 'jelly', 'gelatina', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631081/jelly_ggbsqv.png'),
(51, 'banana', 'platano', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631081/banana_jekcwc.png'),
(52, 'asparagus', 'espárragos', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631082/asparagus_hhh8cn.png'),
(53, 'cabagge', 'repollo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631087/cabbage_p3002v.png'),
(54, 'pear', 'pera', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631087/pear_pp6fdr.png'),
(55, 'beer', 'cerveza', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631090/beer_pifj2k.png'),
(56, 'lime', 'lima', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631094/lime_id3quc.png'),
(57, 'pickles', 'pepinillos', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631094/pickles_sc0cwa.png'),
(58, 'salami', 'salami', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631095/salami_ulb891.png'),
(59, 'eggs', 'huevos', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631100/eggs_kjvbfs.png'),
(60, 'watermelon', 'sandía', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752631100/watermelon_xoybxz.png'),
(61, 'radish', 'rábano', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890140/radish_dtvmvm.png'),
(62, 'salt', 'sal_de_mesa', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890140/salt_fwptaq.png'),
(63, 'pomegranate', 'granada', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890140/pomegranate_qzujg5.png'),
(64, 'pepper', 'pimienta', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890140/pepper_apgybu.png'),
(65, 'green tea', 'te_verde', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890140/tea_h0zz2v.png'),
(66, 'croissant', 'cuernito', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890141/croissant_nas3em.png'),
(67, 'bread', 'pan_integral', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890141/bread_nwno3s.png'),
(68, 'toast bread', 'pan_tostado', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890141/toast_zsya2t.png'),
(69, 'pork', 'carne_de_cerdo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890141/meat_hujrna.png'),
(70, 'corn', 'maíz', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890141/corn_b0o3lj.png'),
(71, 'peas', 'chicharos', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890141/peas_dr67z1.png'),
(72, 'chocolate', 'chocolate', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890142/chocolate_zscurr.png'),
(73, 'steak', 'bistec_de_rés', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890142/steak_dwj3ep.png'),
(74, 'coffee', 'cafe', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890142/coffee_cpgrcr.png'),
(75, 'biscuit', 'galleta_salada', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890142/biscuit_nyudax.png'),
(76, 'fig', 'higo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890142/fig_vglcnc.png'),
(77, 'jam', 'jalea', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890142/jam_eocb9o.png'),
(78, 'shrimp', 'camarón', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890143/shrimp_qqu9fn.png'),
(79, 'mushrooms', 'champiñones', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890143/mushrooms_tqaabg.png'),
(80, 'honey', 'miel', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890143/honey_xynhcp.png'),
(81, 'sausage', 'salchicha', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890143/sausage_by3qgc.png'),
(82, 'pistachio', 'pistaches', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890143/pistachio_rzly4l.png'),
(83, 'water', 'agua', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890143/water_fwgl4f.png'),
(84, 'pumpkin', 'calabaza', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890143/pumpkin_r58vop.png'),
(85, 'cookies', 'galletas_dulces', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890144/cookies_uqwj6e.png'),
(86, 'ice_cream', 'helado', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752890144/ice-cream_negfsg.png'),
(87, 'tortilla', 'tortilla', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752896614/tortillas_afznob.png'),
(88, 'vegetable_oil', 'aceite_vegetal', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752896834/vegetable-oil_uaxjej.png'),
(89, 'avocado', 'aguacate', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752897340/avocado_gwvwtm.png'),
(90, 'chicken_breast', 'pechuga_de_pollo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752947144/chicken-breast_fv17ol.png'),
(91, 'parsley', 'perejil', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752947706/parsley_pjbbbj.png'),
(92, 'oregano', 'oregano', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752961957/oregano_zkdf74.png'),
(93, 'lemon_juice', 'jugo_de_limón', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752962510/juice_my0jbi.png'),
(94, 'orange_juice', 'jugo_de_naranja', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752962643/orange-juice_fgmsjd.png'),
(95, 'whip_cream', 'crema_batida', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752963266/whip-cream_auzmls.png'),
(96, 'chili_powder', 'chile_en_polvo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752963696/spices_ltvlay.png'),
(97, 'chickpeas', 'garbanzos', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752963938/chickpea_ffyqt3.png'),
(98, 'ginger', 'gengibre', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752967100/ginger_w4qg4r.png'),
(99, 'rice', 'arroz', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752967220/rice-bowl_wtxgpx.png'),
(100, 'cauliflower', 'coliflor', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752967754/cauliflower_fatb9o.png'),
(101, 'olive_oil', 'aceite_de_oliva', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752967838/olive-oil_wdrzav.png'),
(102, 'soy_sauce', 'salsa_de_soya', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752968521/soy-sauce_qeij7g.png'),
(103, 'lentils', 'lentejas', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752969065/lentils_jmlhth.png'),
(104, 'mineral_water', 'agua_mineral', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755148508/mineral-water_rwpj9c.png'),
(105, 'strawberry_juice', 'jugo_de_fresa', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755148508/juice-box_aasgrt.png'),
(106, 'soda', 'refresco', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755148508/soda_twqd4y.png'),
(107, 'ice', 'hielo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755148508/ice_nvwe7h.png'),
(108, 'popping_boba', 'perlas_explosivas', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755148509/gums_os6uqd.png'),
(109, 'chipotle', 'chipotle', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763096919/recipe_icons/chipotle.png'),
(110, 'cinammon', 'canela', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763096920/recipe_icons/cinammon.png'),
(111, 'flour', 'harina_de_trigo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763096921/recipe_icons/flour.png'),
(112, 'lamb_meat', 'carne_de_borrego', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763096922/recipe_icons/lamb_meat.png'),
(113, 'mint', 'menta', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763096923/recipe_icons/mint.png'),
(119, 'jalapeño', 'jalapeño', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763097373/recipe_icons/jalapeno.png'),
(124, 'coconut_milk', 'leche_de_coco', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763098528/recipe_icons/coconut_milk.png'),
(125, 'coconut_oil', 'aceite_de_coco', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763098530/recipe_icons/coconut_oil.png'),
(126, 'habanero_pepper', 'habanero', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763098531/recipe_icons/habanero_pepper.png'),
(127, 'poblano_pepper', 'chile_poblano', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763098532/recipe_icons/poblano_pepper.png'),
(128, 'prickly_pear', 'nopales', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763098533/recipe_icons/prickly_pear.png'),
(129, 'serrano_pepper', 'chile_serrano', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763098534/recipe_icons/serrano_pepper.png'),
(130, 'annatto', 'achiote', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614372/recipe_icons/annatto.png'),
(131, 'beetroot', 'remolacha', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614373/recipe_icons/beetroot.png'),
(132, 'celery', 'apio', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614374/recipe_icons/celery.png'),
(133, 'champagne', 'champán', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614374/recipe_icons/champagne.png'),
(134, 'clam', 'almeja', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614375/recipe_icons/clam.png'),
(135, 'cottage_cheese', 'requesón', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614375/recipe_icons/cottage_cheese.png'),
(136, 'cream_cheese', 'queso crema', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614376/recipe_icons/cream_cheese.png'),
(137, 'manchego_cheese', 'queso_machego', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614377/recipe_icons/manchego_cheese.png'),
(138, 'mango', 'mango', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614377/recipe_icons/mango.png'),
(139, 'mango_juice', 'jugo_de_mango', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614378/recipe_icons/mango_juice.png'),
(140, 'marrow', 'tuetano', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614378/recipe_icons/marrow.png'),
(141, 'mussel', 'mejillón', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614379/recipe_icons/mussel.png'),
(142, 'oyster', 'ostión', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614380/recipe_icons/oyster.png'),
(143, 'pepperoni', 'pepperoni', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614380/recipe_icons/pepperoni.png'),
(144, 'red_wine', 'vino tinto', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614381/recipe_icons/red_wine.png'),
(145, 'rum', 'ron', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614382/recipe_icons/rum.png'),
(146, 'sesame', 'ajonjolí', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614382/recipe_icons/sesame.png'),
(147, 'sesame_oil', 'aceite_de_ajonjolí', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614383/recipe_icons/sesame_oil.png'),
(148, 'tabasco_sauce', 'salsa_tabasco', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614384/recipe_icons/tabasco_sauce.png'),
(149, 'tequila', 'tequila', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614384/recipe_icons/tequila.png'),
(150, 'whiskey', 'whiskey', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614385/recipe_icons/whiskey.png'),
(151, 'white_wine', 'vino_blanco', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614385/recipe_icons/white_wine.png'),
(152, 'yeast', 'levadura', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763614386/recipe_icons/yeast.png'),
(153, 'broad_beans', 'habas', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763615477/recipe_icons/broad-beans.png'),
(154, 'canned_sardines', 'sardina_enlatada', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763615478/recipe_icons/canned_sardines.png'),
(155, 'crab', 'cangrejo', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763615479/recipe_icons/crab.png'),
(156, 'lobster', 'langosta', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763615479/recipe_icons/lobster.png'),
(157, 'marshmallow', 'malvaviscos', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763615480/recipe_icons/marshmallow.png'),
(158, 'penaut', 'cacahuate', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763615481/recipe_icons/penaut.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` varchar(40) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `recipe_id`, `category`) VALUES
(6, 6, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish'),
(7, 6, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan'),
(8, 6, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish'),
(9, 6, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan'),
(10, 6, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish'),
(12, 6, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'breakfast'),
(14, 6, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan'),
(17, 6, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan'),
(18, 2, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan'),
(19, 2, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'breakfast'),
(21, 2, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'desserts'),
(22, 2, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'breakfast'),
(23, 6, 'd757daf5-656a-489f-b357-c9082e7714f1', 'desserts'),
(24, 7, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan'),
(25, 2, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan'),
(26, 2, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan'),
(27, 10, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'breakfast'),
(31, 10, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'desserts'),
(32, 10, 'd757daf5-656a-489f-b357-c9082e7714f1', 'desserts'),
(34, 10, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan'),
(38, 10, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan'),
(39, 2, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish'),
(40, 2, '77b8faa9-b807-43d2-b222-05966753fd79', 'desserts'),
(41, 2, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan'),
(42, 2, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish'),
(43, 2, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish'),
(44, 2, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan'),
(46, 2, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'breakfast'),
(47, 2, 'd757daf5-656a-489f-b357-c9082e7714f1', 'desserts'),
(48, 2, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish'),
(53, 6, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan'),
(54, 6, '8e7e473b-27a8-4686-955b-14b00c117119', 'breakfast'),
(55, 6, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'desserts'),
(56, 6, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish'),
(58, 6, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish'),
(59, 6, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'breakfast'),
(60, 6, 'a33da413-8fce-4290-8b26-b69179c6634d', 'desserts'),
(61, 6, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish'),
(62, 2, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts'),
(63, 2, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish'),
(64, 6, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts'),
(65, 2, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'desserts'),
(66, 2, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish'),
(67, 2, '8e7e473b-27a8-4686-955b-14b00c117119', 'breakfast'),
(68, 2, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish'),
(69, 6, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan'),
(70, 2, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan'),
(71, 2, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan'),
(72, 2, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan'),
(73, 2, 'a33da413-8fce-4290-8b26-b69179c6634d', 'desserts'),
(74, 2, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'breakfast'),
(75, 2, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts'),
(76, 6, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts'),
(78, 6, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish'),
(79, 6, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'breakfast'),
(80, 6, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'breakfast'),
(81, 6, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'desserts'),
(82, 6, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan'),
(83, 2, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish'),
(84, 16, 'e3bf3003-e213-49f7-a8d3-9b1a5da0c8c1', 'strong_dish'),
(85, 2, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast'),
(86, 2, '140ba62f-b186-4a2a-910b-a364a6230f2b', 'breakfast'),
(87, 4, 'dedaafa3-0352-4155-935e-8fd115a03032', 'vegan'),
(88, 37, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts'),
(89, 51, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast'),
(90, 47, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish'),
(95, 37, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish'),
(96, 53, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts'),
(97, 47, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish'),
(99, 37, '85bb6c99-7d91-4da3-8a34-067761bb6967', 'breakfast'),
(100, 2, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish'),
(101, 40, 'e1bc158e-1aab-4b2e-8c1e-72554a1e3c25', 'breakfast'),
(102, 40, 'd9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'strong_dish'),
(103, 2, 'd48b1e5a-3c51-4452-b488-02720d397574', 'breakfast'),
(104, 2, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish'),
(106, 2, '56401dc2-cb30-4107-9f70-c29917a183d5', 'desserts'),
(107, 2, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts'),
(108, 2, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish'),
(109, 2, 'a24a7611-8ea2-42d1-b93e-c4691e26b088', 'desserts'),
(110, 2, '420f3269-969a-475b-850b-3bc4ca4648eb', 'strong_dish'),
(111, 2, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts'),
(112, 2, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts'),
(113, 6, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts'),
(114, 6, 'dedaafa3-0352-4155-935e-8fd115a03032', 'vegan'),
(115, 6, '2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'vegan'),
(116, 6, '420f3269-969a-475b-850b-3bc4ca4648eb', 'strong_dish'),
(117, 6, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts'),
(118, 6, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish'),
(119, 6, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish'),
(120, 6, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts'),
(121, 6, '3dcfc668-7aa9-40cd-947e-342a111110b5', 'vegan'),
(122, 6, '77b8faa9-b807-43d2-b222-05966753fd79', 'desserts'),
(123, 6, '19923584-5d23-401b-8540-c74f590b06e9', 'breakfast'),
(124, 6, 'e1bc158e-1aab-4b2e-8c1e-72554a1e3c25', 'breakfast'),
(126, 6, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan'),
(127, 6, 'd48b1e5a-3c51-4452-b488-02720d397574', 'breakfast'),
(128, 6, 'a24a7611-8ea2-42d1-b93e-c4691e26b088', 'desserts'),
(129, 6, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish'),
(130, 6, 'c0cbb51a-b36d-4287-9810-71b215169cea', 'desserts'),
(131, 6, '56401dc2-cb30-4107-9f70-c29917a183d5', 'desserts'),
(132, 44, '19923584-5d23-401b-8540-c74f590b06e9', 'breakfast');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `id` int(11) NOT NULL,
  `recipe_id` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`id`, `recipe_id`, `category`, `ingredient_id`) VALUES
(1, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'Desserts', 72),
(2, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'Desserts', 45),
(3, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'Desserts', 59),
(4, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'Desserts', 43),
(5, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'Desserts', 12),
(6, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'Desserts', 20),
(7, 'd757daf5-656a-489f-b357-c9082e7714f1', 'Desserts', 85),
(8, 'd757daf5-656a-489f-b357-c9082e7714f1', 'Desserts', 45),
(9, 'd757daf5-656a-489f-b357-c9082e7714f1', 'Desserts', 28),
(10, 'd757daf5-656a-489f-b357-c9082e7714f1', 'Desserts', 43),
(11, 'd757daf5-656a-489f-b357-c9082e7714f1', 'Desserts', 10),
(12, 'd757daf5-656a-489f-b357-c9082e7714f1', 'Desserts', 50),
(13, 'd757daf5-656a-489f-b357-c9082e7714f1', 'Desserts', 83),
(14, 'a33da413-8fce-4290-8b26-b69179c6634d', 'Desserts', 43),
(15, 'a33da413-8fce-4290-8b26-b69179c6634d', 'Desserts', 83),
(16, 'a33da413-8fce-4290-8b26-b69179c6634d', 'Desserts', 15),
(17, 'a33da413-8fce-4290-8b26-b69179c6634d', 'Desserts', 44),
(18, 'a33da413-8fce-4290-8b26-b69179c6634d', 'Desserts', 77),
(19, '77b8faa9-b807-43d2-b222-05966753fd79', 'Desserts', 51),
(20, '77b8faa9-b807-43d2-b222-05966753fd79', 'Desserts', 44),
(21, '77b8faa9-b807-43d2-b222-05966753fd79', 'Desserts', 45),
(22, '77b8faa9-b807-43d2-b222-05966753fd79', 'Desserts', 85),
(23, '77b8faa9-b807-43d2-b222-05966753fd79', 'Desserts', 43),
(24, '77b8faa9-b807-43d2-b222-05966753fd79', 'Desserts', 72),
(25, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'Desserts', 70),
(26, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'Desserts', 44),
(27, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'Desserts', 59),
(28, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'Desserts', 45),
(29, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'Desserts', 62),
(30, 'ce4185ef-1a21-406c-8087-d7b01aa313af', 'Desserts', 28),
(31, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Breakfast', 15),
(32, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Breakfast', 31),
(33, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Breakfast', 3),
(34, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Breakfast', 39),
(35, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Breakfast', 45),
(36, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Breakfast', 62),
(37, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'Breakfast', 64),
(38, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'Breakfast', 43),
(39, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'Breakfast', 62),
(40, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'Breakfast', 15),
(41, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'Breakfast', 44),
(42, '45b9bf89-af65-44d1-9b78-1471de37f75d', 'Breakfast', 45),
(43, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 31),
(44, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 39),
(45, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 3),
(46, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 87),
(47, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 62),
(48, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 38),
(49, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 28),
(50, '7c124e82-dafe-42ad-9ed9-cd94a8776e08', 'Breakfast', 88),
(51, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 68),
(52, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 89),
(53, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 59),
(54, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 2),
(55, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 62),
(56, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 64),
(57, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 88),
(58, 'de15caaa-5226-4b30-865c-83df68d5ef66', 'Breakfast', 39),
(59, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 29),
(60, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 13),
(61, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 44),
(62, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 80),
(63, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 51),
(64, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 20),
(65, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 10),
(67, '8e7e473b-27a8-4686-955b-14b00c117119', 'Breakfast', 7),
(68, '031a436c-88fb-4d4d-94f8-5511d90d41d6', 'Dish', NULL),
(69, '031a436c-88fb-4d4d-94f8-5511d90d41d6', 'Dish', NULL),
(70, '031a436c-88fb-4d4d-94f8-5511d90d41d6', 'Dish', NULL),
(71, '031a436c-88fb-4d4d-94f8-5511d90d41d6', 'Dish', NULL),
(72, '031a436c-88fb-4d4d-94f8-5511d90d41d6', 'Dish', NULL),
(73, '031a436c-88fb-4d4d-94f8-5511d90d41d6', 'Dish', NULL),
(74, '031a436c-88fb-4d4d-94f8-5511d90d41d6', 'Dish', NULL),
(75, 'b3755252-3e16-425c-b3dd-81c32bc6cc2a', 'Strong Dish', NULL),
(76, 'b3755252-3e16-425c-b3dd-81c32bc6cc2a', 'Strong Dish', NULL),
(77, 'b3755252-3e16-425c-b3dd-81c32bc6cc2a', 'Strong Dish', NULL),
(78, 'b3755252-3e16-425c-b3dd-81c32bc6cc2a', 'Strong Dish', NULL),
(79, 'b3755252-3e16-425c-b3dd-81c32bc6cc2a', 'Strong Dish', NULL),
(80, 'b3755252-3e16-425c-b3dd-81c32bc6cc2a', 'Strong Dish', NULL),
(81, 'b3755252-3e16-425c-b3dd-81c32bc6cc2a', 'Strong Dish', NULL),
(82, '14e50920-b55e-4fc0-a203-fa8f2ea18860', 'strong_dish', NULL),
(83, '14e50920-b55e-4fc0-a203-fa8f2ea18860', 'strong_dish', NULL),
(84, '14e50920-b55e-4fc0-a203-fa8f2ea18860', 'strong_dish', NULL),
(85, '14e50920-b55e-4fc0-a203-fa8f2ea18860', 'strong_dish', NULL),
(86, '14e50920-b55e-4fc0-a203-fa8f2ea18860', 'strong_dish', NULL),
(87, '14e50920-b55e-4fc0-a203-fa8f2ea18860', 'strong_dish', NULL),
(88, '14e50920-b55e-4fc0-a203-fa8f2ea18860', 'strong_dish', NULL),
(89, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish', 90),
(90, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish', 62),
(91, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish', 64),
(92, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish', 27),
(93, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish', 79),
(94, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish', 3),
(95, '02fa3548-e918-41f9-a17b-a32454f82dca', 'strong_dish', 91),
(96, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 73),
(97, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 39),
(98, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 31),
(99, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 3),
(100, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 27),
(101, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 62),
(102, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 83),
(103, '49aed1f7-7d5a-4422-bc67-cd8cda47c8c9', 'strong_dish', 88),
(104, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 73),
(105, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 39),
(106, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 31),
(107, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 3),
(108, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 27),
(109, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 62),
(110, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 83),
(111, '35d6bded-0a68-47ae-8c73-b08a447a430b', 'strong_dish', 88),
(112, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 73),
(113, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 39),
(114, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 31),
(115, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 3),
(116, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 27),
(117, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 62),
(118, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 83),
(119, '4044b71e-111d-491d-b494-6bb470dbdbb7', 'strong_dish', 88),
(120, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 69),
(121, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 3),
(122, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 27),
(123, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 31),
(124, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 92),
(125, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 62),
(126, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 64),
(127, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 88),
(128, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 83),
(129, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish', 28),
(130, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 73),
(131, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 27),
(132, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 93),
(133, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 94),
(134, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 92),
(135, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 64),
(136, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 62),
(137, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 87),
(138, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 3),
(139, 'b3acc70d-83c6-4326-988f-6283adcfbfa7', 'strong_dish', 89),
(140, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 39),
(141, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 90),
(142, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 3),
(143, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 95),
(144, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 27),
(145, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 44),
(146, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 88),
(147, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 64),
(148, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish', 62),
(149, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 97),
(150, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 64),
(151, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 27),
(152, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 96),
(153, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 62),
(154, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 88),
(155, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 89),
(156, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan', 3),
(157, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 97),
(158, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 23),
(159, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 30),
(160, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 84),
(161, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 3),
(162, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 27),
(163, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 98),
(164, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 88),
(165, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 62),
(166, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 91),
(167, 'b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'vegan', 99),
(168, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 100),
(169, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 101),
(170, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 39),
(171, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 64),
(172, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 93),
(173, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 62),
(174, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 89),
(175, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 27),
(176, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 83),
(177, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 87),
(178, '3ea10e26-ae51-444a-b241-feec9b4fc389', 'vegan', 2),
(179, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 97),
(180, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 13),
(181, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 30),
(182, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 3),
(183, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 27),
(184, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 91),
(185, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 102),
(186, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 64),
(187, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 62),
(188, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 101),
(189, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 4),
(190, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 33),
(191, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 11),
(192, '6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'vegan', 89),
(193, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 103),
(194, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 101),
(195, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 3),
(196, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 27),
(197, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 98),
(198, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 30),
(199, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 52),
(200, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 2),
(201, 'ac607f70-e2b8-475d-946f-9bfd4330a342', 'vegan', 62),
(202, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 90),
(203, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 62),
(204, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 64),
(205, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 27),
(206, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 45),
(207, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 101),
(208, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 79),
(209, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 95),
(210, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish', 91),
(211, 'eb6b0736-88e0-4cfa-9cfd-f4301109e8b5', 'breakfast', 4),
(212, 'eb6b0736-88e0-4cfa-9cfd-f4301109e8b5', 'breakfast', 59),
(213, 'eb6b0736-88e0-4cfa-9cfd-f4301109e8b5', 'breakfast', 45),
(214, 'eb6b0736-88e0-4cfa-9cfd-f4301109e8b5', 'breakfast', 28),
(215, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 3),
(216, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 30),
(217, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 27),
(218, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 79),
(219, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 97),
(220, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 31),
(221, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 21),
(222, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 2),
(223, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 91),
(224, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 101),
(225, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 62),
(226, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan', 64),
(227, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 2),
(228, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 3),
(229, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 62),
(230, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 9),
(231, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 21),
(232, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 64),
(233, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 91),
(234, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 27),
(235, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan', 11),
(236, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 33),
(237, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 30),
(238, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 31),
(239, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 3),
(240, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 62),
(241, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 11),
(242, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 97),
(243, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 21),
(244, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 17),
(245, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 101),
(246, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 6),
(247, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 18),
(248, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 27),
(249, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 9),
(250, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 64),
(251, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 2),
(252, '0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'vegan', 89),
(253, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 27),
(254, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 3),
(255, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 14),
(256, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 88),
(257, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 73),
(258, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 23),
(259, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 30),
(260, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 71),
(261, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 31),
(262, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 39),
(263, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 64),
(264, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 62),
(265, 'b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'strong_dish', 83),
(266, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts', 104),
(267, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts', 106),
(268, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts', 107),
(269, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts', 108),
(270, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts', 105),
(271, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts', 10),
(280, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts', 10),
(281, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts', 43),
(282, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts', 15),
(283, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts', 45),
(284, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts', 44),
(285, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts', 95),
(286, 'fe78cf3b-dc80-4cec-8380-2661c600d2e6', 'desserts', 62),
(287, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 90),
(288, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 4),
(289, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 45),
(290, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 5),
(291, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 57),
(292, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 62),
(293, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 3),
(294, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 11),
(295, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 28),
(296, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 33),
(297, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 31),
(298, '765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'strong_dish', 64),
(321, '0e42a7bb-9236-4dc9-ba73-94088d15291b', 'desserts', 86),
(322, '0e42a7bb-9236-4dc9-ba73-94088d15291b', 'desserts', 10),
(323, '0e42a7bb-9236-4dc9-ba73-94088d15291b', 'desserts', 44),
(339, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast', 59),
(340, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast', 87),
(341, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast', 62),
(342, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast', 88),
(343, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast', 64),
(344, 'a709ab7b-aa57-4982-a345-b8dccc38091a', 'breakfast', 91),
(349, '140ba62f-b186-4a2a-910b-a364a6230f2b', 'breakfast', 1),
(350, '140ba62f-b186-4a2a-910b-a364a6230f2b', 'breakfast', 59),
(351, '140ba62f-b186-4a2a-910b-a364a6230f2b', 'breakfast', 62),
(352, '140ba62f-b186-4a2a-910b-a364a6230f2b', 'breakfast', 88),
(353, 'dedaafa3-0352-4155-935e-8fd115a03032', 'vegan', 87),
(354, 'dedaafa3-0352-4155-935e-8fd115a03032', 'vegan', 31),
(355, 'dedaafa3-0352-4155-935e-8fd115a03032', 'vegan', 3),
(356, 'dedaafa3-0352-4155-935e-8fd115a03032', 'vegan', 89),
(357, 'dedaafa3-0352-4155-935e-8fd115a03032', 'vegan', 39),
(358, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 39),
(359, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 88),
(360, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 73),
(361, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 31),
(362, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 3),
(363, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 27),
(364, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 51),
(365, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 20),
(366, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 29),
(367, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 62),
(368, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 64),
(369, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 44),
(370, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 28),
(371, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 95),
(372, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 43),
(373, '083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'strong_dish', 91),
(374, 'f3c0c3a2-a201-4383-afe2-587c575f1f48', 'vegan', 95),
(375, 'f3c0c3a2-a201-4383-afe2-587c575f1f48', 'vegan', 64),
(376, 'f3c0c3a2-a201-4383-afe2-587c575f1f48', 'vegan', 64),
(377, 'f3c0c3a2-a201-4383-afe2-587c575f1f48', 'vegan', 10),
(378, '85bb6c99-7d91-4da3-8a34-067761bb6967', 'breakfast', 51),
(379, '85bb6c99-7d91-4da3-8a34-067761bb6967', 'breakfast', 13),
(380, '85bb6c99-7d91-4da3-8a34-067761bb6967', 'breakfast', 44),
(381, '0889caad-e1e8-4960-9911-84ac4f32a21f', 'breakfast', 44),
(382, '0889caad-e1e8-4960-9911-84ac4f32a21f', 'breakfast', 10),
(383, '0889caad-e1e8-4960-9911-84ac4f32a21f', 'breakfast', 51),
(384, 'd48b1e5a-3c51-4452-b488-02720d397574', 'breakfast', 15),
(385, 'd48b1e5a-3c51-4452-b488-02720d397574', 'breakfast', 1),
(386, 'd48b1e5a-3c51-4452-b488-02720d397574', 'breakfast', 88),
(387, 'd48b1e5a-3c51-4452-b488-02720d397574', 'breakfast', 62),
(388, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish', 81),
(389, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish', 39),
(390, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish', 95),
(391, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish', 64),
(392, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish', 62),
(413, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish', 87),
(414, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish', 39),
(415, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish', 31),
(416, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish', 62),
(417, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish', 38),
(418, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish', 33),
(419, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish', 28),
(420, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 39),
(421, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 31),
(422, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 88),
(423, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 62),
(424, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 27),
(425, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 87),
(426, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 91),
(427, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 95),
(428, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 3),
(429, '93dadfe4-8c46-468a-be08-5fbe6325e262', 'strong_dish', 28),
(430, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 43),
(431, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 88),
(432, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 45),
(433, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 72),
(434, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 44),
(435, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 59),
(436, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 62),
(437, '9948c4d5-2c5c-4ebc-90d7-61c6224ddda6', 'desserts', 50),
(446, '3dcfc668-7aa9-40cd-947e-342a111110b5', 'vegan', 84),
(447, '3dcfc668-7aa9-40cd-947e-342a111110b5', 'vegan', 70),
(448, '3dcfc668-7aa9-40cd-947e-342a111110b5', 'vegan', 31),
(449, '3dcfc668-7aa9-40cd-947e-342a111110b5', 'vegan', 28),
(450, 'c0cbb51a-b36d-4287-9810-71b215169cea', 'desserts', 43),
(451, 'c0cbb51a-b36d-4287-9810-71b215169cea', 'desserts', 59),
(452, 'c0cbb51a-b36d-4287-9810-71b215169cea', 'desserts', 44),
(453, 'c0cbb51a-b36d-4287-9810-71b215169cea', 'desserts', 95),
(459, 'd0688e44-cdd4-4e8c-b054-a8e72280011d', 'strong_dish', 14),
(460, 'd0688e44-cdd4-4e8c-b054-a8e72280011d', 'strong_dish', 31),
(461, 'd0688e44-cdd4-4e8c-b054-a8e72280011d', 'strong_dish', 62),
(462, 'd0688e44-cdd4-4e8c-b054-a8e72280011d', 'strong_dish', 101),
(463, 'd0688e44-cdd4-4e8c-b054-a8e72280011d', 'strong_dish', 83),
(464, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish', 69),
(465, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish', 3),
(466, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish', 62),
(467, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish', 27),
(468, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish', 92),
(469, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish', 88),
(470, '2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'vegan', 25),
(471, '2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'vegan', 2),
(472, '2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'vegan', 33),
(473, '2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'vegan', 39),
(474, '2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'vegan', 31),
(475, '2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'vegan', 3),
(476, 'a24a7611-8ea2-42d1-b93e-c4691e26b088', 'desserts', 84),
(477, 'a24a7611-8ea2-42d1-b93e-c4691e26b088', 'desserts', 43),
(478, 'a24a7611-8ea2-42d1-b93e-c4691e26b088', 'desserts', 83),
(479, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 39),
(480, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 3),
(481, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 31),
(482, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 27),
(483, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 4),
(484, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 12),
(485, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 72),
(486, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 38),
(487, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 88),
(488, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 62),
(489, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 90),
(490, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 96),
(491, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 83),
(492, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 51),
(493, 'b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'strong_dish', 1),
(494, 'e1bc158e-1aab-4b2e-8c1e-72554a1e3c25', 'breakfast', 15),
(495, 'e1bc158e-1aab-4b2e-8c1e-72554a1e3c25', 'breakfast', 81),
(496, 'e1bc158e-1aab-4b2e-8c1e-72554a1e3c25', 'breakfast', 101),
(497, '420f3269-969a-475b-850b-3bc4ca4648eb', 'strong_dish', 99),
(498, '420f3269-969a-475b-850b-3bc4ca4648eb', 'strong_dish', 69),
(499, '420f3269-969a-475b-850b-3bc4ca4648eb', 'strong_dish', 30),
(500, '420f3269-969a-475b-850b-3bc4ca4648eb', 'strong_dish', 84),
(501, '420f3269-969a-475b-850b-3bc4ca4648eb', 'strong_dish', 88),
(502, 'd9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'strong_dish', 81),
(503, 'd9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'strong_dish', 28),
(504, 'd9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'strong_dish', 83),
(505, 'd9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'strong_dish', 62),
(506, 'd9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'strong_dish', 43),
(507, 'd9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'strong_dish', 88),
(508, '55bfa4f4-0a06-46fe-b1c2-7825fe20591d', 'breakfast', 15),
(509, '55bfa4f4-0a06-46fe-b1c2-7825fe20591d', 'breakfast', 44),
(510, '55bfa4f4-0a06-46fe-b1c2-7825fe20591d', 'breakfast', 51),
(511, '55bfa4f4-0a06-46fe-b1c2-7825fe20591d', 'breakfast', 13),
(512, '55bfa4f4-0a06-46fe-b1c2-7825fe20591d', 'breakfast', 45),
(513, 'a3ce9072-af95-486b-bbc1-b3eb0d63b69e', 'breakfast', 39),
(514, 'a3ce9072-af95-486b-bbc1-b3eb0d63b69e', 'breakfast', 59),
(515, 'a3ce9072-af95-486b-bbc1-b3eb0d63b69e', 'breakfast', 31),
(516, 'a3ce9072-af95-486b-bbc1-b3eb0d63b69e', 'breakfast', 3),
(517, 'a3ce9072-af95-486b-bbc1-b3eb0d63b69e', 'breakfast', 88),
(522, '56401dc2-cb30-4107-9f70-c29917a183d5', 'desserts', 93),
(523, '56401dc2-cb30-4107-9f70-c29917a183d5', 'desserts', 85),
(524, '56401dc2-cb30-4107-9f70-c29917a183d5', 'desserts', 44),
(525, '56401dc2-cb30-4107-9f70-c29917a183d5', 'desserts', 43),
(526, '56401dc2-cb30-4107-9f70-c29917a183d5', 'desserts', 95),
(527, 'ee26830f-e93f-48a8-b192-86b4b5b13acd', 'strong_dish', 87),
(528, 'ee26830f-e93f-48a8-b192-86b4b5b13acd', 'strong_dish', 28),
(529, 'ee26830f-e93f-48a8-b192-86b4b5b13acd', 'strong_dish', 81),
(530, 'ee26830f-e93f-48a8-b192-86b4b5b13acd', 'strong_dish', 39),
(531, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 4),
(532, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 33),
(533, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 1),
(534, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 17),
(535, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 31),
(536, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 39),
(537, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 3),
(538, 'b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'strong_dish', 28),
(539, '19923584-5d23-401b-8540-c74f590b06e9', 'breakfast', 59),
(540, '19923584-5d23-401b-8540-c74f590b06e9', 'breakfast', 3),
(541, '19923584-5d23-401b-8540-c74f590b06e9', 'breakfast', 39),
(542, '19923584-5d23-401b-8540-c74f590b06e9', 'breakfast', 31),
(543, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts', 10),
(544, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts', 93),
(545, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts', 43),
(546, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts', 107),
(547, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts', 104),
(548, '88449258-abf0-4798-a36a-e650a5014bdd', 'desserts', 2),
(549, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 29),
(550, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 51),
(551, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 8),
(552, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 2),
(553, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 32),
(554, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 35),
(555, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 43),
(556, '57b6bb2f-6f14-468b-b84c-89f544d995bb', 'desserts', 86);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saved_recipes`
--

CREATE TABLE `saved_recipes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` varchar(40) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `saved_recipes`
--

INSERT INTO `saved_recipes` (`id`, `user_id`, `recipe_id`, `category`) VALUES
(8, 6, '5d7f45d5-c234-431a-9532-482f99a21526', 'vegan'),
(11, 10, '0e92da43-45ec-4b38-bc4b-1997a03c3d51', 'desserts'),
(12, 10, '5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'vegan'),
(13, 10, '4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'vegan'),
(16, 6, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts'),
(18, 6, 'feec6e03-cb81-4fa9-93ac-76a723719ac8', 'strong_dish'),
(19, 16, '5837c7f6-d053-4838-8035-3f7dcc1edc08', 'strong_dish'),
(20, 2, '1f476d2e-1693-4ce0-af38-a3314b32aa4d', 'breakfast'),
(21, 2, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts'),
(22, 37, 'c84d8adf-f721-4dd8-97b5-853df15fbf08', 'desserts'),
(23, 47, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish'),
(24, 37, '68f96fe3-232b-4420-90e4-81b0606d287f', 'strong_dish'),
(25, 47, 'c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'strong_dish'),
(26, 45, '667edca6-ca44-429e-bfce-7a667736bec4', 'strong_dish'),
(27, 44, '763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'strong_dish'),
(28, 44, '85bb6c99-7d91-4da3-8a34-067761bb6967', 'breakfast');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `strong_dish`
--

CREATE TABLE `strong_dish` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `instruction` text DEFAULT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `items` int(11) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `strong_dish`
--

INSERT INTO `strong_dish` (`id`, `name`, `description`, `instruction`, `img_path`, `created_at`, `author`, `items`, `verified`) VALUES
('02fa3548-e918-41f9-a17b-a32454f82dca', 'Pechugas de Pollo en Salsa Cremosa de Champiñones', 'Un platillo delicioso, cremoso y elegante. Las pechugas de pollo se cocinan a la perfección y se bañan con una salsa de champiñones y crema que combina perfecto con arroz, pasta o puré de papa.', '[\"Sazona las pechugas con sal, pimienta y ajo en polvo por ambos lados. En un sartén grande, calienta el aceite o mantequilla a fuego medio-alto y cocina las pechugas hasta que estén doradas por fuera y bien cocidas por dentro (4–6 minutos por lado). Retira del sartén y reserva.\",\"En el mismo sartén, agrega un poco más de aceite si es necesario. Sofríe la cebolla y el ajo durante 2 minutos, luego añade los champiñones. Cocina hasta que estén doraditos y hayan soltado su jugo (5–6 minutos).\",\"Reduce el fuego a medio. Agrega la crema para cocinar y, si deseas una salsa más ligera, incorpora el caldo de pollo. Mezcla bien y cocina 2–3 minutos hasta que espese ligeramente.\",\"Vuelve a colocar las pechugas en el sartén y báñalas con la salsa. Cocina todo junto por 2–3 minutos más para que se integren los sabores.\",\"Sirve caliente, espolvoreado con perejil fresco. Puedes acompañar con arroz blanco, puré de papa, pasta o vegetales al vapor.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752958851/image_recipes/fzta2gtc8h2bl9u6ubdl.jpg', '2025-07-19 21:00:51', '2', 7, 1),
('083c7370-8253-4944-9bb9-a94dd1b2b2d0', 'Chiles en nogada', 'Un platillo que pinta los colores de México en cada bocado. 🇲🇽\r\nLos chiles en nogada son una obra maestra de la cocina poblana: chiles poblanos rellenos de un exquisito picadillo de carnes, frutas y especias, bañados con una suave y cremosa salsa de nuez de castilla, y coronados con granada y perejil que representan el verde, blanco y rojo del pabellón nacional.', '[\"Asa los chiles poblanos directamente en el fuego o en un comal hasta que la piel se queme por completo.\",\"Colócalos en una bolsa de plástico o cúbrelos con un trapo húmedo durante 10 minutos para que “suden”.\",\"Retira la piel con cuidado, haz una abertura lateral y quita las semillas sin romperlos.\",\"Sofríe la cebolla y el ajo en aceite.\",\"Agrega las carnes molidas y cocina hasta que se doren.\",\"Añade el jitomate picado y deja que se cocine unos minutos.\",\"Incorpora la fruta picada (manzana, pera, durazno, plátano), las pasas, piñones y almendras.\",\"Sazona con sal, pimienta, y si quieres, un toque de canela y clavo.\",\"Cocina a fuego medio hasta que todo esté bien integrado.\",\"Deja enfriar un poco antes de rellenar los chiles.\",\"Con cuidado, rellena cada chile con el picadillo preparado.\",\"Puedes servirlos así, o pasarlos por harina y huevo para capearlos y freírlos (esto es opcional, según la versión).\",\"En la licuadora, mezcla las nueces, la leche, la crema, el queso, el azúcar, la sal y el vino blanco (si usas).\",\"Licúa hasta obtener una salsa cremosa y homogénea.\",\"Si queda muy espesa, agrega un poco más de leche.\",\"Coloca los chiles rellenos en un plato.\",\"Báñalos con la nogada.\",\"Decora con granos de granada y perejil fresco picado.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1761354093/image_recipes/petzfb1ll7apvochjpgp.jpg', '2025-10-25 01:01:35', '2', 16, 1),
('4044b71e-111d-491d-b494-6bb470dbdbb7', 'Carne de Res en Salsa de Chile Pasilla', 'Un platillo mexicano lleno de sabor y tradición. La carne de res se cocina lentamente en una salsa espesa hecha con chiles pasilla, ajo y especias, resultando en un guiso perfecto para acompañar con arroz, frijoles y tortillas.', '[\"Quita las semillas y venas de los chiles pasilla. Ásalos ligeramente en un comal o sartén seco (no quemarlos, solo dorarlos un poco). Luego hidrátalos en agua caliente por 10–15 minutos.\",\"En la licuadora, coloca los chiles hidratados, jitomates (pueden ir crudos o cocidos), cebolla, ajo, comino, sal, pimienta y 1 taza de agua. Licúa hasta obtener una salsa espesa y suave.\",\"En una olla con aceite caliente, dora los cubos de carne por todos lados. Sazona con sal y pimienta al gusto.\",\"Vierte la salsa licuada sobre la carne y mezcla. Agrega el resto del agua o caldo. Cocina a fuego medio-bajo durante 40–60 minutos (tapado), hasta que la carne esté suave y la salsa haya espesado. Puedes agregar más agua si es necesario.\",\"Sirve caliente acompañado de arroz rojo, frijoles de la olla y tortillas recién hechas.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752961093/image_recipes/h9lhf8crjjx3g9ep8hbr.jpg', '2025-07-19 21:38:13', '2', 8, 1),
('420f3269-969a-475b-850b-3bc4ca4648eb', 'Bibimbap (비빔밥)', 'El Bibimbap es un plato tradicional coreano cuyo nombre significa “arroz mezclado”. Se sirve en un tazón grande con arroz blanco como base y encima se colocan diferentes ingredientes en secciones: verduras salteadas, carne marinada (generalmente de res), huevo y la salsa picante gochujang.', '[\"Cocina el arroz y colócalo en un tazón grande.\",\"Saltea las verduras por separado con un poco de aceite y sal.\",\"Marina y cocina la carne con salsa de soya, ajo y azúcar.\",\"Coloca los ingredientes sobre el arroz en secciones (como un arcoíris).\",\"Añade el huevo frito encima.\",\"Agrega gochujang y aceite de sésamo, mezcla todo antes de comer.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763059636/image_recipes/nitafv4sh1vi9xxbhjpi.jpg', '2025-11-13 18:47:17', '61', 5, 1),
('5837c7f6-d053-4838-8035-3f7dcc1edc08', 'Pechugas de Pollo en Salsa de Champiñones', 'Un platillo casero, reconfortante y sabroso. Pechugas de pollo doradas bañadas en una cremosa salsa de champiñones, perfectas para acompañar con arroz, puré o pasta.', '[\"Sazona las pechugas con sal, pimienta y ajo en polvo por ambos lados.\",\"En una sartén grande, derrite 1 cucharada de mantequilla con el aceite de oliva. Dora las pechugas por ambos lados (unos 4–5 minutos por lado). Retira y reserva.\",\"En la misma sartén, derrite la otra cucharada de mantequilla. Agrega los champiñones y el ajo picado. Cocina hasta que se doren (5–6 minutos).\",\"Vierte la crema y el caldo de pollo. Añade el tomillo. Revuelve bien y deja que hierva suavemente por 3–5 minutos hasta que espese un poco.\",\"Regresa las pechugas a la sartén, báñalas con la salsa y cocina a fuego bajo por 5–7 minutos más, hasta que estén bien cocidas.\",\"Sirve caliente con arroz blanco, puré de papa o pasta. Espolvorea con perejil fresco.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752969989/image_recipes/tbn3xj9d1shrokki0vxs.jpg', '2025-07-20 00:06:29', '2', 9, 1),
('667edca6-ca44-429e-bfce-7a667736bec4', 'Enchiladas rojas', 'Las enchiladas rojas son un platillo mexicano que consiste en tortillas de maíz rellenas de carne, pollo, o queso, bañadas en salsa', '[\"Preparar la salsa\",\"Preparar el relleno\",\"Freír las tortillas\",\"Armar las enchiladas\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763057394/image_recipes/acxjaj25yel8c84iqtrh.jpg', '2025-11-13 18:09:55', '49', 7, 1),
('68f96fe3-232b-4420-90e4-81b0606d287f', 'Salchichas en chipotle', 'Salchichas Enchiladas con Crema, Chiles Chipotles y Leche: Salchichas asadas y bañadas en una salsa cremosa y picante hecha con crema, chiles chipotles y leche. ¡Rico y fácil!', '[\"1. Calienta las salchichas en una sartén a fuego medio hasta que estén doradas.\",\"2. En un tazón, mezcla la crema, los chiles chipotles y la leche.\",\"3. Agrega la mezcla de crema a las salchichas y cocina durante unos minutos hasta que la salsa esté caliente y espesa.\",\"4. Sirve las salchichas con la salsa de crema y chiles chipotles.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763056638/image_recipes/gybhj4ll535byxqgvjq1.jpg', '2025-11-13 17:57:19', '37', 5, 1),
('763b3cb8-c3f0-4a30-8a59-afdaf50a87ef', 'Espagueti a la Boloñesa', 'Un platillo clásico de la cocina italiana. Este espagueti lleva una rica salsa de carne molida con tomate, cebolla y especias, perfecta para una comida abundante y reconfortante.', '[\"Hierve agua con sal en una olla grande. Agrega el espagueti y cocina según las instrucciones del paquete. Escurre y reserva.\",\"En un sartén grande, calienta el aceite de oliva. Sofríe la cebolla y el ajo hasta que estén dorados. Agrega la carne molida y cocina hasta que se dore por completo. Sazona con sal y pimienta.\",\"Incorpora los jitomates triturados (o el tomate enlatado), el puré de tomate, el orégano, la albahaca y mezcla bien. Cocina a fuego medio-bajo durante 15–20 minutos. Si está muy espesa, agrega un poco de agua o caldo.\",\"Añade la pasta cocida al sartén con la salsa o sirve la salsa encima de la pasta en el plato. Espolvorea queso parmesano por encima si lo deseas.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752962171/image_recipes/azcoaf9cz1ddbdtiq3u1.jpg', '2025-07-19 21:56:11', '2', 10, 1),
('765782eb-8504-4c1c-a347-2ff8c88cc9a5', 'Chicken hamburger', 'Hearty chicken hamburger with flavorful toppings and a tangy mustard sauce. Perfect for a filling and satisfying meal.', '[\"Step 1: Season the chicken breasts with salt and pepper.\",\"Step 2: Heat a pan over medium heat, melt some butter and cook the chicken breasts until they\'re no longer pink in the middle.\",\"Step 3: Meanwhile, fry the bacon until crispy.\",\"Step 4: Slice the bread into half horizontally to make burger buns. You can lightly toast them if you like.\",\"Step 5: Slice the tomatoes, onions, and pickles.\",\"Step 6: Once the chicken is cooked, assemble the burger. Spread some mustard on the bottom half of the bun, place a lettuce leaf, followed by a slice of tomato, the cooked chicken breast, a slice of cheese, some bacon, onion rings, and pickles.\",\"Step 7: Place the other half of the bun on top and serve. Enjoy your hearty chicken hamburger!\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1758392939/image_recipes/kcoqndyxqqisw483o1mx.jpg', '2025-09-20 18:29:00', '2', 12, 1),
('93dadfe4-8c46-468a-be08-5fbe6325e262', 'Chilaquiles flojos', 'Una receta super facil y rápida, una riquísima opción para foráneos.', '[\"Frie los chiles, tomates verdes y cebolla en aceite caliente, por unos 5 minutos.\",\"Saca lo frito y colócalo juntos a unas ramas de cilantro, hojas de espinaca y una caja de media crema.\",\"Una vez licuado, sofríe la mezcla con aceite caliente por 5 min.\",\"Coloca los totopos en un plato extendidoy sirve la mezcla encima, puedes acompañar con el queso de tu preferencia.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763057476/image_recipes/ytsmngpgallglinai9fx.jpg', '2025-11-13 18:11:18', '48', 10, 1),
('b0ee9546-d8e4-4425-91e5-1c5d2bc1fd48', 'Torta de jamón', 'Un rico aperitivo para una emergencia', '[\"Se parte el pan en dos\",\"Se pica la lechuga, el tomate, la cebolla y el chile\",\"Al pan se le untan frijoles, y se añaden los demás ingredientes\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763061634/image_recipes/o6mcthgz7ub7qonqwjyt.jpg', '2025-11-13 19:20:36', '34', 8, 1),
('b2b602ea-6782-48a8-bb5d-d3a71bfe146d', 'Mole', 'El mole es un platillo emblemático y un símbolo de la identidad gastronómica de México. La palabra proviene del náhuatl \"molli\" o \"mulli\", que significa simplemente \"salsa\" o \"guiso\". Más que una sola receta, el mole es una familia de salsas complejas y ricas, con cientos de variedades regionales en estados como Puebla y Oaxaca, famosos por sus \"siete moles\".', '[\"1.Tostar los chiles secos  Quita las semillas y las venas.  Fríelos ligeramente en aceite sin que se quemen (solo unos segundos por lado).  Ponlos a remojar en agua caliente durante 15 minutos.\",\"2.Freír los ingredientes sólidos  En un poco de aceite, fríe la tortilla, el pan, el plátano macho, las almendras, cacahuates, ajonjolí, canela, clavo y pimienta.  Reserva.\",\"3.Asar los ingredientes frescos  Asa el jitomate, la cebolla y el ajo en un comal o sartén hasta que se doren.\",\"4.Licuar todo  En una licuadora, coloca los chiles remojados, las semillas fritas, los jitomates asados y un poco del caldo de pollo.  Licúa hasta obtener una mezcla suave (puedes hacerlo en dos tandas).\",\"5.Colar y cocinar el mole  Cuela la mezcla y fríela en una olla con un poco de aceite o manteca.  Cocina a fuego medio-bajo durante unos 20–30 minutos, moviendo constantemente.\",\"6.Servir  Se suele servir sobre piezas de pollo cocido o guajolote.  Espolvorea ajonjolí encima para decorar.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763059329/image_recipes/iqbae5d7xgiompvqq15c.jpg', '2025-11-13 18:42:10', '54', 15, 1),
('b3acc70d-83c6-4326-988f-6283adcfbfa7', 'Tacos de Carne Asada', 'Un platillo tradicional del norte de México. La carne asada se marina con jugo de cítricos y especias, luego se cocina a la parrilla o sartén, y se sirve en tortillas calientes con cebolla, cilantro y salsa.', '[\"En un tazón grande, mezcla el ajo, jugo de limón, jugo de naranja, salsa inglesa, orégano, comino, sal, pimienta y aceite. Agrega la carne y cubre bien con la marinada. Deja reposar mínimo 30 minutos (ideal 2–4 horas en refrigeración).\",\"Asa la carne en una parrilla, comal o sartén caliente hasta que esté dorada por fuera y jugosa por dentro (3–5 minutos por lado, según el grosor). Deja reposar unos minutos y luego corta en tiras o cubos pequeños.\",\"Calienta las tortillas en un comal o sartén hasta que estén suaves y calientes.\",\"Coloca la carne en las tortillas y acompaña con cebolla, cilantro, unas gotas de limón y salsa al gusto.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752962977/image_recipes/abw99gad1sxk5yr5lxjj.jpg', '2025-07-19 22:09:37', '2', 10, 1),
('b8a86d78-414f-4a2a-ad54-b1cc80aeb547', 'Spaghetti con picadillo', 'Plato fuerte, delicioso con carne de cerdo. Ideal para una comida ligera y fácil de preparar. Excelente para toda la familia', '[\"Hervir la pasta con ajo, cebolla, sal y aceite por 12 minutos.\",\"Escurrir la pasta.\",\"Picar finamente 4 ajos grandes.\",\"Sofreír los ajos sin que se quemen.\",\"Soltar la pasta en el sartén en donde se están sofriendo los ajos.\",\"Mezclar la pasta con los ajos y dejar por 5 minutos más en el sartén a fuego medio.\",\"Para el picadillo picar finamente 3 ajos y media cebolla mediana.\",\"Freír sin quemar y agregar la carne cuando los ajos cambien de color.\",\"Condimentar con sal y pimienta.\",\"Picar en cuadritos la papá y la zanahoria.\",\"Hervir por 5 minutos la verdura previamente picada junto con el chícharo.\",\"Hierve dos chiles chipotles y tres jitomates hasta que suavizen.\",\"Dejar enfriar y moler con ajo y cebolla.\",\"Agrega la salsa a la carne, junto con las verduras. Dejar cocinar por 10 minutos o hasta que las verduras estén completamente suaves.\",\"Servir la carne junto con la pasta spaghetti.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755146901/image_recipes/vl83nhvvkgix4cbtufpo.jpg', '2025-08-14 04:48:22', '6', 13, 1),
('c84f7ad8-5bdc-4405-8f0d-9191ed7fe132', 'Birria', 'birria es un guiso mexicano de carne cocida en salsa de chiles y especias, muy sabroso', '[\"Cocer la carne:  En una olla grande, coloca la carne, media cebolla, 2 dientes de ajo, las hojas de laurel y sal al gusto.  Cubre con agua y cocina a fuego medio durante 1 hora y media a 2 horas, o hasta que la carne esté suave.  Reserva el caldo y la carne por separado.\",\"Preparar el adobo:  Tuesta los chiles guajillos, anchos y de árbol unos segundos en un sartén sin aceite (solo hasta que suelten aroma, sin quemarlos).  Luego, hidrátalos en agua caliente por unos 10 minutos.  Licúa los chiles con los ajos, la cebolla, comino, orégano, clavo, pimienta, vinagre y un poco del caldo de la carne hasta obtener una salsa espesa y homogénea.\",\"Mezclar la carne con el adobo:  Coloca la carne cocida en una olla o cazuela.  Cuélale encima la salsa (adobo) y agrega una taza o más del caldo según la consistencia que desees (más espeso o más caldoso).  Cocina todo junto a fuego bajo unos 20–30 minutos para que la carne se impregne del sabor del adobo.\",\"Servir la birria:  Sirve la carne con su caldo en platos hondos.  Acompaña con cebolla, cilantro, limón y tortillas calientes.  También puedes hacer tacos dorados de birria si la escurres un poco y la pasas por comal o sartén.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763058010/image_recipes/wc8zvbjoteys6rsd9fao.jpg', '2025-11-13 18:20:10', '51', 6, 1),
('d0688e44-cdd4-4e8c-b054-a8e72280011d', 'Spaghetti', 'This is an easy and tasty spaghetti recipe. You only need a few ingredients and a few minutes to make it. Perfect for lunch or dinner!', '[\"Hervir el agua en una olla\",\"Agregar sal y aceite\",\"Poner la pasta en el agua hirviendo\",\"Cocinar por 8-10 minutos\",\"Escurrir el agua\",\"Agregar la salsa de tomate y mezclar bien\",\"Servir\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763057821/image_recipes/u5jntrvp9jiprokzdbjz.jpg', '2025-11-13 18:17:02', '53', 5, 1),
('d9b8ccbd-9c14-4506-aa02-1db992cff7ab', 'Pizza', 'Una deliciosa pizza de pepperoni', '[\"Primero necesitamos un tazón y empezamos echando las 3 cucharadas de Levadura y arina, las 2 cucharadas de azucar, una cucharada de sal luego los revolvemos\",\"Luego le echamos el litro y medio de agua tibia y lo movemos con un acuchilla hasta que no ayan humos lo dejamos reposar unos 15 minutos\",\"Después de que pasará le echamos la harina lo revolvemos bien hasta que no se pegue está listo y lo dejamos de reposar 30 minutos\",\"Después agarramos una bola de masa la ponemos en un acharola aceitada la esparchimos en toda la charola y le esparchimos la salsa de tomate y el queso y después el pepperoni lo metemos en el horno lo dejamos 15 minutos y ya estaría buen  provecho\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763059806/image_recipes/jqnvnhaq9qmwckbvlxee.jpg', '2025-11-13 18:50:07', '40', 6, 1),
('ee26830f-e93f-48a8-b192-86b4b5b13acd', 'Chimichangas', 'Tortilla enrollada rellena de queso,chalchichas y chile', '[\"Paso 1: corta las salchichas y los chiles frielos en un salten con haceite echa el queso en sima\",\"Paso 2 pon una porción en una tortilla enrrollala\",\"Paso 3 sellalo en un sarten con una generosa cantidad de aceite\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763061100/image_recipes/bqxc9ewb8fuh0afp57w6.jpg', '2025-11-13 19:11:41', '39', 4, 1),
('feec6e03-cb81-4fa9-93ac-76a723719ac8', 'Pollo en Salsa de Chipotle con Crema', 'Este platillo mexicano combina la suavidad de la crema con el toque ahumado y picante del chile chipotle. Es ideal para acompañar con arroz blanco y tortillas calientes.', '[\"En una sartén grande, calienta el aceite y cocina el pollo con sal y pimienta hasta que esté bien dorado y cocido por dentro. Retira y reserva.\",\"En la licuadora, mezcla la crema, leche, chipotles, cebolla y ajo hasta obtener una salsa suave. Puedes colarla si deseas una textura más fina.\",\"En la misma sartén, vierte la salsa y caliéntala a fuego medio-bajo. Remueve constantemente y cocina por unos 5 minutos hasta que espese un poco.\",\"Regresa el pollo a la sartén y mezcla bien con la salsa. Cocina 5–7 minutos más para que absorba el sabor.\",\"Acompaña con arroz blanco, frijoles refritos y tortillas calientes.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752963482/image_recipes/jt3reqnrwnoe08s0zwu6.jpg', '2025-07-19 22:18:02', '2', 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `img_profile_path` varchar(500) DEFAULT NULL,
  `reset_code` varchar(4) DEFAULT NULL,
  `reset_expires_at` datetime DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `verification_token` varchar(255) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `img_cover_path` varchar(500) DEFAULT NULL,
  `img_profile_id` varchar(255) DEFAULT NULL,
  `img_cover_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `created_at`, `img_profile_path`, `reset_code`, `reset_expires_at`, `verified`, `verification_token`, `expires_at`, `img_cover_path`, `img_profile_id`, `img_cover_id`) VALUES
(2, 'agusm1253@gmail.com', 'Agus.jsx', '$2b$10$qlSuQnjMv8YRFflFLFmrlOilhZYdbIKUECdGubkmu2eFPZs74QkuS', '2025-07-08 16:36:04', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1767914977/image_users/rep4jtdthwu8hmcysrxc.png', NULL, NULL, 1, NULL, NULL, 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755637991/image_covers/ae0eqipolib5bm9cv8hr.jpg', 'image_users/rep4jtdthwu8hmcysrxc', 'image_covers/ae0eqipolib5bm9cv8hr'),
(4, '202172009@uich.edu.mx', 'Agus👻', '$2b$10$8Sx8gT5OryRf/fbaB4iQG.jXsYv16KeAQimBXrLEy832rVn.zTcHS', '2025-07-28 17:27:16', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1753925557/image_users/yjfiyitstenvwojrxsgx.webp', NULL, NULL, 1, NULL, NULL, 'https://res.cloudinary.com/dqizoxubr/image/upload/v1753925558/image_covers/c2skb0fjoxtjvvlywqsu.jpg', 'image_users/yjfiyitstenvwojrxsgx', 'image_covers/c2skb0fjoxtjvvlywqsu'),
(6, 'cristicesareo24@gmail.com', 'Chris🥐', '$2b$10$A4hwP8ePyPNOL5obo0v5YOi5L3CB1NYIW0eWArzwv/ID6FUuLwZrG', '2025-07-31 01:52:14', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1753927216/image_users/o93jb84sqd2k0xfu1qof.jpg', NULL, NULL, 1, 'ab827c0c-7c88-4a3f-adb6-526e9ce5ac92', '2025-08-20 02:47:16', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755654435/image_covers/fxzzc9n1nklgnbaburye.jpg', 'image_users/o93jb84sqd2k0xfu1qof', 'image_covers/fxzzc9n1nklgnbaburye'),
(7, 'jh96822654@gmail.com', 'Jess', '$2b$10$.ZpYyuumalBwOAEQ47BG8ugoTNlglOaSdxggum2ZYDXoLokVMhMOq', '2025-07-31 02:39:00', NULL, NULL, NULL, 1, NULL, '2025-07-31 02:49:01', NULL, NULL, NULL),
(9, '202172019@uich.edu.mx', 'Yajaira', '$2b$10$Aavm.lytruyxhPrhJVzDnO/jkSNKgC.iYO/iU8Pgx0xWA3AZnv1ua', '2025-07-31 03:11:33', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1753931735/image_users/nx6pil46ga6lyvxbo2cw.jpg', NULL, NULL, 1, '215baa8e-7962-4be7-a6dd-695efbac4d6c', '2025-07-31 04:15:37', NULL, 'image_users/nx6pil46ga6lyvxbo2cw', NULL),
(10, 'karenzurc220704@gmail.com', 'Karen Cruz ', '$2b$10$facehoV34usDRONGajqEuODP5JOIy4xiPrGfZaLE2xIpFeUzjxkVa', '2025-07-31 18:14:08', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1754007581/image_users/ictjgbdu9pjlyoxeueoo.webp', NULL, NULL, 1, NULL, NULL, 'https://res.cloudinary.com/dqizoxubr/image/upload/v1754007583/image_covers/zctddrqizsbagdh5i9jp.webp', 'image_users/ictjgbdu9pjlyoxeueoo', 'image_covers/zctddrqizsbagdh5i9jp'),
(12, 'itzellunasarmiento@gmail.com', 'Itzel', '$2b$10$3d0Zy9BteE9NkbXUzTExu.8SzFmqcy3vGKzkuqIIIX.hosvbCC.lS', '2025-08-15 19:42:22', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755287248/image_users/t56w8munf9liubdslbdo.jpg', NULL, NULL, 1, 'abd80e31-dba5-488a-b6e6-007313babeb7', '2025-08-15 20:48:12', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1755287291/image_covers/yhznlzqmqkguxdvzoyj8.png', 'image_users/t56w8munf9liubdslbdo', 'image_covers/yhznlzqmqkguxdvzoyj8'),
(14, 'rocio_sosa@uich.edu.mx', 'MissXhia', '$2b$10$z0yoBFVrT4Cf5VF9UrKUzuT3bIDYO/Q52fzcENmTWSGTg/qX27nKa', '2025-10-21 19:21:27', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1761076369/image_users/z9wt9lkoyetnfbuyt0is.jpg', NULL, NULL, 1, '8610a5e5-b014-4124-ac0c-b05d8c48978b', '2025-10-21 20:52:50', NULL, 'image_users/z9wt9lkoyetnfbuyt0is', NULL),
(16, 'yadom25789@elygifts.com', 'Midnite', '$2b$10$bKW2EyshVAaMf/ZvFwB7POM8RGto1lkr01E1ATC8dpdGbZFX7FI7a', '2025-10-21 19:51:14', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1761077306/image_users/j9vq8yf3ocv7lt4wal2w.png', NULL, NULL, 1, '37d0d602-ac10-424b-ad78-90aca3b49d3d', '2025-10-21 21:08:27', NULL, 'image_users/j9vq8yf3ocv7lt4wal2w', NULL),
(18, 'yadom25789@elygifts.com', 'Don_M', '$2b$10$bKW2EyshVAaMf/ZvFwB7POM8RGto1lkr01E1ATC8dpdGbZFX7FI7a', '2025-10-22 01:25:10', NULL, NULL, NULL, 1, NULL, '2025-10-22 01:35:11', NULL, NULL, NULL),
(19, 'yadom25789@elygifts.com', 'DonMm', '$2b$10$bKW2EyshVAaMf/ZvFwB7POM8RGto1lkr01E1ATC8dpdGbZFX7FI7a', '2025-10-22 01:28:06', NULL, NULL, NULL, 1, NULL, '2025-10-22 01:38:06', NULL, NULL, NULL),
(20, 'cabrerarosassergio500@gmail.com', 'Gio', '$2b$10$Cv2YZkbZnq..4s8XDRJMnuolwatmgpIzfELE/.QoMwPBk/EydkIIm', '2025-10-22 15:25:28', NULL, NULL, NULL, 1, NULL, '2025-10-22 15:35:29', NULL, NULL, NULL),
(24, 'emmanuelromano271@gmail.com', 'Manolo', '$2b$10$EVSw5B.82UaY1yhrHNXB5uHUxhyYdSZLyKV.zhxmQ1vqLhOJRXgjG', '2025-10-22 15:27:39', NULL, NULL, NULL, 1, NULL, '2025-10-22 15:37:40', NULL, NULL, NULL),
(25, 'bryan20066@outlook.com', 'Bryan', '$2b$10$/bh6oXAvGRHzt4XJ3Ef32OQhKg.V1JjFMSLIijGJ4sA8C4THPzS6G', '2025-10-22 15:29:30', NULL, NULL, NULL, 1, NULL, '2025-10-22 15:39:31', NULL, NULL, NULL),
(26, 'medelortizuriel@gmail.com', 'Uriel', '$2b$10$QMWdVivOIquBAJKUA2CZzuphtiv0ZcplIv6HyR9zTJqS1oVEUygVy', '2025-10-22 15:38:04', NULL, NULL, NULL, 1, NULL, '2025-10-22 15:48:04', NULL, NULL, NULL),
(27, 'medelortizuriel@gmail.com', 'Uriel', '$2b$10$VHrkLYzH8IcgxJ1pQBkI8OZ8HZx2dzUSflvJzWSQV6Oijx8FWllpW', '2025-10-22 15:41:29', NULL, NULL, NULL, 1, NULL, '2025-10-22 15:51:29', NULL, NULL, NULL),
(28, 'medelortizuriel@gmail.com', 'Uriel_Ortiz', '$2b$10$qDvJF.UoyCTm/0k0XVYM2.kS8MiUqbnIjqrXlgVqIkck/H801bXti', '2025-10-22 15:44:22', NULL, NULL, NULL, 1, NULL, '2025-10-22 15:54:22', NULL, NULL, NULL),
(33, 'salvigm753@gmail.com', 'S4LV1_', '$2b$10$O7ELkT/97a8OutKW72C1gejtzh7SFnBlff5T1NYan27767l2brpcu', '2025-10-27 22:53:55', NULL, NULL, NULL, 1, NULL, '2025-10-27 23:03:56', NULL, NULL, NULL),
(34, 'Anellcuevas1405@hotmail.com', 'Erik_12', '$2b$10$W9WtjHRmbNzsF4fY0cP1RuqHUZcz0OIt43nq9CqKBhKQOeXdPqvWy', '2025-10-27 22:54:28', NULL, NULL, NULL, 1, NULL, '2025-10-27 23:04:29', NULL, NULL, NULL),
(37, 'andresmirandag02@gmail.com', 'Andrés', '$2b$10$8AE23AkbnzXpHRJ8ICCGtupnL4Xn4Ysq5M/fd0nfpP0Hgds8cnpru', '2025-10-28 01:20:21', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763055695/image_users/iet9ts3l8ucanm19do2l.jpg', NULL, NULL, 1, '961dba76-03da-4421-8230-db5e227f1801', '2025-11-13 18:41:37', NULL, 'image_users/iet9ts3l8ucanm19do2l', NULL),
(38, '202372026@uich.edu.mx', 'Adriana_Chacón_Muñoz', '$2b$10$JqUh4R0HbLVN8VWhD2gs3uLLDenuvs2e/d8o.YCf8XsmSKSvVM5.a', '2025-10-28 02:12:51', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763055700/image_users/bjjc0zo25xdy2mumpgm7.webp', NULL, NULL, 1, '3dc5d67d-ad1f-436c-a0f6-68c1d3e207de', '2025-11-13 19:14:58', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763057697/image_covers/amcwdoqmgns3pedrzmnr.jpg', 'image_users/bjjc0zo25xdy2mumpgm7', 'image_covers/amcwdoqmgns3pedrzmnr'),
(39, 'gomezgordillovalentin@gmail.com', 'Valentin_', '$2b$10$hSXEaUQHk93schhWq6tz3.8KnTDiKmeKsFUCznzh/1EJ0S2ddnk3G', '2025-10-28 20:11:59', NULL, NULL, NULL, 1, NULL, '2025-10-28 20:21:59', NULL, NULL, NULL),
(40, '202574007@uich.edu.mx', 'Sebastian_8', '$2b$10$Tdp0PMqg9fTdPxM1RJysCu4iiTtUvEpfgEHZqEbvDPw2mTEKYLnai', '2025-10-28 20:12:43', NULL, NULL, NULL, 1, NULL, '2025-10-28 20:22:43', NULL, NULL, NULL),
(42, '202574007@uich.edu.mx', 'Sebastian_', '$2b$10$40LgFHakU6CCdyrR4AfOGe6NJEtKcQBB4fuV84BBCMjilGoeqWy9K', '2025-10-28 20:16:50', NULL, NULL, NULL, 1, NULL, '2025-10-28 20:26:50', NULL, NULL, NULL),
(43, '202574007@uich.edu.mx', 'Sebastian_', '$2b$10$TqahpFrVEWbDOzjxCOPFWeITdeuiqjLkEQrO8zO5QGHFrYa9732De', '2025-10-28 20:27:53', NULL, NULL, NULL, 1, NULL, '2025-10-28 20:37:53', NULL, NULL, NULL),
(44, '202574013@uich.edu.mx', 'Donaldo16', '$2b$10$IQfiRWAFPEvoTV3G2NtRc.UgC/Xs.GhnA2BkZNd.8YnNHmWFMwmt2', '2025-10-29 01:16:28', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763394672/image_users/oeo9e2ozc3ppbjqbxonb.jpg', NULL, NULL, 1, '58e13827-911b-4e54-89b3-cb9c11f2ce3f', '2025-11-17 16:51:13', NULL, 'image_users/oeo9e2ozc3ppbjqbxonb', NULL),
(45, 'ximena.xtl.dt@gmail.com', 'Dafne_1', '$2b$10$a3EVe5f9otCEwS/DwQ2JnuwnuwvCq9FnjBK2exds.IHgiTPcB.Gee', '2025-10-29 14:13:40', NULL, NULL, NULL, 1, NULL, '2025-10-29 14:23:40', NULL, NULL, NULL),
(47, '202372013@uich.edu.mx', 'Liliana_Carrasco', '$2b$10$QzsXayAzFBdE6ma7OMMXdekD7B3jXntTDh9PZHhCULiJ.UfNVjNTC', '2025-11-02 20:02:43', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763058734/image_users/ohweadbgfvrizqk6mxa7.jpg', NULL, NULL, 1, 'eacebcc9-a3f3-4975-bbb9-b48c1ecb1620', '2025-11-13 19:32:17', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763058736/image_covers/recyogbpk9xknvtplnnc.jpg', 'image_users/ohweadbgfvrizqk6mxa7', 'image_covers/recyogbpk9xknvtplnnc'),
(48, 'mendozagama715@gmail.com', 'Gamaliel_Mendoza_C', '$2b$10$5jGLG6eCCYXspH6nDwPVWuYSDGgtgOsIkpbXJUu1T6leLjhVvQmZG', '2025-11-13 17:39:54', NULL, NULL, NULL, 1, NULL, '2025-11-13 17:49:54', NULL, NULL, NULL),
(49, 'ariadna.12suar@gmail.com', 'ariSuarez', '$2b$10$DOeWBxoznYUa1dS0HSFUje.UwuLFB7IAAecsJbxV3pAnqu1oa1d1i', '2025-11-13 17:40:53', NULL, NULL, NULL, 1, NULL, '2025-11-13 17:50:53', NULL, NULL, NULL),
(50, '202372012@uich.edu.mx', 'S4LV1', '$2b$10$dCB/P0fAmAkx3JmLiQ1wCOnirccvJAtNXu/hUCERL0PCbNkNxaBG6', '2025-11-13 17:40:58', NULL, NULL, NULL, 1, NULL, '2025-11-13 17:50:58', NULL, NULL, NULL),
(51, 'colulamartinezarturo@gmail.com', 'Arturo_00', '$2b$10$Rs8vPjCIi1yGpR8GESKsk.n8wHsdZVygaBlYYhzXg1EX9h.hoKdQO', '2025-11-13 17:43:48', NULL, NULL, NULL, 1, NULL, '2025-11-13 17:53:49', NULL, NULL, NULL),
(52, 'jonaolmedo520@gmail.com', 'Jonatan512', '$2b$10$SyovGlw54EltfawYJD/3c.JbUo9nejSES.59kVzNUamsMkJGaaGcu', '2025-11-13 18:04:57', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:14:58', NULL, NULL, NULL),
(53, 'alanmartine70@gmail.com', 'AlanMH', '$2b$10$P1xCgIULK30rfW6AEGO.keN9rgI4RmRrwjT1O8TgqKzo76bG3gm82', '2025-11-13 18:05:14', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763058386/image_users/jod2n0akfl4waykupiat.jpg', NULL, NULL, 1, 'b57af1b6-9e7c-4b63-ab56-6d2b2702a085', '2025-11-13 19:26:28', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763058387/image_covers/mc6sq98wy1ijpsfwhvks.jpg', 'image_users/jod2n0akfl4waykupiat', 'image_covers/mc6sq98wy1ijpsfwhvks'),
(54, 'juanjodanirriba@gmail.com', 'Juanjo', '$2b$10$zO/ovTZn2m1X1CNBYpBRXeIjmAywpqoqEyC3elv0bvOPjyXz0.y3W', '2025-11-13 18:06:49', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:16:49', NULL, NULL, NULL),
(58, '202372003@uich.edu.mx', 'fabian', '$2b$10$kcUzYKAA6VVPoSbuPZEvleMdd0I/aDIvHDeObgeF/uqEqfVt1VoGe', '2025-11-13 18:09:28', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:19:29', NULL, NULL, NULL),
(59, '202272017@uich.edu.mx', 'Jordan_Melchor', '$2b$10$DyY8yLQP0TvU.v6V7cfPNOkUcFXKOoo1biJ3P.q.QHQ/wsCmfJCfi', '2025-11-13 18:10:22', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:20:23', NULL, NULL, NULL),
(61, '202372015@uich.edu.mx', 'fabian', '$2b$10$tH.ulShxf1U73t5BfcBUK.5WCKZSrKNISh6Me0wZ3jBLxqqw/vhF6', '2025-11-13 18:18:49', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:28:49', NULL, NULL, NULL),
(62, 'ximena.xtl.dt@gmail.com', 'Dafne_20', '$2b$10$a3EVe5f9otCEwS/DwQ2JnuwnuwvCq9FnjBK2exds.IHgiTPcB.Gee', '2025-11-13 18:22:38', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:32:38', NULL, NULL, NULL),
(63, 'melchorjordan60@gmail.com', 'Jordan_Herrera', '$2b$10$cswwVP0sDg4Lpp1M9Z/3BetHxA0Ol01mGgGF33QKPXKrQbO4zJTke', '2025-11-13 18:24:41', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:34:41', NULL, NULL, NULL),
(65, '202372011@uich.edu.mx', 'Angel_uriel', '$2b$10$q1D77f/ZQA1k5W.OhAwK6.DSMndP4HeeoGVT/LpBcOZQsuG00SXZe', '2025-11-13 18:30:20', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:40:21', NULL, NULL, NULL),
(66, 'diegonahuaca90@gmail.com', 'Diego_Coscatl_', '$2b$10$A7xkfn6u6jFWxXz/iZfxeOADGBi4LoZh03kyiD5PCj.L52i3tJEBG', '2025-11-13 18:35:42', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:45:42', NULL, NULL, NULL),
(67, '202574003@uich.edu.mx', 'Ana_karen_', '$2b$10$faDPdFYkUyKFzk3bdJNoOONQGb.88NBFOMlUbrDOrQn2Oykehay72', '2025-11-13 18:37:38', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:47:39', NULL, NULL, NULL),
(68, '202574003@uich.edu.mx', 'Ana_karen', '$2b$10$VJkmIsOrkF3EUhPUAhW6HukUd7Eu0H1oONEpJQW9T29QLuFvPqip2', '2025-11-13 18:39:21', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:49:22', NULL, NULL, NULL),
(69, '202574009@uich.edu.mx', 'Samantha_', '$2b$10$RQdpqbt0x1m/UgiUXceTMOSTZwooUKYQhNHz67zfuImG4cApsLHjO', '2025-11-13 18:39:43', NULL, NULL, NULL, 1, NULL, '2025-11-13 18:49:44', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vegan`
--

CREATE TABLE `vegan` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `instruction` text DEFAULT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `items` int(11) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vegan`
--

INSERT INTO `vegan` (`id`, `name`, `description`, `instruction`, `img_path`, `created_at`, `author`, `items`, `verified`) VALUES
('0f50aead-3fe1-4992-8a06-0671f0d89d0e', 'Vegan Salad', 'This is a bright, crunchy, and refreshing vegan salad with a sweet and tangy dressing. It\'s simple to make and packed with nutrition.', '[\"Step 1: Wash all the vegetables thoroughly.\",\"Step 2: Chop lettuce, tomato, carrot, cucumber, and broccoli.\",\"Step 3: Dice the onion and mince the garlic.\",\"Step 4: Cut the avocado into small slices.\",\"Step 5: Drain and rinse the chickpeas and beans.\",\"Step 6: Combine all the vegetables and legumes in a large bowl.\",\"Step 7: To create the dressing, mix lemon juice, olive oil, minced garlic, mustard, salt and pepper.\",\"Step 8: Pour the dressing over the salad.\",\"Step 9: Toss the salad so everything is evenly coated with dressing.\",\"Step 10: Garnish with chopped chives and olives before serving.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1754889187/image_recipes/seendff7ol5sohgcad3f.jpg', '2025-08-11 05:13:08', '2', 17, 1),
('2b89114e-7e2e-4380-bbb2-ccfb051bfa5e', 'Ensalada de atún', 'La Ensalada de Atún es una opción fresca y práctica, preparada con atún, verduras crujientes y un aderezo ligero. Perfecta para una comida rápida, nutritiva y llena de sabor.', '[\"Corta el tomate, cebolla y chile.\",\"Mezcla en un bowl el atún con los ingredientes antes cortados.\",\"Sazona al gusto con el jugo de limón, sal y mayonesa.\",\"Mezcla bien todo y sirve con tostadas o galletas.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763058215/image_recipes/qdadupq5kjj2mnrbczpm.jpg', '2025-11-13 18:23:36', '38', 6, 1),
('3dcfc668-7aa9-40cd-947e-342a111110b5', 'Calabacitas con Elote', 'Las Calabacitas con Elote son un platillo tradicional mexicano lleno de color y sabor, preparado con calabacitas tiernas, granos de elote dulce, jitomate, cebolla y un toque de chile. Es una receta ligera, nutritiva y reconfortante que se disfruta como guarnición o platillo principal.', '[\"En una olla con tapa, cocina a fuego bajo las calabacitas, los granos de elote, el Concentrado de Tomate con Pollo CONSOMATE® y el Sazonador Líquido MAGGI®, junto con el jitomate por 8 minutos o hasta que las calabacitas estén tiernas.\",\"Retira del fuego.\",\"Espolvorea encima de las calabacitas el queso rallado.\",\"Sirve caliente.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763057625/image_recipes/hzoxsnnxswts0jfqnfxw.jpg', '2025-11-13 18:13:46', '38', 4, 1),
('3ea10e26-ae51-444a-b241-feec9b4fc389', 'Tacos Veganos de Coliflor', 'Tacos llenos de sabor y textura, con coliflor asada en adobo de chipotle, acompañados de repollo morado crujiente y una crema de aguacate.', '[\"Mezcla los floretes con el aceite, chipotle picado, comino, pimentón, jugo de limón y sal. Hornea a 200 °C durante 25–30 minutos o hasta que esté dorada y suave.\",\"Licúa el aguacate, jugo de limón, ajo, agua y sal hasta obtener una crema suave. Ajusta con más agua si es necesario.\",\"Calienta las tortillas en un comal o sartén hasta que estén suaves y calientes.\",\"Coloca coliflor asada en cada tortilla, añade repollo, un poco de crema de aguacate y decora con cilantro fresco.\",\"Acompaña con limones para exprimir al gusto.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752968107/image_recipes/wavcksi1dhp85peh5qgu.jpg', '2025-07-19 23:35:08', '2', 11, 1),
('4f5eeb96-e0e2-47ef-aca1-252c81181fbb', 'Carrot Salad', 'A crunchy fresh vegan salad that\'s perfect as a light appetizer or a wholesome meal. Packed with nutrients and easy to make!', '[\"Step 1: Peel and grate the carrots.\",\"Step 2: Peel and slice the cucumber\",\"Step 3: Dice the onion\",\"Step 4: Mince the garlic and chives.\",\"Step 5: In a large bowl, combine grated carrot, cucumber slices, diced onion, minced garlic and chives.\",\"Step 6: Prepare the dressing by combining lemon juice, olive oil, mustard, salt, and pepper.\",\"Step 7: Pour the dressing over the salad.\",\"Step 8: Toss the salad to mix the dressing thoroughly.\",\"Step 9: Sprinkle chopped parsley on top before serving.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1753724303/image_recipes/ooks6esvuocmuzu5gdol.jpg', '2025-07-28 17:38:23', '4', 9, 1),
('5b17b7a8-66bb-488f-9fc9-5a050ce67016', 'Tacos Veganos de Garbanzos y Aguacate', 'Estos tacos veganos son una opción sabrosa y nutritiva que combina garbanzos especiados con la cremosidad del aguacate. Ideales para una comida ligera o cena saludable.', '[\"En un sartén con el aceite caliente, saltea los garbanzos con el pimentón, comino, ajo en polvo, chile en polvo, sal y pimienta. Cocina por 5–7 minutos hasta que estén dorados y ligeramente crujientes. Reserva.\",\"Machaca el aguacate con el jugo de limón, sal y un toque de pimienta hasta hacer un guacamole rústico.\",\"Calienta las tortillas de maíz en un comal o sartén caliente por ambos lados.\",\"Unta una capa de aguacate en cada tortilla, añade los garbanzos especiados y decora con cebolla morada, cilantro y la salsa de tu elección.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752964239/image_recipes/byuosevkktvqf9qjunm5.jpg', '2025-07-19 22:30:39', '2', 8, 1),
('5d7f45d5-c234-431a-9532-482f99a21526', 'Stuffed zucchini', 'A flavorful, vegan recipe for stuffed zucchinis. These are packed with a hearty filling including chickpeas and vegetables.', '[\"Step 1: Preheat your oven to 200 C degrees.\",\"Step 2: Cut the zucchinis in half lengthwise and scoop out the inside to make a \'boat\'.\",\"Step 3: In a pan, heat olive oil and saute onions and garlic until fragrant.\",\"Step 4: Add mushrooms, chickpeas, carrots, tomato and cook until vegetables are softened.\",\"Step 5: Squeeze juice of half a lemon over the vegetables, add parsley and chives and season with salt and pepper.\",\"Step 6: Fill the zucchini boats with the vegetable mix, and top with some more chopped herbs.\",\"Step 7: Place stuffed zucchinis in the preheated oven and bake for 15-20 minutes, until zucchinis are tender.\",\"Step 8: Serve hot. Enjoy your vegan stuffed zucchinis!\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1753404418/image_recipes/dvktzhv2dqa9wg4khuag.jpg', '2025-07-25 00:47:00', '2', 12, 1),
('6e3b958a-b2fa-49bd-b1ed-cfe22931cdfd', 'Hamburguesa Vegana de Garbanzos y Avena', 'Una hamburguesa vegana saludable, rica en proteínas y con una textura firme y sabrosa, ideal para acompañar con tus toppings favoritos.', '[\"En un procesador de alimentos, coloca los garbanzos, avena, zanahoria, cebolla, ajo, perejil, salsa de soya, comino, pimentón, sal y pimienta. Procesa hasta obtener una masa homogénea pero con algo de textura. No sobreproceses.\",\"Divide la mezcla en 4 porciones y forma las hamburguesas con las manos. Si la mezcla está muy húmeda, puedes agregar un poco más de avena.\",\"Calienta el aceite en una sartén a fuego medio y cocina las hamburguesas durante 4–5 minutos por cada lado, hasta que estén doradas y firmes.\",\"Tuesta ligeramente los panes si lo deseas. Coloca la hamburguesa en el pan y añade tus toppings preferidos.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752968884/image_recipes/mtrby8awlxcqascfduqi.jpg', '2025-07-19 23:48:04', '2', 14, 1),
('ac607f70-e2b8-475d-946f-9bfd4330a342', 'Curry de Lentejas Rojas', 'Un curry vegano cremoso, lleno de sabor y muy nutritivo. Perfecto para acompañar con arroz o pan naan vegano.', '[\"En una olla mediana, calienta el aceite y sofríe la cebolla hasta que esté transparente (unos 5 minutos). Agrega el ajo y jengibre, cocina 1 minuto más.\",\"Incorpora la pasta de curry rojo, remueve bien durante 1 minuto para intensificar los sabores.\",\"Añade las lentejas, leche de coco, caldo y zanahoria. Mezcla bien y deja hervir. Reduce el fuego, tapa parcialmente y cocina por 20 minutos, revolviendo ocasionalmente.\",\"Cuando las lentejas estén suaves y el curry espeso, añade espinacas (si usas), el jugo de limón, sal y pimienta. Cocina 2 minutos más.\",\"Sirve caliente sobre arroz, quinoa o con pan plano. Decora con cilantro fresco.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752969388/image_recipes/bi0um0waecbvavnguvhx.jpg', '2025-07-19 23:56:28', '2', 9, 1),
('b3ac3ba0-3b4b-4b92-a03e-e5abc3cd267d', 'Curry Vegano de Garbanzos y Verduras', 'Un platillo reconfortante, lleno de sabor y especias, ideal para acompañar con arroz o pan plano. ¡Perfecto para una comida nutritiva y sabrosa!', '[\"En una olla grande, calienta el aceite y sofríe la cebolla, el ajo y el jengibre hasta que estén dorados.\",\"Incorpora el curry y la cúrcuma. Cocina por 1 minuto removiendo para liberar los aromas.\",\"Añade la papa, zanahoria, calabacita y los garbanzos. Remueve bien.\",\"Agrega el tomate triturado y la leche de coco. Mezcla todo, lleva a ebullición y luego reduce el fuego.\",\"Cocina a fuego medio-bajo durante 20–25 minutos, o hasta que las papas estén suaves y el curry espeso.\",\"Sirve caliente, acompañado de arroz, y decora con cilantro fresco.\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1752967407/image_recipes/pcr7plial2jcshvgkohh.jpg', '2025-07-19 23:23:28', '2', 11, 1),
('dedaafa3-0352-4155-935e-8fd115a03032', 'Picadillo de aguacate', 'Receta para no quedar con hambre si tienes bajos recursos', '[\"Primero necesitamos un recipiente donde poner los ingredientes\",\"Segundo cortamos la cebolla, jitomate, chile serrano y aguacate en cuadros pequeños para ponerlos en el recipiente\",\"Después con una cuchara o utensilios de cocina revolver\",\"Cuando ya esté revuelto calentamos una tortilla y a degustar\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1761180118/image_recipes/vkovec9ozcs4sopgxw3l.jpg', '2025-10-23 00:41:59', '26', 5, 1),
('f3c0c3a2-a201-4383-afe2-587c575f1f48', 'Lasaña vegana', 'Este lasaña vegana viene con ingredientes sanos', '[\"También se le coloca esencia de cacahuate\",\"Platanitos refritos\",\"Colocar un toque de chocolate\"]', 'https://res.cloudinary.com/dqizoxubr/image/upload/v1763056292/image_recipes/d7isnb9p2pxn4zcamwkj.jpg', '2025-11-13 17:51:32', '47', 4, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `breakfast`
--
ALTER TABLE `breakfast`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `desserts`
--
ALTER TABLE `desserts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingredients_list`
--
ALTER TABLE `ingredients_list`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `saved_recipes`
--
ALTER TABLE `saved_recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `strong_dish`
--
ALTER TABLE `strong_dish`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vegan`
--
ALTER TABLE `vegan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ingredients_list`
--
ALTER TABLE `ingredients_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT de la tabla `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=560;

--
-- AUTO_INCREMENT de la tabla `saved_recipes`
--
ALTER TABLE `saved_recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
