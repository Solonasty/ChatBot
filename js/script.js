$(document).ready(function(){
    const button = document.getElementById('mibew-agent-button');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.popup__close');

    const helloBlock = document.querySelector('.popup__hello-block');
    const robot = document.querySelector('.popup__robot');
    const helloTitle = document.querySelector('.popup__hello-title');
    const helloSubtitle = document.querySelector('.popup__hello-subtitle');
    const chat = document.querySelector('.popup__chat');

    let timer1, timer2, timer3;

    button.addEventListener('click', function(e) {
        e.preventDefault();
        popup.classList.add('active');

        timer1 = setTimeout(() => {
            robot.classList.add('show');
            helloTitle.classList.add('show');
        }, 200);

        timer2 = setTimeout(() => {
            helloSubtitle.classList.add('show');
        }, 1400);

        timer3 = setTimeout(() => {
            chat.classList.add('show');
            helloBlock.style.display = 'none';
            chat.style.display = 'flex';
        }, 2500);//}, 2500);
    });

    closeBtn.addEventListener('click', function(e) {
        resetPopup();
    });

    // window.addEventListener('click', function(e) {
    //   if (e.target === popup) {
    //     resetPopup();
    //   }
    // });

    function resetPopup() {
        popup.classList.remove('active');
        helloBlock.style.display = 'flex';
        chat.style.display = 'none';

        robot.classList.remove('show');
        helloTitle.classList.remove('show');
        helloSubtitle.classList.remove('show');
        chat.classList.remove('show');

        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
    }

    // Chat

    const chatContent = document.getElementById('chatContent');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    let userTypingIndicator = null;


    function clearPlaceholder() {
    //   const placeholder = chatContent.querySelector('.popup__chat-text');
    //   if (placeholder) placeholder.remove();
    }

    function renderMessage(sender, text) {
      clearPlaceholder();

      const div = document.createElement('div');
      div.className = `popup__chat-message ${sender}`;
      div.textContent = text;
      chatContent.appendChild(div);
      chatContent.scrollTo({
        top: chatContent.scrollHeight,
        behavior: 'smooth'
      });
    }

    function showTypingIndicator(sender) {
        const typingDiv = document.createElement('div');
        typingDiv.className = `popup__chat-typing ${sender}`;
        typingDiv.innerHTML = `<img src="icons/dots.gif" alt="dots">`;
        chatContent.appendChild(typingDiv);
        chatContent.scrollTo({
          top: chatContent.scrollHeight,
          behavior: 'smooth'
        });
        return typingDiv;
      }
      
      function removeTypingIndicator(typingDiv) {
        if (typingDiv && typingDiv.parentNode) {
          typingDiv.parentNode.removeChild(typingDiv);
        }
      }

      // function getBotReply(userText) {
      //   const index = Math.floor(Math.random() * botReplies.length);
      //   return botReplies[index];
      // }

    async function getBotReply(userText) {
  const response = await fetch('https://25ed3bf22718.ngrok-free.app/api/get-gpt-reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: userText })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(error);
    return 'Произошла ошибка.';
  }

  const data = await response.json();
  return data.reply;
}


      sendButton.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (!text) return;

        renderMessage('user', text);
        chatInput.value = '';
        const typing = showTypingIndicator('bot');

        const botReply = getBotReply(text);
        setTimeout(() => {
            removeTypingIndicator(typing);
          renderMessage('bot', botReply);
        }, 1500);
      });

    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        sendButton.click();
      }
    });

    const botReplies = [
        "Привет! Чем могу помочь вам сегодня? 😊",
        "Спасибо, что обратились к нам. Пожалуйста, опишите вашу ситуацию чуть подробнее, чтобы я мог найти для вас лучшее решение.",
        "Это действительно важный вопрос. Давайте попробуем разобраться шаг за шагом.",
        "Минуточку, я проверю эту информацию и вернусь к вам с ответом.",
        "Если проблема сохраняется, пожалуйста, попробуйте обновить страницу или перезапустить приложение.",
        "Благодарю вас за ваше сообщение! Мы ценим ваше время и постараемся решить всё как можно быстрее.",
        "Можете уточнить детали? Например, когда началась проблема и что вы уже пробовали сделать?",
        "Хорошо, я сейчас всё проверю и постараюсь найти наиболее подходящий вариант решения для вашей ситуации.",
        "Извините, я вас немного не понял. Можете, пожалуйста, переформулировать или задать вопрос иначе?",
        "Благодарю за ваше терпение. Иногда на поиск информации уходит немного больше времени, но я обязательно помогу вам!",
        "Понимаю ваше беспокойство. Иногда такие ситуации требуют дополнительной проверки, поэтому я уточню детали и вернусь к вам с полным ответом в ближайшее время.",
        "Спасибо, что сообщили об этом. Если вы сможете прислать больше информации или скриншот проблемы, это поможет нам быстрее разобраться.",
        "Отлично, я зафиксировал ваш вопрос. Дайте мне пару секунд, чтобы всё перепроверить и подготовить для вас рекомендации.",
        "Я здесь, чтобы помочь вам в любое время. Если у вас возникнут дополнительные вопросы, не стесняйтесь задавать их прямо здесь.",
        "Ваш вопрос принят! Пока вы ожидаете, можете рассказать ещё что-нибудь, что поможет мне лучше понять ситуацию.",
        "Большое спасибо за ваше терпение и подробное описание ситуации. Понимаю, что иногда такие вопросы могут вызывать беспокойство или путаницу, поэтому я сделаю всё возможное, чтобы найти для вас максимально точное и быстрое решение, которое поможет вам вернуться к работе или отдыху без лишних задержек. Если у вас есть ещё какие-то дополнительные детали, которые могут помочь нам быстрее разобраться, пожалуйста, напишите их здесь — любая информация будет полезна.",
        "Мне очень важно, чтобы вы получили именно тот результат, на который рассчитываете. Поэтому я прямо сейчас начинаю проверку всех возможных причин проблемы и свяжусь с коллегами, если потребуется дополнительная помощь или консультация. Пожалуйста, оставайтесь на связи ещё пару минут — иногда решение занимает немного больше времени, но зато мы постараемся всё сделать правильно с первого раза.",
        "Спасибо за ваш вопрос и за то, что нашли время всё так подробно описать. Для нас очень важно понять все нюансы ситуации, поэтому я попрошу вас ещё немного подождать, пока я проведу полную проверку, изучу возможные причины и подготовлю для вас подробный план действий с пошаговыми инструкциями. Если в это время у вас появятся новые вопросы или детали — не стесняйтесь писать, я всё учту и помогу вам максимально быстро!"
      ];
      
});
