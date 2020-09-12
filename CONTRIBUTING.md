# Project Structure
| File/Dir    | Description         |
|-------------|---------------------|
| commands/   | Command logic       |
| events/     | Event logic         |
| inhibitors/ | Inhibitor logic     |
| bot.js      | Bot entry point     |

# GitFlow
This repository (is trying to) use GitFlow.

| Branch Type | Who          | Description                                               |
|-------------|--------------|-----------------------------------------------------------|
| feature/    | Community    | Branch for a new feature                                  |
| release/    | Collaborator | Branch for releasing a new version from develop to master |
| hotfix/     | Community    | Branch for major bug fixes after a release                |

All PRs must go into the develop branch.
You may also use edit/ instead of feature/ if the feature only involves editing bot documentation or documents in docs/ directory that are read for the docs command. While this isn't part of GitFlow, we've decided to trying to stick to this form.

# Contributing

### Requisites
- Git should be installed
- GitFlow can make your life easier but does not need to be installed

### Process
1. Fork the official project
2. Create a GitFlow branch in forked repo (e.g. feature/better-help-command)
3. Make your changes
4. Prepare your code
  1. Lint your code using `standard` (We're using standard. Deal with it. You'll make it through. We promise.)
  2. ~~Run unit tests~~ Coming soon possibly maybe!
5. Commit & Push your code
6. Open a Pull Request to the official repository
7. Wait for contributors to merge it or review it and provide feedback on neccesary changes before merging
8. Feel happy you contributed something! :)

* Contributors can skip forking, provided that a new branch is made, whose naming convention follows GitFlow.

### Implementation
> After important changes or bug fixes have been released and merged into the master branch, a release will be created with a new version number. Once release has been created and new version is ready for deployment to the server, we will trigger a heroku redeployment to initiate the latest version of the master branch.

*Thanks for showing interest in committing to our project! :)*
