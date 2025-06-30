import { getDistance } from 'geolib';

import { Courts } from '~/app/services/rtkQuery/courts/types';

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface IgetNearestCourtInRangeArgs {
  courts: Courts[];
  range: number;
  userCoords: Coordinates;
}

export const getNearestCourtInRange = ({
  courts,
  range,
  userCoords,
}: IgetNearestCourtInRangeArgs): Courts | null => {
  const validCourts = courts
    .filter(
      (court): court is Courts & { location: [number, number] } =>
        Array.isArray(court.location) &&
        typeof court.location[0] === 'number' &&
        typeof court.location[1] === 'number',
    )
    .map(court => {
      const distance = getDistance(userCoords, {
        latitude: court.location[0],
        longitude: court.location[1],
      });

      return { ...court, distance };
    })
    .filter(court => court.distance <= range)
    .sort((a, b) => a.distance - b.distance);

  return validCourts[0] || null;
};
