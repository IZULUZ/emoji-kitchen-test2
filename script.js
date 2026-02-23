const emojiRanges = [
  [0x1F600, 0x1F64F],
  [0x1F300, 0x1F5FF],
  [0x1F900, 0x1F9FF]
];

const banned = ["🔪","💣","🔫","⚔️","🍺","🍷","🚬","💀"];

let selected = [];

function generateEmojis(){
  const list = [];
  emojiRanges.forEach(range=>{
    for(let i=range[0]; i<=range[1]; i++){
      const e = String.fromCodePoint(i);
      if(!banned.includes(e)) list.push(e);
    }
  });
  return list;
}

const emojiList = generateEmojis();

function openEmojiModal(){
  document.getElementById("emojiModal").classList.add("active");
}

function closeEmojiModal(){
  document.getElementById("emojiModal").classList.remove("active");
}

function loadEmojis(){
  const grid = document.getElementById("emojiGrid");
  emojiList.forEach(e=>{
    const span=document.createElement("span");
    span.innerText=e;
    span.onclick=()=>selectEmoji(e);
    grid.appendChild(span);
  });
}

function selectEmoji(e){
  if(selected.length<2){
    selected.push(e);
  }else{
    selected=[e];
  }
  updateExpression();
}

function updateExpression(){
  const exp=document.getElementById("expression");
  if(selected.length===0){
    exp.innerText="? + ? =";
  }
  else if(selected.length===1){
    exp.innerText=selected[0]+" + ? =";
  }
  else{
    exp.innerText=selected[0]+" + "+selected[1]+" = "+selected[0]+selected[1];
  }
}

function openSettingsModal(){
  document.getElementById("settingsModal").classList.add("active");
  loadSettings();
}

function closeSettingsModal(){
  document.getElementById("settingsModal").classList.remove("active");
}

function saveSettings(){
  const name = document.getElementById("studentName").value;
  const classNum = document.getElementById("studentClass").value;
  const fileInput = document.getElementById("profileImage");

  localStorage.setItem("studentName", name);
  localStorage.setItem("studentClass", classNum);

  if(fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      localStorage.setItem("profileImage", e.target.result);
      document.getElementById("profileImageDisplay").src = e.target.result;
    }
    reader.readAsDataURL(fileInput.files[0]);
  }

  document.getElementById("studentDisplay").innerText =
    classNum + "번 " + name;

  closeSettingsModal();
}

function loadSettings(){
  document.getElementById("studentName").value =
    localStorage.getItem("studentName") || "";

  document.getElementById("studentClass").value =
    localStorage.getItem("studentClass") || "";

  const img = localStorage.getItem("profileImage");
  if(img){
    document.getElementById("profileImageDisplay").src = img;
  }

  document.getElementById("studentDisplay").innerText =
    (localStorage.getItem("studentClass") || "") +
    "번 " +
    (localStorage.getItem("studentName") || "");
}

document.addEventListener("DOMContentLoaded",()=>{
  loadEmojis();
  loadSettings();
});
