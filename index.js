var TelegramBot = require("node-telegram-bot-api");

var token = "390609420:AAGgOQfAmlP8sP9HrrVmpitIwyocvCUgQwU";

const bot = new TelegramBot(token, { polling: true });

anwser = color => {
  let swt = 0;
  let url;
  if (color < 0) {
    swt = -100;
    url = "https://goo.gl/naz2jk";
    //тёмно синий
  }
  switch (color) {
    case 1:
      swt = 100;
      url = "https://goo.gl/j3ZEi6";
      //голубой
      break;
    case 2:
      swt = 200;
      url = "https://goo.gl/6BQfPy";
      //аквамарин
      break;
    case 3:
      swt = 300;
      url = "https://goo.gl/pnDtsV";
      //тёмно бирюзовый
      break;
    case 4:
      swt = 400;
      url = "https://goo.gl/mxXC5o";
      //электрик
      break;

    default:
  }
  if (color >= 5) {
    swt = 500;
    url =
      "https://demotivators.to/media/posters/1514/31831085_chto-to-poshlo-ne-tak.jpg";
    //тёмно синий
  }
  return url;
};

bot.onText(/^\/selectseries/, function(msg, match) {
  var seriesKB = [["Yes"], ["No"]]; // The keyboard array
  bot.sendMessage(msg.chat.id, "Select a serie", {
    reply_markup: {
      keyboard: seriesKB,
      one_time_keyboard: true
    }
  });
  bot.onText(/.+/g, function(msg, match) {
    bot.sendMessage(msg.chat.id, "You selected " + match);
    var selectedSerie = msg.query;
  });
});

bot.onText(/\/start/, (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    "- привет, хочешь узнать, какой цвет - твой? Если готов, то напиши ок"
  );
  bot.onText(/\ок/i, (msg, match) => {
    started(msg, match);
  });
});
let flowers = (msg, match, color) => {
  bot.sendMessage(msg.chat.id, "Любите цветы? [люблю / не люблю]");

  bot.onText(/\люблю/i, function(msg, match) {
    color--;

    bot.sendMessage(msg.chat.id, "Розы или лилии?");
    bot.onText(/\Розы/i, function(msg, match) {
      color--;
      bot.sendMessage(msg.chat.id, "Вам больше нравится шоколад или кекс?");

      bot.onText(/\шоколад/, function(msg, match) {
        color++;
        bot.sendMessage(msg.chat.id, "Дайте подумать");
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
        setTimeout(function() {
          //bot.sendMessage(msg.chat.id, anwser(color));
          bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
          bot.sendPhoto(msg.chat.id, anwser(color));
        }, 10000);
      });

      bot.onText(/\кекс/i, function(msg, match) {
        color--;
        bot.sendMessage(msg.chat.id, "Дайте подумать");
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
        setTimeout(function() {
          //bot.sendMessage(msg.chat.id, anwser(color));
          bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
          bot.sendPhoto(msg.chat.id, anwser(color));
        }, 10000);
      });
    });
    bot.onText(/\Лилии/i, function(msg, match) {
      color++;
      bot.sendMessage(msg.chat.id, "Вам больше нравится шоколад или кекс?");

      bot.onText(/\шоколад/i, function(msg, match) {
        color--;
        bot.sendMessage(msg.chat.id, "Дайте подумать");
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
        setTimeout(function() {
          //bot.sendMessage(msg.chat.id, anwser(color));
          bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
          bot.sendPhoto(msg.chat.id, anwser(color));
        }, 5000);
      });

      bot.onText(/\кекс/i, function(msg, match) {
        color++;
        bot.sendMessage(msg.chat.id, "Дайте подумать");
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
        setTimeout(function() {
          //bot.sendMessage(msg.chat.id, anwser(color));
          bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
          bot.sendPhoto(msg.chat.id, anwser(color));
        }, 10000);
      });
    });
  });

  bot.onText(/\не люблю/i, function(msg, match) {
    color--;
    bot.sendMessage(msg.chat.id, "Вам больше нравится кофе или чай?");

    bot.onText(/\кофе/i, function(msg, match) {
      color--;
      bot.sendMessage(msg.chat.id, "Дайте подумать");
      bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
      setTimeout(function() {
        //bot.sendMessage(msg.chat.id, anwser(color));
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
        bot.sendPhoto(msg.chat.id, anwser(color));
      }, 10000);
    });

    bot.onText(/\чай/i, function(msg, match) {
      color++;
      bot.sendMessage(msg.chat.id, "Дайте подумать");
      bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
      setTimeout(function() {
        //bot.sendMessage(msg.chat.id, anwser(color));
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
        bot.sendPhoto(msg.chat.id, anwser(color));
      }, 10000);
    });
  });
  return;
};

let animals = (msg, match, color) => {
  bot.sendMessage(msg.chat.id, "Вам больше нравятся кошки или собаки?");

  bot.onText(/\кошки/i, function(msg, match) {
    color++;
    bot.sendMessage(msg.chat.id, "Дикие или Домашние?");

    bot.onText(/\Дикие/i, function(msg, match) {
      color++;
      bot.sendMessage(msg.chat.id, "Дайте подумать");

      setTimeout(function() {
        //bot.sendMessage(msg.chat.id, anwser(color));
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
        bot.sendPhoto(msg.chat.id, anwser(color));
      }, 10000);
      return bot.sendMessage(msg.chat.id, "Закончили");
    });

    bot.onText(/\Домашние/i, function(msg, match) {
      color++;
      bot.sendMessage(msg.chat.id, "Дайте подумать");
      bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
      setTimeout(function() {
        //bot.sendMessage(msg.chat.id, anwser(color));
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
        bot.sendPhoto(msg.chat.id, anwser(color));
      }, 10000);
    });
  });

  bot.onText(/\собаки/i, function(msg, match) {
    color--;
    bot.sendMessage(msg.chat.id, "Большие или Маленькие?");

    bot.onText(/\Большие/i, function(msg, match) {
      color++;
      bot.sendMessage(msg.chat.id, "Дайте подумать");
      bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
      setTimeout(function() {
        //bot.sendMessage(msg.chat.id, anwser(color));
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
        bot.sendPhoto(msg.chat.id, anwser(color));
      }, 10000);
    });
    bot.onText(/\Маленькие/i, function(msg, match) {
      color--;
      bot.sendMessage(msg.chat.id, "Дайте подумать");
      bot.sendMessage(msg.chat.id, "Определяем ваш цвет");
      setTimeout(function() {
        //bot.sendMessage(msg.chat.id, anwser(color));
        bot.sendMessage(msg.chat.id, "Определяем ваш цвет:" + color);
        bot.sendPhoto(msg.chat.id, anwser(color));
      }, 10000);
    });
  });

  return;
};

let started = (msg, match) => {
  let color = 0;

  // const chatId = msg.chat.id;

  bot.sendMessage(msg.chat.id, "Ну тогда начинаем.");
  bot.sendMessage(msg.chat.id, "Вам нравятся животные?");

  bot.onText(/\да/i, function(msg, match) {
    color++;
    animals(msg, match, color);
  });

  bot.onText(/\нет/i, function(msg, match) {
    color--;
    flowers(msg, match, color);
  });
  return;
};
