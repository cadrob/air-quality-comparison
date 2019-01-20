import axios from "axios";

export const getCities = async () => {
  const { data } = await axios.get(
    "https://api.openaq.org/v1/cities?country=GB&limit=200"
  );
  return data.results;
};

export const getCityLatest = async city => {
  const { data } = await axios.get(
    `https://api.openaq.org/v1/measurements?city=${city}&order_by=date&limit=10000&sort=desc&parameter=pm25&parameter=so2&parameter=o3&parameter=no2&country=GB`
  );

  return data.results;
};
