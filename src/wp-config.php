<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'db_venturedayminsk');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '[M[an>=e(Hj^Y|*im0kS~h =.>tJT#Q*P-,_f ~8<=F;p-14;2a4c>33jghTm``R');
define('SECURE_AUTH_KEY',  'l2U_:+q@~}v:lW9JpJ:LmtVk/IEhpj]51sS@B:gqizbE2d }@8T1WM$nr`|0gP!D');
define('LOGGED_IN_KEY',    '.a))@V$~N[+f%9k&ZM9l49hPtb0qxp1Z8a=H{aHp$de~c1y$-GX<4kkG}*t%CVq=');
define('NONCE_KEY',        ':OV >H~Is?=NW%h@x*Y/mTsy,Mv^ks)<Om6HV%XRK+?G~ms}p@&OM+=HWR}!b3* ');
define('AUTH_SALT',        ' Wv7Xa9C5<2vkO6x3! ]a(6;.bb0]khW_;JE )Ta(?/bPG3;eN`*CHGzD/U@Z!Op');
define('SECURE_AUTH_SALT', 'O:,X{O[s9iZ*1hnJFsl|Is.N:L3::O{m#`fu`i(5ej#b&7H+wXpSM!l_PpqToUy%');
define('LOGGED_IN_SALT',   'BvUp$9(Tkh=^r}dTyN]up$%A$IP`m`gQ1Xf1{@klR=opwm{/XtSrdcCbP^=?H=o#');
define('NONCE_SALT',       '0]R1T1q2/j#nm.v1LVH-6Dg5Nv]rXA$}(bT^0<=6gu!($4*{J!tjgztTAe}X>q!g');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
