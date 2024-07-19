import * as constants from "../constants.js";

export function getFarming(userProfile) {
  if (userProfile.jacobs_contest === undefined) {
    return;
  }

  const farming = {
    talked: userProfile.jacobs_contest?.talked || false,
    pelts: userProfile.trapper_quest?.pelt_count || 0,
  };

  if (farming.talked) {
    // Your current badges
    farming.current_badges = {
      bronze: userProfile.jacobs_contest.medals_inv?.bronze || 0,
      silver: userProfile.jacobs_contest.medals_inv?.silver || 0,
      gold: userProfile.jacobs_contest.medals_inv?.gold || 0,
    };

    // Your total badges
    farming.total_badges = {
      bronze: 0,
      silver: 0,
      gold: 0,
      platinum: 0,
      diamond: 0,
    };

    // Your current perks
    farming.perks = {
      double_drops: userProfile.jacobs_contest.perks?.double_drops || 0,
      farming_level_cap: userProfile.jacobs_contest.perks?.farming_level_cap || 0,
    };

    // Your amount of unique golds
    farming.unique_golds = userProfile.jacobs_contest?.unique_brackets?.gold?.length || 0;

    // unique platinums
    farming.unique_platinums = userProfile.jacobs_contest?.unique_brackets?.platinum?.length || 0;

    // unique diamonds
    farming.unique_diamonds = userProfile.jacobs_contest?.unique_brackets?.diamond?.length || 0;

    // Things about individual crops
    farming.crops = {};

    for (const crop in constants.FARMING_CROPS) {
      farming.crops[crop] = constants.FARMING_CROPS[crop];

      Object.assign(farming.crops[crop], {
        attended: false,
        highest_tier: "none",
        contests: 0,
        personal_best: 0,
        badges: {
          diamond: 0,
          platinum: 0,
          gold: 0,
          silver: 0,
          bronze: 0,
        },
      });
    }

    // Template for contests
    const contests = {
      attended_contests: 0,
      all_contests: [],
    };

    for (const contestId in userProfile.jacobs_contest.contests) {
      const data = userProfile.jacobs_contest.contests[contestId];

      const contestName = contestId.split(":");
      const date = `${contestName[1]}_${contestName[0]}`;
      const crop = contestName.slice(2).join(":");

      if (data.collected < 100) {
        continue; // Contests aren't counted in game with less than 100 collection
      }

      farming.crops[crop].contests++;
      farming.crops[crop].attended = true;
      if (farming.crops[crop].personal_best < data.collected) {
        farming.crops[crop].personal_best = data.collected;
      }

      const contest = {
        date: date,
        crop: crop,
        collected: data.collected,
        claimed: data.claimed_rewards || false,
        medal: null,
      };

      const placing = {};

      if (contest.claimed) {
        placing.position = data.claimed_position || 0;
        placing.percentage = (data.claimed_position / data.claimed_participants) * 100;
        const participants = data.claimed_participants;

        // Use the claimed medal if it exists and is valid
        if (contest.claimed_medal) {
          contest.medal = contest.claimed_medal;
        } else if (placing.position <= Math.floor(participants * 0.02)) {
          contest.medal = "diamond";
        } else if (placing.position <= Math.floor(participants * 0.05)) {
          contest.medal = "platinum";
        } else if (placing.position <= Math.floor(participants * 0.1)) {
          contest.medal = "gold";
        } else if (placing.position <= Math.floor(participants * 0.3)) {
          contest.medal = "silver";
        } else if (placing.position <= Math.floor(participants * 0.6)) {
          contest.medal = "bronze";
        }

        // Count the medal if it exists
        if (contest.medal) {
          farming.total_badges[contest.medal]++;
          farming.crops[crop].badges[contest.medal]++;
        }
      }

      contest.placing = placing;

      contests.attended_contests++;
      contests.all_contests.push(contest);
    }

    for (const crop in farming.crops) {
      for (const badge of Object.keys(farming.crops[crop].badges)) {
        if (farming.crops[crop].badges[badge] < 1) continue;
        farming.crops[crop].highest_tier = badge;
        break;
      }
    }

    farming.contests = contests;
  }
  return farming;
}
