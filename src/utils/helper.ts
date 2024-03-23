export const camelToCapitalize = (text: String) => {
  if (!text) return "";
  return text.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

export const formatCurrency = (value?: number | string, currency = "USD") => {
  if (!value) return "0.00 USD";
  return value.toLocaleString("en-US", { style: "currency", currency });
};

export const convertToQuery = (obj: Record<string, any>) => {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => key + "=" + obj[key])
    .join("&");
};
