// Fonction pour envoyer les données du formulaire au serveur
function enregistrerParticipant(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var telephone = document.getElementById("telephone").value;
    var email = document.getElementById("email").value;

    // Créer un objet FormData avec les données du formulaire
    var formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("telephone", telephone);
    formData.append("email", email);

    // Envoyer les données au serveur en utilisant fetch
    fetch("enregistrer.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Participant enregistré avec succès !");
            document.getElementById("enregistrementForm").reset();
        } else {
            alert("Une erreur s'est produite lors de l'enregistrement du participant.");
        }
    })
    .catch(error => {
        console.log(error);
        alert("Une erreur s'est produite lors de l'envoi des données au serveur.");
    });
}

// Fonction pour récupérer les participants depuis le serveur
function recupererParticipants() {
    fetch("recuperer.php")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var participants = data.participants;
            var tableBody = document.getElementById("participantsTable");

            // Vider le contenu de la table
            tableBody.innerHTML = "";

            // Ajouter les participants à la table
            participants.forEach(participant => {
                var row = tableBody.insertRow();
                row.insertCell().textContent = participant.nom;
                row.insertCell().textContent = participant.prenom;
                row.insertCell().textContent = participant.telephone;
                row.insertCell().textContent = participant.email;
            });
        } else {
            alert("Une erreur s'est produite lors de la récupération des participants.");
        }
    })
    .catch(error => {
        console.log(error);
        alert("Une erreur s'est produite lors de la communication avec le serveur.");
    });
}

// Écouter l'événement de soumission du formulaire
document.getElementById("enregistrementForm").addEventListener("submit", enregistrerParticipant);

// Charger les participants au chargement de la page
window.addEventListener("load", recupererParticipants);
