const public = require('./by-public.js');
const driving = require('./by-driving.js');
const candidateFinder = require('./candidate-finder');

const calculateAvg = (groupTravelInfo) => {
  let midAvgDuration = 0;
  let midAvgDistance = 0;
  for (let j = 0; j < groupTravelInfo.length; ++j) {
    midAvgDuration += parseInt(groupTravelInfo[j].duration);
    midAvgDistance += parseInt(groupTravelInfo[j].distance);
  }
  midAvgDuration = parseInt(midAvgDuration / groupTravelInfo.length);
  midAvgDistance = parseInt(midAvgDistance / groupTravelInfo.length);

  let durationStdDeviation = 0;
  let distanceStdDeviation = 0;
  for (let j = 0; j < groupTravelInfo.length; ++j) {
    durationStdDeviation += Math.pow(groupTravelInfo[j].duration - midAvgDuration, 2);
    distanceStdDeviation += Math.pow(groupTravelInfo[j].distance - midAvgDistance, 2);
  }
  distanceStdDeviation = Math.sqrt(distanceStdDeviation / groupTravelInfo.length);
  durationStdDeviation = Math.sqrt(durationStdDeviation / groupTravelInfo.length)

  const averages = {
    midAvgDuration: midAvgDuration,
    midAvgDistance: midAvgDistance,
    distanceStdDeviation: distanceStdDeviation,
    durationStdDeviation: durationStdDeviation
  };

  return averages;
};

/* Sorting Option
  0 (average distance, DEFAULT)
  1 (average duration)
  2 (distance standard deviation)
  3 (duration standard deviation)
*/
const sortCandidates = (result, option = 3) => {
  if (option == 0) {
    result.candidates.sort(function sortByAvgDistance(c1, c2) {
      if (c1.average.avgDistance == c2.average.avgDistance) {
        return 0;
      } else {
        return c1.average.avgDistance > c2.average.avgDistance ? 1 : -1;
      }
    });
  } else if (option == 1) {
    result.candidates.sort(function sortByAvgDuration(c1, c2) {
      if (c1.average.avgDuration == c2.average.avgDuration) {
        return 0;
      } else {
        return c1.average.avgDuration > c2.average.avgDuration ? 1 : -1;
      }
    });
  } else if (option == 2) {
    result.candidates.sort(function sortBydistanceStdDeviation(c1, c2) {
      if (c1.average.distanceStdDeviation == c2.average.distanceStdDeviation) {
        return 0;
      } else {
        return c1.average.distanceStdDeviation > c2.average.distanceStdDeviation ? 1 : -1;
      }
    });
  } else if (option == 3) {
    result.candidates.sort(function sortBydurationStdDeviation(c1, c2) {
      if (c1.average.durationStdDeviation == c2.average.durationStdDeviation) {
        return 0;
      } else {
        return c1.average.durationStdDeviation > c2.average.durationStdDeviation ? 1 : -1;
      }
    });
  };
};

const getResult = async (participants, searchPoint) => {
  let result = {
    'candidates': []
  };

  let candidateLocations = await candidateFinder.findCandidateLocation(
    searchPoint.location.lng, searchPoint.location.lat
  );
  if (candidateLocations == null) {
    // TODO(Taeyoung): Handle maximum search
    return null;
  }

  for (let i = 0; i < candidateLocations.length; i++) {
    let candidate = {};
    candidate.name = candidateLocations[i].name;
    candidate.location = candidateLocations[i].location;
    candidate.numberOfVotes = 0;
    candidate.average = {};
    // TODO(Taeyoung): Redefine rating
    if (candidateLocations[i].ratingByVoting === undefined) {
      candidateLocations[i].ratingByVoting = parseFloat(
        (Math.random() * (2.0 - 0.0) + 0.0).toFixed(2)
      );
    }
    if (candidateLocations[i].ratingByCrawling === undefined) {
      candidateLocations[i].ratingByCrawling = parseFloat(
        (Math.random() * (2.0 - 0.0) + 0.0).toFixed(2)
      );
    }
    candidate.rating = candidateLocations[i].ratingByVoting
      + candidateLocations[i].ratingByCrawling + 1;

    // user들 각각 계산
    let groupTravelInfo = [];
    for (let j = 0; j < participants.length; j++) {
      let userTravelInfo;
      if (participants[j].transportation == 'public') {
        userTravelInfo = await public.shortestPath(
          participants[j].location.coordinates[0],
          participants[j].location.coordinates[1],
          candidateLocations[i].location.coordinates[0],
          candidateLocations[i].location.coordinates[1]);
      } else {
        userTravelInfo = await driving.shortestPath(
          participants[j].location.coordinates[0],
          participants[j].location.coordinates[1],
          candidateLocations[i].location.coordinates[0],
          candidateLocations[i].location.coordinates[1]);
      }
      groupTravelInfo.push(userTravelInfo);
    }
    candidate.users = groupTravelInfo;

    let averages = calculateAvg(groupTravelInfo);
    candidate.average.avgDuration = averages.midAvgDuration;
    candidate.average.avgDistance = averages.midAvgDistance;
    candidate.average.distanceStdDeviation = averages.distanceStdDeviation;
    candidate.average.durationStdDeviation = averages.durationStdDeviation;
    result.candidates.push(candidate);
  }

  //처음 결과는 duration을 기준으로 sort
  sortCandidates(result, 3);
  return result;
};

module.exports = {
  getResult,
};

