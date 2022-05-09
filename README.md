## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run watch` | Build project and open web server running project, watching for changes |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run watch`.

After starting the development server with `npm run watch`, you can edit any files in the `src` folder
and Rollup will automatically recompile and reload your server (available at `http://localhost:10001`
by default).

## Configuring Rollup

* Edit the file `rollup.config.dev.js` to edit the development build.
* Edit the file `rollup.config.dist.js` to edit the distribution build.

## Pokemon assets

Pokemon assets and information come from the follow repositories:
- https://github.com/HybridShivam/Pokemon
  - our "thumbnails" directory is the "thumbnails-compressed" directory of the above repo
- https://github.com/fanzeyi/pokemon.json
  - We use many of the json files from this repository

All Pokemon-related content is copyrighted by the Pokémon Company and its affiliates
