import axios from "axios";

const _axios = axios.create();

_axios.defaults.baseURL =
  "https://xiear1qh26.execute-api.eu-west-2.amazonaws.com/default/CP70032E-movie";
_axios.defaults.timeout = 5000;
_axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
_axios.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
_axios.defaults.headers.common["Accept"] = "application/json";
_axios.defaults.headers.common["Content-Type"] = "application/json";

const api = async ({ method, data }) => {
  let retry = 0;

  while (retry++ < 2) {
    try {
      const res = await _axios({
        method: method,
        url: "",
        data: data,
      });

      if (res.data.status) {
        return res.data;
      } else {
        return {
          status: res.data.status,
          responseMessage: res.data.responseMessage,
        };
      }
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
  }
  return {
    status: false,
    responseMessage: "UNKNOWN ERROR",
  };
};

export default api;
