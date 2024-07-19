import { db } from "../mongo.js";

await Promise.all([
  db.collection("apiKeys").createIndex({ key: 1 }, { unique: true }),

  db.collection("bazaar").createIndex({ productId: 1 }, { unique: true }),

  db.collection("favoriteCache").createIndex({ uuid: 1 }, { unique: true }),

  db.collection("featuredProfiles").createIndex({ total: -1 }),

  db.collection("guildMembers").createIndex({ uuid: 1 }, { unique: true }),
  db.collection("guildMembers").createIndex({ gid: 1 }),
  db.collection("guildMembers").createIndex({ last_updated: 1 }, { expireAfterSeconds: 604800 }),

  db.collection("guilds").createIndex({ gid: 1 }, { unique: true }),
  db.collection("guilds").createIndex({ last_updated: 1 }, { expireAfterSeconds: 604800 }),

  db.collection("hypixelPlayers").createIndex({ uuid: 1 }, { unique: true }),
  db.collection("hypixelPlayers").createIndex({ last_updated: 1 }, { expireAfterSeconds: 1209600 }),

  db.collection("items").createIndex({ id: 1 }, { unique: true }),

  db.collection("members").createIndex({ uuid: 1, profile_id: 1 }, { unique: true }),

  db.collection("profileCache").createIndex({ profile_id: 1 }, { unique: true }),
  db.collection("profileCache").createIndex({ last_update: 1 }, { expireAfterSeconds: 1209600 }),

  db.collection("profileStore").createIndex({ uuid: 1 }, { unique: true }),
  db.collection("profileStore").createIndex({ apis: 1 }, { partialFilterExpression: { apis: true } }),
  db.collection("profileStore").createIndex({ last_update: 1 }, { expireAfterSeconds: 1209600 }),

  db.collection("usernames").createIndex({ username: "text" }),
  db.collection("usernames").createIndex({ uuid: 1 }, { unique: true }),

  db.collection("guildCache").createIndex({ uuid: 1 }, { unique: true }),
  db.collection("guildCache").createIndex({ last_update: 1 }, { expireAfterSeconds: 1209600 }),

  db.collection("museumCache").createIndex({ profile_id: 1 }, { unique: true }),
  db.collection("museumCache").createIndex({ last_update: 1 }, { expireAfterSeconds: 1209600 }),
]);
