// 날짜 표시
const today = new Date();
document.getElementById("todayTitle").innerText =
`${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 감정 교실`;

// 기본 캐릭터 (로컬 SVG)
const defaultCharacter =
"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>\
<circle cx='100' cy='80' r='50' fill='white' stroke='black' stroke-width='4'/>\
<circle cx='85' cy='70' r='5' fill='black'/>\
<circle cx='115' cy='70' r='5' fill='black'/>\
<path d='M80 95 Q100 110 120 95' stroke='black' stroke-width='4' fill='none'/>\
<line x1='100' y1='130' x2='100' y2='180' stroke='black' stroke-width='4'/>\
<line x1='70' y1='150' x2='130' y2='150' stroke='black' stroke-width='4'/>\
</svg>";

let characterImg = defaultCharacter;
document.getElementById("mainCharacter").src = characterImg;

// 이모지
const emojis=["😀","😡","😢","😴","😍","🤯","😎","🤔","🥳","😭","😇","😈"];
let selectedEmojis=[];
let selectedSeat=null;

const emojiList=document.getElementById("emojiList");
const formula=document.getElementById("formula");
const goSeatBtn=document.getElementById("goSeatBtn");

emojis.forEach(e=>{
  const span=document.createElement("span");
  span.innerText=e;
  span.onclick=()=>{
    selectedEmojis.push(e);
    formula.innerText=selectedEmojis.join(" + ");
    goSeatBtn.disabled=false;
  };
  emojiList.appendChild(span);
});

// 감정 팝업 열기
emotionBtn.onclick=()=>{
  emotionPopup.classList.remove("hidden");
};

// 자리 고르기 이동
goSeatBtn.onclick=()=>{
  emotionPopup.classList.add("hidden");
  mainScreen.classList.add("hidden");
  seatScreen.classList.remove("hidden");
  createSeatMap();
};

// 좌석 생성
function createSeatMap(){
  const map=document.getElementById("seatMap");
  map.innerHTML="";
  for(let i=0;i<24;i++){
    const seat=document.createElement("div");
    seat.className="seat";
    seat.innerText=i+1;
    seat.onclick=()=>{
      document.querySelectorAll(".seat").forEach(s=>s.classList.remove("selected"));
      seat.classList.add("selected");
      selectedSeat=i;
      enterClassBtn.disabled=false;
    };
    map.appendChild(seat);
  }
}

// 교실 입장
enterClassBtn.onclick=()=>{
  seatScreen.classList.add("hidden");
  classScreen.classList.remove("hidden");
  createClassSeats();
};

// 교실 좌석 생성
function createClassSeats(){
  const container=document.getElementById("classSeats");
  container.innerHTML="";
  for(let i=0;i<24;i++){
    const seat=document.createElement("div");
    seat.className="classSeat";

    if(i===selectedSeat){
      const img=document.createElement("img");
      img.src=characterImg;

      const speech=document.createElement("div");
      speech.className="speech";
      speech.innerText=selectedEmojis.join(" ");

      seat.appendChild(speech);
      seat.appendChild(img);
    }

    container.appendChild(seat);
  }
}
