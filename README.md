# 🌌 Space Odyssey  
### Rapport de Finalisation du Projet Interactif  
**Projet Front-End Complet – AstroTech Studio**

---

## 🎯 Résumé Exécutif
Ce document atteste de la finalisation du projet **Space Odyssey**, qui a évolué de sa phase d'intégration statique (**HTML/CSS**) vers une **plateforme web entièrement dynamique et persistante (JavaScript)**.  
L'objectif était de créer une **expérience utilisateur (UX) fluide**, en gérant la **manipulation du DOM**, le **stockage local (localStorage)**, et l'implémentation complète des **opérations CRUD**.

---

## 🛠️ Achèvements Techniques Clés (Phase JS)

### 1. 📂 Gestion des Données (CRUD)
- **Affichage Dynamique (Read)** : Les missions sont chargées de manière asynchrone (via `fetch`) et rendues dans une grille modulaire (`renderProjects()`).
- **Ajout / Modification (Create / Update)** : Implémentation d'un modal unique pour l’ajout et l’édition des missions. La logique utilise un champ caché pour distinguer les opérations d’Update des opérations de Create.
- **Suppression (Delete)** : Fonctionnalité de suppression avec confirmation utilisateur et mise à jour immédiate du DOM.
- **Persistance** : Utilisation de `localStorage` pour sauvegarder l’état des missions favorites et assurer la rétention des données entre les sessions.

### 2. 🔍 Recherche et Filtrage
- **Filtres Combinés** : Implémentation de la fonction `applyFiltersAndSearch()`, permettant de filtrer la liste des missions simultanément par **Agence**, **Année**, et **mot-clé** (nom / objectif).
- **Affichage des Favoris** : Le système de navigation (sidebar) permet de basculer instantanément entre la liste complète et les missions favorites enregistrées.

### 3. 👤 Validation du Contact (Régularisation des Inputs)
- **Validation Réactive** : Mise en place d'une chaîne de validation vérifiant la conformité de chaque champ (**Nom**, **Email**, **Téléphone**) en temps réel (`input event`) pour un feedback utilisateur immédiat.
- **Règles Regex** : Utilisation d'expressions régulières pour valider le format des données (ex. structure d’email, format téléphonique international, caractères alphabétiques).
- **Champs Obligatoires / Radio** : Vérification complète des champs requis et validation de la sélection unique pour les boutons radio.

---

## 🪐 Structure du Site

| Page | Objectif Principal |
|------|---------------------|
| **Accueil (Home)** | Porte d'entrée et aperçu de l'exploration spatiale. |
| **À propos** | Présentation de l'équipe AstroTech Studio et de la mission éducative. |
| **Planètes** | Catalogue structuré des planètes et données clés (Grille / Cartes). |
| **Missions Spatiales** | Zone interactive CRUD (Affichage dynamique, Favoris, Ajout / Édition). |
| **Contact** | Formulaire de contact avec validation client-side intégrale. |

---

## 💻 Technologies Clés
- **HTML5**
- **CSS3 (Flexbox / Grid Layout)**
- **JavaScript (ES6+)**
- **Fetch API / Promises (Gestion Asynchrone des données)**
- **localStorage (Persistance des données)**
- **Git & GitHub Pages (Déploiement)**

---

## 💡 Auteur du Projet Interactif
👨‍💻 **Zakarya Hari**  
📧 [zakariahari42@gmail.com](mailto:zakariahari42@gmail.com)  
🌐 **GitHub Pages** – [Lien du projet](#) _(https://zakaryahari.github.io/Space-Odyssey-Interactive/)_
