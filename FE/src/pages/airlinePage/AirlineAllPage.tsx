import { useCallback, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/airlinePage/AirlineAllPage.module.css";
import Header from "../../components/Header";
import AirlineSearchResult from "./airlineSearchComponents/AirlineSearchResult";
import AirlineAttribute from "./airlineSearchComponents/AirlineAttribute";
import AirlineLastUpdated from "./airlineSearchComponents/AirlineLastUpdated";
import { FlightFilterForAllPage } from "./types";
import { useFetchAirlineData } from "../../hooks/useFetchAirlineData";
import { terminal1, terminal2 } from "./airlineTerminals";
import { FaChevronLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { currentFormatTime } from "../../utils/formatTime";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

function AirlineAllPage() {
  const navigate = useNavigate();

  const targetRef = useRef<HTMLDivElement>(null);

  /** 필터 상태 */
  const [flightFilter, setFlightFilter] = useState<FlightFilterForAllPage>({
    arrivals: true, // true => 도착, false => 출발
    t1: true, // true => t1, false => t2
  });

  /** 필터 상태 핸들러 */
  const handleSwitchFlightFilter = useCallback(
    (identifier: keyof FlightFilterForAllPage) => {
      setFlightFilter((prevState) => ({
        ...prevState,
        [identifier]: !prevState[identifier],
      }));
    },
    []
  );

  /** 커스텀 훅 내 비즈니스 로직 => data fetching */
  const { error, isLoading, dataUpdatedAt, refetch, data } =
    useFetchAirlineData({});

  /** 데이터 필터링 로직 */
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data
      .filter((item) => {
        const matchesDirection =
          (flightFilter.arrivals && !item.chkinrange) ||
          (!flightFilter.arrivals && item.chkinrange);
        const matchesTerminal =
          (flightFilter.t1 && terminal1.includes(item.airline)) ||
          (!flightFilter.t1 && terminal2.includes(item.airline));
        return matchesDirection && matchesTerminal;
      })
      .filter(
        ({ estimatedDateTime }) =>
          Number(estimatedDateTime) >= Number(currentFormatTime()) - 15
      )
      .sort(({ estimatedDateTime: a }, { estimatedDateTime: b }) => +a - +b);
  }, [data, flightFilter]);

  const { data: paginatedData, isLoading: isLoadingMore } = useInfiniteScroll(
    filteredData,
    targetRef
  );

  return (
    <div className={styles.wrapper}>
      <Header
        leftContent={
          <div className={styles["header-container--left"]}>
            <FaChevronLeft
              className={styles["icon-prev"]}
              onClick={() => navigate(-1)}
            />
            <button
              className={styles["icon-btn"]}
              onClick={() => handleSwitchFlightFilter("arrivals")}
            >
              <span>{flightFilter.arrivals ? "도착" : "출발"}</span>
              <FaCaretDown className={styles["icon-switch"]} />
            </button>
            <button
              className={styles["icon-btn"]}
              onClick={() => handleSwitchFlightFilter("t1")}
            >
              <span>T{flightFilter.t1 ? 1 : 2}</span>
              <FaCaretDown className={styles["icon-switch"]} />
            </button>
          </div>
        }
      />
      <div
        style={{
          position: "sticky",
          top: 60,
          height: 30,
          backgroundColor: "#fff",
          zIndex: 101,
        }}
      ></div>
      <AirlineLastUpdated dataUpdatedAt={dataUpdatedAt} refetch={refetch} />
      <AirlineAttribute arrivals={flightFilter.arrivals} />
      <AirlineSearchResult
        data={paginatedData}
        isLoading={isLoading}
        error={error || undefined}
      />
      {isLoadingMore && <LoadingSpinner message="Loading..." />}
      <div ref={targetRef} />
    </div>
  );
}

export default AirlineAllPage;
