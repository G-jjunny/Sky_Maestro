import Header from "../../components/Header";
import MainPageContainer from "./mainPageComponents/MainPageContainer";
import MainPageLinkItem from "./mainPageComponents/MainPageLinkItem";
import styles from "../../styles/mainPage/MainPage.module.css";

import Airline from "../../assets/Icon/airline_icon.png";
import AirlineAll from "../../assets/Icon/travel_icon.png";
import Map from "../../assets/Icon/map_icon.png";
import PassportIcon from "../../assets/Icon/passport_icon.png";
import FacilityIcon from "../../assets/Icon/faci_icon.png";
import ParkingIcon from "../../assets/Icon/parking_icon (2).png";

function MainPage() {
  /** 각 link-item별 라우트 설정 */
  return (
    <div className={styles.wrapper}>
      <Header centerContent="인천국제공항" />
      <MainPageContainer title="항공편">
        <MainPageLinkItem
          icon={<img src={Airline} className={styles.icon} alt="airline" />}
          title="항공편 검색"
          description="검색어로 항공편 찾기"
          navigateTo="/airline-search"
        />
        <MainPageLinkItem
          icon={
            <img src={AirlineAll} className={styles.icon} alt="airline all" />
          }
          title="전체 항공편"
          description="인천공항 모든 이륙/착륙 항공편"
          navigateTo="/airline-all"
        />
      </MainPageContainer>
      <MainPageContainer title="정보">
        <MainPageLinkItem
          icon={<img src={Map} className={styles.icon} alt="map" />}
          title="공항 터미널 지도"
          description="한 눈에 볼 수 있는 터미널 지도"
          navigateTo="/terminalmap"
        />
        <MainPageLinkItem
          icon={
            <img src={PassportIcon} className={styles.icon} alt="passport" />
          }
          title="출입국 혼잡도"
          description="시간별 출입국장 혼잡도 상태"
          navigateTo="/congestion"
        />
        <MainPageLinkItem
          icon={<img src={FacilityIcon} className={styles.icon} alt="faci" />}
          title="편의시설"
          description="인천공항 내 편의시설 위치 및 정보"
          navigateTo="/facilities"
        />
        <MainPageLinkItem
          icon={<img src={ParkingIcon} className={styles.icon} alt="parking" />}
          title="주차"
          description="실시간 주차 가능대수 정보"
          navigateTo="/parking"
        />
      </MainPageContainer>
    </div>
  );
}

export default MainPage;
