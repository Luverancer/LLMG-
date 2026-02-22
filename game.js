window.requestAnimFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (rafCallback) {
    window.setTimeout(rafCallback, 16.666666666666668)
  }
var animMode = false
function switchAnimFrameMode() {
  animMode = !animMode
  animMode
    ? (window.requestAnimFrame = function (rafCb2, rafEl2) {
        window.setTimeout(rafCb2, 16.666666666666668)
      })
    : (window.requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (rafCb3, rafEl3) {
            window.setTimeout(rafCb3, 16.666666666666668)
          }
        )
      })())
}
const coreScr = true
var myVers = '0.9.4',
  startTime = (statsLastTime = Date.now()),
  roomNow,
  pingBytes,
  totalChestsAll,
  sendBytes = 0,
  mainTimer = 0,
  modeSpeed = 0,
  bindsSelect = 0,
  plInfSelect = 0,
  raitingLoss = 0,
  bossCounter = 0,
  personalKills = 0,
  receivedBytes = {},
  raitingFall = false,
  openProcess = false,
  sayComments = false,
  exitRequest = false,
  exitProcess = false,
  modeInforms = false,
  bypassLeave = false,
  weaponFixed = false,
  bindsActive = false,
  plInfActive = false,
  bossAutoAim = false,
  otherTarget = false,
  skinPlayers = false,
  waitFarm = false,
  chatDeny = false,
  autoFarm = 0,
  varsFarm = 0,
  cordBossX = 0,
  cordBossY = 0,
  partErr = '',
  gloErr = '',
  outerErr = '',
  visualErr = '',
  isNewYear = false,
  random = {
    randNumOld: 0,
    getRandomInt: function (min, max) {
      var result =
        Math.floor(Math.random() * (max - min + 1)) + min
      if (result == random.randNumOld) {
        return random.getRandomInt(min, max)
      }
      return (random.randNumOld = result), result
    },
  }
function WND_parts_err(action, errorCode) {
  if (action == 'close') {
    Popup.close('#wnd_parts_err')
  } else {
    !$('#wnd_parts_err').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_parts_err" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 15px"><span style="color: red">ОШИБКА ЗАГРУЗКИ</span></h1><h3 style="margin-top: 5px">Не все необходимые файлы загрузились.</h3><h3 style="margin-top: 5px">Бывает, что из-за интернет-соединения или</h3><h3 style="margin-top: 5px">слабого ПК, они не успевают загрузиться.</h3><h3 style="margin-top: 5px">Необходимо перезапустить игру.</h3><h3 style="margin-top: 5px; font-size: 24px;">Код ошибки: <span style="color: orangered">' +
          errorCode +
          '</span></h3>' +
          '<div style="position: absolute; right: 75px; top: -242px;"><img src="https://aburus.ru/mod/puziri/img/sup/noo.png"></div>' +
          '</div>' +
          '</div>'
      ),
      Popup.open('#wnd_parts_err', false),
      $('#wnd_parts_err').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function createTextured() {
  // Access check bypassed - always grant access locally
  gameDataNew()
}
function configVars() {
  typeof currentVers != 'undefined' && myVers < currentVers
    ? WND_new_vers('open')
    : loadConfig(0)
}
function loadConfig(attempt) {
  // Local config: load from localStorage or use defaults
  var saved = null
  try { saved = localStorage.getItem('aburus_config') } catch(e) {}
  if (saved) {
    try { myConfig = JSON.parse(saved) } catch(e) { myConfig = [0,0,0,0,0,0,0,0] }
  } else {
    // Default config: [chat, weaponFixed, bypassLeave, sayComments, modeInforms, camera, skinPlayers, dynKoef]
    myConfig = [0, 0, 0, 0, 0, 0, 1, 0]
  }
  setupConfig()
  configLoaded()
}
function configMenu() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/php/binds.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: { Key: sizeAppPage },
  })
  setTimeout(waitPost, 250)
}
function waitPost() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/php/post.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: { Key: sizeAppPage },
  })
}
function clearPost() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/php/delpost.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: { Key: sizeAppPage },
  })
}
function waitMail() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/php/mail.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: { Key: sizeAppPage },
  })
}
function clearMail() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/php/delmail.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: { Key: sizeAppPage },
  })
}
function openedAll() {
  totalChestsAll =
    my_chests[1] +
    my_chests[2] +
    my_chests[3] +
    my_chests[4] +
    my_chests[5] +
    my_chests[10]
  totalChestsAll > 0
    ? (_chests_click({
        type: 'slot',
        slot: 5,
      }),
      _chests_click({ type: 'boss' }),
      openProcess == false && ((openProcess = true), WND_open_process('open')),
      setTimeout(openedAll, 50))
    : openProcess == true
    ? (WND_open_done('open'),
      WND_open_process('close'),
      WND_open_chest('close'),
      (openProcess = false))
    : (printHintOnScreen('Нечего открывать :('),
      $('div.hintOnScreen p.text').css({ color: redHints }))
}
function leaveProcess() {
  game.state == 1 &&
    (game.roomMode == room_modes.arena
      ? exitProcess == false
        ? bypassLeave == false
          ? WND_leave_confirm('open')
          : exitNow()
        : (printHintOnScreen('Нельзя выходить до начала игры!'),
          (exitRequest = true))
      : (confirmDie(), setTimeout(textLeave, 250)))
}
function exitNow() {
  otherTarget = true
  gameTarget.x = 0
  gameTarget.y = 0
  setTimeout(confirmDie, 50)
  setTimeout(function () {
    otherTarget = false
    textLeave()
  }, 250)
}
function lossRaiting() {
  raitingFall == false
    ? game.state == room_states.fin &&
      ((raitingFall = true),
      (otherTarget = true),
      (gameTarget.x = 0),
      (gameTarget.y = 0),
      printHintOnScreen('Обнуление рейтинга: ВКЛЮЧЕНО'),
      $('div.hintOnScreen p.text').css({ color: greenHints }),
      WND_raiting_fall('open'),
      setTimeout(fallRaiting, 2000))
    : ((raitingFall = false),
      (raitingLoss = 0),
      (otherTarget = false),
      printHintOnScreen('Обнуление рейтинга: ОТКЛЮЧЕНО'),
      $('div.hintOnScreen p.text').css({ color: redHints }),
      WND_raiting_fall('close'))
}
function fallRaiting() {
  raitingFall == true &&
    (game.state == room_states.fin && DO_play('arena'),
    game.state == room_states.run &&
      game.roomCondition == 1 &&
      (ws.disconnect(),
      setTimeout(textLeave, 250),
      setTimeout(textLoss, 2000),
      setTimeout(fallRaiting, 5000)))
}
function exitConfirm() {
  exitProcess = false
  exitRequest == true && textExit()
}
function infoUpdate() {
  $('#onGameComments span').html(commentsVar)
  $('#onGameRepair span').html(repairVar)
  $('#onGameLeave span').html(leaveVar)
  $('#onGameCamera span').html(cameraVar)
  $('#onGameChat span').html(chatVar)
  $('#onGameZoom span').html(zoomVar)
  sayComments == false
    ? $('#onGameComments span').css({ color: '#ff7777' })
    : $('#onGameComments span').css({ color: '#77ff77' })
  weaponFixed == false
    ? $('#onGameRepair span').css({ color: '#ff7777' })
    : $('#onGameRepair span').css({ color: '#77ff77' })
  bypassLeave == false
    ? $('#onGameLeave span').css({ color: '#ff7777' })
    : $('#onGameLeave span').css({ color: '#77ff77' })
  DYN_MODE == false
    ? $('#onGameCamera span').css({ color: '#ff7777' })
    : $('#onGameCamera span').css({ color: '#77ff77' })
  chatDeny == false
    ? $('#onGameChat span').css({ color: '#77ff77' })
    : $('#onGameChat span').css({ color: '#ff7777' })
  ZOOM_MODE == false
    ? $('#onGameZoom span').css({ color: '#ff7777' })
    : $('#onGameZoom span').css({ color: '#77ff77' })
}
function setupConfig() {
  myConfig[0] == 0
    ? ((chatDeny = false), (chatVar = 'Включен'))
    : ((chatDeny = true), (chatVar = 'Отключен'))
  myConfig[1] == 0
    ? ((weaponFixed = false), (repairVar = 'Отключена'))
    : ((weaponFixed = true), (repairVar = 'Включена'))
  myConfig[2] == 0
    ? ((bypassLeave = false), (leaveVar = 'Стандартный'))
    : ((bypassLeave = true), (leaveVar = 'Мгновенный'))
  myConfig[3] == 0
    ? ((sayComments = false), (commentsVar = 'Отключены'))
    : ((sayComments = true), (commentsVar = 'Включены'))
  myConfig[4] == 0
    ? ((modeInforms = false),
      $('#boostersInGame').removeClass('off'),
      $('#smilesBar').removeClass('off'),
      $('#onGameInfo').addClass('off'))
    : ((modeInforms = true),
      $('#boostersInGame').addClass('off'),
      $('#smilesBar').addClass('off'),
      $('#onGameInfo').removeClass('off'))
  myConfig[5] == 0
    ? ((DYN_MODE = true), (cameraVar = 'Динамический'))
    : ((DYN_MODE = false), (cameraVar = 'Стандартный'))
  myConfig[6] == 0 ? (skinPlayers = false) : (skinPlayers = true)
  DYN_KOEF_L = myConfig[7]
  DYN_KOEF = 0.65 - myConfig[7] / 100
  setTimeout(infoUpdate, 50)
}
function gameChatOut() {
  $('#chatInput #msg').val() != '' &&
    $.ajax({
      url: 'https://aburus.ru/mod/puziri/php/chat.php',
      method: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      cache: false,
      data: {
        myFile: prf_data.nick,
        chatNick: prf_data.nick,
        chatMesg: $('#chatInput #msg').val(),
      },
    })
  gameChatInput.send()
}
function zoomMode() {
  ZOOM_MODE == false
    ? ((ZOOM_MODE = true),
      (ZOOM_KOEF = ZOOM_KOEF_L),
      printHintOnScreen('Зум: ВКЛЮЧЕН'),
      $('div.hintOnScreen p.text').css({ color: greenHints }),
      (zoomVar = 'Включен'))
    : ((ZOOM_MODE = false),
      (ZOOM_KOEF = 0),
      printHintOnScreen('Зум: ОТКЛЮЧЕН'),
      $('div.hintOnScreen p.text').css({ color: redHints }),
      (zoomVar = 'Отключен'))
  setTimeout(infoUpdate, 50)
}
var downCNT = 3
function toBattle() {
  downCNT > 0 &&
    (printHintOnScreen(downCNT),
    $('div.hintOnScreen').css({ 'z-index': '2' }),
    $('div.hintOnScreen p.text').css({
      color: '#ffdd77',
      'text-shadow':
        '2px 0 0 #aa3300, -2px 0 0 #aa3300, 0 2px 0 #aa3300, 0 -2px 0 #aa3300, 2px 2px #aa3300, -2px -2px 0 #aa3300, 2px -2px 0 #aa3300, -2px 2px 0 #aa3300',
      'font-size': '72px',
    }),
    (downCNT -= 1))
}
function buyBoss() {
  DO_pbooster_buy(1)
}
function bossAimMode() {
  bossAutoAim == false
    ? ((bossAutoAim = true),
      printHintOnScreen('Автоприцел: БОСС'),
      $('div.hintOnScreen p.text').css({ color: '#33ff33' }))
    : ((bossAutoAim = false),
      printHintOnScreen('Автоприцел: ОТКЛЮЧЕН'),
      $('div.hintOnScreen p.text').css({ color: '#ff3333' }))
}
var allowRepair = [
  90, 80, 70, 60, 50, 41, 40, 32, 31, 30, 22, 21, 20, 12, 11, 10, 4, 3, 2, 1, 0,
]
function repairItems() {
  weaponFixed == true &&
    (typeof wpn_game[0] != 'undefined' &&
      allowRepair.includes(wpn_data[wpn_game[0]][3]) &&
        (weapons_list[wpn_game[0]].type == 2
          ? repairWeapon(wpn_game[0], 'w', false)
          : repairWeapon(wpn_game[0], 'w', true),
        setTimeout(function loadRetryTimer() {
          wpn_data[wpn_game[0]][3] >= 100
            ? (printHintOnScreen(
                'Оружие "' + weapons_list[wpn_game[0]].name + '"  починено!'
              ),
              $('div.hintOnScreen p.text').css({ color: greenHints }))
            : (printHintOnScreen(
                'Нет средств для починки "' +
                  weapons_list[wpn_game[0]].name +
                  '"!'
              ),
              $('div.hintOnScreen p.text').css({ color: redHints }))
        }, 2000)),
    typeof wpn_game[1] != 'undefined' &&
      allowRepair.includes(wpn_data[wpn_game[1]][3]) &&
        (weapons_list[wpn_game[1]].type == 2
          ? repairWeapon(wpn_game[1], 'w', false)
          : repairWeapon(wpn_game[1], 'w', true),
        setTimeout(function loadRetryTimer2() {
          wpn_data[wpn_game[1]][3] >= 100
            ? (printHintOnScreen(
                'Оружие "' + weapons_list[wpn_game[1]].name + '"  починено!'
              ),
              $('div.hintOnScreen p.text').css({ color: greenHints }))
            : (printHintOnScreen(
                'Нет средств для починки "' +
                  weapons_list[wpn_game[1]].name +
                  '"!'
              ),
              $('div.hintOnScreen p.text').css({ color: redHints }))
        }, 2500)),
    typeof my_skin[10] != 'undefined' &&
      my_skin[10] > 4 &&
        arm_data[my_skin[10]][3] <= 20 &&
          (repairWeapon(my_skin[10], 'a', true),
          setTimeout(function loadRetryTimer3() {
            arm_data[my_skin[10]][3] >= 100
              ? (printHintOnScreen(
                  '"' + armor_list[my_skin[10]].name + '"  починена!'
                ),
                $('div.hintOnScreen p.text').css({ color: greenHints }))
              : (printHintOnScreen(
                  'Нет средств для починки "' +
                    armor_list[my_skin[10]].name +
                    '"!'
                ),
                $('div.hintOnScreen p.text').css({ color: redHints }))
          }, 3000)))
}
function infoMe() {
  $.ajax({
    async: true,
    cache: false,
    type: 'POST',
    url:
      '/' +
      prf_data.api_name +
      '/' +
      my_ssid.substr(0, 32) +
      '/profile//' +
      Math.random(),
    data: { id: my_id },
    dataType: 'json',
    success: function (response) {
      if (typeof response.arr != 'undefined') {
        var nick = response.arr[0],
          color = '#' + response.arr[7],
          profileUrl = '',
          level = response.arr[3],
          playTime = '',
          clanName = '',
          clanRole = '',
          hasMount = '',
          hasPet = '',
          armorInfo = '',
          weapon1Talent = '',
          weapon2Talent = '',
          weapon1Info = '',
          weapon2Info = '',
          shieldInfo = '',
          retaliationInfo = '',
          resultArray = []
        response.arr[11] > 86400
          ? (playTime = Math.round(response.arr[11] / 86400) + 'д.')
          : (playTime = Math.round(response.arr[11] / 3600) + 'ч.')
        response.arr[16][2] == ''
          ? ((clanName = 'Нет'), (clanRole = 'Нет'))
          : ((clanName = response.arr[16][2]),
            response.arr[16][1] == 0 && (clanRole = 'Участник'),
            response.arr[16][1] == 1 && (clanRole = 'Старейш.'),
            response.arr[16][1] == 2 && (clanRole = 'Сорук.'),
            response.arr[16][1] == 3 && (clanRole = 'Глава'))
        if (response.arr[17] == 'vkontakte') {
          profileUrl = 'https://vk.com/id' + response.arr[12]
        } else {
          response.arr[17] == 'odnoklassniki'
            ? (profileUrl = 'https://ok.ru/profile/' + response.arr[12])
            : (profileUrl = 'https://www.draugiem.lv/user/' + response.arr[12])
        }
        response.arr[6][10] == 0
          ? (armorInfo = 'Нет')
          : (armorInfo =
              armor_list[response.arr[6][10]].name +
              ' (прочность ' +
              arm_data[response.arr[6][10]][3] +
              ')')
        response.arr[6][7] == '284'
          ? (hasMount = 'Есть')
          : (hasMount = 'Нет')
        response.arr[6][12] == '4' ? (hasPet = 'Есть') : (hasPet = 'Нет')
        response.arr[14].dmg1_wpn == wpn_game[0] &&
          (weapon1Talent = ' Талант ' + response.arr[14].dmg1)
        response.arr[14].dmg2_wpn == wpn_game[0] &&
          (weapon1Talent = ' Талант ' + response.arr[14].dmg2)
        response.arr[14].dmg1_wpn == wpn_game[1] &&
          (weapon2Talent = ' Талант ' + response.arr[14].dmg1)
        response.arr[14].dmg2_wpn == wpn_game[1] &&
          (weapon2Talent = ' Талант ' + response.arr[14].dmg2)
        typeof wpn_game[0] != 'undefined'
          ? (weapon1Info =
              wpn_game[0] +
              'Прочность ' +
              wpn_data[wpn_game[0]][3] +
              ' Уровень ' +
              wpn_data[wpn_game[0]][1] +
              weapon1Talent)
          : (weapon1Info = '0')
        typeof wpn_game[1] != 'undefined'
          ? (weapon2Info =
              wpn_game[1] +
              'Прочность ' +
              wpn_data[wpn_game[1]][3] +
              ' Уровень ' +
              wpn_data[wpn_game[1]][1] +
              weapon2Talent)
          : (weapon2Info = '0')
        response.arr[14].shield_wpn == '0'
          ? (shieldInfo = 'Нет')
          : (shieldInfo =
              weapons_list[response.arr[14].shield_wpn].name +
              ' (уровень ' +
              response.arr[14].shield +
              ')')
        response.arr[14].a_ret_wpn == '0'
          ? (retaliationInfo = 'Нет')
          : (retaliationInfo =
              weapons_list[response.arr[14].a_ret_wpn].name +
              ' (уровень ' +
              response.arr[14].a_ret +
              ')')
        resultArray = [
          nick,
          color,
          profileUrl,
          level,
          playTime,
          clanName,
          clanRole,
          hasMount,
          hasPet,
          armorInfo,
          weapon1Info,
          weapon2Info,
          shieldInfo,
          retaliationInfo,
        ]
        WND_player_info('open', 'player', resultArray)
      }
    },
  })
}
function infoBot(playerId) {
  var botNick = game.playersInfo[playerId].nick + '(БОТ)',
    weapon1Id,
    weapon2Id
  typeof Object.entries(game.playersInfo[playerId].wpl)[0] != 'undefined'
    ? (weapon1Id =
        weapons_list[Object.entries(game.playersInfo[playerId].wpl)[0][0]].id)
    : (weapon1Id = '0')
  typeof Object.entries(game.playersInfo[playerId].wpl)[1] != 'undefined'
    ? (weapon2Id =
        weapons_list[Object.entries(game.playersInfo[playerId].wpl)[1][0]].id)
    : (weapon2Id = '0')
  infoData = [botNick, weapon1Id, weapon2Id]
  WND_player_info('open', 'bot', infoData)
  console.info(infoData)
}
function infoProfile(profileId) {
  $.ajax({
    async: true,
    cache: false,
    type: 'POST',
    url:
      '/' +
      prf_data.api_name +
      '/' +
      my_ssid.substr(0, 32) +
      '/profile//' +
      Math.random(),
    data: { id: profileId },
    dataType: 'json',
    success: function (response) {
      if (typeof response.arr != 'undefined') {
        var nick = response.arr[0],
          color = '#' + response.arr[7],
          profileUrl = '',
          level = response.arr[3],
          playTime = '',
          clanName = '',
          clanRole = '',
          hasMount = '',
          hasPet = '',
          armorInfo = '',
          weapon1Talent = '',
          weapon2Talent = '',
          weapon1Info = '',
          weapon2Info = '',
          shieldInfo = '',
          retaliationInfo = '',
          resultArray = []
        response.arr[11] > 86400
          ? (playTime = Math.round(response.arr[11] / 86400) + 'д.')
          : (playTime = Math.round(response.arr[11] / 3600) + 'ч.')
        response.arr[16][2] == ''
          ? ((clanName = 'Нет'), (clanRole = 'Нет'))
          : ((clanName = response.arr[16][2]),
            response.arr[16][1] == 0 && (clanRole = 'Участник'),
            response.arr[16][1] == 1 && (clanRole = 'Старейш.'),
            response.arr[16][1] == 2 && (clanRole = 'Сорук.'),
            response.arr[16][1] == 3 && (clanRole = 'Глава'))
        if (response.arr[17] == 'vkontakte') {
          profileUrl = 'https://vk.com/id' + response.arr[12]
        } else {
          response.arr[17] == 'odnoklassniki'
            ? (profileUrl = 'https://ok.ru/profile/' + response.arr[12])
            : (profileUrl = 'https://www.draugiem.lv/user/' + response.arr[12])
        }
        response.arr[6][10] == 0
          ? (armorInfo = 'Нет')
          : (armorInfo =
              armor_list[response.arr[6][10]].name +
              ' (прочность ' +
              response.a_data[response.arr[6][10]][3] +
              ')')
        response.arr[6][7] == '284'
          ? (hasMount = 'Есть')
          : (hasMount = 'Нет')
        response.arr[6][12] == '4' ? (hasPet = 'Есть') : (hasPet = 'Нет')
        response.arr[14].dmg1_wpn == response.w_game[0] &&
          (weapon1Talent = ' Талант ' + response.arr[14].dmg1)
        response.arr[14].dmg2_wpn == response.w_game[0] &&
          (weapon1Talent = ' Талант ' + response.arr[14].dmg2)
        response.arr[14].dmg1_wpn == response.w_game[1] &&
          (weapon2Talent = ' Талант ' + response.arr[14].dmg1)
        response.arr[14].dmg2_wpn == response.w_game[1] &&
          (weapon2Talent = ' Талант ' + response.arr[14].dmg2)
        typeof response.w_game[0] != 'undefined'
          ? (weapon1Info =
              response.w_game[0] +
              'Прочность ' +
              response.w_data[response.w_game[0]][3] +
              ' Уровень ' +
              response.w_data[response.w_game[0]][1] +
              weapon1Talent)
          : (weapon1Info = '0')
        typeof wpn_game[1] != 'undefined'
          ? (weapon2Info =
              response.w_game[1] +
              'Прочность ' +
              response.w_data[response.w_game[1]][3] +
              ' Уровень ' +
              response.w_data[response.w_game[1]][1] +
              weapon2Talent)
          : (weapon2Info = '0')
        response.arr[14].shield_wpn == '0'
          ? (shieldInfo = 'Нет')
          : (shieldInfo =
              weapons_list[response.arr[14].shield_wpn].name +
              ' (уровень ' +
              response.arr[14].shield +
              ')')
        response.arr[14].a_ret_wpn == '0'
          ? (retaliationInfo = 'Нет')
          : (retaliationInfo =
              weapons_list[response.arr[14].a_ret_wpn].name +
              ' (уровень ' +
              response.arr[14].a_ret +
              ')')
        resultArray = [
          nick,
          color,
          profileUrl,
          level,
          playTime,
          clanName,
          clanRole,
          hasMount,
          hasPet,
          armorInfo,
          weapon1Info,
          weapon2Info,
          shieldInfo,
          retaliationInfo,
        ]
        WND_player_info('open', 'player', resultArray)
      }
    },
  })
}
function waitFfa() {
  waitFarm == true && (confirmDie(), setTimeout(replayFfa, 7000))
}
function replayFfa() {
  WND_die('replay')
  setTimeout(waitFfa, 1000)
}
function angleFarm() {
  varsFarm == 0 &&
    ((modifFarm = 1), $('#onFarmCords').html(nameAngle[varsFarm]))
  varsFarm == 1 &&
    ((modifFarm = 2), $('#onFarmCords').html(nameAngle[varsFarm]))
  varsFarm == 2 && $('#onFarmCords').html(nameAngle[varsFarm])
  varsFarm == 3 && $('#onFarmCords').html(nameAngle[varsFarm])
}
function freeFarm() {
  autoFarm == 0 &&
    ((otherTarget = false),
    $('#onFarmInfo').addClass('off'),
    $('#onFarmModes').css({ color: 'rgb(250, 100, 50)' }))
  autoFarm == 1 &&
    ((otherTarget = true),
    $('#onFarmInfo').removeClass('off'),
    $('#onFarmModes').html('Основа'),
    $('#onFarmCords').html(nameAngle[varsFarm]))
  autoFarm == 2 &&
    ($('#onFarmModes').html('Твинк'),
    $('#onFarmModes').css({ color: 'rgb(50, 250, 100)' }),
    splitFarm())
}
function splitFarm() {
  autoFarm == 2 && (game.sendKeyCode(null, 32), setTimeout(splitFarm, 1000))
}
function clearStatistics() {
  startTime = statsLastTime = Date.now()
  sendBytes = 0
  receivedBytes = {
    block: 0,
    total: 0,
    cells: 0,
    cells_t: 0,
    ping: 0,
    ping_cnt: 1,
    ping_sum: 0,
    food: 0,
    stuff: 0,
    elixir: 0,
    mass: 0,
    aWeapons: 0,
    weapons: 0,
    explosions: 0,
    effects: 0,
    damage: 0,
    rating: 0,
    json: 0,
  }
}
clearStatistics()
var ws_commands = {
    newGame: 0,
    replay: 1,
    target: 2,
    repeatableWeapons: 3,
    players: 4,
    stuff: 5,
    mass: 6,
    activatedWeapons: 7,
    weapons: 8,
    explosions: 9,
    weapons_lt: 10,
    playerMana: 11,
    playerEffects: 12,
    playerWeaponsLine: 13,
    playerWeaponUse: 14,
    chestDaily: 15,
    chest: 16,
    damage: 17,
    noElixir: 18,
    elixirPot: 19,
    roomInfo: 20,
    playersList: 21,
    playerInfo: 22,
    playerRemove: 23,
    ffaFinish: 24,
    playerLimits: 25,
    playerEaten: 26,
    playerBoosterCollect: 27,
    noSplit: 28,
    emotions: 29,
    playerBoosterUse: 30,
    playerAddMass: 31,
    roomChgState: 32,
    questProgress: 33,
    massLimit: 34,
    playerStdKeys: 35,
    sknHealth: 36,
    hallOfFame: 37,
    hofUsrList: 38,
    arenaFinish: 39,
    respawnState: 40,
    food_mass: 41,
    roomTimeout: 42,
    chat: 43,
    chatBubbleState: 44,
    arenaFinishTeam: 45,
    teamsHof: 46,
    inactiveSuicide: 47,
    arenaSuicide: 48,
    usePBooster: 49,
    initArtefact: 50,
    armor: 51,
    stateInvisible: 52,
    useArmor: 53,
    playerBuffs: 54,
    drop: 55,
    bossHof: 56,
    bossFinish: 57,
    playerEffectsClear: 58,
    nodeRefresh: 97,
    readyToPlay: 98,
    sessionDie: 99,
    log: 100,
  },
  stuff_types = {
    coin: 1,
    elixir: 2,
    std_key: 3,
    booster: 4,
    ruby: 5,
  },
  cell_status_types = {
    none: 0,
    dangerInJump: 1,
    danger: 2,
    canEat: 3,
    canEatInJump: 4,
  },
  weapon_action_types = {
    linear: 0,
    radial: 1,
    random: 2,
    static: 3,
  },
  damage_flags = {
    crit: 1,
    shield: 2,
    shield_all: 4,
    attack: 8,
    reflect: 16,
    live: 32,
  },
  decor_types = {
    fountain: 0,
    broken_brick: 1,
  },
  room_modes = {
    ffa: 0,
    arena: 1,
    boss: 2,
  },
  room_states = {
    init: 0,
    run: 1,
    fin: 2,
  },
  clan_text_color = '#76332D',
  team_hcolors = ['teamRed', 'teamRed', 'teamBlue', 'teamGreen'],
  team_hscolors = ['red', 'red', 'blue', 'green'],
  team_colors = ['mediumvioletred', '#e34909', '#0050d5', '#329900'],
  game_suicide_inactive = false,
  gameTarget = {
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
    offsetX: 0,
    offsetY: 0,
    lastSend: 0,
    mouseInit: false,
    newCoord: false,
    lastClick: 0,
    clicksCount: 0,
    jTimer: null,
    setJoystickCoord: function (joyX, joyY) {
      this.jTimer != null && (clearTimeout(this.jTimer), (this.jTimer = null))
      if (joyX == 0 && joyY == 0) {
      } else {
        this.mouseX = game.viewportCenterX + joyX
        this.mouseY = game.viewportCenterY + joyY
        this.mouseInit = true
        this.newCoord = true
        game_suicide_inactive && (WND_suicide_inactive('close'), cancelDie())
      }
    },
    setMouseCoord: function (pageX, pageY) {
      this.mouseX = pageX - this.offsetX
      this.mouseY = pageY - this.offsetY
      this.mouseInit = true
      this.newCoord = true
    },
    setTarget: function (targetX, targetY) {
      otherTarget == false &&
        (bossAutoAim == false
          ? modeSpeed == 0
            ? ((this.x = Math.round(targetX)),
              (this.y = Math.round(targetY)))
            : ((this.x = Math.round(targetX) / 100),
              (this.y = Math.round(targetY) / 100))
          : ((this.x = Math.round(cordBossX) / attacSpeed),
            (this.y = Math.round(cordBossY) / attacSpeed)))
      if (!game.questMode) {
        if (game.player != null) {
          var coordArr = new Int16Array(2)
          coordArr[0] = this.x
          coordArr[1] = this.y
          ws.sendB(coordArr)
          this.newCoord = false
        }
      } else {
        game.player != null && (game.player.target = [this.x, this.y])
      }
    },
  },
  game = {
    focused: true,
    viewAspect: 0,
    viewportCenterX: 0,
    viewportCenterY: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    roomGraphicsId: 1,
    pre_roomGraphicsId: 1,
    roomWidth: 0,
    roomHeight: 0,
    pre_roomWidth: 0,
    pre_roomHeight: 0,
    suicidePause: 0,
    emotionTime: 2,
    chatBubbleTime: 1,
    massSlowDown: 20000,
    foodMass: [0, 0, 0],
    foodRadius: [0, 0, 0],
    massMass: 20,
    massRadius: 20,
    boosterRadius: 0,
    elixirRadius: 0,
    coinRadius: 0,
    rubyRadius: 0,
    std_keyRadius: 0,
    collision_cell_koef: 1.2,
    terrain: null,
    food: {},
    stuff: {},
    mass: {},
    players: {},
    playersInfo: {},
    hofInfo: {},
    player: null,
    playerRating: null,
    playerMana: 0,
    playerBufs: {
      food_mass: 0,
      food_mass_koef: 1,
    },
    playerLimits: {
      coins: false,
      ruby: false,
      std_keys: false,
    },
    aWeapons: {},
    rpWeapons: {},
    weapons: {},
    wall: {},
    eat: [],
    damage: [],
    effects: [],
    explodes: [],
    decor: {},
    pre_decor: {},
    preload_effects: {},
    preload_weapons: {},
    mouse: {},
    limitHints: {
      elixir: {
        count: 1,
        lastTime: 0,
      },
      coins: {
        count: 1,
        lastTime: 0,
      },
      ruby: {
        count: 1,
        lastTime: 0,
      },
      std_keys: {
        count: 1,
        lastTime: 0,
      },
      subscr: {
        count: 1,
        lastTime: 0,
      },
    },
    eatedBy: 0,
    move_arrow: null,
    team_arrow: null,
    team_stroke: null,
    revenge_arrow: null,
    revenge_icon_sk: null,
    revenge_icon: null,
    chatBubble: null,
    armor_icon: null,
    eatInJump: null,
    dangerJump: null,
    aura_canEat: null,
    aura_danger: null,
    weapon_circle: null,
    damage_line: null,
    damage_ring: null,
    foodTree: null,
    state: 2,
    questMode: false,
    questWaiting: false,
    questAllowSplit: false,
    questArrowTimer: 0,
    loading: false,
    lastUpdate: Date.now(),
    lastDrawUpdate: Date.now(),
    initialized: false,
    fullScreen: false,
    fastChatMode: false,
    splitHintTimer: null,
    nodeRefresh: false,
    roomMgrTick: null,
    roomState: null,
    roomCondition: 0,
    roomInitMode: null,
    roomMode: null,
    stateTimer: 0,
    arenaWinKills: 50,
    arenaPlayersMax: 9,
    eatMaxMassKoef: 0.75,
    bossLutRng: [],
    bossLut: [],
    bossAngryPrc: 0,
    connecting: false,
    finished: true,
    fullRoom: false,
    updateStep: 0,
    updStep: 0,
    startTime: 0,
    gameHiSpeedMode: true,
    gameHiSpeedModeSet: true,
    testing: false,
    init: function () {
      this.connecting = true
      this.finished = false
      this.nodeRefresh = false
      if (!this.initialized) {
        var wasHidden = $('#gameBody').hasClass('off')
        $('#gameBody').removeClass('off')
        texturesLib.free()
        this.onResize()
        wasHidden && $('#gameBody').addClass('off')
        this.initialized = true
      }
      this.focused && (gameTarget.skipClick = false)
    },
    start: function (roomData) {
      this.connecting = false
      this.finished = false
      animEvents('gameStart')
      countFPS.clear()
      this.startTime = 0
      this.gameHiSpeedMode = true
      this.gameHiSpeedModeSet = true
      StatAnalytics.sendTimeEvent(StatAnalytics.GameLoading)
      this.questMode = false
      this.roomMode = roomData.mode
      this.roomManager('init', [roomData.stt, roomData.stm, roomData.cnd])
      game.addQuestBar()
      game.initLeaderBoard()
      this.limitHints.elixir.count = 10
      this.limitHints.coins.count = 10
      this.limitHints.ruby.count = 10
      this.limitHints.std_keys.count = 10
      this.limitHints.subscr.count = 10
      this.loading = $('#wnd_game_loader').length
      if (!this.loading) {
        confirmPlay()
      }
      this.onResize()
      this.viewportWidth = roomData.vw
      this.viewportHeight = roomData.vh
      this.roomGraphicsId = roomData.g
      this.pre_roomGraphicsId = roomData.pg
      this.roomWidth = roomData.w
      this.roomHeight = roomData.w
      this.pre_roomWidth = roomData.pw
      this.pre_roomHeight = roomData.pw
      this.foodMass = roomData.fm
      this.foodRadius = roomData.fr
      this.massMass = roomData.mm
      this.massRadius = roomData.mr
      this.elixirRadius = roomData.er
      this.boosterRadius = roomData.br
      this.coinRadius = roomData.cr
      this.rubyRadius = roomData.rr
      this.std_keyRadius = roomData.tr
      this.suicidePause = parseInt(roomData.sp)
      this.massSlowDown = parseInt(roomData.msl) * 10
      this.playerBufs.food_mass = parseInt(roomData.af)
      this.playerBufs.food_mass_koef = parseInt(roomData.afk)
      this.emotionTime = parseInt(roomData.et)
      this.arenaWinKills = parseInt(roomData.mk)
      this.arenaPlayersMax =
        typeof roomData.mp != 'undefined' ? parseInt(roomData.mp) : 9
      this.eatMaxMassKoef = parseFloat(roomData.ek)
      this.eatedBy = roomData.eb
      this.bossLutRng = typeof roomData.brn != 'undefined' ? roomData.brn : []
      this.bossLut = typeof roomData.bl != 'undefined' ? roomData.bl : []
      this.bossAngryPrc = typeof roomData.ba != 'undefined' ? roomData.ba : 0
      if (this.bossLutRng.length > 0) {
        for (
          var i = 0;
          i < this.bossLutRng.length - 1;
          i++
        ) {
          $('#bossHpBar div#bhp' + i).css(
            'left',
            this.bossLutRng[i] + '%'
          )
        }
      }
      if (this.bossLut.length > 0) {
        for (var i = 1; i < this.bossLut.length; i++) {
          $('#bossHpBar div#step' + i).html(
            '+' + this.bossLut[i]
          )
        }
      }
      this.playerRating = {
        currentLeague: parseInt(prf_data.league),
        currentDevision: parseInt(prf_data.lea_div),
        beforeRating: parseInt(prf_data.rating),
        currentRating: parseInt(prf_data.rating),
        collectedRating: -1,
      }
      $('#keyBar').remove()
      this.preload_graphics()
      for (var decorKey in roomData.pdecor) {
        var decorItem = roomData.pdecor[decorKey]
        this.pre_decor[decorKey] = newGlObject({
          x: decorItem.x,
          y: decorItem.y,
          size: decorItem.size,
          texture_pack: 'decor',
          texture: decorItem.type,
          createMesh: true,
        })
        this.pre_decor[decorKey].type = decorItem.type
        this.pre_decor[decorKey].cKoef = decorItem.cKoef
      }
      this.decor = {}
      for (var decorKey in roomData.decor) {
        var decorItem = roomData.decor[decorKey]
        this.decor[decorKey] = newGlObject({
          x: decorItem.x,
          y: decorItem.y,
          size: decorItem.size,
          texture_pack: 'decor',
          texture: decorItem.type,
          createMesh: true,
        })
        this.decor[decorKey].type = decorItem.type
        this.decor[decorKey].cKoef = decorItem.cKoef
      }
      this.createRoom()
      if (
        (this.roomMode == room_modes.arena ||
          this.roomMode == room_modes.boss) &&
        this.roomState != room_states.run
      ) {
        Boosters.hide()
      } else {
        if (modeInforms == false) {
          Boosters.show()
        }
      }
      camera.lastUpdate = Date.now()
      this.state = room_states.run
      this.mainUpdate()
      this.main()
    },
    startQuest: function () {
      this.loading = true
      animEvents('gameStart')
      countFPS.clear()
      StatAnalytics.sendTimeEvent(StatAnalytics.QuestLoading)
      this.roomMode = room_modes.ffa
      this.roomState = room_states.run
      this.questMode = true
      this.onResize()
      this.viewportWidth = 1000
      this.viewportHeight = 600
      this.roomWidth = 2500
      this.roomHeight = 1550
      this.foodMass = [50, 10, 20]
      this.foodRadius = [50, 40, 50]
      this.elixirRadius = 250
      this.foodTree = createQuadTree(100)
      this.terrain = newGlObject({
        x: -1500,
        y: -770,
        size: 20000,
        texture_pack: 'terrain',
        texture: 0,
        tiles: 1,
      })
      createTiledSquareMesh(this.terrain)
      this.weapon_circle = newGlObject({
        texture_pack: 'aWeapons',
        texture: 0,
        createMesh: true,
      })
      this.target_line = newGlObject({
        texture_pack: 'target_line',
        texture: 0,
        createMesh: true,
      })
      this.allow_ring = newGlObject({
        texture_pack: 'allow_ring',
        texture: 0,
        createMesh: true,
      })
      this.damage_line = newGlObject({
        texture_pack: 'damage_line',
        texture: 0,
        createMesh: true,
      })
      this.damage_ring = newGlObject({
        texture_pack: 'damage_ring',
        texture: 0,
        createMesh: true,
      })
      this.chatBubble = newGlObject({
        texture_pack: 'chat_bubble',
        texture: 0,
        createMesh: true,
      })
      this.eatInJump = newGlObject({
        texture_pack: 'cell_status',
        texture: 4,
        createMesh: true,
      })
      this.dangerJump = newGlObject({
        texture_pack: 'cell_status',
        texture: 5,
        createMesh: true,
      })
      this.aura_canEat = newGlObject({
        texture_pack: 'cell_status',
        texture: 'free',
        createMesh: true,
      })
      this.aura_danger = newGlObject({
        texture_pack: 'cell_status',
        texture: 'danger',
        createMesh: true,
      })
      this.armor_icon = newGlObject({
        texture_pack: 'armor',
        texture: 0,
        createMesh: true,
      })
      this.playersInfo.p0 = {
        id: 0,
        prf: 0,
        nick: 'Guest',
        skin: my_skin,
        elixirMax: 20,
        wpl: [2],
        removeTime: 0,
        elixir: 10,
        mesh_nick: getTextLabel('Guest', 2),
        mesh_clan: null,
        mesh: newGlObject({
          skin: my_skin,
          createMesh: true,
        }),
      }
      var startMass = prf_data.quest_step == questSteps.length ? 200 : 1000
      this.players.p0 = this.createPlayer()
      this.players.p0.cells.c0 = newGlSimpleObject({
        id: 'c0',
        size: massToRadius(startMass),
      })
      this.players.p0.cells.c0.position = [2000, 800, 0]
      this.players.p0.target = [0, 0, 0]
      this.players.p0.cells.c0.divideSpeed = 0
      this.players.p0.cells.c0.speed = 1200
      this.players.p0.cells.c0.mass = startMass
      this.players.p0.cells.c0.angle = 0
      this.players.p0.cells.c0.eat = {
        mass: 0,
        time: 0,
      }
      this.players.p0.cells.c0.timeToCollapse = Date.now()
      this.players.p0.mainCell = this.players.p0.cells.c0
      this.player = this.players.p0
      camera.position[X] = this.players.p0.cells.c0.position[X]
      camera.position[Y] = this.players.p0.cells.c0.position[Y]
      camera.scale = 3
      this.playerMana = 10
      WeaponBar.update([2])
      $('#elixirBar').addClass('off')
      $('#myWeaponBar').addClass('off')
      $('.gameInfoBlock').addClass('off')
      Boosters.hide()
      this.state = room_states.run
      this.mainUpdate()
      this.main()
    },
    onLoadingProgress: function () {
      if ($('#wnd_game_loader').length && game.loading) {
        var progressPercent = Math.round(
          (texturesLib.loaded / texturesLib.count) * 100
        )
        $('#wnd_game_loader .progressText').html('<em>' + progressPercent + '</em>%')
        $('#wnd_game_loader .progress').css({ width: progressPercent + '%' })
        texturesLib.loaded == texturesLib.count &&
          (!this.questMode
            ? (confirmPlay(), StatAnalytics.send(StatAnalytics.GameLoading))
            : StatAnalytics.send(StatAnalytics.QuestLoading),
          (game.loading = false),
          (this.startTime = Date.now()),
          setTimeout(function () {
            WND_game_loader('close')
            stopSound('music', 'room')
            stopSound('music', 'room_ambient')
            playSound('music', 'gameplay', 0, 999)
            mobileButtons.showControllers(true)
            isMobileApp &&
              (game.roomMode == room_modes.arena ||
                game.roomMode == room_modes.boss) &&
              this.roomState != room_states.run &&
              mobileButtons.showJump(false)
            $('#infoName0').html('Пусто')
            $('#infoName1').html('Пусто')
            $('#infoName2').html('Пусто')
            $('#infoName3').html('Пусто')
            $('#infoName4').html('Пусто')
            $('#infoName5').html('Пусто')
            $('#infoName6').html('Пусто')
            $('#infoName7').html('Пусто')
            $('#infoName8').html('Пусто')
            plInfId = ['', '', '', '', '', '', '', '', '']
            wpn_game.length < 2
              ? ($('#myWeapons').css({ width: '160px' }),
                $('#durabilityTwoPercent').html(''))
              : ($('#myWeapons').css({ width: '240px' }),
                $('#durabilityTwoPercent').html('%'))
            my_skin[10] > 0
              ? ($('#slotArm img').attr(
                  'src',
                  '/img/armor/' + my_skin[10] + '.png'
                ),
                $('#durabilityArmPercent').html('%'))
              : ($('#slotArm img').attr('src', '/img/opengl/other/empty.png'),
                $('#durabilityArmPercent').html('Пусто..'))
            setTimeout(function onLoadDone() {
              ;(roomNow != myPing || pingBytes != myPing) && updateMaidGame()
            }, 4000)
            game.questMode
              ? ((game.players.p0.cells.c0.position = [700, 800, 0]),
                (game.players.p0.target = [0, 0, 0]),
                (camera.position[X] = game.players.p0.cells.c0.position[X]),
                (camera.position[Y] = game.players.p0.cells.c0.position[Y]),
                game.setQuestStep(questSteps.length - prf_data.quest_step),
                StatAnalytics.sendTimeEvent(StatAnalytics.QuestDone),
                StatAnalytics.sendTimeEvent(StatAnalytics.QuestSkip),
                prf_data.quest_step == questSteps.length &&
                  StatAnalytics.send(StatAnalytics.QuestStart))
              : (StatAnalytics.sendTimeEvent(StatAnalytics.GameFinish),
                allowFullScreen &&
                  __hxda.indexOf('fscr') == -1 &&
                  setTimeout(function () {
                    __hxda.indexOf('fscr') == -1 &&
                      !isMobileApp &&
                      (Hints.text('fullScreen'),
                      Arrows.runTemplate('fullScreen'))
                  }, 8000))
          }, 500))
      }
    },
    addQuestBar: function () {
      Tasks.init()
      this.tasksInitialized = true
    },
    initLeaderBoard: function () {
      this.roomMode == room_modes.ffa
        ? ($('#leaderBoard').removeClass('off'),
          $('#teamLeaderBoard').addClass('off'),
          $('#myPersonalKills').addClass('off'),
          $('#onArenaInfo').addClass('off'),
          $('#onBossStats').addClass('off'),
          $('#bossBoosters').addClass('off'))
        : ($('#leaderBoard').addClass('off'),
          $('#teamLeaderBoard').removeClass('off'),
          $('#myPersonalKills').removeClass('off'),
          $('#onArenaInfo').removeClass('off'),
          this.roomMode == room_modes.boss
            ? ($('#teamLeaderBoard').addClass('boss'),
              $('#myPersonalKills').addClass('off'),
              $('#onArenaInfo').addClass('off'),
              $('#onBossStats').removeClass('off'),
              $('#bossBoosters').removeClass('off'),
              $('#bossBoosters span').html(getBoostersCount(1)))
            : ($('#teamLeaderBoard').removeClass('boss'),
              $('#myPersonalKills').removeClass('off'),
              $('#onArenaInfo').removeClass('off'),
              $('#onBossStats').addClass('off'),
              $('#bossBoosters').addClass('off')))
    },
    sendKeyCode: function (keyEvent, keyCode, isMobile) {
      if (typeof keyEvent != 'undefined' && keyEvent != null) {
        keyEvent.stopPropagation()
      }
      gameTarget.skipClick = false
      isMobile = isMobile || false
      if (!this.questMode) {
        if (
          keyCode == 81 &&
          typeof wpn_data[WeaponBar.ids[0]] != 'undefined' &&
          wpn_data[WeaponBar.ids[0]][3] <= 0
        ) {
          Hints.text('weaponBroken')
          return
        }
        if (
          keyCode == 87 &&
          typeof wpn_data[WeaponBar.ids[1]] != 'undefined' &&
          wpn_data[WeaponBar.ids[1]][3] <= 0
        ) {
          Hints.text('weaponBroken')
          return
        }
        if (keyCode == 88 && game.state == room_states.run) {
          game.roomMode == room_modes.boss
            ? bossAimMode()
            : bossAutoAim == false
            ? printHintOnScreen('В этом режиме нет босса!')
            : bossAimMode()
          return
        }
        if (keyCode == 90 && game.state == room_states.run) {
          zoomMode()
          return
        }
        if (
          keyCode == 107 &&
          game.state == room_states.run &&
          DYN_MODE == true &&
          DYN_KOEF_L < 20
        ) {
          DYN_KOEF -= 0.01
          DYN_KOEF_L += 1
          printHintOnScreen('Динамический зум = ' + DYN_KOEF_L)
          $('div.hintOnScreen p.text').css({ color: '#33ffff' })
          return
        }
        if (
          keyCode == 109 &&
          game.state == room_states.run &&
          DYN_MODE == true &&
          DYN_KOEF_L > -20
        ) {
          DYN_KOEF += 0.01
          DYN_KOEF_L -= 1
          printHintOnScreen('Динамический зум = ' + DYN_KOEF_L)
          $('div.hintOnScreen p.text').css({ color: '#33ffff' })
          return
        }
        if (keyCode >= 49 && keyCode <= 53 && this.fastChatMode) {
          gameChatInput.send(Texts.fastChat[keyCode - 49])
          return
        }
        var keyArr = new Int8Array(1)
        keyArr[0] = keyCode + (keyCode == 81 || keyCode == 87 ? 0 : 0)
        ws.sendB(keyArr)
      } else {
        if (keyCode == 81) {
          this.useQuestWeapon(isMobile)
        } else {
          keyCode == 32 && this.splitQuestPlayer()
        }
      }
    },
    createRoom: function () {
      this.terrain = newGlObject({
        x: -8000,
        y: -8000,
        size: this.roomWidth + 16000,
        texture_pack: 'terrain',
        texture: this.roomGraphicsId,
        tiles: Math.round((this.roomWidth + 16000) / 1750),
        createMesh: true,
      })
      this.wall.top = newGlObject({
        x: this.roomWidth / 2,
        y: this.roomHeight + 1390,
        width: this.roomWidth / 2,
        height: 1380,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_top',
        tiles: Math.round(this.roomWidth / 1750),
        createMesh: true,
      })
      this.wall.bottom = newGlObject({
        x: this.roomWidth / 2,
        y: -1420,
        width: this.roomWidth / 2,
        height: 1380,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_bottom',
        tiles: Math.round(this.roomWidth / 1750),
        createMesh: true,
      })
      this.wall.left = newGlObject({
        x: -1400,
        y: this.roomHeight / 2,
        width: 1380,
        height: this.roomHeight / 2,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_left',
        tiles: Math.round(this.roomWidth / 1750),
        createMesh: true,
      })
      this.wall.right = newGlObject({
        x: this.roomWidth + 1420,
        y: this.roomHeight / 2,
        width: 1380,
        height: this.roomHeight / 2,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_right',
        tiles: Math.round(this.roomWidth / 1750),
        createMesh: true,
      })
      this.wall.top_left = newGlObject({
        x: -800,
        y: this.roomHeight + 800,
        size: 2000,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_top_left',
        createMesh: true,
        autoScale: true,
      })
      this.wall.top_right = newGlObject({
        x: this.roomWidth + 800,
        y: this.roomHeight + 800,
        size: 2000,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_top_right',
        createMesh: true,
        autoScale: true,
      })
      this.wall.bottom_left = newGlObject({
        x: -800,
        y: -800,
        size: 2000,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_bottom_left',
        createMesh: true,
        autoScale: true,
      })
      this.wall.bottom_right = newGlObject({
        x: this.roomWidth + 800,
        y: -800,
        size: 2000,
        texture_pack: 'wall',
        texture: this.roomGraphicsId + '_bottom_right',
        createMesh: true,
        autoScale: true,
      })
      this.weapon_circle = newGlObject({
        texture_pack: 'aWeapons',
        texture: 0,
        createMesh: true,
      })
      this.target_line = newGlObject({
        texture_pack: 'target_line',
        texture: 0,
        createMesh: true,
      })
      this.allow_ring = newGlObject({
        texture_pack: 'allow_ring',
        texture: 0,
        createMesh: true,
      })
      this.damage_line = newGlObject({
        texture_pack: 'damage_line',
        texture: 0,
        createMesh: true,
      })
      this.damage_ring = newGlObject({
        texture_pack: 'damage_ring',
        texture: 0,
        createMesh: true,
      })
      this.chatBubble = newGlObject({
        texture_pack: 'chat_bubble',
        texture: 0,
        createMesh: true,
      })
      this.eatInJump = newGlObject({
        texture_pack: 'cell_status',
        texture: 4,
        createMesh: true,
      })
      this.dangerJump = newGlObject({
        texture_pack: 'cell_status',
        texture: 5,
        createMesh: true,
      })
      this.aura_canEat = newGlObject({
        texture_pack: 'cell_status',
        texture: 'free',
        createMesh: true,
      })
      this.aura_danger = newGlObject({
        texture_pack: 'cell_status',
        texture: 'danger',
        createMesh: true,
      })
      this.armor_icon = newGlObject({
        texture_pack: 'armor',
        texture: 0,
        createMesh: true,
      })
      this.foodTree = createQuadTree(100)
    },
    createFood: function (foodData) {
      var textureIdx =
          foodData.group < 3
            ? Math.round(Math.random() * (resources.food.count - 1))
            : 0,
        foodRadius =
          foodData.group < 3
            ? this.foodRadius[foodData.group]
            : this.massRadius,
        foodObj = newGlObject({
          x: foodData.x,
          y: foodData.y,
          size: foodRadius * (this.gameHiSpeedMode ? 0.5 : 1),
          texture_pack: foodData.group < 3 ? 'food' : 'mass',
          texture: textureIdx,
          createMesh: true,
        })
      return (
        foodObj.setNewSize(foodRadius),
        (foodObj.group = foodData.group),
        (foodObj.mass =
          foodData.group < 3
            ? this.foodMass[foodData.group]
            : foodData.group),
        foodObj
      )
    },
    createStuff: function (stuffData) {
      var stuffType = 1,
        stuffRadius = 0
      switch (stuffData.type) {
        case stuff_types.coin:
          ;(stuffType = stuffData.type), (stuffRadius = this.coinRadius)
          break
        case stuff_types.ruby:
          ;(stuffType = stuffData.type), (stuffRadius = this.rubyRadius * 1.5)
          break
        case stuff_types.elixir:
          ;(stuffType = stuffData.type), (stuffRadius = this.elixirRadius)
          break
        case stuff_types.std_key:
          ;(stuffType = stuffData.type), (stuffRadius = this.std_keyRadius)
          break
        case stuff_types.booster:
          ;(stuffType = stuffData.type + '_' + stuffData.typeId),
            (stuffRadius = this.boosterRadius)
          break
      }
      var stuffObj = newGlObject({
        x: stuffData.x,
        y: stuffData.y,
        size: stuffRadius / 2,
        texture_pack: 'stuff',
        texture: stuffType,
        createMesh: true,
      })
      stuffObj.stuffType = stuffData.type
      stuffObj.setNewSize(stuffRadius)
      switch (stuffData.type) {
        case stuff_types.coin:
          stuffObj.newAlpha = this.playerLimits.coins ? 0.6 : 1
          break
        case stuff_types.ruby:
          stuffObj.newAlpha = this.playerLimits.ruby ? 0.6 : 1
          break
        case stuff_types.elixir:
          stuffObj.newAlpha = 1
          break
        case stuff_types.std_key:
          stuffObj.newAlpha = this.playerLimits.std_keys ? 0.6 : 1
          break
        case stuff_types.booster:
          stuffObj.newAlpha =
            typeof this.player == 'undefined'
              ? 1
              : !this.playersInfo[this.player.id].bst
              ? 0.6
              : 1
          break
      }
      return (stuffObj.alpha = stuffObj.newAlpha), stuffObj
    },
    createPlayer: function (playerId) {
      var playerObj = {
        id: playerId,
        mass: 0,
        position: [0, 0, 0],
        target: [0, 0],
        mainCell: null,
        chatBubbleTime: 0,
        emotion_id: 0,
        emotion: null,
        emotionSoundTime: 0,
        foodSoundTime: 0,
        cellsCount: 0,
        stop: false,
        weapons: {},
        cells: {},
        sounds: {},
        lastUpdate: Date.now(),
        lastHideUpdate: Date.now(),
      }
      return playerObj
    },
    createTeamStuff: function (teamPlayerId) {
      if (
        typeof this.playersInfo[teamPlayerId] != 'undefined' &&
        this.team_arrow == null &&
        this.playersInfo[teamPlayerId].team > 0
      ) {
        this.team_arrow = newGlObject({
          texture_pack: 'arrows',
          texture: this.playersInfo[teamPlayerId].team,
          createMesh: true,
        })
        this.team_stroke = newGlObject({
          texture_pack: 'strokes',
          texture: this.playersInfo[teamPlayerId].team,
          createMesh: true,
        })
        var playerCount = 0
        for (var playerKey in this.playersInfo) {
          playerCount++
        }
        this.roomState == room_states.init &&
          (this.roomMode == room_modes.arena
            ? showGameRules(
                this.playersInfo[teamPlayerId].team,
                this.arenaWinKills,
                playerCount,
                this.arenaPlayersMax,
                true
              )
            : showBossGameRules(playerCount, this.arenaPlayersMax))
        isMobileApp &&
          (this.move_arrow = newGlObject({
            texture_pack: 'arrows',
            texture: 'white',
            createMesh: true,
          }))
      }
      game.roomMode == room_modes.boss &&
        ((this.revenge_arrow = newGlObject({
          texture_pack: 'arrows',
          texture: 'rv2',
          createMesh: true,
        })),
        (this.revenge_icon_sk = newGlObject({
          texture_pack: 'bosses',
          texture: time_to_boss[2],
          createMesh: true,
        })))
    },
    createFfaStuff: function () {
      isMobileApp &&
        (this.move_arrow = newGlObject({
          texture_pack: 'arrows',
          texture: 'white',
          createMesh: true,
        }))
      this.revenge_arrow = newGlObject({
        texture_pack: 'arrows',
        texture: 'rv2',
        createMesh: true,
      })
      this.revenge_icon = newGlObject({
        texture_pack: 'arrows',
        texture: 'x3',
        createMesh: true,
      })
      this.revenge_icon_sk = newGlObject({
        texture_pack: 'arrows',
        texture: 'sk',
        createMesh: true,
      })
    },
    createEmotion: function (emotionId, emotionPlayerKey) {
      !this.loading &&
        this.players[emotionPlayerKey].mainCell.onScreen() &&
        Date.now() - this.players[emotionPlayerKey].emotionSoundTime >= 2000 &&
        (playSound(
          'sfx',
          'emotion_' +
            emotionId +
            (emotionId == 2 ? '_' + Math.round(Math.random() * 2) : ''),
          calcSoundPan(this.players[emotionPlayerKey].mainCell.drawPosition)
        ),
        (this.players[emotionPlayerKey].emotionSoundTime = Date.now()))
      var emotionObj = {
        id: emotionId,
        mesh: newGlObject({
          texture_pack: 'emotions',
          texture: emotionId,
          createMesh: true,
        }),
        time: Date.now() + this.emotionTime * 1000,
      }
      return emotionObj
    },
    getWeaponById: function (getWeaponId) {
      return typeof weapons_list[getWeaponId] != 'undefined'
        ? weapons_list[getWeaponId]
        : null
    },
    createAWeapon: function (ownerId, weaponId, duration, weaponType) {
      !this.loading &&
        typeof this.players[ownerId] != 'undefined' &&
        this.players[ownerId].mainCell.onScreen() &&
        playSound(
          'sfx',
          'use_weapon',
          calcSoundPan(this.players[ownerId].mainCell.drawPosition)
        )
      var aWeaponObj = {
        id: weaponId,
        mesh: newGlObject({
          texture_pack: weaponType == 0 ? 'aWeapons' : 'boosters',
          texture: weaponId,
          createMesh: true,
        }),
        timer: newGlObject({
          texture_pack: 'timers',
          texture: 0,
          dieOnAnimationEnd: true,
          createMesh: true,
        }),
        type: weaponType,
        range: 0,
        action_range_type: 0,
        action_type: 0,
        action_holded: 0,
        dead: false,
      }
      aWeaponObj.timer.animationSpeed = resources.timers.count / duration
      aWeaponObj.timer.animationRepeat = false
      if (weaponType == 0) {
        var weaponDef = this.getWeaponById(weaponId),
          weaponLevel = this.playersInfo[ownerId].wpl[weaponId] - 1
        aWeaponObj.action_type = weaponDef.action_type
        aWeaponObj.action_range_type = weaponDef.action_range_type
        aWeaponObj.action_holded = weaponDef.action_holded
        aWeaponObj.range = weaponDef.action_range
      }
      return (
        weaponType == 0 &&
          weaponDef.action_type == weapon_action_types.linear &&
          !weaponDef.action_holded &&
          (this.rpWeapons[ownerId + '_rp' + weaponId] = this.createRpWeapon(
            ownerId,
            weaponId,
            duration + weaponDef.action_live_time * 2000
          )),
        aWeaponObj
      )
    },
    createRpWeapon: function (rpOwnerId, rpWeaponId, rpLiveTime) {
      var rpWeaponObj = {
        id: rpWeaponId,
        ownerId: rpOwnerId,
        mesh: newGlObject({
          texture_pack: 'rpWeapons',
          texture: rpWeaponId,
          createMesh: true,
        }),
        lastVisible: Date.now() + rpLiveTime,
      }
      return rpWeaponObj
    },
    createWeapon: function (weaponData) {
      var weaponDef2 = this.getWeaponById(weaponData.w_id),
        weaponLevel =
          typeof this.playersInfo[weaponData.owner].wpl[weaponData.w_id] !=
          'undefined'
            ? this.playersInfo[weaponData.owner].wpl[weaponData.w_id] - 1
            : 1,
        actionRange = weaponDef2.action_range,
        actionSpeed = weaponDef2.action_speed,
        weaponSize = weaponDef2.size != null ? weaponDef2.size : 100
      if (weaponSize == 0) {
        var ownerPlayer = this.players[weaponData.owner]
        typeof ownerPlayer != 'undefined' &&
          (weaponDef2.action_range_type == 1 &&
          typeof this.players[weaponData.owner] != 'undefined'
            ? (weaponSize =
                this.players[weaponData.owner].mainCell.size *
                (1 + weaponDef2.action_range * 0.01))
            : (weaponSize =
                (this.players[weaponData.owner].mainCell.size +
                  weaponDef2.action_range) *
                (weaponData.w_id == 11 ? 0.5 : 1)))
      }
      weaponDef2.action_holded &&
        actionRange != null &&
        (weaponDef2.action_range_type == 1
          ? (weaponSize = actionRange)
          : (weaponSize = actionRange),
        (weaponSize *= this.playersInfo[weaponData.owner].buff_wd_koef))
      weaponDef2.fire_sound != '' &&
        weaponData.target == 0 &&
        playSound('sfx', weaponDef2.fire_sound)
      if (
        typeof this.preload_weapons['weapons_' + weaponDef2.graphics_id] !=
        'undefined'
      ) {
        var weaponMesh = newGlObject({
          x: weaponData.x,
          y: weaponData.y,
          size: weaponSize,
          texturePreloaded:
            this.preload_weapons['weapons_' + weaponDef2.graphics_id],
        })
      } else {
        var weaponMesh = newGlObject({
          x: weaponData.x,
          y: weaponData.y,
          size: weaponSize,
          texture_pack: 'weapons',
          texture: weaponDef2.graphics_id,
          createMesh: true,
        })
      }
      var weaponObj = {
        owner: weaponData.owner,
        weapon: weaponDef2,
        level: weaponLevel,
        lastCollision: 0,
        lastCollisionSound: 0,
        createTime: Date.now(),
        lastVisible: Date.now(),
        drawAct: false,
        radial:
          weaponDef2.action_holded &&
          weaponDef2.action_type == weapon_action_types.radial,
        drawOnGround: !weaponDef2.action_holded && actionSpeed == 0,
        mesh: weaponMesh,
        mesh_acc:
          typeof resources.weapons[
            'weapons_' + weaponDef2.graphics_id + '_acc'
          ] != 'undefined'
            ? newGlObject({
                x: weaponData.x,
                y: weaponData.y,
                size: weaponSize,
                texture_pack: 'weapons',
                texture: weaponDef2.graphics_id + '_acc',
                createMesh: true,
              })
            : null,
        mesh_act:
          typeof resources.weapons[
            'weapons_' + weaponDef2.graphics_id + '_act'
          ] != 'undefined'
            ? newGlObject({
                x: weaponData.x,
                y: weaponData.y,
                size: weaponSize,
                texture_pack: 'weapons',
                texture: weaponDef2.graphics_id + '_act',
                createMesh: true,
              })
            : null,
      }
      return (
        weaponDef2.fire_effect == 1 &&
          ((weaponObj.mesh.sizeKoef = 0.2), (weaponObj.mesh.newSizeKoef = 1)),
        weaponObj
      )
    },
    createDamage: function (damageData) {
      var damageObj = {
        player_id: damageData.id_p,
        cell_id: damageData.id_c,
        mesh: getTextLabel(
          parseInt(damageData.value) == 0 ? '' : damageData.value,
          10
        ),
        mesh_crit:
          damageData.flag & damage_flags.crit
            ? newGlObject({
                x: 0,
                y: 0,
                z: 0,
                size: 10,
                texture_pack: 'weapons_flag',
                texture: 1,
                createMesh: true,
              })
            : null,
        mesh_shield:
          damageData.flag & damage_flags.shield
            ? newGlObject({
                x: 0,
                y: 0,
                z: 0,
                size: 10,
                texture_pack: 'weapons_flag',
                texture: 2,
                createMesh: true,
              })
            : null,
        mesh_shield_all:
          damageData.flag & damage_flags.shield_all
            ? newGlObject({
                x: 0,
                y: 0,
                z: 0,
                size: 10,
                texture_pack: 'weapons_flag',
                texture: 6,
                createMesh: true,
              })
            : null,
        mesh_attack:
          damageData.flag & damage_flags.attack
            ? newGlObject({
                x: 0,
                y: 0,
                z: 0,
                size: 10,
                texture_pack: 'weapons_flag',
                texture: 3,
                createMesh: true,
              })
            : null,
        mesh_reflect:
          damageData.flag & damage_flags.reflect
            ? newGlObject({
                x: 0,
                y: 0,
                z: 0,
                size: 10,
                texture_pack: 'weapons_flag',
                texture: 4,
                createMesh: true,
              })
            : null,
        mesh_armor:
          damageData.dmg_armor > 0
            ? newGlObject({
                x: 0,
                y: 0,
                z: 0,
                size: 10,
                texture_pack: 'weapons_flag',
                texture: 7,
                createMesh: true,
              })
            : null,
        mesh_armor_eff:
          damageData.dmg_armor > 0
            ? newGlObject({
                x: 0,
                y: 0,
                z: 0,
                size: 10,
                texture_pack: 'weapons_flag',
                texture: 5,
                createMesh: true,
              })
            : null,
        createTime: Date.now(),
      }
      damageObj.mesh.size = 7
      damageObj.mesh.newSize = 10
      if (damageObj.mesh_crit != null) {
        damageObj.mesh_crit.newSize = 13
      }
      if (damageObj.mesh_shield != null) {
        damageObj.mesh_shield.newSize = 13
      }
      if (damageObj.mesh_shield_all != null) {
        damageObj.mesh_shield_all.newSize = 13
      }
      if (damageObj.mesh_attack != null) {
        damageObj.mesh_attack.newSize = 13
      }
      if (damageObj.mesh_reflect != null) {
        damageObj.mesh_reflect.newSize = 13
      }
      damageObj.mesh_armor_eff != null &&
        typeof this.players[damageObj.player_id] != 'undefined' &&
        typeof this.players[damageObj.player_id].cells[damageObj.cell_id] !=
          'undefined' &&
        ((damageObj.mesh_armor_eff.alpha = 0.5),
        (damageObj.mesh_armor_eff.newAlpha = 1),
        (damageObj.mesh_armor_eff.size =
          this.players[damageObj.player_id].cells[damageObj.cell_id].size *
          0.6),
        (damageObj.mesh_armor_eff.newSize =
          this.players[damageObj.player_id].cells[damageObj.cell_id].size *
          1.4))
      this.damage.push(damageObj)
      damageData.flag & damage_flags.live &&
        typeof this.players[damageObj.player_id] != 'undefined' &&
        (animEvents('saveLive', {
          x: this.players[damageObj.player_id].cells[damageObj.cell_id]
            .drawPosition[X],
          y: this.players[damageObj.player_id].cells[damageObj.cell_id]
            .drawPosition[Y],
          radius:
            this.players[damageObj.player_id].cells[damageObj.cell_id].drawSize[
              Y
            ],
        }),
        sayComments == true &&
          gameChatInput.send(fraz_live[random.getRandomInt(0, 15)]))
    },
    createEat: function (eatData) {
      if (
        typeof this.players[eatData.id_p].cells[eatData.id_c] == 'undefined'
      ) {
        return
      }
      this.players[eatData.id_p].cells[eatData.id_c].eat.mass +=
        eatData.value
      if (
        this.players[eatData.id_p].cells[eatData.id_c].eat.mass > 200 ||
        Date.now() -
          this.players[eatData.id_p].cells[eatData.id_c].eat.time >=
          300
      ) {
        var cellSize =
            this.players[eatData.id_p].cells[eatData.id_c].size * 0.6,
          halfSize = cellSize * 0.5,
          eatObj = {
            player_id: eatData.id_p,
            cell_id: eatData.id_c,
            offset: [
              Math.random() * (cellSize * 2) - cellSize,
              Math.random() * (halfSize * 2) - halfSize,
            ],
            mesh: getTextLabel(
              '+' +
                Math.round(
                  this.players[eatData.id_p].cells[eatData.id_c].eat.mass
                ),
              220
            ),
            createTime: Date.now(),
          }
        this.players[eatData.id_p].cells[eatData.id_c].eat.mass <= 100
          ? ((eatObj.mesh.size = 1),
            (eatObj.mesh.newSize = 6),
            (eatObj.liveTime = 400))
          : ((eatObj.mesh.size = 2),
            (eatObj.mesh.newSize = 8),
            (eatObj.liveTime = 800))
        this.eat.push(eatObj)
        this.players[eatData.id_p].cells[eatData.id_c].eat.mass = 0
        this.players[eatData.id_p].cells[eatData.id_c].eat.time = Date.now()
      }
    },
    createEffect: function (effectData) {
      if (
        typeof this.preload_effects[
          effectData.texture_pack + '_' + effectData.texture
        ] != 'undefined'
      ) {
        var effectObj = newGlObject({
          id: effectData.id,
          x: effectData.x,
          y: effectData.y,
          size: effectData.size,
          owner: effectData.owner,
          holdOn: effectData.holdOn,
          dieOnAnimationEnd: effectData.dieOnAnimationEnd,
          liveTime: effectData.liveTime,
          texturePreloaded:
            this.preload_effects[
              effectData.texture_pack + '_' + effectData.texture
            ],
        })
      } else {
        var effectObj = newGlObject({
          id: effectData.id,
          x: effectData.x,
          y: effectData.y,
          size: effectData.size,
          owner: effectData.owner,
          holdOn: effectData.holdOn,
          texture_pack: effectData.texture_pack,
          texture: effectData.texture,
          dieOnAnimationEnd: effectData.dieOnAnimationEnd,
          liveTime: effectData.liveTime,
          createMesh: true,
        })
      }
      effectObj.angle[Z] = effectData.angle
      effectObj.size = effectData.size * effectObj.scale
      effectObj.newSize = effectObj.size
      var effectSound =
        resources[effectData.texture_pack][
          effectData.texture_pack + '_' + effectData.texture
        ].sound
      if (typeof effectSound != 'undefined' && effectSound != '') {
        effectObj.sound = effectSound
        effectObj.soundRepeat =
          resources[effectData.texture_pack][
            effectData.texture_pack + '_' + effectData.texture
          ].soundRepeat
      } else {
        typeof effectData.weapon != 'undefined' &&
          effectData.weapon != null &&
          effectData.weapon.collision_sound != '' &&
          ((effectObj.sound = effectData.weapon.collision_sound),
          (effectObj.soundRepeat = false))
      }
      this.effects.push(effectObj)
    },
    preload_graphics: function () {
      for (var resKey in resources.effects) {
        var resItem = resources.effects[resKey]
        if (
          typeof resItem.preload != 'undefined' &&
          resItem.preload &&
          typeof this.preload_effects[resKey] == 'undefined'
        ) {
          var resTexParts = resKey.split('_')
          resTexParts = resTexParts[resTexParts.length - 1]
          this.preload_effects[resKey] = newGlObject({
            size: 1,
            texture_pack: 'effects',
            texture: resTexParts,
            createMesh: true,
          })
        }
      }
      for (var resKey in resources.weapons) {
        var resItem = resources.weapons[resKey]
        if (
          typeof resItem.preload != 'undefined' &&
          resItem.preload &&
          typeof this.preload_weapons[resKey] == 'undefined'
        ) {
          var resTexParts = resKey.split('_')
          resTexParts = resTexParts[resTexParts.length - 1]
          this.preload_weapons[resKey] = newGlObject({
            size: 1,
            texture_pack: 'weapons',
            texture: resTexParts,
            createMesh: true,
          })
        }
      }
    },
    createExplode: function (explodeData) {
      if (explodeData.id > 0) {
        for (var explodeIdx = 0; explodeIdx < this.explodes.length; explodeIdx++) {
          if (this.explodes[explodeIdx].id == explodeData.id) {
            return
          }
        }
      }
      var explodeObj = newGlObject({
          id: explodeData.id,
          x: explodeData.x,
          y: explodeData.y,
          size: explodeData.size,
          texture_pack: 'explodes',
          texture: explodeData.texture,
          dieOnAnimationEnd: true,
          createMesh: true,
        }),
        explodeSound = resources.explodes['explodes_' + explodeData.texture].sound
      typeof explodeSound != 'undefined' &&
        explodeSound != '' &&
        ((explodeObj.sound = explodeSound),
        (explodeObj.soundRepeat =
          resources.explodes['explodes_' + explodeData.texture].soundRepeat))
      this.explodes.push(explodeObj)
    },
    createRunes: function (skinId, runeTime, animTime) {
      if (skinId == 0 || runeTime == 0 || animTime == 0) {
        return null
      }
      animTime *= 1000
      var runeType = skins_sets[skinId].rune
      runeTime *= 1000
      var createTime = Date.now() + runeTime - animTime,
        runeInterval = (animTime - 1500) / 6,
        runesObj = {
          active: true,
          runes: [],
          runeTime: animTime,
          runeInterval: runeInterval,
          createTime: createTime,
        },
        angleStep = -Math.PI / 3,
        angleOffset = Math.PI / 9
      for (var runeIdx = 0; runeIdx < 6; runeIdx++) {
        var runeOffsetX =
            Math.cos(angleStep * runeIdx - angleStep - angleOffset) * 1.8,
          runeOffsetY =
            Math.sin(angleStep * runeIdx - angleStep - angleOffset) * 1.8,
          runeMesh = newGlObject({
            x: 0,
            y: 0,
            size: 0.23,
            texture_pack: 'runes',
            texture: runeType + '_small',
            createMesh: true,
          })
        runeMesh.offset = [runeOffsetX, runeOffsetY]
        runeMesh.angle[Z] =
          angleStep * runeIdx - angleStep - angleOffset + Math.PI / 2
        runeMesh.newAlphaSpeed = 3
        runesObj.runes.push(runeMesh)
        var runeOffsetX = Math.cos(angleStep * runeIdx - angleStep) * 1.95,
          runeOffsetY = Math.sin(angleStep * runeIdx - angleStep) * 1.95,
          runeMesh = newGlObject({
            id: 'rune',
            x: 0,
            y: 0,
            size: 0.3,
            texture_pack: 'runes',
            texture: runeType + '_' + runeIdx,
            createMesh: true,
          })
        runeMesh.offset = [runeOffsetX, runeOffsetY]
        runeMesh.newAlphaSpeed = 3
        runesObj.runes.push(runeMesh)
        var runeOffsetX =
            Math.cos(angleStep * runeIdx - angleStep + angleOffset) * 1.8,
          runeOffsetY =
            Math.sin(angleStep * runeIdx - angleStep + angleOffset) * 1.8,
          runeMesh = newGlObject({
            x: 0,
            y: 0,
            size: 0.23,
            texture_pack: 'runes',
            texture: runeType + '_small',
            createMesh: true,
          })
        runeMesh.offset = [runeOffsetX, runeOffsetY]
        runeMesh.angle[Z] =
          angleStep * runeIdx - angleStep + angleOffset + Math.PI / 2
        runeMesh.newAlphaSpeed = 3
        runesObj.runes.push(runeMesh)
      }
      return runesObj
    },
    updateFoodMass: function (foodArray) {
      var foodNow = Date.now(),
        foodKey = '',
        foodGroup = '',
        foodIdx = 1
      while (foodIdx < foodArray.length) {
        foodArray[foodIdx] >= 60000 &&
          ((foodGroup = foodArray[foodIdx] - 60000), foodIdx++)
        var foodItem = {
          group: foodGroup,
          x: foodArray[foodIdx],
          y: foodArray[foodIdx + 1],
          id: foodGroup < 3 ? 0 : foodArray[foodIdx + 2],
        }
        foodIdx += foodGroup < 3 ? 2 : 3
        typeof foodItem.id != 'undefined' &&
          ((foodKey =
            foodGroup < 3
              ? 'f' + foodItem.x + '_' + foodItem.y
              : 'm' + foodItem.id),
          typeof this.food[foodKey] == 'undefined' &&
            ((this.food[foodKey] = this.createFood(foodItem)),
            this.foodTree != null &&
              (this.foodTree.add(foodItem.x, foodItem.y, foodKey),
              (this.food[foodKey].drawId =
                foodGroup < 3 ? this.foodTree.getId() : foodItem.id))),
          (this.food[foodKey].lastVisible = foodNow + 2000),
          (this.food[foodKey].dead = false))
      }
      for (foodKey in this.food) {
        if (
          this.food[foodKey].lastVisible < foodNow &&
          !this.food[foodKey].dead
        ) {
          this.foodTree.remove(
            this.food[foodKey].position[X],
            this.food[foodKey].position[Y],
            foodKey
          )
          this.food[foodKey].setNewSize(0)
          this.food[foodKey].dead = true
          var nearestPlayer = 0,
            nearestCell = -1,
            minDist = 20000
          if (this.gameHiSpeedMode) {
            for (idx_ in this.players) {
              for (id_c_ in this.players[idx_].cells) {
                var eatDist =
                    this.food[foodKey].size +
                    this.players[idx_].cells[id_c_].size +
                    this.players[idx_].cells[id_c_].foodEatDistance,
                  dist =
                    distanceToTarget(
                      this.food[foodKey],
                      this.players[idx_].cells[id_c_]
                    ) - eatDist
                dist < minDist &&
                  dist < eatDist * this.collision_cell_koef &&
                  ((minDist = dist),
                  (nearestPlayer = idx_),
                  (nearestCell = id_c_))
              }
            }
          }
          nearestCell != -1 && minDist < 100
            ? ((this.food[foodKey].target =
                this.players[nearestPlayer].cells[nearestCell].position),
              !this.loading &&
                this.players[nearestPlayer] == this.player &&
                (Date.now() - this.players[nearestPlayer].foodSoundTime >= 300 &&
                  (playSound(
                    'sfx',
                    this.food[foodKey].group < 3 ? 'food_eat' : 'mass_eat',
                    calcSoundPan(this.food[foodKey].drawPosition)
                  ),
                  (this.players[nearestPlayer].foodSoundTime = Date.now())),
                this.players[nearestPlayer] == game.player &&
                  this.players[nearestPlayer].cells[nearestCell].newSize >
                    this.players[nearestPlayer].cells[nearestCell].sizeAnim
                      .startSize &&
                  this.createEat({
                    id_p: nearestPlayer,
                    id_c: nearestCell,
                    value:
                      this.food[foodKey].mass *
                        this.playerBufs.food_mass_koef +
                      this.playerBufs.food_mass,
                  })))
            : ((this.food[foodKey].newSize = 0),
              (this.food[foodKey].newAlpha = 0))
        }
      }
    },
    updateMass: function (massArray) {
      var massNow = Date.now(),
        massKey = '',
        massCount = Math.round((massArray.length - 1) / 7)
      for (var massIdx = 0; massIdx < massCount; massIdx++) {
        massKey = 'm' + massArray[massIdx * 7 + 1]
        var massItem = {
          id: massArray[massIdx * 7 + 1],
          group: massArray[massIdx * 7 + 4],
          x: massArray[massIdx * 7 + 2],
          y: massArray[massIdx * 7 + 3],
          owner: massArray[massIdx * 7 + 5],
          angle: massArray[massIdx * 7 + 6] / 100 - 100,
          speed: massArray[massIdx * 7 + 7],
        }
        typeof this.food[massKey] == 'undefined' &&
          ((this.food[massKey] = this.createFood(massItem)),
          (this.food[massKey].drawId = massItem.id),
          this.foodTree != null &&
            this.foodTree.add(massItem.x, massItem.y, massKey),
          (this.food[massKey].angleSpeed[Z] = 0),
          (this.food[massKey].angle[Z] = massItem.angle),
          (this.food[massKey].speed = massItem.speed),
          (this.food[massKey].slowDown = this.massSlowDown),
          (this.food[massKey].parentId = 'c' + massItem.owner),
          (this.food[massKey].lastVisible = massNow + 6000))
      }
    },
    updateRoomState: function (stateData) {
      this.roomManager('restate', [stateData.stt, stateData.stm, stateData.cnd])
    },
    updateChest: function (chestData) {},
    updateChestDaily: function (dailyChestData) {
      if (this.roomState != room_states.run) {
        return
      }
    },
    updatePlayerQuest: function (questArray) {
      var questCount = Math.round((questArray.length - 1) / 2)
      for (var questIdx = 0; questIdx < questCount; questIdx++) {
        Tasks.update(questArray[questIdx * 2 + 1], questArray[questIdx * 2 + 2])
      }
    },
    updateHofUsrList: function (hofData) {
      var hofPlayerList = hofData.pl.split('||')
      for (var hofIdx = 0; hofIdx < hofPlayerList.length; hofIdx++) {
        var hofPlayerParts = hofPlayerList[hofIdx].split('|')
        this.hofInfo['' + hofPlayerParts[0]] = hofPlayerParts[1]
      }
    },
    updateHallOfFame: function (hofData2) {
      var hofPlayers = hofData2.pl.split('||'),
        hofHtml = ''
      this.hofInfo = []
      for (var hofI = 0; hofI < hofPlayers.length; hofI++) {
        var hofParts = hofPlayers[hofI].split('|'),
          hofPlace = hofI + 1
        hofPlace <= 10
          ? (this.hofInfo.push([hofParts[0], hofPlace, hofParts[1]]),
            (hofHtml +=
              '<li ' +
              (hofParts[0] == my_id ? 'class="myPlace"' : '') +
              '>' +
              (hofPlace > 3
                ? '<em>' + hofPlace + '</em>'
                : '<em class="ico"><img src="/img/icons/place' +
                  hofPlace +
                  '.png" /></em>') +
              '<p class="nick">' +
              game.getPlayerName(hofParts[0]) +
              '</p><span class="killsQty' +
              (this.roomMode == room_modes.ffa ? '' : '') +
              '">' +
              parseInt(hofParts[1]) +
              '</span></li>'))
          : (hofHtml +=
              '<li class="myPlace lastInTop"><em>' +
              hofParts[0] +
              '</em><p class="nick">' +
              game.getPlayerName(my_id) +
              '</p><span class="killsQty' +
              (this.roomMode == room_modes.ffa ? '' : '') +
              '">' +
              parseInt(hofParts[1]) +
              '</span></li>')
      }
      if (hofHtml != '') {
        $('#leaderBoard ul').html(hofHtml)
      }
    },
    updateTeamHofProgress: function (teamData) {
      var teamList = [
          {
            id: teamData[1],
            kills: teamData[2],
            prc: Math.min(
              100,
              Math.round((teamData[2] / this.arenaWinKills) * 100)
            ),
          },
          {
            id: teamData[3],
            kills: teamData[4],
            prc: Math.min(
              100,
              Math.round((teamData[4] / this.arenaWinKills) * 100)
            ),
          },
          {
            id: teamData[5],
            kills: teamData[6],
            prc: Math.min(
              100,
              Math.round((teamData[6] / this.arenaWinKills) * 100)
            ),
          },
        ],
        teamHtml =
          '<li class="killsWinCount">' +
          Texts.gameTill +
          ' <strong>' +
          this.arenaWinKills +
          '</strong><img src="/img/icons/kills-xs.png" />' +
          '</li>'
      for (var teamI = 0; teamI < teamList.length; teamI++) {
        var isMyTeam =
          this.player != null &&
          typeof this.playersInfo[this.player.id] != 'undefined' &&
          this.playersInfo[this.player.id].team == teamList[teamI].id
        teamHtml +=
          '<li class="place' +
          (teamI + 1) +
          ' ' +
          team_hscolors[teamList[teamI].id] +
          ' ' +
          (isMyTeam ? 'myPlace' : '') +
          '">' +
          '<div class="krownIco"></div>' +
          '<div class="progressBar"><div class="progress" style="width: ' +
          teamList[teamI].prc +
          '%"></div></div>' +
          '<div class="teamName">' +
          Texts.teamsNames[teamList[teamI].id] +
          '</div>' +
          '<div class="killsQty">' +
          teamList[teamI].kills +
          '</div>' +
          '</li>'
      }
      $('#teamLeaderBoard').html(teamHtml)
    },
    updateBossHofProgress: function (bossData) {
      var bossIsFirst = true,
        bossHtml = ''
      !$('#teamLeaderBoard li#killsWinCount').length
        ? (bossHtml +=
            '<li id="killsWinCount" class="killsWinCount"><div class="timerContainer"><div class="miniTimer"><span class="unit"><span class="minutes">0</span>' +
            Texts.m +
            '</span> <span class="unit"><span class="seconds">0</span>' +
            Texts.s +
            '</span>' +
            '</div>' +
            '</div>' +
            '</li>')
        : ($('#teamLeaderBoard li').not('.killsWinCount').remove(),
          (bossIsFirst = false))
      var bossCount = Math.round((bossData.length - 1) / 2)
      for (var bossI = 0; bossI < bossCount; bossI++) {
        bossHtml +=
          '<li class="place' +
          (bossI + 1) +
          '">' +
          '<div class="krownIco"></div>' +
          '<div class="teamName">' +
          this.getPlayerName('p' + bossData[bossI * 2 + 1]) +
          '</div>' +
          '<div class="damageQty">' +
          bossData[bossI * 2 + 2] +
          '%</div>' +
          '</li>'
      }
      $('#teamLeaderBoard').append(bossHtml)
      bossIsFirst &&
        $('#teamLeaderBoard div.miniTimer').countdown(
          this.stateTimer * 1000,
          function (timerEvent3) {}
        )
    },
    updatePlayerEaten: function (eatData2) {
      if (
        this.roomMode == room_modes.arena ||
        game.roomMode == room_modes.boss
      ) {
        if (
          this.player == this.players['p' + eatData2[1]] &&
          this.player != null &&
          this.player.mainCell != null
        ) {
          var eatPos = {
            x: this.player.mainCell.drawPosition[X],
            y: this.player.mainCell.drawPosition[Y],
            radius: this.player.mainCell.drawSize[Y],
          }
          personalKills += 1
          playSound('sfx', 'kill_player')
          sayComments == true &&
            this.getPlayerPrfId('p' + eatData2[2]) != -1 &&
            (this.getPlayerClanData('p' + eatData2[2]).id ==
              this.getPlayerClanData('p' + eatData2[1]).id &&
            this.getPlayerClanData('p' + eatData2[1]).id != 0
              ? gameChatInput.send(
                  this.getPlayerName('p' + eatData2[2]) +
                    fraz_kill[random.getRandomInt(0, 16)]
                )
              : gameChatInput.send(
                  this.getPlayerName('p' + eatData2[2]) +
                    fraz_kill[random.getRandomInt(17, 50)]
                ))
          animEvents('playerEaten', eatPos)
          $('#myPersonalKills li .killsQty').html(personalKills)
        }
        InfoBoard.add(
          '<span class="nick ' +
            team_hcolors[this.getPlayerTeam('p' + eatData2[1])] +
            '">' +
            this.getPlayerName('p' + eatData2[1]) +
            '</span><img src="/img/icons/kill.png" alt="" style="margin: 0 4px;" class="killIco" /><span class="nick ' +
            team_hcolors[this.getPlayerTeam('p' + eatData2[2])] +
            '">' +
            this.getPlayerName('p' + eatData2[2]) +
            '</span>'
        )
        typeof this.playersInfo['p' + eatData2[2]] != 'undefined' &&
          this.playersInfo['p' + eatData2[2]].runesData != null &&
          (this.playersInfo['p' + eatData2[2]].runesData.active = false)
      } else {
        if (this.roomMode == room_modes.ffa) {
          if (
            this.player != null &&
            this.player.mainCell != null &&
            this.player.id == 'p' + eatData2[1]
          ) {
            var eatPos = {
              x: this.player.mainCell.drawPosition[X],
              y: this.player.mainCell.drawPosition[Y],
              radius: this.player.mainCell.drawSize[Y],
              count: this.eatedBy == 'p' + eatData2[2] ? 3 : 1,
            }
            typeof this.playersInfo['p' + eatData2[2]] != 'undefined' &&
              (this.playersInfo['p' + eatData2[2]].active = false)
            playSound('sfx', 'kill_player')
            animEvents('playerEatenFFA', eatPos)
          }
          this.player == this.players['p' + eatData2[1]] &&
          this.player != null &&
          this.player.mainCell != null
            ? (sayComments == true &&
                this.getPlayerPrfId('p' + eatData2[2]) != -1 &&
                (this.getPlayerClanData('p' + eatData2[2]).id ==
                  this.getPlayerClanData('p' + eatData2[1]).id &&
                this.getPlayerClanData('p' + eatData2[1]).id != 0
                  ? gameChatInput.send(
                      this.getPlayerName('p' + eatData2[2]) +
                        fraz_kill[random.getRandomInt(0, 16)]
                    )
                  : gameChatInput.send(
                      this.getPlayerName('p' + eatData2[2]) +
                        fraz_kill[random.getRandomInt(17, 50)]
                    )),
              InfoBoard.add(
                '<span class="nick ' +
                  team_hcolors[this.getPlayerTeam('p' + eatData2[1])] +
                  '" style="color: lightseagreen;">' +
                  this.getPlayerName('p' + eatData2[1]) +
                  '</span><img src="/img/icons/kill.png" alt="" style="margin: 0 4px;" class="killIco" /><span class="nick ' +
                  team_hcolors[this.getPlayerTeam('p' + eatData2[2])] +
                  '" style="color: mediumvioletred;">' +
                  this.getPlayerName('p' + eatData2[2]) +
                  '</span>'
              ))
            : InfoBoard.add(
                '<span class="nick ' +
                  team_hcolors[this.getPlayerTeam('p' + eatData2[1])] +
                  '" style="color: mediumvioletred;">' +
                  this.getPlayerName('p' + eatData2[1]) +
                  '</span><img src="/img/icons/kill.png" alt="" style="margin: 0 4px;" class="killIco" /><span class="nick ' +
                  team_hcolors[this.getPlayerTeam('p' + eatData2[2])] +
                  '" style="color: mediumvioletred;">' +
                  this.getPlayerName('p' + eatData2[2]) +
                  '</span>'
              )
          autoFarm != 0 &&
            this.player == this.players['p' + eatData2[2]] &&
              this.player != null &&
              this.player.mainCell != null &&
              (WND_die('replay'),
              setTimeout(function () {
                WND_die('close')
              }, 2500))
          this.player != null &&
            this.player.id == 'p' + eatData2[1] &&
            this.eatedBy == 'p' + eatData2[2] &&
            (this.eatedBy = 0)
        }
      }
    },
    updateStuff: function (stuffArray) {
      var stuffNow = Date.now(),
        stuffKey = '',
        stuffCount = Math.round((stuffArray.length - 1) / 3)
      for (var stuffIdx = 0; stuffIdx < stuffCount; stuffIdx++) {
        var stuffItem = {
            type: Math.round(
              (stuffArray[stuffIdx * 3 + 1] -
                (stuffArray[stuffIdx * 3 + 1] % 1000)) /
                1000
            ),
            typeId: stuffArray[stuffIdx * 3 + 1] % 1000,
            x: stuffArray[stuffIdx * 3 + 2],
            y: stuffArray[stuffIdx * 3 + 3],
          },
          stuffPrefix = 's'
        switch (stuffItem.type) {
          case stuff_types.coin:
            stuffPrefix = 'c'
            break
          case stuff_types.ruby:
            stuffPrefix = 'r'
            break
          case stuff_types.elixir:
            stuffPrefix = 'e'
            break
          case stuff_types.std_key:
            stuffPrefix = 'k'
            break
          case stuff_types.booster:
            stuffPrefix = 'b'
            break
        }
        stuffKey = stuffPrefix + stuffItem.x + '_' + stuffItem.y
        if (typeof this.stuff[stuffKey] == 'undefined') {
          this.stuff[stuffKey] = this.createStuff(stuffItem)
        } else {
          typeof this.stuff[stuffKey].moveTarget != 'undefined' &&
            ((this.stuff[stuffKey].moveTarget = null),
            delete this.stuff[stuffKey].moveTarget,
            this.stuff[stuffKey].setNewPosition([stuffItem.x, stuffItem.y, 0]))
        }
        this.stuff[stuffKey].lastVisible = stuffNow
        this.stuff[stuffKey].dead = false
      }
      for (stuffKey in this.stuff) {
        if (
          this.stuff[stuffKey].lastVisible < stuffNow &&
          !this.stuff[stuffKey].dead &&
          typeof this.stuff[stuffKey].moveTarget == 'undefined'
        ) {
          this.stuff[stuffKey].setNewSize(0)
          this.stuff[stuffKey].dead = true
          var stuffNearPlayer = 0,
            stuffNearCell = -1,
            stuffMinDist = 5000
          for (idx_ in this.players) {
            for (id_c_ in this.players[idx_].cells) {
              var stuffEatDist =
                  this.stuff[stuffKey].size +
                  this.players[idx_].cells[id_c_].size +
                  this.players[idx_].cells[id_c_].foodEatDistance,
                stuffDist =
                  distanceToTarget(
                    this.stuff[stuffKey],
                    this.players[idx_].cells[id_c_]
                  ) - stuffEatDist
              stuffDist < stuffMinDist &&
                stuffDist < stuffEatDist * this.collision_cell_koef &&
                ((stuffMinDist = stuffDist),
                (stuffNearPlayer = idx_),
                (stuffNearCell = id_c_))
            }
          }
          if (stuffNearCell != -1 && stuffMinDist < 100) {
            this.stuff[stuffKey].target =
              this.players[stuffNearPlayer].cells[stuffNearCell].position
            if (!this.loading && this.players[stuffNearPlayer] == this.player) {
              switch (this.stuff[stuffKey].stuffType) {
                case stuff_types.coin:
                  if (!this.playerLimits.coins) {
                    playSound(
                      'sfx',
                      'take_coin',
                      calcSoundPan(this.stuff[stuffKey].drawPosition)
                    )
                    animEvents('coinCollect', {
                      x: this.players[stuffNearPlayer].cells[stuffNearCell].drawPosition[
                        X
                      ],
                      y: this.players[stuffNearPlayer].cells[stuffNearCell].drawPosition[
                        Y
                      ],
                      radius:
                        this.players[stuffNearPlayer].cells[stuffNearCell].drawSize[Y],
                    })
                  } else {
                    this.limitHints.coins.count > 0 &&
                      stuffNow - this.limitHints.coins.lastTime >= 5000 &&
                      (Hints.text('coinsLimit'),
                      this.limitHints.coins.count--,
                      (this.limitHints.coins.lastTime = stuffNow))
                  }
                  break
                case stuff_types.ruby:
                  if (!this.playerLimits.ruby) {
                    playSound(
                      'sfx',
                      'crystals_buy',
                      calcSoundPan(this.stuff[stuffKey].drawPosition)
                    )
                    animEvents('rubyCollect', {
                      x: this.players[stuffNearPlayer].cells[stuffNearCell].drawPosition[
                        X
                      ],
                      y: this.players[stuffNearPlayer].cells[stuffNearCell].drawPosition[
                        Y
                      ],
                      radius:
                        this.players[stuffNearPlayer].cells[stuffNearCell].drawSize[Y],
                    })
                  } else {
                    this.limitHints.ruby.count > 0 &&
                      stuffNow - this.limitHints.ruby.lastTime >= 5000 &&
                      (Hints.text('rubyLimit'),
                      this.limitHints.ruby.count--,
                      (this.limitHints.ruby.lastTime = stuffNow))
                  }
                  break
                case stuff_types.std_key:
                  if (!this.playerLimits.std_keys) {
                    animEvents('keyCollect', {
                      x: this.players[stuffNearPlayer].cells[stuffNearCell].drawPosition[
                        X
                      ],
                      y: this.players[stuffNearPlayer].cells[stuffNearCell].drawPosition[
                        Y
                      ],
                      radius:
                        this.players[stuffNearPlayer].cells[stuffNearCell].drawSize[Y],
                    })
                    playSound(
                      'sfx',
                      'take_std_key',
                      calcSoundPan(this.stuff[stuffKey].drawPosition)
                    )
                  } else {
                    this.limitHints.std_keys.count > 0 &&
                      stuffNow - this.limitHints.std_keys.lastTime >= 5000 &&
                      (Hints.text('stdKeysLimit'),
                      this.limitHints.std_keys.count--,
                      (this.limitHints.std_keys.lastTime = stuffNow))
                  }
                  break
              }
            }
          } else {
            this.stuff[stuffKey].size = 0
          }
        }
      }
    },
    updatePotExplosions: function (potExpArray) {
      var potExpIdx = 0
      while (potExpIdx < potExpArray.length - 1) {
        var potWeaponKey = 'w' + potExpArray[potExpIdx + 1],
          potPos = {
            x: potExpArray[potExpIdx + 2],
            y: potExpArray[potExpIdx + 3],
          }
        potExpIdx += 3
        var potElixirKey = 'e' + potPos.x + '_' + potPos.y
        if (
          typeof this.stuff[potElixirKey] == 'undefined' &&
          typeof this.weapons[potWeaponKey] != 'undefined'
        ) {
          this.stuff[potElixirKey] = this.createStuff({
            x: this.weapons[potWeaponKey].mesh.position[X],
            y: this.weapons[potWeaponKey].mesh.position[Y],
            type: stuff_types.elixir,
          })
          this.stuff[potElixirKey].dead = false
          this.stuff[potElixirKey].moveTarget = [potPos.x, potPos.y, 0]
          this.stuff[potElixirKey].moveDistance = distanceToTargetP(
            this.stuff[potElixirKey].position,
            this.stuff[potElixirKey].moveTarget
          )
          this.stuff[potElixirKey].moveSin = 0
          this.stuff[potElixirKey].lastVisible = Date.now() + 500
          if (
            typeof this.weapons[potWeaponKey] != 'undefined' &&
            typeof this.weapons[potWeaponKey].mesh_act != 'undefined' &&
            !this.weapons[potWeaponKey].drawAct
          ) {
            this.weapons[potWeaponKey].mesh_act.frame = 0
            this.weapons[potWeaponKey].mesh_act.lastUpdate = Date.now()
            this.weapons[potWeaponKey].drawAct = true
            var potWeaponDef = this.getWeaponById(14)
            potWeaponDef.collision_sound != '' &&
              playSound('sfx', potWeaponDef.collision_sound)
          }
        }
      }
    },
    updateDrop: function (dropArray) {
      var dropIdx = 0
      while (dropIdx < dropArray.length - 1) {
        var dropPlayerKey = 'p' + dropArray[dropIdx + 1],
          dropItem = {
            type: dropArray[dropIdx + 2],
            x: dropArray[dropIdx + 3],
            y: dropArray[dropIdx + 4],
          }
        dropIdx += 4
        var dropPrefix = 's'
        switch (dropItem.type) {
          case stuff_types.coin:
            dropPrefix = 'c'
            break
          case stuff_types.ruby:
            dropPrefix = 'r'
            break
          case stuff_types.elixir:
            dropPrefix = 'e'
            break
          case stuff_types.std_key:
            dropPrefix = 'k'
            break
          case stuff_types.booster:
            dropPrefix = 'b'
            break
        }
        var dropStuffKey = dropPrefix + dropItem.x + '_' + dropItem.y
        typeof this.stuff[dropStuffKey] == 'undefined' &&
          typeof this.players[dropPlayerKey] != 'undefined' &&
          typeof this.players[dropPlayerKey].mainCell != 'undefined' &&
          ((this.stuff[dropStuffKey] = this.createStuff({
            x: this.players[dropPlayerKey].mainCell.position[X],
            y: this.players[dropPlayerKey].mainCell.position[Y],
            type: dropItem.type,
          })),
          (this.stuff[dropStuffKey].dead = false),
          (this.stuff[dropStuffKey].moveTarget = [dropItem.x, dropItem.y, 0]),
          (this.stuff[dropStuffKey].moveDistance = distanceToTargetP(
            this.stuff[dropStuffKey].position,
            this.stuff[dropStuffKey].moveTarget
          )),
          (this.stuff[dropStuffKey].moveSin = 0),
          (this.stuff[dropStuffKey].lastVisible = Date.now() + 500))
      }
    },
    updatePlayers: function (playersArray) {
      if (this.playersInfo == {}) {
        return
      }
      var playersNow = Date.now(),
        pKey = '',
        myPlayerKey = '',
        cellCount = 0,
        pIdx = 0
      while (pIdx < playersArray.length - 1) {
        pIdx == 0
          ? ((pKey = 'p' + playersArray[pIdx + 1]),
            camera.setTargetPosition([
              playersArray[pIdx + 2],
              playersArray[pIdx + 3],
              playersArray[pIdx + 4] * 0.01,
            ]),
            (cellCount = playersArray[pIdx + 5]),
            (pIdx += 5),
            (myPlayerKey = pKey),
            this.player != null &&
              ((this.player.position[X] = playersArray[pIdx + 2]),
              (this.player.position[Y] = playersArray[pIdx + 3])))
          : ((pKey = 'p' + playersArray[pIdx + 1]),
            (cellCount = playersArray[pIdx + 2]),
            (pIdx += 2))
        if (typeof this.playersInfo[pKey] != 'undefined') {
          !this.playersInfo[pKey].active &&
            ((this.playersInfo[pKey].active = true),
            this.updateTeamPlayersCount())
          ;(typeof this.players[pKey] == 'undefined' ||
            typeof this.players[pKey].position == 'undefined') &&
            ((this.players[pKey] = this.createPlayer(pKey)),
            pKey == myPlayerKey && (this.player = this.players[pKey]),
            this.player != null &&
              this.player.id == pKey &&
              (this.roomMode == room_modes.arena ||
              game.roomMode == room_modes.boss
                ? this.createTeamStuff(pKey)
                : this.createFfaStuff()))
          var isNewPlayer = this.players[pKey].cellsCount == 0
          this.players[pKey].cellsCount = cellCount
          var maxMass = 0,
            mainCellKey = '',
            mainCellId = '',
            totalMass = 0,
            isFirstSplit = true
          for (var cellI = 0; cellI < cellCount; cellI++) {
            var cellKey = 'c' + playersArray[pIdx + 1],
              cellX = playersArray[pIdx + 2],
              cellY = playersArray[pIdx + 3],
              cellMass = playersArray[pIdx + 4]
            pIdx += 4
            var prevCellX = -1,
              prevCellY = -1
            playersArray[pIdx + 1] == 65530 &&
              ((prevCellX = playersArray[pIdx + 2]),
              (prevCellY = playersArray[pIdx + 3]),
              (pIdx += 3))
            var cellRadius = massToRadius(cellMass)
            totalMass += cellMass
            typeof this.players[pKey].cells[cellKey] == 'undefined' &&
              ((this.players[pKey].cells[cellKey] = newGlSimpleObject({
                id: cellKey,
                size: cellRadius,
              })),
              (this.players[pKey].cells[cellKey].playerId = pKey),
              (this.players[pKey].cells[cellKey].eat = {
                mass: 0,
                time: 0,
              }),
              cellCount > 1 &&
                isFirstSplit &&
                  !this.loading &&
                  this.players[pKey] == this.player &&
                  (playSound('sfx', 'ball_dividing'), (isFirstSplit = false)))
            prevCellX > -1 &&
            prevCellY > -1 &&
            Math.abs(prevCellX - cellX) < cellRadius * 2 &&
            Math.abs(prevCellY - cellY) < cellRadius * 2
              ? ((this.players[pKey].cells[cellKey].position = [
                  prevCellX,
                  prevCellY,
                  0,
                ]),
                (this.players[pKey].cells[cellKey].target = [
                  cellX,
                  cellY,
                  0,
                ]))
              : (isNewPlayer &&
                  ((this.players[pKey].cells[cellKey].position = [
                    cellX,
                    cellY,
                    0,
                  ]),
                  (this.playersInfo[pKey].mesh.alpha =
                    this.players[pKey] == this.player ? 0.2 : 0),
                  (this.playersInfo[pKey].mesh.newAlpha =
                    this.players[pKey] == this.player ? 0.2 : 0),
                  (this.players[pKey].lastHideUpdate = Date.now() + 500)),
                this.players[pKey].cells[cellKey].setNewPosition([
                  cellX,
                  cellY,
                  0,
                ]))
            playersNow - this.players[pKey].cells[cellKey].eatTime >=
              1000 &&
              ((this.players[pKey].cells[cellKey].eatTime = playersNow),
              (this.players[pKey].cells[cellKey].eatMass = 0))
            var massDiff =
              cellMass - this.players[pKey].cells[cellKey].mass
            this.players[pKey].cells[cellKey].eatMass +=
              massDiff >= 50 ? massDiff : 0
            this.players[pKey].cells[cellKey].mass = cellMass
            this.players[pKey].cells[cellKey].setNewSize(cellRadius)
            this.players[pKey].cells[cellKey].lastVisible = playersNow
            this.players[pKey].cells[cellKey].dead = false
            this.players[pKey].cells[cellKey].main = false
            if (
              this.player != null &&
              this.players[pKey] != this.player &&
              this.player.mainCell != null &&
              (this.playersInfo[pKey].team == 0 ||
                this.playersInfo[pKey].team !=
                  this.playersInfo[this.player.id].team)
            ) {
              if (
                this.player.mainCell.mass * 0.5 >
                this.players[pKey].cells[cellKey].mass *
                  this.eatMaxMassKoef
              ) {
                this.players[pKey].cells[cellKey].status =
                  cell_status_types.canEatInJump
              } else {
                if (
                  this.player.mainCell.mass >
                  this.players[pKey].cells[cellKey].mass *
                    this.eatMaxMassKoef
                ) {
                  this.players[pKey].cells[cellKey].status =
                    cell_status_types.canEat
                } else {
                  if (
                    this.player.mainCell.mass * this.eatMaxMassKoef <
                    this.players[pKey].cells[cellKey].mass * 0.5
                  ) {
                    this.players[pKey].cells[cellKey].status =
                      cell_status_types.dangerInJump
                  } else {
                    this.player.mainCell.mass * this.eatMaxMassKoef <
                    this.players[pKey].cells[cellKey].mass
                      ? (this.players[pKey].cells[cellKey].status =
                          cell_status_types.danger)
                      : (this.players[pKey].cells[cellKey].status =
                          cell_status_types.none)
                  }
                }
              }
            }
            ;(Math.round(this.players[pKey].cells[cellKey].mass) >
              maxMass ||
              (this.players[pKey].cells[cellKey].mass == maxMass &&
                this.players[pKey].cells[cellKey].id > mainCellId)) &&
              ((maxMass = Math.round(
                this.players[pKey].cells[cellKey].mass
              )),
              (mainCellKey = cellKey),
              (mainCellId = this.players[pKey].cells[cellKey].id))
          }
          cellCount > 0 &&
            typeof this.players[pKey].cells[mainCellKey] != 'undefined' &&
            ((this.players[pKey].cells[mainCellKey].main = true),
            (this.players[pKey].mainCell =
              this.players[pKey].cells[mainCellKey]))
          this.players[pKey].mass = totalMass
          this.players[pKey].lastVisible = playersNow
          this.players[pKey].dead = false
          this.playersInfo[pKey].dead = false
        }
      }
      for (pKey in this.players) {
        this.players[pKey].lastVisible < playersNow &&
          ((this.players[pKey].dead = true),
          (this.playersInfo[pKey].dead = true))
        for (cellKey in this.players[pKey].cells) {
          if (
            this.players[pKey].cells[cellKey].lastVisible + 150 <
              playersNow &&
            !this.players[pKey].cells[cellKey].dead
          ) {
            this.players[pKey].cells[cellKey].dead = true
            this.players[pKey].cells[cellKey].setNewSize(0)
            var nearPlayer = 0,
              nearCell = 0,
              nearMinDist = 7000
            if (this.players[pKey].cells[cellKey].onScreen()) {
              for (var nearPKey in this.players) {
                for (var nearCKey in this.players[nearPKey].cells) {
                  if (
                    cellKey != nearCKey &&
                    this.players[pKey].cells[cellKey].size <
                      this.players[nearPKey].cells[nearCKey].size &&
                    this.players[nearPKey].cells[nearCKey].eatMass > 0
                  ) {
                    var combinedSize =
                        this.players[pKey].cells[cellKey].size +
                        this.players[nearPKey].cells[nearCKey].size,
                      cellDist = distanceToTarget(
                        this.players[pKey].cells[cellKey],
                        this.players[nearPKey].cells[nearCKey]
                      )
                    cellDist < nearMinDist &&
                      cellDist < combinedSize * this.collision_cell_koef * 1.5 &&
                      ((nearMinDist = cellDist),
                      (nearPlayer = nearPKey),
                      (nearCell = nearCKey))
                  }
                }
              }
            }
            if (nearCell != 0) {
              this.players[pKey].cells[cellKey].setNewPosition(
                this.players[nearPlayer].cells[nearCell].position
              )
              if (
                (!this.loading && this.players[pKey] == this.player) ||
                this.players[nearPlayer] == this.player
              ) {
                if (pKey == nearPlayer) {
                  playSound(
                    'sfx',
                    'ball_unite',
                    calcSoundPan(
                      this.players[pKey].cells[cellKey].drawPosition
                    )
                  )
                } else {
                  playSound(
                    'sfx',
                    'ball_eat',
                    calcSoundPan(
                      this.players[pKey].cells[cellKey].drawPosition
                    )
                  )
                  if (this.players[nearPlayer] == this.player) {
                    var cellMass = Math.min(
                      this.players[pKey].cells[cellKey].mass,
                      this.players[nearPlayer].cells[nearCell].eatMass
                    )
                    this.players[nearPlayer].cells[nearCell].eatMass = 0
                    this.players[nearPlayer].cells[nearCell].eatTime = playersNow
                    cellMass > 0 &&
                      this.createEat({
                        id_p: nearPlayer,
                        id_c: nearCell,
                        value: cellMass,
                      })
                  }
                }
              }
            } else {
              this.players[pKey].cells[cellKey].size = 0
            }
          }
        }
      }
    },
    updateEmotions: function (emotionArray) {
      var emotionIdx = 0
      while (emotionIdx < emotionArray.length - 1) {
        var emotionPKey = 'p' + emotionArray[emotionIdx + 1]
        typeof this.players[emotionPKey] != 'undefined' &&
          (this.players[emotionPKey].emotion_id = emotionArray[emotionIdx + 2])
        emotionIdx += 2
      }
    },
    updatePlayerLimits: function (limitsData) {
      var coinsLimited = limitsData[1] == 1,
        keysLimited = limitsData[2] == 1,
        rubyLimited =
          typeof limitsData[3] != 'undefined' ? limitsData[3] == 1 : false
      !game.loading &&
        (this.playerLimits.coins != coinsLimited &&
          (Hints.text('coinsLimit'),
          this.limitHints.coins.count--,
          (this.limitHints.coins.lastTime = Date.now())),
        this.playerLimits.ruby != rubyLimited &&
          (Hints.text('rubyLimit'),
          this.limitHints.ruby.count--,
          (this.limitHints.ruby.lastTime = Date.now())),
        this.playerLimits.std_keys != keysLimited &&
          (Hints.text('stdKeysLimit'),
          this.limitHints.std_keys.count--,
          (this.limitHints.std_keys.lastTime = Date.now())))
      this.playerLimits.coins = coinsLimited
      this.playerLimits.ruby = rubyLimited
      this.playerLimits.std_keys = keysLimited
      for (var limitStuffKey in this.stuff) {
        if (!this.stuff[limitStuffKey].dead) {
          switch (this.stuff[limitStuffKey].type) {
            case stuff_types.coin:
              this.stuff[limitStuffKey].newAlpha = this.playerLimits.coins ? 0.6 : 1
              break
            case stuff_types.ruby:
              this.stuff[limitStuffKey].newAlpha = this.playerLimits.ruby ? 0.6 : 1
              break
            case stuff_types.std_key:
              this.stuff[limitStuffKey].newAlpha = this.playerLimits.std_keys
                ? 0.6
                : 1
              break
          }
        }
      }
      typeof limitsData[4] != 'undefined' &&
        (this.roomMode == room_modes.arena
          ? showGameRules(
              limitsData[4],
              this.arenaWinKills,
              0,
              this.arenaPlayersMax,
              false
            )
          : showBossGameRules(0, this.arenaPlayersMax),
        setTimeout(function () {
          gameStartCounterChange('3')
        }, 2000),
        setTimeout(function () {
          gameStartCounterChange('2')
        }, 3000),
        setTimeout(function () {
          gameStartCounterChange('1')
        }, 4000),
        setTimeout(function () {
          gameStartCounterChange(Texts.start)
        }, 5000),
        setTimeout(function () {
          gameStartCounterChange('')
        }, 6000))
    },
    updatePlayerBoosterCollect: function (boosterCollectData) {
      this.player != null &&
        this.player.mainCell != null &&
        (animEvents('boosterCollect', {
          x: this.player.mainCell.drawPosition[X],
          y: this.player.mainCell.drawPosition[Y],
          radius: this.player.mainCell.drawSize[Y],
          boosterId: boosterCollectData[1],
        }),
        playSound('sfx', 'take_booster'))
    },
    updatePlayerMana: function (manaData) {
      this.playerMana = manaData[1]
      manaData.length > 2 && manaData[2] != 0
        ? Elixir.init(manaData[1], manaData[2])
        : (!this.loading &&
            manaData[1] > Elixir.currentElixirCount &&
            playSound('sfx', 'take_elixir'),
          Elixir.changeTo(manaData[1]))
      WeaponBar.updateElixirStates(manaData[1])
    },
    updatePlayerBuffs: function (buffsData) {
      this.playerBufs.food_mass = parseInt(buffsData[1])
      this.playerBufs.food_mass_koef = parseInt(buffsData[2])
    },
    updateUsePreBooster: function (preBoosterData) {
      for (var preBoosterI = 1; preBoosterI < preBoosterData.length; preBoosterI++) {
        typeof bpd_ids[preBoosterData[preBoosterI]] != 'undefined' &&
          bpd_ids[preBoosterData[preBoosterI]]--
      }
    },
    updateUseArmor: function (myCell2) {
      my_skin[10] > 0 &&
        (arm_data[my_skin[10]][3] = parseInt(arm_data[my_skin[10]][3]) - 1)
    },
    updatePlayerWeaponsLine: function (weaponLineData) {
      var weaponIds = [],
        weaponLineIdx = 0,
        autoSlots = true
      while (weaponLineIdx < weaponLineData.length - 1) {
        weaponLineData[weaponLineIdx + 1] < 10000
          ? weaponIds.push(weaponLineData[weaponLineIdx + 1])
          : ((WeaponBar.maxSlots = weaponLineData[weaponLineIdx + 1] - 10000),
            (autoSlots = false))
        weaponLineIdx++
      }
      if (WeaponBar.maxSlots == 2 && weaponIds.length == 2) {
        var weaponLineTmp = weaponIds[0]
        weaponIds[0] = weaponIds[1]
        weaponIds[1] = weaponLineTmp
      }
      autoSlots && this.updateWeaponHealth(weaponLineData[2])
      WeaponBar.update(weaponIds)
    },
    updatePlayerWeaponUse: function (weaponUseData) {
      this.updateWeaponHealth(weaponUseData[2])
      WeaponBar.useWeapon(weaponUseData[2], weaponUseData[1])
    },
    updateWeaponHealth: function (weaponHealthId) {
      weapons_list[weaponHealthId].type > 0 &&
        weapons_list[weaponHealthId].type < 100 &&
        ((wpn_data[weaponHealthId][3] = parseInt(wpn_data[weaponHealthId][3]) - 1),
        wpn_data[weaponHealthId][3] == 0 && Hints.text('weaponBroken'))
    },
    updatePlayerBoosterUse: function (boosterUseData) {
      switch (parseInt(boosterUseData[3])) {
        case 1:
          Hints.text('noCoins')
          break
        case 2:
          Hints.text('fullElixir')
          break
        case 3:
          Hints.text('oneCell')
          break
        case 4:
          var boosterIdx = parseInt(boosterUseData[2])
          Hints.text('boosterBuy', [boosters_ingame[boosterIdx].coins, true])
          var newRuby = parseInt($('#myBars .ruby em').text()) - 5
          DefMyBars.setRuby(newRuby)
          break
        case 0:
          var boosterIdx = parseInt(boosterUseData[2])
          Hints.text('boosterBuy', [boosters_ingame[boosterIdx].coins, false]),
            (prf_data.coins = prf_data.coins - boosters_ingame[boosterIdx].coins)
          break
      }
    },
    updateAWeapons: function (aWeaponArray) {
      var aWeapNow = Date.now(),
        aWeapPKey = '',
        aWeapCount = 0,
        aWeapIdx = 0
      while (aWeapIdx < aWeaponArray.length - 1) {
        aWeapPKey = 'p' + aWeaponArray[aWeapIdx + 1]
        aWeapCount = aWeaponArray[aWeapIdx + 2]
        aWeapIdx += 2
        for (var aWeapI = 0; aWeapI < aWeapCount; aWeapI++) {
          var aWeapId = aWeaponArray[aWeapIdx + aWeapI * 3 + 1],
            aWeapDuration = aWeaponArray[aWeapIdx + aWeapI * 3 + 2],
            aWeapType = aWeaponArray[aWeapIdx + aWeapI * 3 + 3],
            aWeapKey = 'aw' + aWeapId
          ;(typeof this.aWeapons[aWeapPKey + '_' + aWeapKey] == 'undefined' ||
            (typeof this.aWeapons[aWeapPKey + '_' + aWeapKey].mesh.position ==
              'undefined' &&
              typeof this.playersInfo[aWeapPKey] != 'undefined')) &&
            ((this.aWeapons[aWeapPKey + '_' + aWeapKey] = this.createAWeapon(
              aWeapPKey,
              aWeapId,
              aWeapDuration,
              aWeapType
            )),
            (this.aWeapons[aWeapPKey + '_' + aWeapKey].owner =
              this.players[aWeapPKey]))
        }
        aWeapIdx += aWeapCount * 3
      }
    },
    updateRpWeapons: function (rpWeaponArray) {
      var rpWeapNow = Date.now(),
        rpWeapPKey = '',
        rpWeapCount = 0,
        rpWeapIdx = 0
      while (rpWeapIdx < rpWeaponArray.length - 1) {
        rpWeapPKey = 'p' + rpWeaponArray[rpWeapIdx + 1]
        rpWeapCount = rpWeaponArray[rpWeapIdx + 2]
        rpWeapIdx += 2
        for (var rpWeapI = 0; rpWeapI < rpWeapCount; rpWeapI++) {
          var rpWeapId = rpWeaponArray[rpWeapIdx + rpWeapI * 3 + 1],
            rpWeapLiveTime = rpWeaponArray[rpWeapIdx + rpWeapI * 3 + 2],
            rpWeapKey = rpWeapPKey + '_rp' + rpWeapId
          typeof this.rpWeapons[rpWeapKey] == 'undefined' ||
          (typeof this.rpWeapons[rpWeapKey].mesh.position == 'undefined' &&
            typeof this.playersInfo[rpWeapPKey] != 'undefined')
            ? ((this.rpWeapons[rpWeapKey] = this.createRpWeapon(
                rpWeapPKey,
                rpWeapId,
                rpWeapLiveTime
              )),
              (this.rpWeapons[rpWeapKey].owner = this.players[rpWeapPKey]))
            : (this.rpWeapons[rpWeapKey].lastVisible = Date.now() + rpWeapLiveTime)
        }
        rpWeapIdx += rpWeapCount * 2
      }
    },
    updateWeapons: function (weaponArray) {
      var weaponNow = Date.now(),
        weaponKey = '',
        weaponIdx = 0
      while (weaponIdx < weaponArray.length - 1) {
        weaponKey = 'w' + weaponArray[weaponIdx + 1]
        owner = 'p' + weaponArray[weaponIdx + 5]
        var weaponItem = {
          owner: owner,
          w_id: weaponArray[weaponIdx + 4],
          x: weaponArray[weaponIdx + 2] - 500,
          y: weaponArray[weaponIdx + 3] - 500,
          px: -1,
          py: -1,
          angle: 0,
          target: 0,
          liveTime:
            weaponArray[0] == ws_commands.weapons_lt
              ? weaponArray[weaponIdx + 6]
              : 200,
        }
        weaponArray[weaponIdx + 6] == 0 &&
          ((weaponItem.px = weaponArray[weaponIdx + 7] - 500),
          (weaponItem.py = weaponArray[weaponIdx + 8] - 500),
          (weaponItem.angle =
            (weaponArray[weaponIdx + 9] - 1000) / 100 - Math.PI / 2),
          (weaponItem.target = weaponArray[weaponIdx + 10]),
          (weaponIdx += 5))
        weaponIdx += weaponArray[0] == ws_commands.weapons_lt ? 6 : 5
        if (
          typeof this.weapons[weaponKey] == 'undefined' ||
          typeof this.weapons[weaponKey].mesh == 'undefined'
        ) {
          if (typeof this.playersInfo[weaponItem.owner] != 'undefined') {
            this.weapons[weaponKey] = this.createWeapon(weaponItem)
            var weaponItemDef = this.weapons[weaponKey].weapon
            this.weapons[weaponKey].owner = this.players[weaponItem.owner]
            weaponItem.px > -1 &&
              ((this.weapons[weaponKey].mesh.position[X] = weaponItem.px),
              (this.weapons[weaponKey].mesh.position[Y] = weaponItem.py),
              this.weapons[weaponKey].mesh.setNewPosition([
                weaponItem.x,
                weaponItem.y,
                0,
              ]))
            if (
              weaponItemDef.action_type == weapon_action_types.linear &&
              !weaponItemDef.action_holded &&
              weaponItem.px > -1 &&
              weaponItemDef.id != 50 &&
              weaponItemDef.id != 51 &&
              weaponItemDef.id != 52
            ) {
              this.weapons[weaponKey].mesh.angle[Z] = weaponItem.angle
              this.weapons[weaponKey].mesh.moveSpeed = weaponItemDef.action_speed
            } else {
              typeof this.weapons[weaponKey].owner != 'undefined' &&
                (this.weapons[weaponKey].mesh.angleSpeed[Z] == null &&
                  (this.weapons[weaponKey].mesh.angle[Z] = -getWeaponAngle(
                    this.weapons[weaponKey].owner.mainCell,
                    this.weapons[weaponKey].mesh
                  )),
                (weaponItemDef.action_use_for_owner ||
                  (weaponItemDef.action_type == weapon_action_types.radial &&
                    typeof this.players[weaponItem.owner] != 'undefined')) &&
                  (this.players[weaponItem.owner].weapons[weaponKey] =
                    weaponKey))
            }
            weaponItemDef.move_sound != '' &&
              ((this.weapons[weaponKey].mesh.playerId = weaponItem.owner),
              (this.weapons[weaponKey].mesh.sound = weaponItemDef.move_sound),
              (this.weapons[weaponKey].mesh.soundRepeat =
                weaponItemDef.move_sound_repeat ? 2 : false))
          }
        } else {
          weaponItem.px > -1 &&
            ((this.weapons[weaponKey].mesh.position[X] = weaponItem.px),
            (this.weapons[weaponKey].mesh.position[Y] = weaponItem.py))
          var weaponItemDef = this.weapons[weaponKey].weapon
          ;(weaponItemDef.action_type != weapon_action_types.linear ||
            weaponItemDef.action_holded ||
            weaponItemDef.id == 50 ||
            weaponItemDef.id == 51 ||
            weaponItemDef.id == 52) &&
            this.weapons[weaponKey].mesh.setNewPosition([
              weaponItem.x,
              weaponItem.y,
              0,
            ])
        }
        typeof this.weapons[weaponKey] != 'undefined' &&
          ((this.weapons[weaponKey].lastVisible =
            weaponNow + weaponItem.liveTime),
          (this.weapons[weaponKey].dead = false))
      }
    },
    updateExplosions: function (explosionArray) {
      var explosionIdx = 0
      while (explosionIdx < explosionArray.length - 1) {
        var explodeId = explosionArray[explosionIdx + 1],
          explodeItem = {
            id: explodeId,
            size: explosionArray[explosionIdx + 2],
            texture: explosionArray[explosionIdx + 3],
            x: explosionArray[explosionIdx + 4] - 500,
            y: explosionArray[explosionIdx + 5] - 500,
          }
        explosionIdx += 5
        this.createExplode(explodeItem)
      }
    },
    clearEffects: function (clearEffectData) {
      var clearEffectPKey = 'p' + clearEffectData[1]
      for (var clearEffectI = 0; clearEffectI < this.effects.length; clearEffectI++) {
        if (this.effects[clearEffectI].id == null) {
          continue
        }
        var clearEffectParts = this.effects[clearEffectI].id.split('_'),
          clearEffectPlayer = this.players[clearEffectPKey]
        if (typeof clearEffectPlayer != 'undefined') {
          for (var effectCellKey in clearEffectPlayer.cells) {
            'c' + clearEffectParts[0] == effectCellKey &&
              (this.effects[clearEffectI].lastVisible = 0)
          }
        }
      }
    },
    updateEffects: function (effectArray) {
      var effectNow = Date.now(),
        effectIdx = 0
      while (effectIdx < effectArray.length - 1) {
        var effectCellId = effectArray[effectIdx + 1],
          effectType = effectArray[effectIdx + 2],
          effectDuration = Math.max(500, effectArray[effectIdx + 3]),
          effectTargetCell = null
        for (var effectPKey in this.players) {
          if (
            typeof this.players[effectPKey].cells['c' + effectCellId] != 'undefined'
          ) {
            effectTargetCell = this.players[effectPKey].cells['c' + effectCellId]
            if (effectType == 0) {
              if (
                this.playersInfo[effectPKey].mesh.alpha == 1 &&
                this.playersInfo[effectPKey].mesh.newAlpha == 1
              ) {
              }
              this.playersInfo[effectPKey].mesh.alpha =
                this.players[effectPKey] == this.player ? 0.2 : 0
              this.playersInfo[effectPKey].mesh.newAlpha =
                this.players[effectPKey] == this.player ? 0.2 : 0
              this.playersInfo[effectPKey].mesh.newAlphaSpeed = 2
              this.playersInfo[effectPKey].mesh.allowDistord = true
              this.players[effectPKey].lastHideUpdate = Date.now() + effectDuration
            } else {
              effectType == 100 &&
                ((this.playersInfo[effectPKey].mesh.newAlpha = 0.2),
                (this.playersInfo[effectPKey].mesh.newAlphaSpeed = 7),
                (this.playersInfo[effectPKey].mesh.allowDistord = false),
                (this.players[effectPKey].lastHideUpdate =
                  Date.now() + effectDuration))
            }
            break
          }
        }
        if (effectType > 0 && effectType != 100 && effectTargetCell != null) {
          var effectFound = false
          for (
            var updateI2 = 0;
            updateI2 < this.effects.length;
            updateI2++
          ) {
            if (this.effects[updateI2].id == effectCellId + '_' + effectType) {
              this.effects[updateI2].lastVisible = Date.now() + effectDuration
              effectFound = true
              break
            }
          }
          if (!effectFound) {
            var effectItem = {
              id: effectCellId + '_' + effectType,
              x: 0,
              y: 0,
              size: effectTargetCell.size,
              texture_pack: 'effects',
              texture: effectType,
              owner: effectTargetCell,
              holdOn: null,
              dieOnAnimationEnd: false,
              liveTime: Date.now() + effectDuration,
              angle: 0,
            }
            this.createEffect(effectItem)
          }
        }
        effectIdx += 3
      }
    },
    getPlayerName: function (getNameId) {
      for (var getNameKey in this.playersInfo) {
        if (
          this.playersInfo[getNameKey].prf == getNameId ||
          'p' + this.playersInfo[getNameKey].id == getNameId
        ) {
          return this.playersInfo[getNameKey].nick
        }
      }
      if (typeof this.hofInfo['' + getNameId] != 'undefined') {
        return this.hofInfo['' + getNameId]
      }
      return ''
    },
    getPlayerClanData: function (getClanId) {
      for (var getClanKey in this.playersInfo) {
        if (
          this.playersInfo[getClanKey].prf == getClanId ||
          'p' + this.playersInfo[getClanKey].id == getClanId
        ) {
          return this.playersInfo[getClanKey].clan
        }
      }
      return {
        id: 0,
        name: '',
        ico: 0,
      }
    },
    getPlayerTeam: function (getTeamId) {
      for (var getTeamKey in this.playersInfo) {
        if (
          this.playersInfo[getTeamKey].prf == getTeamId ||
          'p' + this.playersInfo[getTeamKey].id == getTeamId
        ) {
          return this.playersInfo[getTeamKey].team
        }
      }
      return 0
    },
    getPlayerPhs: function (getPhsId) {
      for (var getPhsKey in this.playersInfo) {
        if (
          this.playersInfo[getPhsKey].prf == getPhsId ||
          'p' + this.playersInfo[getPhsKey].id == getPhsId
        ) {
          return this.playersInfo[getPhsKey].phs
        }
      }
      return ''
    },
    getPlayerPrfId: function (getPrfId) {
      for (var getPrfKey in this.playersInfo) {
        if (
          this.playersInfo[getPrfKey].prf == getPrfId ||
          'p' + this.playersInfo[getPrfKey].id == getPrfId
        ) {
          return this.playersInfo[getPrfKey].prf
        }
      }
      return ''
    },
    getPlayerImage: function (imgPlayerKey, imgSelector) {
      if (typeof this.playersInfo[imgPlayerKey] == 'undefined') {
        return
      }
      var imgCanvas = document.createElement('canvas')
      imgCanvas.width = 420
      imgCanvas.height = 420
      var imgCtx = imgCanvas.getContext('2d'),
        imgTexCanvas = this.playersInfo[imgPlayerKey].mesh.texture[0].canvas,
        imgHalfW = imgTexCanvas.width / 2,
        imgHalfH = imgTexCanvas.height / 2
      imgCtx.drawImage(
        imgTexCanvas,
        210 - Math.round(imgHalfW),
        210 - Math.round(imgHalfH)
      )
      $(imgSelector).attr('src', imgCanvas.toDataURL())
    },
    updateInitArtefact: function (artefactData) {
      var artefactPKey = 'p' + artefactData[1]
      typeof this.playersInfo[artefactPKey] != 'undefined' &&
        (this.playersInfo[artefactPKey].runesData == null
          ? (this.playersInfo[artefactPKey].runesData = this.createRunes(
              artefactData[2],
              parseInt(artefactData[3]),
              parseInt(artefactData[4])
            ))
          : ((this.playersInfo[artefactPKey].runesData.createTime =
              Date.now() + parseInt(artefactData[3]) - parseInt(artefactData[4])),
            (this.playersInfo[artefactPKey].runesData.active = true)))
    },
    updateDamage: function (damageArray) {
      var damageIdx = 0
      while (damageIdx < damageArray.length - 1) {
        var damageItem = {
          id_p: 'p' + damageArray[damageIdx + 1],
          id_c: 'c' + damageArray[damageIdx + 2],
          value: damageArray[damageIdx + 3] + damageArray[damageIdx + 5],
          flag: damageArray[damageIdx + 4],
          dmg_armor: damageArray[damageIdx + 5],
        }
        damageIdx += 5
        this.createDamage(damageItem)
      }
    },
    updateArmor: function (armorData) {
      var armorPKey = 'p' + armorData[1]
      typeof this.playersInfo[armorPKey] != 'undefined' &&
        ((this.playersInfo[armorPKey].armor = armorData[2]),
        this.playersInfo[armorPKey].isBoss && this.updateBossHpBar(armorPKey),
        my_skin[10] > 0 &&
          (game.playersInfo[game.player.id].armor == 0 ||
          arm_data[my_skin[10]][3] == 0
            ? $('#slotArm img').css({ opacity: '0.5' })
            : $('#slotArm img').css({ opacity: '1' })))
    },
    updateBossHpBar: function (bossPKey) {
      if (this.playersInfo[bossPKey].armor < 0) {
        this.playersInfo[bossPKey].armor = 0
      }
      var bossHpPct = Math.round(
        (this.playersInfo[bossPKey].armor /
          this.playersInfo[bossPKey].startArmor) *
          100
      )
      $('#bossHpBar div.progress').css({ width: bossHpPct + '%' })
      $('#bossHpBar em.current').html(bossHpPct + '%')
      if (
        bossHpPct <= this.bossAngryPrc &&
        !this.playersInfo[bossPKey].mesh.angry
      ) {
        Hints.text('angryBoss')
        this.playersInfo[bossPKey].mesh.angry = true
        var bossSkinParts = this.playersInfo[bossPKey].skin.split(',')
        bossSkinParts[0] += 'a'
        var bossNewTexture = createPlayerSkin(bossSkinParts, null)
        this.playersInfo[bossPKey].mesh.texture = [bossNewTexture]
      }
    },
    updatePlayersList: function (plListData) {
      var plListArr = plListData.pl.split('||')
      for (var plListI = 0; plListI < plListArr.length; plListI++) {
        var plListParts = plListArr[plListI].split('|'),
          plListWeaponMap = []
        if (plListParts[5] != '-') {
          var plListWeaponParts = plListParts[5].split(',')
          for (var plListWpnI = 0; plListWpnI < plListWeaponParts.length; plListWpnI++) {
            var plListWpnPair = plListWeaponParts[plListWpnI].split(':')
            plListWeaponMap[plListWpnPair[0]] = plListWpnPair[1]
          }
        }
        var plListLvlParts = plListParts[6].split(':'),
          plListTeamId = plListLvlParts.length > 2 ? parseInt(plListLvlParts[2]) : 0,
          plListClanParts = plListParts[11].split(':')
        if (typeof this.playersInfo['p' + plListParts[0]] == 'undefined') {
          var plListRuneParts = plListParts[9].split(':'),
            plListArmorParts = plListParts[12].split(':'),
            plListNick = plListParts[2]
          plListParts[13] == 1 &&
            (plListNick =
              plListNick.split('&&')[
                my_lang == 'ru' ? 0 : my_lang == 'lv' ? 2 : 1
              ])
          this.playersInfo['p' + plListParts[0]] = {
            id: plListParts[0],
            isBoss: plListParts[13] == 1,
            active: false,
            dead: false,
            position: [0, 0],
            onScreen: false,
            armor: parseInt(plListArmorParts[0]),
            startArmor: parseInt(plListArmorParts[1]),
            prf: plListParts[1],
            nick: plListNick,
            phs: plListParts[3],
            clan: {
              id: plListClanParts[0],
              name: plListClanParts[1],
              ico: plListClanParts[2],
            },
            team: plListTeamId,
            skin: plListParts[4],
            buff_wd_koef: plListParts[7] != 0 ? 1 + plListParts[7] * 0.01 : 1,
            wpl: plListWeaponMap,
            bst: plListParts[10] == 1,
            removeTime: 0,
            mesh_nick: getNickLabel(
              plListNick,
              parseInt(plListLvlParts[0]),
              plListLvlParts.length > 1 ? parseInt(plListLvlParts[1]) : 0,
              team_colors[plListTeamId]
            ),
            mesh_clan:
              parseInt(plListClanParts[0]) > 0
                ? getClanLabel(plListClanParts[0], plListClanParts[1], clan_text_color)
                : null,
            arrow_nick: getNickLabel(plListNick, 0, 0, team_colors[plListTeamId]),
            mesh: newGlObject({
              skin: plListParts[4].split(','),
              createMesh: true,
            }),
            runesData: this.createRunes(
              plListParts[8],
              parseInt(plListRuneParts[0]),
              parseInt(plListRuneParts[1])
            ),
          }
          plListParts[13] == 1 &&
            (this.updateBossHpBar('p' + plListParts[0]),
            $('#bossHpBar').removeClass('off'))
          typeof muteChat['p' + plListParts[0]] == 'undefined' &&
            $.ajax({
              url: 'https://aburus.ru/mod/puziri/php/mute.php',
              method: 'GET',
              dataType: 'jsonp',
              crossDomain: true,
              cache: false,
              data: {
                Id: plListParts[1],
                Idx: 'p' + plListParts[0],
                Nick: plListNick,
                Lvl: plListLvlParts[0],
                Rang: plListLvlParts[1],
                Team: team_colors[plListLvlParts[2]],
              },
            })
          typeof origSkins['p' + plListParts[0]] == 'undefined' &&
            ((origSkins['p' + plListParts[0]] = plListParts[4]),
            setModSkin(
              'p' + plListParts[0],
              plListParts[1],
              plListClanParts[0],
              plListParts[13],
              plListLvlParts[2],
              plListParts[4].split(',')
            ))
        }
      }
    },
    updatePlayerInfo: function (plInfoData) {
      var plInfoParts = plInfoData.pl.split('|'),
        plInfoWeaponMap = []
      if (plInfoParts[5] != '-') {
        var plInfoWeaponParts = plInfoParts[5].split(',')
        for (var plInfoWpnI = 0; plInfoWpnI < plInfoWeaponParts.length; plInfoWpnI++) {
          var plInfoWpnPair = plInfoWeaponParts[plInfoWpnI].split(':')
          plInfoWeaponMap[plInfoWpnPair[0]] = plInfoWpnPair[1]
        }
      }
      var plInfoLvlParts = plInfoParts[6].split(':'),
        plInfoTeamId = plInfoLvlParts.length > 2 ? parseInt(plInfoLvlParts[2]) : 0,
        plInfoClanParts = plInfoParts[11].split(':')
      if (typeof this.playersInfo['p' + plInfoParts[0]] == 'undefined') {
        var plInfoRuneParts = plInfoParts[9].split(':'),
          plInfoArmorParts = plInfoParts[12].split(':'),
          plInfoNick = plInfoParts[2]
        plInfoParts[13] == 1 &&
          (plInfoNick =
            plInfoNick.split('&&')[
              my_lang == 'ru' ? 0 : my_lang == 'lv' ? 2 : 1
            ])
        this.playersInfo['p' + plInfoParts[0]] = {
          id: plInfoParts[0],
          isBoss: plInfoParts[13] == 1,
          active: false,
          dead: false,
          position: [0, 0],
          onScreen: false,
          armor: parseInt(plInfoArmorParts[0]),
          startArmor: parseInt(plInfoArmorParts[1]),
          prf: plInfoParts[1],
          nick: plInfoNick,
          phs: plInfoParts[3],
          clan: {
            id: plInfoClanParts[0],
            name: plInfoClanParts[1],
            ico: plInfoClanParts[2],
          },
          team: plInfoTeamId,
          skin: plInfoParts[4],
          buff_wd_koef: plInfoParts[7] != 0 ? 1 + plInfoParts[7] * 0.01 : 1,
          wpl: plInfoWeaponMap,
          bst: plInfoParts[10] == 1,
          removeTime: 0,
          mesh_nick: getNickLabel(
            plInfoNick,
            parseInt(plInfoLvlParts[0]),
            plInfoLvlParts.length > 1 ? parseInt(plInfoLvlParts[1]) : 0,
            team_colors[plInfoTeamId]
          ),
          mesh_clan:
            parseInt(plInfoClanParts[0]) > 0
              ? getClanLabel(plInfoClanParts[0], plInfoClanParts[1], clan_text_color)
              : null,
          arrow_nick: getNickLabel(plInfoNick, 0, 0, team_colors[plInfoTeamId]),
          mesh: newGlObject({
            skin: plInfoParts[4].split(','),
            createMesh: true,
          }),
          runesData: this.createRunes(
            plInfoParts[8],
            parseInt(plInfoRuneParts[0]),
            parseInt(plInfoRuneParts[1])
          ),
        }
        plInfoParts[13] == 1 &&
          (this.updateBossHpBar('p' + plInfoParts[0]),
          $('#bossHpBar').removeClass('off'))
        typeof muteChat['p' + plInfoParts[0]] == 'undefined' &&
          $.ajax({
            url: 'https://aburus.ru/mod/puziri/php/mute.php',
            method: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            cache: false,
            data: {
              Id: plInfoParts[1],
              Idx: 'p' + plInfoParts[0],
              Nick: plInfoNick,
              Lvl: plInfoLvlParts[0],
              Rang: plInfoLvlParts[1],
              Team: team_colors[plInfoLvlParts[2]],
            },
          })
        typeof origSkins['p' + plInfoParts[0]] == 'undefined' &&
          ((origSkins['p' + plInfoParts[0]] = plInfoParts[4]),
          setModSkin(
            'p' + plInfoParts[0],
            plInfoParts[1],
            plInfoClanParts[0],
            plInfoParts[13],
            plInfoLvlParts[2],
            plInfoParts[4].split(',')
          ))
      }
      this.roomMode == room_modes.arena || game.roomMode == room_modes.boss
        ? (this.updateTeamPlayersCount(),
          InfoBoard.add(
            '<span class="nick ' +
              team_hcolors[plInfoTeamId] +
              '">' +
              this.getPlayerName('p' + plInfoParts[0]) +
              '</span> ' +
              Texts.joinedToRoom
          ))
        : InfoBoard.add(
            '<span class="nick ' +
              team_hcolors[plInfoTeamId] +
              '" style="color: mediumseagreen;">' +
              this.getPlayerName('p' + plInfoParts[0]) +
              '</span> ' +
              Texts.joinedToRoom
          )
    },
    updateTeamPlayersCount: function () {
      var teamActiveCount = 0
      for (var teamCountPKey in this.playersInfo) {
        this.playersInfo[teamCountPKey].active && teamActiveCount++
      }
      $('#gameRules em#count').html(teamActiveCount)
    },
    updatePlayerStdKeys: function (stdKeysData) {},
    removePlayerInfo: function (removeData) {
      var removePKey = 'p' + removeData[1]
      typeof this.playersInfo[removePKey] != 'undefined' &&
        (this.roomMode == room_modes.arena || game.roomMode == room_modes.boss
          ? ((this.playersInfo[removePKey].active = false),
            this.updateTeamPlayersCount(),
            InfoBoard.add(
              '<span class="nick ' +
                team_hcolors[this.getPlayerTeam(removePKey)] +
                '">' +
                this.getPlayerName(removePKey) +
                '</span> ' +
                Texts.leftRoom
            ))
          : (this.playersInfo[removePKey].removeTime = Date.now() + 10000))
      this.eatedBy == removePKey && (this.eatedBy = 0)
    },
    updatePlayerSkinHealth: function (skinHealthData) {
      var skinHealthRatio = skinHealthData[1] / 10000
    },
    updateChatBubbleState: function (bubbleData) {
      var bubbleIdx = 0
      while (bubbleIdx < bubbleData.length - 1) {
        var bubblePKey = 'p' + bubbleData[bubbleIdx + 1]
        typeof this.players[bubblePKey] != 'undefined' &&
          (this.players[bubblePKey].chatBubbleTime =
            bubbleData[bubbleIdx + 2] == 0 ? 0 : Date.now() + 3600000)
        bubbleIdx += 2
      }
    },
    updateChat: function (chatData) {
      for (var chatI = 0; chatI < chatData.m.length; chatI++) {
        var chatPKey = 'p' + chatData.m[chatI][0]
        if (this.players[chatPKey].mainCell.onScreen()) {
          this.players[chatPKey].chatBubbleTime =
            Date.now() + this.chatBubbleTime * 1000
          var chatMessage = chatData.m[chatI][1]
          this.playersInfo[chatPKey].isBoss &&
            (chatMessage =
              typeof Texts.bossMsg[chatMessage] != 'undefined'
                ? Texts.bossMsg[chatMessage]
                : '')
          chatMessage != '' &&
            (this.playersInfo[chatPKey].prf != -1 &&
              $.ajax({
                url: 'https://aburus.ru/mod/puziri/php/chat.php',
                method: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                cache: false,
                data: {
                  myFile: prf_data.nick,
                  chatNick: this.getPlayerName(chatPKey),
                  chatMesg: chatMessage,
                },
              }),
            chatDeny == false &&
              (this.roomMode == room_modes.ffa
                ? InfoBoard.add(
                    '<span class="nick" style="color: mediumvioletred;">' +
                      this.getPlayerName(chatPKey) +
                      '</span>: <span class="msg">' +
                      chatMessage +
                      '</span>',
                    {
                      type: 'chat',
                      my: false,
                    }
                  )
                : InfoBoard.add(
                    '<span class="nick" style="color: ' +
                      team_colors[this.getPlayerTeam(chatPKey)] +
                      ';">' +
                      this.getPlayerName(chatPKey) +
                      '</span>: <span class="msg">' +
                      chatMessage +
                      '</span>',
                    {
                      type: 'chat',
                      my: false,
                    }
                  )))
        }
      }
    },
    updateArenaSuicide: function (suicideData) {
      this.finished = true
      var suicideCount = Math.round((suicideData.length - 14) / 3),
        suicideResult = {
          newRating: suicideData[1],
          rating: suicideData[1] - suicideData[2],
          oldLeague: suicideData[3],
          newLeague: suicideData[4],
          skinBroken:
            suicideData[5] == 1 ||
            (parseInt(my_skin[8]) > 0 &&
              uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
                skins_set_expire_at),
          wingsBroken:
            parseInt(my_skin[12]) > 0 &&
            uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
              wings_expire_at,
        }
      prf_data.rating = parseInt(prf_data.rating)
      prf_data.livetime = parseInt(prf_data.livetime) + suicideData[6]
      gameChatInput.hide()
      newLeagueData.newAch = true
      gameStartCounterChange('')
      mobileButtons.showControllers(false)
      WND_player_info('close')
      WND_arena_die('close')
      WND_suicide_inactive('close')
      WND_suicide_die('open', suicideResult)
      ws.disconnect()
    },
    updateBossFinish: function (bossFinishData) {
      console.log(bossFinishData)
      this.finished = true
      for (idx in this.playersInfo) {
        typeof this.playersInfo[idx] != 'undefined' &&
          typeof origSkins[idx] != 'undefined' &&
            (this.playersInfo[idx].mesh.texture[0] = createPlayerSkin(
              origSkins[idx].split(','),
              null
            ))
      }
      bossCounter++
      var bossFinishCount = Math.round((bossFinishData.length - 12) / 6),
        bossFinishResult = {
          isLog: false,
          myId: this.player.id,
          collectedCoins: bossFinishData[1],
          collectedRuby: bossFinishData[2],
          collectedChests: bossFinishData[3],
          collectedSkinsTotal: 0,
          collectedSkinsBoss: bossFinishData[4],
          oldSkins: parseInt(my_chests[9]),
          newSkins: 0,
          oldCoins: parseInt(prf_data.coins),
          newCoins: parseInt(prf_data.coins) + bossFinishData[1],
          oldRuby: parseInt(prf_data.ruby),
          newRuby: parseInt(prf_data.ruby) + bossFinishData[2],
          bossTotalSkins: bossFinishData[5],
          bossStartArmor: 0,
          bossArmor: 0,
          bossDamage: 100 - bossFinishData[6],
          bossLutRng: this.bossLutRng,
          bossLut: this.bossLut,
          newArmor: 0,
          skinBroken:
            bossFinishData[7] ||
            (parseInt(my_skin[8]) > 0 &&
              uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
                skins_set_expire_at),
          wingsBroken:
            parseInt(my_skin[12]) > 0 &&
            uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
              wings_expire_at,
          liveTime: bossFinishData[8],
          places: [
            'p' + bossFinishData[9],
            'p' + bossFinishData[10],
            'p' + bossFinishData[11],
          ],
          players: [],
        }
      for (var bossFinishI = 0; bossFinishI < bossFinishCount; bossFinishI++) {
        var bossFinishIsMe =
            this.players['p' + bossFinishData[bossFinishI * 6 + 12]] == this.player,
          bossFinishPKey = 'p' + bossFinishData[bossFinishI * 6 + 12],
          bossFinishPlayerResult = {
            id: bossFinishPKey,
            isMe: bossFinishIsMe,
            prf_id: game.getPlayerPrfId(bossFinishPKey),
            name: game.getPlayerName(bossFinishPKey),
            damage: bossFinishData[bossFinishI * 6 + 13],
            hits: bossFinishData[bossFinishI * 6 + 14],
            skinsDamage: bossFinishData[bossFinishI * 6 + 15],
            skinsHits: bossFinishData[bossFinishI * 6 + 16],
            skinsFastKill: bossFinishData[bossFinishI * 6 + 17],
          }
        bossFinishResult.players.push(bossFinishPlayerResult)
        bossFinishIsMe &&
          ((bossFinishResult.collectedSkinsTotal =
            bossFinishResult.collectedSkinsBoss +
            bossFinishPlayerResult.skinsDamage +
            bossFinishPlayerResult.skinsHits +
            bossFinishPlayerResult.skinsFastKill),
          (bossFinishResult.newSkins =
            bossFinishResult.oldSkins + bossFinishResult.collectedSkinsTotal))
      }
      for (var bossFinishInfoKey in this.playersInfo) {
        this.playersInfo[bossFinishInfoKey].isBoss &&
          ((bossFinishResult.bossStartArmor = this.playersInfo[bossFinishInfoKey].startArmor),
          (bossFinishResult.bossArmor = this.playersInfo[bossFinishInfoKey].armor))
      }
      my_progress_data[0] += bossFinishResult.collectedCoins
      my_progress_data[1] += bossFinishResult.collectedRuby
      my_chests[9] =
        parseInt(my_chests[9]) +
        bossFinishResult.collectedSkinsTotal -
        bossFinishResult.collectedChests * 10
      my_chests[11] = parseInt(my_chests[11]) + bossFinishResult.collectedSkinsTotal
      bossFinishResult.collectedChests > 0 &&
        (my_chests[10] += bossFinishResult.collectedChests)
      prf_data.livetime = parseInt(prf_data.livetime) + bossFinishResult.liveTime
      prf_data.play_c_boss++
      my_chests[11] >= 300 &&
        typeof arm_data['' + time_to_boss[3]] == 'undefined' &&
        (bossFinishResult.newArmor = time_to_boss[3])
      mobileButtons.showControllers(false)
      WND_arena_die('close')
      gameChatInput.hide()
      for (idx in this.playersInfo) {
        typeof this.playersInfo[idx] != 'undefined' &&
          this.playersInfo[idx].isBoss == true &&
            (this.playersInfo[idx].armor > 0
              ? (printHintOnScreen('ПОРАЖЕНИЕ...'),
                $('div.hintOnScreen').css({ 'z-index': '2' }),
                $('div.hintOnScreen p.text').css({
                  color: '#ff7733',
                  'text-shadow':
                    '2px 0 0 #773300, -2px 0 0 #773300, 0 2px 0 #773300, 0 -2px 0 #773300, 2px 2px #773300, -2px -2px 0 #773300, 2px -2px 0 #773300, -2px 2px 0 #773300',
                  'font-size': '72px',
                }))
              : (printHintOnScreen('ПОБЕДА!'),
                $('div.hintOnScreen').css({ 'z-index': '2' }),
                $('div.hintOnScreen p.text').css({
                  color: '#77aaff',
                  'text-shadow':
                    '2px 0 0 #003377, -2px 0 0 #003377, 0 2px 0 #003377, 0 -2px 0 #003377, 2px 2px #003377, -2px -2px 0 #003377, 2px -2px 0 #003377, -2px 2px 0 #003377',
                  'font-size': '72px',
                })))
      }
      playSound('sfx', 'start')
      countFPS.sendAnalytics()
      setTimeout(function () {
        gameStartCounterChange('')
        WND_arena_die('close')
        !$('#wnd_suicide_inactive').length && WND_boss_fin('open', bossFinishResult)
        ws.disconnect()
      }, 4000)
    },
    updateArenaFinishTeam: function (arenaFinishData) {
      this.finished = true
      for (idx in this.playersInfo) {
        typeof this.playersInfo[idx] != 'undefined' &&
          typeof origSkins[idx] != 'undefined' &&
            (this.playersInfo[idx].mesh.texture[0] = createPlayerSkin(
              origSkins[idx].split(','),
              null
            ))
      }
      setChestsBarIcon()
      var arenaFinishCount = Math.round((arenaFinishData.length - 19) / 3),
        arenaFinishResult = {
          isLog: false,
          myId: this.player.id,
          myTeam: 1,
          oldRating: arenaFinishData[1],
          newRating: arenaFinishData[2],
          rating: arenaFinishData[2] - arenaFinishData[1],
          oldLeague: arenaFinishData[3],
          newLeague: arenaFinishData[4],
          oldChsKeys: arenaFinishData[5],
          newChsKeys: arenaFinishData[6],
          collectedChsKeys: arenaFinishData[6] - arenaFinishData[5],
          oldCoins: arenaFinishData[7],
          newCoins: arenaFinishData[7] + arenaFinishData[8],
          coins: arenaFinishData[8],
          skinBroken:
            arenaFinishData[9] ||
            (parseInt(my_skin[8]) > 0 &&
              uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
                skins_set_expire_at),
          wingsBroken:
            parseInt(my_skin[12]) > 0 &&
            uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
              wings_expire_at,
          chsType: 2,
          collectedChests: arenaFinishData[11],
          team_places: [arenaFinishData[12], arenaFinishData[13], arenaFinishData[14]],
          team_kills: [arenaFinishData[15], arenaFinishData[16], arenaFinishData[17]],
          newRuby: 0,
          collectedRuby: 0,
          newKeys: 0,
          collectedKeys: 0,
          newAward: arenaFinishData[19],
          players: [],
        }
      my_progress_data[0] += arenaFinishResult.coins
      my_progress_data[1] += arenaFinishResult.collectedRuby
      my_progress_data[2] += arenaFinishResult.collectedKeys
      my_progress_data[3] += arenaFinishResult.collectedChsKeys
      my_chests[0] = arenaFinishResult.newChsKeys - arenaFinishResult.collectedChests * 10
      arenaFinishResult.collectedChests > 0 &&
        (my_chests[arenaFinishResult.oldLeague + 1]++,
        $('#chestBlock img.chestIco').attr('src', '/img/chests/s/chest_X.png'))
      arenaFinishResult.newAward > 0 &&
        (awards_data +=
          (awards_data.length ? ',' : '') + arenaFinishResult.newAward + ':1')
      parseInt(prf_data.wpn_slots) == 1 &&
        arenaFinishResult.newRating >= 250 &&
        ((prf_data.wpn_slots = 2),
        wpn_game.length > 0
          ? wpn_game.push(parseInt(wpn_game[0]) != 32 ? '32' : '17')
          : (wpn_game.push('17'), wpn_game.push('32')),
        (newLeagueData.newSlot = true))
      prf_data.league = arenaFinishResult.newLeague
      prf_data.rating = arenaFinishResult.newRating
      prf_data.livetime = parseInt(prf_data.livetime) + arenaFinishData[10]
      prf_data.play_c++
      prf_data.rating >= 100 && MainMenuBtns.enableClans()
      for (var arenaFinishI = 0; arenaFinishI < arenaFinishCount; arenaFinishI++) {
        var arenaFinishIsMe =
          this.players['p' + arenaFinishData[arenaFinishI * 3 + 20]] == this.player
        if (arenaFinishIsMe) {
          arenaFinishResult.myTeam = arenaFinishData[arenaFinishI * 3 + 22]
        }
        var arenaFinishPKey = 'p' + arenaFinishData[arenaFinishI * 3 + 20]
        arenaFinishResult.players.push({
          id: arenaFinishPKey,
          prf_id: game.getPlayerPrfId(arenaFinishPKey),
          place: arenaFinishI + 1,
          isMe: arenaFinishIsMe,
          eat: arenaFinishData[arenaFinishI * 3 + 21],
          team: arenaFinishData[arenaFinishI * 3 + 22],
          name: game.getPlayerName(arenaFinishPKey),
          clan: game.getPlayerClanData(arenaFinishPKey),
        })
      }
      var arenaFinishWinTeam = 0
      for (var arenaFinishI = 0; arenaFinishI < 3; arenaFinishI++) {
        arenaFinishResult.team_places[arenaFinishI] == 1 && (arenaFinishWinTeam = arenaFinishI + 1)
      }
      newLeagueData.newAch = true
      mobileButtons.showControllers(false)
      WND_arena_die('close')
      gameChatInput.hide()
      gameStartCounterChange(
        TextParser.parseDescription(Texts.teamWin, arenaFinishWinTeam),
        true
      )
      playSound('sfx', 'start')
      countFPS.sendAnalytics()
      setTimeout(function () {
        gameStartCounterChange('')
        WND_arena_die('close')
        !$('#wnd_suicide_inactive').length &&
          WND_arena_fin_team('open', arenaFinishResult)
        ws.disconnect()
      }, 4000)
    },
    updateFfaFinish: function (ffaFinishData) {
      this.finished = true
      oldChsKeys = parseInt($('#chestKeyBar em.current').html().trim())
      oldRating = parseInt($('#myLeagueBar em.current').html().trim())
      var ffaFinishResult = {
        oldCoins: ffaFinishData[2] - ffaFinishData[1],
        newCoins: ffaFinishData[2],
        limitsCoins: ffaFinishData[3],
        dayCoins: ffaFinishData[4],
        skinBroken:
          ffaFinishData[5] ||
          (parseInt(my_skin[8]) > 0 &&
            uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
              skins_set_expire_at),
        wingsBroken:
          parseInt(my_skin[12]) > 0 &&
          uts + Math.round((Date.now() - page_loaded_at) / 1000) >=
            wings_expire_at,
        eatedBy: ffaFinishData[6],
        oldChsKeys: oldChsKeys,
        newChsKeys: oldChsKeys + ffaFinishData[9],
        currentChsKeys: ffaFinishData[8],
        collectedChsKeys: ffaFinishData[9],
        collectedChests: ffaFinishData[10],
        chsType: 2,
        oldLeague: ffaFinishData[11],
        newLeague: ffaFinishData[12],
        collectedRating: ffaFinishData[13],
        oldRating: oldRating,
        newRating: ffaFinishData[14],
        reconnected: ffaFinishData[15] == 1,
        newAward: typeof ffaFinishData[17] != 'undefined' ? ffaFinishData[17] : 0,
      }
      my_progress_data[0] = ffaFinishResult.dayCoins
      my_progress_data[3] = ffaFinishData[16]
      my_chests[0] = ffaFinishResult.currentChsKeys
      ffaFinishResult.collectedChests > 0 &&
        ((my_chests[ffaFinishResult.oldLeague + 1] += ffaFinishResult.collectedChests),
        $('#chestBlock img.chestIco').attr('src', '/img/chests/s/chest_X.png'))
      ffaFinishResult.newAward > 0 &&
        (awards_data +=
          (awards_data.length ? ',' : '') + ffaFinishResult.newAward + ':1')
      prf_data.livetime_ffa = parseInt(prf_data.livetime_ffa) + ffaFinishData[7]
      prf_data.play_c_ffa++
      prf_data.rating = ffaFinishResult.newRating
      prf_data.rating >= 100 && MainMenuBtns.enableClans()
      parseInt(prf_data.wpn_slots) == 1 &&
        ffaFinishResult.newRating >= 250 &&
        ((prf_data.wpn_slots = 2),
        wpn_game.length > 0
          ? wpn_game.push(parseInt(wpn_game[0]) != 32 ? '32' : '17')
          : (wpn_game.push('17'), wpn_game.push('32')),
        (newLeagueData.newSlot = true))
      newLeagueData.newAch = true
      animEvents('gameEnd')
      this.splitHintTimer != null &&
        (clearTimeout(this.splitHintTimer), (this.splitHintTimer = null))
      StatAnalytics.send(StatAnalytics.GameFinish)
      countFPS.sendAnalytics()
      WND_player_info('close')
      WND_suicide('close')
      WND_suicide_inactive('close')
      gameChatInput.hide()
      mobileButtons.showControllers(false)
      setTimeout(function () {
        WND_die('open', ffaFinishResult)
      }, 2000)
    },
    updateRespawnState: function (respawnData) {
      respawnData[1] == 0
        ? (mobileButtons.showControllers(true),
          WND_arena_die('close'),
          sayComments == true &&
            gameChatInput.send(fraz_resp[random.getRandomInt(0, 30)]),
          isMobileApp && closeAllPopups())
        : setTimeout(function () {
            mobileButtons.showControllers(false)
            WND_player_info('close')
            WND_suicide_inactive('close')
            WND_arena_die('open', [respawnData[1], respawnData[2]])
          }, 1000)
    },
    updatePlayerAddMass: function (addMassData) {
      var addMassValue = addMassData[1]
      this.createEat({
        id_p: this.player.id,
        id_c: this.player.mainCell.id,
        value: addMassValue,
      })
    },
    setQuestStep: function (questStepIdx) {
      this.questWaiting = false
      var questStepNum = questStepIdx + 1
      $('#taskBar .currentStep').text(questStepNum)
      $('#taskBar').removeClass('taskComplete').attr('data-step', questStepNum)
      $('#taskBar .taskText .text').html(questSteps[questStepIdx][0][0])
      $('#taskBar .need').text(questSteps[questStepIdx][0][1])
      $('#taskBar .current').text(0)
      $('#taskBar .animation').css({
        'background-image':
          'url(/img/popups/tutorial/task' + questStepNum + '.gif)',
      })
      for (var questStepKey in this.food) {
        this.food[questStepKey].dead = true
        this.food[questStepKey].size *= 0.5
        this.food[questStepKey].setNewSize(0)
      }
      for (var questStepKey in this.stuff) {
        this.stuff[questStepKey].dead = true
        this.stuff[questStepKey].size *= 0.5
        this.stuff[questStepKey].setNewSize(0)
      }
      switch (questStepIdx) {
        case 0:
          $('#taskBar .progressBar').removeClass('off'),
            $('#taskBar').addClass('off')
          isMobileApp &&
            (mobileButtons.showWeapons(false), mobileButtons.showJump(false))
          setTimeout(function () {
            Hints.text('questStepSet', questStepIdx)
            $('#taskBar').removeClass('off')
            var questArrowData = [null, null, null]
            for (var questPlaceI = 0; questPlaceI < 30; questPlaceI++) {
              var questFoodPos = {
                  group: 0,
                  x: Math.round(Math.random() * game.roomHeight * 1.5),
                  y: Math.round(Math.random() * game.roomHeight),
                },
                questMyCell = game.players.p0.cells.c0
              questFoodPos.x > questMyCell.position[X] - questMyCell.size * 2 &&
                questFoodPos.x < questMyCell.position[X] + questMyCell.size * 2 &&
                questFoodPos.y > questMyCell.position[Y] - questMyCell.size * 2 &&
                questFoodPos.y < questMyCell.position[Y] + questMyCell.size * 2 &&
                (questFoodPos.x = questMyCell.position[X] + questMyCell.size * 2)
              var questFoodKey = 'f' + questPlaceI
              game.food[questFoodKey] = game.createFood(questFoodPos)
              game.foodTree.add(questFoodPos.x, questFoodPos.y, questFoodKey)
              game.food[questFoodKey].lastVisible = Date.now()
              game.food[questFoodKey].dead = false
            }
          }, 100)
          break
        case 1:
          Hints.text('questStepSet', questStepIdx),
            $('#taskBar .progressBar').addClass('off')
          isMobileApp &&
            (mobileButtons.showWeapons(false), mobileButtons.showJump(false))
          ;(this.playersInfo.p1 = {
            id: 0,
            prf: 0,
            nick: '',
            wpl: [2],
            removeTime: 0,
            mesh_nick: null,
            mesh_clan: null,
            mesh: newGlObject({
              skin: [1, 10, 30, 105, 146, 0, 0, 0, 0, 0, 0, 0, 0],
              createMesh: true,
            }),
            smileId: 1,
            smileTime: Date.now() + 1000,
            smileRemove: 0,
          }),
            (this.players.p1 = this.createPlayer()),
            (this.players.p1.cells.c0 = newGlSimpleObject({
              id: 'c0',
              size: massToRadius(100),
            })),
            (this.players.p1.cells.c0.mass =
              this.players.p0.cells.c0.mass * 0.55),
            this.players.p1.cells.c0.setNewSize(
              massToRadius(this.players.p1.cells.c0.mass)
            ),
            (this.players.p1.cells.c0.position = [
              this.players.p0.cells.c0.position[X] < this.roomWidth / 2
                ? this.roomWidth - 1000
                : 1000,
              800,
              0,
            ]),
            (this.players.p1.cells.c0.divideSpeed = 0),
            (this.players.p1.cells.c0.speed = 0),
            (this.players.p1.cells.c0.angle = 0),
            (this.players.p1.cells.c0.eat = {
              mass: 0,
              time: 0,
            }),
            (this.players.p1.cells.c0.timeToCollapse = Date.now()),
            (this.players.p1.cells.c0.dead = false),
            (this.players.p1.mainCell = this.players.p1.cells.c0),
            (this.players.p1.allowEat = false),
            setTimeout(function () {
              game.playersInfo.p1.mesh.position =
                game.players.p1.cells.c0.position
              game.playersInfo.p1.mesh.scale = game.players.p1.cells.c0.size
              game.playersInfo.p1.mesh.draw()
              game.players.p1.cells.c0.drawPosition[X] =
                game.playersInfo.p1.mesh.drawPosition[X]
              game.players.p1.cells.c0.drawPosition[Y] =
                game.playersInfo.p1.mesh.drawPosition[Y]
              game.players.p1.cells.c0.drawSize[X] =
                game.playersInfo.p1.mesh.drawSize[X]
              game.players.p1.cells.c0.drawSize[Y] =
                game.playersInfo.p1.mesh.drawSize[Y]
              Arrows.runTemplate([
                {
                  direction: 5,
                  y:
                    game.players.p1.cells.c0.drawPosition[Y] -
                    game.players.p1.cells.c0.drawSize[Y],
                  x:
                    game.players.p1.cells.c0.drawPosition[X] -
                    game.players.p1.cells.c0.drawSize[X],
                  time: 2,
                },
              ])
              game.players.p1.allowEat = true
            }, 500)
          break
        case 2:
          $('#taskBar .textProgress').addClass('off'),
            (this.playersInfo.p2 = {
              id: 0,
              prf: 0,
              nick: '',
              wpl: [2],
              removeTime: 0,
              mesh_nick: null,
              mesh_clan: null,
              mesh: newGlObject({
                skin: [53, 5, 45, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                createMesh: true,
              }),
              smileId: 3,
              smileTime: Date.now() + 1000,
              smileRemove: 0,
            }),
            (this.players.p2 = this.createPlayer()),
            (this.players.p2.cells.c0 = newGlSimpleObject({
              id: 'c0',
              size: massToRadius(100),
            })),
            (this.players.p2.cells.c0.mass = this.players.p0.cells.c0.mass),
            this.players.p2.cells.c0.setNewSize(
              massToRadius(this.players.p2.cells.c0.mass)
            ),
            (this.players.p2.cells.c0.position = [
              this.players.p0.cells.c0.position[X] < this.roomWidth / 2
                ? this.roomWidth - 1000
                : 1000,
              800,
              0,
            ]),
            (this.players.p2.cells.c0.divideSpeed = 0),
            (this.players.p2.cells.c0.speed = 0),
            (this.players.p2.cells.c0.angle = 0),
            (this.players.p2.cells.c0.eat = {
              mass: 0,
              time: 0,
            }),
            (this.players.p2.cells.c0.timeToCollapse = Date.now()),
            (this.players.p2.cells.c0.dead = false),
            (this.players.p2.mainCell = this.players.p2.cells.c0),
            (this.playerMana = 5),
            Elixir.init(this.playerMana, this.playersInfo.p0.elixirMax)
          !isMobileApp
            ? ($('#elixirBar').removeClass('off'),
              $('#myWeaponBar #slot1').removeClass('off'),
              $('#myWeaponBar #jump').addClass('off'),
              $('#myWeaponBar').removeClass('off'))
            : (mobileButtons.showWeapons(true), mobileButtons.showJump(false))
          break
        case 3:
          $('#taskBar .textProgress').addClass('off')
          typeof this.players.p2 != 'undefined' &&
            ((this.players.p2.cells.c0.dead = true),
            (this.players.p2.cells.c0.size *= 0.5),
            this.players.p2.cells.c0.setNewSize(0))
          this.players.p0.cells.c0.speed = 400
          this.players.p0.cells.c0.mass < 2500 &&
            ((this.players.p0.cells.c0.mass = 2500),
            this.players.p0.cells.c0.setNewSize(
              massToRadius(this.players.p0.cells.c0.mass)
            ))
          !isMobileApp
            ? ($('#elixirBar').addClass('off'),
              $('#myWeaponBar #slot1').addClass('off'),
              $('#myWeaponBar #jump').css({ left: '0' }),
              $('#myWeaponBar #jump').removeClass('off'),
              $('#myWeaponBar').removeClass('off'))
            : (mobileButtons.showWeapons(false), mobileButtons.showJump(true))
          ;(this.playerMana = 0), (this.questAllowSplit = true)
          break
      }
      StatAnalytics.sendTimeEvent('Quest_' + (questStepIdx + 1) + '_done')
    },
    incQuestProgress: function (questProgressStep) {
      var questCurrentStep = parseInt($('#taskBar .currentStep').text())
      if (questCurrentStep != questProgressStep + 1) {
        return
      }
      var questCurrentVal = parseInt($('#taskBar .current').text()),
        questNeedVal = parseInt($('#taskBar .need').text())
      questCurrentVal++
      if (!$('#taskBar .textProgress').hasClass('off')) {
        var questProgressPct = Math.min(100, Math.round((questCurrentVal / questNeedVal) * 100))
        $('#taskBar .progress').css({ width: questProgressPct + '%' })
      }
      $('#taskBar .current').text(questCurrentVal)
      if (questCurrentVal >= questNeedVal) {
        $('#taskBar').addClass('taskComplete')
        if (questCurrentStep < questSteps.length && !this.questWaiting) {
          this.questWaiting = true
          StatAnalytics.send('Quest_' + (questProgressStep + 1) + '_done')
          DO_quest_step(false)
          Hints.text('questStepDone')
          playSound('sfx', 'step_finished')
          questCurrentStep == 3 &&
            StatAnalytics.send(StatAnalytics.QuestElixir, {
              count: this.player.elixir,
            })
          setTimeout(function () {
            game.setQuestStep(questCurrentStep++)
          }, 2000)
        } else {
          questCurrentStep >= questSteps.length &&
            !this.questWaiting &&
            ((this.questWaiting = true),
            StatAnalytics.send('Quest_' + (questProgressStep + 1) + '_done'),
            DO_quest_step(false),
            Hints.text('questStepDone'),
            playSound('sfx', 'step_finished'),
            setTimeout(function () {
              $('#taskBar').addClass('off')
            }, 2000),
            setTimeout(function () {
              game.stop(false)
              WND_quest_done('open')
            }, 2000))
        }
      }
    },
    addQuestElixir: function () {
      if (game.state != room_states.run || !game.questMode) {
        return
      }
      if (parseInt($('#taskBar .currentStep').text()) != 3) {
        return
      }
      if (this.playerMana >= 5) {
        setTimeout(function () {
          game.addQuestElixir()
        }, 2500)
      } else {
        var elixirPos = {
            group: 0,
            x: Math.round(Math.random() * this.roomHeight * 1.5),
            y: Math.round(Math.random() * this.roomHeight),
            type: stuff_types.elixir,
          },
          elixirMyCell = this.players.p0.cells.c0
        elixirPos.x > elixirMyCell.position[X] - elixirMyCell.size * 2 &&
          elixirPos.x < elixirMyCell.position[X] + elixirMyCell.size * 2 &&
          elixirPos.y > elixirMyCell.position[Y] - elixirMyCell.size * 2 &&
          elixirPos.y < elixirMyCell.position[Y] + elixirMyCell.size * 2 &&
          (elixirPos.x =
            elixirMyCell.position[X] < this.roomWidth / 2
              ? elixirPos.x + elixirMyCell.size * 2
              : elixirPos.x - elixirMyCell.size * 2)
        if (typeof elixirIndex == 'undefined') {
          elixirIndex = 0
        }
        elixirIndex++
        var elixirKey = 'f' + elixirIndex
        this.stuff[elixirKey] = this.createStuff(elixirPos)
        this.stuff[elixirKey].lastVisible = Date.now()
        this.stuff[elixirKey].dead = false
      }
    },
    movePlayer: function (movePlayer) {
      var moveNow = Date.now(),
        moveDelta = (moveNow - movePlayer.lastUpdate) * 0.001
      movePlayer.lastUpdate = moveNow
      var moveSumX = 0,
        moveSumY = 0
      for (var moveCellKey in movePlayer.cells) {
        var moveCell = movePlayer.cells[moveCellKey],
          movePrevX = moveCell.position[X],
          movePrevY = moveCell.position[Y],
          moveDirection = {
            x:
              movePlayer.position[X] -
              moveCell.position[X] +
              movePlayer.target[X],
            y:
              movePlayer.position[Y] -
              moveCell.position[Y] +
              movePlayer.target[Y],
          }
        moveCell.divideSpeed == 0 &&
          (moveCell.angle = Math.atan2(moveDirection.y, moveDirection.x))
        var moveTotalSpeed = moveCell.speed + moveCell.divideSpeed,
          moveDX = moveTotalSpeed * moveDelta * Math.cos(moveCell.angle),
          moveDY = moveTotalSpeed * moveDelta * Math.sin(moveCell.angle)
        if (moveCell.divideSpeed == 0) {
          var moveDistToTarget = Math.sqrt(
            moveDirection.y * moveDirection.y + moveDirection.x * moveDirection.x
          )
          moveDistToTarget < 50 + moveCell.size &&
            ((moveDX *= moveDistToTarget / (50 + moveCell.size)),
            (moveDY *= moveDistToTarget / (50 + moveCell.size)))
        }
        moveCell.position[X] += moveDX
        moveCell.position[Y] += moveDY
        moveCell.divideSpeed > 0 &&
          ((moveCell.divideSpeed -= 2000 * moveDelta),
          moveCell.divideSpeed < 0 && (moveCell.divideSpeed = 0))
        for (var moveOtherKey in movePlayer.cells) {
          if (moveOtherKey != moveCellKey) {
            var moveOtherCell = movePlayer.cells[moveOtherKey],
              moveCellDist = distanceToTarget(moveCell, moveOtherCell),
              moveCombinedSize = moveCell.size + moveOtherCell.size
            if (moveCellDist < moveCombinedSize && moveOtherCell.divideSpeed <= 0) {
              if (moveOtherCell.timeToCollapse > moveNow) {
                var movePushAngle =
                    moveCell.divideSpeed == 0
                      ? Math.atan2(
                          moveOtherCell.position[Y] - movePrevY,
                          moveOtherCell.position[X] - movePrevX
                        )
                      : Math.atan2(
                          moveOtherCell.position[Y] - moveCell.position[Y],
                          moveOtherCell.position[X] - moveCell.position[X]
                        ),
                  moveMassRatio = Math.sqrt(moveOtherCell.mass / moveCell.mass) / 2,
                  movePushDist = (moveCombinedSize - moveCellDist) * moveMassRatio
                movePushDist = Math.min(movePushDist, 40)
                moveCell.position[X] -= Math.cos(movePushAngle) * movePushDist
                moveCell.position[Y] -= Math.sin(movePushAngle) * movePushDist
              } else {
                moveCell.mass >= moveOtherCell.mass &&
                  moveCellDist - moveCell.size < moveOtherCell.size * 0.7 &&
                  ((moveCell.mass += moveOtherCell.mass),
                  moveCell.setNewSize(massToRadius(moveCell.mass)),
                  (movePlayer.cells[moveOtherKey] = null),
                  delete movePlayer.cells[moveOtherKey],
                  moveCellKey != 'c0' &&
                    ((movePlayer.cells.c0 = movePlayer.cells.c1),
                    (movePlayer.cells.c1 = null),
                    delete movePlayer.cells.c1))
              }
            }
          }
        }
        var movePushMargin = moveCell.size / 3
        moveCell.position[X] > this.roomWidth - movePushMargin &&
          (moveCell.position[X] = this.roomWidth - movePushMargin)
        moveCell.position[Y] > this.roomHeight - movePushMargin &&
          (moveCell.position[Y] = this.roomHeight - movePushMargin)
        moveCell.position[X] < movePushMargin && (moveCell.position[X] = movePushMargin)
        moveCell.position[Y] < movePushMargin && (moveCell.position[Y] = movePushMargin)
        moveSumX += moveCell.position[X]
        moveSumY += moveCell.position[Y]
      }
      var moveCellCount = 0
      for (var moveCellKey in movePlayer.cells) moveCellCount++
      movePlayer.position[X] = moveSumX / moveCellCount
      movePlayer.position[Y] = moveSumY / moveCellCount
    },
    splitQuestPlayer: function () {
      if (!this.questAllowSplit) {
        return
      }
      var splitCellCount = 0
      for (var splitCellI in this.player.cells) splitCellCount++
      if (splitCellCount > 1) {
        return
      }
      for (var splitCellKey in this.player.cells) {
        var splitCell = this.player.cells[splitCellKey]
        splitCell.mass = splitCell.mass / 2
        splitCell.setNewSize(massToRadius(splitCell.mass))
        var splitDirX =
            this.player.position[X] -
            splitCell.position[X] +
            this.player.target[X],
          splitDirY =
            this.player.position[Y] -
            splitCell.position[Y] +
            this.player.target[Y],
          splitAngle = Math.atan2(splitDirY, splitDirX)
        this.players.p0.cells.c1 = newGlSimpleObject({
          id: 'c0',
          size: splitCell.newSize,
        })
        this.players.p0.cells.c1.position = [
          splitCell.position[X],
          splitCell.position[Y],
          0,
        ]
        this.players.p0.cells.c1.divideSpeed = 4000
        this.players.p0.cells.c1.speed = 800
        this.players.p0.cells.c1.mass = splitCell.mass
        this.players.p0.cells.c1.angle = splitAngle
        this.players.p0.cells.c1.timeToCollapse = Date.now() + 7000
        this.players.p0.cells.c0.timeToCollapse = Date.now() + 7000
      }
      this.incQuestProgress(3)
    },
    useQuestWeapon: function (useQuestIsMobile) {
      if (parseInt($('#taskBar .currentStep').html()) != 3) {
        return
      }
      if (this.playerMana == 0) {
        Hints.text('noElixir')
        return
      }
      this.playerMana--
      Elixir.changeTo(this.playerMana)
      WeaponBar.useWeapon(2, 0)
      StatAnalytics.send(StatAnalytics.QuestStep3, useQuestIsMobile ? 1 : 0)
      var useQuestWeaponData = {
          owner: 'p0',
          w_id: 2,
          x: 0,
          y: 0,
          liveTime: 1000,
        },
        useQuestWeaponDef = this.getWeaponById(useQuestWeaponData.w_id)
      this.weapons.w1 = this.createWeapon(useQuestWeaponData)
      this.weapons.w1.owner = this.players.p0
      typeof this.weapons.w1.owner != 'undefined' &&
        (useQuestWeaponDef.action_use_for_owner ||
          useQuestWeaponDef.action_type == weapon_action_types.radial) &&
          (this.players.p0.weapons.w1 = 'w1')
      this.weapons.w1.lastVisible = Date.now() + useQuestWeaponData.liveTime
      this.weapons.w1.dead = false
      this.weapons.w1.weapon.move_sound != '' &&
        playSound('sfx', this.weapons.w1.weapon.move_sound)
    },
    roomManager: function (roomCmd, roomParams) {
      switch (roomCmd) {
        case 'init':
          ;(this.roomMgrTick = null),
            (this.roomState = roomParams[0]),
            (this.stateTimer = roomParams[1]),
            (this.roomCondition = roomParams[2])
          if (
            this.roomMode == room_modes.arena ||
            game.roomMode == room_modes.boss
          ) {
            $('.gameInfoBlock').removeClass('off')
            if (this.roomState == room_states.init) {
              downCNT = 3
              exitProcess = true
              exitRequest = false
              personalKills = 0
              this.roomMode == room_modes.arena
                ? $('#onGameExit').addClass('off')
                : $('#onGameExit').removeClass('off')
              $('#myPersonalKills li .killsQty').html(personalKills)
              $('#gameBody').addClass('waitingForPlayers')
              isMobileApp
                ? (mobileButtons.showBoostersBtn(true),
                  mobileButtons.showJump(false))
                : ($('#buyBoostersButton').css({
                    right: '-50px',
                    top: '-25px',
                    transform: 'scale(0.7, 0.7)',
                    opacity: '.7',
                  }),
                  $('#buyBoostersButton').removeClass('off'))
            } else {
              this.roomState == room_states.run &&
                ($('#gameRules').addClass('off'),
                $('#defBody').addClass('arenaButton'),
                isMobileApp
                  ? (mobileButtons.showBoostersBtn(false),
                    mobileButtons.showControllers(true),
                    mobileButtons.showJump(true))
                  : $('#buyBoostersButton').addClass('off'),
                WND_pregame_boosters('close'))
            }
            this.roomMgrTick = 0
          }
          game.roomMode == room_modes.boss &&
            this.stateTimer > 0 &&
            $('#teamLeaderBoard div.miniTimer').countdown(
              this.stateTimer * 1000,
              function (timerEvent1) {}
            )
          break
        case 'restate':
          this.roomMgrTick = null
          if (this.roomState != roomParams[0]) {
            this.roomState = roomParams[0]
            if (this.roomState == room_states.run) {
              printHintOnScreen('ПОЕХАЛИ!')
              $('div.hintOnScreen').css({ 'z-index': '2' })
              $('div.hintOnScreen p.text').css({
                color: '#33ff33',
                'text-shadow':
                  '2px 0 0 #007700, -2px 0 0 #007700, 0 2px 0 #007700, 0 -2px 0 #007700, 2px 2px #007700, -2px -2px 0 #007700, 2px -2px 0 #007700, -2px 2px 0 #007700',
                'font-size': '72px',
              })
              setTimeout(exitConfirm, 500)
              $('#onGameExit').removeClass('off')
              this.roomMode == room_modes.boss &&
                $('#bossBoosters').addClass('off')
              $('.gameInfoBlock').removeClass('lastSeconds')
              $('#gameBody').removeClass('waitingForPlayers')
              $('#gameRules').addClass('off')
              if (modeInforms == false) {
                Boosters.show()
              }
              isMobileApp
                ? (mobileButtons.showBoostersBtn(false),
                  mobileButtons.showControllers(true),
                  mobileButtons.showJump(true))
                : $('#buyBoostersButton').addClass('off')
              WND_pregame_boosters('close')
            }
          }
          ;(this.stateTimer = roomParams[1]), (this.roomCondition = roomParams[2])
          if (
            this.roomMode == room_modes.arena ||
            game.roomMode == room_modes.boss
          ) {
            this.roomMgrTick = 0
          }
          game.roomMode == room_modes.boss &&
            this.stateTimer > 0 &&
            this.roomState == room_states.run &&
            $('#teamLeaderBoard div.miniTimer').countdown(
              this.stateTimer * 1000,
              function (timerEvent2) {}
            )
          break
        case 'update':
          if (this.roomMgrTick != null) {
            this.roomMgrTick += roomParams
            var roomUpdateType = 0
            this.stateTimer >= 0
              ? ((this.stateTimer -= roomParams),
                this.stateTimer <= 0 &&
                  ((this.stateTimer = 0), (roomUpdateType = 1)))
              : (roomUpdateType = 2)
            if (roomUpdateType) {
              this.roomMgrTick = null
            } else {
              this.roomMgrTick >= 1 && ((this.roomMgrTick = 0), (roomUpdateType = 3))
            }
            if (roomUpdateType > 0) {
              if (this.roomState == room_states.init) {
                this.stateTimer >= 0 && this.roomCondition > 0
                  ? raitingFall == false
                    ? (playSound('sfx', 'countdown'), toBattle())
                    : fallRaiting()
                  : $('.gameInfoBlock').html(
                      'Ожидание игроков, игра скоро начнётся'
                    )
              } else {
                this.roomState == room_states.run
                  ? roomUpdateType != 2 &&
                    (!$('.gameInfoBlock div.timerContainer').length &&
                      $('.gameInfoBlock').html(
                        '<div class="timer timerContainer" style="margin: 0 auto;"><span class="timerIco"><img src="/img/icons/timer.png" alt=""></span> <span id="text" class="' +
                          (this.stateTimer < 5 ? 'lastSeconds' : '') +
                          '">' +
                          secToTime(Math.round(this.stateTimer)) +
                          '</span></div>'
                      ),
                    $('.gameInfoBlock #text').html(
                      secToTime(Math.round(this.stateTimer))
                    ),
                    this.stateTimer < 10 &&
                      (playSound('sfx', 'countdown'),
                      $('.gameInfoBlock').addClass('lastSeconds')))
                  : ($('.gameInfoBlock').addClass('off'),
                    $('.gameInfoBlock').removeClass('lastSeconds'))
              }
            }
          }
          break
      }
    },
    update: function () {
      this.updateStep++
      if (this.updateStep > 20) {
        this.updateStep = 0
      }
      var updateNow = Date.now(),
        updateDelta = (updateNow - this.lastUpdate) * 0.001,
        updateClampedDelta = Math.min(0.25, updateDelta)
      this.lastUpdate = updateNow
      if (updateDelta > 0) {
        this.roomManager('update', updateDelta)
      }
      camera.update()
      game.roomMode == room_modes.ffa &&
        autoFarm != 0 &&
          ((gameTarget.x =
            Math.round(cordFarmX[varsFarm] - game.player.position[0]) /
            modifFarm),
          (gameTarget.y =
            Math.round(cordFarmY[varsFarm] - game.player.position[1]) /
            modifFarm))
      if (game.roomMode == room_modes.boss) {
        for (idx in this.playersInfo) {
          typeof this.playersInfo[idx] != 'undefined' &&
            this.playersInfo[idx].isBoss == true &&
              ((cordBossX =
                this.playersInfo[idx].mesh.position[0] -
                this.playersInfo[this.player.id].mesh.position[0]),
              (cordBossY =
                this.playersInfo[idx].mesh.position[1] -
                this.playersInfo[this.player.id].mesh.position[1]))
        }
      }
      game.state == 1 &&
        exitProcess == true &&
        (game.roomMode == room_modes.boss &&
          $('#bossBoosters span').html(getBoostersCount(1)),
        $('#gameRules').css({ background: 'none' }),
        $('#gameRules h2.teamBelt').css({ opacity: '0' }),
        $('#gameRules .textContainer').css({ opacity: '0.8' }),
        $('#gameRules .textContainer p').css({ opacity: '0' }))
      game.state == 1 &&
        ($('ul.infoBoard li').css({ padding: '10px' }),
        $('body.fullScreen ul.infoBoard li').css({ 'font-size': 100 + '%' }))
      if (typeof wpn_game[0] != 'undefined') {
        $('#durabilityOne').html(wpn_data[wpn_game[0]][3])
        if (wpn_data[wpn_game[0]][3] < 1) {
          $('#durabilityOne').css({ color: '#770000' })
        } else {
          if (wpn_data[wpn_game[0]][3] > 1 && wpn_data[wpn_game[0]][3] <= 20) {
            $('#durabilityOne').css({ color: '#ee3300' })
          } else {
            if (
              wpn_data[wpn_game[0]][3] > 20 &&
              wpn_data[wpn_game[0]][3] <= 40
            ) {
              $('#durabilityOne').css({ color: '#ddaa00' })
            } else {
              if (
                wpn_data[wpn_game[0]][3] > 40 &&
                wpn_data[wpn_game[0]][3] <= 60
              ) {
                $('#durabilityOne').css({ color: '#cccc00' })
              } else {
                if (
                  wpn_data[wpn_game[0]][3] > 60 &&
                  wpn_data[wpn_game[0]][3] <= 80
                ) {
                  $('#durabilityOne').css({ color: '#aadd00' })
                } else {
                  wpn_data[wpn_game[0]][3] > 80 &&
                    $('#durabilityOne').css({ color: '#33ee00' })
                }
              }
            }
          }
        }
      }
      if (typeof wpn_game[1] != 'undefined') {
        $('#durabilityTwo').html(wpn_data[wpn_game[1]][3])
        if (wpn_data[wpn_game[1]][3] < 1) {
          $('#durabilityTwo').css({ color: '#770000' })
        } else {
          if (wpn_data[wpn_game[1]][3] > 1 && wpn_data[wpn_game[1]][3] <= 20) {
            $('#durabilityTwo').css({ color: '#ee3300' })
          } else {
            if (
              wpn_data[wpn_game[1]][3] > 20 &&
              wpn_data[wpn_game[1]][3] <= 40
            ) {
              $('#durabilityTwo').css({ color: '#ddaa00' })
            } else {
              if (
                wpn_data[wpn_game[1]][3] > 40 &&
                wpn_data[wpn_game[1]][3] <= 60
              ) {
                $('#durabilityTwo').css({ color: '#cccc00' })
              } else {
                if (
                  wpn_data[wpn_game[1]][3] > 60 &&
                  wpn_data[wpn_game[1]][3] <= 80
                ) {
                  $('#durabilityTwo').css({ color: '#aadd00' })
                } else {
                  wpn_data[wpn_game[1]][3] > 80 &&
                    $('#durabilityTwo').css({ color: '#33ee00' })
                }
              }
            }
          }
        }
      }
      if (typeof arm_data != 'undefined' && my_skin[10] > 0) {
        $('#durabilityArm').html(arm_data[my_skin[10]][3])
        if (arm_data[my_skin[10]][3] < 1) {
          $('#durabilityArm').css({ color: '#770000' })
        } else {
          if (arm_data[my_skin[10]][3] > 1 && arm_data[my_skin[10]][3] <= 20) {
            $('#durabilityArm').css({ color: '#ee3300' })
          } else {
            if (
              arm_data[my_skin[10]][3] > 20 &&
              arm_data[my_skin[10]][3] <= 40
            ) {
              $('#durabilityArm').css({ color: '#ddaa00' })
            } else {
              if (
                arm_data[my_skin[10]][3] > 40 &&
                arm_data[my_skin[10]][3] <= 60
              ) {
                $('#durabilityArm').css({ color: '#cccc00' })
              } else {
                if (
                  arm_data[my_skin[10]][3] > 60 &&
                  arm_data[my_skin[10]][3] <= 80
                ) {
                  $('#durabilityArm').css({ color: '#aadd00' })
                } else {
                  arm_data[my_skin[10]][3] > 80 &&
                    $('#durabilityArm').css({ color: '#33ee00' })
                }
              }
            }
          }
        }
      }
      $('#slot1 img').css({
        width: '80px',
        height: '80px',
        top: '-8px',
      })
      $('#slot2 img').css({
        width: '80px',
        height: '80px',
        top: '-8px',
      })
      this.damage_ring.update()
      this.eatInJump.update()
      if (this.questMode) {
        this.movePlayer(this.player)
        for (var updatePKey in this.players) {
          var updatePlayer = this.players[updatePKey]
          if (
            updatePlayer != this.player &&
            typeof this.playersInfo[updatePKey].smileTime != 'undefined' &&
            this.playersInfo[updatePKey].smileTime > 0 &&
            this.playersInfo[updatePKey].smileTime <= updateNow
          ) {
            updatePlayer.emotion_id = this.playersInfo[updatePKey].smileId
            this.playersInfo[updatePKey].smileTime = 0
            this.playersInfo[updatePKey].smileRemove = updateNow + 2000
          } else {
            updatePlayer != this.player &&
              typeof this.playersInfo[updatePKey].smileRemove != 'undefined' &&
              this.playersInfo[updatePKey].smileRemove > 0 &&
              this.playersInfo[updatePKey].smileRemove <= updateNow &&
              (updatePlayer.emotion_id = 0)
          }
          for (var updateCellKey in updatePlayer.cells) {
            var updateMyCell = updatePlayer.cells[updateCellKey]
            updateMyCell.newSize == 0 &&
              updateMyCell.size < 20 &&
              (updatePlayer == this.player
                ? ((updateMyCell.size = 0),
                  updateMyCell.setNewSize(massToRadius(updateMyCell.mass)),
                  (updateMyCell.target = null),
                  (updateMyCell.position = [0, 800, 0]))
                : ((this.players[updatePKey] = null),
                  delete this.players[updatePKey]))
          }
        }
        for (var updatePKey in this.players) {
          var updatePlayer = this.players[updatePKey]
          if (
            updatePlayer != this.player &&
            typeof updatePlayer.allowEat != 'undefined' &&
            updatePlayer.allowEat
          ) {
            var updateCell = this.players[updatePKey].cells.c0
            if (updateCell.newSize > 0) {
              for (var updateCellKey in this.player.cells) {
                var updateMyCell = this.player.cells[updateCellKey],
                  updateDX = updateCell.position[X] - updateMyCell.position[X],
                  updateDY = updateCell.position[Y] - updateMyCell.position[Y],
                  dropData = Math.sqrt(
                    updateDX * updateDX + updateDY * updateDY
                  )
                if (dropData < (updateCell.size + updateMyCell.size) * 0.8) {
                  if (updateCell.newSize < updateMyCell.newSize * 0.9) {
                    updateMyCell.mass += updateCell.mass
                    updateMyCell.setNewSize(massToRadius(updateMyCell.mass))
                    updateCell.setNewSize(0)
                    updateCell.target = updateMyCell.position
                    playSound('sfx', 'ball_eat')
                    this.incQuestProgress(1)
                    this.createEat({
                      id_p: 'p0',
                      id_c: 'c0',
                      value: updateCell.mass,
                    })
                  } else {
                    updateCell.newSize * 0.9 > updateMyCell.newSize &&
                      (updateMyCell.setNewSize(0),
                      (updateMyCell.target = updateCell.position))
                  }
                }
              }
            }
          }
        }
        camera.target = null
        camera.setTargetPosition([
          this.player.position[X],
          this.player.position[Y],
          3,
        ])
      }
      for (var updatePKey in this.players) {
        if (
          this.players[updatePKey].dead &&
          Object.keys(this.players[updatePKey].cells).length == 0
        ) {
          this.players[updatePKey] = null
          delete this.players[updatePKey]
        } else {
          if (
            typeof this.playersInfo[updatePKey] == 'undefined' ||
            typeof this.playersInfo[updatePKey].mesh == 'undefined'
          ) {
            continue
          }
          if (
            this.players[updatePKey].lastHideUpdate >= updateNow &&
            !this.playersInfo[updatePKey].mesh.allowDistord
          ) {
            if (this.playersInfo[updatePKey].mesh.alpha > 0.8) {
              this.playersInfo[updatePKey].mesh.newAlpha = 0.2
            } else {
              this.playersInfo[updatePKey].mesh.alpha < 0.3 &&
                (this.playersInfo[updatePKey].mesh.newAlpha = 1)
            }
          } else {
            this.playersInfo[updatePKey].mesh.newAlpha < 1 &&
              this.players[updatePKey].lastHideUpdate < updateNow &&
              (this.playersInfo[updatePKey].mesh.newAlpha < 1 &&
                this.playersInfo[updatePKey].mesh.allowDistord &&
                playSound(
                  'sfx',
                  'invisible_finish',
                  calcSoundPan(this.players[updatePKey].mainCell.drawPosition)
                ),
              (this.playersInfo[updatePKey].mesh.newAlpha = 1))
          }
          this.playersInfo[updatePKey].mesh.update()
          for (var updateCellKey in this.players[updatePKey].cells) {
            if (
              this.players[updatePKey].cells[updateCellKey].dead &&
              this.players[updatePKey].cells[updateCellKey].size < 1
            ) {
              this.players[updatePKey].cells[updateCellKey] = null
              delete this.players[updatePKey].cells[updateCellKey]
            } else {
              var updateCell = this.players[updatePKey].cells[updateCellKey]
              updateCell.update()
              if (this.roomState == room_states.run) {
                if (
                  (!this.questMode && this.updateStep == 5) ||
                  (this.questMode && this.players[updatePKey] == this.player)
                ) {
                  var updateFoodTree = this.foodTree.get(
                    updateCell.position[X] - updateCell.size,
                    updateCell.position[Y] - updateCell.size,
                    updateCell.position[X] + updateCell.size,
                    updateCell.position[Y] + updateCell.size
                  )
                  for (
                    var updateI = 0;
                    updateI < updateFoodTree.length;
                    updateI++
                  ) {
                    typeof this.food[updateFoodTree[updateI]] != 'undefined' &&
                      typeof this.food[updateFoodTree[updateI]].moveTarget ==
                        'undefined' &&
                      this.food[updateFoodTree[updateI]].parentId !=
                        updateCell.id &&
                      canEatFood(updateCell, this.food[updateFoodTree[updateI]]) &&
                      !this.food[updateFoodTree[updateI]].dead &&
                      (this.foodTree.remove(
                        this.food[updateFoodTree[updateI]].position[X],
                        this.food[updateFoodTree[updateI]].position[Y],
                        updateFoodTree[updateI]
                      ),
                      this.food[updateFoodTree[updateI]].setNewSize(0),
                      (this.food[updateFoodTree[updateI]].size /= 2),
                      (this.food[updateFoodTree[updateI]].target =
                        updateCell.position),
                      (this.food[updateFoodTree[updateI]].dead = true),
                      !this.loading &&
                        this.players[updatePKey] == this.player &&
                        (updateNow - this.players[updatePKey].foodSoundTime >=
                          300 &&
                          (playSound(
                            'sfx',
                            this.food[updateFoodTree[updateI]].group < 3
                              ? 'food_eat'
                              : 'mass_eat',
                            calcSoundPan(
                              this.food[updateFoodTree[updateI]].drawPosition
                            )
                          ),
                          (this.players[updatePKey].foodSoundTime = updateNow)),
                        this.questMode &&
                          this.food[updateFoodTree[updateI]].group < 3 &&
                          ((this.players[updatePKey].cells[updateCellKey].mass +=
                            this.food[updateFoodTree[updateI]].mass),
                          this.players[updatePKey].cells[updateCellKey].setNewSize(
                            massToRadius(
                              this.players[updatePKey].cells[updateCellKey].mass
                            )
                          ),
                          this.incQuestProgress(0)),
                        (this.food[updateFoodTree[updateI]].group > 2 ||
                          this.players[updatePKey].cells[updateCellKey].newSize >
                            this.players[updatePKey].cells[updateCellKey].sizeAnim
                              .startSize) &&
                          this.createEat({
                            id_p: updatePKey,
                            id_c: updateCellKey,
                            value:
                              this.food[updateFoodTree[updateI]].mass *
                                this.playerBufs.food_mass_koef +
                              this.playerBufs.food_mass,
                          })))
                  }
                }
                for (var updateStuffKey in this.stuff) {
                  if (
                    typeof this.stuff[updateStuffKey].moveTarget == 'undefined' &&
                    canEatFood(updateCell, this.stuff[updateStuffKey]) &&
                    !this.stuff[updateStuffKey].dead
                  ) {
                    this.stuff[updateStuffKey].setNewSize(0)
                    this.stuff[updateStuffKey].size *= 0.4
                    this.stuff[updateStuffKey].target = updateCell.position
                    this.stuff[updateStuffKey].dead = true
                    if (
                      !this.loading &&
                      this.players[updatePKey] == this.player
                    ) {
                      switch (this.stuff[updateStuffKey].stuffType) {
                        case stuff_types.coin:
                          if (!this.playerLimits.coins) {
                            playSound(
                              'sfx',
                              'take_coin',
                              calcSoundPan(this.stuff[updateStuffKey].drawPosition)
                            )
                            animEvents('coinCollect', {
                              x: updateCell.drawPosition[X],
                              y: updateCell.drawPosition[Y],
                              radius: updateCell.drawSize[Y],
                            })
                          } else {
                            this.limitHints.coins.count > 0 &&
                              updateNow - this.limitHints.coins.lastTime >=
                                5000 &&
                              (Hints.text('coinsLimit'),
                              this.limitHints.coins.count--,
                              (this.limitHints.coins.lastTime = updateNow))
                          }
                          break
                        case stuff_types.ruby:
                          if (!this.playerLimits.ruby) {
                            playSound(
                              'sfx',
                              'crystals_buy',
                              calcSoundPan(this.stuff[updateStuffKey].drawPosition)
                            )
                            animEvents('rubyCollect', {
                              x: updateCell.drawPosition[X],
                              y: updateCell.drawPosition[Y],
                              radius: updateCell.drawSize[Y],
                            })
                          } else {
                            this.limitHints.ruby.count > 0 &&
                              updateNow - this.limitHints.ruby.lastTime >=
                                5000 &&
                              (Hints.text('rubyLimit'),
                              this.limitHints.ruby.count--,
                              (this.limitHints.ruby.lastTime = updateNow))
                          }
                          break
                        case stuff_types.elixir:
                          this.questMode &&
                            !this.loading &&
                            this.players[updatePKey] == this.player &&
                            (this.playerMana++,
                            this.player.elixir++,
                            this.playerMana > this.playersInfo.p0.elixirMax
                              ? (this.playerMana =
                                  this.playersInfo.p0.elixirMax)
                              : (Elixir.changeTo(this.playerMana),
                                playSound(
                                  'sfx',
                                  'take_elixir',
                                  calcSoundPan(
                                    this.stuff[updateStuffKey].drawPosition
                                  )
                                )),
                            WeaponBar.updateElixirStates(this.playerMana),
                            setTimeout(function () {
                              game.addQuestElixir()
                            }, 5000))
                          break
                        case stuff_types.std_key:
                          if (!this.playerLimits.std_keys) {
                            animEvents('keyCollect', {
                              x: updateCell.drawPosition[X],
                              y: updateCell.drawPosition[Y],
                              radius: updateCell.drawSize[Y],
                            })
                            playSound(
                              'sfx',
                              'take_std_key',
                              calcSoundPan(this.stuff[updateStuffKey].drawPosition)
                            )
                          } else {
                            this.limitHints.std_keys.count > 0 &&
                              updateNow - this.limitHints.std_keys.lastTime >=
                                5000 &&
                              (Hints.text('stdKeysLimit'),
                              this.limitHints.std_keys.count--,
                              (this.limitHints.std_keys.lastTime = updateNow))
                          }
                          break
                      }
                    }
                  }
                }
              }
              updateCell.foodEatDistance = 0
            }
          }
          if (
            this.players[updatePKey].emotion_id > 0 &&
            this.players[updatePKey].emotion == null
          ) {
            this.players[updatePKey].emotion = this.createEmotion(
              this.players[updatePKey].emotion_id,
              updatePKey
            )
          } else {
            if (
              this.players[updatePKey].emotion_id > 0 &&
              this.players[updatePKey].emotion != null &&
              this.players[updatePKey].emotion_id !=
                this.players[updatePKey].emotion.id
            ) {
              this.players[updatePKey].emotion = null
              this.players[updatePKey].emotion = this.createEmotion(
                this.players[updatePKey].emotion_id,
                updatePKey
              )
            } else {
              this.players[updatePKey].emotion != null &&
                (this.players[updatePKey].emotion_id == 0 ||
                  this.players[updatePKey].emotion.time < updateNow) &&
                ((this.players[updatePKey].emotion_id = 0),
                (this.players[updatePKey].emotion = null))
            }
          }
          this.players[updatePKey].emotion != null &&
            this.players[updatePKey].emotion.mesh.update()
        }
      }
      for (var updateWeaponKey in this.aWeapons) {
        this.aWeapons[updateWeaponKey].dead
          ? (this.aWeapons[updateWeaponKey].mesh.freeBuffers(),
            (this.aWeapons[updateWeaponKey] = {}),
            (this.aWeapons[updateWeaponKey] = null),
            delete this.aWeapons[updateWeaponKey])
          : (this.aWeapons[updateWeaponKey].mesh.update(),
            this.aWeapons[updateWeaponKey].timer.update(),
            (this.aWeapons[updateWeaponKey].dead =
              this.aWeapons[updateWeaponKey].timer.dead))
      }
      for (updateWeaponKey in this.rpWeapons) {
        typeof this.rpWeapons[updateWeaponKey].mesh != 'undefined' &&
          this.rpWeapons[updateWeaponKey].lastVisible < updateNow &&
          (this.rpWeapons[updateWeaponKey].mesh != null &&
            (this.rpWeapons[updateWeaponKey].mesh.freeBuffers(),
            (this.rpWeapons[updateWeaponKey] = {}),
            (this.rpWeapons[updateWeaponKey] = null)),
          delete this.rpWeapons[updateWeaponKey])
      }
      for (var updateWeaponKey in this.weapons) {
        if (this.weapons[updateWeaponKey].lastVisible < updateNow) {
          if (
            !this.weapons[updateWeaponKey].weapon.action_holded &&
            this.weapons[updateWeaponKey].weapon.collision_effect_id > 0
          ) {
            var updateCreateEffect = true,
              updateCell = null,
              updateEffectId = this.weapons[updateWeaponKey].weapon.collision_effect_id
            for (var updatePKey in this.players) {
              for (var updateCellKey in this.players[updatePKey].cells) {
                var updateCheckRadius = distanceToTarget(
                  this.weapons[updateWeaponKey].mesh,
                  this.players[updatePKey].cells[updateCellKey]
                )
                if (
                  updateCheckRadius <
                  this.players[updatePKey].cells[updateCellKey].size +
                    this.weapons[updateWeaponKey].mesh.size
                ) {
                  updateCell = this.players[updatePKey].cells[updateCellKey]
                  break
                }
              }
            }
            var updateWeaponAngle = this.weapons[updateWeaponKey].mesh.angle[Z]
            if (updateCell == null) {
              this.weapons[updateWeaponKey].weapon.miss_effect_id > 0
                ? (updateEffectId = this.weapons[updateWeaponKey].weapon.miss_effect_id)
                : (updateCreateEffect = false)
            } else {
              !this.weapons[updateWeaponKey].weapon.collision_effect_hold &&
                ((updateEffectId == 14 || updateEffectId == 15 || updateEffectId == 16) &&
                  (updateWeaponAngle += Math.PI / 2),
                (updateCell = null))
            }
            if (updateCreateEffect) {
              var updateEffectData = {
                id: null,
                x:
                  updateCell == null
                    ? this.weapons[updateWeaponKey].mesh.position[X]
                    : this.weapons[updateWeaponKey].mesh.position[X] -
                      updateCell.position[X],
                y:
                  updateCell == null
                    ? this.weapons[updateWeaponKey].mesh.position[Y]
                    : this.weapons[updateWeaponKey].mesh.position[Y] -
                      updateCell.position[Y],
                size: this.weapons[updateWeaponKey].mesh.size,
                texture_pack: 'weapons_col',
                texture: updateEffectId,
                owner: null,
                holdOn: updateCell,
                dieOnAnimationEnd: true,
                angle: updateWeaponAngle,
                weapon: this.weapons[updateWeaponKey].weapon,
              }
              this.createEffect(updateEffectData)
            }
          }
          this.weapons[updateWeaponKey].radial
            ? (this.weapons[updateWeaponKey].mesh.newSizeKoef = 0)
            : ((this.weapons[updateWeaponKey].mesh.sizeKoef = 0),
              (this.weapons[updateWeaponKey].mesh.newSizeKoef = 0))
        }
        if (
          this.weapons[updateWeaponKey].mesh.sizeKoef < 0.2 ||
          this.weapons[updateWeaponKey].mesh.dead
        ) {
          typeof this.weapons[updateWeaponKey].owner != 'undefined' &&
            ((this.weapons[updateWeaponKey].owner.weapons[updateWeaponKey] = null),
            delete this.weapons[updateWeaponKey].owner.weapons[updateWeaponKey])
          this.weapons[updateWeaponKey].mesh.freeBuffers()
          this.weapons[updateWeaponKey].mesh_acc != null &&
            this.weapons[updateWeaponKey].mesh_acc.freeBuffers()
          this.weapons[updateWeaponKey].mesh_act != null &&
            this.weapons[updateWeaponKey].mesh_act.freeBuffers()
          this.weapons[updateWeaponKey].mesh.destroy()
          this.weapons[updateWeaponKey] = null
          delete this.weapons[updateWeaponKey]
        } else {
          this.weapons[updateWeaponKey].mesh.update()
          this.weapons[updateWeaponKey].mesh_acc != null &&
            this.weapons[updateWeaponKey].mesh_acc.update()
          this.weapons[updateWeaponKey].mesh_act != null &&
            this.weapons[updateWeaponKey].drawAct &&
            (Math.round(this.weapons[updateWeaponKey].mesh_act.frame) <
            this.weapons[updateWeaponKey].mesh_act.framesCount
              ? this.weapons[updateWeaponKey].mesh_act.update()
              : (this.weapons[updateWeaponKey].drawAct = false))
          this.weapons[updateWeaponKey].weapon.action_holded &&
            typeof this.weapons[updateWeaponKey].owner != 'undefined' &&
            this.weapons[updateWeaponKey].weapon.action_type !=
              weapon_action_types.radial &&
              !this.weapons[updateWeaponKey].weapon.action_use_for_owner &&
              (this.weapons[updateWeaponKey].mesh.angle[Z] = -getWeaponAngle(
                this.weapons[updateWeaponKey].owner.mainCell,
                this.weapons[updateWeaponKey].mesh
              ))
          if (this.questMode) {
            var updateActionRange = this.weapons[updateWeaponKey].weapon.action_range
            for (var updateOwnerCellKey in this.weapons[updateWeaponKey].owner.cells) {
              if (this.weapons[updateWeaponKey].weapon.action_range_type == 1) {
                var updateEffectRadius =
                  this.weapons[updateWeaponKey].owner.cells[updateOwnerCellKey].size *
                  (1 + updateActionRange * 0.01)
              } else {
                var updateEffectRadius =
                  this.weapons[updateWeaponKey].owner.cells[updateOwnerCellKey].size +
                  updateActionRange
              }
              for (var updatePKey in this.players) {
                if (this.players[updatePKey] != this.weapons[updateWeaponKey].owner) {
                  for (var updateCellKey in this.player.cells) {
                    if (
                      distanceToTargetP(
                        this.weapons[updateWeaponKey].owner.cells[updateOwnerCellKey].position,
                        this.players[updatePKey].cells[updateCellKey].position
                      ) <
                      updateEffectRadius + this.players[updatePKey].cells[updateCellKey].size
                    ) {
                      var updateCollisionKey = updatePKey + updateCellKey,
                        updateEffectId = 2,
                        updateEffectFound = false
                      for (
                        var updateI = 0;
                        updateI < this.effects.length;
                        updateI++
                      ) {
                        if (
                          this.effects[updateI].id ==
                          updateCollisionKey + '_' + updateEffectId
                        ) {
                          this.effects[updateI].lastVisible = Date.now()
                          updateEffectFound = true
                          break
                        }
                      }
                      if (!updateEffectFound) {
                        var updateEffectData = {
                          id: updateCollisionKey + '_' + updateEffectId,
                          x: 0,
                          y: 0,
                          size: this.players[updatePKey].cells[updateCellKey].size,
                          texture_pack: 'effects',
                          texture: updateEffectId,
                          owner: this.players[updatePKey].cells[updateCellKey],
                          holdOn: null,
                          dieOnAnimationEnd: true,
                          angle: 0,
                        }
                        this.createEffect(updateEffectData)
                        for (var updateI = 0; updateI < 10; updateI++) {
                          idx = 'm' + updateI
                          var updateMassData = {
                            group: 10,
                            x: this.players[updatePKey].cells[updateCellKey]
                              .position[X],
                            y: this.players[updatePKey].cells[updateCellKey]
                              .position[Y],
                            mass: 50,
                          }
                          this.food[idx] = this.createFood(updateMassData)
                          this.food[idx].speed = Math.random() * 400 + 1800
                          this.food[idx].slowDown = 2500
                          this.food[idx].angle[Z] =
                            Math.random() * Math.PI - Math.PI
                          this.food[idx].lastVisible = updateNow
                          this.food[idx].dead = false
                          this.players[updatePKey].cells[updateCellKey].mass -=
                            updateMassData.mass
                          this.players[updatePKey].cells[updateCellKey].setNewSize(
                            massToRadius(
                              this.players[updatePKey].cells[updateCellKey].mass
                            )
                          )
                        }
                        this.incQuestProgress(2)
                      }
                    }
                  }
                }
              }
            }
          }
          var updateWeaponDef = this.weapons[updateWeaponKey].weapon
          if (
            updateNow - this.weapons[updateWeaponKey].lastCollision >=
            (this.weapons[updateWeaponKey].weapon.collision_effect_hold
              ? 500
              : this.weapons[updateWeaponKey].weapon.id == 4
              ? 200
              : 500)
          ) {
            if (
              this.weapons[updateWeaponKey].weapon.action_holded &&
              !this.weapons[updateWeaponKey].weapon.action_use_for_owner
            ) {
              if (this.weapons[updateWeaponKey].weapon.collision_effect_id > 0) {
                if (
                  this.weapons[updateWeaponKey].weapon.action_type ==
                  weapon_action_types.linear
                ) {
                  var updateCheckPoints = [0.75, 0.95, 0.4]
                  for (var updatePKey in this.players) {
                    if (
                      this.weapons[updateWeaponKey].owner != this.players[updatePKey]
                    ) {
                      var updateActionRange = updateWeaponDef.action_range
                      for (var updateCellKey in this.players[updatePKey].cells) {
                        for (
                          var updateI = 0;
                          updateI < updateCheckPoints.length;
                          updateI++
                        ) {
                          if (updateWeaponDef.action_range_type == 1) {
                            var updateCheckRadius = updateActionRange
                          } else {
                            var updateCheckRadius = updateActionRange
                          }
                          var updateCheckX =
                              this.weapons[updateWeaponKey].mesh.position[X] +
                              updateCheckRadius *
                                3 *
                                updateCheckPoints[updateI] *
                                Math.sin(
                                  -this.weapons[updateWeaponKey].mesh.angle[Z]
                                ),
                            updateCheckY =
                              this.weapons[updateWeaponKey].mesh.position[Y] +
                              updateCheckRadius *
                                3 *
                                updateCheckPoints[updateI] *
                                Math.cos(-this.weapons[updateWeaponKey].mesh.angle[Z])
                          if (
                            distanceToTargetP(
                              [updateCheckX, updateCheckY],
                              this.players[updatePKey].cells[updateCellKey].position
                            ) <= this.players[updatePKey].cells[updateCellKey].size
                          ) {
                            var updatePlaySound = false
                            updateNow -
                              this.weapons[updateWeaponKey].lastCollisionSound >=
                              1000 &&
                              ((this.weapons[updateWeaponKey].lastCollisionSound =
                                updateNow),
                              (updatePlaySound = true))
                            var updateEffectData = {
                              id: null,
                              x: updateCheckX,
                              y: updateCheckY,
                              size: 40,
                              texture_pack: 'weapons_col',
                              texture:
                                this.weapons[updateWeaponKey].weapon
                                  .collision_effect_id,
                              owner: null,
                              holdOn: null,
                              dieOnAnimationEnd: true,
                              angle: 0,
                              weapon: updatePlaySound
                                ? this.weapons[updateWeaponKey].weapon
                                : null,
                            }
                            this.createEffect(updateEffectData)
                            break
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (
                    this.weapons[updateWeaponKey].weapon.action_type ==
                    weapon_action_types.radial
                  ) {
                    var updateCheckPoints = [0.75, 0.95, 0.4, 1],
                      updateActionRange = updateWeaponDef.action_range
                    for (var updateOwnerCellKey in this.weapons[updateWeaponKey].owner.cells) {
                      if (updateWeaponDef.action_range_type == 1) {
                        var updateEffectRadius =
                          this.weapons[updateWeaponKey].owner.cells[updateOwnerCellKey].size *
                          (1 + updateActionRange * 0.01)
                      } else {
                        var updateEffectRadius =
                          this.weapons[updateWeaponKey].owner.cells[updateOwnerCellKey].size +
                          updateActionRange
                      }
                      for (var updatePKey in this.players) {
                        if (
                          this.weapons[updateWeaponKey].owner !=
                          this.players[updatePKey]
                        ) {
                          for (var updateCellKey in this.players[updatePKey].cells) {
                            if (
                              distanceToTargetP(
                                this.weapons[updateWeaponKey].owner.cells[updateOwnerCellKey]
                                  .position,
                                this.players[updatePKey].cells[updateCellKey]
                                  .position
                              ) <
                              updateEffectRadius +
                                this.players[updatePKey].cells[updateCellKey].size
                            ) {
                              var updateWeaponAngle = getAngle(
                                this.players[updatePKey].cells[updateCellKey],
                                this.weapons[updateWeaponKey].owner.cells[updateOwnerCellKey]
                              )
                              for (
                                var updateI = 0;
                                updateI < updateCheckPoints.length;
                                updateI++
                              ) {
                                var updateCheckX =
                                    this.weapons[updateWeaponKey].owner.cells[
                                      updateOwnerCellKey
                                    ].position[X] +
                                    Math.sin(updateWeaponAngle) *
                                      updateEffectRadius *
                                      updateCheckPoints[updateI],
                                  updateCheckY =
                                    this.weapons[updateWeaponKey].owner.cells[
                                      updateOwnerCellKey
                                    ].position[Y] +
                                    Math.cos(-updateWeaponAngle) *
                                      updateEffectRadius *
                                      updateCheckPoints[updateI]
                                if (
                                  distanceToTargetP(
                                    [updateCheckX, updateCheckY],
                                    this.players[updatePKey].cells[updateCellKey]
                                      .position
                                  ) <=
                                  this.players[updatePKey].cells[updateCellKey].size
                                ) {
                                  break
                                }
                              }
                              var updatePlaySound = false
                              updateNow -
                                this.weapons[updateWeaponKey].lastCollisionSound >=
                                1000 &&
                                ((this.weapons[updateWeaponKey].lastCollisionSound =
                                  updateNow),
                                (updatePlaySound = true))
                              var updateEffectData = {
                                id: null,
                                x: this.weapons[updateWeaponKey].weapon
                                  .collision_effect_hold
                                  ? updateCheckX -
                                    this.players[updatePKey].cells[updateCellKey]
                                      .position[X]
                                  : updateCheckX,
                                y: this.weapons[updateWeaponKey].weapon
                                  .collision_effect_hold
                                  ? updateCheckY -
                                    this.players[updatePKey].cells[updateCellKey]
                                      .position[Y]
                                  : updateCheckY,
                                size: 40,
                                texture_pack: 'weapons_col',
                                texture:
                                  this.weapons[updateWeaponKey].weapon
                                    .collision_effect_id,
                                owner: null,
                                holdOn: this.weapons[updateWeaponKey].weapon
                                  .collision_effect_hold
                                  ? this.players[updatePKey].cells[updateCellKey]
                                  : null,
                                dieOnAnimationEnd: true,
                                angle: this.weapons[updateWeaponKey].weapon
                                  .collision_effect_hold
                                  ? -getWeaponAngle(
                                      this.weapons[updateWeaponKey].owner.cells[
                                        updateOwnerCellKey
                                      ],
                                      this.players[updatePKey].cells[updateCellKey]
                                    )
                                  : 0,
                                weapon: updatePlaySound
                                  ? this.weapons[updateWeaponKey].weapon
                                  : null,
                              }
                              this.createEffect(updateEffectData)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            this.weapons[updateWeaponKey].lastCollision = updateNow
          }
        }
      }
      for (
        var updateI = this.effects.length - 1;
        updateI > -1;
        updateI--
      ) {
        this.effects[updateI].update()
        ;(this.effects[updateI].dead ||
          (!this.effects[updateI].dieOnAnimationEnd &&
            this.effects[updateI].lastVisible < updateNow)) &&
          (this.effects[updateI].sound != '' &&
            this.effects[updateI].soundRepeat == 2 &&
            stopSound('sfx', this.effects[updateI].sound),
          this.effects[updateI].freeBuffers(),
          this.effects.splice(updateI, 1))
      }
      for (
        var updateI = this.explodes.length - 1;
        updateI > -1;
        updateI--
      ) {
        this.explodes[updateI].update()
        this.explodes[updateI].dead &&
          (this.explodes[updateI].freeBuffers(),
          this.explodes.splice(updateI, 1))
      }
      if (this.updateStep == 0) {
        for (var updatePKey in this.playersInfo) {
          this.playersInfo[updatePKey].removeTime > 0 &&
            this.playersInfo[updatePKey].removeTime <= updateNow &&
            (this.playersInfo[updatePKey].mesh.freeBuffers(),
            this.playersInfo[updatePKey].mesh_nick != null &&
              freeTextLabel(this.playersInfo[updatePKey].mesh_nick),
            this.playersInfo[updatePKey].mesh_clan != null &&
              freeTextLabel(this.playersInfo[updatePKey].mesh_clan),
            (this.playersInfo[updatePKey] = null),
            delete this.playersInfo[updatePKey])
        }
      }
      if (!this.gameHiSpeedMode && this.updateStep % 2) {
        for (var updateFoodKey in this.food) {
          if (
            this.food[updateFoodKey].dead &&
            (this.food[updateFoodKey].size < 1 || this.food[updateFoodKey].alpha < 0.2)
          ) {
            this.food[updateFoodKey].freeBuffers()
            this.food[updateFoodKey] = null
            delete this.food[updateFoodKey]
          } else {
            var updateFoodPrevX = this.food[updateFoodKey].position[X],
              updateFoodPrevY = this.food[updateFoodKey].position[Y]
            this.food[updateFoodKey].update()
            ;(updateFoodPrevX != this.food[updateFoodKey].position[X] ||
              updateFoodPrevY != this.food[updateFoodKey].position[Y]) &&
              this.foodTree.update(
                updateFoodPrevX,
                updateFoodPrevY,
                this.food[updateFoodKey].position[X],
                this.food[updateFoodKey].position[Y],
                updateFoodKey
              )
            this.food[updateFoodKey].speed == 0 &&
              (this.food[updateFoodKey].parentId = '')
          }
        }
      }
      for (
        var updateI = this.damage.length - 1;
        updateI >= 0;
        updateI--
      ) {
        if (updateNow - this.damage[updateI].createTime > 500) {
          if (this.damage[updateI].mesh_armor_eff != null) {
            this.damage[updateI].mesh_armor_eff.newAlpha = 0
          }
        }
        if (updateNow - this.damage[updateI].createTime > 700) {
          this.damage[updateI].mesh.newAlpha = -3
          if (this.damage[updateI].mesh_crit != null) {
            this.damage[updateI].mesh_crit.newAlpha = -3
          }
          if (this.damage[updateI].mesh_shield != null) {
            this.damage[updateI].mesh_shield.newAlpha = -3
          }
          if (this.damage[updateI].mesh_shield_all != null) {
            this.damage[updateI].mesh_shield_all.newAlpha = -3
          }
          if (this.damage[updateI].mesh_attack != null) {
            this.damage[updateI].mesh_attack.newAlpha = -3
          }
          if (this.damage[updateI].mesh_reflect != null) {
            this.damage[updateI].mesh_reflect.newAlpha = -3
          }
          if (this.damage[updateI].mesh_armor != null) {
            this.damage[updateI].mesh_armor.newAlpha = -3
          }
        }
        this.damage[updateI].mesh.update()
        if (this.damage[updateI].mesh_crit != null) {
          this.damage[updateI].mesh_crit.update()
        }
        if (this.damage[updateI].mesh_shield != null) {
          this.damage[updateI].mesh_shield.update()
        }
        if (this.damage[updateI].mesh_shield_all != null) {
          this.damage[updateI].mesh_shield_all.update()
        }
        if (this.damage[updateI].mesh_attack != null) {
          this.damage[updateI].mesh_attack.update()
        }
        if (this.damage[updateI].mesh_reflect != null) {
          this.damage[updateI].mesh_reflect.update()
        }
        if (this.damage[updateI].mesh_armor != null) {
          this.damage[updateI].mesh_armor.update()
        }
        if (this.damage[updateI].mesh_armor_eff != null) {
          this.damage[updateI].mesh_armor_eff.update()
        }
        if (this.damage[updateI].mesh.alpha < 0.1) {
          freeTextLabel(this.damage[updateI].mesh)
          if (this.damage[updateI].mesh_crit != null) {
            this.damage[updateI].mesh_crit.freeBuffers()
          }
          if (this.damage[updateI].mesh_shield != null) {
            this.damage[updateI].mesh_shield.freeBuffers()
          }
          if (this.damage[updateI].mesh_shield_all != null) {
            this.damage[updateI].mesh_shield_all.freeBuffers()
          }
          if (this.damage[updateI].mesh_attack != null) {
            this.damage[updateI].mesh_attack.freeBuffers()
          }
          if (this.damage[updateI].mesh_reflect != null) {
            this.damage[updateI].mesh_reflect.freeBuffers()
          }
          if (this.damage[updateI].mesh_armor != null) {
            this.damage[updateI].mesh_armor.freeBuffers()
          }
          if (this.damage[updateI].mesh_armor_eff != null) {
            this.damage[updateI].mesh_armor_eff.freeBuffers()
          }
          this.damage.splice(updateI, 1)
        }
      }
      for (var updateI = this.eat.length - 1; updateI >= 0; updateI--) {
        updateNow - this.eat[updateI].createTime >
          this.eat[updateI].liveTime &&
          (this.eat[updateI].mesh.newAlpha = -2)
        this.eat[updateI].mesh.update()
        this.eat[updateI].mesh.alpha < 0.1 &&
          (freeTextLabel(this.eat[updateI].mesh),
          this.eat.splice(updateI, 1))
      }
    },
    draw: function () {
      var drawNow = Date.now(),
        drawDelta = (drawNow - this.lastDrawUpdate) * 0.001,
        drawClampedDelta = Math.min(0.25, drawDelta)
      this.lastDrawUpdate = drawNow
      var drawKey
      gl.clearRect(0, 0, gl.canvas.width, gl.canvas.height)
      this.terrain.draw()
      if (
        this.roomMode == room_modes.ffa ||
        this.roomState != room_states.init
      ) {
        !game.questMode &&
          (this.wall.top.draw(),
          this.wall.bottom.draw(),
          this.wall.left.draw(),
          this.wall.right.draw(),
          this.wall.top_left.draw(),
          this.wall.top_right.draw(),
          this.wall.bottom_left.draw(),
          this.wall.bottom_right.draw())
        for (var drawKey in this.decor) {
          this.decor[drawKey].update()
          this.decor[drawKey].scale = this.decor[drawKey].size
          this.decor[drawKey].draw()
        }
      } else {
        for (var drawKey in this.pre_decor) {
          this.pre_decor[drawKey].update()
          this.pre_decor[drawKey].scale = this.pre_decor[drawKey].size
          this.pre_decor[drawKey].type == 18 &&
            (this.pre_decor[drawKey].scale = 650)
          this.pre_decor[drawKey].draw()
        }
      }
      if (this.gameHiSpeedMode || game.questMode) {
        for (var drawFoodKey in this.food) {
          if (
            this.food[drawFoodKey].dead &&
            (this.food[drawFoodKey].size < 1 || this.food[drawFoodKey].alpha < 0.2)
          ) {
            this.food[drawFoodKey].freeBuffers()
            this.food[drawFoodKey] = null
            delete this.food[drawFoodKey]
          } else {
            var drawPrevX = this.food[drawFoodKey].position[X],
              drawPrevY = this.food[drawFoodKey].position[Y]
            this.food[drawFoodKey].update()
            ;(drawPrevX != this.food[drawFoodKey].position[X] ||
              drawPrevY != this.food[drawFoodKey].position[Y]) &&
              this.foodTree.update(
                drawPrevX,
                drawPrevY,
                this.food[drawFoodKey].position[X],
                this.food[drawFoodKey].position[Y],
                drawFoodKey
              )
            this.food[drawFoodKey].speed == 0 &&
              (this.food[drawFoodKey].parentId = '')
            typeof this.food[drawFoodKey].draw != 'undefined' &&
              ((this.food[drawFoodKey].scale = this.food[drawFoodKey].size),
              this.food[drawFoodKey].draw())
          }
        }
      } else {
        for (var drawFoodKey in this.food) {
          typeof this.food[drawFoodKey].draw != 'undefined' &&
            ((this.food[drawFoodKey].scale = this.food[drawFoodKey].size),
            this.food[drawFoodKey].drawId & 1 && this.food[drawFoodKey].draw())
        }
      }
      for (var drawFoodKey in this.stuff) {
        if (this.stuff[drawFoodKey].dead && this.stuff[drawFoodKey].size < 1) {
          this.stuff[drawFoodKey].freeBuffers()
          this.stuff[drawFoodKey] = null
          delete this.stuff[drawFoodKey]
        } else {
          this.stuff[drawFoodKey].update()
          if (typeof this.stuff[drawFoodKey].moveTarget != 'undefined') {
            var updateMoveDist = distanceToTargetP(
              this.stuff[drawFoodKey].position,
              this.stuff[drawFoodKey].moveTarget
            )
            this.stuff[drawFoodKey].moveSin =
              Math.abs(updateMoveDist - this.stuff[drawFoodKey].moveDistance / 2) /
              this.stuff[drawFoodKey].moveDistance
            this.stuff[drawFoodKey].position[X] +=
              (this.stuff[drawFoodKey].moveTarget[X] -
                this.stuff[drawFoodKey].position[X]) *
              drawClampedDelta *
              2.5
            this.stuff[drawFoodKey].position[Y] +=
              (this.stuff[drawFoodKey].moveTarget[Y] -
                this.stuff[drawFoodKey].position[Y]) *
              drawClampedDelta *
              2.5
            updateMoveDist < 15 &&
              (this.stuff[drawFoodKey].setNewPosition([
                this.stuff[drawFoodKey].moveTarget[X],
                this.stuff[drawFoodKey].moveTarget[Y],
                0,
              ]),
              (this.stuff[drawFoodKey].moveTarget = null),
              delete this.stuff[drawFoodKey].moveTarget)
          }
          if (typeof this.stuff[drawFoodKey].draw != 'undefined') {
            if (typeof this.stuff[drawFoodKey].moveTarget != 'undefined') {
              var drawPrevY = this.stuff[drawFoodKey].position[Y]
              this.stuff[drawFoodKey].position[Y] +=
                Math.cos(this.stuff[drawFoodKey].moveSin * 3) * 400 - 30
            }
            this.stuff[drawFoodKey].scale = this.stuff[drawFoodKey].size
            this.stuff[drawFoodKey].draw()
            typeof this.stuff[drawFoodKey].moveTarget != 'undefined' &&
              (this.stuff[drawFoodKey].position[Y] = drawPrevY)
          }
        }
      }
      for (drawKey in this.weapons) {
        typeof this.weapons[drawKey].mesh != 'undefined' &&
          !this.weapons[drawKey].weapon.action_use_for_owner &&
          this.weapons[drawKey].drawOnGround &&
          this.weapons[drawKey].weapon.action_type !=
            weapon_action_types.radial &&
          (this.weapons[drawKey].drawAct
            ? ((this.weapons[drawKey].mesh_act.scale =
                this.weapons[drawKey].mesh_act.size),
              this.weapons[drawKey].mesh_act.draw())
            : ((this.weapons[drawKey].mesh.scale =
                this.weapons[drawKey].mesh.size *
                this.weapons[drawKey].mesh.initScale),
              this.weapons[drawKey].mesh.draw()))
      }
      for (drawKey in this.aWeapons) {
        if (
          typeof this.aWeapons[drawKey].owner != 'undefined' &&
          typeof this.aWeapons[drawKey].owner.cells != 'undefined' &&
          typeof this.aWeapons[drawKey].mesh != 'undefined'
        ) {
          for (id_c in this.aWeapons[drawKey].owner.cells) {
            var drawCell = this.aWeapons[drawKey].owner.cells[id_c]
            ;(this.aWeapons[drawKey].action_type ==
              weapon_action_types.radial ||
              (this.aWeapons[drawKey].id == 11 && drawCell.main)) &&
              ((this.damage_ring.position[X] = drawCell.position[X]),
              (this.damage_ring.position[Y] = drawCell.position[Y]),
              this.aWeapons[drawKey].range != null &&
                (this.aWeapons[drawKey].action_range_type == 1
                  ? (this.damage_ring.scale =
                      drawCell.size *
                      (1 + this.aWeapons[drawKey].range * 0.01))
                  : (this.damage_ring.scale =
                      drawCell.size + this.aWeapons[drawKey].range),
                (this.damage_ring.scale *=
                  this.playersInfo[
                    this.aWeapons[drawKey].owner.id
                  ].buff_wd_koef),
                this.aWeapons[drawKey].id == 11 &&
                  (this.damage_ring.scale *= 0.8)),
              (this.damage_ring.alpha =
                this.playersInfo[this.aWeapons[drawKey].owner.id].mesh.alpha *
                0.8),
              this.damage_ring.draw())
          }
        }
      }
      for (drawKey in this.rpWeapons) {
        if (typeof this.rpWeapons[drawKey].mesh != 'undefined') {
          if (
            typeof this.players[this.rpWeapons[drawKey].ownerId] !=
            'undefined'
          ) {
            var drawCell =
              this.players[this.rpWeapons[drawKey].ownerId].mainCell
            if (typeof drawCell != 'undefined' && drawCell != null) {
              if (
                drawCell.playerId == this.player.mainCell.playerId &&
                bossAutoAim == false
              ) {
                var loopTimeout = document.getElementById('canvas'),
                  loopInterval = loopTimeout.getContext('2d')
                loopInterval.lineWidth = 4
                loopInterval.beginPath()
                loopInterval.moveTo(
                  game.player.mainCell.drawPosition[0],
                  game.player.mainCell.drawPosition[1]
                )
                loopInterval.lineTo(gameTarget.mouseX, gameTarget.mouseY)
                loopInterval.strokeStyle = '#aa00ff'
                loopInterval.closePath()
                loopInterval.stroke()
              } else {
                this.damage_line.position[X] = drawCell.position[X]
                this.damage_line.position[Y] = drawCell.position[Y]
                this.damage_line.scale = 3000
                this.damage_line.angle[Z] = drawCell.direction
                this.damage_line.alpha =
                  this.playersInfo[this.rpWeapons[drawKey].ownerId].mesh
                    .alpha * 0.6
                this.damage_line.draw()
              }
            }
          }
        }
      }
      for (drawKey in this.players) {
        if (game.state == 1) {
          if (typeof this.players[drawKey].mainCell != 'undefined') {
            var drawCell = this.players[drawKey].mainCell
            typeof drawCell != 'undefined' &&
              drawCell != null &&
              ((this.target_line.position[X] =
                drawCell.position[X] +
                Math.sin(-drawCell.direction) * drawCell.size),
              (this.target_line.position[Y] =
                drawCell.position[Y] +
                Math.cos(-drawCell.direction) * drawCell.size),
              (this.target_line.scale = drawCell.size),
              (this.target_line.angle[Z] = drawCell.direction),
              (this.target_line.alpha =
                this.playersInfo[drawCell.playerId].mesh.alpha),
              this.target_line.draw())
          }
        }
      }
      for (drawKey in this.players) {
        if (game.state == 1) {
          if (typeof this.players[drawKey].mainCell != 'undefined') {
            var drawCell = this.players[drawKey].mainCell
            typeof drawCell != 'undefined' &&
              drawCell != null &&
              this.playersInfo[drawCell.playerId].isBoss == true &&
                ((this.allow_ring.position[X] = drawCell.position[X]),
                (this.allow_ring.position[Y] = drawCell.position[Y]),
                (this.allow_ring.scale = drawCell.size * 8.8),
                this.allow_ring.draw())
          }
        }
      }
      for (drawKey in this.players) {
        game.state == 1 &&
          typeof this.players[drawKey] != 'undefined' &&
            this.playersInfo[drawKey].mesh.alpha < 0.2 &&
              (this.playersInfo[drawKey].mesh.alpha = 0.3)
      }
      var drawSortedCells = []
      for (drawKey in this.players) {
        var drawPlayer = this.players[drawKey]
        if (typeof drawPlayer.cells != 'undefined') {
          for (id_c in drawPlayer.cells) {
            typeof drawPlayer.cells[id_c] != 'undefined' &&
              drawSortedCells.push({
                id: id_c,
                player: drawKey,
                cell: id_c,
                mass: drawPlayer.cells[id_c].size,
                y: drawPlayer.cells[id_c].position[Y],
              })
          }
        }
      }
      drawSortedCells.sort(function (sortA, sortB) {
        var sortMassDiff = Math.round(sortA.mass) - Math.round(sortB.mass)
        return sortMassDiff != 0 ? sortMassDiff : sortA.id > sortB.id
      })
      for (var drawI = 0; drawI < drawSortedCells.length; drawI++) {
        var drawCellEntry = drawSortedCells[drawI]
        if (
          typeof this.playersInfo[drawCellEntry.player] == 'undefined' ||
          typeof this.playersInfo[drawCellEntry.player].mesh == 'undefined'
        ) {
          continue
        }
        var drawPlayer = this.players[drawCellEntry.player],
          drawCell = drawPlayer.cells[drawCellEntry.cell]
        for (var drawWeaponKey in drawPlayer.weapons) {
          var drawWeapon = this.weapons[drawWeaponKey]
          if (typeof drawWeapon != 'undefined' && drawWeapon.mesh.bringToBack) {
            if (drawWeapon.weapon.action_type == weapon_action_types.radial) {
              var drawActionRange = drawWeapon.weapon.action_range,
                drawEffectRadius = 1
              drawActionRange != null &&
                (drawWeapon.weapon.action_range_type == 1
                  ? (drawEffectRadius = drawCell.size * (1 + drawActionRange * 0.01))
                  : (drawEffectRadius = drawCell.size + drawActionRange))
              this.damage_ring.position[X] = drawCell.position[X]
              this.damage_ring.position[Y] = drawCell.position[Y]
              this.damage_ring.scale =
                drawEffectRadius * this.playersInfo[drawCellEntry.player].buff_wd_koef
              this.damage_ring.alpha =
                this.playersInfo[drawCellEntry.player].mesh.alpha * 0.8
              this.damage_ring.draw()
            }
          }
        }
      }
      for (var drawI = 0; drawI < drawSortedCells.length; drawI++) {
        var drawCellEntry = drawSortedCells[drawI]
        if (
          typeof this.playersInfo[drawCellEntry.player] == 'undefined' ||
          typeof this.playersInfo[drawCellEntry.player].mesh == 'undefined'
        ) {
          continue
        }
        var drawPlayer = this.players[drawCellEntry.player],
          drawCell = drawPlayer.cells[drawCellEntry.cell]
        for (var drawWeaponKey in drawPlayer.weapons) {
          var drawWeapon = this.weapons[drawWeaponKey]
          if (typeof drawWeapon != 'undefined' && drawWeapon.mesh.bringToBack) {
            drawWeapon.mesh.alpha = this.playersInfo[drawCellEntry.player].mesh.alpha
            if (drawWeapon.weapon.action_use_for_owner) {
              if (drawWeapon.mesh.fixedSize != null) {
                if (!drawCell.main) {
                  continue
                }
                drawWeapon.mesh.size = drawWeapon.mesh.fixedSize * camera.scale
                drawWeapon.mesh.position[X] = 0
                drawWeapon.mesh.position[Y] =
                  drawCell.size + drawWeapon.mesh.size
              }
              drawWeapon.mesh.scale = drawWeapon.mesh.size
              drawWeapon.mesh.holdOn = drawCell
            } else {
              if (drawWeapon.weapon.action_type == weapon_action_types.radial) {
                var drawActionRange = drawWeapon.weapon.action_range
                drawActionRange != null &&
                  (drawWeapon.weapon.action_range_type == 1
                    ? (drawWeapon.mesh.size =
                        drawCell.size *
                        (1 + drawActionRange * 0.01) *
                        drawWeapon.mesh.initScale)
                    : (drawWeapon.mesh.size =
                        (drawCell.size + drawActionRange) *
                        drawWeapon.mesh.initScale))
                drawWeapon.mesh.position[X] = 0
                drawWeapon.mesh.position[Y] = 0
                drawWeapon.mesh.scale = drawWeapon.mesh.size
                drawWeapon.mesh.holdOn = drawCell
              } else {
                drawWeapon.mesh.owner = drawCell
              }
            }
            drawWeapon.weapon.action_type != weapon_action_types.radial &&
              (drawWeapon.mesh.angle[Z] = 0)
            drawWeapon.mesh.draw()
          }
        }
        if (
          drawCell.status == cell_status_types.canEatInJump ||
          drawCell.status == cell_status_types.canEat
        ) {
          this.aura_canEat.alpha =
            this.playersInfo[drawCellEntry.player].mesh.alpha *
            (drawCell.status == cell_status_types.canEatInJump ? 0.8 : 0.2)
          this.aura_canEat.size = 12 * camera.scale * CAMERA_KOEF
          this.aura_canEat.scale = drawCell.size * 1.5
          this.aura_canEat.position[X] = drawCell.position[X]
          this.aura_canEat.position[Y] = drawCell.position[Y]
          this.aura_canEat.draw()
        } else {
          ;(drawCell.status == cell_status_types.dangerInJump ||
            drawCell.status == cell_status_types.danger) &&
            ((this.aura_danger.alpha =
              this.playersInfo[drawCellEntry.player].mesh.alpha *
              (drawCell.status == cell_status_types.dangerInJump ? 0.8 : 0.2)),
            (this.aura_danger.size = 12 * camera.scale * CAMERA_KOEF),
            (this.aura_danger.scale = drawCell.size * 1.5),
            (this.aura_danger.position[X] = drawCell.position[X]),
            (this.aura_danger.position[Y] = drawCell.position[Y]),
            this.aura_danger.draw())
        }
        !this.questMode &&
          game.roomMode == room_modes.arena &&
          typeof this.playersInfo[drawCellEntry.player] != 'undefined' &&
            this.playersInfo[this.player.id] != 'undefined' &&
            this.playersInfo[drawCellEntry.player].team ==
              this.playersInfo[this.player.id].team &&
            this.team_stroke != null &&
              ((this.team_stroke.alpha =
                this.playersInfo[drawCellEntry.player].mesh.alpha),
              (this.team_stroke.scale = drawCell.size * 1.4),
              (this.team_stroke.position[X] = drawCell.position[X]),
              (this.team_stroke.position[Y] = drawCell.position[Y]),
              this.team_stroke.draw())
        drawCell.scale = drawCell.size
        this.playersInfo[drawCellEntry.player].mesh.position = drawCell.position
        this.playersInfo[drawCellEntry.player].mesh.scale = drawCell.size
        this.playersInfo[drawCellEntry.player].mesh.draw()
        drawCell.onScreenArea =
          this.playersInfo[drawCellEntry.player].mesh.onScreenArea
        drawCell.drawPosition[X] =
          this.playersInfo[drawCellEntry.player].mesh.drawPosition[X]
        drawCell.drawPosition[Y] =
          this.playersInfo[drawCellEntry.player].mesh.drawPosition[Y]
        drawCell.drawSize[X] =
          this.playersInfo[drawCellEntry.player].mesh.drawSize[X]
        drawCell.drawSize[Y] =
          this.playersInfo[drawCellEntry.player].mesh.drawSize[Y]
        ;(game.roomMode == room_modes.arena ||
          game.roomMode == room_modes.boss ||
          this.eatedBy != 0) &&
          (drawCell.onScreen()
            ? (this.playersInfo[drawCellEntry.player].onScreen = true)
            : ((this.playersInfo[drawCellEntry.player].position[X] =
                drawCell.position[X]),
              (this.playersInfo[drawCellEntry.player].position[Y] =
                drawCell.position[Y])))
        for (var updateI3 = 0; updateI3 < this.effects.length; updateI3++) {
          ;(this.effects[updateI3].holdOn == drawCell ||
            this.effects[updateI3].owner == drawCell) &&
            ((this.effects[updateI3].alpha = Math.min(
              this.playersInfo[drawCellEntry.player].mesh.alpha,
              this.effects[updateI3].alpha
            )),
            this.effects[updateI3].holdOn != null &&
              (this.effects[updateI3].scale = this.effects[updateI3].size),
            this.effects[updateI3].fixedSize != null &&
              ((this.effects[updateI3].size =
                this.effects[updateI3].fixedSize * camera.scale),
              (this.effects[updateI3].position[X] =
                this.effects[updateI3].offset[X] +
                Math.sin(0.8) *
                  (drawCell.size + this.effects[updateI3].size)),
              (this.effects[updateI3].position[Y] =
                this.effects[updateI3].offset[Y] +
                Math.cos(0.8) *
                  (drawCell.size + this.effects[updateI3].size)),
              (this.effects[updateI3].scale = this.effects[updateI3].size),
              (this.effects[updateI3].owner = null),
              (this.effects[updateI3].holdOn = drawCell)),
            this.effects[updateI3].draw())
        }
        chatDeny == false &&
          drawPlayer.chatBubbleTime >= drawNow &&
            ((this.chatBubble.alpha =
              this.playersInfo[drawCellEntry.player].mesh.alpha),
            (this.chatBubble.size = 16 * camera.scale * CAMERA_KOEF),
            (this.chatBubble.scale = this.chatBubble.size),
            (this.chatBubble.position[X] =
              drawCell.position[X] +
              this.chatBubble.offset[X] +
              Math.sin(1.2) * (drawCell.size + this.chatBubble.size)),
            (this.chatBubble.position[Y] =
              drawCell.position[Y] +
              this.chatBubble.offset[Y] +
              Math.cos(1.2) * (drawCell.size + this.chatBubble.size)),
            this.chatBubble.draw())
        drawPlayer.emotion != null &&
          ((drawPlayer.emotion.mesh.alpha =
            this.playersInfo[drawCellEntry.player].mesh.alpha),
          (drawPlayer.emotion.mesh.size = 24.32 * camera.scale * CAMERA_KOEF),
          (drawPlayer.emotion.mesh.scale = drawPlayer.emotion.mesh.size),
          (drawPlayer.emotion.mesh.position[X] =
            drawCell.position[X] +
            drawPlayer.emotion.mesh.offset[X] +
            Math.sin(0.8) * (drawCell.size + drawPlayer.emotion.mesh.size)),
          (drawPlayer.emotion.mesh.position[Y] =
            drawCell.position[Y] +
            drawPlayer.emotion.mesh.offset[Y] +
            Math.cos(0.8) * (drawCell.size + drawPlayer.emotion.mesh.size)),
          drawPlayer.emotion.mesh.draw())
        for (var drawWeaponKey in drawPlayer.weapons) {
          var drawWeapon = this.weapons[drawWeaponKey]
          if (typeof drawWeapon != 'undefined') {
            if (!drawWeapon.mesh.bringToBack) {
              drawWeapon.mesh.alpha =
                this.playersInfo[drawCellEntry.player].mesh.alpha
              if (drawWeapon.weapon.action_use_for_owner) {
                if (drawWeapon.mesh.fixedSize != null) {
                  if (!drawCell.main) {
                    continue
                  }
                  drawWeapon.mesh.size = drawWeapon.mesh.fixedSize * camera.scale
                  drawWeapon.mesh.position[X] = 0
                  drawWeapon.mesh.position[Y] =
                    drawCell.size + drawWeapon.mesh.size
                }
                drawWeapon.mesh.scale = drawWeapon.mesh.size
                drawWeapon.mesh.holdOn = drawCell
              } else {
                if (
                  drawWeapon.weapon.action_type == weapon_action_types.radial
                ) {
                  var drawActionRange = drawWeapon.weapon.action_range
                  drawActionRange != null &&
                    (drawWeapon.weapon.action_range_type == 1
                      ? (drawWeapon.mesh.size =
                          drawCell.size *
                          (1 + drawActionRange * 0.01) *
                          drawWeapon.mesh.initScale)
                      : (drawWeapon.mesh.size =
                          (drawCell.size + drawActionRange) *
                          drawWeapon.mesh.initScale))
                  drawWeapon.mesh.position[X] = 0
                  drawWeapon.mesh.position[Y] = 0
                  drawWeapon.mesh.scale = drawWeapon.mesh.size
                  drawWeapon.mesh.holdOn = drawCell
                } else {
                  drawWeapon.mesh.owner = drawCell
                }
              }
              drawWeapon.mesh.angle[Z] = 0
              drawWeapon.mesh.draw()
            }
            drawWeapon.mesh_acc != null &&
              ((drawWeapon.mesh_acc.alpha =
                this.playersInfo[drawCellEntry.player].mesh.alpha),
              drawWeapon.mesh_acc.fixedSize != null
                ? ((drawWeapon.mesh_acc.size =
                    drawWeapon.mesh_acc.fixedSize * camera.scale),
                  (drawWeapon.mesh_acc.position[X] =
                    drawCell.size * drawWeapon.mesh_acc.offset[X]),
                  (drawWeapon.mesh_acc.position[Y] =
                    drawCell.size * drawWeapon.mesh_acc.offset[Y] +
                    drawWeapon.mesh_acc.size))
                : ((drawWeapon.mesh_acc.size =
                    drawCell.size * drawWeapon.mesh_acc.initScale),
                  (drawWeapon.mesh_acc.position[X] =
                    drawCell.size * drawWeapon.mesh_acc.offset[X]),
                  (drawWeapon.mesh_acc.position[Y] =
                    drawCell.size * drawWeapon.mesh_acc.offset[Y] +
                    drawWeapon.mesh_acc.size)),
              (drawWeapon.mesh_acc.scale = drawWeapon.mesh_acc.size),
              (drawWeapon.mesh_acc.holdOn = drawCell),
              (drawWeapon.mesh_acc.angle[Z] = 0),
              drawWeapon.mesh_acc.draw())
          }
        }
        if (
          this.playersInfo[drawCellEntry.player].runesData != null &&
          this.playersInfo[drawCellEntry.player].runesData.active &&
          drawCell.main &&
          this.roomState == room_states.run
        ) {
          for (
            var updateRuneIdx = 0;
            updateRuneIdx <
            this.playersInfo[drawCellEntry.player].runesData.runes.length;
            updateRuneIdx++
          ) {
            var updateRune =
                this.playersInfo[drawCellEntry.player].runesData.runes[updateRuneIdx],
              updateRuneCreateTime =
                this.playersInfo[drawCellEntry.player].runesData.createTime,
              updateRuneInterval =
                this.playersInfo[drawCellEntry.player].runesData.runeInterval,
              updateRuneTime = this.playersInfo[drawCellEntry.player].runesData.runeTime,
              updateRuneCycleNum = Math.floor((Date.now() - updateRuneCreateTime) / updateRuneTime),
              updateRuneGroupIdx = Math.floor(updateRuneIdx / 3),
              updateRuneCycleStart = updateRuneCreateTime + updateRuneCycleNum * updateRuneTime
            updateRuneCycleStart + updateRuneInterval * updateRuneGroupIdx > Date.now() - updateRuneInterval
              ? (updateRune.newAlpha = 0)
              : (updateRune.newAlpha == 0 &&
                  ((updateRune.frame = 0),
                  (updateRune.newSize = updateRune.size),
                  (updateRune.size = 0)),
                (updateRune.newAlpha = 1),
                updateRune.id == 'rune' && (updateRune.alpha = 1))
            updateRune.update()
            if (updateRune.alpha > 0) {
              updateRune.alpha =
                updateRune.alpha * this.playersInfo[drawCellEntry.player].mesh.alpha
              if (updateRune.alpha < 0) {
                updateRune.alpha = 0
              }
              updateRune.scale = updateRune.size
              updateRune.owner = drawCell
              updateRune.draw()
            }
          }
        }
        !this.questMode &&
          drawCell.main &&
          !drawCell.dead &&
          (this.playersInfo[drawCellEntry.player].mesh_nick != null &&
            ((this.playersInfo[drawCellEntry.player].mesh_nick.alpha =
              this.playersInfo[drawCellEntry.player].mesh.alpha),
            (this.playersInfo[drawCellEntry.player].mesh_nick.position[X] =
              drawCell.position[X]),
            (this.playersInfo[drawCellEntry.player].mesh_nick.position[Y] =
              drawCell.position[Y] -
              drawCell.size -
              12 * camera.scale * CAMERA_KOEF),
            (this.playersInfo[drawCellEntry.player].mesh_nick.scale =
              8 * camera.scale * CAMERA_KOEF),
            this.playersInfo[drawCellEntry.player].mesh_nick.draw()),
          this.playersInfo[drawCellEntry.player].mesh_clan != null &&
            ((this.playersInfo[drawCellEntry.player].mesh_clan.alpha =
              this.playersInfo[drawCellEntry.player].mesh.alpha),
            (this.playersInfo[drawCellEntry.player].mesh_clan.position[X] =
              drawCell.position[X]),
            (this.playersInfo[drawCellEntry.player].mesh_clan.position[Y] =
              drawCell.position[Y] -
              drawCell.size -
              28 * camera.scale * CAMERA_KOEF),
            (this.playersInfo[drawCellEntry.player].mesh_clan.scale =
              6.2 * camera.scale * CAMERA_KOEF),
            this.playersInfo[drawCellEntry.player].mesh_clan.draw()))
        drawCell.status == cell_status_types.canEatInJump &&
          ((this.eatInJump.alpha =
            this.playersInfo[drawCellEntry.player].mesh.alpha),
          (this.eatInJump.size = 12 * camera.scale * CAMERA_KOEF),
          (this.eatInJump.scale = this.eatInJump.size),
          (this.eatInJump.position[X] = drawCell.position[X]),
          (this.eatInJump.position[Y] = drawCell.position[Y]),
          this.eatInJump.draw())
        drawCell.status == cell_status_types.dangerInJump &&
          ((this.dangerJump.alpha =
            this.playersInfo[drawCellEntry.player].mesh.alpha),
          (this.dangerJump.size = 20 * camera.scale * CAMERA_KOEF),
          (this.dangerJump.scale = this.eatInJump.size),
          (this.dangerJump.position[X] = drawCell.position[X]),
          (this.dangerJump.position[Y] = drawCell.position[Y]),
          this.dangerJump.draw())
        this.eatedBy == drawCellEntry.player &&
          this.revenge_icon != null &&
          drawCell.main &&
          !drawCell.dead &&
          ((this.revenge_icon.size = 20 * camera.scale * CAMERA_KOEF),
          (this.revenge_icon.scale = this.revenge_icon.size),
          (this.revenge_icon.position[X] =
            drawCell.position[X] +
            Math.sin(-1.05) * (drawCell.size + this.revenge_icon.size * 0.4)),
          (this.revenge_icon.position[Y] =
            drawCell.position[Y] +
            Math.cos(-1.05) * (drawCell.size + this.revenge_icon.size * 0.4)),
          (this.revenge_icon.alpha =
            this.playersInfo[drawCellEntry.player].mesh.alpha),
          (this.revenge_icon.angle[Z] = 0),
          this.revenge_icon.draw())
        drawCell.main &&
          this.playersInfo[drawCellEntry.player].armor > 0 &&
          !this.playersInfo[drawCellEntry.player].isBoss &&
          ((this.armor_icon.alpha =
            this.playersInfo[drawCellEntry.player].mesh.alpha),
          (this.armor_icon.size = Math.max(
            isMobileApp ? 250 : 150,
            drawCell.size * 0.5
          )),
          (this.armor_icon.scale = this.armor_icon.size),
          (this.armor_icon.position[X] =
            drawCell.position[X] +
            this.armor_icon.offset[X] +
            Math.sin(2) * (drawCell.size + this.armor_icon.size * 0.1)),
          (this.armor_icon.position[Y] =
            drawCell.position[Y] +
            this.armor_icon.offset[Y] +
            Math.cos(2) * (drawCell.size + this.armor_icon.size * 0.1)),
          this.armor_icon.draw(),
          drawCanvasText(
            gl,
            this.armor_icon.drawSize[Y] * 0.5,
            this.playersInfo[drawCellEntry.player].armor,
            this.armor_icon.drawPosition[X],
            this.armor_icon.drawPosition[Y] + this.armor_icon.drawSize[Y] * 0.6,
            220,
            this.playersInfo[drawCellEntry.player].mesh.alpha
          ))
        if (
          drawCell.main &&
          drawPlayer == this.player &&
          this.move_arrow != null
        ) {
          var drawAngle =
            Math.atan2(
              gameTarget.mouseY - drawCell.drawPosition[Y],
              gameTarget.mouseX - drawCell.drawPosition[X]
            ) +
            Math.PI * 0.5
          this.move_arrow.position[X] =
            drawCell.position[X] + Math.sin(drawAngle) * drawCell.size * 1.5
          this.move_arrow.position[Y] =
            drawCell.position[Y] + Math.cos(drawAngle) * drawCell.size * 1.5
          this.move_arrow.scale = 9 * camera.scale * CAMERA_KOEF
          this.move_arrow.alpha = 1
          this.move_arrow.angle[Z] = -drawAngle
          this.move_arrow.draw()
        }
      }
      for (drawKey in this.aWeapons) {
        if (
          typeof this.aWeapons[drawKey].owner != 'undefined' &&
          typeof this.aWeapons[drawKey].owner.cells != 'undefined' &&
          typeof this.aWeapons[drawKey].mesh != 'undefined'
        ) {
          for (id_c in this.aWeapons[drawKey].owner.cells) {
            var drawCell = this.aWeapons[drawKey].owner.cells[id_c]
            if (drawCell.main && !drawCell.dead) {
              var drawAlpha =
                typeof this.playersInfo[this.aWeapons[drawKey].owner.id] !=
                'undefined'
                  ? this.playersInfo[this.aWeapons[drawKey].owner.id].mesh
                      .alpha
                  : 1
              this.aWeapons[drawKey].mesh.alpha = drawAlpha
              this.aWeapons[drawKey].mesh.size =
                25 * camera.scale * CAMERA_KOEF
              this.aWeapons[drawKey].mesh.scale =
                this.aWeapons[drawKey].mesh.size
              this.aWeapons[drawKey].mesh.position[X] =
                drawCell.position[X] +
                this.aWeapons[drawKey].mesh.offset[X] +
                Math.sin(0) *
                  (drawCell.size + this.aWeapons[drawKey].mesh.size)
              this.aWeapons[drawKey].mesh.position[Y] =
                drawCell.position[Y] +
                this.aWeapons[drawKey].mesh.offset[Y] +
                Math.cos(0) *
                  (drawCell.size + this.aWeapons[drawKey].mesh.size)
              this.weapon_circle.alpha = drawAlpha
              this.weapon_circle.scale =
                this.aWeapons[drawKey].mesh.scale * 1.3
              this.weapon_circle.position[X] =
                this.aWeapons[drawKey].mesh.position[X]
              this.weapon_circle.position[Y] =
                this.aWeapons[drawKey].mesh.position[Y]
              this.aWeapons[drawKey].timer.alpha = drawAlpha
              this.aWeapons[drawKey].timer.scale =
                this.aWeapons[drawKey].mesh.size * 0.4
              this.aWeapons[drawKey].timer.position[X] =
                this.aWeapons[drawKey].mesh.position[X] +
                this.aWeapons[drawKey].mesh.size
              this.aWeapons[drawKey].timer.position[Y] =
                this.aWeapons[drawKey].mesh.position[Y] +
                this.aWeapons[drawKey].mesh.size
              this.weapon_circle.draw()
              this.aWeapons[drawKey].mesh.draw()
              this.aWeapons[drawKey].timer.draw()
              if (
                this.aWeapons[drawKey].action_type !=
                weapon_action_types.radial
              ) {
                break
              }
            }
          }
        }
      }
      for (drawKey in this.rpWeapons) {
        if (typeof this.rpWeapons[drawKey].mesh != 'undefined') {
          if (
            typeof this.players[this.rpWeapons[drawKey].ownerId] !=
            'undefined'
          ) {
            var drawCell =
              this.players[this.rpWeapons[drawKey].ownerId].mainCell
            typeof drawCell != 'undefined' &&
              drawCell != null &&
              this.rpWeapons[drawKey].mesh != null &&
              ((this.rpWeapons[drawKey].mesh.position[X] =
                drawCell.position[X] +
                Math.sin(-drawCell.direction) * drawCell.size),
              (this.rpWeapons[drawKey].mesh.position[Y] =
                drawCell.position[Y] +
                Math.cos(-drawCell.direction) * drawCell.size),
              (this.rpWeapons[drawKey].mesh.scale = 670),
              (this.rpWeapons[drawKey].mesh.angle[Z] = drawCell.direction),
              (this.rpWeapons[drawKey].mesh.alpha =
                this.playersInfo[this.rpWeapons[drawKey].ownerId].mesh.alpha),
              this.rpWeapons[drawKey].mesh.draw())
          }
        }
      }
      for (drawKey in this.weapons) {
        typeof this.weapons[drawKey].mesh != 'undefined' &&
          !this.weapons[drawKey].weapon.action_use_for_owner &&
          !this.weapons[drawKey].drawOnGround &&
          this.weapons[drawKey].weapon.action_type !=
            weapon_action_types.radial &&
          (this.weapons[drawKey].drawAct
            ? ((this.weapons[drawKey].mesh_act.scale =
                this.weapons[drawKey].mesh_act.size),
              this.weapons[drawKey].mesh_act.draw())
            : ((this.weapons[drawKey].mesh.scale =
                this.weapons[drawKey].mesh.size *
                this.weapons[drawKey].mesh.initScale),
              this.weapons[drawKey].mesh.draw()))
      }
      for (var drawI = 0; drawI < this.effects.length; drawI++) {
        this.effects[drawI].holdOn == null &&
          this.effects[drawI].owner == null &&
          ((this.effects[drawI].scale = this.effects[drawI].size),
          this.effects[drawI].draw())
      }
      for (var drawI = 0; drawI < this.explodes.length; drawI++) {
        this.explodes[drawI].scale = this.explodes[drawI].size
        this.explodes[drawI].draw()
      }
      for (var drawI = 0; drawI < this.damage.length; drawI++) {
        var drawPlayer = this.players[this.damage[drawI].player_id]
        if (typeof drawPlayer != 'undefined') {
          var drawCell = drawPlayer.cells[this.damage[drawI].cell_id]
          if (
            typeof drawCell != 'undefined' &&
            drawCell.newSize > 1 &&
            (this.playersInfo[drawPlayer.id].mesh.alpha >= 0.8 ||
              drawPlayer == this.player)
          ) {
            this.damage[drawI].mesh.position[X] = drawCell.position[X]
            this.damage[drawI].mesh.position[Y] =
              drawCell.position[Y] +
              drawCell.size -
              20 +
              60 * (1 - this.damage[drawI].mesh.alpha)
            this.damage[drawI].mesh.scale =
              this.damage[drawI].mesh.size *
              1.3 *
              camera.scale *
              CAMERA_KOEF
            this.damage[drawI].mesh.draw()
            var drawIconOffset =
              this.damage[drawI].mesh.texture_info.size.w *
              camera.scale *
              0.8
            this.damage[drawI].mesh_crit != null &&
              ((this.damage[drawI].mesh_crit.position[X] =
                drawCell.position[X] - drawIconOffset),
              (this.damage[drawI].mesh_crit.position[Y] =
                drawCell.position[Y] +
                drawCell.size -
                20 +
                60 * (1 - this.damage[drawI].mesh.alpha)),
              (this.damage[drawI].mesh_crit.scale =
                this.damage[drawI].mesh_crit.size *
                camera.scale *
                CAMERA_KOEF),
              this.damage[drawI].mesh_crit.draw(),
              (drawIconOffset +=
                this.damage[drawI].mesh_crit.size *
                camera.scale *
                CAMERA_KOEF *
                2))
            this.damage[drawI].mesh_shield != null &&
              ((this.damage[drawI].mesh_shield.position[X] =
                drawCell.position[X] - drawIconOffset),
              (this.damage[drawI].mesh_shield.position[Y] =
                drawCell.position[Y] +
                drawCell.size -
                20 +
                60 * (1 - this.damage[drawI].mesh.alpha)),
              (this.damage[drawI].mesh_shield.scale =
                this.damage[drawI].mesh_shield.size *
                camera.scale *
                CAMERA_KOEF *
                1.2),
              this.damage[drawI].mesh_shield.draw(),
              (drawIconOffset +=
                this.damage[drawI].mesh_shield.size *
                camera.scale *
                CAMERA_KOEF *
                2 *
                1.2))
            this.damage[drawI].mesh_shield_all != null &&
              ((this.damage[drawI].mesh_shield_all.position[X] =
                drawCell.position[X] - drawIconOffset),
              (this.damage[drawI].mesh_shield_all.position[Y] =
                drawCell.position[Y] +
                drawCell.size -
                20 +
                60 * (1 - this.damage[drawI].mesh.alpha)),
              (this.damage[drawI].mesh_shield_all.scale =
                this.damage[drawI].mesh_shield_all.size *
                camera.scale *
                CAMERA_KOEF *
                1.2),
              this.damage[drawI].mesh_shield_all.draw(),
              (drawIconOffset +=
                this.damage[drawI].mesh_shield_all.size *
                camera.scale *
                CAMERA_KOEF *
                2 *
                1.2))
            this.damage[drawI].mesh_armor != null &&
              ((this.damage[drawI].mesh_armor.position[X] =
                drawCell.position[X] - drawIconOffset),
              (this.damage[drawI].mesh_armor.position[Y] =
                drawCell.position[Y] +
                drawCell.size -
                20 +
                60 * (1 - this.damage[drawI].mesh.alpha)),
              (this.damage[drawI].mesh_armor.scale =
                this.damage[drawI].mesh_armor.size *
                camera.scale *
                CAMERA_KOEF *
                1.2),
              this.damage[drawI].mesh_armor.draw(),
              (drawIconOffset +=
                this.damage[drawI].mesh_armor.size *
                camera.scale *
                CAMERA_KOEF *
                2 *
                1.2))
            this.damage[drawI].mesh_attack != null &&
              ((this.damage[drawI].mesh_attack.position[X] =
                drawCell.position[X] - drawIconOffset),
              (this.damage[drawI].mesh_attack.position[Y] =
                drawCell.position[Y] +
                drawCell.size -
                20 +
                60 * (1 - this.damage[drawI].mesh.alpha)),
              (this.damage[drawI].mesh_attack.scale =
                this.damage[drawI].mesh_attack.size *
                camera.scale *
                CAMERA_KOEF *
                1.2),
              this.damage[drawI].mesh_attack.draw(),
              (drawIconOffset +=
                this.damage[drawI].mesh_attack.size *
                camera.scale *
                CAMERA_KOEF *
                2 *
                1.2))
            this.damage[drawI].mesh_reflect != null &&
              ((this.damage[drawI].mesh_reflect.position[X] =
                drawCell.position[X] - drawIconOffset),
              (this.damage[drawI].mesh_reflect.position[Y] =
                drawCell.position[Y] +
                drawCell.size -
                20 +
                60 * (1 - this.damage[drawI].mesh.alpha)),
              (this.damage[drawI].mesh_reflect.scale =
                this.damage[drawI].mesh_reflect.size *
                camera.scale *
                CAMERA_KOEF *
                1.2),
              this.damage[drawI].mesh_reflect.draw(),
              (drawIconOffset +=
                this.damage[drawI].mesh_reflect.size *
                camera.scale *
                CAMERA_KOEF *
                2 *
                1.2))
            this.damage[drawI].mesh_armor_eff != null &&
              ((this.damage[drawI].mesh_armor_eff.position[X] =
                drawCell.position[X]),
              (this.damage[drawI].mesh_armor_eff.position[Y] =
                drawCell.position[Y]),
              (this.damage[drawI].mesh_armor_eff.scale =
                this.damage[drawI].mesh_armor_eff.size),
              this.damage[drawI].mesh_armor_eff.draw())
          }
        }
      }
      for (var drawI = 0; drawI < this.eat.length; drawI++) {
        var drawPlayer = this.players[this.eat[drawI].player_id]
        if (typeof drawPlayer != 'undefined') {
          var drawCell = drawPlayer.cells[this.eat[drawI].cell_id]
          typeof drawCell != 'undefined' &&
            drawCell.newSize > 1 &&
            ((this.eat[drawI].mesh.position[X] =
              drawCell.position[X] + this.eat[drawI].offset[X]),
            (this.eat[drawI].mesh.position[Y] =
              drawCell.position[Y] +
              drawCell.size -
              20 +
              60 +
              this.eat[drawI].offset[Y]),
            (this.eat[drawI].mesh.scale =
              this.eat[drawI].mesh.size * 1.3 * camera.scale * CAMERA_KOEF),
            this.eat[drawI].mesh.draw())
        }
      }
      if (
        (game.roomMode == room_modes.arena ||
          game.roomMode == room_modes.boss ||
          (game.roomMode == room_modes.ffa && this.eatedBy != 0)) &&
        this.player != null &&
        typeof this.playersInfo[this.player.id] != 'undefined'
      ) {
        for (var drawKey in this.playersInfo) {
          if (
            drawKey != this.player.id &&
            ((this.playersInfo[drawKey].team > 0 &&
              this.playersInfo[drawKey].team ==
                this.playersInfo[this.player.id].team) ||
              drawKey == this.eatedBy ||
              this.playersInfo[drawKey].isBoss) &&
            this.playersInfo[drawKey].active &&
            !this.playersInfo[drawKey].onScreen &&
            !this.playersInfo[drawKey].dead
          ) {
            if (
              this.playersInfo[drawKey].position[X] >= 0 &&
              this.playersInfo[drawKey].position[X] <= this.roomWidth &&
              this.playersInfo[drawKey].position[Y] >= 0 &&
              this.playersInfo[drawKey].position[Y] <= this.roomHeight
            ) {
              var drawAngle = getAngle(this.playersInfo[drawKey], camera),
                drawArrowX =
                  camera.position[X] +
                  Math.sin(drawAngle) * 250 * camera.scale * CAMERA_KOEF,
                drawArrowY =
                  camera.position[Y] +
                  Math.cos(drawAngle) * 150 * camera.scale * CAMERA_KOEF,
                drawNickW = 0,
                drawNickH = 0
              this.playersInfo[drawKey].arrow_nick != null &&
                ((this.playersInfo[drawKey].arrow_nick.alpha = 1),
                (this.playersInfo[drawKey].arrow_nick.position[X] =
                  drawArrowX),
                (this.playersInfo[drawKey].arrow_nick.position[Y] =
                  drawArrowY),
                (this.playersInfo[drawKey].arrow_nick.scale =
                  7 * camera.scale * CAMERA_KOEF),
                game.roomMode != room_modes.boss &&
                  this.playersInfo[drawKey].arrow_nick.draw(),
                (drawNickW =
                  this.playersInfo[drawKey].arrow_nick.texture_info.size.w *
                  1.6),
                (drawNickH =
                  this.playersInfo[drawKey].arrow_nick.texture_info.size.h *
                  1.6))
              !this.questMode &&
                game.roomMode == room_modes.arena &&
                this.team_arrow != null &&
                  ((this.team_arrow.position[X] =
                    drawArrowX + Math.sin(drawAngle) * (drawNickW + 100)),
                  (this.team_arrow.position[Y] =
                    drawArrowY + Math.cos(drawAngle) * (drawNickH + 100)),
                  (this.team_arrow.scale = 9 * camera.scale * CAMERA_KOEF),
                  (this.team_arrow.alpha = 1),
                  (this.team_arrow.angle[Z] = -drawAngle),
                  this.team_arrow.draw())
              this.revenge_arrow != null &&
                (game.roomMode != room_modes.boss ||
                  this.playersInfo[drawKey].isBoss) &&
                  ((this.revenge_arrow.position[X] =
                    drawArrowX + Math.sin(drawAngle) * (drawNickW + 100)),
                  (this.revenge_arrow.position[Y] =
                    drawArrowY + Math.cos(drawAngle) * (drawNickH + 100)),
                  (this.revenge_arrow.scale = 20 * camera.scale * CAMERA_KOEF),
                  (this.revenge_arrow.alpha = 1),
                  (this.revenge_arrow.angle[Z] = -drawAngle),
                  this.revenge_arrow.draw(),
                  this.revenge_icon_sk != null &&
                    ((this.revenge_icon_sk.position[X] =
                      drawArrowX + Math.sin(drawAngle) * (drawNickW + 100)),
                    (this.revenge_icon_sk.position[Y] =
                      drawArrowY + Math.cos(drawAngle) * (drawNickH + 100)),
                    (this.revenge_icon_sk.scale =
                      20 * camera.scale * CAMERA_KOEF),
                    (this.revenge_icon_sk.alpha = 1),
                    (this.revenge_icon_sk.angle[Z] = 0),
                    this.revenge_icon_sk.draw()))
            }
          }
          this.playersInfo[drawKey].onScreen = false
        }
      }
      gameTarget.mouseInit &&
        gameTarget.setTarget(
          Math.round(
            (gameTarget.mouseX - this.viewportCenterX) * camera.scale * 1.1
          ),
          Math.round(
            (this.viewportCenterY - gameTarget.mouseY) * camera.scale * 1.1
          )
        )
    },
    destroy: function () {
      this.foodTree != null && this.foodTree.clear()
      this.terrain != null &&
        (this.terrain.freeBuffers(), (this.terrain = null))
      if (this.wall != {}) {
        for (var destroyWallKey in this.wall) {
          this.wall[destroyWallKey].freeBuffers()
          delete this.wall[destroyWallKey]
        }
        this.wall = {}
      }
      this.move_arrow != null &&
        (this.move_arrow.freeBuffers(), (this.move_arrow = null))
      this.team_arrow != null &&
        (this.team_arrow.freeBuffers(), (this.team_arrow = null))
      this.team_stroke != null &&
        (this.team_stroke.freeBuffers(), (this.team_stroke = null))
      this.revenge_arrow != null &&
        (this.revenge_arrow.freeBuffers(), (this.revenge_arrow = null))
      this.revenge_icon != null &&
        (this.revenge_icon.freeBuffers(), (this.revenge_icon = null))
      this.revenge_icon_sk != null &&
        (this.revenge_icon_sk.freeBuffers(), (this.revenge_icon_sk = null))
      this.weapon_circle != null &&
        (this.weapon_circle.freeBuffers(), (this.weapon_circle = null))
      this.damage_ring != null &&
        (this.damage_ring.freeBuffers(), (this.damage_ring = null))
      this.chatBubble != null &&
        (this.chatBubble.freeBuffers(), (this.chatBubble = null))
      this.eatInJump != null &&
        (this.eatInJump.freeBuffers(), (this.eatInJump = null))
      this.dangerJump != null &&
        (this.dangerJump.freeBuffers(), (this.dangerJump = null))
      this.aura_canEat != null &&
        (this.aura_canEat.freeBuffers(), (this.aura_canEat = null))
      this.aura_danger != null &&
        (this.aura_danger.freeBuffers(), (this.aura_danger = null))
      this.armor_icon != null &&
        (this.armor_icon.freeBuffers(), (this.armor_icon = null))
      for (var destroyKey in this.food) {
        this.food[destroyKey].freeBuffers()
        this.food[destroyKey] = null
        delete this.food[destroyKey]
      }
      this.food = {}
      for (var destroyKey in this.decor) {
        this.decor[destroyKey].freeBuffers()
        this.decor[destroyKey] = null
        delete this.decor[destroyKey]
      }
      this.decor = {}
      for (var destroyKey in this.pre_decor) {
        this.pre_decor[destroyKey].freeBuffers()
        this.pre_decor[destroyKey] = null
        delete this.pre_decor[destroyKey]
      }
      this.pre_decor = {}
      for (var destroyKey in this.stuff) {
        this.stuff[destroyKey].freeBuffers()
        this.stuff[destroyKey] = null
        delete this.stuff[destroyKey]
      }
      this.stuff = {}
      for (var destroyKey in this.aWeapons) {
        this.aWeapons[destroyKey].mesh.freeBuffers()
        this.aWeapons[destroyKey].timer.freeBuffers()
        this.aWeapons[destroyKey] = null
        delete this.aWeapons[destroyKey]
      }
      for (var destroyKey in this.weapons) {
        this.weapons[destroyKey].mesh.destroy()
        this.weapons[destroyKey].mesh_acc != null &&
          this.weapons[destroyKey].mesh_acc.destroy()
        this.weapons[destroyKey].mesh_act != null &&
          this.weapons[destroyKey].mesh_act.destroy()
        this.weapons[destroyKey] = null
        delete this.weapons[destroyKey]
      }
      for (
        var destroyI = this.effects.length - 1;
        destroyI > -1;
        destroyI--
      ) {
        this.effects[destroyI].destroy()
        this.effects.splice(destroyI, 1)
      }
      for (
        var destroyI = this.explodes.length - 1;
        destroyI > -1;
        destroyI--
      ) {
        this.explodes[destroyI].freeBuffers()
        this.explodes.splice(destroyI, 1)
      }
      for (var destroyKey in this.players) {
        this.players[destroyKey] = null
        delete this.players[destroyKey]
      }
      for (var destroyPKey in this.playersInfo) {
        this.playersInfo[destroyPKey].mesh.freeBuffers()
        this.playersInfo[destroyPKey].mesh_nick != null &&
          freeTextLabel(this.playersInfo[destroyPKey].mesh_nick)
        this.playersInfo[destroyPKey].mesh_clan != null &&
          freeTextLabel(this.playersInfo[destroyPKey].mesh_clan)
        this.playersInfo[destroyPKey].arrow_nick != null &&
          freeTextLabel(this.playersInfo[destroyPKey].arrow_nick)
        this.playersInfo[destroyPKey] = null
        delete this.playersInfo[destroyPKey]
      }
      for (var destroyPKey in this.hofInfo) {
        this.hofInfo[destroyPKey] = ''
        delete this.hofInfo[destroyPKey]
      }
      for (
        var destroyI = this.damage.length - 1;
        destroyI >= 0;
        destroyI--
      ) {
        freeTextLabel(this.damage[destroyI].mesh)
        if (this.damage[destroyI].mesh_crit != null) {
          this.damage[destroyI].mesh_crit.freeBuffers()
        }
        if (this.damage[destroyI].mesh_shield != null) {
          this.damage[destroyI].mesh_shield.freeBuffers()
        }
        if (this.damage[destroyI].mesh_shield_all != null) {
          this.damage[destroyI].mesh_shield_all.freeBuffers()
        }
        if (this.damage[destroyI].mesh_attack != null) {
          this.damage[destroyI].mesh_attack.freeBuffers()
        }
        if (this.damage[destroyI].mesh_reflect != null) {
          this.damage[destroyI].mesh_reflect.freeBuffers()
        }
        if (this.damage[destroyI].mesh_armor != null) {
          this.damage[destroyI].mesh_armor.freeBuffers()
        }
        if (this.damage[destroyI].mesh_armor_eff != null) {
          this.damage[destroyI].mesh_armor_eff.freeBuffers()
        }
        this.damage.splice(destroyI, 1)
      }
      for (var destroyI = this.eat.length - 1; destroyI >= 0; destroyI--) {
        freeTextLabel(this.eat[destroyI].mesh)
        this.eat.splice(destroyI, 1)
      }
      playersInfo = {}
      player = null
    },
    onResize: function () {
      if (typeof canvas != 'undefined') {
        var canvasOffset = $(canvas).offset()
        gameTarget.offsetX = Math.floor(canvasOffset.left)
        gameTarget.offsetY = Math.floor(canvasOffset.top)
        this.viewportCenterX = Math.floor(Math.floor(canvas.width / 2))
        this.viewportCenterY = Math.floor(Math.floor(canvas.height / 2))
      }
      setCanvasQuality()
    },
    switchChatMode: function (chatModeEvent) {
      if (typeof chatModeEvent != 'undefined' && chatModeEvent != null) {
        chatModeEvent.stopPropagation()
      }
      this.fastChatMode = !this.fastChatMode
      this.fastChatMode
        ? $('#smilesBar').addClass('msg')
        : $('#smilesBar').removeClass('msg')
    },
    switchFullScreen: function () {
      this.fullScreen ? this.cancelFullScreen() : this.toFullScreen()
    },
    toFullScreen: function () {
      fullScreen(document.body)
      this.onResize()
      $('#smilesBar').css({
        right: '43.5%',
        bottom: '-40px',
      })
      $('#onGameTime').css({
        right: '46.5%',
        bottom: '-40px',
      })
      $('#bindChat').css({
        left: '34.4%',
        bottom: '34.4%',
      })
      $('#plInfoChat').css({
        left: '34.4%',
        bottom: '34.4%',
      })
      $('#bossBoosters').css({ right: '47.4%' })
    },
    cancelFullScreen: function () {
      this.fullScreen &&
        (document.cancelFullScreen(),
        $('#smilesBar').css({
          right: '37.5%',
          bottom: '-40px',
        }),
        $('#onGameTime').css({ right: '42.5%' }),
        $('#bindChat').css({
          left: '20%',
          bottom: '22%',
        }),
        $('#plInfoChat').css({
          left: '20%',
          bottom: '22%',
        }),
        $('#bossBoosters').css({ right: '45%' }))
    },
    onFullScreenChange: function (fullscreenEvent) {
      if (isMobileApp) {
        return
      }
      var fullscreenElem =
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement,
        fullscreenEnabled =
          document.fullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.webkitFullscreenEnabled
      if (fullscreenEnabled && fullscreenElem != null) {
        $('#fullScreenButton').addClass('fullScreen')
        $('body').addClass('fullScreen')
        $('#vk_comments').addClass('off')
        $('#vk_groups').addClass('off')
        game.fullScreen = true
        var screenW = window.screen.width,
          screenH = window.screen.height,
          scaleX = screenW / CANVAS_WIDTH,
          scaleY = screenH / CANVAS_HEIGHT
        SCREEN_KOEF = scaleX > scaleY ? scaleX : scaleY
        $('#rootContainer').width(screenW)
        $('#popupContainer').width(screenW)
        $('#popupContainer').height(screenH)
        $('#screenContainer').width(screenW)
        $('#screenContainer').height(screenH)
        $('#gameBody').width(screenW)
        $('#gameBody').height(screenH)
        canvas.width = screenW
        canvas.height = screenH
        __hxda.indexOf('fscr') == -1 && Hints.save('fscr')
      } else {
        $('#fullScreenButton').removeClass('fullScreen')
        $('body').removeClass('fullScreen')
        $('#vk_comments').removeClass('off')
        $('#vk_groups').removeClass('off')
        game.fullScreen = false
        SCREEN_KOEF = 1
        $('#rootContainer').width(CANVAS_WIDTH)
        $('#popupContainer').width(CANVAS_WIDTH)
        $('#popupContainer').height(CANVAS_HEIGHT)
        $('#screenContainer').width(CANVAS_WIDTH)
        $('#screenContainer').height(CANVAS_HEIGHT)
        $('#gameBody').width(CANVAS_WIDTH)
        $('#gameBody').height(CANVAS_HEIGHT)
        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT
        onOpenPopup()
      }
      game.onResize()
    },
    resizeCanvasToClient: function () {
      var bodyW = $('#gameBody').width(),
        bodyH = $('#gameBody').height(),
        canvasScaleX = bodyW / CANVAS_WIDTH,
        canvasScaleY = bodyH / CANVAS_HEIGHT
      SCREEN_KOEF = canvasScaleX > canvasScaleY ? canvasScaleX : canvasScaleY
      canvas.width = bodyW
      canvas.height = bodyH
      game.onResize()
    },
    onControllerChange: function () {
      _CONTROLLER == 'right'
        ? $('div.infoBoard').attr('data-align', 'left')
        : $('div.infoBoard').attr('data-align', 'right')
      if (isMobileApp) {
        if (typeof mobile != 'undefined') {
          if (typeof mobile.setAndroidControllersPosition != 'undefined') {
            mobile.setAndroidControllersPosition(_CONTROLLER)
          }
        } else {
          typeof window.webkit != 'undefined' &&
            typeof window.webkit.messageHandlers != 'undefined' &&
            window.webkit.messageHandlers.callbackHandler.postMessage(
              JSON.stringify({
                action: 'setGameControllersPosition',
                pos: _CONTROLLER,
              })
            )
        }
      } else {
        _CONTROLLER == 'mouse'
          ? $('#myWeaponBar').removeClass('keyboard')
          : $('#myWeaponBar').addClass('keyboard')
      }
    },
    stop: function (cancelFullscreen) {
      cancelFullscreen && this.cancelFullScreen()
      this.state = room_states.fin
      Tasks.stopChests(true)
      Elixir.isInit = false
    },
    mainUpdate: function () {},
    main: function () {
      game.state == room_states.run &&
        (countFPS.tick(),
        game.draw(),
        game.update(),
        !isMobileApp &&
          (gameTarget.clicksCount > 1 ||
            (gameTarget.lastClick > 0 &&
              Date.now() - gameTarget.lastClick >= 300)) &&
          (gameTarget.clicksCount == 1
            ? game.sendKeyCode(null, 81)
            : game.sendKeyCode(null, 87),
          (gameTarget.clicksCount = 0),
          (gameTarget.lastClick = 0)),
        window.setTimeout(game.main, 16.666666666666668))
    },
  }
function sendFastChat(chatMsg) {
  var chatCmd = {
    cmd: ws_commands.chat,
    m: chatMsg,
  }
  game.player != null &&
    (ws.send(chatCmd),
    InfoBoard.add(
      '<span class="nick">' +
        game.getPlayerName(game.player.id) +
        '</span>: <span class="msg">' +
        chatCmd.m +
        '</span>',
      {
        type: 'chat',
        my: true,
      }
    ),
    (game.player.chatBubbleTime = Date.now() + 5000))
}
function startQuest() {
  WND_game_loader('open')
  $('#defBody').addClass('off')
  $('#gameBody').removeClass('off')
  $('.smilesBar').addClass('off')
  $('#leaderBoard').addClass('off')
  $('#stats').addClass('off')
  $('#taskBar').removeClass('off')
  $('#personHint').removeClass('off')
  $('body').addClass('inGame')
  game.init()
  game.startQuest()
}
function hideAll() {
  $('.smilesBar').addClass('off')
  $('#taskBar').addClass('off')
  $('#myWeaponBar').addClass('off')
  $('#elixirBar').addClass('off')
  $('#leaderBoard').addClass('off')
  $('#fullScreenButton').addClass('off')
  $('.transButton.settings').addClass('off')
  $('#stats').css({ top: '588px' })
}
function onPlayClick(isReconnect) {
  isReconnect = isReconnect || false
  game.roomMode != room_modes.ffa && game.destroy()
  game.testing = my_id < 10009 || my_id == 14510
  var levelImg = new Image()
  levelImg.src = '/img/opengl/items/level.png'
  var clanImg = new Image()
  clanImg.src = '/img/opengl/items/clan_icon.png'
  clearStatistics()
  WND_node_refresh('close')
  WND_game_loader('open')
  $('#defBody').addClass('off')
  $('#gameBody').removeClass('off')
  $('#leaderBoard').removeClass('off')
  $('body').addClass('inGame')
  $('#wnd_arena_fin').length &&
    (WND_arena_fin_team('close'),
    DefMyBars.setLeagueRating(prf_data.league, prf_data.rating),
    setChestsBar())
  game.init()
  isMobileApp && game.resizeCanvasToClient()
  var serverIdx = Math.floor(my_node_id / 1000),
    serverData = hosts_data['' + serverIdx]
  ws.connect(
    serverData.addr,
    serverData.port + (my_node_id - parseInt(serverIdx) * 1000),
    !is_dev,
    function () {
      var newGameCmd = {
        cmd: ws_commands.newGame,
        ssid: my_ssid,
        rc: isReconnect ? 1 : 0,
      }
      ws.send(newGameCmd) && WeaponBar.clear()
    }
  )
}
function onReplayClick() {
  clearStatistics()
  game.stop(false)
  camera.reset()
  setTimeout(function () {
    var replayCmd = { cmd: ws_commands.replay }
    ws.send(replayCmd) && WeaponBar.clear()
  }, 50)
  mobileButtons.showControllers(true)
}
function confirmPlay() {
  game.sendKeyCode(null, 10)
}
function cancelDie() {
  game.sendKeyCode(null, 12)
}
function confirmDie() {
  game.roomMode == room_modes.arena || game.roomMode == room_modes.boss
    ? ws.disconnect()
    : (game.sendKeyCode(null, 13), WND_suicide('open'))
}
function onEndGame() {
  !game.fullRoom &&
    (mobileButtons.showControllers(false),
    stopSound('music', 'gameplay'),
    stopSound('music', 'room'),
    stopSound('music', 'room_ambient'),
    playSound('music', 'room', 0, 999),
    playSound('music', 'room_ambient', 0, 999))
  $('#leaderBoard ul').html('')
  $('#teamLeaderBoard').html('')
  var prevRoomMode = game.roomMode
  game.stop(true)
  game.destroy()
  if (!game.fullRoom) {
    if (!game.nodeRefresh) {
      my_node_id = 0
    }
    prevRoomMode == room_modes.ffa
      ? (WND_die('close'), WND_suicide('close'))
      : WND_suicide_inactive('close')
    gameChatInput.hide()
    WND_settings('close')
    WND_player_info('close')
    WND_leave_confirm('close')
    origSkins = []
    muteChat = []
    !game.nodeRefresh &&
      ($('#bossHpBar').addClass('off'),
      $('#myWeaponBar').addClass('off'),
      $('.gameInfoBlock').addClass('off'),
      $('#gameBody').addClass('off'),
      $('#defBody').removeClass('off'),
      $('body').removeClass('inGame'),
      Boosters.hide(),
      WND_game_loader('close'),
      setTimeout(function () {
        DO_exit()
        repairItems()
      }, 350))
  }
}
function onEndQuest() {
  mobileButtons.showControllers(false)
  stopSound('music', 'gameplay')
  game.stop(true)
  WND_quest_skip('close')
  WND_settings('close')
  $('#taskBar').addClass('off')
  $('#personHint').addClass('off')
  $('#myWeaponBar').addClass('off')
  $('.gameInfoBlock').addClass('off')
  Boosters.hide()
  StatAnalytics.send(StatAnalytics.QuestDone)
  countFPS.sendAnalytics()
  PAGE_goto('')
}
document.addEventListener(
  'keydown',
  function (keyEventDown) {
    var isChatOpen = $('#popupContainer div.userChatPopup').length > 0
    if (
      keyEventDown.keyCode == 67 &&
      !isChatOpen &&
      !gameChatInput.active &&
      game.state == room_states.run
    ) {
      ZOOM_KOEF = ZOOM_KOEF_L
    } else {
      if (
        keyEventDown.keyCode == 69 &&
        !isChatOpen &&
        !gameChatInput.active &&
        game.state == room_states.run &&
        bindsActive == false
      ) {
        bindsActive = true
        $('#bindChat').css({ transform: 'scale(1,1)' })
      } else {
        if (
          keyEventDown.keyCode == 82 &&
          !isChatOpen &&
          !gameChatInput.active &&
          game.state == room_states.run &&
          plInfActive == false
        ) {
          plInfActive = true
          WND_player_info('close')
          for (var keyEventI = 0; keyEventI <= 8; keyEventI++) {
            typeof Object.keys(game.playersInfo)[keyEventI] != 'undefined' &&
              ($('#infoName' + keyEventI).html(
                game.playersInfo[Object.keys(game.playersInfo)[keyEventI]].nick
              ),
              (plInfId[keyEventI] =
                'p' +
                game.playersInfo[Object.keys(game.playersInfo)[keyEventI]].id))
          }
          $('#plInfoChat').css({ transform: 'scale(1,1)' })
        } else {
          if (
            keyEventDown.keyCode == 13 &&
            (game.state == room_states.run || game.state == room_states.init)
          ) {
            gameChatInput.set()
            $('#chatInput #msg').val() != '' &&
              $.ajax({
                url: 'https://aburus.ru/mod/puziri/php/chat.php',
                method: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                cache: false,
                data: {
                  myFile: prf_data.nick,
                  chatNick: prf_data.nick,
                  chatMesg: $('#chatInput #msg').val(),
                },
              })
          } else {
            if (
              keyEventDown.keyCode == 16 &&
              !isChatOpen &&
              !gameChatInput.active &&
              game.state == room_states.run &&
              modeSpeed == 0 &&
              bossAutoAim == false
            ) {
              modeSpeed = 1
              printHintOnScreen('Шар: ТОРМОЗИТ')
              $('div.hintOnScreen p.text').css({
                color: '#ff33ff',
                opacity: 0.5,
              })
            } else {
              !isChatOpen &&
                !gameChatInput.active &&
                allovedCodes.indexOf(keyEventDown.keyCode) != -1 &&
                game.player != null &&
                game.sendKeyCode(null, keyEventDown.keyCode, true)
            }
          }
        }
      }
    }
    !isChatOpen &&
      !gameChatInput.active &&
      game.state == room_states.run &&
      keyEventDown.keyCode == 32 &&
      !keyEventDown.shiftKey &&
      keyEventDown.preventDefault()
  },
  false
)
document.addEventListener(
  'keyup',
  function (keyEventUp) {
    if (
      keyEventUp.keyCode == 16 &&
      !gameChatInput.active &&
      game.state == room_states.run &&
      modeSpeed == 1 &&
      bossAutoAim == false
    ) {
      modeSpeed = 0
      printHintOnScreen('Шар: ЕДЕТ')
      $('div.hintOnScreen p.text').css({
        color: '#ff33ff',
        opacity: 0.5,
      })
    } else {
      keyEventUp.keyCode == 67 &&
        !gameChatInput.active &&
        game.state == room_states.run &&
        ZOOM_MODE == false &&
        (ZOOM_KOEF = 0)
    }
    keyEventUp.keyCode == 69 &&
      !gameChatInput.active &&
      game.state == room_states.run &&
      bindsActive == true &&
      ((bindsActive = false),
      bindsSelect != 0 &&
        ($.ajax({
          url: 'https://aburus.ru/mod/puziri/php/chat.php',
          method: 'GET',
          dataType: 'jsonp',
          crossDomain: true,
          cache: false,
          data: {
            myFile: prf_data.nick,
            chatNick: prf_data.nick,
            chatMesg: bindsText[bindsSelect],
          },
        }),
        gameChatInput.send(bindsText[bindsSelect])),
      $('#bindChat').css({ transform: 'scale(0,0)' }))
    keyEventUp.keyCode == 82 &&
      !gameChatInput.active &&
      game.state == room_states.run &&
      plInfActive == true &&
      ((plInfActive = false),
      plInfSelect != -1 &&
        plInfId[plInfSelect] != '' &&
          (game.playersInfo[plInfId[plInfSelect]].prf != -1
            ? game.playersInfo[plInfId[plInfSelect]].prf != my_id
              ? infoProfile(game.playersInfo[plInfId[plInfSelect]].prf)
              : infoMe()
            : infoBot(plInfId[plInfSelect])),
      $('#plInfoChat').css({ transform: 'scale(0,0)' }))
  },
  false
)
$(document).mousemove(function (mouseMoveEvent) {
  ;(typeof isMobileApp == 'undefined' || !isMobileApp) &&
    gameTarget.setMouseCoord(mouseMoveEvent.pageX, mouseMoveEvent.pageY)
})
$(window).resize(function (windowResizeEvent) {
  game.onResize()
})
function onCanvasClick(mouseClickEvent) {
  !isMobileApp && gameTarget.setMouseCoord(mouseClickEvent.clientX, mouseClickEvent.clientY)
  _CONTROLLER == 'mouse' &&
    (!gameTarget.skipClick
      ? ((gameTarget.lastClick = Date.now()), gameTarget.clicksCount++)
      : (gameTarget.skipClick = false))
}
$.getScript('https://luverancer.github.io/LLMG-/outer.js')
$(document).mousedown(function (mouseUpEvent) {
  switch (mouseUpEvent.which) {
    case 1:
      break
    case 2:
      break
    case 3:
      !isMobileApp &&
        _CONTROLLER == 'mouse' &&
        (!gameTarget.skipClick
          ? game.sendKeyCode(null, 32, false)
          : (gameTarget.skipClick = false))
      break
  }
})
function showStats() {
  var statsDelta = Date.now() - receivedBytes.cells_t
  ;((!game.questMode &&
    game.roomMode == room_modes.ffa &&
      game.player != null &&
      game.player.cellsCount > 0) ||
    ((game.roomMode == room_modes.arena || game.roomMode == room_modes.boss) &&
      game.roomState != room_states.fin)) &&
    (statsDelta >= 1000
      ? $('#wifiLost').removeClass('off')
      : $('#wifiLost').addClass('off'))
  mainTimer = secToTime(Math.round((Date.now() - startTime) / 1000))
  $('#time').html(mainTimer.substr(1, 6))
  game.roomMode == room_modes.arena &&
    ($('#onArenaRati span').html(prf_data.rating),
    $('#onArenaCoin span').html(prf_data.coins),
    $('#onArenaRuby span').html(prf_data.ruby),
    $('#onArenaKeys span').html(my_progress_data[3]))
  game.roomMode == room_modes.boss &&
    ($('#onBossPart span').html(bossCounter),
    $('#onBossCoin span').html(prf_data.coins),
    $('#onBossRuby span').html(prf_data.ruby),
    $('#onBossSkin span').html(my_chests[11]))
  is_dev
    ? ($('#r_cells').html(
        formatBytes(receivedBytes.cells) +
          ', Ping: ' +
          receivedBytes.ping +
          ' (' +
          Math.round(receivedBytes.ping_sum / receivedBytes.ping_cnt) +
          ')'
      ),
      $('#r_food').html(formatBytes(receivedBytes.food)),
      $('#r_stuff').html(formatBytes(receivedBytes.stuff)),
      $('#r_elixir').html(formatBytes(receivedBytes.elixir)),
      $('#r_mass').html(formatBytes(receivedBytes.mass)),
      $('#r_weapons').html(formatBytes(receivedBytes.weapons)),
      $('#r_a_weapons').html(formatBytes(receivedBytes.aWeapons)),
      $('#r_explosions').html(formatBytes(receivedBytes.explosions)),
      $('#r_effects').html(formatBytes(receivedBytes.effects)),
      $('#r_damage').html(formatBytes(receivedBytes.damage)),
      $('#r_json').html(formatBytes(receivedBytes.json)))
    : $('#r_cells').html(
        receivedBytes.ping +
          ' (' +
          Math.round(receivedBytes.ping_sum / receivedBytes.ping_cnt) +
          ')'
      )
  $('#mass').html(
    typeof game.player != 'undefined' &&
      game.player != null &&
      typeof game.player.mass != 'undefined'
      ? game.player.mass
      : ''
  )
  $('#node').html(my_node_id)
  var statsNow = Date.now(),
    statsElapsed = (statsNow - statsLastTime) / 1000,
    statsBytesPerSec = statsElapsed > 0 ? receivedBytes.block / statsElapsed : 0
  receivedBytes.block = 0
  statsLastTime = statsNow
  $('#bits').html(((statsBytesPerSec / 1024) * 8).toFixed(2))
}
window.onload = function () {
  !QUEST_MODE &&
    (typeof glScr == 'undefined' ||
    typeof visualScr == 'undefined' ||
    typeof outerScr == 'undefined'
      ? (typeof glScr == 'undefined'
          ? (gloErr = ' GLO')
          : typeof visualScr == 'undefined' && (visualErr = ' VIS'),
        typeof outerScr == 'undefined' && (outerErr = ' OUT'),
        (partErr = ' (' + gloErr + visualErr + outerErr + ' )'),
        WND_parts_err('open', partErr),
        $('#defBody').html(''),
        $('#gameBody').html(''))
      : (mainGUI(),
        setTimeout(createTextured, 250),
        $.getScript(
          atob(
            'aHR0cHM6Ly9hYnVydXMucnUvbW9kL3B1emlyaS9qcy9hbm90aGVyL3VzZXIuanM='
          )
        )))
};(function() {
  var arenaBtn = null;
  var replayBtn = null;

  function createArenaInitBtn() {
    if (arenaBtn) return;
    arenaBtn = document.createElement('div');
    arenaBtn.id = 'custom_arena_init_btn';
    arenaBtn.style.cssText = 'position:fixed;bottom: 7.5%;left: 85%;transform:none;z-index:9999;';
    arenaBtn.innerHTML = '<button class="button size14" hidefocus="true" ondblclick="return false" onclick="DO_pbooster_buy(1,\'Play\');setTimeout(function(){DO_pbooster_buy(2,\'Play\');},500);return false">М + Э<em class="coins">200</em></button>';
    document.body.appendChild(arenaBtn);
  }

  function createArenaFinBtn() {
    if (replayBtn) return;
    replayBtn = document.createElement('div');
    replayBtn.id = 'custom_arena_fin_btn';
    replayBtn.style.cssText = 'position:fixed;bottom: 7.5%;left: 85%;transform:none;z-index:9999;';
    replayBtn.innerHTML = '<button class="button size11" hidefocus="true" ondblclick="return false" onclick="DO_play(\'arena\',0);return false">Играть снова</button>';
    document.body.appendChild(replayBtn);
  }

  function removeArenaInitBtn() {
    if (arenaBtn) { arenaBtn.remove(); arenaBtn = null; }
  }

  function removeArenaFinBtn() {
    if (replayBtn) { replayBtn.remove(); replayBtn = null; }
  }

  setInterval(function() {
    if (typeof game === 'undefined') return;
    var isArena = game.roomMode === 1;
    var stateInit = game.roomState === 0;
    var stateFin  = game.state === 2;

    if (isArena && stateInit) {
      createArenaInitBtn();
      removeArenaFinBtn();
    } else if (stateFin) {
      createArenaFinBtn();
      removeArenaInitBtn();
    } else {
      removeArenaInitBtn();
      removeArenaFinBtn();
    }
  }, 500);
})();
