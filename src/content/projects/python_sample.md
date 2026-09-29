---

title: "Collection de petits modules Python"
shortDescription: "Une collection de cinq petits modules Python que j'ai créés et qui peuvent être utiles pour différents projets."
description: "Cette collection de cinq petits modules Python que j'ai créés peut être utile pour différents projets. Chaque module est conçu pour accomplir une tâche spécifique et peut être utilisé indépendamment ou combiné avec d'autres modules selon les besoins du projet."
date: "2025-04"
origin: "personal"
technologies: ["Python"]
tags: ["utility", "modules", "python"]
repository: "https://github.com/AntoineBuirey/python-sample"
relatedProjects: [
    "gamulogger"
]
relatedLinks: [
    {
        name: "SemVer - Semantic Versioning",
        url: "https://semver.org/lang/fr/"
    }
]

---

# config.py

Ce module fournit une classe pour lire et écrire des fichiers de configuration au format JSON ou TOML. Il prend également en charge la configuration en mémoire (sans persistance sur le disque). La classe supporte les dictionnaires et listes imbriqués, ainsi que les clés combinées (par exemple, `a.b.c`). De plus, elle permet de référencer d'autres clés dans le fichier de configuration.

```python
a = "hello"
b = "${a} world"
```

Si [gamulogger](gamulogger) est installé, il est possible d'utiliser la configuration pour configurer le logger.

# cache.py

Ce module contient un décorateur pour mettre en cache le résultat d'une fonction. Il utilise un dictionnaire pour stocker le résultat et une liste pour stocker les clés. Il prend également en charge le temps d'expiration du cache.

```python
from cache import Cache
from datetime import timedelta

@Cache(expire_in=timedelta(seconds=10))
def my_function(a, b):
    return a + b
```

# version.py

Ce module contient une classe pour gérer les versions. Elle est conforme à SemVer et prend en charge la comparaison entre les versions.

```python
from version import Version
v1 = Version(1,0,0)
v2 = Version(1,0,1)
print(v1 < v2) # True
```

Elle prend en charge l'incrémentation et la décrémentation de la version, ainsi que la conversion en chaîne de caractères.

```python
v1.major_increment() # 2.0.0
v1.patch_increment() # 2.0.1
v1.minor_increment() # 2.1.0 (reset patch to 0)
v1.major_decrement() # 1.0.0 (reset minor and patch to 0)
```

Elle permet également de convertir en chaîne de caractères et d'analyser à partir d'une chaîne de caractères.

```python
v1 = Version.from_string("1.0.0")
print(str(v1)) # 1.0.0
```

On peut également gérer les pré-versions et les métadonnées de construction.

```python
v1 = Version(1,0,0,"alpha", "build.1")
print(str(v1)) # 1.0.0-alpha+build.1
```

# http_code.py

Il s'agit d'une énumération contenant les codes d'état HTTP les plus courants.

```python
from http_code import HttpCode

print(HttpCode.OK) # 200
```

# colors.py

Contient une classe pour gérer les couleurs, permettant la conversion entre différents formats de couleurs (RGB, RGBA, HEX), et des opérations comme la conversion en niveaux de gris, en noir et blanc, et l'obtention de la couleur opposée.