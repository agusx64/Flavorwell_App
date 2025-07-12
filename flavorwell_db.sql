-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-07-2025 a las 00:40:58
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
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `energy` varchar(10) NOT NULL,
  `time_make` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `instruction` varchar(1000) NOT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `vegan_ingredient` varchar(50) DEFAULT NULL,
  `protein_ingredient` varchar(50) DEFAULT NULL,
  `garrison_ingredient` varchar(50) DEFAULT NULL,
  `extra_ingredient` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `breakfast`
--

INSERT INTO `breakfast` (`id`, `name`, `energy`, `time_make`, `description`, `instruction`, `img_path`, `created_at`, `author`, `vegan_ingredient`, `protein_ingredient`, `garrison_ingredient`, `extra_ingredient`) VALUES
(20, 'Tostadas de aguacate y tomate', '250 cal.', '10 min.', 'Tostadas crujientes cubiertas con aguacate maduro y tomates frescos, sazonadas con sal marina y pimienta negra.', '1.- Tuesta las rebanadas de pan hasta que estén doradas y crujientes.\r\n\r\n2.- Mientras tanto, aplasta el aguacate en un tazón y sazona con sal marina y pimienta negra al gusto.\r\n\r\n3.- Unta generosamente el aguacate sobre las tostadas tostadas.\r\n\r\n4.- Corta los tomates en rodajas finas y colócalos sobre el aguacate.\r\n\r\n5.-Sirve y disfruta de inmediato.', '/uploads/recipes/1719552144440.jpeg', '2024-06-28 05:22:24', 'Agustin Mora', 'avocado', 'poultry', 'beans', 'olive_oil'),
(21, 'Smoothie de frutas tropicales', '180 cal.', '5 min.', 'Batido refrescante con piña, mango y plátano, perfecto para empezar el día con energía y vitaminas.', '1.- Pela y corta en trozos la piña, el mango y el plátano.\r\n\r\n2.- Coloca los trozos de fruta en una licuadora.\r\n\r\n3.- Agrega un poco de agua o jugo de naranja para ayudar a mezclar.\r\n\r\n4.- Licua hasta obtener una mezcla suave y homogénea.\r\n\r\n5.- Sirve inmediatamente en un vaso alto y disfruta.', '/uploads/recipes/1719552265747.jpeg', '2024-06-28 05:24:25', 'Karen Cruz', 'citrus', 'butter', 'toast', 'jam'),
(22, 'Avena con frutas y semillas', '300 cal.', '15 min.', 'Avena cremosa cocida con leche de almendra, adornada con plátano en rodajas, bayas frescas y semillas de chía.', '1.- Hierve la leche de almendra en una olla.\r\n\r\n2.- Agrega la avena y cocina a fuego lento durante 10-12 minutos, revolviendo ocasionalmente, hasta que espese.\r\n\r\n3.- Retira del fuego y deja reposar unos minutos.\r\n\r\n4.- Sirve la avena en tazones individuales.\r\n\r\n5.- Decora con rodajas de plátano, bayas frescas y espolvorea semillas de chía por encima.', '/uploads/recipes/1719552433415.jpeg', '2024-06-28 05:27:13', 'Maria Yajaira Montemira', 'citrus', 'butter', 'rice', 'yogurt'),
(23, 'Panqueques de plátano', '220 cal.', '20 min.', 'Panqueques esponjosos hechos con plátano maduro y harina de trigo integral, acompañados de jarabe de arce.', '1.- En un tazón grande, aplasta los plátanos maduros hasta que estén suaves.\r\n\r\n2.- Agrega la harina de trigo integral y la leche vegetal. Mezcla bien hasta obtener una masa homogénea.\r\n\r\n3.- Calienta una sartén antiadherente a fuego medio y engrasa ligeramente con aceite vegetal.\r\n\r\n4.- Vierte un cucharón de masa en la sartén caliente y extiéndelo ligeramente con la parte posterior de la cuchara.\r\n\r\n5.- Cocina cada lado durante aproximadamente 2-3 minutos, o hasta que estén dorados y cocidos po', '/uploads/recipes/1719552788710.jpeg', '2024-06-28 05:33:08', 'Andrea Michelle Viveros', 'citrus', 'butter', 'bread_loaf', 'milk'),
(24, 'Tofu revuelto con espinacas', '180 cal.', '15 min.', 'Revuelto de tofu sazonado con cúrcuma y pimienta, acompañado de espinacas salteadas y tomates cherry.', '1.- Calienta una sartén grande a fuego medio-alto y añade un poco de aceite.\r\n\r\n2.- Desmenuza el tofu con las manos y añádelo a la sartén caliente.\r\n\r\n3.- Cocina el tofu durante unos 5-7 minutos, removiendo ocasionalmente, hasta que esté dorado y ligeramente crujiente.\r\n\r\n4.- Agrega la cúrcuma, la pimienta y sal al gusto, y mezcla bien para que el tofu se impregne de los sabores.\r\n\r\n5.- Añade las espinacas lavadas y los tomates cherry cortados por la mitad.\r\n\r\n6.- Cocina por unos minutos más has', '/uploads/recipes/1719553097542.jpeg', '2024-06-28 05:38:17', 'Edgar Alan Ruiz', 'celery', 'eggs', 'beans', 'pumpkin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desserts`
--

CREATE TABLE `desserts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `energy` varchar(10) NOT NULL,
  `time_make` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `instruction` varchar(1000) NOT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `vegan_ingredient` varchar(50) DEFAULT NULL,
  `protein_ingredient` varchar(50) DEFAULT NULL,
  `garrison_ingredient` varchar(50) DEFAULT NULL,
  `extra_ingredient` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `desserts`
--

INSERT INTO `desserts` (`id`, `name`, `energy`, `time_make`, `description`, `instruction`, `img_path`, `created_at`, `author`, `vegan_ingredient`, `protein_ingredient`, `garrison_ingredient`, `extra_ingredient`) VALUES
(2, 'Brownies de chocolate sin horno', '200 cal.', '30 min.', 'Brownies decadentes hechos con dátiles, nueces y cacao en polvo, sin necesidad de hornear.', '1.- En un procesador de alimentos, mezcla los dátiles y las nueces hasta que estén bien picados y se forme una masa pegajosa.\r\n\r\n2.- Agrega el cacao en polvo y una pizca de sal, y mezcla de nuevo hasta que todos los ingredientes estén bien combinados.\r\n\r\n2.- Transfiere la mezcla a un molde para brownies forrado con papel vegetal y presiona uniformemente con las manos.\r\n\r\n3.- Refrigera durante al menos 1 hora para que los brownies se endurezcan.\r\n\r\n4.- Corta en cuadrados y sirve frío. Disfruta de', '/uploads/recipes/1721275787703.jpeg', '2024-07-18 04:09:47', 'Eduardo Hernandez', 'avocado', 'butter', 'bread', 'milk'),
(3, 'Helado de plátano con chocolate', '150 cal.', '10 min.', 'Helado cremoso hecho solo con plátanos congelados y trozos de chocolate oscuro, sin lácteos ni azúcar añadida.', '1.- Pela y corta los plátanos maduros en rodajas.\r\n\r\n2.- Coloca las rodajas de plátano en una bandeja y congélalas durante al menos 2 horas o hasta que estén firmes.\r\n\r\n3.- Coloca los plátanos congelados en un procesador de alimentos o licuadora potente.\r\n\r\n4.- Mezcla hasta que los plátanos se conviertan en una mezcla cremosa y suave, similar a la textura del helado.\r\n\r\n5.- Agrega trozos de chocolate oscuro y mezcla ligeramente para distribuirlo uniformemente.\r\n\r\n6.- Sirve inmediatamente para un', '/uploads/recipes/1721276589723.jpeg', '2024-07-18 04:23:09', 'Joseph Lopez', 'lemon', 'butter', 'soy', 'milk'),
(4, 'Mousse de chocolate vegano', '250 cal.', '20 min.', 'Mousse sedosa de chocolate hecho con aguacate maduro, cacao en polvo y sirope de arce, sin lácteos ni huevo.', '1.- En un procesador de alimentos, mezcla el aguacate, el cacao en polvo, el sirope de arce y la esencia de vainilla hasta que estén suaves y cremosos.\r\n\r\n2.- Transfiere la mezcla a cuencos individuales o vasos.\r\n\r\n3.- Refrigera durante al menos 1 hora para que el mousse se enfríe y se asiente.\r\n\r\n4.- Decora con virutas de chocolate negro o frutas frescas antes de servir.', '/uploads/recipes/1721276893618.jpeg', '2024-07-18 04:28:13', 'Agustin Mora', 'citrus', 'butter', 'rice', 'milk'),
(5, 'Galletas de avena y plátano', '180 cal.', '25 min.', 'Galletas suaves y saludables hechas con plátano maduro, avena, pasas y una pizca de canela.', '1.- Precalienta el horno a 180°C y forra una bandeja para hornear con papel vegetal.\r\n\r\n2.- En un tazón grande, machaca los plátanos maduros hasta que queden suaves.\r\n\r\n3.- Agrega la avena, las pasas y la canela al tazón con los plátanos machacados. Mezcla bien todos los ingredientes.\r\n\r\n4.-  Forma pequeñas bolitas con la masa y colócalas en la bandeja para hornear preparada. Aplasta ligeramente cada bolita con un tenedor.\r\n\r\n5.- Hornea las galletas durante 15-18 minutos, o hasta que estén dorad', '/uploads/recipes/1721277669639.jpeg', '2024-07-18 04:41:09', 'Chris Trinidad', 'corn', 'butter', 'rice', 'suggar'),
(6, 'Cheesecake vegano de fresa', '300 cal.', '30 min.', 'Cheesecake cremoso sin lácteos hecho con anacardos, fresas frescas y una base de nueces y dátiles.', '1.- Forra el fondo de un molde desmontable con papel vegetal.\r\n\r\n2.- En un procesador de alimentos, tritura las nueces y los dátiles hasta que se formen migas gruesas y pegajosas.\r\n\r\n3.- Presiona la mezcla de nueces y dátiles en el fondo del molde para formar la base del cheesecake. Refrigera mientras preparas el relleno.\r\n\r\n4.- Enjuaga el procesador de alimentos y agrega los anacardos remojados y escurridos, las fresas frescas, el sirope de arce, el aceite de coco derretido y el jugo de limón. ', '/uploads/recipes/1721278003177.jpeg', '2024-07-18 04:46:43', 'Marcela Cesareo', 'lemon', 'chesse', 'rice', 'jam'),
(7, 'Tarta de limón y merengue', '350 cal.', '60 mins.', 'Deliciosa tarta con una base crujiente de galleta, rellena con una suave crema de limón y cubierta con merengue dorado.', '1.- Precalienta el horno a 180°C. Tritura las galletas y mézclalas con mantequilla derretida. Presiona esta mezcla en el fondo de un molde para tarta y hornea por 10 minutos.\r\n\r\n2.- Mientras tanto, en una cacerola, mezcla el azúcar, la maicena, el jugo de limón y la ralladura de limón. Cocina a fuego medio, removiendo constantemente, hasta que la mezcla espese.\r\n\r\n3.- Retira del fuego y añade las yemas de huevo, una a una, mezclando bien después de cada adición.\r\n\r\n4.- Vierte la mezcla de limón sobre la base de galleta horneada y vuelve a hornear por 15 minutos.\r\n\r\n5.- Para el merengue, bate las claras de huevo con azúcar hasta formar picos firmes.\r\n\r\n6.- Cubre la tarta con el merengue, asegurándote de que toque los bordes para evitar que se encoja.\r\n\r\n7.- Hornea durante 10-12 minutos más, o hasta que el merengue esté dorado.\r\n\r\n8.- Deja enfriar la tarta por completo antes de desmoldar y servir.', '/uploads/recipes/1723418566102.jpeg', '2024-08-11 23:22:46', 'Chris Mora', 'citrus', 'butter', 'bread', 'suggar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredients_list`
--

CREATE TABLE `ingredients_list` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `src_reference` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingredients_list`
--

INSERT INTO `ingredients_list` (`id`, `name`, `src_reference`) VALUES
(1, 'apple', '/images/recipe_icons/apple_fruit.png'),
(2, 'apple_jam', '/images/recipe_icons/apple_jam.png'),
(3, 'avocado', '/images/recipe_icons/avocado.png'),
(4, 'bacon', '/images/recipe_icons/bacon.png'),
(5, 'baguette', '/images/recipe_icons/baguette.png'),
(6, 'bananna', '/images/recipe_icons/bananna.png'),
(7, 'beef', '/images/recipe_icons/beef.png'),
(8, 'berry_jam', '/images/recipe_icons/berry_jam.png'),
(9, 'bread', '/images/recipe_icons/bread.png'),
(10, 'bread_loaf', '/images/recipe_icons/bread_loaf.png'),
(11, 'brocoli', '/images/recipe_icons/brocoli.png'),
(12, 'butter', '/images/recipe_icons/butter.png'),
(13, 'celery', '/images/recipe_icons/celery.png'),
(14, 'cereal', '/images/recipe_icons/cereal.png'),
(15, 'chesse', '/images/recipe_icons/chesse.png'),
(16, 'citrus', '/images/recipe_icons/citrus.png'),
(17, 'corn', '/images/recipe_icons/corn.png'),
(18, 'fish', '/images/recipe_icons/fish_food.png'),
(19, 'rice', '/images/recipe_icons/rice.png'),
(20, 'jam', '/images/recipe_icons/jam.png'),
(21, 'jamon', '/images/recipe_icons/jamon.png'),
(22, 'ketchup', '/images/recipe_icons/ketchup.png'),
(23, 'lemon', '/images/recipe_icons/lime.png'),
(24, 'mango', '/images/recipe_icons/mango.png'),
(25, 'milk', '/images/recipe_icons/milk_bottle.png'),
(26, 'noodles', '/images/recipe_icons/noodles.png'),
(27, 'olive_oil', '/images/recipe_icons/olive_oil.png'),
(28, 'onion', '/images/recipe_icons/onion.png'),
(29, 'orange_juice', '/images/recipe_icons/orange_juice.png'),
(30, 'papaya', '/images/recipe_icons/papaya.png'),
(31, 'poultry', '/images/recipe_icons/poultry_leg.png'),
(32, 'pumpkin', '/images/recipe_icons/pumpkin.png'),
(33, 'raspberry', '/images/recipe_icons/raspberry.png'),
(34, 'sausage', '/images/recipe_icons/sausage.png'),
(35, 'soy', '/images/recipe_icons/soy.png'),
(36, 'spaguetti', '/images/recipe_icons/spaguetti.png'),
(37, 'steak', '/images/recipe_icons/steak.png'),
(38, 'strawberry', '/images/recipe_icons/strawberry.png'),
(39, 'suggar', '/images/recipe_icons/sugar.png'),
(40, 'fried_eggs', '/images/recipe_icons/fried_eggs.png'),
(41, 'toast', '/images/recipe_icons/toast.png'),
(42, 'watermelon', '/images/recipe_icons/watermelon.png'),
(43, 'white_beans', '/images/recipe_icons/white_beans.png'),
(44, 'yogurt', '/images/recipe_icons/yogurt.png'),
(45, 'apple_fruit', '/images/recipe_icons/apple_fruit.png'),
(46, 'eggs', '/images/recipe_icons/eggs.png'),
(47, 'beans', '/images/recipe_icons/beans.png'),
(48, 'carrot', '/images/recipe_icons/carrot.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `recipe_id`, `category`) VALUES
(1, 1, 5, 'vegan'),
(2, 1, 20, 'breakfast'),
(3, 1, 7, 'desserts'),
(4, 1, 1, 'strong_dish'),
(5, 2, 5, 'vegan'),
(6, 2, 1, 'strong_dish'),
(7, 1, 6, 'desserts'),
(8, 1, 24, 'breakfast');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saved_recipes`
--

CREATE TABLE `saved_recipes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `saved_recipes`
--

INSERT INTO `saved_recipes` (`id`, `user_id`, `recipe_id`, `category`) VALUES
(1, 1, 1, 'strong_dish'),
(2, 2, 21, 'breakfast'),
(4, 2, 1, 'strong_dish'),
(5, 2, 5, 'vegan'),
(6, 2, 5, 'strong_dish'),
(7, 2, 4, 'vegan'),
(8, 1, 6, 'desserts'),
(9, 1, 24, 'breakfast'),
(10, 1, 9, 'strong_dish');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `strong_dish`
--

CREATE TABLE `strong_dish` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `energy` varchar(10) NOT NULL,
  `time_make` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `instruction` varchar(1000) NOT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `vegan_ingredient` varchar(50) DEFAULT NULL,
  `protein_ingredient` varchar(50) DEFAULT NULL,
  `garrison_ingredient` varchar(50) DEFAULT NULL,
  `extra_ingredient` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `strong_dish`
--

INSERT INTO `strong_dish` (`id`, `name`, `energy`, `time_make`, `description`, `instruction`, `img_path`, `created_at`, `author`, `vegan_ingredient`, `protein_ingredient`, `garrison_ingredient`, `extra_ingredient`) VALUES
(1, 'Pollo al curry con arroz basmati', '450 cal.', '40 min.', 'Pollo tierno cocido en una rica y cremosa salsa de curry, servido sobre arroz basmati esponjoso.', '1.- En una sartén grande, calienta aceite y sofríe cebolla, ajo y jengibre hasta que estén dorados.\r\n\r\n2.- Añade trozos de pollo y cocina hasta que estén dorados por todos lados.\r\n\r\n3.- Incorpora el curry en polvo, comino y cúrcuma, y mezcla bien.\r\n\r\n4.- Vierte leche de coco y deja cocinar a fuego lento durante 20 minutos hasta que el pollo esté cocido y la salsa espesa.\r\n\r\n5.- Cocina el arroz basmati según las instrucciones del paquete.\r\n\r\n6.- Sirve el pollo al curry sobre el arroz caliente, de', '/uploads/recipes/1722049093012.jpg', '2024-07-27 02:58:13', 'Erasmo Trinidad', 'carrot', 'poultry', 'rice', 'olive_oil'),
(2, 'Lasaña de carne', '600 cal.', '90 min.', 'Clásica lasaña italiana con capas de pasta, carne molida, salsa de tomate y una rica mezcla de quesos.', '1.- Precalienta el horno a 180°C.\r\n\r\n2.- En una sartén grande, cocina la carne molida con cebolla y ajo hasta que esté bien dorada.\r\n\r\n3.- Añade salsa de tomate y condimentos, y cocina a fuego lento durante 15 minutos.\r\n\r\n3.- En un tazón, mezcla ricotta, huevo y espinacas.\r\nEn un molde para lasaña, coloca una capa de pasta, luego una capa de mezcla de ricotta, seguida de una capa de carne.\r\n\r\n4.- Repite hasta llenar el molde y cubre con mozzarella rallada.\r\n\r\n5.- Hornea durante 45 minutos hasta ', '/uploads/recipes/1722049845090.jpg', '2024-07-27 03:10:45', 'Angel Mora', 'corn', 'steak', 'soy', 'olive_oil'),
(3, 'Salmón a la parrilla con espárragos', '400 cal.', '25 min.', 'Salmón jugoso a la parrilla acompañado de espárragos frescos y tiernos, rociados con jugo de limón.', '1.- Precalienta la parrilla a fuego medio-alto.\r\n\r\n2.- Sazona los filetes de salmón con sal, pimienta y jugo de limón.\r\n\r\n3.- Asa el salmón durante 5-7 minutos por lado, hasta que esté bien cocido.\r\n\r\n4.- Mientras tanto, corta los espárragos y rocíalos con aceite de oliva, sal y pimienta.\r\n\r\n5.- Asa los espárragos durante 5 minutos hasta que estén tiernos.\r\n\r\n6.- Sirve el salmón con los espárragos asados y decora con rodajas de limón fresco.', '/uploads/recipes/1722050290983.jpg', '2024-07-27 03:18:10', 'Jesus Hernandez', 'celery', 'fish', 'baguette', 'olive_oil'),
(4, 'Cazuela de carne y papas', '500 cal.', '60 min.', 'Reconfortante cazuela de carne molida, papas y vegetales, cocida al horno con una capa crujiente de queso.', '1.- Precalienta el horno a 190°C.\r\n\r\n2.- En una sartén grande, cocina la carne molida con cebolla y ajo hasta que esté dorada.\r\n\r\n3.- Añade zanahorias y guisantes, y cocina por unos minutos más.\r\n\r\n4.- Mezcla con salsa de tomate y condimentos, y transfiere a una bandeja para hornear.\r\n\r\n5.- Cubre con rodajas de papas y espolvorea queso rallado por encima.\r\n\r\n6.- Hornea durante 45 minutos hasta que las papas estén doradas y el queso burbujeante.\r\n\r\n7.- Deja reposar unos minutos antes de servir.', '/uploads/recipes/1722050575313.jpg', '2024-07-27 03:22:55', 'Agustin Mora', 'onion', 'steak', 'beans', 'olive_oil'),
(5, 'Chuletas de cerdo con salsa de manzana', '450 cal.', '35 min.', 'Jugosas chuletas de cerdo cocidas a la perfección y servidas con una deliciosa salsa de manzana y sidra.', '1.- Sazona las chuletas de cerdo con sal, pimienta y un toque de tomillo.\r\n\r\n2.- En una sartén grande, calienta aceite y dora las chuletas por ambos lados.\r\n\r\n3.- Retira las chuletas de la sartén y reserva.\r\n\r\n4.- En la misma sartén, añade manzanas en rodajas y cocina hasta que estén tiernas.\r\n\r\n5.- Vierte sidra de manzana y deja reducir a fuego medio hasta que espese.\r\n\r\n6.- Regresa las chuletas a la sartén y cocina a fuego lento por 10 minutos.\r\n\r\n7.- Sirve las chuletas con la salsa de manzana', '/uploads/recipes/1722050863309.jpg', '2024-07-27 03:27:43', 'Daniel Cortes', 'onion', 'steak', 'beans', 'olive_oil'),
(6, 'Pollo a la parmesana', '500 cal.', '45 min.', 'Tierno filete de pollo empanizado, cubierto con salsa marinara y queso mozzarella derretido, servido con pasta.', '1.- Precalienta el horno a 200°C.\r\n\r\n2.- Sazona los filetes de pollo con sal y pimienta.\r\n\r\n3.- Pasa los filetes de pollo por harina, luego por huevo batido y finalmente por pan rallado mezclado con queso parmesano.\r\n\r\n4.- En una sartén grande, calienta aceite y dora los filetes de pollo empanizados hasta que estén dorados por ambos lados.\r\n\r\n5.- Transfiere los filetes de pollo a una bandeja para hornear.\r\n\r\n6.- Cubre cada filete con salsa marinara y una capa de queso mozzarella rallado.\r\n\r\n7.- Hornea durante 20 minutos hasta que el pollo esté cocido y el queso derretido y dorado.\r\n\r\n8.- Mientras tanto, cocina la pasta según las instrucciones del paquete.\r\n\r\n9.- Sirve el pollo a la parmesana caliente sobre la pasta cocida y decora con albahaca fresca.', '/uploads/recipes/1723008786301.jpg', '2024-08-07 05:33:06', 'Karen Cruz', 'onion', 'poultry', 'noodles', 'olive_oil'),
(9, 'Risotto de champiñones y espárragos ', '420 cal.', '40 mins.', 'Cremoso risotto de arroz Arborio con champiñones salteados y espárragos tiernos, aromatizado con vino blanco y queso parmesano.', '1.- Calienta el caldo de verduras en una olla y mantenlo caliente a fuego lento.\r\n\r\n2.- En una sartén grande, derrite la mantequilla y sofríe los champiñones y los espárragos cortados hasta que estén tiernos. Retira y reserva.\r\n\r\n3.- En la misma sartén, añade más mantequilla y sofríe la cebolla hasta que esté translúcida.\r\n\r\n4.- Agrega el arroz Arborio y cocina por 2 minutos, removiendo constantemente.\r\n\r\n5.- Vierte el vino blanco y cocina hasta que se evapore, luego añade un cucharón de caldo caliente y remueve hasta que el arroz lo absorba.\r\n\r\n6.- Sigue añadiendo el caldo poco a poco, removiendo continuamente, hasta que el arroz esté cremoso y al dente (unos 18-20 minutos).\r\n\r\n7.- Incorpora los champiñones y espárragos reservados al risotto.\r\n\r\n8.- Retira del fuego y mezcla el queso parmesano rallado.\r\n\r\n9.- Sirve caliente, decorado con perejil fresco y un toque de pimienta negra.', '/uploads/recipes/1723417638844.jpeg', '2024-08-11 23:07:18', 'Agustin Mora', 'celery', 'fish', 'rice', 'pumpkin');

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
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `created_at`, `img_profile_path`, `reset_code`, `reset_expires_at`, `verified`, `verification_token`, `expires_at`) VALUES
(1, 'agusm1253@gmail.com', 'Agustin_Mora', '$2b$10$tX8udP2MjrXC3.oGJYtLnekM7uzmkwKd7O2WWzu7ZiOBgstzvjI2G', '2025-07-07 18:40:09', NULL, NULL, NULL, 1, NULL, '2025-07-07 12:50:09'),
(2, '202172009@uich.edu.mx', 'AgusXD', '$2b$10$pU0pDTXqrD6LlmRjF2L43OBIuP/Ecrz1OtuBHC6zDua420fr9G5JO', '2025-07-08 22:36:04', NULL, NULL, NULL, 1, NULL, '2025-07-08 16:46:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vegan`
--

CREATE TABLE `vegan` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `energy` varchar(10) NOT NULL,
  `time_make` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `instruction` varchar(1000) NOT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` varchar(80) NOT NULL,
  `vegan_ingredient` varchar(50) DEFAULT NULL,
  `protein_ingredient` varchar(50) DEFAULT NULL,
  `garrison_ingredient` varchar(50) DEFAULT NULL,
  `extra_ingredient` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vegan`
--

INSERT INTO `vegan` (`id`, `name`, `energy`, `time_make`, `description`, `instruction`, `img_path`, `created_at`, `author`, `vegan_ingredient`, `protein_ingredient`, `garrison_ingredient`, `extra_ingredient`) VALUES
(1, 'Enchiladas de frijoles y calabacitas', '350 cal.', '40 min.', 'Deliciosas enchiladas rellenas de frijoles negros y calabacitas, cubiertas con salsa de tomate y horneadas a la perfección.', '1.- Precalienta el horno a 180°C.\r\n\r\n2.- En una sartén grande, saltea las calabacitas picadas hasta que estén tiernas. Agrega los frijoles negros y mezcla bien.\r\n\r\n3.- Rellena las tortillas con la mezcla de frijoles y calabacitas y colócalas en una bandeja para hornear.\r\n\r\n4.-Vierte la salsa de tomate sobre las enchiladas y espolvorea con queso vegano rallado.\r\n\r\n5.- Hornea durante 20 minutos hasta que estén bien calientes y el queso se haya derretido.\r\n\r\n6.- Sirve con aguacate en rodajas y cila', '/uploads/recipes/1722047432150.jpg', '2024-07-27 02:30:32', 'Karen Cruz', 'corn', 'fish', 'beans', 'olive_oil'),
(2, 'Curry de garbanzos y espinacas', '400 cal.', '30 min.', 'Curry cremoso y picante de garbanzos y espinacas, cocinado en leche de coco con especias aromáticas.', '1.- En una olla grande, calienta el aceite y sofríe la cebolla, el ajo y el jengibre hasta que estén dorados.\r\n\r\n2.- Añade las especias (curry en polvo, comino y cúrcuma) y cocina por un minuto más.\r\n\r\n3.- Agrega los garbanzos cocidos y la leche de coco, y lleva a ebullición.\r\n\r\n4.- Reduce el fuego y añade las espinacas. Cocina a fuego lento hasta que las espinacas se marchiten.\r\n\r\n5.- Sazona con sal y pimienta al gusto.\r\n\r\n6.- Sirve caliente con arroz basmati o pan naan.', '/uploads/recipes/1722047713711.jpg', '2024-07-27 02:35:13', 'Agustin Mora', 'celery', 'fish', 'soy', 'pumpkin'),
(3, 'Lasaña de berenjenas y lentejas', '450 cal.', '60 min.', 'Lasaña deliciosa y saludable hecha con capas de berenjenas asadas, lentejas guisadas y salsa de tomate casera.', '1.- Precalienta el horno a 190°C.\n\n2.- Corta las berenjenas en rodajas finas y ásalas en el horno hasta que estén doradas.\n\n3.- En una olla, cocina las lentejas con ajo, cebolla y zanahoria hasta que estén tiernas.\n\n4.- En un molde para lasaña, alterna capas de berenjenas asadas, lentejas guisadas y salsa de tomate.\n\n5.- Repite hasta llenar el molde y termina con una capa de salsa de tomate.\n\n6.- Hornea durante 30 minutos hasta que la lasaña esté burbujeante y dorada por encima.', '/uploads/recipes/1722047973467.jpg', '2024-07-27 02:39:33', 'Agustin Mora', 'corn', 'fish', 'rice', 'pumpkin'),
(4, 'Paella vegana de vegetales', '380 cal.', '45 min.', 'Paella colorida y sabrosa con una variedad de vegetales frescos, arroz y azafrán, perfecta para una comida completa.', '1.- En una sartén grande, calienta el aceite y sofríe la cebolla y el ajo hasta que estén tiernos.\n\n2.- Agrega los pimientos, los guisantes y las judías verdes, y cocina por unos minutos.\n\n3.- Añade el arroz y el caldo de verduras junto con el azafrán. Lleva a ebullición.\n\n4.- Reduce el fuego y cocina a fuego lento, sin remover, hasta que el arroz absorba el líquido y esté cocido.\n\n5.- Añade los tomates cherry cortados por la mitad y cocina por unos minutos más.\n\n6.- Decora con limón e', '/uploads/recipes/1722048344163.jpg', '2024-07-27 02:45:44', 'Jorge Mora', 'beef', 'fish', 'soy', 'ketchup'),
(5, 'Tacos de coliflor y aguacate', '300 cal.', '25 min.', 'Tacos ligeros y crujientes con coliflor especiada y aguacate cremoso, acompañados de salsa de cilantro y limón.', '1.- Precalentar el horno a 200°C.\n\n2.- Corta la coliflor en floretes pequeños y mezcla con aceite, comino, pimentón y sal.\n\n3.- Hornea la coliflor en una bandeja durante 20 minutos hasta que esté dorada y crujiente.\n\n4.- Mientras tanto, corta el aguacate en rodajas y prepara la salsa de cilantro mezclando cilantro picado, jugo de limón, ajo y un poco de agua.\n\n5.- Calienta las tortillas en una sartén o directamente en la llama de la estufa.\n\n6.- Rellena las tortillas con la coliflor as', '/uploads/recipes/1722048645426.jpg', '2024-07-27 02:50:45', 'Agustin Mora', 'avocado', 'fish', 'beans', 'olive_oil');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `breakfast`
--
ALTER TABLE `breakfast`
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
-- AUTO_INCREMENT de la tabla `breakfast`
--
ALTER TABLE `breakfast`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `desserts`
--
ALTER TABLE `desserts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ingredients_list`
--
ALTER TABLE `ingredients_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `saved_recipes`
--
ALTER TABLE `saved_recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `strong_dish`
--
ALTER TABLE `strong_dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `vegan`
--
ALTER TABLE `vegan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
