<?php
include 'db.php';

$action = $_POST['action'];
$user_id = $_POST['user_id'];

if ($action == 'fetch') {
    $sql = "SELECT * FROM tasks WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tasks);
} elseif ($action == 'add') {
    $text = $_POST['text'];
    $description = $_POST['description'];
    $creation_date = date('Y-m-d H:i:s');
    $sql = "INSERT INTO tasks (user_id, text, description, creation_date) VALUES (:user_id, :text, :description, :creation_date)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':text', $text);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':creation_date', $creation_date);
    try {
        $stmt->execute();
        echo json_encode(["success" => true, "task_id" => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} elseif ($action == 'update') {
    $task_id = $_POST['task_id'];
    $done = $_POST['done'];
    $completion_date = $done ? date('Y-m-d H:i:s') : null;
    $sql = "UPDATE tasks SET done = :done, completion_date = :completion_date WHERE id = :task_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':done', $done, PDO::PARAM_BOOL);
    $stmt->bindParam(':completion_date', $completion_date);
    $stmt->bindParam(':task_id', $task_id);
    try {
        $stmt->execute();
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} elseif ($action == 'delete') {
    $task_id = $_POST['task_id'];
    $sql = "DELETE FROM tasks WHERE id = :task_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':task_id', $task_id);
    try {
        $stmt->execute();
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>
