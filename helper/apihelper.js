export const getVersionData = async (id) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const response = await fetch(
    `https://nextstudion-backend.baggybrat.workers.dev?brandId=${id}`,
    {
      mod: "no-cors",
      headers,
    }
  );

  const data = await response.json();
  return data;
};
