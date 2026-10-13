---

title: "Builder"
shortDescription: "Outil de construction et d'empaquetage de projets logiciels. Il fonctionne sur un principe similaire à make mais avec une approche plus moderne et flexible."
description: "Builder est un outil de construction et d'empaquetage de projets logiciels. Il fonctionne sur un principe similaire à make mais avec une approche plus moderne et flexible. Il vous permet de définir votre processus de construction de manière simple et intuitive, en utilisant des fichiers de configuration YAML."
date: "2026-01"
origin: "personal"
technologies: ["Python", "YAML"]
tags: ["build", "packaging", "automation"]
repository: "https://github.com/AntoineBuirey/builder"
# relatedLinks: [
#     {
#         name: "RCON - Minecraft Wiki",
#         url: "https://fr.minecraft.wiki/w/RCON"
#     }
# ]

---

J'ai créé **Builder** pour simplifier le processus de construction et d'empaquetage de projets logiciels. Inspiré par des outils comme `make`, il permet de faire simplement certains processus de construction, en gérant des règles de dépendances particulières, comme avoir plusieurs fichiers produits depuis un seul fichier source.

Exemple d'utilisation :

```yaml
imports:
  - path: pyproject.toml
    as: project

vars:
  package_name: $(echo ${project.name} | tr '-' '_')
  version: ${project.version}


files-groups:
  source-files:
    - ${PROJECT_DIR}/src/**/*.py
    - ${PROJECT_DIR}/pyproject.toml


rules:
  build:
    tags:
      - build
    required-files: source-files
    expected-files:
      - ${package_name}-${version}.tar.gz
      - ${package_name}-${version}-py3-none-any.whl
    commands:
      - cp -r ${PROJECT_DIR}/src build
      - ${common.create_metadata} build -v ${version} -p ${PROJECT_DIR}/pyproject.toml
      - MSM_VERSION=${version} ${PYTHON} -m build --wheel --sdist --outdir dist ${PROJECT_DIR}
      - +ALWAYS rm -rf build
```

