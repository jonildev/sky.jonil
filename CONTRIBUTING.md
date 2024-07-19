## Contributing to SkyCrypt

Before contributing to SkyCrypt, make sure you install the development environment first. If you have trouble building SkyCrypt or have any development questions, please don't hesitate to contact us on [Discord](https://discord.gg/cNgADv2kEQ)!

### Prerequisite Software

- [Node.js](https://nodejs.org) (at least v16, as some of the features we use require it)
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/), alternatively you can use the free online version (more instructions below)
- Redis, use [this link](https://github.com/MicrosoftArchive/redis/releases/tag/win-3.2.100) for Windows, and [this link](https://redis.io/) for other OS's (more instructions below)
- A [Hypixel API key](https://api.hypixel.net/)
- [Nginx](https://www.nginx.com/) (Optional but an ideal choice for full deployment)

### Alternative Installations

- Redis
  - On Windows, you can get Redis through [this link](https://github.com/MicrosoftArchive/redis/releases/tag/win-3.2.100). Download the zip, extract it, and run it by double clicking `redis-server.exe`
- MongoDB
  - Instead of installing Mongo on your device, you can use the free MongoDB Atlas program [here](https://www.mongodb.com/). It does require an account, but it is free.

### Getting Started

1. Clone the repository. You can do this on the command line by running

   ```
   git clone https://github.com/SkyCryptWebsite/SkyCrypt.git
   ```

   Alternatively, you can use a git GUI like GitHub Desktop to clone it.

2. Run `pnpm i` in the project directory to install the necessary dependencies.
   - Some operating systems may require extra dependencies, such as [node-canvas](https://github.com/Automattic/node-canvas/wiki)
3. Go to `developer.hypixel.net/dashboard`. Click `Create API Key` and copy the result.
4. Open `credentials.json` and input your Hypixel API key into the `hypixel_api_key` field.
5. In the `dbUrl` field, input your MongoDB URL. In the `dbName` field, input the name of the database you would like to use.
6. (optional) If you are not using the default Redis port or you are using Redis remotely, you can configure the Redis URL with the `redisUrl` field in `credentials.json`. Also `discord_webhook` if you want to send errors remotely, useful in production to detect bugs.
7. Make sure your Mongo and Redis instances are running, run `pnpm start` for production or `pnpm dev` for development in the project directory. You should now be able to access the site at http://localhost:32464/

### VS-Code

If you're not sure what code editor to use VS-Code is a great option. Here are some recommendations for using VS-Code to work on SkyCrypt.

#### Recommended Extensions

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [EJS language support](https://marketplace.visualstudio.com/items?itemName=digitalbrainstem.javascript-ejs-support)
- [Comment tagged templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates)
- [lit-plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin)

#### Recommended Settings

| Setting                       | Recommended Value         |
| ----------------------------- | ------------------------- |
| Editor: Default Formatter     | Prettier - Code formatter |
| Editor: Format On Save        | checked                   |
| JavaScript › Validate: Enable | unchecked                 |
| Files: Eol                    | \n                        |

You can also apply all these settings by creating a file called `settings.json` inside `.vscode` and copying the following into it:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "javascript.validate.enable": false,
  "editor.formatOnSave": true,
  "files.eol": "\n"
}
```
