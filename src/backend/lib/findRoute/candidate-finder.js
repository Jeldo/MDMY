const { CandidateLocation } = require('../../models');

const findCandidateLocation = async (
  midLongitude, midLatitude, maxDistance = 500, searchTime = 1
) => {
  const MIN_CANDIDATES = 3;
  const MAX_SEARCH_TIME = 5;
  let candidates;
  if (searchTime == MAX_SEARCH_TIME) {
    // TODO(Taeyoung): handle when exceed maximum search time
    return null;
  }
  await CandidateLocation.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [midLongitude, midLatitude]
        },
        $maxDistance: maxDistance
      }
    }
  }).then((res) => {
    if (res.length < MIN_CANDIDATES) {
      candidates = findCandidateLocation(
        midLongitude, midLatitude, maxDistance + 1000, searchTime + 1
      );
    }
    else {
      candidates = res;
    }
  }).catch((err) => {
    console.log(err);
  });
  return candidates;
};

module.exports = {
  findCandidateLocation,
};
