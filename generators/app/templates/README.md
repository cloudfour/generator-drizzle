[Autoprefixer]: https://github.com/postcss/autoprefixer
[Babel]: https://babeljs.io
[Browsersync]: http://www.browsersync.io
[Gulp]: https://github.com/gulpjs/gulp
[Handlebars]: http://handlebarsjs.com
[netlify]: http://www.netlify.com
[Node.js]: http://nodejs.org
[npm]: http://npmjs.com
[webpack]: https://webpack.github.io
[YAML front matter]: http://assemble.io/docs/YAML-front-matter.html
[handlebars-layouts]: https://github.com/shannonmoeller/handlebars-layouts

# <%= title %>

> <%= description %>

## Getting started

### Download and install [Node.js]:

This project requires [Node.js] `<%= nodeVersion %>` or later. If you already have Node.js installed, you can verify the versions by running:

```sh
node -v
```

### Clone the project:

```sh
git clone <%= repository %>
```

### Run the project locally:

```sh
cd path/to/your/clone
npm start
```

**Note:** This will take a few minutes to complete when run for the first time. This is due to packages being downloaded.

### View the project locally:

When the development server is started, the pattern library will be served at <http://localhost:3000>.

## Contributing

### Create a new branch

Follow a naming convention of `prefix-short_description`, using `prefix` to categorize the change you're making as a new feature, bug fix, or minor maintenance. Common prefixes include `feature`, `fix`, `chore`, etc.

```sh
git checkout dev
git checkout -b feature-new_button_variation
```

### Make changes and commit them

Repeat this process for each distinct change you make.

```sh
git commit -am "Add new button variation class"
```

### Push your new branch

```sh
git push origin feature-new_button_variation
```

### Submit a Pull Request

0. Go [here](./pulls) and choose "New pull request".
0. Assign somebody to own the review process, and `@`-mention anyone else who can help out.
0. Once the pull request is approved (:+1:), merge it by clicking the green button.
