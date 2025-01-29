const dev = process.env.NODE_ENV !== "production";

export function responseErrorHandler(error, errorBody) {
  if (dev) console.log("original error:", error);

  if (error?.response?.status === 404 || error?.status === 404) {
    if (error.message) {
      console.log("original error message:", error.message);
      return error.message;
    }
    if (error.response.statusText) return error.response.statusText;
  }

  if (error?.status === 422) {
    const errorArrays = error?.data?.errors;
    if (errorArrays && errorArrays.length > 0) {
      console.log("errorArrays", errorArrays);
      const errorKeys = errorArrays.map(
        (item) => `${Object.keys(item)[1]}: ${Object.values(item)[2]}`
      );
      let fields = "";
      errorKeys.forEach((item) => {
        fields += `${fields === "" ? "" : "\n"}${item}`;
      });

      if (dev) console.log("fields", fields);
      return fields;
    }
  }

  let resMessage =
    error?.response?.data?.message ||
    error?.response?.data ||
    error.message ||
    error.statusText ||
    error?.data?.message ||
    error.toString();

  if (typeof resMessage === "object") {
    resMessage = getErrorFromArray(error);
    console.log("res++Message", resMessage);
    return resMessage;
  }

  if (resMessage !== "") {
    if (dev) console.log("resMessage", resMessage);
    return resMessage;
  }

  if (error?.originalStatus === 404 || error.status === 404)
    resMessage = "The requested resource was not found";
  if (error?.originalStatus === 401 || error.status === 401)
    resMessage = "Unauthorized";
  if (error?.originalStatus === 409 || error.status === 409)
    resMessage = "Duplicate Entry";
  if (resMessage === "Request failed with status code 500")
    resMessage = "Oops Something went wrong. Please try again later!";
  if (resMessage === "Network Error")
    resMessage = "Oops, it seems you do not have internet access!";
  if (resMessage === "invalid signature")
    resMessage = "Oops, it seems the link has expired";

  if (dev) console.log("Error Message:", resMessage);

  if (typeof resMessage === "object") resMessage = JSON.stringify(resMessage);

  return resMessage;
}

function getErrorFromArray(error) {
  const errorArrays = error?.data?.errors || error?.response?.data?.errors;
  if (errorArrays && errorArrays.length > 0) {
    const errorKeys = errorArrays.map((item) => Object.values(item)[0]);
    let fields = "";
    errorKeys.forEach((item) => {
      fields += `${fields === "" ? "" : "\n"}${item}`;
    });

    if (dev) console.log("fields", fields);
    return fields;
  }
  return "An unknown error occurred";
}

