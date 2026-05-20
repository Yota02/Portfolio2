# Project Admin Tool

Ce mini-programme permet de gérer la liste des projets pour votre portfolio de manière autonome.

## Installation

```bash
cd admin-tool
npm install
```

## Lancement

```bash
npm start
```

Ensuite, ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Fonctionnalités

- **Ajouter un projet** : Remplissez le formulaire, sélectionnez les technologies et cliquez sur "Ajouter".
- **Gérer les technologies** : Ajoutez de nouvelles technologies qui apparaîtront dans la liste de sélection.
- **Export JSON** : En bas de la page, vous trouverez le JSON généré que vous pouvez copier-coller dans votre fichier `src/data/projects.ts`.

## Structure

- `server.js` : Backend Express simple utilisant des fichiers JSON pour le stockage.
- `public/index.html` : Interface frontend utilisant Vue 3 et Tailwind CSS.
- `data/` : Contient les fichiers `projects.json` et `techs.json`.
