# Configuration du CI/CD

Le workflow [`release.yml`](./release.yml) compile puis déploie l'application
lorsqu'une release GitHub est publiée. Avant de l'utiliser, les éléments
suivants doivent être configurés.

## 1. Configurer les secrets GitHub

Dans **Settings > Secrets and variables > Actions**, ajouter les secrets
suivants. Ils peuvent être définis au niveau du dépôt ou de l'environnement
`production` :

| Secret | Valeur |
| --- | --- |
| `SERVER_HOST` | Nom DNS ou adresse IP du serveur |
| `SERVER_USER` | Utilisateur SSH utilisé pour le déploiement |
| `SERVER_SSH_KEY` | Clé privée SSH dédiée à GitHub Actions |
| `SERVER_KNOWN_HOSTS` | Clé d'hôte obtenue avec `ssh-keyscan` |
| `SERVER_PATH` | Chemin absolu du dossier publié sur le serveur |
| `SERVER_PORT` | Port SSH ; facultatif, `22` par défaut |

Pour générer la valeur de `SERVER_KNOWN_HOSTS`, depuis une machine de confiance,
exécuter :

```sh
ssh-keyscan -p <port> <hôte>
```

Vérifier l'empreinte retournée avant de l'enregistrer dans GitHub. Ne pas
désactiver la vérification des clés d'hôte et ne pas utiliser une clé privée
personnelle.

## 2. Préparer le serveur

Le serveur doit :

- accepter les connexions SSH de l'utilisateur `SERVER_USER` ;
- autoriser cet utilisateur à écrire dans `SERVER_PATH` ;
- disposer de `rsync` ;
- avoir le dossier `SERVER_PATH` créé à l'avance ;
- exposer le port indiqué par `SERVER_PORT`.

La clé publique correspondant à `SERVER_SSH_KEY` doit être ajoutée au fichier
`~/.ssh/authorized_keys` de `SERVER_USER`.

Exemple de vérification depuis une machine locale. Cette version indique
précisément quelle vérification échoue :

```sh
ssh -i <clé-privée> -p <port> <utilisateur>@<hôte> \
  'if ! command -v rsync >/dev/null 2>&1; then
     echo "Erreur : rsync n'est pas installé ou n'est pas disponible dans le PATH." >&2
     exit 1
   elif ! test -d <chemin-de-publication>; then
     echo "Erreur : le dossier de publication n'existe pas." >&2
     exit 1
   elif ! test -w <chemin-de-publication>; then
     echo "Erreur : l'utilisateur SSH n'a pas les droits d'écriture sur le dossier de publication." >&2
     exit 1
   else
     echo "Vérification réussie : rsync et le dossier de publication sont correctement configurés."
   fi'
```

## 3. Configurer l'environnement GitHub

Créer l'environnement **`production`** dans **Settings > Environments**. Il est
possible d'y ajouter une approbation obligatoire et des règles de protection
avant l'exécution du job `deploy`.

## 4. Publier une release

Le workflow ne se lance pas sur un simple push. Créer une release GitHub basée
sur un tag de version au format `X.Y.Z`, avec un préfixe `v` facultatif :

- `1.0.0`
- `v1.0.0`

Le tag est utilisé comme version de l'application. Le workflow compile ensuite
`dist/`, déploie son contenu avec `rsync` et ajoute une archive versionnée aux
fichiers de la release.

## 5. Vérifier le premier déploiement

Après la publication d'une release :

1. consulter l'exécution du workflow dans l'onglet **Actions** ;
2. vérifier que les jobs `build` et `deploy` réussissent ;
3. vérifier que l'archive `portfolio-dist-<version>.tar.gz` apparaît dans la
   release ;
4. ouvrir le site depuis le serveur et confirmer que les fichiers ont été
   déployés dans `SERVER_PATH`.
