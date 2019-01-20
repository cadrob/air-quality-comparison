import axios from "axios";

export const getCities = async () => {
  const { data } = await axios.get(
    "https://api.openaq.org/v1/cities?country=GB&limit=200"
  );
  return data.results;
};
