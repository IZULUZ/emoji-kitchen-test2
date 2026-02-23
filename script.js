// 날짜 표시
const today = new Date();
document.getElementById("todayTitle").innerText =
`${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 감정 교실`;

// 기본 캐릭터
let characterImg = "https://cdn.pixabay.com/photo/2017/01/31/13/14/cartoon-2027368_1280.png";
document.getElementById("mainCharacter").src = characterImg;

// 이모지 목록
const emojis=["😀","😡","😢","😴","😍","🤯","😎","🤔","🥳","😭","😇","😈","🥶","🥵","😤"];
const emojiList=document.getElementById("emojiList");
const formula=document.getElementById("formula");
let selectedEmojis=[];
let selectedSeat=null;

emojis.forEach(e=>{
  const span=document.createElement("span");
  span.innerText=e;
  span.onclick=()=>{
    selectedEmojis.push(e);
    formula.innerText=selectedEmojis.join(" + ");
    document.getElementById("seatSelectBtn").disabled=false;
  };
  emojiList.appendChild(span);
});

// 팝업 열기
emotionBtn.onclick=()=>emotionPopup.classList.remove("hidden");
closeEmotion.onclick=()=>emotionPopup.classList.add("hidden");
settingBtn.onclick=()=>settingPopup.classList.remove("hidden");

// 설정 저장
saveSetting.onclick=()=>{
  const file=imageUpload.files[0];
  if(file){
    const reader=new FileReader();
    reader.onload=(e)=>{
      characterImg=e.target.result;
      mainCharacter.src=characterImg;
    };
    reader.readAsDataURL(file);
  }
  settingPopup.classList.add("hidden");
};

// 좌석 선택 화면 이동
seatSelectBtn.onclick=()=>{
  mainScreen.classList.add("hidden");
  seatScreen.classList.remove("hidden");
  createSeatMap();
};

// 좌석 생성 (24석)
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

// 교실 좌석 배치
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
