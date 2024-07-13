<?php

$username = "root";
$password = "";
$host = 'localhost';
$dbname = 'todo_app';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
$dsnWithoutDb = 'mysql:host=' . $host . ';charset=utf8mb4';

try {
    // Connect to MySQL server without a database
    $dbh = new PDO($dsnWithoutDb, $username, $password, $options);

    // Check if database exists, if not create it
    $dbh->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // Update DSN to connect to the specified database
    $dsnWithDb = 'mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8mb4';

    // Reconnect to the new database
    $dbh = new PDO($dsnWithDb, $username, $password, $options);

    // Ensure the connection is UTF-8 encoded
    $dbh->exec("SET NAMES 'utf8mb4'");
    $dbh->exec("SET CHARACTER SET utf8mb4");

    // Create users table if it does not exist
    $createTableUsers = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

    // Create tasks table if it does not exist
    $createTableTasks = "CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        text VARCHAR(255) NOT NULL,
        description TEXT,
        done BOOLEAN DEFAULT FALSE,
        creation_date DATETIME NOT NULL,
        completion_date DATETIME DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

    $dbh->exec($createTableUsers);
    $dbh->exec($createTableTasks);

    echo "Database and tables created successfully.";

} catch (PDOException $e) {
    echo "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>
