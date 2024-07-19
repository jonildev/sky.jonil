import { db } from "./mongo.js";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";
import { getLevelByXp } from "./stats/skills/leveling.js";
momentDurationFormat(moment);

const defaultOptions = {
  mappedBy: "uuid",
  sortedBy: -1,
  format: (x) => Number(x),
};

const raceFormat = (x) => {
  x = Number(x);

  let raceDuration = moment.duration(x, "milliseconds").format("m:ss.SSS");

  if (x < 1000) {
    raceDuration = "0." + raceDuration;
  }

  return raceDuration;
};

const skillFormat = (xp) => {
  const levelObj = getLevelByXp(xp);
  return `Level ${levelObj.level} + ${levelObj.xpCurrent.toLocaleString()} XP`;
};

const skillFormatFarming = (xp) => {
  const levelObj = getLevelByXp(xp, { skill: "farming" });
  return `Level ${levelObj.level} + ${levelObj.xpCurrent.toLocaleString()} XP`;
};

const skillFormatEnchanting = (xp) => {
  const levelObj = getLevelByXp(xp, { skill: "enchanting" });
  return `Level ${levelObj.level} + ${levelObj.xpCurrent.toLocaleString()} XP`;
};

const skillFormatRunecrafting = (xp) => {
  const levelObj = getLevelByXp(xp, { type: "runecrafting" });
  return `Level ${levelObj.level} + ${levelObj.xpCurrent.toLocaleString()} XP`;
};

const skillFormatDungeoneering = (xp) => {
  const levelObj = getLevelByXp(xp, { type: "dungeoneering" });
  return `Level ${levelObj.level} + ${levelObj.xpCurrent.toLocaleString()} XP`;
};

const overrides = {
  bank: {
    mappedBy: "profile_id",
  },

  unique_minions: {
    mappedBy: "profile_id",
  },
};

const titleCase = (string) => {
  const split = string.toLowerCase().split(" ");

  for (let i = 0; i < split.length; i++) {
    split[i] = split[i].charAt(0).toUpperCase() + split[i].substring(1);
  }

  return split.join(" ");
};

export default (name) => {
  const lbName = name.split("_").slice(1).join("_");

  const options = Object.assign({}, defaultOptions);

  options["key"] = lbName;
  options["name"] = titleCase(lbName.split("_").join(" "));

  if (typeof overrides[lbName] == "object") {
    for (const key in overrides[lbName]) {
      options[key] = overrides[lbName][key];
    }
  }

  async () => {
    const { collections: COLLECTION_DATA } = await db.collection("collections").findOne({ _id: "collections" });
    if (lbName.startsWith("collection_")) {
      const collectionName = lbName.split("_").slice(1).join("_").toUpperCase();
      const collectionData = Object.values(COLLECTION_DATA)
        .map((a) => a.items)
        .flat()
        .find((a) => a.id === collectionName);

      if (collectionData?.length > 0) {
        options["name"] = collectionData[0].name + " Collection";
      }
    }
  };

  if (lbName.includes("_best_time") || lbName.includes("_fastest_time")) {
    options["sortedBy"] = 1;
    options["format"] = raceFormat;
  }

  if (lbName.startsWith("skill_")) {
    const skill = lbName.split("_").slice(1).join("_");

    if (skill.includes("farming")) {
      options["format"] = skillFormatFarming;
    } else if (skill.includes("enchanting")) {
      options["format"] = skillFormatEnchanting;
    } else if (skill.includes("runecrafting")) {
      options["format"] = skillFormatRunecrafting;
    } else {
      options["format"] = skillFormat;
    }
  }

  if (lbName.startsWith("dungeons_") && lbName.includes("_xp")) {
    const skill = lbName.split("_").slice(1).join("_");
    if (skill.includes("catacombs") || skill.includes("class")) {
      options["format"] = skillFormatDungeoneering;
    }
  }

  if (lbName.includes("_slayer_boss_kills_")) {
    const tier = Number(lbName.split("_").pop()) + 1;

    if (lbName.startsWith("zombie_slayer")) {
      options["name"] = `Kills Revenant Horror Tier ${tier}`;
    } else if (lbName.startsWith("spider_slayer")) {
      options["name"] = `Kills Tarantula Broodfather Tier ${tier}`;
    } else if (lbName.startsWith("wolf_slayer")) {
      options["name"] = `Kills Sven Packmaster Tier ${tier}`;
    }
  }

  return options;
};
