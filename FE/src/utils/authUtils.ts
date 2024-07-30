import { useNavigate } from 'react-router-dom';

// 로그인 상태를 확인하는 함수 (예: 토큰 존재 여부)
export const isUserLoggedIn = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token; // 토큰이 있으면 true, 없으면 false 반환
};

// 페이지 이동을 처리하는 함수
export const handleRegisterBoardingPass = (navigate: ReturnType<typeof useNavigate>, detailData: any) => {
    if (isUserLoggedIn()) {
        console.log(isUserLoggedIn());
        // detailData의 flightId, scheduleDateTime 정보를 백엔드 API로 보내는 로직 추가 가능
        // 예: axios.post('/api/boarding-pass', { flightId: detailData.flightId, scheduleDateTime: detailData.scheduleDateTime });

        // 로그인 상태라면 내 티켓 페이지로 이동
        navigate("/boardingPass");
    } else {
        console.log(isUserLoggedIn());
        // 로그인 상태가 아니라면 로그인 페이지로 이동
        navigate("/login");
    }
};

//로그아웃 함수
export const handleLogout = (navigate: ReturnType<typeof useNavigate>) => {
    const token = localStorage.getItem('token');

    // JWT가 존재하면 콘솔에 출력
    if (token) {
        console.log('JWT before logout:', token);
    }

    // JWT 삭제
    localStorage.removeItem('token');

    // 로그인 페이지로 이동
    navigate('../login');
};
