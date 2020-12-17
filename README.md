Snap Trade
============
Nodejs/Typescript risk management and trade analysis platform

### Features

#### Authentication: Should user login with email and password
#### Functional
- [ ] User should be able to provide email and password and receive a valid JWT. -> POST /user
#### Non-Functional
- [ ] User should provide a valid email address (REGEX)
- [ ] Email field should have at less 5 characters
- [ ] Email field should have not more than 150 characters
- [ ] Password field should have at less 3 characters
- [ ] Password field should no more than 150 characters
- [ ] When user provide a invalid (not registered) email address an "User not found" error with "code: 404" must be returned
- [ ] When user provide a valid email and invalid password an "User and password nor match" error with "code: 403" must be returned

### Commit lint Types
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests