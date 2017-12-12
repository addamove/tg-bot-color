let TelegramBot = require("node-telegram-bot-api");
let token = "390609420:AAGgOQfAmlP8sP9HrrVmpitIwyocvCUgQwU";
let bot = new TelegramBot(token, { polling: true });

let state = {
  color: 0,
  i: 0,
  again: false
};

let askQuestion = questions => {
  questions.map(question => {});
};

let questions = [
  {
    title: "Кошки, цветы, аппельсины, конфеты?",
    buttons: [
      [
        {
          text: "кошки",
          callback_data: "1_1"
        }
      ],
      [
        {
          text: "цветы",
          callback_data: "1_2"
        }
      ],
      [
        {
          text: "аппельсины",
          callback_data: "1_3"
        }
      ],
      [{ text: "конфеты", callback_data: "1_4" }]
    ]
  },
  {
    title: "Стакан, банан, ананас, мандарин?",
    buttons: [
      [{ text: "Стакан", callback_data: "2_1" }],
      [{ text: "банан", callback_data: "2_2" }],
      [{ text: "ананас", callback_data: "2_3" }],
      [{ text: "мандарин", callback_data: "2_4" }]
    ]
  },
  {
    title: "Солнце или луна?",
    buttons: [
      [{ text: "солнце", callback_data: "3_1" }],
      [{ text: "луна", callback_data: "3_2" }]
    ]
  }
];

function getQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

function newQuestion(msg) {
  let arr = questions[state.i];
  let text = arr.title;
  let options = {
    reply_markup: JSON.stringify({
      inline_keyboard: arr.buttons
    })
  };
  chat = msg.hasOwnProperty("chat") ? msg.chat.id : msg.from.id;
  bot.sendMessage(chat, text, options);
  state.i++;
}

function answered(msg) {
  let swt = 0;
  let url;
  let colour;

  switch (state.color) {
    case 3:
      url = "https://goo.gl/j3ZEi6";
      colour = "голубой";
      break;
    case 4:
      url = "https://goo.gl/6BQfPy";
      colour = "аквамарин";
      break;
    case 5:
      url = "https://goo.gl/pnDtsV";
      colour = "тёмно бирюзовый";
      break;
    case 6:
      url = "https://goo.gl/mxXC5o";
      colour = "электрик";
      break;
    case 7:
      url =
        "http://img1.liveinternet.ru/images/attach/c/9/108/191/108191007_RRRRRSSSRRS1.jpg";
      colour = "кобальтовый";
      break;
    case 8:
      url =
        "https://otvet.imgsmail.ru/download/81140be2534899197ba5356842c43846_i-22.jpg";
      colour = "ультрамарин";
      break;
    case 9:
      url =
        "http://www.alltiles.ru/Ispanskaya_plitka/Vives/images/Monocolor_Mar_20x20.jpg";
      colour = "джинсовый";
      break;

    default:
  }
  if (state.color >= 10) {
    swt = 500;
    url =
      "http://vyantex.ru/d/773069/d/%D0%A2%D0%B5%D0%BC%D0%BD.%D0%A1%D0%B8%D0%BD%D0%B8%D0%B9.jpg";
    colour = "тёмно синий";
  }
  bot.sendPhoto(msg.from.id, url);
  bot.sendMessage(msg.from.id, "Ваш оттенок синего определённо " + colour);
  state.color = 0;
  state.i = 0;
  state.again = true;
}

bot.onText(/\/fav_color/, function(msg, match) {
  newQuestion(msg);
  state.again = false;
});
bot.onText(/\/start/, function(msg, match) {
  bot.sendMessage(
    msg.from.id,
    "Я могу прочитать по звездам оттенок синего, который предназначен именно тебе! Для этого тебе придётся написать /fav_color мне в чат и выбрать три предмета, которые тебе нравятся больше всего из предложенных"
  );
});

// Ответ от кнопок
bot.on("callback_query", function(msg) {
  if (!state.again) {
    let answer = msg.data.split("_");

    let button = answer[1];

    state.color = state.color + Number(button);

    if (state.i < questions.length) {
      newQuestion(msg);
    } else {
      answered(msg);
    }
  }
});
