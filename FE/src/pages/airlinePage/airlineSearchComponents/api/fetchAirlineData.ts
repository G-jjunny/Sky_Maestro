import axios from "axios";
import { searchResultType } from "../searchResultType";

const AIRLINE_KEY = decodeURIComponent(
  process.env.REACT_APP_AIRPORT_SERVICE_KEY!
); // key자체가 이미 인코딩이 되어있는 값이라 한 번 디코딩
const AIRLINE_URL = process.env.REACT_APP_AIRLINE_SERVICE_URL;

const ARRIVAL_ENDPOINT = process.env.REACT_APP_AIRLINE_ARRIVAL_ENDPOINT;
const DEPARTURE_ENDPOINT = process.env.REACT_APP_AIRLINE_DEPARTURE_ENDPOINT;

/** endpoint에 따른 fetch 요청 함수 */
/** 나중에 커스텀 훅으로 빼기 */
const fetchByEndpoint = async (endpoint: string, params: any) => {
  // console.log("Full URL:", `${AIRLINE_URL}${endpoint}`);
  return axios.get(`${AIRLINE_URL}${endpoint}`, {
    params: {
      ...params,
      serviceKey: AIRLINE_KEY, // 이미 인코딩된 키를 다시 인코딩하지 않도록 처리
      type: "json",
    },
  });
};

/** API 요청 함수 */
export const fetchAirlineData = async (
  params: any
): Promise<searchResultType[]> => {
  const [arrivalResponse, departureResponse] = await axios.all([
    fetchByEndpoint(ARRIVAL_ENDPOINT!, params),
    fetchByEndpoint(DEPARTURE_ENDPOINT!, params),
  ]);

  // 응답결과가 {response: {body: {items: []}}} 구조로 래핑되어 있음
  const arrivalData = arrivalResponse.data.response.body.items;
  const departureData = departureResponse.data.response.body.items;

  return [...arrivalData, ...departureData];
};
