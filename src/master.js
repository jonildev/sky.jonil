// this file only run on the master thread
await import("./scripts/init-collections.js");
await import("./scripts/init-custom-resources.js");

await Promise.all([
  import("./scripts/update-collections.js"),
  import("./scripts/cap-leaderboards.js"),
  import("./scripts/clear-favorite-cache.js"),
  import("./scripts/update-bazaar.js"),
  import("./scripts/update-items.js"),
  import("./scripts/update-featured-profiles.js"),
]);
