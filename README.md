# mongoDB-workshop

First, install the Devbox tool:

```sh
curl -fsSL https://get.jetpack.io/devbox | bash
```

Then, clone this repository and `cd` into it:

```sh
git clone <page URL>
cd mongoDB-workshop
```

Open a new terminal window, `cd` into that same directory, and run:

```sh
devbox services up
```

This will start both the MongoDB and the Node.js services.

In the other terminal window, enter the Devbox shell:

```sh
devbox shell
```

Now, you can interact with the Node.js service:

```sh
http POST localhost:3001/create title="1984" author="George Orwell"
http GET localhost:3001/read
```
