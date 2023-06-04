<?php
include_once "connexion.php";

// Récupérer les données du formulaire
$nom = $_POST["nom"];
$prenom = $_POST["prenom"];
$telephone = $_POST["telephone"];
$email = $_POST["email"];

try {
    // Préparer la requête d'insertion des données
    $query = "INSERT INTO participant (nom, prenom, telephone, email) VALUES (:nom, :prenom, :telephone, :email)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":nom", $nom);
    $stmt->bindParam(":prenom", $prenom);
    $stmt->bindParam(":telephone", $telephone);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    // Envoyer une réponse JSON indiquant le succès de l'enregistrement
    $response = ["success" => true];
    echo json_encode($response);
} catch (PDOException $e) {
    // En cas d'erreur lors de l'enregistrement, envoyer une réponse JSON avec le message d'erreur
    $response = ["success" => false, "message" => "Une erreur s'est produite lors de l'enregistrement : " . $e->getMessage()];
    echo json_encode($response);
}
?>
