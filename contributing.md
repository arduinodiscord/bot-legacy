# Project Structure
| File/Dir  | Module Alias | Description         |
|-----------|--------------|---------------------|
| .         | @root/       | Root directory      |
| commands/ | @command/    | Command logic       |
| config/   | @conf/       | Configuration files |
| events/   | @event/      | Event logic         |
| model/    | @model/      | N/A                 |
| main.js   | N/A          | Bot entry point     |

# GitFlow
This repository uses GitFlow.

| Branch Type | Who          | Description                                               |
|-------------|--------------|-----------------------------------------------------------|
| feature/    | Community    | Branch for a new feature                                  |
| release/    | Collaborator | Branch for releasing a new version from develop to master |
| hotfix/     | Community    | Branch for major bug fixes after a release                |

- All PRs must go into the develop branch

# Contributing

### Requisites
- Git should be installed
- GitFlow should be installed
- Yarn should be installed

### Process
1. Fork the official project
2. Create a GitFlow branch in forked repo (e.g. feature/better-help-command)
3. Make your changes
4. Prepare your code
  1. Lint your code using `yarn lint` (We're using standard. Deal with it.)
  2. ~~Run unit tests~~ Coming soon!
5. Commit & Push your code
6. Open a Pull Request to the official repository
