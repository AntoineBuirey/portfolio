---

title: "GamuLogger"
shortDescription: "Une bibliothèque Python pour la journalisation des événements."
description: "GamuLogger est une bibliothèque Python que j'ai développée pour faciliter la journalisation des événements dans les applications Python. Elle offre une interface simple et flexible pour enregistrer des messages de journalisation à différents niveaux (info, avertissement, erreur, etc.) et peut être facilement intégrée dans n'importe quel projet Python. Elle permet de configurer plusieurs destination, dont la console, avec un affichage coloré, et des fichiers de log."
date: "2024-11"
origin: "personal"
technologies: ["Python"]
tags: ["logging", "utility", "python"]
repository: "https://github.com/AntoineBuirey/gamuLogger"
relatedLinks: [
    {
        name: "GamuLogger sur PyPI",
        url: "https://pypi.org/project/gamuLogger/"
    }
]

---


## 🔨 Installation

Le paquet est disponible dans les éléments de la dernière version sur [pypi](https://www.google.com/search?q=https%3A%2F%2Fpypi.org%2Fproject%2FgamuLogger).

Vous pouvez l'installer avec pip :

```bash
pip install gamuLogger
```

## 💡 Utilisation

Tout d'abord, vous devez importer le paquet :

```python
from gamuLogger import trace, debug, info, warning, error, fatal, Logger, Levels

```



> Remarque : vous pouvez également importer uniquement les éléments dont vous avez besoin au lieu de tous les importer.

Ensuite, vous pouvez utiliser les fonctions comme ceci :

```python
info('Ceci est un message d\'information')
warning('Ceci est un message d\'avertissement')
error('Ceci est un message d\'erreur')

```



Les fonctions de journalisation sont également disponibles sous forme de méthodes statiques dans la classe `Logger`. Cela vous permet de les encapsuler dans une classe et de les utiliser de manière plus orientée objet :

```python
from gamuLogger import Logger

Logger.info('Ceci est un message d\'information')
Logger.warning('Ceci est un message d\'avertissement')
Logger.error('Ceci est un message d\'erreur')
```


## ⚙️ Configuration

### 1. Configuration de base

Vous pouvez configurer le logger (logger) en utilisant les méthodes de la classe `Logger`. Voici un exemple de la façon de procéder :

```python
from gamuLogger import Logger, Levels

# La cible par défaut est la sortie standard, le nom est 'stdout'

Logger.set_level("stdout", Levels.INFO); # Cela signifie que tous les logs avec un niveau supérieur à INFO seront ignorés


Logger.set_module('my-module'); # Définit le nom du module pour ce fichier à 'my-module' (il sera affiché dans le message de log). Par défaut, aucun nom de module n'est défini.

Logger.add_target("data.log", Levels.DEBUG) # Ajoute une nouvelle cible au logger (cela enregistrera tous les messages avec un niveau supérieur à DEBUG dans le fichier 'data.log')
```

> Veuillez noter que le logger peut être utilisé sans aucune configuration manuelle. La configuration par défaut est la suivante :
> - target : terminal
>   - level : `INFO`
> - module name : `None`

> Notez que le nom du module est défini uniquement pour le fichier en cours. Si vous souhaitez définir le nom du module pour tous les fichiers, vous devez le faire dans chaque fichier.
