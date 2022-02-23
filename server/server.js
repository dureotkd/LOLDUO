// npm i express
const express = require("express");
const path = require("path");

// npm i mysql
const mysql = require("mysql");

const app = express();

const http = require("http").createServer(app);

// npm i cors
const cors = require("cors");

// npm i ip
const ip = require("ip");

const socketIo = require("socket.io");

http.listen(8090, () => {});

app.use(cors());

const io = socketIo(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const regIp = ip.address();

const db = mysql.createPool({
  host: "localhost",
  user: "",
  password: "",
  database: "lolduo",
});

let socketId;

// io.on("connection", (socket) => {
//   /*  클라이언트로 부터 방 접속 통신 받음 */

//   if (socketId != undefined) {
//     socket.removeAllListeners();
//   } else {
//     socketId = socket.id;
//   }

//   socket.on("joinRoom", ({ currentRoom, loginUser }) => {
//     socket.join(currentRoom, () => {});

//     io.to(currentRoom).emit("joinRoom", { currentRoom, loginUser });
//   });

//   socket.on("leaveRoom", ({ currentRoom, loginUser }) => {
//     socket.leave(currentRoom, () => {});
//     io.to(currentRoom).emit("leaveRoom", { currentRoom, loginUser });
//   });

//   socket.on("disconnect", () => {
//     console.log("접aa속끝");
//     socket.removeAllListeners();
//   });

//   socket.on("chatMsg", ({ newMsg, roomSeq, msgAllDB }) => {
//     console.log(roomSeq);

//     io.to(roomSeq).emit("chatMsg", { newMsg, msgAllDB });
//   });
// });

app.get("/getNewMsg", (req, res) => {
  const insertId = req.query.insertId;
  const sql = `SELECT a.seq , a.userSeq , a.msg , a.regDate , b.name as nickname
    FROM duo.duoChat a , duo.summonerPrivate b 
    WHERE a.userSeq = b.userSeq 
    AND a.seq = '${insertId}'`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/sendChatMsg", (req, res) => {
  const loginUserSeq = req.query.loginUserSeq;
  const roomSeq = req.query.roomSeq;
  const msg = req.query.msg;

  const sql = `INSERT INTO duo.duoChat VALUES('','${loginUserSeq}','${roomSeq}','${msg}','',NOW(),'${regIp}','','','Y')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.htmll");
});

app.get("/getSearchSetting", (req, res) => {
  const loginUserSeq = req.query.loginUserSeq;

  const sql = `SELECT * FROM duo.searchSetting a WHERE a.userSeq = '${loginUserSeq}' LIMIT 1 `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/getMsgRow", (req, res) => {
  const seq = req.query.seq;
  const sql = `
  SELECT * FROM 
    duo.duoChat a, duo.summonerPrivate b 
    WHERE 
      a.userSeq = b.userSeq AND a.seq = '${seq}' LIMIT 1 `;
  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.post("/saveSearchSetting", (req, res) => {
  const gameStyle = req.query.gameStyle;
  const searchPosition = req.query.searchPosition;
  const myPosition = req.query.myPosition;
  const loginUserSeq = req.query.loginUserSeq;
  const regIp = ip.address();

  const sql = `INSERT INTO duo.searchSetting VALUES('','${loginUserSeq}','${gameStyle}','private','${searchPosition}','${myPosition}','Y',NOW(),'${regIp}','','')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/getSummoner", (req, res) => {
  const id = req.query.id;

  const sql = `
  SELECT 
    a.seq , a.nickname , b.tier AS privateTier , c.tier AS teamTier ,
    b.rank AS privateRnk , c.rank AS teamRank , 
    b.win , b.lose , b.point , c.win AS teamWin , c.lose AS teamLose
  FROM 
  duo.user a, duo.summonerprivate b, duo.summonerteam c
  WHERE
  a.seq = b.userSeq
  AND 
  a.seq = c.userSeq
  AND 
  a.loginId = '${id}'`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/saveSummonerLeagueTeam", (req, res) => {
  const tier = req.query?.tier;
  const rank = req.query?.rank;
  const summonerName = req.query.summonerName;
  const leaguePoints = req.query.leaguePoints;
  const wins = req.query.wins;
  const losses = req.query.losses;
  const loginUserSeq = req.query.insertId;
  const regIp = ip.address();

  const sql = `INSERT INTO duo.summonerTeam VALUES('','${summonerName}','${loginUserSeq}','${tier}','${rank}','${leaguePoints}','${wins}','${losses}',NOW(),'${regIp}','','','Y')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/saveSummonerLeaguePrivate", (req, res) => {
  const tier = req.query?.tier;
  const rank = req.query?.rank;
  const summonerName = req.query.summonerName;
  const leaguePoints = req.query.leaguePoints;
  const wins = req.query.wins;
  const losses = req.query.losses;
  const loginUserSeq = req.query.insertId;
  const sql = `INSERT INTO duo.summonerPrivate VALUES('','${summonerName}','${loginUserSeq}','${tier}','${rank}','${leaguePoints}','${wins}','${losses}',NOW(),'${regIp}','','','Y')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/getSummonerData", (req, res) => {
  const summonerName = req.query.summonerName;
  const regIp = ip.address();
  const sql = `SELECT * FROM lolduo.summoner a WHERE a.name = '${summonerName}' `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.post("/getUserId", (req, res) => {
  const loginId = req.query.loginId;
  const loginPw = req.query.loginPw;
  const sql = `SELECT * FROM user a WHERE a.loginId = '${loginId}' AND a.loginPw = '${loginPw}' LIMIT 1`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.post("/getOnlyUserId", (req, res) => {
  const userId = req.query.id;
  const sql = `SELECT * FROM duo.user a WHERE a.loginId = '${userId}' LIMIT 1`;
  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/getInsertRoom", (req, res) => {
  const insertSeq = req.query.insertSeq;
  const sql = `SELECT * FROM duo.duoRoom a WHERE a.seq = '${insertSeq}' `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/getSummonerAllData", (req, res) => {
  const insertId = req.query.insertId;
  const sql = `
SELECT
  a.seq , a.id , a.accountId , a.puuid , a.name , a.profileIconId , a.summonerLevel ,
  b.tier , b.rank , b.win , b.lose , b.editDate ,
  c.tier AS teamTier , c.rank AS teamRank , c.win AS teamWin , c.lose AS teamLose , c.editDate AS teamEditDate
FROM
  summoner a 
  LEFT JOIN summonerPrivate b
  ON a.seq = b.sumSeq
  LEFT JOIN summonerTeam c
  ON a.seq = c.sumSeq
WHERE a.seq = ${insertId}`;

  console.log(sql);

  db.query(sql, (err, data) => {
    console.log(data);
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/createSummoner", (req, res) => {
  const {
    id,
    accountId,
    puuid,
    name,
    profileIconId,
    revisionDate,
    summonerLevel,
  } = JSON.parse(req.query.summonerApi);

  const sql = `INSERT INTO lolDuo.summoner VALUES('','${id}','${accountId}','${puuid}','${name}','${profileIconId}','${revisionDate}','${summonerLevel}','','Y')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/createPrivateLeague", (req, res) => {
  const { tier, rank, wins, losses } = JSON.parse(req.query.privateLeague);
  const insertId = req.query.insertId;

  const sql = `INSERT INTO lolDuo.summonerprivate VALUES('','${insertId}','${tier}','${rank}','${wins}','${losses}',NOW(),'${regIp}','','','Y')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/createTeamLeague", (req, res) => {
  const { tier, rank, wins, losses } = JSON.parse(req.query.teamLeague);
  const insertId = req.query.insertId;

  const sql = `INSERT INTO lolDuo.summonerteam VALUES('','${insertId}','${tier}','${rank}','${wins}','${losses}',NOW(),'${regIp}','','','Y')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/createChamiponMastery", (req, res) => {
  const championMasteryApi = req.query.championMasteryApi;
  const insertId = req.query.insertId;

  championMasteryApi.forEach((row, idx) => {
    const { championId, championLevel, championPoints } = JSON.parse(row);

    const engName = changeChampionIdToEngName(championId);
    const korName = changeChampionToKorName(championId);
    const sql = `INSERT INTO lolDuo.championmastery VALUES('','${insertId}','${idx}','${championId}','${championLevel}','${championPoints}','${korName}','${engName}',NOW(),'')`;

    db.query(sql, (err, data) => {});
  });

  res.send({ message: "Ok" });
});

app.get("/getDuoRoomDetail", (req, res) => {
  const roomSeq = req.query.roomSeq;
  const sql = `
  SELECT 
    *
  FROM
    lolDuo.duoRoom a
  WHERE
    a.seq = '${roomSeq}'
  ORDER BY 
    a.regDate DESC
  `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/getDuoRoom", (req, res) => {
  const sql = `
  SELECT 
    a.* , b.name ,
(SELECT name
FROM 
lolduo.summoner
WHERE 
SUBSTRING_INDEX(SUBSTRING_INDEX(a.attendSumSeq,'/',2),'/',-1) = seq
) AS secondNickname
  FROM 
	lolduo.duoRoom a , lolduo.summoner b
  WHERE
    SUBSTRING_INDEX(SUBSTRING_INDEX(a.attendSumSeq,'/',1),'/',-1) = b.seq
  ORDER BY 
    a.regDate DESC;
  `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.post("/getDoJoin", (req, res) => {
  const id = req.query.loginId;
  const pw = req.query.loginPw;
  const regIp = ip.address();
  const sql = `INSERT INTO duo.user VALUES('','${id}','${pw}','','','','','','','','Y',NOW(),'${regIp}','','')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.post("/createDuoRoom", (req, res) => {
  const {
    title,
    rankType,
    gameStyle,
    myPosition,
    roomPerson,
    sumSeq,
    wantedPosition,
  } = JSON.parse(req.query.insertData);

  const sql = `INSERT INTO lolduo.duoRoom VALUES('','${title}','${sumSeq}','','${sumSeq}/','${myPosition}/','${wantedPosition}/','${roomPerson}','${gameStyle}','${rankType}',NOW(),'Y')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.post("/createUserToken", (req, res) => {
  const userSeq = req.query.userSeq;
  const regIp = ip.address();
  const sql = `INSERT INTO duo.userToken VALUES('','${userSeq}','','','','Y',NOW(),'${regIp}','','')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/getRoomDetail", (req, res) => {
  const roomSeq = req.query.roomSeq;
  const sql = `SELECT * FROM duo.duoRoom a WHERE a.seq= ${roomSeq} AND a.state = 'Y' LIMIT 1`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/getDuoChat", (req, res) => {
  const roomSeq = req.query.roomSeq;
  const sql = `SELECT * FROM duo.duoChat a WHERE a.roomSeq = ${roomSeq} AND a.state = 'Y' LIMIT 1`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.get("/getMyAttendRoom", (req, res) => {
  const loginUserSeq = req.query.loginUserSeq;
  const sql = `
SELECT 
 a.*
FROM 
lolduo.duoRoom a 
WHERE 
 a.attendSumSeq LIKE '%${loginUserSeq}/%' 
ORDER BY a.regDate DESC;`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/getDuoRoomAll", (req, res) => {
  const loginUserSeq = req.query.loginUserSeq;

  const sql = `
SELECT 
 a.*
FROM 
lolduo.duoRoom a 
WHERE a.attendSumSeq NOT LIKE '%${loginUserSeq}/%'
ORDER BY a.regDate DESC;`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/getAttendUser", (req, res) => {
  const attendUserSeq = req.query.attendUserSeq;
  const sql = `
  SELECT 
    * 
  FROM 
    lolduo.summoner a , lolduo.summonerPrivate b
  WHERE 
    a.seq = b.sumSeq  AND a.seq = '${attendUserSeq}'

`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data[0]);
    else res.send(err);
  });
});

app.post("/updateAttendUser", (req, res) => {
  const attendUserSeq = req.query.updateSeq;
  const roomSeq = req.query.roomSeq;

  const sql = `UPDATE duo.duoRoom SET attendUserSeq = '${attendUserSeq}' WHERE seq='${roomSeq}' `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.post("/updateAttendPosition", (req, res) => {
  const updatePosition = req.query.updatePosition;
  const roomSeq = req.query.roomSeq;

  const sql = `UPDATE duo.duoRoom SET attendPosition = '${updatePosition}' WHERE seq='${roomSeq}' `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.post("/updateAttendSumSeq", (req, res) => {
  const updateSeq = req.query.updateSeq;
  const roomSeq = req.query.roomSeq;

  const sql = `UPDATE lolduo.duoRoom SET attendSumSeq = '${updateSeq}' WHERE seq='${roomSeq}' `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/createUser", (req, res) => {
  const id = req.query.summonerId;
  const level = req.query.summonerLevel;
  const nickname = req.query.nickname;
  const sql = `INSERT INTO duo.user VALUES('','${id}','','${nickname}','','','','','','','${level}','Y',NOW(),'${regIp}','','')`;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

/*
    {
        "leagueId": "2463331a-b1a5-4487-9fbb-c28cd27017df",
        "queueType": "RANKED_FLEX_SR",
        "tier": "SILVER",
        "rank": "II",
        "summonerId": "ApSZ413vUp1Rn4LxnZK677m-11gbASIy5tu2nO5u9Ecb8A",
        "summonerName": "피터파커",
        "leaguePoints": 81,
        "wins": 21,
        "losses": 13,
        "veteran": false,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": false
    },
    {
        "leagueId": "0086ecb5-068b-464f-af58-400c8e5a8599",
        "queueType": "RANKED_SOLO_5x5",
        "tier": "PLATINUM",
        "rank": "IV",
        "summonerId": "ApSZ413vUp1Rn4LxnZK677m-11gbASIy5tu2nO5u9Ecb8A",
        "summonerName": "피터파커",
        "leaguePoints": 0,
        "wins": 405,
        "losses": 381,
        "veteran": false,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": false
    }

*/

app.get("/getChatMsgAll", (req, res) => {
  const roomSeq = req.query.roomSeq;
  const sql = `
    SELECT 
      a.seq , a.msg , a.regDate , b.name as nickname , 
      a.userSeq
    FROM 
      duo.duoChat a , 
      duo.summonerPrivate b
    WHERE 
      a.userSeq = b.userSeq
    AND
      a.roomSeq = '${roomSeq}'
     `;

  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

/*
 *  riot ChampionIdToName methods
 *  update: 10.20 ver.(riot client)
 */
// Riot API에서 제공하는 lol 챔피언 id를 영어 이름으로 반환하고
//없는 값을 입력하면 -1을 반환하는 method

function changeChampionIdToEngName($id) {
  // 매개변수: 챔피언 id
  switch ($id) {
    case 266:
      $a = "Aatrox";
      break; // 챔피언 영어 이름
    case 412:
      $a = "Thresh";
      break;
    case 23:
      $a = "Tryndamere";
      break;
    case 79:
      $a = "Gragas";
      break;
    case 69:
      $a = "Cassiopeia";
      break;
    case 136:
      $a = "AurelionSol";
      break;
    case 13:
      $a = "Ryze";
      break;
    case 78:
      $a = "Poppy";
      break;
    case 14:
      $a = "Sion";
      break;
    case 1:
      $a = "Annie";
      break;
    case 202:
      $a = "Jhin";
      break;
    case 43:
      $a = "Karma";
      break;
    case 111:
      $a = "Nautilus";
      break;
    case 240:
      $a = "Kled";
      break;
    case 99:
      $a = "Lux";
      break;
    case 103:
      $a = "Ahri";
      break;
    case 2:
      $a = "Olaf";
      break;
    case 112:
      $a = "Viktor";
      break;
    case 34:
      $a = "Anivia";
      break;
    case 27:
      $a = "Singed";
      break;
    case 86:
      $a = "Garen";
      break;
    case 127:
      $a = "Lissandra";
      break;
    case 57:
      $a = "Maokai";
      break;
    case 25:
      $a = "Morgana";
      break;
    case 28:
      $a = "Evelynn";
      break;
    case 105:
      $a = "Fizz";
      break;
    case 74:
      $a = "Heimerdinger";
      break;
    case 238:
      $a = "Zed";
      break;
    case 68:
      $a = "Rumble";
      break;
    case 82:
      $a = "Mordekaiser";
      break;
    case 37:
      $a = "Sona";
      break;
    case 96:
      $a = "KogMaw";
      break;
    case 55:
      $a = "Katarina";
      break;
    case 117:
      $a = "Lulu";
      break;
    case 22:
      $a = "Ashe";
      break;
    case 30:
      $a = "Karthus";
      break;
    case 12:
      $a = "Alistar";
      break;
    case 122:
      $a = "Darius";
      break;
    case 67:
      $a = "Vayne";
      break;
    case 110:
      $a = "Varus";
      break;
    case 77:
      $a = "Udyr";
      break;
    case 89:
      $a = "Leona";
      break;
    case 126:
      $a = "Jayce";
      break;
    case 134:
      $a = "Syndra";
      break;
    case 80:
      $a = "Pantheon";
      break;
    case 92:
      $a = "Riven";
      break;
    case 121:
      $a = "Khazix";
      break;
    case 42:
      $a = "Corki";
      break;
    case 268:
      $a = "Azir";
      break;
    case 51:
      $a = "Caitlyn";
      break;
    case 76:
      $a = "Nidalee";
      break;
    case 85:
      $a = "Kennen";
      break;
    case 3:
      $a = "Galio";
      break;
    case 45:
      $a = "Veigar";
      break;
    case 432:
      $a = "Bard";
      break;
    case 150:
      $a = "Gnar";
      break;
    case 90:
      $a = "Malzahar";
      break;
    case 104:
      $a = "Graves";
      break;
    case 254:
      $a = "Vi";
      break;
    case 10:
      $a = "Kayle";
      break;
    case 39:
      $a = "Irelia";
      break;
    case 64:
      $a = "LeeSin";
      break;
    case 420:
      $a = "Illaoi";
      break;
    case 60:
      $a = "Elise";
      break;
    case 106:
      $a = "Volibear";
      break;
    case 20:
      $a = "Nunu";
      break;
    case 4:
      $a = "TwistedFate";
      break;
    case 24:
      $a = "Jax";
      break;
    case 102:
      $a = "Shyvana";
      break;
    case 429:
      $a = "Kalista";
      break;
    case 36:
      $a = "DrMundo";
      break;
    case 427:
      $a = "Ivern";
      break;
    case 131:
      $a = "Diana";
      break;
    case 63:
      $a = "Brand";
      break;
    case 113:
      $a = "Sejuani";
      break;
    case 8:
      $a = "Vladimir";
      break;
    case 154:
      $a = "Zac";
      break;
    case 421:
      $a = "RekSai";
      break;
    case 133:
      $a = "Quinn";
      break;
    case 84:
      $a = "Akali";
      break;
    case 163:
      $a = "Taliyah";
      break;
    case 18:
      $a = "Tristana";
      break;
    case 120:
      $a = "Hecarim";
      break;
    case 15:
      $a = "Sivir";
      break;
    case 236:
      $a = "Lucian";
      break;
    case 107:
      $a = "Rengar";
      break;
    case 19:
      $a = "Warwick";
      break;
    case 72:
      $a = "Skarner";
      break;
    case 54:
      $a = "Malphite";
      break;
    case 157:
      $a = "Yasuo";
      break;
    case 101:
      $a = "Xerath";
      break;
    case 17:
      $a = "Teemo";
      break;
    case 75:
      $a = "Nasus";
      break;
    case 58:
      $a = "Renekton";
      break;
    case 119:
      $a = "Draven";
      break;
    case 35:
      $a = "Shaco";
      break;
    case 50:
      $a = "Swain";
      break;
    case 91:
      $a = "Talon";
      break;
    case 40:
      $a = "Janna";
      break;
    case 115:
      $a = "Ziggs";
      break;
    case 245:
      $a = "Ekko";
      break;
    case 61:
      $a = "Orianna";
      break;
    case 114:
      $a = "Fiora";
      break;
    case 9:
      $a = "Fiddlesticks";
      break;
    case 31:
      $a = "ChoGath";
      break;
    case 33:
      $a = "Rammus";
      break;
    case 7:
      $a = "Leblanc";
      break;
    case 16:
      $a = "Soraka";
      break;
    case 26:
      $a = "Zilean";
      break;
    case 56:
      $a = "Nocturne";
      break;
    case 222:
      $a = "Jinx";
      break;
    case 83:
      $a = "Yorick";
      break;
    case 6:
      $a = "Urgot";
      break;
    case 203:
      $a = "Kindred";
      break;
    case 21:
      $a = "MissFortune";
      break;
    case 62:
      $a = "MonkeyKing";
      break;
    case 53:
      $a = "Blitzcrank";
      break;
    case 98:
      $a = "Shen";
      break;
    case 201:
      $a = "Braum";
      break;
    case 5:
      $a = "XinZhao";
      break;
    case 29:
      $a = "Twitch";
      break;
    case 11:
      $a = "MasterYi";
      break;
    case 44:
      $a = "Taric";
      break;
    case 32:
      $a = "Amumu";
      break;
    case 41:
      $a = "Gangplank";
      break;
    case 48:
      $a = "Trundle";
      break;
    case 38:
      $a = "Kassadin";
      break;
    case 161:
      $a = "Velkoz";
      break;
    case 143:
      $a = "Zyra";
      break;
    case 267:
      $a = "Nami";
      break;
    case 59:
      $a = "JarvanIV";
      break;
    case 81:
      $a = "Ezreal";
      break;
    case 350:
      $a = "Yuumi";
      break;
    case 145:
      $a = "Kaisa";
      break;
    case 518:
      $a = "Neeko";
      break;
    case 142:
      $a = "Zoe";
      break;
    case 498:
      $a = "Xayah";
      break;
    case 517:
      $a = "Sylas";
      break;
    case 141:
      $a = "Kayn";
      break;
    case 516:
      $a = "Ornn";
      break;
    case 555:
      $a = "Pyke";
      break;
    case 164:
      $a = "Camille";
      break;
    case 246:
      $a = "Qiyana";
      break;
    case 497:
      $a = "Rakan";
      break;
    case 777:
      $a = "Yone";
      break;
    case 876:
      $a = "Lillia";
      break;
    case 235:
      $a = "Senna";
      break;
    case 875:
      $a = "Sett";
      break;
    case 523:
      $a = "Aphelios";
      break;

    case 223:
      $a = "TahmKench";
      break;

    case 360:
      $a = "Samira";
      break;

    default:
      $a = -1;
      break;
  }

  return $a;
}

// Riot API에서 제공하는 lol 챔피언 id를 한글 이름으로 반환하고
//없는 값을 입력하면 -1을 반환하는 method
function changeChampionToKorName($id) {
  // 매개변수: 챔피언 id
  switch ($id) {
    case 266:
      $a = "아트록스";
      break; // 챔피언 한글 이름
    case 412:
      $a = "쓰레쉬";
      break;
    case 23:
      $a = "트린다미어";
      break;
    case 79:
      $a = "그라가스";
      break;
    case 69:
      $a = "카시오페아";
      break;
    case 136:
      $a = "아우렐리온 솔";
      break;
    case 13:
      $a = "라이즈";
      break;
    case 78:
      $a = "뽀삐";
      break;
    case 14:
      $a = "사이온";
      break;
    case 1:
      $a = "애니";
      break;
    case 202:
      $a = "진";
      break;
    case 43:
      $a = "카르마";
      break;
    case 111:
      $a = "노틸러스";
      break;
    case 240:
      $a = "클레드";
      break;
    case 99:
      $a = "럭스";
      break;
    case 103:
      $a = "아리";
      break;
    case 2:
      $a = "올라프";
      break;
    case 112:
      $a = "빅토르";
      break;
    case 34:
      $a = "애니비아";
      break;
    case 27:
      $a = "신지드";
      break;
    case 86:
      $a = "가렌";
      break;
    case 127:
      $a = "리산드라";
      break;
    case 57:
      $a = "마오카이";
      break;
    case 25:
      $a = "모르가나";
      break;
    case 28:
      $a = "이블린";
      break;
    case 105:
      $a = "피즈";
      break;
    case 74:
      $a = "하이머딩거";
      break;
    case 238:
      $a = "제드";
      break;
    case 68:
      $a = "럼블";
      break;
    case 82:
      $a = "모데카이저";
      break;
    case 37:
      $a = "소나";
      break;
    case 96:
      $a = "코그모";
      break;
    case 55:
      $a = "카타리나";
      break;
    case 117:
      $a = "룰루";
      break;
    case 22:
      $a = "애쉬";
      break;
    case 30:
      $a = "카서스";
      break;
    case 12:
      $a = "알리스타";
      break;
    case 122:
      $a = "다리우스";
      break;
    case 67:
      $a = "베인";
      break;
    case 110:
      $a = "바루스";
      break;
    case 77:
      $a = "우디르";
      break;
    case 89:
      $a = "레오나";
      break;
    case 126:
      $a = "제이스";
      break;
    case 134:
      $a = "신드라";
      break;
    case 80:
      $a = "판테온";
      break;
    case 92:
      $a = "리븐";
      break;
    case 121:
      $a = "카직스";
      break;
    case 42:
      $a = "코르키";
      break;
    case 268:
      $a = "아지르";
      break;
    case 51:
      $a = "케이틀린";
      break;
    case 76:
      $a = "니달리";
      break;
    case 85:
      $a = "케인";
      break;
    case 3:
      $a = "갈리오";
      break;
    case 45:
      $a = "베이가";
      break;
    case 432:
      $a = "바드";
      break;
    case 150:
      $a = "나르";
      break;
    case 90:
      $a = "말자하";
      break;
    case 104:
      $a = "그레이브즈";
      break;
    case 254:
      $a = "바이";
      break;
    case 10:
      $a = "케일";
      break;
    case 39:
      $a = "이렐리아";
      break;
    case 64:
      $a = "리 신";
      break;
    case 420:
      $a = "일라오이";
      break;
    case 60:
      $a = "엘리스";
      break;
    case 106:
      $a = "볼리베어";
      break;
    case 20:
      $a = "누누";
      break;
    case 4:
      $a = "트위스티드 페이트";
      break;
    case 24:
      $a = "잭스";
      break;
    case 102:
      $a = "쉬바나";
      break;
    case 429:
      $a = "칼리스타";
      break;
    case 36:
      $a = "문도 박사";
      break;
    case 427:
      $a = "아이번";
      break;
    case 131:
      $a = "다이애나";
      break;
    case 63:
      $a = "브랜드";
      break;
    case 113:
      $a = "세주아니";
      break;
    case 8:
      $a = "블라디미르";
      break;
    case 154:
      $a = "자크";
      break;
    case 421:
      $a = "렉사이";
      break;
    case 133:
      $a = "퀸";
      break;
    case 84:
      $a = "아칼리";
      break;
    case 163:
      $a = "탈리아";
      break;
    case 18:
      $a = "트리스타나";
      break;
    case 120:
      $a = "헤카림";
      break;
    case 15:
      $a = "시비르";
      break;
    case 236:
      $a = "루시안";
      break;
    case 107:
      $a = "렝가";
      break;
    case 19:
      $a = "워윅";
      break;
    case 72:
      $a = "스카너";
      break;
    case 54:
      $a = "말파이트";
      break;
    case 157:
      $a = "야스오";
      break;
    case 101:
      $a = "제라스";
      break;
    case 17:
      $a = "티모";
      break;
    case 75:
      $a = "나서스";
      break;
    case 58:
      $a = "레넥톤";
      break;
    case 119:
      $a = "드레이븐";
      break;
    case 35:
      $a = "샤코";
      break;
    case 50:
      $a = "스웨인";
      break;
    case 91:
      $a = "탈론";
      break;
    case 40:
      $a = "잔나";
      break;
    case 115:
      $a = "직스";
      break;
    case 245:
      $a = "에코";
      break;
    case 61:
      $a = "오리아나";
      break;
    case 114:
      $a = "피오라";
      break;
    case 9:
      $a = "피들스틱";
      break;
    case 31:
      $a = "초가스";
      break;
    case 33:
      $a = "람머스";
      break;
    case 7:
      $a = "르블랑";
      break;
    case 16:
      $a = "소라카";
      break;
    case 26:
      $a = "질리언";
      break;
    case 56:
      $a = "녹턴";
      break;
    case 222:
      $a = "징크스";
      break;
    case 83:
      $a = "요릭";
      break;
    case 6:
      $a = "우르곳";
      break;
    case 203:
      $a = "킨드레드";
      break;
    case 21:
      $a = "미스 포츈";
      break;
    case 62:
      $a = "오공";
      break;
    case 53:
      $a = "블리츠크랭크";
      break;
    case 98:
      $a = "쉔";
      break;
    case 201:
      $a = "브라움";
      break;
    case 5:
      $a = "신 짜오";
      break;
    case 29:
      $a = "트위치";
      break;
    case 11:
      $a = "마스터 이";
      break;
    case 44:
      $a = "타릭";
      break;
    case 32:
      $a = "아무무";
      break;
    case 41:
      $a = "갱플랭";
      break;
    case 48:
      $a = "트런들";
      break;
    case 38:
      $a = "카사딘";
      break;
    case 161:
      $a = "벨코즈";
      break;
    case 143:
      $a = "자이라";
      break;
    case 267:
      $a = "나미";
      break;
    case 59:
      $a = "자르반 4세";
      break;
    case 81:
      $a = "이즈리얼";
      break;
    case 350:
      $a = "유미";
      break;
    case 145:
      $a = "카이사";
      break;
    case 518:
      $a = "니코";
      break;
    case 142:
      $a = "조이";
      break;
    case 498:
      $a = "자야";
      break;
    case 517:
      $a = "사일러스";
      break;
    case 141:
      $a = "케인";
      break;
    case 516:
      $a = "오른";
      break;
    case 555:
      $a = "파이크";
      break;
    case 164:
      $a = "카멜";
      break;
    case 246:
      $a = "키아나";
      break;
    case 497:
      $a = "라칸";
      break;
    case 777:
      $a = "요네";
      break;
    case 876:
      $a = "릴리아";
      break;
    case 235:
      $a = "세나";
      break;
    case 875:
      $a = "세트";
      break;
    case 523:
      $a = "아펠리오스";
      break;

    case 223:
      $a = "탐 켄치";
      break;

    case 360:
      $a = "사미라";
      break;

    default:
      $a = -1;
      break;
  }

  return $a;
}
