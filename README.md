# Monorepo for iGloo

There is a `core` package that is imported by both the `backend` and the `frontend`. The `core` package is linked to the apps using yarn workspaces.

To install dependencies and link them use

```
yarn install
```

Then build the core package locally using

```
yarn build
```

You then need to run the DB using

```
yarn up
```

And prepare the DB scheme using

```
yarn migrate
```

Then you can run the frontend and the backend with

```
yarn start
```
