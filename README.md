# generator-drizzle

> Yeoman generator for Drizzle-based projects

## Running locally

First `clone` the repository. The `--recursive` flag is needed to include the [Drizzle](https://github.com/cloudfour/drizzle) submodule.

```
git clone --recursive  git@github.com:cloudfour/generator-drizzle.git
```

Then `link` the generator.

```
cd generator-drizzle
npm link
```

Then run the generator.

```
cd path/to/a/new/project
yo drizzle --help
```

## Testing

```
npm test
```
