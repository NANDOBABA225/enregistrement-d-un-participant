<?php
include_once "connexion.php";

try {
    // Récupérer tous les participants depuis la base de données
    $query = "SELECT * FROM participant";
    $stmt = $db->query($query);
    $participants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Envoyer une réponse JSON avec les participants
    $response = ["success" => true, "participants" => $participants];
    echo json_encode($response);
} catch (PDOException $e) {
    // En cas d'erreur lors de la récupération des participants, envoyer une réponse JSON avec le message d'erreur
    $response = ["success" => false, "message" => "Une erreur s'est produite lors de la récupération des participants : " . $e->getMessage()];
    echo json_encode($response);
}
?>
