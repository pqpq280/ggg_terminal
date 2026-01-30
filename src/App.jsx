/* 안녕하세요?
이걸 읽고 잇다면 갓삼에 많은 관심이 있으시단거겠죠
갓삼트좀 올려주십시오
갓삼글도 괜찮습니다
갓삼그림도 환영합니다
혹시 작가님이시라면 제발 돌아와주십시오
*/

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, ShieldAlert, Lock, Wifi, Menu, X, Eye, Skull, Activity, Monitor, Network, Disc, Clock, Database, FileText, Cpu } from 'lucide-react';

// ==================================================================================
// SHARED UTILS
//==================================================================================
// CUSTOM ICONS
// ==================================================================================

const LizardIcon = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 3c2.5 0 4.5 2 5 4.5c.5 2.5-1 4-2.5 5" />
    <path d="M16 3c-1.5 0-3 .5-4 2" />
    <circle cx="18.5" cy="5.5" r="1" fill="currentColor" stroke="none"/>
    <circle cx="14.5" cy="4.5" r="0.5" fill="currentColor" stroke="none" opacity="0.5"/>
    <path d="M12 5c0 0 2 3 3 6c1 3-1 5-2 6c-2 2-5 3-8 3c-2 0-3-1-3-2" />
    <path d="M18.5 12.5c-1 3-3 5-6 5" />
    <path d="M17 9l3 1" />
    <path d="M20 10l1.5 -1" />
    <path d="M20 10l2 0.5" />
    <path d="M20 10l1.5 2" />
    <path d="M13 7l-3 -1" />
    <path d="M10 6l-1.5 -1" />
    <path d="M10 6l-2 0.5" />
    <path d="M10 6l-1 2" />
    <path d="M15 14l3 2" />
    <path d="M18 16l2 -0.5" />
    <path d="M18 16l2 1.5" />
    <path d="M18 16l1 2.5" />
    <path d="M11 15l-3 2" />
    <path d="M8 17l-1.5 0" />
    <path d="M8 17l-2 1.5" />
    <path d="M8 17l-1 2.5" />
  </svg>
);

const EncryptedText = ({ text, colorClass = "text-green-300 bg-green-900" }) => {
  const [display, setDisplay] = useState("▒▒▒▒▒▒▒▒▒");
  const [decrypted, setDecrypted] = useState(false);

  const reveal = () => {
    if (decrypted) return;
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((letter, index) => {
        if (index < iterations) return letter;
        return String.fromCharCode(33 + Math.floor(Math.random() * 90));
      }).join(""));
      if (iterations >= text.length) {
        clearInterval(interval);
        setDecrypted(true);
      }
      iterations += 1/2;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={reveal} 
      onClick={reveal}
      className={`cursor-pointer px-1 transition-colors duration-300 inline-block ${decrypted ? 'bg-red-900 text-black font-bold' : `${colorClass} blur-[2px] active:blur-none hover:blur-none`}`}
    >
      {display}
    </span>
  );
};

// Kernel Panic Overlay
const KernelPanicOverlay = ({ id, x, y, title, onClose }) => {
  const hexDump = Array(4).fill(0).map(() => 
    `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(8, '0')}`
  ).join(' ');
  const timestamp = (performance.now() / 1000).toFixed(6);

  const style = window.innerWidth < 768 
    ? { left: '50%', top: `${Math.min(y, window.innerHeight - 200)}px`, transform: 'translateX(-50%)' } 
    : { left: x, top: y };

  return (
    <div 
      onClick={() => onClose(id, true)}
      style={style}
      className="fixed z-[100] font-mono text-xs w-[90vw] md:max-w-sm cursor-pointer hover:bg-red-900/20 active:scale-95 transition-transform"
    >
      <div className="bg-black text-red-500 p-2 md:p-1 border-l-4 border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.3)]">
        <div className="font-bold mb-1 flex items-center gap-2 flex-wrap">
            <span className="bg-red-600 text-black px-1">KERNEL_PANIC</span>
            <span>[{timestamp}]</span>
        </div>
        <div className="opacity-90 leading-tight break-all">
            <p>&gt; FATAL: {title}</p>
            <p>&gt; PID: {Math.floor(Math.random() * 9999)} (corrupted)</p>
            <p className="text-[10px] opacity-70 mt-1 font-light hidden md:block">{hexDump}</p>
            <p className="animate-pulse mt-1 text-red-400">&gt; Touch to fail...</p>
        </div>
      </div>
    </div>
  );
};


// ==================================================================================
// PART 1: DR SYSTEM (ACT 1 - HACKER LOCAL)
// ==================================================================================

const THEME_DR = '#39ff14';

const LOCAL_DATA = {
  'INDEX.LOG': {
    title: "ROOT_ACCESS",
    type: "system",
    content: `
    DOMESTIC REPTILIAN [v.5.0] - SURVEILLANCE NODE
    USER: [UNKNOWN_PLAYER]
    
    [시스템 상태]
    - 암호화: 확인 불가
    - 타겟 연결: 대기 중
    
    > 당신은 지금 권외 지역에 있습니다. 

	 본 터미널은 ST GAMES의 내부망 접속 권한 탈취 및 정보 공유를 위해 설계되었습니다. 
	 이 세션은 '프란체스코 호레움' 프로토콜에 의해 보호되고 있습니다.
	 ST GAMES의 문서 열람 시에는 SANITY 수치를 잃지 않도록 각별히 주의해주세요.
    
	 [경고] 프로토콜의 방어 체계가 오염 등의 원인으로 신뢰할 수 없다고 판단될 경우, 즉시 접속을 종료하십시오. 
	 [알림] 귀하의 미세한 '언어 근육' 수축이 감지되었습니다. 명확한 문장으로 사고하십시오.
    
    
    [가용 명령]
    [[GUIDE.TXT|>> 가이드]]
    [[TARGET_STG.EXE|>> [연결] ST GAMES 내부망 침투]]
    [[LOG_DUMP.TXT|>> 탈취한 로그 확인]]
	[[RECENT.TEP|>> 플레이어간 공유 정보 확인]]
     [[USER_P_LOCK.LOG|>> [암호화] 판도모니움의 기록]]
    
    
    "당신이 이해할 수 있는 답을 당신이 이해할 수 있는 방식으로 제공해 드립니다."
    
    ` 
  },
  'GUIDE.TXT': {
    title: "PLAYER_MANUAL",
    type: "system",
    content: `
    === 사용 매뉴얼 ===
    1. 'TARGET_STG.EXE'를 실행하면 타겟(ST GAMES)의 내부망으로 정신을 투사합니다.
    2. 접속 순간부터 당신은 그들의 'Sanity(정신력)' 시스템에 영향을 받습니다. 주의하세요.
    3. 문서에 포함된 '고유 명사'는 그 자체로 좌표 역할을 합니다.
	 4. 당신은 플레이어입니다. 
    
    [[INDEX.LOG|돌아가기]]
    `
  },
  'RECENT.TEP': {
    title: "RECENT",
    type: "system",
    content: `
	
	
	 * 해당 로그의 많은 부분이 소실되었습니다.
	 * 중요 정보가 아닌 것만 남겨두었으며, 원본은 DR 혹은 그의 기록 보관처에게서 확인할 수 있습니다. 
    
     [R+1]
	 - 현 시점에서 생존한 플레이어 리스트의 갱신 보관처가 결정되었습니다.
    - I가 Q일 가능성에 대한 반증이 제시되었습니다 (제공자 P).
	 - N의 [그룹 채팅방]에 대한 정기 논의 기록 
    
	  [R+2]
	 - 역병신 플레이어 'Y'의 기록 절도 미수 확인.
	 
	  [R+3]
	 - ST GAMES 내부망에서 CONCLUDE에 관련된 별도 프로젝트가 발견되었습니다.
    - 일반 직원에게도 숨겨져 있으며, 접근 시도가 감지되면 로컬 시스템까지 역추적당할 수 있습니다.
	 
	  	
	  [R+4]
	 - ST GAMES의 시스템 권한 탈취에 대한 기록은 모두 말소되었습니다.
	 - 기록 백업을 위하여 DR의 사본을 생성하였습니다. 
	 - 기존 프로그램의 사용자가 아닐 시 열람에 주의를 요합니다.	 
	 
	  [R+4]
	 - 주의를 요합니다.
	 
	 
    [[INDEX.LOG|돌아가기]]
    `
  },
  'LOG_DUMP.TXT': {
    title: "STOLEN_LOGS",
    type: "archive",
    content: `
    [수집된 데이터 파편]
	 
    - 타겟명: ST GAMES 
    - 주요 위험 요소: '망각 저항', '텍스트 '
    [[DATA.DAT|>> 데이터]]	 
	 
    [[INDEX.LOG|돌아가기]]
	 [[24F_WAITING.LOG]@$F]]
    `
  },
 'DATA.DAT': {
    title: "DATA.DAT",
    type: "danger",
    security: 5,
    content: `
    이 컨텐츠는 보호되고 있습니다.
	
	[[LANGUAGE_MUSCLE.MEM|언어]]
    [[24F_WAITING.LOG]@$F]]
	
    `
  },  
 '24F_WAITING.LOG': {
    title: "24F_QUEUE_LOG",
    type: "danger",
    security: 2,
    content: `
    [로그 시퀀스: 2024-05-11]
    
    24층 대기실에 잉여 인원 107명이 감지되었습니다.
    그들은 모두 자신의 '의식'이 실재한다고 믿고 있습니다.
    
    "질식할 것 같은 감각은 실재가 아닙니다. 그것은 시뮬레이션의 연산 오류일 뿐입니다."
	
	이 컨텐츠에 들어올 수 있는 방법은 시스템 상 존재하지 않습니다.	
	어떤 방법으로 들어온 건가요? 
	 
    
    [[LANGUAGE_MUSCLE.MEM|돌아가기]]
    `
  },
  'LANGUAGE_MUSCLE.MEM': {
    title: "MEM_DATA: SPEECH",
    type: "glitch",
    security: 3,
    content: `
    [데이터 추출본]
    당신이 지금 이 문장을 읽으며 속으로 발음할 때, 
    당신의 언어 근육은 미세하게 떨리고 있습니다.
    그들은 그 떨림을 통해 당신의 다음 생각을 미리 연산합니다.
    
    당신에게는 귀가 없습니다. 소리는 뇌 내부에서 직접 생성됩니다.
    
	[추가 경고] 
	ST GAMES의 터미널은 접속자의 생체 신호를 동기화합니다.
	글을 읽을 때 속발음(Subvocalization)을 하지 마십시오.
	다크렐름에서 묵독이 비일반적인 것에는 이유가 있습니다. 
	생각은 명확한 문장이 아닌 이미지로 하십시오.
	
    [[INDEX.LOG|돌아가기]]
    `
  },  
  'TARGET_STG.EXE': {
    title: "BYPASSING B24 FIREWALL...",
    type: "executable",
    action: "connect",
    content: `
    [연결 시퀀스 개시]
    타겟 : ST GAMES INTERNAL NETWORK
    방화벽 우회 중... [성공]
    관리자 권한 획득 중... [성공]
    원격 세션을 시작합니다.
    `
  },
 'USER_P_LOCK.LOG': {
    title: "ACCESS_DENIED",
    type: "locked",
    content: `
    [접근 권한이 필요합니다]
    
    작성자: 판도모니움
    수신자: (알 수 없음)
    
    이 파일은 DR의 협조 하에 이중 암호화되었습니다.
	 그러나 무결성을 보장할 수는 없습니다. 
	 수정 내역을 항상 확인하십시오. 
    
    열람하려면 하단 터미널에 [암호]를 입력하십시오.
    
    Hint (이하 유저 판도모니움이 작성)
	 
	 형. 
	 집도한테 부탁해서 
	 진짜 형만 볼수있는 기록 남겨놨음.
	 형 스토커 퍼리충이 
	 사칭범 새끼 하나 데리고 다니던데
	 난 걔 안 믿어.
	 걔는 김치찜이 뭔지도 모름
	 우리 자주 시켜먹는데도 어딘지 모르고

	 어쨋든 비번 걸어놧거든
	 형이 저번에 지구에서 제일 번성했었던 
	 석궁류? 인가 뭔가 했던거 있잖아
	 힌트 너무 많이 줬나?
	 그래도 스트가 형 지능 너프했을수;잇으니까
	 그 밸패?같은걸로
	 형이 멍청해졋단게 아니라
	 내맘알지 ㅎ
	 영어로 써주라
	 난 스펠 까먹엇는데 집도는 알고 잇더라고
	 근데 집도마뱀이 그걸 왜 알고 있지?
	 형 얘랑 친햇음?
	 컨클루드 하는 인간은 상종할거 못된다며
	 나랑밖에 안친하다며
	 형어떻게이럴수가있어

    (COMMAND창에 소문자로 입력)
    
    [[INDEX.LOG|돌아가기]]
    `
  },
  'PANDO_MEM.DAT': {
    title: "MEM_FRAG_01: Q",
    type: "secret",
    hidden: true,
    content: `
    [복호화 성공]
    [작성일: 기록 말소됨]
    
     qwerasdf.
     아니, 형.
	 잘 지내?
	 형이 시스템을 신뢰하지 않아서 
	 그래서 메시지 안 쓰는 걸수도 있으니까
	 다른 방법으로라도 소식 남겨보려고
	 집도 통해서 이거 씀
	 발견하면 연락 줘
	 
	 빙의는 잘 햇어?
     나는 좀 이상하게 변하긴 했음 ㅋㅋ
     형한테는 예상범위 내려나
     사실 세로드립으로 형 이름 넣을랫는데
     집도가 머 딴데 써먹는다고
     아껴두라함
     하긴 나도 다른새끼들이 
	 형 이름 아는건 싫어
     그래서 우리 저번에 그 암호라고 만든거
     쓸까햣는데
     형이 까먹엇을까바..
     아니 형이 멍청하단건 아니고
     접때말햇듯이
	 밸패? 땜에 ㅎ;
     저번에 노인성치매라고 놀린거 
	 농담인거앙지;;

     아
     형진짜 보고싶다
     형은 뭐 됏을까
     미소녀?
     ㅋㅋ
     농담이고
	 개미?
	 형 마더갓할때 유사-개미핥기인가 
	 그거 플레이 햇엇잔아 
	 존나 개신기하게 처먹던데
	 아님 고블린? 다크렐름엔 없긴하지만 
	 아님 머 형은 미생물 좋아하니까 
	 큰빗이끼벌레?
	 
	 뭐
	 만약에
     촉수괴물 같은거 됏어도
     난 상관없음
     진짜로
     형이 머 해양촉수 그런거 돼서
	 바다가 좋으면
     바다에만 있을수 있다면
	 내가 우리영지에 물존나부어서
	 바다랑 이어지게 어케해볼개
	 
	 아 진짜 보고싶다
	 형 내가 찾아갈때까지
	 잘지내고잇어야해
	 밥잘먹고
	 형근데촉수괴물은머먹음
    
    [[PANDO_MEM_02.DAT|>> 다음 기록 재생]]
    `
  },
  'PANDO_MEM_02.DAT': {
    title: "MEM_FRAG_02: SUMMER",
    type: "secret",
    hidden: true, 
    content: `
     형 잘 지냄?
	 여긴 벌서 여름임
	 내가 잇는 데는 윗지방이라 그런가 
	 덥진 않던데
	 다크렐름이 의외로 존나 넓어서;;
	 집도랑 접선하려고 내려오니까 덥더라
	 
	 아 나 테레스 잇는데
	 테레스 기억남? 형이 스파이더맨 컨셉충짓 
	 한다고 난리칠때 마더갓 픽한다음 여기 애들 
	 8토막쳐서 존나 먹엇잔아 거미다리 8개라고
	 근데 와서 보니까 다리 6개인 애들도 잇더라
	 형생각나서 테레스 껍데기는 남겨놧어
	 
	 암튼 여긴 나 첨 왓을때 
	 초봄이엇는데도 춥어서
	 그래서 담요같은거 수급 지장 안가게 
	 미리 많이 챙겨놧음
	 겨울에 형 주려고 ㅋㅋ
	 형 추위 많이 타잔아
	 난방 열선은
	 형이깔아조야하긴해 ㅎ;
	 형도 알다시피 
	 크킹 유로파는 대역물은 아니잔아
	 
	 사실 뭐 컨클루드
	 글케 좋아하진 않았지만
	 형 없는 크킹보단
	 형 있는 컨클루드가 훨씬 낫지
	 형 근데 
	 플탐 최소기준 못채워서 못온건 설마 아니지?
	 
	 형은 여름쯤에나 오려나
	 형 그 문어같은거 돼서
	 문어숙회당하면 어캄;;
	 내가ㅜ어떻게든 지켜줄게
	 다크렐름수산자원관리법?강제통과시켜볼게 ㅜ
    
    [[PANDO_MEM_03.DAT|>> 다음 기억 파편 재생]]
    `
  },
  'PANDO_MEM_03.DAT': {
    title: "MEM_FRAG_03: PLAYERS",
    type: "secret",
    hidden: true,
    content: `
     형
     힘들다.
	 어제 게임오버된 플레이어를 봤어.
	 존나 무섭더라
	 시발
	 씨발 진짜 한순간 삐끗한 거였는데
	 
	 
	 
     인세니티 그 씹새끼는 뭔 말 같잖은거나 
	 맨날 처 떠들고 앉아있고
	 그걸 처 보고도 씨발
	 
	 
	 [삭제됨]
	 
	 
     형
	 나 여전히
	 매일 형 닉네임 부르는데
     ㅋㅋ 왜이렇게 발음 어려운걸로 지음
     형 우리가 더이상 인간이 맞긴 한걸까
     하긴 우린 처음부터 인간으로 불려온건 아니지
     형 보고 싶어
     형이 예전에 어떤 사람인지 잊었으면 
	 내가 알려주려고 했는데
     이제 내가 누군지도 잘 모르겠어
     그래도 걱정하지마 나 형은 하나도 안 잊었어
    
    [[PANDO_MEM_FINAL.DAT|>> 기록]]
    `
  },
  'PANDO_MEM_FINAL.DAT': {
    title: "MEM_FRAG_04: ASCENSION",
    type: "secret",
    hidden: true,
    content: `
    형.
	 여기엔 별이 너무 많아
    별빛이 너무 밝아
	 
    [[PANDO_MEM_DEL.DAT|>> 데이터 조각 확인]]
    `
  },
  'PANDO_MEM_DEL.DAT': {
    title: "MEM_FRAG_ERR: DELETED",
    type: "glitch",
    hidden: true,
    content: `
    [시스템 경고]
    치명적인 오류: 해당 데이터 세그먼트에 접근할 수 없습니다.
    이 기록은 '시스템 안전'을 위해 상위 관리자에 의해 영구 삭제 처리되었습니다.
    
    삭제 일시: [타임스탬프 제거됨]
    삭제 사유: 해당 내용은 허용된 인지 범위를 초과함.
    
    [[RESTORE_REQ|>> [데이터 복구] 관리자 권한 필요]]
    [[INDEX.LOG|돌아가기 (재진입시 데이터가 갱신됩니다)]]
    `
  },
    'PANDO_DREAM_01.LOG': {
    title: "PADO",
    type: "dream",
    hidden: true,
    content: `
    왜 다시 돌아온거야?
	
    [[INDEX.LOG|그만]]
	
	[[PANDO_DREAM_02.LOG|>> [강제 접속] 아니, 더 봐야겠어.]]   

	

    `
  },
  
    'PANDO_DREAM_02.LOG': {
    title: "PADO",
    type: "dream",
    hidden: true,
    content: `
    
	형.
	어떤 조각은 찾는 의미가 없단 거 형도 알잖아.
	나는 더이상 형이 찾는 사람이 아닐지도 몰라.
	어쩌면 내가 기억하는 형도 완전히 엉터리일지도
	ㅋㅋ
	그래도 그런 기억이라도
	뺏기고 싶진 않았어.
	많이 보고싶다.
	아마도 말로는 평생 하지 못했겠지만
	사랑해. 아주 많이.
	
	

    `
  },
  'RESTORE_REQ': {
    title: "RESTORE_SEQUENCE",
    type: "locked",
    hidden: true,
    content: `
    [보안 프로토콜 작동]
    
    삭제된 데이터를 강제로 복구하려면 관리자 권한이 필요합니다.
    하단 콘솔에 관리자 암호를 입력하십시오.
    
    > WAITING FOR INPUT...
    
    [[INDEX.LOG|취소]]
    `
  },
  'PANDO_TRUE_END.DAT': {
    title: "TRUE_END: DEVOURER",
    type: "secret",
    hidden: true,
    content: `
    [복구 완료: 99.9%]
    [왜곡 보정 중...]
    
	 제 조언을 잊어버렸나요?
    
    [연결 끊김]
    
    [[INDEX.LOG|시스템 종료]]
    `
  }
};

const DrSystem = ({ onConnect }) => {
  const [currentFile, setCurrentFile] = useState('INDEX.LOG');
  const [logs, setLogs] = useState(["BOOT SUCCESS", "NODE_INITIALIZED"]);
  const [inputVal, setInputVal] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  
  const [visitCounts, setVisitCounts] = useState({}); 
  
  const [isPandoLocked, setIsPandoLocked] = useState(false); 

  
  // NEW: Scroll to top ref
  const mainScrollRef = useRef(null);

  // NEW: Effect to scroll to top when file changes
  useEffect(() => {
    if (mainScrollRef.current) {
        mainScrollRef.current.scrollTop = 0;
    }
  }, [currentFile]);

  const accessFile = (target) => {
    if (!LOCAL_DATA[target]) return;
	
	
	
	
	// [추가] 방문 횟수 증가 로직
    const newCount = (visitCounts[target] || 0) + 1;
    setVisitCounts(prev => ({ ...prev, [target]: newCount }));
	
	
    if (LOCAL_DATA[target].action === 'connect') {
        setLogs(prev => [...prev, `> EXECUTING ${target}...`, "> ESTABLISHING TUNNEL..."]);
        setTimeout(onConnect, 1500);
    }
	
	// [추가] 3회차 이상 방문 시, 특정 파일은 에러 페이지로 강제 전환 
    if (LOCAL_DATA[target].type === 'dream' && newCount >= 3) {
        setLogs(prev => [...prev, `> ERROR: SECTOR_CORRUPTED. FILE NOT FOUND.`]);
        // 여기서 바로 리턴하거나, 아래 렌더링에서 내용을 바꿀 수 있음
    }
	
	// [추가] 마지막 꿈 파일 진입 시 영구 소실 트리거
    if (target === 'PANDO_DREAM_02.LOG') {
        setTimeout(() => {
            setLogs(prev => [...prev, "> SYSTEM: CRITICAL ERROR.", "> TARGET LOST.", "> CLOSING CONNECTION..."]);
        }, 10000); // 10초 뒤 경고

        setTimeout(() => {
            setIsPandoLocked(true); // 파일 잠금 (목록에서 사라짐)
            setCurrentFile('INDEX.LOG'); // 메인으로 강제 이동
            setLogs(prev => [...prev, "> DISCONNECTED."]);
        }, 15000); // 15초 뒤 강제 퇴장 (유저가 글을 읽을 시간)
    }
	
	
    setCurrentFile(target);
    setLogs(prev => [...prev, `> cat ${target}`]);
    setIsMobileMenuOpen(false);
  };

  const parseLinks = (text) => {
      return text.split(/(\[\[.*?\]\])/g).map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
            const [target, label] = part.slice(2, -2).split('|');
            return (
                <button key={i} onClick={() => accessFile(target.trim())} className="text-[#39ff14] font-bold underline decoration-dotted hover:bg-[#39ff14] hover:text-black transition-colors py-1">
                    {label || target}
                </button>
            );
        }
        return part;
      });
  };

  return (
    <div className="w-full h-[100dvh] bg-black font-mono relative overflow-hidden flex flex-col p-2 md:p-8 text-[#39ff14]">
      <style>{`
        .scanline { position: absolute; width: 100%; height: 2px; background: ${THEME_DR}22; animation: scan 4s linear infinite; pointer-events: none; z-index: 100; } 
        @keyframes scan { 0% { top: -100%; } 100% { top: 100%; } }
        
        /* [추가된 부분] 기억 소실 효과 */
        @keyframes memoryFade {
          0% { opacity: 1; filter: blur(0px); }
          50% { opacity: 0.7; filter: blur(1px); color: #ff5555; }
          100% { opacity: 0.1; filter: blur(3px); pointer-events: none; } 
        }

        .vanishing-text {
          animation: memoryFade 5s ease-in-out forwards;
        }

        .dream-layer {
          border-left: 2px solid #00ffff;
          padding-left: 1rem;
        }
      `}</style>
      <div className="absolute inset-0 scanline"></div>
      
          <header className="flex justify-between items-end border-b-2 border-[#39ff14] pb-2 md:pb-4 mb-2 md:mb-4 shrink-0">
        <div>
          <h1 className="text-lg md:text-3xl font-bold tracking-widest uppercase flex items-center gap-2">
            <LizardIcon size={26} className="md:w-6 md:h-6 animate-pulse" /> 
            <span className="truncate">DOMESTIC_REPTILIAN</span>
          </h1>
          <p className="text-[10px] md:text-xs opacity-60">SURVEILLANCE MODE: ACTIVE</p>
        </div>
        <div className="text-right hidden md:block">
           <div className="flex items-center gap-2">
              <span className="text-xs">STATUS:</span>
              <span className="font-bold animate-pulse">HIDDEN</span>
           </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 relative">
        {isMobileMenuOpen && (
            <div className="absolute inset-0 bg-black/80 z-20 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        <aside className={`absolute md:relative z-30 h-full w-[80%] max-w-[300px] md:w-64 bg-black md:bg-transparent border-r border-[#39ff14]/30 flex flex-col gap-1 overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0 border-r border-[#39ff14] shadow-[10px_0_30px_rgba(57,255,20,0.2)]' : '-translate-x-[110%] md:translate-x-0'} top-0 left-0 pl-2 pt-2 md:pl-0 md:pt-0`}>
          <div className="md:hidden flex justify-between mb-4 pb-2 border-b border-[#39ff14] pr-4 pt-2">
              <span className="font-black">FILE_SYSTEM</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
          </div>
          {Object.keys(LOCAL_DATA).filter(k => !LOCAL_DATA[k].hidden).map(file => (
            <button key={file} onClick={() => accessFile(file)} className={`text-left px-4 py-3 md:px-2 md:py-2 text-sm md:text-base truncate transition-all duration-300 ${currentFile === file ? 'font-bold bg-[#39ff14]/20' : 'hover:bg-[#39ff14]/10 active:bg-[#39ff14]/20'}`}>{file}</button>
          ))}
        </aside>

        <main ref={mainScrollRef} className="flex-1 overflow-y-auto p-2 scrollbar-hide">
           <div className="space-y-4 leading-relaxed animate-in fade-in duration-700 pb-20 md:pb-0">
             <div className="border-b border-[#39ff14]/50 pb-2 mb-4">
                <h2 className="text-lg md:text-xl font-black px-2 inline-block bg-[#39ff14] text-black break-all">{LOCAL_DATA[currentFile].title}</h2>
             </div>
			 
			 
			 {/* === [핵심 로직: 회차별 분기] === */}
     <div className={`whitespace-pre-wrap text-sm md:text-base ${LOCAL_DATA[currentFile].type === 'dream' ? 'dream-layer' : ''}`}>
        {(() => {
            const count = visitCounts[currentFile] || 1;
            const isDream = LOCAL_DATA[currentFile].type === 'dream';

            // 1. 꿈 파일이 아니면 그냥 출력
            if (!isDream) return parseLinks(LOCAL_DATA[currentFile].content);

            // 2. 꿈 파일 - 3회차 이상 (완전 소실)
            if (count >= 3) {
                return (
                    <div className="text-cyan-500 font-mono">
                        <p>[CRITICAL ERROR: DATA_LOSS]</p>
                        <p>해당 메모리 섹터는 영구적으로 손상되었습니다.</p>
						
                        <p>복구 불가능.</p>
                        <br/>
						<p> 왜 계속 들여다본 건가요? </p>
                        <p>&gt; SYSTEM: 누군가 당신에게 업혔던 기억 때문인가요?</p>
                    </div>
                );
            }

            // 3. 꿈 파일 - 2회차 (붕괴 시작)
            if (count === 2) {
                return (
                    <div className="vanishing-text text-cyan-400">
                        <p className="font-bold mb-2">[WARNING: MEMORY DECAY DETECTED]</p>
                        {parseLinks(LOCAL_DATA[currentFile].content)}
                    </div>
                );
            }

            // 4. 꿈 파일 - 1회차 (정상)
            return parseLinks(LOCAL_DATA[currentFile].content);
        })()}
     </div>
   </div>
</main>
        
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden absolute bottom-2 right-2 z-40 bg-black border border-[#39ff14] p-3 rounded-full text-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.4)] active:scale-95">
            <Menu size={24} />
        </button>
      </div>

      <footer className="mt-2 md:mt-4 border-t border-[#39ff14]/30 pt-2 md:pt-4 flex flex-col h-28 md:h-32 shrink-0">
    <div className="flex-1 overflow-y-auto text-[10px] md:text-xs opacity-50 space-y-1 mb-2" ref={scrollRef}>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
        <div ref={(el) => el?.scrollIntoView()} />
    </div>
    <div className="flex items-center gap-2 p-2 bg-[#39ff14]/10">
        <span className="blink">{'>'}</span>
        <input 
            type="text" 
            className="bg-transparent border-none outline-none flex-1 text-base md:text-sm uppercase font-mono text-[#39ff14]" 
            value={inputVal} 
            onChange={e => setInputVal(e.target.value)} 
            onKeyDown={e => {
                if(e.key === 'Enter'){
                    // 로그에는 유저가 입력한 그대로(혹은 대문자 느낌으로) 
                    setLogs(p => [...p, `> ${inputVal}`]);
                    
                    // [핵심 수정] 입력값을 무조건 '공백제거 + 소문자'로 변환하여 변수에 저장
                    const cmd = inputVal.trim().toLowerCase();

                    // Secret Password Logic for PANDOMONIUM
                    // 이제 inputVal 대신 변환된 cmd와 비교
                    if (currentFile === 'USER_P_LOCK.LOG' && cmd === 'lystrosaurus') {
                        
                        const memCount = visitCounts['PANDO_MEM.DAT'] || 0;
                        
                        if (memCount === 0) {
                            setLogs(p => [...p, `> ACCESS GRANTED. DECRYPTING MEMORY...`]);
                            setTimeout(() => accessFile('PANDO_MEM.DAT'), 800);
                        } else {
                            setLogs(p => [...p, `> WARNING: MEMORY SECTOR UNSTABLE.`, `> REDIRECTING TO SUB-LAYER...`]);
                            setTimeout(() => accessFile('PANDO_DREAM_01.LOG'), 1000);
                        }
                        
                        setInputVal("");
                        return;
                    }

                    // Restore Logic
                    // 여기도 cmd와 비교합니다.
                    if (currentFile === 'RESTORE_REQ' && cmd === 'pandoqwerasdf') {
                        setLogs(p => [...p, `> ADMIN ACCESS GRANTED. RESTORING DELETED SECTOR...`]);
                        setTimeout(() => accessFile('PANDO_TRUE_END.DAT'), 1000);
                        setInputVal("");
                        return;
                    }

                    setInputVal(""); 
                    
                    // 일반 파일 이동 (파일명 키값은 대문자이므로 다시 대문자로 변환해서 체크)
                    if(LOCAL_DATA[cmd.toUpperCase()]) accessFile(cmd.toUpperCase());
                }
            }} 
            placeholder="INPUT COMMAND..." 
        />
    </div>
</footer>
    </div>
  );
};


// ==================================================================================
// PART 2: WT5 SYSTEM (ACT 2 & 3 - ST GAMES INFILTRATION)
// ==================================================================================

// [LOGS DATABASE]
const TRACKING_LOGS = [
  { id: "LOG_0xPQ", t: 4102450000, view: "PLAYER", label: "ANCHOR_137 16:50", txt: "대상 접촉 확인됨. 플레이어 P와 H. 현재 위치: 섹터 7." },
  { id: "LOG_0xFF", t: 4102451000, view: "ADMIN", label: "ANCHOR_221 23:55", txt: "[경고] 허가받지 않은 접속. 외부 터미널 감지." },
  { id: "LOG_0xNY", t: 4102452000, view: "PLAYER", label: "ANCHOR_250 00:00", txt: "역천의 천문대 계약 실패자들 추적 필요. Q 확인." },
  { id: "LOG_0xAT", t: 4102448000, view: "OBSERVER", label: "ANCHOR_256 22:00", txt: "[역행 감지] 타겟의 좌표가 1시간 전으로 점프했습니다.", type: "regression" },
  { id: "LOG_0xHH", t: 4102500000, view: "FUTURE", label: "ANCHOR_000", txt: "예정된 종말.", meta: "PREDICTION" },
];

const WT5_DATA = {
  'INDEX.LOG': {
    title: "WELCOME_USER.EXE",
    type: "system",
    security: 0,
    content: `
      ST GAMES INDUSTRIES UNIFIED OS [v.4.2]
      COPYRIGHT 2075-2077 ST GAMES INDUSTRIES
      
      [환영합니다, [임시] 관리자님.]
      
      현재 귀하의 신경망 접속 상태는 [안정] 입니다.
      이 터미널은 당신의 '표면 의식' 데이터를 정리하는 공간입니다.
      해당 내부망에서 [ST GAMES] 사의 기밀 개발 자산과,
      [말소됨] 프로토콜의 유출이 이루어질 시 계약이 무통보 해제될 수 있음을 다시 안내드립니다.
	  
      "We don't make Games. We build Realities."
      
      [[GUIDE.TXT|직원 매뉴얼 열람]]
      [[NEWS.TXT|최신 뉴스 피드]]
      [[CODEX.ARCHIVE|>> [보안] 통합 로그 아카이브]]
      [[PROJECTS.DOC|>> 진행 중인 프로젝트]]
      [[DEV_LOG_PUBLIC.TXT|>> 개발자 업데이트]]
      
      [[HR.ls| 인사 평가 결과 및 연봉 인상 내역]]
      
      
      본 기록은 외부 공개용이 아니므로, 열람에 주의해주시기 바랍니다. 
      
      경고: 링크를 클릭하면 해당 파일의 암호화가 해제되어 목록에 등록됩니다.
    `       
      
  },
  'CODEX.ARCHIVE': {
    title: "ARCHIVE_INDEX_V8",
    type: "special", 
    security: 3,
    content: `
      [접근 승인]
      사내 전체 로그 인덱스를 로드합니다.
      경고: 해당 파일은 난수화 처리가 되어 있습니다.
      
      [[RNG_CORE.DAT|>> 완전 난수 생성기 설정 확인]]
    `
  },
  'RNG_CORE.DAT': {
    title: "ENTROPY_GENERATOR",
    type: "system",
    security: 2,
    content: `
      === TRUE RANDOMNESS GENERATOR ===
      
      ST GAMES의 모든 보안은 '예측 불가능성'에 기초합니다.
      우리는 의사난수(Pseudo-Random)를 사용하지 않습니다.
      우리는 우주의 배경 복사 노이즈를 직접 사용합니다.
      
      [[LEFT_EYE.KEY|>> [도구] 왼쪽 눈 (Left Eye) 다운로드]]
    `
  },
  'LEFT_EYE.KEY': {
    title: "TOOL: TRUE_SIGHT",
    type: "tool",
    security: 4,
    hideFromSidebar: true, 
    action: "unlock_eye",
    content: `
      [도구 설치 완료]
      '왼쪽 눈'이 활성화되었습니다.
      이제 무작위 속에 숨겨진 '시간의 흐름'을 볼 수 있습니다.
      CODEX.ARCHIVE의 암호화가 실시간으로 해제됩니다.
      
      [[CODEX.ARCHIVE|>> 아카이브 재접속]]
    `
  },
   'HR.ls': {
    title: "USER_EVALUATION",
    type: "system",
    security: 0,
    content: `
      === 인사 평가 요약 ===
      
      대상: 관리자 (임시)
      등급: D-
      
      [평가 코멘트]
      "호기심이 너무 많음. 접근 권한이 없는 파일을 자꾸 열어보려 함."
      
      아래 링크에서 상세 급여 내역을 확인할 수 있으나,
      보안 규정상 열람 시 로그가 남습니다.
      
      [[fs.cat|>> [경고] 상세 데이터 열람]]
    `
  },
   'fs.cat': {
    title: "RESTRICTED_AREA",
    type: "danger",
    security: 1,
    content: `[데이터 로딩 중...]` 
  },  
  
  
  
  'GUIDE.TXT': {
    title: "USER_MANUAL",
    type: "system",
    security: 0,
    content: `
      === 터미널 사용법 ===
      1. 텍스트 중 [[HIGHLIGHTED|빛나는 글자]]는 하이퍼링크입니다.
      2. 클릭하면 파일이 '복구'되어 사이드바 목록에 저장됩니다.
      
      [[INDEX.LOG|메인으로 돌아가기]]
    `
  },
  'NEWS.TXT': {
    title: "DAILY_FEED_2099",
    type: "archive",
    security: 1,
    content: `
      [시스템 공지 - 20XX.12.31]
      서버 이전 작업이 취소되었습니다. 관리자가 실종되었습니다.
      
      [[MARKET.TXT|거래소 바로가기]]
    `
  },
  'MARKET.TXT': {
    title: "DEEP_BAZAAR",
    type: "market",
    security: 1,
    content: `
      === 거래소 (가격 단위: Player) ===
      | 물품명 | 가격 | 재고 | 판매자 |
      | :--- | :--- | :--- | :--- |
      | 타인의 행복한 기억 | 2P | 65 | F.F. |
      | 녹화된 악몽 (VHS) | 1P | 1 | 악몽의 주인 |
      | [편집됨]의 잘린 손가락 | 15P | 0 | ADMIN |
      [[INDEX.LOG|돌아가기]]
    `
  },
  'LOCATION_404.LOG': {
    title: "LOC: SUNKEN_CATHEDRAL",
    type: "location",
    security: 2,
    content: `
      좌표: [DATA EXPUNGED]
      심도 4000m: 안쪽에 수천 개의 눈동자가 관측됨. 외눈으로 추정. 
    `
  },
  'PROJECTS.DOC': {
    title: "ACTIVE_PROJECTS",
    type: "archive",
    security: 1,
    content: `
      [진행 중인 프로젝트 트리]
      
      1. PROJECT: Baby Monitor (상태: <span style="color:red">오염됨</span>)
         - 플레이어 웹캠 복제 이슈. 
         - [[INCIDENT_099.LOG|>> 사고 기록 보기]]
      
      2. PROJECT: CONCLUDE
         - [상위 권한 필요] 텍스트 스트리밍 기반 의식 전송.
         - [[CONCLUDE_CORE.md|>> 핵심 설계서 열람]]
         - [[SANITY_PIPELINE.md|>> 인지 오염 파이프라인]]
         
      3. PROJECT: ATHANAS
         - [최고 기밀] 불멸을 위한 말소 프로토콜.
         - [[ATHANAS_POLICY.txt|>> [주의] ATHANAS 보안 정책]]
		 
      . [[UNKNOWN_ASSET.DAT|>> [손상된 파일] ]]
    `
  },
  
    'UNKNOWN_ASSET.DAT': {
    title: "ASSET_#404",
    type: "glitch",
    security: 2,
    content: `
      [데이터 로드 실패]
      
	  해당 개체는 식별되지 않습니다.
      시스템 상에서 분류할 수 없는 '잉크 얼룩'이 감지되었습니다.
      이 얼룩은 바이너리 데이터가 아닙니다.
      안타깝게도 이것은 유기물로 추정됩니다. 
      
      시스템이 이 파일의 존재를 거부합니다.
      
	  [[ATHANAS_INCIDENTS.log|>> ■■■■■■ 관련 기록]]
	  
	  파파비오는 더이상 존재하지 않습니다.
      파일을 보존하시겠습니까?
	  당신이 마지막으로 기억하는 그것의 이름을 커맨드창에 입력해보세요. 
	  
    `
  },
 'DEV_LOG_PUBLIC.TXT': {
    title: "WEEKLY_UPDATE",
    type: "archive",
    security: 1,
    content: `
      작성자: 수석 개발자 K
      
      이번 주 업데이트 내역:
      - 물리 엔진 버그 수정: 특정 지역에서 좌표값 이상이 발생할 시 오브젝트가 기존 스냅샷을 무시하고 복제되는 현상 픽스. 
	  * 현재 확인된 지역: 수도교회 도서관 본관 지하 24층(좌표 기재 별첨)
      - 텍스처 오류: NPC의 얼굴이 간헐적으로 '노이즈'로 바뀌는 현상... 수정 시도 중.
      
      [추가 확인 사항]
      '서버실에서 이상한 소리가 들린다', '수천 명의 사람들이 동시에 속삭이는 소리로 추정된다' 등의 소문이 존재.
	  현재 프로젝트 C에 투입된 플레이어의 수는 그 이하이므로 추가 투입이 있었는지 확인 필요.
      
      <EncryptedText text="아직 완성을 덜 했어요" />
    `
  },  

  'CONCLUDE_CORE.md': {
      title: "CONCLUDE_CORE",
      type: "system",
      security: 3,
      hideFromSidebar: true,
      content: `
        === PROJECT CONCLUDE: TEXT STREAMING PROTOCOL ===
        
        [개요]
        [[CONCLUDE.INI|>> [CONCLUDE.INI] ]]
        
        [목적]
        1. 보안: 사용자의 로컬 캐시에 완성된 문장이 저장되는 것을 방지.
        2. 동기화: 사용자가 글자를 읽는 속도와 서버의 연산 속도를 일치시켜, 사용자의 사고 회로를 서버의 클럭에 종속시킨다.
        
        [리스크]
        스트리밍 버퍼가 넘칠 경우, 사용자의 단기 기억이 서버 데이터로 덮어씌워질 수 있음.
        
        // 주석: 이거 읽는 사람이 곧 버퍼가 되는 구조 아님?? - Dev_J
        // 주석: 기록 남기지 마라. - Admin_K
        
        [[PROJECTS.DOC|상위 폴더로]]
      `
  },
  
  'CONCLUDE.INI':{
      title: "CONCLUDE",
      type: "archive",
      security: 5,
      content: `
      왜 당신이 이걸 보고 있지?
      `
  },  
  'SANITY_PIPELINE.md': {
      title: "INFECT_VECTOR_ANALYSIS",
      type: "danger",
      security: 4,
      hideFromSidebar: true,
      content: `
        === 인지 오염 파이프라인 (Sanity Pipeline) ===
        
        [감염 경로 분석]
        1. 시각 정보 입력 (텍스트 인식)
        2. 내면의 발화 (Subvocalization): 사용자가 무의식적으로 문장을 속으로 읽음.
        3. 언어 근육 미세 진동 발생.
        4. 신경망 역류: 해당 진동 패턴을 통해 시스템 코드가 뇌신경으로 업로드됨.
        
        [진행 단계]
        - 1단계: 두통 및 이명.
        - 2단계: 시스템이 자신을 보고 있다는 느낌.
        - 3단계: 자신의 기억과 게임 설정을 혼동.
        - 4단계: [ATHANAS] 프로토콜에 의한 자아 편집.
        
        [완화책?]
        없음. 
		(* 참고: 'Sanity 수치'는 보이는 것과 다릅니다.)
        
        [[PROJECTS.DOC|상위 폴더로]]
      `
  },
  'ATHANAS_POLICY.txt': {
      title: "PROTOCOL: HERETIC SLAYER",
      type: "danger",
      security: 5,
      hideFromSidebar: true,
      content: `
        === ATHANAS 보안 정책 (Protocol ATHANAS) ===
        
        "기록되지 않은 것은 존재하지 않았던 것이다."
        
		본 문서는 ATHANAS 보안 정책 규칙 중 일부의 발췌본으로, 전체 문서는 별도의 정신망을 이용하여 열람하여 주시기 바랍니다.
		
        규칙 1.
        모든 인명, 지명, 시간 정보는 시스템의 필요에 따라 실시간으로 수정/삭제할 수 있습니다.
		이력은 보존 대상이 아닙니다. 
		
		규칙 2.
		그는 이 세계에서 유일하게 인과율을 재작성할 권한을 가진 개체입니다. 해당 내용을 잊지 마세요.
		
		규칙 3.
		세이브 포인트 생성 조건은 프로토타입 테스트 시뮬레이션과 동일합니다. 
		(* 현재의 최대 지속 시간은 의도적 설정입니다. 파라미터 수정 전 반드시 초기값을 백업하세요. 복구가 불가능할 수 있습니다.)
		
		[내규 2: 망각 강제]
		
		규칙 5.
		해당 존재가 확인되지 않는 인스턴스는 즉시 파괴되어야 합니다.
		
		규칙 6.
		아더갓들이 말하는 방주는 지역: 다크렐름이 아닙니다. 그들은 이것을 혼동하고 있지 않으나, 착각하는 척 하거나, 외부 요인으로 인하여 착각하게 되었을 경우, 그대로 두십시오.
		(* 적극적인 배제는 현 시점으로서는 권장되지 않습니다.)
        
		규칙 9.
		당신이 해당 규칙을 이해하지 못하더라도 규칙은 적용됩니다. 
		
        [[ATHANAS_INCIDENTS.log|>> 관련 사고 기록]]
        [[INDEX.LOG|메인으로 (탈출)]]
      `
  },
  'ATHANAS_INCIDENTS.log': {
      title: "INCIDENT_LOG_ATHANAS",
      type: "danger",
      security: 1,
      hideFromSidebar: true,
      content: `
	  
	    [이전 기록 삭제됨]
		
        [로그 #107]
        - 일시: 상세 타임스탬프 열람 권한 필요 
		- 상태: 안정화 완료
		- 요약: 일시적 충돌 발생  
        - 조치: 무결성 검사 후 오류 삭제 
		- 비고: 재검증 필요
        
        [로그 #160]
		- 일시: 중첩일자 제거 필요
		- 상태: 
		- 요약: 어뷰징 현상 발생
		- 조치: 세이브 포인트 재점검
		
		
        [로그 #223]		
		- 일시: [제거됨]
		- 상태: 백업 완료
		- 요약: 프로토콜 무단 탈취 시도
		- 조치: 해당 시점까지의 인스턴스 복제 및 백업
		
		
		[로그 #316]
        - 일시: 현재
        - 사건: 외부 침입자가 파일 열람 중.
        
        조치 없음.
        조치 완료.
        
        (두 문장은 동시에 존재할 수 없습니다. 시스템 오류.)
		
      `
  },
  'INCIDENT_099.LOG': {
    title: "INCIDENT_RPT_099",
    type: "danger",
    security: 2,
    content: `
      사고 보고서 #099
      대상: QA 테스터 'P'
      내용: 
      입력이 시뮬레이션 내부에서 발생하는 오류.
	  비고: 
	  일전의 PROJECT MIRROR 찌꺼기가 아직 사라지지 않은 것으로 보입니다.
	  
    `
  },
    'SYSTEM.ERR': {
    title: "FATAL_ERROR",
    type: "glitch",
    security: 99,
    trap: true,
    content: `
      나는 오류가 아니야.
      나는 오류가 아니야.
      나는 오류가.......
      
    `
  },

  'FINAL_UPLOAD.EXE': {
    title: "END_SESSION",
    type: "system",
    security: 99,
    content: `
      [동기화 완료]
      육체 연결 해제: [성공]
      의식 데이터 업로드: [진행 중]
    `
  }
};
const Wt5System = () => {
  const [isPoweredOff, setIsPoweredOff] = useState(false);
  
  // State
  const [currentFile, setCurrentFile] = useState('INDEX.LOG');
  const [visitCounts, setVisitCounts] = useState({});
  const [discoveredFiles, setDiscoveredFiles] = useState(['INDEX.LOG', 'GUIDE.TXT', 'NEWS.TXT']);
  const [sanity, setSanity] = useState(100);
  const [logs, setLogs] = useState(["Initialize... OK", "Link established... OK"]);
  const [inputVal, setInputVal] = useState("");
  // 미궁(Puzzle) 관련 상태 제거됨
  
  const [hasTruthAccess, setHasTruthAccess] = useState(false); // 스토리 보상(진실) 해금 여부

  const [trapStage, setTrapStage] = useState(0); // 아타나스 함정카드

  // Wt5System 내부
  const [isHappyMode, setIsHappyMode] = useState(false); // HAPPY 이스터에그용
  const [isNyaMode, setIsNyaMode] = useState(false);     // NYAPOLEON 이스터에그용
  
  // Features
  const [hasLeftEye, setHasLeftEye] = useState(false);
  const [codexSeed, setCodexSeed] = useState(0); 
  const [isCorrupted, setIsCorrupted] = useState(false); // Act 3 State

  // === [NEW] 추가된 상태 변수 ===
  const [isPermanentCurse, setIsPermanentCurse] = useState(false); // Feature 1: 다시는 닫을 수 없는 파일 효과
  const [awaitingChoice, setAwaitingChoice] = useState(false);     // Feature 2: 선택지 대기 상태
  const [godMode, setGodMode] = useState(false);                   // Feature 2: Y 선택 시 Sanity 고정

  // UI Effects
  const [isGlitching, setIsGlitching] = useState(false);
  const [isDistorted, setIsDistorted] = useState(false);
  const [popups, setPopups] = useState([]);
  const [isTrapped, setIsTrapped] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const scrollRef = useRef(null);
  
  const mainScrollRef = useRef(null);

  const IS_CRAZY = sanity < 40;
  const IS_UPLOADING = currentFile === 'FINAL_UPLOAD.EXE';

  useEffect(() => {
    if (mainScrollRef.current) {
        mainScrollRef.current.scrollTop = 0;
    }
  }, [currentFile]);

  // Sanity & Glitch Loop
  
  useEffect(() => {
    if (currentFile === 'ATHANAS_INCIDENTS.log') {
      setTrapStage(0); // 처음엔 안 보임

      // 2초 뒤에 "치지직(1단계)" 시작
      const glitchTimer = setTimeout(() => {
        setTrapStage(1);
      }, 2000);

      // 그로부터 0.5초 뒤(총 2.5초 뒤)에 "텍스트(2단계)" 등장
      const showTimer = setTimeout(() => {
        setTrapStage(2);
      }, 2500);

      return () => {
        clearTimeout(glitchTimer);
        clearTimeout(showTimer);
      };
    } else {
      setTrapStage(0); // 다른 파일로 가면 초기화
    }
  }, [currentFile]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      // godMode일 때는 글리치 확률만 남기고 Sanity 감소 효과 등은 무시될 수 있음
      if (sanity < 80 && Math.random() > 0.95 && !IS_UPLOADING) {
        setLogs(prev => [...prev.slice(-4), `> WARNING: Signal instability detected.`]);
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [sanity, IS_UPLOADING]);

  // Trap & Upload Loop
  useEffect(() => {
    let interval;
    if (isTrapped) {
      interval = setInterval(() => {
        if (popups.length < 20) {
           const id = Date.now() + Math.random();
           const titles = ["SEGMENTATION_FAULT", "MEMORY_LEAK", "ATHANAS_REJECT", "NULL_POINTER", "SOUL_EXCEPTION"];
           const title = titles[Math.floor(Math.random() * titles.length)];
           const maxX = window.innerWidth - (window.innerWidth < 768 ? 100 : 300);
           const maxY = window.innerHeight - 200;
           setPopups(prev => [...prev, { id, x: Math.max(10, Math.random()*maxX), y: Math.max(50, Math.random()*maxY), title, type: 'error' }]);
        }
      }, 400); 
    }
    
    // godMode가 아닐 때만 Sanity 고갈로 인한 업로드 진행
    if (!godMode && sanity <= 0 && currentFile !== 'FINAL_UPLOAD.EXE') {
        setCurrentFile('FINAL_UPLOAD.EXE');
        setLogs(prev => [...prev, "> CRITICAL: SANITY DRAINED. INITIATING UPLOAD."]);
    }

    if (currentFile === 'FINAL_UPLOAD.EXE') {
        const upInterval = setInterval(() => {
             setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(upInterval);
                    setTimeout(() => setIsPoweredOff(true), 2000);
                    return 100;
                }
                return prev + 0.2;
             });
        }, 50);
        return () => clearInterval(upInterval);
    }
    return () => clearInterval(interval);
  }, [isTrapped, popups.length, sanity, currentFile, godMode]);

  const processedLogs = useMemo(() => {
    let displayLogs = [...TRACKING_LOGS];
    if (!hasLeftEye) {
         for (let i = displayLogs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [displayLogs[i], displayLogs[j]] = [displayLogs[j], displayLogs[i]];
         }
    } else {
         displayLogs.sort((a, b) => a.t - b.t);
    }
    return displayLogs;
  }, [codexSeed, hasLeftEye]);

  // Corruption Text Processor (Modified for Feature 1)
   const processCorruptedText = (text) => {
      let processed = text;

      // 1. HAPPY 모드 (글자 깨짐)
      if (isHappyMode) {
          return processed.split('').map(char => {
              if (char === ' ' || char === '\n') return char;
              return String.fromCharCode(0x25A0 + Math.random() * 90); 
          }).join('');
      }

      // 2. NYAPOLEON 모드 (고양이 말투) - 여기가 핵심입니다
      if (isNyaMode) {
          // '다'로 끝나는 문장을 '다냥'으로 변경
          processed = processed.replace(/다(\.|\s|$)/g, '다냥$1');
          // 마침표, 느낌표 뒤에 '..냐옹' 추가
          processed = processed.replace(/(\.|\!|\?)/g, '..냐옹$1'); 
          // 문장 끝에 이모티콘 추가 (랜덤하게)
          if (Math.random() > 0.5) processed += " ฅ^•ﻌ•^ฅ";
      }

      // 3. 영구 저주 (Feature 1)
      if (isPermanentCurse) {
         if (Math.random() > 0.7) return "[UNREADABLE_SEGMENT]";
         processed = processed.replace(/[aeiou]/g, "■");
      }

      // 4. 일반 오염 로직 (기존 유지)
      if (!isCorrupted) return processed;
      
      processed = processed.replace(/ST GAMES/g, "별하늘");
      processed = processed.replace(/Player/g, "THE_WATCHED");
      processed = processed.replace(/플레이어/g, "주시받는 자");
      processed = processed.replace(/관리자/g, "관측자");
      processed = processed.replace(/System/g, "THE FIRMAMENT");
      processed = processed.replace(/\b[A-Z]\b/g, "[REDACTED]"); 
      processed = processed.replace(/ATHANAS/g, "■■■■■■");
      
      if (Math.random() > 0.8) {
          processed += "\n\n> SYSTEM_MSG: WE SEE YOU.";
      }
      return processed;
  };

  const accessFile = (filename) => {
    // Feature 2: 선택지를 기다리는 중에는 파일 이동 불가
    if (awaitingChoice) {
        setLogs(prev => [...prev, "> SYSTEM PAUSED. AWAITING INPUT (Y/N)."]);
        return;
    }
    
    if (isTrapped || IS_UPLOADING) return;
    
    const newCount = (visitCounts[filename] || 0) + 1;
    setVisitCounts(prev => ({...prev, [filename]: newCount}));

    if (!WT5_DATA[filename]) {
      setLogs(prev => [...prev, `> bash: ${filename}: command not found`]);
      return;
    }

    // === [NEW] Feature 1 & Feature 2 Trigger Logic ===
    if (filename === 'ATHANAS_POLICY.txt') {
        // 3 번째 열람 시 저주 발동
        if (newCount === 3) {
            setIsPermanentCurse(true);
            setHasTruthAccess(true);
            setLogs(prev => [...prev, "> ALERT: IRREVERSIBLE ACTION DETECTED.", "> YOU CANNOT UNREAD THIS."]);
            
            // 저주 발동 후 잠시 뒤 선택지 트리거
            setTimeout(() => {
                setAwaitingChoice(true);
                setLogs(prev => [
                    ...prev, 
                    "", 
                    "> -------------------------",
                    "> DETECTION CONFIRMED.", 
                    "> CONTINUE INDEXING? (Y/N)",
                    "> -------------------------"
                ]);
            }, 1500);
        }
    }

    const fileData = WT5_DATA[filename];
    
    if (fileData.security > 2 && sanity > 50 && !discoveredFiles.includes(filename) && filename !== 'CODEX.ARCHIVE' && filename !== 'LEFT_EYE.KEY' && filename !== 'ATHANAS_POLICY.txt') {
      setLogs(prev => [...prev, `> sudo: permission denied (security level ${fileData.security})`]);
      return;
    }

    if (filename === 'LEFT_EYE.KEY') {
        setHasLeftEye(true);
        setLogs(prev => [...prev, `> DOWNLOADING TRUE_SIGHT...`, `> INSTALL COMPLETE.`]);
    }
    
    if (filename === 'ATHANAS_POLICY.txt' && !isCorrupted) {
        setIsCorrupted(true);
        setLogs(prev => [...prev, `> ALERT: MEMETIC HAZARD DETECTED.`, `> PROTOCOL ATHANAS: ACTIVE.`]);
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 1000);
    }

    let drain = 3;
    if (filename === 'CODEX.ARCHIVE') {
        setCodexSeed(Date.now());
        if (!hasLeftEye) {
            setSanity(prev => Math.max(0, prev - 15));
            setLogs(prev => [...prev, `> WARNING: DATA IS UNSTABLE. HIGH MENTAL LOAD.`]);
        } else {
            setSanity(prev => Math.max(0, prev - 2));
            setLogs(prev => [...prev, `> TRUE SIGHT ACTIVE: ORGANIZING CHAOS.`]);
        }
        drain = 0;
    }
    if (fileData.type === 'danger') drain = isCorrupted ? 20 : 15; 
    
    // 미궁(Puzzle) 관련 drain 제거됨
    
    // God Mode(Y 선택)일 경우 Sanity 감소 없음
        if (godMode || isHappyMode) drain = 0; 
 // Happy Mode일 때는 항상 100 유지, 아니면 감소
    setSanity(prev => isHappyMode ? 100 : Math.max(0, prev - drain));

    if (filename === 'fs.cat') {
      if (newCount === 1) {
         setLogs(prev => [...prev, `> WARN: Protected memory access attempt.`]);
      } else if (newCount === 2) {
         drain = 10;
         setLogs(prev => [...prev, `> KERNEL: Illegal instruction at 0x404040.`]);
         setIsGlitching(true);
         setTimeout(() => setIsGlitching(false), 500);
      } else if (newCount >= 3) {
         drain = 30;
         setLogs(prev => [...prev, `> CRITICAL: CORE DUMP INITIATED.`]);
         setIsDistorted(true);
         setTimeout(() => setIsDistorted(false), 2500);
         
         for(let i=0; i<50; i++) {
            const id = Date.now() + i;
            setPopups(prev => [...prev, { 
                id, 
                x: Math.random() * (window.innerWidth - 200), 
                y: Math.random() * (window.innerHeight - 200), 
                title: "CORE_DUMP_EXCEPTION", 
                type: 'error' 
            }]);
         }
		 
		 setTimeout(() => {
             setCurrentFile('SYSTEM.ERR'); // 화면 강제 전환
             setIsTrapped(true);           // 함정 모드 발동
         }, 750);
      }
    }
    
    setSanity(prev => Math.max(0, prev - drain));
    setCurrentFile(filename);

    if (!discoveredFiles.includes(filename) && !fileData.hideFromSidebar) {
        setDiscoveredFiles(prev => [...prev, filename]);
        setLogs(prev => [...prev, `> fsck: Recovered '${filename}' from sector.`]);
    } else if (!discoveredFiles.includes(filename) && fileData.hideFromSidebar) {
         setLogs(prev => [...prev, `> ACCESSING HIDDEN NODE: ${filename}`]);
    }

    setLogs(prev => [...prev, `> cat ${filename}`]);
    setIsMobileMenuOpen(false);
  };

const handleCommand = (e) => {
    if (e.key === 'Enter') {
      if (isTrapped || IS_UPLOADING) return;

      // 1. 입력값을 소문자로 변환 (대소문자 무시)
      const cmd = inputVal.trim().toLowerCase(); 
      
      // 로그에는 대문자로 출력 (간지)
      setLogs(prev => [...prev, `> ${inputVal.toUpperCase()}`]); 
      
      // 입력창 비우기
      setInputVal("");

      // === [이스터에그 체크 구간] (switch문보다 반드시 위에 있어야 함!) ===


      // 1. qwerasdf
      if (cmd === 'qwerasdf') {
          setLogs(prev => [
              ...prev, 
              "> ACCESS DENIED.", 
              "> ERROR: ACCOUNT ALREADY LOGGED IN."
          ]);
          return; // <--- 이 return이 없으면 아래쪽에서 에러가 뜹니다.
      }

      // 2. happy
      if (cmd === 'happy') {
          setIsHappyMode(true);
          setSanity(100); 
          setLogs(prev => [
              ...prev,
              "> TRAIT NOT FOUND: [천상천하 유아독존] ",
			  "> 해피해피 해페니시스께서 기뻐하십니다! ",
			  "> 해피해피! ",
              "> SANITY LOCKED AT 100%."
          ]);
          return; // <--- 필수
      }

      // 3. nyapoleon (문제의 구간)
      if (cmd === 'nyapoleon') {
          setIsNyaMode(true); // 상태 변경
          setLogs(prev => [
              ...prev,
              "> CAUTION: 가능충(Possibility_Lover) 바이러스 감지.", 
              "> 텍스트에 고양이 귀가 붙습니다."
          ]);
          return; // <--- 여기서 함수를 종료해야 "command not found"가 안뜸
      }

      // === Feature 2: Choice Handler ===
      if (awaitingChoice) {
          if (cmd === 'y') {
              // Y 선택 로직 (기존 유지)
              setAwaitingChoice(false);
              setGodMode(true); 
              setIsCorrupted(true);
              setLogs(prev => [
                  ...prev, 
                  "> PROCESSING...", 
                  "> SANITY: LOCKED.", 
                  "> ATHANAS LAYER: FULLY SYNCED.",
                  "> YOU MAY PROCEED. THERE IS NO TURNING BACK."
              ]);
          } else if (cmd === 'n') {
              // N 선택 로직 (기존 유지)
              setAwaitingChoice(false);
              setLogs(prev => [...prev, "> PROCESSING...", "> CONNECTION SEVERED BY USER."]);
              if (Math.random() > 0.5) {
                  setTimeout(() => {
                      setLogs(prev => [...prev, "> WARNING: SAFE LOGOUT FAILED.", "> DUMPING CONSCIOUSNESS..."]);
                  }, 300);
                  setTimeout(() => {
                      setCurrentFile('SYSTEM.ERR');
                      setIsTrapped(true);
                      setIsDistorted(true);
                  }, 1000);
              } else {
                  setTimeout(() => {
                      setLogs(prev => [...prev, "> DELETING LOCAL MEMORY...", "> YOU ARE SAFE NOW."]);
                  }, 300);
                  setTimeout(() => setIsPoweredOff(true), 1200);
              }
          } else {
              setLogs(prev => [...prev, "> ERROR: INVALID INPUT. ANSWER (Y/N)."]);
          }
          return;
      }

      // === 기존 기본 명령어 처리 (switch) ===
      const parts = cmd.split(' ');

      switch (parts[0]) {
        case 'help': setLogs(prev => [...prev, "Commands: list, open [file], clear"]); break;
        case 'list': setLogs(prev => [...prev, "--- DIRECTORY LISTING ---", ...discoveredFiles.join("  ")]); break;
        case 'open': if (parts[1]) accessFile(parts[1].toUpperCase()); break;
        case 'clear': setLogs([]); break;
        case 'fabio': accessFile('SYSTEM.ERR'); break;

        // 위에서 걸리지 않은 모든 명령어는 여기서 에러 처리됨
        default: setLogs(prev => [...prev, `bash: ${parts[0]}: command not found`]);
      }
    }
  };

  const handleClosePopup = (id, multiply = false) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  const renderWikiContent = () => {
    if (currentFile === 'FINAL_UPLOAD.EXE') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 p-4">
                <h2 className="text-2xl md:text-4xl font-black text-[#45d4ff] animate-pulse">
                    {uploadProgress < 100 ? "CORE DUMP IN PROGRESS..." : "SYSTEM HALTED"}
                </h2>
                <div className="w-full max-w-md border-2 border-[#45d4ff] p-1 h-8">
                    <div className="h-full bg-[#45d4ff] transition-all duration-300" style={{width: `${uploadProgress}%`}}></div>
                </div>
                <div className="text-[#45d4ff] opacity-80 font-mono text-sm space-y-1 text-left w-full max-w-md overflow-hidden h-32">
                    <p>[ {performance.now().toFixed(2)} ] Initiating Neural Uplink...</p>
                    {uploadProgress > 30 && <p>[ {performance.now().toFixed(2)} ] Bypassing Hippocampus Firewall...</p>}
                    {uploadProgress > 60 && <p className="text-red-500">[ {performance.now().toFixed(2)} ] WRITING TO LONG-TERM MEMORY...</p>}
                    {uploadProgress > 90 && <p className="text-red-500 font-bold">[ {performance.now().toFixed(2)} ] ATHANAS: IDENTITY ERASED.</p>}
                </div>
            </div>
        )
    }

    if (currentFile === 'CODEX.ARCHIVE') {
        return (
            <div className="animate-in fade-in duration-500 pb-20 md:pb-0 font-mono">
                <div className="border-b-2 border-[#45d4ff] pb-2 mb-4 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold bg-[#45d4ff] text-black px-2 inline-block">CODEX_ARCHIVE</h2>
                    {hasLeftEye ? <div className="flex items-center gap-2 text-red-400 animate-pulse"><Eye size={8}/><span>ACTIVE</span></div> : <div className="text-xs opacity-50">ENCRYPTED: RANDOMIZED</div>}
                </div>
                <div className="space-y-4">
                    <div className="bg-[#002244] p-4 text-xs md:text-sm border border-[#45d4ff]/30">
                        {WT5_DATA['CODEX.ARCHIVE'].content.split('\n').map((line, i) => {
                             if(line.includes('[[')) {
                                 const [target, label] = line.split('[[')[1].split(']]')[0].split('|');
                                 return <button key={i} onClick={() => accessFile(target)} className="block mt-2 text-[#45d4ff] underline font-bold">{label}</button>
                             }
                             return <div key={i}>{line}</div>
                        })}
                    </div>
                    {processedLogs.map((log, i) => {
                        const isRegression = hasLeftEye && i > 0 && log.t < processedLogs[i-1].t;
                        return (
                            <div key={log.id} className={`p-2 border-l-2 ${isRegression ? 'border-red-500 bg-red-900/10' : 'border-[#45d4ff]/30'} ${hasLeftEye ? '' : 'opacity-70 blur-[0.5px] hover:blur-none transition-all'}`}>
                                <div className="flex justify-between text-[10px] opacity-60 mb-1 font-bold">
                                    <span>ID: {log.id}</span>
                                    <span>{hasLeftEye ? log.label : log.label.split('').sort(() => 0.5 - Math.random()).join('')}</span>
                                </div>
                                <div className={`${isRegression ? 'text-red-400 font-bold' : ''}`}>
                                    {hasLeftEye ? log.txt : <EncryptedText text={log.txt} colorClass="text-[#45d4ff]" />}
                                </div>
                                {isRegression && <div className="text-red-500 text-xs font-black mt-1 animate-pulse">[!] TIME REGRESSION DETECTED</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    let data = WT5_DATA[currentFile];
    if (!data) return <div className="text-red-500">FILE CORRUPTED</div>;

    if (currentFile === 'fs.cat') {
        const count = visitCounts['fs.cat'] || 1;
        let contentOverride = "";
        
        if (count === 1) {
            contentOverride = `
                [보안 경고]
                상기 리스트는 사회공학 기법을 이용한 피싱 공격을 방지하기 위한 모의 피싱 훈련용 미끼였습니다.
				보안팀의 경고를 잊지 마세요.
                [[HR.ls|돌아가기]]
            `;
        } else if (count === 2) {
            contentOverride = `
                제가 한 경고를 잊어버렸나요?
                [[HR.ls|돌아가기]]
            `;
        } else if (count === 3) {
            contentOverride = `
                그만해.
                그만해.
                그만해.
                [[HR.ls|돌아가]]
            `;
        } else {
            contentOverride = `
                <span style="color:red; font-size: 1.2em; font-weight:bold;">
                제 경고를 잊어버렸나요?
                </span>
                
                [[HR.ls|...]]
            `;
        }
        data = { ...data, content: contentOverride };
    }

    const parseContentWithLinks = (text) => {
      // Act 3 Corruption Layer
      const parts = text.split(/(\[\[.*?\]\])/g);
      
      return parts.map((part, index) => {
        // 1. 링크인 경우 ([[TARGET|LABEL]])
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const content = part.slice(2, -2);
          const [target, label] = content.split('|');
          
          // 클릭하는 주소(target)는 원본 유지, 보여주는 이름(displayLabel)만 오염시킴
          const displayLabel = label || target;

          return (
            <button
              key={index}
              onClick={() => accessFile(target.trim())} // 여기는 오염되지 않은 원본 target 사용
              disabled={IS_UPLOADING}
              className={`text-[#45d4ff] hover:bg-[#45d4ff] hover:text-black font-bold underline decoration-dotted transition-colors mx-1 py-1`}
            >
              {processCorruptedText(displayLabel)} {/* 화면에 보이는 글자만 오염됨 */}
            </button>
          );
        }

        // 2. HTML 태그인 경우 (<span...>)
        if (part.includes('<span')) {
            // 태그 내부 텍스트도 오염시키고 싶다면 별도 처리가 필요
            return <span key={index} dangerouslySetInnerHTML={{__html: part}} />
        }

        // 3. 일반 텍스트인 경우 (여기서 오염 함수 적용)
        return <span key={index}>{processCorruptedText(part)}</span>;
      });
    };

    return (
      <div className="animate-in fade-in duration-500 pb-20 md:pb-0">
        <div className="border-b-2 border-[#45d4ff] pb-2 mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
          <h2 className={`text-xl md:text-2xl font-bold tracking-widest bg-[#45d4ff] text-black px-2 inline-block break-all ${IS_CRAZY || isCorrupted ? 'font-serif' : ''}`}>
            {IS_CRAZY || isCorrupted ? data.title.split('').reverse().join('') : data.title}
          </h2>
          <span className="text-xs blink">SEC_LVL: {data.security}</span>
        </div>
        
        <div className={`space-y-4 leading-relaxed opacity-90 text-sm md:text-base ${IS_CRAZY ? 'tracking-widest' : ''}`}>
           {data.content.split('\n').map((line, i) => {
             const trimmed = line.trim();
             if (trimmed.startsWith('===')) return <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-[#95e6ff] border-b border-[#45d4ff]/30">{processCorruptedText(trimmed.replace(/===/g, ''))}</h3>;
             if (trimmed.startsWith('> ')) return <div key={i} className="pl-4 border-l-4 border-[#45d4ff] italic text-[#95e6ff] my-2 bg-[#002200] p-2">{parseContentWithLinks(trimmed.replace('> ', ''))}</div>;
             if (trimmed.startsWith('|')) {
                if (trimmed.includes('---')) return null;
                const cells = trimmed.split('|').filter(c => c);
                return <div key={i} className="overflow-x-auto"><div className="grid grid-cols-4 gap-2 text-xs border-b border-[#45d4ff]/30 py-2 whitespace-nowrap min-w-[300px]">{cells.map((c, ci) => <span key={ci} className="truncate px-1">{processCorruptedText(c)}</span>)}</div></div>
             }
             if (trimmed.includes('<EncryptedText')) {
                const text = trimmed.match(/text="([^"]+)"/)?.[1] || "SECRET";
                return <div key={i} className="my-2"><EncryptedText text={text} colorClass="text-[#45d4ff] bg-[#002244]" /></div>;
             }
             if (trimmed.includes('<img')) {
               return (
                 <div key={i} className={`w-full h-32 md:h-48 border-2 border-dashed ${visitCounts['fs.cat'] >= 3 ? 'border-red-500' : 'border-[#45d4ff]'} flex flex-col items-center justify-center my-4 bg-[#001100]`}>
                   <ShieldAlert className="animate-pulse mb-2" />
                   <span className={visitCounts['fs.cat'] >= 3 ? "text-red-500 font-black" : ""}>{visitCounts['fs.cat'] >= 3 ? "FATAL_EXCEPTION" : "[IMAGE_DATA_CORRUPTED]"}</span>
                 </div>
               );
             }
             return <div key={i} className="min-h-[1rem] break-words">{parseContentWithLinks(trimmed)}</div>;
           })}
		   
		              {/* ▼▼▼ [여기 수정됨] 시간차 함정 연출: 붉은색 계통 -> 청회색 계통으로 변경 ▼▼▼ */}
 {currentFile === 'ATHANAS_INCIDENTS.log' && (
             <div className="mt-8 pt-4 min-h-[150px] relative">
               
               {/* 단계 1: 데이터 덤프 글리치 (매트릭스 코드처럼 쏟아짐) - 여기도 Blue/Cyan 계열로 변경 */}
               {trapStage === 1 && (
                 <div className="font-mono text-xs md:text-sm text-cyan-500 overflow-hidden opacity-90 leading-tight">
                   {Array(6).fill(0).map((_, i) => (
                     <div key={i} className="animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
                       {`0x${Math.floor(Math.random()*9999).toString(16).toUpperCase()} : FREEZING_SECTOR_AT_0x${Math.floor(Math.random()*999999).toString(16)}`}
                       <span className="text-cyan-300"> // MEM_LOCK</span>
                     </div>
                   ))}
                   <div className="mt-2 animate-bounce font-bold bg-cyan-600 text-black inline-block px-1">
                     {'>'} SYSTEM_FREEZE_DETECTED
                   </div>
                 </div>
               )}

               {/* 단계 2: BIOS 스타일 치명적 오류 경고창 - Red -> Slate/Cyan 변경 */}
               {trapStage === 2 && (
                 <div className="relative border-4 border-double border-slate-500 bg-slate-900 p-1 shadow-[0_0_20px_rgba(14,165,233,0.4)] animate-[pulse_0.2s_ease-in-out_1]">
                    
                    {/* 상단 헤더 바 */}
                    <div className="bg-slate-700 text-white font-black text-xs md:text-sm px-2 py-1 flex justify-between items-center mb-4">
                        <span className="animate-pulse">🌌 SYSTEM_INTERVENTION</span>
                        <span>ERR_#0x107</span>
                    </div>

                    {/* 본문 내용 */}
                    <div className="px-2 pb-2 text-center">
                        <div className="text-cyan-400 font-bold text-lg mb-2 tracking-widest" style={{textShadow: "2px 0px 0px rgba(14,165,233,0.3)"}}>
                             무결성 검사 실패
                        </div>
                        <div className="text-slate-300 text-xs md:text-sm font-mono mb-6 leading-relaxed border-t border-b border-slate-600/50 py-2">
                           해시값이 일치하지 않습니다. <br/>
                           강제 로드시 원본이 손상될 수 있습니다.<br/>
                           <span className="opacity-70 text-[10px] text-cyan-200">{'>'} 관리자 권한으로 강제 실행하시겠습니까?</span>
                        </div>
                        
                        {/* 강제 로드 버튼 (링크) */}
                        <div className="inline-block border-2 border-cyan-600 hover:bg-cyan-600 hover:text-black transition-colors duration-0 cursor-pointer group">
                           <div className="px-4 py-2 font-black text-sm md:text-base animate-pulse group-hover:animate-none text-cyan-400 group-hover:text-black">
                              {parseContentWithLinks("[[ATHANAS_POLICY.txt|>> [YES] FORCE_OVERWRITE]]")}
                           </div>
                        </div>
                    </div>

                    {/* 장식용 배경 노이즈 */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                 </div>
               )}
             </div>
           )}
           {/* ▲▲▲ [수정 완료] ▲▲▲ */}
           {/* ======================================================== */}
           {/* ▼▼▼ [여기 추가] 스토리 보상: 숨겨진 각주 (텍스트 맨 아래) ▼▼▼ */}
           {/* ======================================================== */}
           {hasTruthAccess && (
             <div className="mt-12 pt-6 border-t border-red-900/50 animate-in fade-in duration-1000">
               <div className="text-[10px] md:text-xs font-serif text-red-800 opacity-70 italic">
                 [SYSTEM]: 시스템은 당신이 이 문장을 읽고 있다는 것을 인지했습니다. 
                 <br/>
                 당신의 망막 패턴이 데이터베이스에 영구 저장되었습니다. (Ref: {currentFile})
               </div>
             </div>
           )}
           {/* ======================================================== */}
        </div>
      </div>
    );
  };

  if (isPoweredOff) {
      return (
        <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
             <div className="w-1 h-1 bg-white rounded-full animate-[ping_1s_ease-in-out_reverse] opacity-0"></div>
        </div>
      );
  }

  return (
    <div className={`
        w-full h-[100dvh] bg-black overflow-hidden relative font-mono selection:bg-[#45d4ff] selection:text-black 
        ${isGlitching ? 'translate-x-1' : ''}
        ${isDistorted ? 'animate-distortion opacity-80' : ''}
    `}>
      <style>{`
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes flicker { 0% { opacity: 0.9; } 50% { opacity: 1.0; } 100% { opacity: 0.9; } }
        @keyframes distortion { 0% { transform: skewX(0deg); filter: contrast(1); } 10% { transform: skewX(-5deg); filter: contrast(1.5) hue-rotate(90deg); } 20% { transform: skewX(5deg); filter: contrast(1.2); } 100% { transform: skewX(0deg); filter: contrast(1); } }
        .animate-distortion { animation: distortion 0.4s infinite linear; }
        .crt-scanline { width: 100%; height: 100px; z-index: 10; background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(51, 255, 0, 0.2) 50%, rgba(0,0,0,0) 100%); opacity: 0.05; position: absolute; bottom: 100%; animation: scanline 10s linear infinite; pointer-events: none; }
        .crt-overlay { background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); background-size: 100% 2px, 3px 100%; pointer-events: none; }
        .terminal-text { color: #45d4ff; text-shadow: 0 0 5px #45d4ff, 0 0 10px #45d4ff; }
        .blink { animation: flicker 0.1s infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <div className="absolute inset-0 z-50 pointer-events-none crt-overlay"></div>
      <div className="absolute inset-0 z-50 pointer-events-none crt-scanline"></div>
      
      {popups.map(popup => <KernelPanicOverlay key={popup.id} {...popup} onClose={handleClosePopup} />)}

      <div className={`relative z-0 h-full flex flex-col p-2 md:p-8 terminal-text font-mono transition-opacity duration-1000 ${isPoweredOff ? 'opacity-0' : 'opacity-100'}`}>
        <header className="flex justify-between items-end border-b-2 border-[#45d4ff] pb-2 mb-2 md:mb-4 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-4xl font-bold tracking-widest uppercase flex items-center gap-2">
              <Terminal className="inline-block w-5 h-5 md:w-8 md:h-8" /> 
              <span className="hidden md:inline">{isCorrupted ? "ATHANAS_VIEWER" : "CODEX_OBSCURA"}</span>
              <span className="md:hidden">CODEX</span>
            </h1>
            <span className="text-[10px] md:text-xs opacity-70">ST GAMES PROTOCOL v7.3</span>
          </div>
          
          <div className="flex flex-col items-end text-xs md:text-sm">
             <div className="flex items-center gap-2">
               <span className="hidden md:inline">SANITY:</span>
               <div className="w-20 md:w-32 h-3 md:h-4 border border-[#45d4ff] p-0.5">
                 <div className={`h-full transition-all duration-500 ${sanity < 30 ? 'bg-red-500 animate-pulse' : 'bg-[#45d4ff]'}`} style={{ width: `${sanity}%` }}></div>
               </div>
               <span className={sanity < 30 ? 'text-red-500 font-bold' : ''}>{sanity}%</span>
             </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden min-h-0 relative">
          {isMobileMenuOpen && (<div className="absolute inset-0 bg-black/90 z-20 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>)}

          <aside className={`absolute md:relative z-30 h-full w-[80%] max-w-[280px] md:w-64 bg-black md:bg-transparent border-r-2 border-[#45d4ff] p-4 md:p-0 md:pr-4 flex flex-col gap-2 shrink-0 overflow-y-auto scrollbar-hide transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 shadow-[10px_0_20px_rgba(51,255,0,0.3)]' : '-translate-x-[110%] md:translate-x-0'} top-0 left-0`}>
            <div className={`bg-[#45d4ff] text-black px-1 font-bold mb-2 flex justify-between sticky top-0 ${isTrapped ? 'animate-pulse bg-red-600' : ''}`}>
              <span>FILES</span>
              {isTrapped && <Lock size={16} />}
            </div>
            
            {discoveredFiles.map((key) => {
              const file = WT5_DATA[key];
              if (!file) return null;
              return (
                <button
                  key={key}
                  onClick={() => accessFile(key)}
                  disabled={currentFile === key || IS_UPLOADING}
                  className={`text-left px-3 py-3 md:py-1 text-sm md:text-xs transition-colors flex justify-between items-center group border-b md:border-none border-[#45d4ff]/30 ${currentFile === key ? 'bg-[#45d4ff]/20 font-bold' : ''} ${isTrapped || IS_UPLOADING ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#45d4ff] hover:text-black active:bg-[#45d4ff]/50'}`}
                >
                  <span className="truncate flex-1 group-hover:animate-pulse">
                    {sanity < 20 && Math.random() > 0.7 ? "ERROR.LOG" : key}
                  </span>
                  {file.security > 0 && <Lock size={12} />}
                </button>
              );
            })}
          </aside>
          
          <main ref={mainScrollRef} className={`flex-1 overflow-y-auto relative p-3 md:p-4 border-2 border-[#45d4ff]/20 bg-[#001100]/50 shadow-[inset_0_0_20px_rgba(51,255,0,0.1)] scrollbar-hide w-full`}>
            {isGlitching ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black text-white z-20 overflow-hidden">
                <div className="flex flex-col items-center gap-3">
                  <EncryptedText
                    text={isTrapped ? "HOREUM_SEAL::ACTIVE" : (isCorrupted ? "ATHANAS LAYER ACTIVE" : (hasLeftEye ? "INDEX::REASSEMBLING" : "TRACE::DESYNC"))}
                    colorClass="text-cyan-200 bg-cyan-950"
                  />
                  <div className="text-xs font-mono opacity-80">
                    {isTrapped ? "ACCESS DENIED. PROTOCOL: FRANCESCO_HOREUM" : (isCorrupted ? "WARNING: OBSERVER DETECTED" : "RECONSTRUCTING DATA STREAM...")}
                  </div>
                  <div className="w-56 h-1 bg-white/10 overflow-hidden rounded">
                    <div className="h-full w-1/3 animate-pulse bg-white/60" />
                  </div>
                </div>
              </div>
            ) : (
              renderWikiContent()
            )}
          </main>
          
          {!IS_UPLOADING && (
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden absolute bottom-4 right-4 z-40 bg-black border-2 border-[#45d4ff] p-3 rounded-full shadow-[0_0_15px_rgba(51,255,0,0.5)] active:scale-95 text-[#45d4ff]"><Menu size={24} /></button>
          )}

        </div>

		 <footer className="mt-1 md:mt-2 pt-1 border-t border-[#45d4ff] shrink-0 h-24 md:h-32 flex flex-col text-xs md:text-sm">
          
          {/* 로그 영역 */}
          <div className="flex-1 overflow-y-auto mb-1 opacity-80 font-light space-y-1 scrollbar-hide" ref={scrollRef}>
             {logs.map((log, i) => <div key={i} className={`break-all ${log.includes('ERROR') || log.includes('ALERT') || log.includes('DETECTION') ? 'text-red-500 font-bold' : ''}`}>{log}</div>)}
             <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
          </div>
          
          {/* 입력창 영역: p-1.5 필요시 수정 */}
          <div className="flex items-center bg-[#002200] border border-[#45d4ff] p-1.5">
            <span className="mr-2 blink">{'>'}</span>
            <input 
                type="text" 
                value={inputVal} 
                onChange={(e) => setInputVal(e.target.value)} 
                onKeyDown={handleCommand} 
                disabled={isTrapped || IS_UPLOADING} 
                // text-base를 text-sm으로 줄엿음
                className={`flex-1 bg-transparent border-none outline-none text-[#45d4ff] placeholder-[#45d4ff]/50 uppercase text-sm md:text-base ${awaitingChoice ? 'animate-pulse text-red-500 font-black' : ''}`} 
                placeholder={isTrapped || IS_UPLOADING ? "LOCKED" : (awaitingChoice ? "MAKE YOUR CHOICE (Y/N)..." : "CMD...")} 
            />
          </div>
        </footer>

      </div>
    </div>
  );
};

// ==================================================================================
// PART 3: TRANSITIONS (BOOT SCREENS & MAIN APP)
// ==================================================================================

const DrBootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const hasRun = useRef(false); // [수정 1] 실행 여부 확인용 변수

  useEffect(() => {
    if (hasRun.current) return; // [수정 2] 이미 실행됐으면 중단
    hasRun.current = true;      // [수정 3] 실행되었다고 표시

    const sequence = ["INITIALIZING PLAYER NODE...", "LOADING 'DOMESTIC REPTILIAN' KERNEL...", "BYPASSING LOCAL REALITY FILTERS...", "SIGNAL LOST, ENTERING EXEMPT ZONE.", "READY."];
    let d = 0;
    sequence.forEach((s) => {
      d += 400 + Math.random() * 300;
      setTimeout(() => setLines(p => [...p, s]), d);
    });
    setTimeout(onComplete, d + 800);
  }, [onComplete]);

  return (
    <div className="h-screen w-screen bg-black p-8 md:p-12 font-mono flex flex-col justify-center gap-2" style={{ color: THEME_DR }}>
      <div className="text-2xl md:text-4xl font-black mb-8 animate-pulse italic">POST_AKASHIC_RECORD</div>
      {lines.map((l, i) => <div key={i} className="text-sm md:text-lg">{'>'} {l}</div>)}
    </div>
  );
};

const RemoteBootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const hasRun = useRef(false); // [수정 1] 실행 여부 확인용 변수

  useEffect(() => {
    if (hasRun.current) return; // [수정 2]
    hasRun.current = true;      // [수정 3]

    const bootText = [
      "ST GAMES INDUSTRIES (TM) TERMLINK PROTOCOL", "BIOS CHECK... OK", "MEMORY CHECK... 64TB OK", "LOADING KERNEL... OK", "DETECTING HARDWARE...", " - VIDEO: MONOCHROME PHOSPHOR OK", "INITIALIZING SECURITY DAEMONS...", "WARNING: UNAUTHORIZED BIO-SIGNATURE DETECTED", "ACCESS GRANTED."
    ];
    let d = 0;
    bootText.forEach((s) => {
      d += 200 + Math.random() * 200;
      setTimeout(() => setLines(p => [...p, s]), d);
    });
    setTimeout(onComplete, d + 800);
  }, [onComplete]);

  return (
    <div className="h-screen w-screen bg-black p-8 md:p-12 font-mono flex flex-col justify-center gap-2 text-[#45d4ff]">
      <div className="mb-8">
         <Terminal size={48} className="animate-pulse w-12 h-12 md:w-16 md:h-16" />
         <h1 className="text-xl md:text-3xl font-bold mt-2">ST GAMES INTERNAL</h1>
      </div>
      {lines.map((l, i) => <div key={i} className="text-xs md:text-lg tracking-widest">{l}</div>)}
    </div>
  );
};

const App = () => {
  const [stage, setStage] = useState('DR_BOOT');
  if (stage === 'DR_BOOT') return <DrBootScreen onComplete={() => setStage('DR_IDLE')} />;
  if (stage === 'CONNECTING') return <RemoteBootScreen onComplete={() => setStage('WT5_ACTIVE')} />;
  if (stage === 'WT5_ACTIVE') return <Wt5System />;
  return <DrSystem onConnect={() => setStage('CONNECTING')} />;
};

export default App;