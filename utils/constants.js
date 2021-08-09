import { GraphQLClient } from "graphql-request";
import Cookies from "js-cookie";

export const URLS = {
  home: "/",
  dashboard: "/adc_dashboard",
  expenditure: "/adc_dashboard/analytics/expenditure",
  transaction: "/adc_dashboard/analytics/transaction",
  upload: "/adc_dashboard/analytics/upload",
  project: "/adc_dashboard/adc_project",
  documents: "/adc_dashboard/documents",
};

export const BACKEND_URL = "http://localhost:8000/graphql/";
export const MEDIA_URL = "http://localhost:8000/media/";

export const MONTH_NAMES = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const client = Cookies.get("JWT")
  ? new GraphQLClient(BACKEND_URL, {
      headers: {
        authorization: `JWT ${Cookies.get("JWT")}`,
      },
    })
  : new GraphQLClient(BACKEND_URL);
