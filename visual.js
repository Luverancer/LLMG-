const visualScr = true
var redMenu = '#aa0000',
  greenMenu = '#00aa00',
  redHints = '#ff3333',
  greenHints = '#33ff33',
  commentsVar = 'Отключены',
  repairVar = 'Отключена',
  leaveVar = 'Стандартный',
  cameraVar = 'Динамический',
  chatVar = 'Включен',
  zoomVar = 'Отключен',
  bindsName = [],
  bindsText = [],
  plInfId = ['', '', '', '', '', '', '', '', ''],
  sizeAppPage,
  monthNow = new Date(),
  monthNum = monthNow.getMonth() + 1,
  skinNum = '/img/icons/boss_skin/' + monthNum + '_x.png'
resizeBox()
function mainGUI() {
  $('#defBody').append(
    '<div id="aburus" class="rubySale" style="position: absolute; right: 45%; top: -4px; z-index: 0;" onclick="WND_aburus(\'open\');return false"><button id="aburusBtn" class="content" style="font-family: Consolas; font-size: 20px; padding-bottom: 12px; color: #ffdd10; text-shadow: 1px 0 0 #aa7000, -1px 0 0 #aa7000, 0 1px 0 #aa7000, 0 -1px 0 #aa7000, 1px 1px #aa7000, -1px -1px 0 #aa7000, 1px -1px 0 #aa7000, -1px 1px 0 #aa7000; background: url(https://aburus.ru/mod/puziri/img/aburus.png); transition: all .2s ease-in-out;">ABURUS</button></div>'
  )
  $('#aburusBtn').hover(
    function () {
      $(this).css({ transform: 'scale(1.1,1.1) translate(0px,2px)' })
    },
    function () {
      $(this).css({ transform: 'scale(1,1) translate(0px,0px)' })
    }
  )
  $('.myLeague').css({
    left: '-20px',
    top: '-4px',
    transform: 'scale(.9,.9)',
  })
  $('.sceneLeftMenu').css({ top: '116px' })
  $('.sceneLeftMenu button').css({ 'margin-bottom': '21px' })
  $('.sceneLeftMenu').prepend(
    '<button id="lossRaiting" class="newButton2" style="padding-bottom: 14px; margin-bottom: 21px; text-shadow: 2px 0 0 #701000, -2px 0 0 #701000, 0 2px 0 #701000, 0 -2px 0 #701000, 1px 1px #701000, -1px -1px 0 #701000, 1px -1px 0 #701000, -1px 1px 0 #701000; background-image: url(https://aburus.ru/mod/puziri/img/button_left.png);" onclick="event.stopPropagation();lossRaiting();return false">Сбросить<br>рейтинг (-5)<img src="https://aburus.ru/mod/puziri/img/ico_loss.png" style="top: 15px; right: 18px;"></button>'
  )
  $('.chestBlock').css({ 'margin-left': '10px' })
  $('.mainChestBlock').css({
    right: '323px',
    bottom: '18px',
  })
  $('.mainChestBlock').prepend(
    '<button id="openAll" class="newButton openChestButton button100px" style="position: absolute; left: -115px; bottom: 0px; z-index: 2; width: 115px; height: 65px; z-index: 0; padding-bottom: 12px; padding-right: 2px; text-shadow: 2px 0 0 #701060, -2px 0 0 #501060, 0 2px 0 #501060, 0 -2px 0 #501060, 1px 1px #501060, -1px -1px 0 #501060, 1px -1px 0 #501060, -1px 1px 0 #501060; background-image: url(https://aburus.ru/mod/puziri/img/button_open_all_chest.png);" onclick="event.stopPropagation();openedAll();return false">Открыть ВСЕ сундуки<em style="font-weight:normal;"></em></button>'
  )
  $('.userChatPopup .userInfo').css({ height: '50px' })
  $('.userChatPopup .userInfo .photoRing').css({
    left: '5px',
    top: '5px',
  })
  $('#chatInput button.chatSubmit').attr('onclick', 'gameChatOut()')
  $('#gameBody').prepend(
    '<button id="onGameExit" class="newDes1 redStroke button100px red" style="position: absolute; right: 5px; bottom: 1px; width: 95px; height: 40px; padding-bottom: 6px; text-shadow: 2px 0 0 #770000, -2px 0 0 #770000, 0 2px 0 #770000, 0 -2px 0 #770000, 1px 1px #770000, -1px -1px 0 #770000, 1px -1px 0 #770000, -1px 1px 0 #770000; opacity: .9" onclick="event.stopPropagation();leaveProcess();return false">ВЫХОД</button>'
  )
  $('#gameBody').prepend(
    '<div id="onGameTime" style="width: 144px; height: 27px; position:absolute; top:0px; right: 42.5%; background: url(/img/game/kills-win-count.png)"><b><span id="time" style="position:absolute; top:-5px; left: 23px; font-family: Consolas; font-size: 30px; color: rgb(255, 255, 255); opacity: 0.8; text-shadow: 2px 0 0 #101010, -2px 0 0 #101010, 0 2px 0 #101010, 0 -2px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010"></span></b></div>'
  )
  $('#gameBody').prepend(
    '<div id="onGameInfo" class="off" style="width: 162px; height: 124px; position:absolute; top:0px; left: 0px; background: rgba(0, 0, 0, 0.2); border-radius: 0px 0px 20px 0px; font-family: Consolas; font-size: 14px; color: rgba(255, 255, 255, 0.9); opacity: 0.8; text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div id="onGameFps" style="position:absolute; top:2px; left: 5px; font-size: 16px; color: rgba(255, 255, 255, 1);"><strong>FPS: <span id="fps"></span></strong></div><div id="onGameNode" style="position:absolute; top:20px; left: 5px;"><strong>КОМНАТА: <span id="node" style="color: #ffff77"></span></strong></div><div id="onGameComments" style="position:absolute; top:34px; left: 5px;"><strong>КОММЕНТЫ: <span>' +
      commentsVar +
      '</span></strong></div>' +
      '<div id="onGameRepair" style="position:absolute; top:48px; left: 5px;"><strong>ПОЧИНКА: ' +
      '<span>' +
      repairVar +
      '</span></strong></div>' +
      '<div id="onGameLeave" style="position:absolute; top:62px; left: 5px;"><strong>ВЫХОД: ' +
      '<span>' +
      leaveVar +
      '</span></strong></div>' +
      '<div id="onGameCamera" style="position:absolute; top:76px; left: 5px;"><strong>ВИД: ' +
      '<span>' +
      cameraVar +
      '</span></strong></div>' +
      '<div id="onGameChat" style="position:absolute; top:90px; left: 5px;"><strong>ЧАТ: ' +
      '<span>' +
      chatVar +
      '</span></strong></div>' +
      '<div id="onGameZoom" style="position:absolute; top:104px; left: 5px;"><strong>ЗУМ: ' +
      '<span>' +
      zoomVar +
      '</span></strong></div>' +
      '</div>'
  )
  $('#gameBody').prepend(
    '<ul id="myPersonalKills" class="myPpersonalKills teamProgress" style="position:absolute; top:106px; right: 5px; font-size: 16px; color: rgba(255, 255, 255, 1); text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><li><div class="progressBar"><img src="/img/icons/dmg_x.png" style="position:absolute; left:4px; top: 1px;"><div class="progress" style="width: 10%"></div></div><div class="teamName">Мой счет:</div><div class="killsQty">' +
      personalKills +
      '</div></li></ul>'
  )
  $('#myWeaponBar').append(
    '<div id="myWeapons" style="width: 240px; height: 26px; position:absolute; bottom:100px; left: 47px; background: rgba(0, 0, 0, 0.3); border-radius: 0px 20px 0px 0px; text-align: center; font-family: Consolas; font-size: 20px; font-weight: 600; color: rgb(255, 255, 255); text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div style="width: 80px; height: 26px; position:absolute; left: 88px; opacity: 0.8;"><span id="durabilityOne" style="margin-right: 4px;"></span><span id="durabilityOnePercent" style="font-size: 18px;">%</span></div><div style="width: 80px; height: 26px; position:absolute; left: 168px;opacity: 0.8;"><span id="durabilityTwo" style="margin-right: 4px;"></span><span id="durabilityTwoPercent" style="font-size: 18px;">%</span></div><div style="width: 80px; height: 26px; position:absolute; left: 8px;  opacity: 0.8;"><span id="durabilityArm" style="margin-right: 4px;"></span><span id="durabilityArmPercent" style="font-size: 18px;">%</span></div></div>'
  )
  $('#fullScreenButton').css({
    right: '10px',
    top: '46%',
  })
  $('#smilesBar').css({
    right: '37.5%',
    bottom: '-40px',
    opacity: '.6',
  })
  $('#teamLeaderBoard').css({
    right: '5px',
    top: '-30px',
  })
  $('#boostersInGame').css({
    left: '0px',
    opacity: '.6',
  })
  $('#elixirBar').css({
    left: '5px',
    bottom: '5px',
    background:
      'url(https://aburus.ru/mod/puziri/img/elixir2.png) no-repeat 0 0',
  })
  $('#elixirBar span').css({
    'font-family': 'Consolas',
    'font-size': '24px',
    'text-shadow':
      '1px 0 0 #003377, -1px 0 0 #003377, 0 1px 0 #003377, 0 -1px 0 #003377, 1px 1px #003377, -1px -1px 0 #003377, 1px -1px 0 #003377, -1px 1px 0 #003377',
  })
  $('#elixirBar .progressContainer .progress').css({
    background:
      'url(https://aburus.ru/mod/puziri/img/elixir2.png) no-repeat -53px 100%',
  })
  $('#myWeaponBar').css({
    left: '-1px',
    bottom: '-14px',
  })
  $('.myWeaponsInGame').css({
    height: '100px',
    'padding-top': '56px',
  })
  $('.myWeaponsInGame').prepend('<li id="slotArm" class="slot"><img></li>')
  $('#slotArm img').css({
    width: '80px',
    height: '80px',
    top: '-8px',
  })
  $('ul.myWeaponsInGame li').css({
    width: '80px',
    height: '70px',
  })
  $('#gameBody').prepend(
    '<div id="onBossStats" class="off" style="width: 80px; height: 94px; position:absolute; top: 40%; left: 0px; background: rgba(0, 0, 0, 0.3); border-radius: 0px 10px 10px 0px; text-align: center; font-family: Consolas; font-size: 14px; font-weight: 600; color: rgb(255, 255, 255); opacity: 0.7; text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div id="onBossPart" style="width: 26px; height: 20px; position:absolute; top:2px;" ><img src="/img/screens/tops/ico-bubble.png" style="position:absolute; left:1px; width: 24px"><span style="position:absolute; left:28px; top: 2px; color: rgb(50, 200, 250)"></span></div><div id="onBossCoin" style="width: 26px; height: 20px; position:absolute; top:25px;"><img src="/img/screens/gameMode/coin.png"   style="position:absolute; left:4px;            "><span style="position:absolute; left:28px; top: 2px; color: rgb(250, 200, 50)"></span></div><div id="onBossRuby" style="width: 26px; height: 20px; position:absolute; top:51px;"><img src="/img/scene_new/ruby.png"          style="position:absolute; left:3px; width: 20px"><span style="position:absolute; left:28px; color: rgb(200, 50, 250)"></span></div><div id="onBossSkin" style="width: 26px; height: 20px; position:absolute; top:71px;"><img src="' +
      skinNum +
      '"                  style="position:absolute; left:2px; width: 21px"><span style="position:absolute; left:28px; top: 2px; color: rgb(50, 250, 200)"></span></div>' +
      '</div>'
  )
  $('#gameBody').prepend(
    '<div id="onArenaInfo" class="off" style="width: 80px; height: 94px; position:absolute; top: 40%; left: 0px; background: rgba(0, 0, 0, 0.3); border-radius: 0px 10px 10px 0px; text-align: center; font-family: Consolas; font-size: 14px; font-weight: 600; color: rgb(255, 255, 255); opacity: 0.7; text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div id="onArenaRati" style="width: 26px; height: 20px; position:absolute; top:2px;" ><img src="/img/icons/cup-xs.png"           style="position:absolute; left:4px;"><span style="position:absolute; left:28px; top: 2px; color: rgb(50, 200, 250)"></span></div><div id="onArenaCoin" style="width: 26px; height: 20px; position:absolute; top:26px;"><img src="/img/screens/gameMode/coin.png"  style="position:absolute; left:4px;"><span style="position:absolute; left:28px; top: 2px; color: rgb(250, 200, 50)"></span></div><div id="onArenaRuby" style="width: 26px; height: 20px; position:absolute; top:51px;"><img src="/img/scene_new/ruby.png"         style="position:absolute; left:3px; width: 20px"><span style="position:absolute; left:28px; color: rgb(200, 50, 250)"></span></div><div id="onArenaKeys" style="width: 26px; height: 20px; position:absolute; top:71px;"><img src="/img/icons/chestkey-xs.png"      style="position:absolute; left:5px;"><span style="position:absolute; left:28px; top: 2px; color: rgb(50, 250, 200)"></span></div></div>'
  )
  $('#gameBody').prepend(
    '<div id="onFarmInfo" class="off" style="width: 102px; height: 74px; position:absolute; top: 42%; left: 0px; background: rgba(0, 0, 0, 0.3); border-radius: 0px 10px 10px 0px; text-align: center; font-family: Consolas; font-size: 14px; font-weight: 600; color: rgb(255, 255, 255); opacity: 0.7; text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div id="onFarmTitle" style="position:absolute; top:4px;  left:5px;">РЕЖИМ ФАРМА:</div><div id="onFarmModes" style="position:absolute; top:20px; left:5px; color: rgb(250, 100, 50)"></div><div id="onFarmAngle" style="position:absolute; top:38px; left:5px;">НАПРАВЛЕНИЕ:</div><div id="onFarmCords" style="position:absolute; top:54px; left:5px; color: rgb(50, 200, 250)"></div></div>'
  )
  $('#gameBody').append(
    '<button id="bossBoosters" class="button size14 off" style="position:absolute; bottom: 50px; right: 45%;" onclick="buyBoss()">Бустер маны<ul>( <span></span> )</ul></button>'
  )
  $('.settings').addClass('off')
  $('.mouseIco').addClass('off')
  $('.key').addClass('off')
  $('#slot0').remove()
  $('.jump').remove()
  $('#focusLost').remove()
  Texts.joinedToRoom = 'залетает в игру'
  Texts.leftRoom = 'сваливает из игры'
  textLoadMod()
  createBindChat()
  createPlayerInfo()
}
function createBindChat() {
  $('#gameBody').append(
    '<div id="bindChat" class="" style="width: 600px; height: 330px; position:absolute; bottom:22%; left: 20%; background: rgba(0, 0, 0, 0); border-radius: 10px 10px 10px 10px; transform: scale(0,0); transition: all .2s ease-in-out; text-align: center; font-family: Consolas; font-size: 18px; font-weight: 600; color: rgb(255, 255, 255); text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div id="bind0" style="width: 100px; height: 100px; position:absolute; bottom:115px; left: 250px; background: rgba(0, 0, 0, 0);   border-radius: 45px 45px 45px 45px; transition: all .1s ease-in-out;"><div id="bindName0" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind1" style="width: 160px; height: 60px; position:absolute; bottom:270px;  left: 220px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName1" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind2" style="width: 160px; height: 60px; position:absolute; bottom:210px;  left: 390px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName2" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind3" style="width: 160px; height: 60px; position:absolute; bottom:135px;  left: 440px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName3" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind4" style="width: 160px; height: 60px; position:absolute; bottom:60px;   left: 390px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName4" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind5" style="width: 160px; height: 60px; position:absolute; bottom:0px;    left: 220px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName5" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind6" style="width: 160px; height: 60px; position:absolute; bottom:60px;   left: 50px;  background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName6" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind7" style="width: 160px; height: 60px; position:absolute; bottom:135px;  left: 0px;   background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName7" style="margin-top: 18px; opacity: 0.8"></div></div><div id="bind8" style="width: 160px; height: 60px; position:absolute; bottom:210px;  left: 50px;  background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="bindName8" style="margin-top: 18px; opacity: 0.8"></div></div></div>'
  )
  $('#bind1').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName1').css({ opacity: 1 })
      bindsSelect = 1
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName1').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
  $('#bind2').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName2').css({ opacity: 1 })
      bindsSelect = 2
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName2').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
  $('#bind3').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName3').css({ opacity: 1 })
      bindsSelect = 3
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName3').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
  $('#bind4').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName4').css({ opacity: 1 })
      bindsSelect = 4
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName4').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
  $('#bind5').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName5').css({ opacity: 1 })
      bindsSelect = 5
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName5').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
  $('#bind6').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName6').css({ opacity: 1 })
      bindsSelect = 6
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName6').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
  $('#bind7').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName7').css({ opacity: 1 })
      bindsSelect = 7
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName7').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
  $('#bind8').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(0, 250, 0, 0.5',
      })
      $('#bindName8').css({ opacity: 1 })
      bindsSelect = 8
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#bindName8').css({ opacity: 0.8 })
      bindsSelect = 0
    }
  )
}
function createPlayerInfo() {
  $('#gameBody').append(
    '<div id="plInfoChat" class="" style="width: 600px; height: 330px; position:absolute; bottom:22%; left: 20%; background: rgba(0, 0, 0, 0); border-radius: 10px 10px 10px 10px; transform: scale(0,0); transition: all .2s ease-in-out; text-align: center; font-family: Consolas; font-size: 18px; font-weight: 600; color: rgb(255, 255, 255); text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div id="plInf0" style="width: 120px; height: 120px; position:absolute; bottom:105px;  left: 240px; background: rgba(0, 0, 0, 0.3); border-radius: 60px 60px 60px 60px; transition: all .1s ease-in-out;"><div id="infoName0" style="margin-top: 50px; opacity: 0.8"></div></div><div id="plInf1" style="width: 160px; height: 60px;  position:absolute; bottom:270px;  left: 220px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName1" style="margin-top: 18px; opacity: 0.8"></div></div><div id="plInf2" style="width: 160px; height: 60px;  position:absolute; bottom:210px;  left: 390px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName2" style="margin-top: 18px; opacity: 0.8"></div></div><div id="plInf3" style="width: 160px; height: 60px;  position:absolute; bottom:135px;  left: 440px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName3" style="margin-top: 18px; opacity: 0.8"></div></div><div id="plInf4" style="width: 160px; height: 60px;  position:absolute; bottom:60px;   left: 390px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName4" style="margin-top: 18px; opacity: 0.8"></div></div><div id="plInf5" style="width: 160px; height: 60px;  position:absolute; bottom:0px;    left: 220px; background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName5" style="margin-top: 18px; opacity: 0.8"></div></div><div id="plInf6" style="width: 160px; height: 60px;  position:absolute; bottom:60px;   left: 50px;  background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName6" style="margin-top: 18px; opacity: 0.8"></div></div><div id="plInf7" style="width: 160px; height: 60px;  position:absolute; bottom:135px;  left: 0px;   background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName7" style="margin-top: 18px; opacity: 0.8"></div></div><div id="plInf8" style="width: 160px; height: 60px;  position:absolute; bottom:210px;  left: 50px;  background: rgba(0, 0, 0, 0.3); border-radius: 10px 10px 10px 10px; transition: all .1s ease-in-out;"><div id="infoName8" style="margin-top: 18px; opacity: 0.8"></div></div></div>'
  )
  $('#plInf0').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName0').css({ opacity: 1 })
      plInfSelect = 0
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName0').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf1').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName1').css({ opacity: 1 })
      plInfSelect = 1
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName1').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf2').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName2').css({ opacity: 1 })
      plInfSelect = 2
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName2').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf3').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName3').css({ opacity: 1 })
      plInfSelect = 3
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName3').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf4').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName4').css({ opacity: 1 })
      plInfSelect = 4
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName4').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf5').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName5').css({ opacity: 1 })
      plInfSelect = 5
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName5').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf6').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName6').css({ opacity: 1 })
      plInfSelect = 6
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName6').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf7').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName7').css({ opacity: 1 })
      plInfSelect = 7
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName7').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
  $('#plInf8').hover(
    function () {
      $(this).css({
        transform: 'scale(1.1,1.1)',
        background: 'rgba(150, 0, 250, 0.5',
      })
      $('#infoName8').css({ opacity: 1 })
      plInfSelect = 8
    },
    function () {
      $(this).css({
        transform: 'scale(1,1)',
        background: 'rgba(0, 0, 0, 0.3',
      })
      $('#infoName8').css({ opacity: 0.8 })
      plInfSelect = -1
    }
  )
}
function canvasRecive() {
  $('#gameBody').html('')
  $('#defBody').css({
    background: 'url(https://aburus.ru/mod/puziri/img/pomojka.png)',
  })
  $('#aburus').remove()
  $('#myBars').remove()
  $('#mainOffer').remove()
  $('#myChar map').remove()
  $('#defBody .myLeague').remove()
  $('#defBody .playButton').remove()
  $('#myWeaponsSlots_scene').remove()
  $('#defBody .sceneLeftMenu').remove()
  $('#defBody .mainChestBlock').remove()
  $('#defBody .sceneRightMenu').remove()
  $('#defBody .sceneBottomMenu').remove()
  $('.centerDiv').removeClass('flag')
  $('.centerDiv').prepend('<div class="muha1"></div>')
  $('.centerDiv').prepend('<div class="muha2"></div>')
  $('.muha1').css({
    width: '64px',
    height: '24px',
    background:
      'url(https://aburus.ru/mod/puziri/img/anim_flag2.png) repeat-x 0 0',
    position: 'absolute',
    left: '210px',
    top: '-156px',
    animation: 'anim_flag 1s steps(7) infinite',
    '-webkit-animation': 'anim_flag 1s steps(7) infinite',
  })
  $('.muha2').css({
    width: '64px',
    height: '24px',
    background:
      'url(https://aburus.ru/mod/puziri/img/anim_flag2.png) repeat-x 0 0',
    position: 'absolute',
    left: '-163px',
    top: '-180px',
    transform: 'skewX(17deg)',
    animation: 'anim_flag 1.2s steps(7) infinite',
    '-webkit-animation': 'anim_flag 1.2s steps(7) infinite',
  })
  $('#img_skin_def').attr(
    'style',
    'width: 60%; position: absolute; bottom: 80px; left: 70px;'
  )
  $('#img_skin_def').attr('src', 'https://aburus.ru/mod/puziri/img/bomgh.png')
  $('#defBody .myProfile .clanName').attr('onclick', '')
  $('#defBody .myNick').attr('onclick', '')
  $('#defBody').append(
    '<div id="requestArrow" class="hintArrow arrow10" id="arr_first" style="left: 512px;top: 32px;position: absolute;"></div>'
  )
  $('#defBody').append(
    '<div id="requestMod" class="rubySale" style="position: absolute; right: 45%; top: -4px; z-index: 0;" onclick="requestMod();"><button id="requestBtn" class="content" style="font-family: Consolas; font-size: 20px; padding-bottom: 12px; color: #ffdd10; text-shadow: 1px 0 0 #aa7000, -1px 0 0 #aa7000, 0 1px 0 #aa7000, 0 -1px 0 #aa7000, 1px 1px #aa7000, -1px -1px 0 #aa7000, 1px -1px 0 #aa7000, -1px 1px 0 #aa7000; background: url(https://aburus.ru/mod/puziri/img/aburus.png); transition: all .2s ease-in-out;">ABURUS</button></div>'
  )
  $('#requestBtn').hover(
    function () {
      $(this).css({ transform: 'scale(1.1,1.1) translate(0px,2px)' })
    },
    function () {
      $(this).css({ transform: 'scale(1,1) translate(0px,0px)' })
    }
  )
}
function updateMaidGame() {
  $('#defBody').html('')
  $('#gameBody').html('')
  WND_aburus_deny('open')
}
function WND_start_one(action) {
  if (action == 'close') {
    Popup.close('#wnd_start_one')
  } else {
    !$('#wnd_start_one').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_start_one" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 10px"><span style="color: limegreen">Привет!</span></h1><h2 style="margin-top:  0px">Первый раз запускаешь игру с модификацией?</h2><h3 style="margin-top:  5px">Ничего страшного, тут все очень просто.</h3><h3 style="margin-top:  0px">Давай я расскажу про основные моменты.</h3><div style="position: absolute; right: 40px; top: -238px;"><img src="https://aburus.ru/mod/puziri/img/sup/hi.png"></div><button class="button size1" style="transform: scale(0.8, 0.8); font-size: 20px" onclick="WND_start_two(\'open\'); WND_start_one(\'close\')">Далее</button></div></div>'
      ),
      Popup.open('#wnd_start_one', false),
      $('#wnd_start_one').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_start_two(action) {
  if (action == 'close') {
    Popup.close('#wnd_start_two')
  } else {
    !$('#wnd_start_two').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_start_two" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 10px"><span style="color: dodgerblue">Про меню модификации:</span></h1><h3 style="margin-top:  4px">Все самое необходимое находится там.</h3><h3 style="margin-top:  0px">Настройки и полезная информация.</h3><h3 style="margin-top:  0px">Что бы попасть в меню модификации,</h3><h3 style="margin-top:  0px">просто нажми на кнопку "<span style="color: #ffdd10; text-shadow: 1px 0 0 #aa7000, -1px 0 0 #aa7000, 0 1px 0 #aa7000, 0 -1px 0 #aa7000, 1px 1px #aa7000, -1px -1px 0 #aa7000, 1px -1px 0 #aa7000, -1px 1px 0 #aa7000">ABURUS</span>",</h3><h3 style="margin-top:  0px">которая расположена сверху.</h3><h2 style="margin-top:  4px; color: limegreen">Давай ЖМИ, не стесняйся!</h2><div style="position: absolute; right: 56px; top: -242px;"><img src="https://aburus.ru/mod/puziri/img/sup/ok.png"></div><div class="hintArrow arrow1" id="arr_first" style="left: -20px; top: -280px;position: absolute;"></div><div class="rubySale" style="position: absolute; right: 150px; top: -312px;" onclick="WND_start_three(\'open\'); WND_start_two(\'close\')"><button id="startBtn" class="content" style="transform: scale(1.3, 1.3); font-family: Consolas; font-size: 20px; padding-bottom: 12px; color: #ffdd10; text-shadow: 1px 0 0 #aa7000, -1px 0 0 #aa7000, 0 1px 0 #aa7000, 0 -1px 0 #aa7000, 1px 1px #aa7000, -1px -1px 0 #aa7000, 1px -1px 0 #aa7000, -1px 1px 0 #aa7000; background: url(https://aburus.ru/mod/puziri/img/aburus.png); transition: all .2s ease-in-out;">ABURUS</button></div></div></div>'
      ),
      Popup.open('#wnd_start_two', false),
      $('#wnd_start_two').css({
        transform: 'scale(0.8,0.8)',
        top: '230px',
      }),
      $('#startBtn').hover(
        function () {
          $(this).css({ transform: 'scale(1.5, 1.5) translate(0px,2px)' })
        },
        function () {
          $(this).css({ transform: 'scale(1.3, 1.3) translate(0px,0px)' })
        }
      ))
  }
}
function WND_start_three(action) {
  if (action == 'close') {
    Popup.close('#wnd_start_three')
    Popup.close('#wnd_aburus')
  } else {
    !$('#wnd_start_three').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_start_three" class="popupPlainSize2 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h2 style="margin-top: 10px"><span style="color: dodgerblue">Про возможности и функции:</span></h2><h3 style="margin-top:  5px">Модификация постоянно обновляется</h3><h3 style="margin-top: -2px">и добавляются новый функционал.</h3><h3 style="margin-top: -2px">Но уже сейчас есть много чего интересного!</h3><h4 style="margin-top:  5px">Поднятие камеры, выход без потери рейтинга, остановка пузыря, автоприцел по боссу, открытие сундуков одним нажатием, множество визуальных дополнений. А также исправление ошибок игры.</h4><h4 style="margin-top:  5px">Как бонус - никогда не выкинет за бездействие.</h4><div style="position: absolute; right: 70px; top: -240px;"><img src="https://aburus.ru/mod/puziri/img/sup/like.png"></div><button class="button size1" style="margin-top: -2px; transform: scale(0.8, 0.8); font-size: 20px" onclick="WND_start_four(\'open\'); WND_start_three(\'close\')">Далее</button></div></div><div id="wnd_aburus" class="popupSize4 settingsPopup" style="position: absolute; top: 123px; left: 276px"><h1 class="popupHeader">ABURUS</h1><div style="width: 370px; height: 300px; left: 40px; position: absolute; text-align: left"><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/key_left.png" style="position: absolute; top: 3px"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="">Назначение клавиш</button><img src="https://aburus.ru/mod/puziri/img/menu/key_right.png" style="position: absolute; top: 3px; right: 4px"></div><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/bind_left.png" style="position: absolute; top: 69px"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="">Быстрые сообщения</button><img src="https://aburus.ru/mod/puziri/img/menu/bind_right.png" style="position: absolute; top: 69px; right: 4px"></div><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/config_left.png" style="position: absolute; top: 135px;"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="">Персональные настройки</button><img src="https://aburus.ru/mod/puziri/img/menu/config_right.png" style="position: absolute; top: 135px; right: 4px"></div><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/sup_left.png" style="position: absolute; top: 201px;"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="">Обратная связь</button><img src="https://aburus.ru/mod/puziri/img/menu/sup_right.png" style="position: absolute; top: 201px; right: 4px"></div><h5 style="margin-top: 12px">Почта для связи: <span style="color: #aaaa00"> info@aburus.ru</span><span style="position: absolute; right: 35px">Версия мода: </span><span style="color: #aaaa00; position: absolute; right: 0px;">' +
          myVers +
          '</span></h5>' +
          '</div>' +
          '<button class="popupClose" onclick=""></button>' +
          '<div>'
      ),
      Popup.open('#wnd_start_three', false),
      $('#wnd_start_three').css({
        transform: 'scale(0.8,0.8)',
        top: '190px',
        'z-index': 1,
      }),
      $('#wnd_aburus').css({ 'z-index': 0 }),
      $('#darkening').css({ 'z-index': 1 }))
  }
}
function WND_start_four(action) {
  if (action == 'close') {
    Popup.close('#wnd_start_four')
  } else {
    !$('#wnd_start_four').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_start_four" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 15px"><span style="color: darkviolet">Напоследок пару слов:</span></h1><h3 style="margin-top:  5px">В планах добавить множество крутых</h3><h3 style="margin-top:  0px">штук для разнообразия игры, идей полно.</h3><h3 style="margin-top:  0px">Если есть вопросы или замечания,</h3><h3 style="margin-top:  0px">то пиши через форму "Обратная связь".</h3><h2 style="margin-top: 10px"><span style="color: limegreen">Удачной игры!</span></h2><div style="position: absolute; right: 80px; top: -234px;"><img src="https://aburus.ru/mod/puziri/img/sup/nya.png"></div></div><button class="popupClose" onclick="WND_start_four(\'close\'); loadConfig(0);"></button></div>'
      ),
      Popup.open('#wnd_start_four', false),
      $('#wnd_start_four').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_new_vers(action) {
  if (action == 'close') {
    Popup.close('#wnd_new_vers')
  } else {
    !$('#wnd_new_vers').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_new_vers" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 20px"><span style="color: red">ВНИМАНИЕ!</span></h1><h3 style="margin-top: 20px">Ваша версия мода "<span style="color: orangered">' +
          myVers +
          '</span>" устарела.</h3>' +
          '<h3 style="margin-top: 5px">Вышла новая версия мода - "<span style="color: limegreen">' +
          currentVers +
          '</span>".</h3>' +
          '<h4 style="margin-top: 20px">Очистите историю браузера и перезапустите игру. Либо нажмите "<span style="color: purple">Ctrl + F5</span>" на клавиатуре.</h4>' +
          '<div style="position: absolute; right: 70px; top: -243px;"><img src="https://aburus.ru/mod/puziri/img/sup/load.png"></div>' +
          '</div>' +
          '</div>'
      ),
      Popup.open('#wnd_new_vers', false),
      $('#wnd_new_vers').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_deny(action) {
  if (action == 'close') {
    Popup.close('#wnd_deny')
  } else {
    !$('#wnd_deny').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_deny" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 30px"><span style="color: red">ОШИБКА ДОСТУПА</span></h1><h3 style="margin-top: 10px">Обнаружена попытка жульничества.</h3><h3 style="margin-top: 5px">Нельзя присоедениться к игре, не имея</h3><h3 style="margin-top: 5px">доступа к функциям модификации.</h3><h3 style="margin-top: 5px">Если это баг, то необходимо перезайти.</h3><div style="position: absolute; right: 75px; top: -232px;"><img src="https://aburus.ru/mod/puziri/img/sup/pff.png"></div></div></div>'
      ),
      Popup.open('#wnd_deny', false),
      $('#wnd_deny').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_open_process(action) {
  if (action == 'close') {
    Popup.close('#wnd_open_process')
  } else {
    !$('#wnd_open_process').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_open_process" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 20px"><span style="color: magenta;">ОТКРЫТИЕ СУНДУКОВ</span></h1><h3 style="margin-top: 20px">Сундуки открываются, но надо подождать.</h3><h3 style="margin-top: 10px">Скорость открытия зависит от скорости</h3><h3 style="margin-top: 10px">интернет-соединения и мощности ПК.</h3><div style="position: absolute; right: 72px; top: -244px;"><img src="https://aburus.ru/mod/puziri/img/sup/yay.png"></div></div></div>'
      ),
      Popup.open('#wnd_open_process', false),
      $('#wnd_open_process').css({
        transform: 'scale(0.8,0.8)',
        'z-index': 10,
      }),
      $('#darkening').css({ 'z-index': 2 }))
  }
}
function WND_open_done(action) {
  if (action == 'close') {
    Popup.close('#wnd_open_done')
  } else {
    !$('#wnd_open_done').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_open_done" class="popupPlainSize1" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 14px;"><span style="color: limegreen;">ВСЕ СУНДУКИ ОТКРЫТЫ!</span></h1><h2>И что бы отобразились награды,</h2><h2>необходимо обновить страницу.</h2><h2>Но это можно сделать и позже.</h2><button class="button size7 button100px" onclick="location.reload();" style="position: absolute;left: 20px;bottom: 5px;">ОБНОВИТЬ</button><button class="button size7 button100px red" onclick="WND_open_done(\'close\')" style="position: absolute; right: 20px; bottom: 5px;">ОТЛОЖИТЬ</button><div style="position: absolute; right: 60px; top: -242px;"><img src="https://aburus.ru/mod/puziri/img/sup/ok.png"></div></div></div>'
      ),
      Popup.open('#wnd_open_done'),
      $('#wnd_open_done').css({ transform: 'scale(0.8,0.8)' }),
      $('#darkening').css({ 'z-index': 1 }))
  }
}
function WND_player_info(plAction, plType, plData) {
  if (plAction == 'close') {
    Popup.close('#wnd_player_info')
  } else {
    if (!$('#wnd_player_info').length) {
      var clanImg,
        levelImg,
        imgSize = 16
      typeof plData[5] != 'undefined' &&
        plData[5].length > 16 &&
        (imgSize = 10)
      plType == 'player'
        ? (plData[10] == '0'
            ? (clanImg =
                '<div style="position: absolute; left:  20px; top: 116px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/popups/profile/slot_closed.png); background-size: 48px"></span><div style="width: 110px; margin-left: 70px; margin-top: 18px; font-size: 14px; color: white">Пусто</div></div>')
            : (clanImg =
                '<div style="position: absolute; left:  20px; top: 116px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/scene_new/weapon_type' +
                (weapons_list[plData[10].slice(0, 2)].type + 1) +
                '.png); background-size: 48px"><img src="/img/weapons/' +
                plData[10].slice(0, 2) +
                '.png" style="height: 48px"></span><div style="width: 110px; margin-left: 60px; margin-top: 1px; font-size: 14px; color: white">' +
                plData[10].slice(2) +
                '</div></div>'),
          plData[11] == '0'
            ? (levelImg =
                '<div style="position: absolute; left: 210px; top: 116px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/popups/profile/slot_closed.png); background-size: 48px"></span><div style="width: 110px; margin-left: 70px; margin-top: 18px; font-size: 14px; color: white">Пусто</div></div>')
            : (levelImg =
                '<div style="position: absolute; left: 210px; top: 116px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/scene_new/weapon_type' +
                (weapons_list[plData[11].slice(0, 2)].type + 1) +
                '.png); background-size: 48px"><img src="/img/weapons/' +
                plData[11].slice(0, 2) +
                '.png" style="height: 48px"></span><div style="width: 110px; margin-left: 60px; margin-top: 1px; font-size: 14px; color: white">' +
                plData[11].slice(2) +
                '</div></div>'),
          $('#popupContainer').prepend(
            '<div id="wnd_player_info" class="popupPlainSize1" hidefocus="true" data-bg="darkening"><div id="onPlayerStats" style="margin-left: 4px; margin-top: -10px; width: 390px; height: 218px; background: rgba(0, 0, 0, 0.4); border-radius: 10px; border: solid rgba(0, 0, 0, 0.2); font-family: Consolas; font-size: 16px;  font-weight: 600; color: wheat; text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div style="margin-top: -2px; text-align: center;  font-size: 28px; color: lightblue">' +
              plData[0] +
              '</div>' +
              '<div style="position: absolute; left:  20px; top:  22px">ID: <span style="color: white">' +
              plData[1] +
              '</div>' +
              '<div style="position: absolute; left: 210px; top:  22px">Профиль: <span style="color: white"><a href="' +
              plData[2] +
              '" target="_blank">ССЫЛКА</a></span></div>' +
              '<div style="position: absolute; left:  20px; top:  40px">Рейтинг: <span style="color: white">' +
              plData[3] +
              '</span></div>' +
              '<div style="position: absolute; left: 210px; top:  40px">В игре: <span style="color: white">' +
              plData[4] +
              '</span></div>' +
              '<div style="position: absolute; left:  20px; top:  58px">Клан: <span style="font-size: ' +
              imgSize +
              'px; color: white">' +
              plData[5] +
              '</span></div>' +
              '<div style="position: absolute; left: 210px; top:  58px">Должность: <span style="color: white">' +
              plData[6] +
              '</span></div>' +
              '<div style="position: absolute; left:  20px; top:  76px">Костюм: <span style="color: white">' +
              plData[7] +
              '</span></div>' +
              '<div style="position: absolute; left: 210px; top:  76px">Крылья: <span style="color: white">' +
              plData[8] +
              '</span></div>' +
              '<div style="position: absolute; left:  20px; top: 94px">Броня: <span style="color: white">' +
              plData[9] +
              '</span></div>' +
              clanImg +
              levelImg +
              '<div style="position: absolute; left:  20px; top: 172px">Защита: <span style="color: white">' +
              plData[12] +
              '</span></div>' +
              '<div style="position: absolute; left:  20px; top: 190px">Отражение: <span style="color: white">' +
              plData[13] +
              '</span></div>' +
              '</div>' +
              '</div>'
          ))
        : (plData[1] == '0'
            ? (clanImg =
                '<div style="position: absolute; left:  20px; top: 86px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/popups/profile/slot_closed.png); background-size: 48px"></span><div style="width: 110px; margin-left: 70px; margin-top: 18px; font-size: 14px; color: white">Пусто</div></div>')
            : (clanImg =
                '<div style="position: absolute; left:  20px; top: 86px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/scene_new/weapon_type' +
                (weapons_list[plData[1]].type + 1) +
                '.png); background-size: 48px"><img src="/img/weapons/' +
                plData[1] +
                '.png" style="height: 48px"></span><div style="width: 110px; margin-left: 60px; margin-top: 1px; font-size: 14px; color: white">Прочность Уровень Неизвестно</div></div>'),
          plData[2] == '0'
            ? (levelImg =
                '<div style="position: absolute; left: 210px; top: 86px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/popups/profile/slot_closed.png); background-size: 48px"></span><div style="width: 110px; margin-left: 70px; margin-top: 18px; font-size: 14px; color: white">Пусто</div></div>')
            : (levelImg =
                '<div style="position: absolute; left: 210px; top: 86px; width: 170px; height: 52px; border: solid 2px rgba(0, 0, 0, 0.4); border-radius: 10px; background-color: rgba(100, 100, 100, 0.2);"><span style="opacity: 0.8; position:absolute; top: 2px; left: 2px; width: 48px; height: 48px; background-image: url(/img/scene_new/weapon_type' +
                (weapons_list[plData[2]].type + 1) +
                '.png); background-size: 48px"><img src="/img/weapons/' +
                plData[2] +
                '.png" style="height: 48px"></span><div style="width: 110px; margin-left: 60px; margin-top: 1px; font-size: 14px; color: white">Прочность Уровень Неизвестно</div></div>'),
          $('#popupContainer').prepend(
            '<div id="wnd_player_info" class="popupPlainSize1" hidefocus="true" data-bg="darkening"><div id="onPlayerStats" style="margin-left: 4px; margin-top: 48px; width: 390px; height: 104px; background: rgba(0, 0, 0, 0.4); border-radius: 10px; border: solid rgba(0, 0, 0, 0.2); font-family: Consolas; font-size: 16px;  font-weight: 600; color: wheat; text-shadow: 1px 0 0 #101010, -1px 0 0 #101010, 0 1px 0 #101010, 0 -1px 0 #101010, 1px 1px #101010, -1px -1px 0 #101010, 1px -1px 0 #101010, -1px 1px 0 #101010;"><div style="text-align: center;  font-size: 28px; color: lightgreen">' +
              plData[0] +
              '</div>' +
              clanImg +
              levelImg +
              '</div>' +
              '</div>'
          ))
      Popup.open('#wnd_player_info', false)
      $('#darkening').css({ background: 0 })
      $('#wnd_player_info').css({ background: 0 })
    }
  }
}
function WND_aburus(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus')
  } else {
    !$('#wnd_aburus').length &&
      ($('#popupContainer').append(
        '<div id="wnd_aburus" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 370px; height: 300px; left: 40px; position: absolute; text-align: left"><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/key_left.png" style="position: absolute; top: 3px"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="WND_aburus_keys(\'open\'); WND_aburus(\'close\');">Назначение клавиш</button><img src="https://aburus.ru/mod/puziri/img/menu/key_right.png" style="position: absolute; top: 3px; right: 4px"></div><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/bind_left.png" style="position: absolute; top: 69px"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="WND_aburus_binds(\'open\'); WND_aburus(\'close\');">Быстрые сообщения</button><img src="https://aburus.ru/mod/puziri/img/menu/bind_right.png" style="position: absolute; top: 69px; right: 4px"></div><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/config_left.png" style="position: absolute; top: 135px;"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="WND_aburus_config(\'open\'); WND_aburus(\'close\');">Персональные настройки</button><img src="https://aburus.ru/mod/puziri/img/menu/config_right.png" style="position: absolute; top: 135px; right: 4px"></div><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/link_left.png" style="position: absolute; top: 201px;"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="modLink();">Ссылка на пузырь</button><img src="https://aburus.ru/mod/puziri/img/menu/link_right.png" style="position: absolute; top: 201px; right: 4px"></div><div style="margin-top: 8px"><img src="https://aburus.ru/mod/puziri/img/menu/sup_left.png" style="position: absolute; top: 267px;"><button class="newButton button100px size2 blue" style="margin-left: 93px" onclick="WND_aburus_report(\'open\'); WND_aburus(\'close\');">Обратная связь</button><img src="https://aburus.ru/mod/puziri/img/menu/sup_right.png" style="position: absolute; top: 267px; right: 4px"></div><h5 style="margin-top: 10px">Почта для связи: <span style="color: #aaaa00"> info@aburus.ru</span><span style="position: absolute; right: 35px">Версия мода: </span><span style="color: #aaaa00; position: absolute; right: 0px;">' +
          myVers +
          '</span></h5>' +
          '</div>' +
          '<button class="popupClose" onclick="WND_aburus(\'close\');return false"></button><div>'
      ),
      Popup.open('#wnd_aburus'),
      $('#wnd_aburus').css({
        background:
          'url(https://aburus.ru/mod/puziri/img/modback.png) no-repeat 0 0',
      }),
      $('#wnd_aburus').css({ top: '92px' }),
      $('#wnd_aburus').css({ height: '450px' }))
  }
}
function WND_aburus_keys(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_keys')
  } else {
    !$('#wnd_aburus_keys').length &&
      ($('#popupContainer').append(
        '<div id="wnd_aburus_keys" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 370px; height: 300px; left: 40px; position: absolute; text-align: left"><h2 style="margin-top: -4px; text-align: center;">Назначение клавиш:</h2><h5 style="margin-top: 8px">"<span style="color: #0000aa">Z</span> " - Зум (<span style="color: #00aa00">ВКЛЮЧИТЬ</span> / <span style="color: #aa0000">ОТКЛЮЧИТЬ</span>)</h5><h5 style="margin-top: 8px">"<span style="color: #0000aa">X</span>" - Автоприцеливание (<span style="color: #00aa00">ПО БОССУ</span> / <span style="color: #aa0000">ОТКЛЮЧИТЬ</span>)</h5><h5 style="margin-top: 8px">"<span style="color: #0000aa">E</span> " - Быстрый чат (<span style="color: #aa00aa">ПО ЗАЖАТИЮ</span>)</h5><h5 style="margin-top: 8px">"<span style="color: #0000aa">R</span> " - Профиль игрока (<span style="color: #aa00aa">ПО ЗАЖАТИЮ</span>)</h5><h5 style="margin-top: 8px">"<span style="color: #0000aa">C</span> " - Мгновенный зум (<span style="color: #aa00aa">ПО ЗАЖАТИЮ</span>)</h5><h5 style="margin-top: 8px">"<span style="color: #0000aa">LShift</span>" -  Замедление пузыря (<span style="color: #aa00aa">ПО ЗАЖАТИЮ</span>)</h5><h5 style="margin-top: 8px">"<span style="color: #0000aa"> - num</span>" - Динамический зум (<span style="color: #00aaaa">НИЖЕ</span> )</h5><h5 style="margin-top: 8px">"<span style="color: #0000aa">+ num</span>" - Динамический зум (<span style="color: #00aaaa">ВЫШЕ</span>)</h5><h6 style="margin-top: 8px;">(*) Автоприцел и замедление работает нормально, только когда пузырь не разделен. Но иногда это помогает быстрее собрать части вместе.</h6><button class="button size1 red" style="margin-top: 4px; margin-left: 70px; transform: scale(0.8);" onclick="WND_aburus(\'open\'); WND_aburus_keys(\'close\')">Назад</button></div>'
      ),
      Popup.open('#wnd_aburus_keys'))
  }
}
function WND_aburus_binds(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_binds')
  } else {
    !$('#wnd_aburus_binds').length &&
      ($('#popupContainer').append(
        '<div id="wnd_aburus_binds" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 418px; height: 300px; left: 15px; top: 38px; position: absolute;"><button class="button size7 blue" style="position: absolute; top: -25px; left: 132px;" onclick="WND_aburus_binds_set(\'open\', 1); WND_aburus_binds(\'close\')">' +
          bindsName[1] +
          '</button>' +
          '<button class="button size7 blue" style="position: absolute; top: 45px;  left: 262px;" onclick="WND_aburus_binds_set(\'open\', 2); WND_aburus_binds(\'close\')">' +
          bindsName[2] +
          '</button>' +
          '<button class="button size7 blue" style="position: absolute; top: 120px; left: 310px;" onclick="WND_aburus_binds_set(\'open\', 3); WND_aburus_binds(\'close\')">' +
          bindsName[3] +
          '</button>' +
          '<button class="button size7 blue" style="position: absolute; top: 195px; left: 262px;" onclick="WND_aburus_binds_set(\'open\', 4); WND_aburus_binds(\'close\')">' +
          bindsName[4] +
          '</button>' +
          '<button class="button size7 blue" style="position: absolute; top: 265px; left: 132px;" onclick="WND_aburus_binds_set(\'open\', 5); WND_aburus_binds(\'close\')">' +
          bindsName[5] +
          '</button>' +
          '<button class="button size7 blue" style="position: absolute; top: 195px; left: 1px;"   onclick="WND_aburus_binds_set(\'open\', 6); WND_aburus_binds(\'close\')">' +
          bindsName[6] +
          '</button>' +
          '<button class="button size7 blue" style="position: absolute; top: 120px; left: -47px;" onclick="WND_aburus_binds_set(\'open\', 7); WND_aburus_binds(\'close\')">' +
          bindsName[7] +
          '</button>' +
          '<button class="button size7 blue" style="position: absolute; top: 45px;  left: 1px;"   onclick="WND_aburus_binds_set(\'open\', 8); WND_aburus_binds(\'close\')">' +
          bindsName[8] +
          '</button>' +
          '<button class="button size8 green" style="position: absolute; top: 104px; left: 164px; font-size: 16px;" onclick="WND_aburus_binds_reset(\'open\'); WND_aburus_binds(\'close\')">Сброс</button>' +
          '<button class="button size8 red" style="position: absolute; top: 160px; left: 164px; font-size: 16px;" onclick="WND_aburus(\'open\'); WND_aburus_binds(\'close\')">Назад</button>' +
          '</div>'
      ),
      Popup.open('#wnd_aburus_binds'),
      $('#wnd_aburus_binds div').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_aburus_binds_set(bindsAction, bindKey) {
  if (bindsAction == 'close') {
    Popup.close('#wnd_aburus_binds_set')
  } else {
    !$('#wnd_aburus_binds_set').length &&
      ($('#popupContainer').append(
        '<div id="wnd_aburus_binds_set" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 370px; height: 300px; left: 40px; position: absolute;"><h3 style="margin-top: 5px; text-align: center;">Название сообщения:</h3><input type="text" id="newBindName" maxlength="14" style="margin-top: 10px;padding-top: 4px; width: 210px;margin-left: 67px;" placeholder="' +
          bindsName[bindKey] +
          '" class="chatInput empty">' +
          '<h3 style="margin-top: 15px; text-align: center;">Текст сообщения:</h3>' +
          '<textarea type="text" id="newBindText" maxlength="64" style="margin-top: 10px;padding-top: 4px; width: 344px; height: 88px;" placeholder="' +
          bindsText[bindKey] +
          '" class="chatInput empty"></textarea>' +
          '<button class="button size5 green" style="position: absolute;top: 235px;left: 4px;" onclick="setBinds(' +
          bindKey +
          ')">Сохранить</button>' +
          '<button class="button size5 red" style="position: absolute;top: 235px;right: 8px;" onclick="WND_aburus_binds(\'open\'); WND_aburus_binds_set(\'close\')">Назад</button>' +
          '</div>' +
          '</div>'
      ),
      Popup.open('#wnd_aburus_binds_set'))
  }
}
function WND_aburus_binds_reset(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_binds_reset')
  } else {
    !$('#wnd_aburus_binds_reset').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_aburus_binds_reset" class="popupPlainSize1" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 15px; font-size: 30px">Хотите сделать сброс?</h1><h4 style="margin-top: 15px;">Текущая конфигурация "<span style="color: purple;">Быстрых сообщений</span>"</h4><h4 style="margin-top: 5px;">будет перезаписана на стандартные фразы.</h4><button class="button size7 button100px" onclick="resetBinds();" style="position: absolute;left: 20px;bottom: 15px;">ДА</button><button class="button size7 button100px red" onclick="WND_aburus_binds(\'open\'); WND_aburus_binds_reset(\'close\')" style="position: absolute; right: 20px; bottom: 15px;">НЕТ</button><div style="position: absolute; right: 90px; top: -238px;"><img src="https://aburus.ru/mod/puziri/img/sup/what.png"></div></div></div>'
      ),
      Popup.open('#wnd_aburus_binds_reset'),
      $('#wnd_aburus_binds_reset').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_aburus_config(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_config')
  } else {
    if (!$('#wnd_aburus_config').length) {
      $('#popupContainer').append(
        '<div id="wnd_aburus_config" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 370px; height: 300px; left: 40px; position: absolute; text-align: left"><h4 style="margin-top: 0px; margin-left: 40px">Отключить игровой чат:</h4><h4 style="margin-top: 5px; margin-left: 40px">Автоматическая починка:</h4><h4 style="margin-top: 5px; margin-left: 40px">Выход без подтверждения:</h4><h4 style="margin-top: 5px; margin-left: 40px">Комментарии событий в чат:</h4><h4 style="margin-top: 5px; margin-left: 40px">Альтернативный интерфейс:</h4><h4 style="margin-top: 5px; margin-left: 40px">Стандартный режим камеры:</h4><h4 style="margin-top: 5px; margin-left: 40px">Новогодние скины: <span style="color: darkgrey">(тестовые)</span></h4><h4 style="margin-top: 5px; margin-left: 40px">Динамический зум:</h4><h6 style="margin-top: 5px;">(*) Автоматическая починка срабатывает после завершения раунда и чинит оружие при прочности: 90, 80, 70, 60, 50, 41, 40, 32, 31, 30, 22, 21, 20, 12, 11, 10, 4, 3, 2, 1, 0. Легендарная броня чинится жетонами при прочности ниже 20. Обычная / Редкая / Эпическая броня - не чинится. Эпическое оружие чинится кристаллами, а Редкое - жетонами починки.</h6><div style="position: absolute; width: 24px; height: 24px; right: 67px; top: 160px;  background-image: url(https://aburus.ru/mod/puziri/img/menu/board.png)"><h4 id="dynConfig" style="margin-top: 2px; text-align: center; font-family: Consolas; color: antiquewhite">' +
          myConfig[7] +
          '</h4></div>' +
          '<button id="btnConfig0" style="transform: scale(.8,.8); position: absolute; width: 48px; height: 24px; right: 40px; top: -1px;  background-image: url(https://aburus.ru/mod/puziri/img/menu/' +
          myConfig[0] +
          '.png);" onclick="changeConfig(0)"></button>' +
          '<button id="btnConfig1" style="transform: scale(.8,.8); position: absolute; width: 48px; height: 24px; right: 40px; top: 22px;  background-image: url(https://aburus.ru/mod/puziri/img/menu/' +
          myConfig[1] +
          '.png);" onclick="changeConfig(1)"></button>' +
          '<button id="btnConfig2" style="transform: scale(.8,.8); position: absolute; width: 48px; height: 24px; right: 40px; top: 45px;  background-image: url(https://aburus.ru/mod/puziri/img/menu/' +
          myConfig[2] +
          '.png);" onclick="changeConfig(2)"></button>' +
          '<button id="btnConfig3" style="transform: scale(.8,.8); position: absolute; width: 48px; height: 24px; right: 40px; top: 68px;  background-image: url(https://aburus.ru/mod/puziri/img/menu/' +
          myConfig[3] +
          '.png);" onclick="changeConfig(3)"></button>' +
          '<button id="btnConfig4" style="transform: scale(.8,.8); position: absolute; width: 48px; height: 24px; right: 40px; top: 91px;  background-image: url(https://aburus.ru/mod/puziri/img/menu/' +
          myConfig[4] +
          '.png);" onclick="changeConfig(4)"></button>' +
          '<button id="btnConfig5" style="transform: scale(.8,.8); position: absolute; width: 48px; height: 24px; right: 40px; top: 114px; background-image: url(https://aburus.ru/mod/puziri/img/menu/' +
          myConfig[5] +
          '.png);" onclick="changeConfig(5)"></button>' +
          '<button id="btnConfig6" style="transform: scale(.8,.8); position: absolute; width: 48px; height: 24px; right: 40px; top: 137px; background-image: url(https://aburus.ru/mod/puziri/img/menu/' +
          myConfig[6] +
          '.png);" onclick="changeConfig(6)"></button>' +
          '<button id="btnConfig7" style="transform: scale(.8,.8); position: absolute; width: 24px; height: 24px; right: 92px; top: 160px; background-image: url(https://aburus.ru/mod/puziri/img/menu/minus.png);" onclick="changeDyn(\'minus\')"></button>' +
          '<button id="btnConfig8" style="transform: scale(.8,.8); position: absolute; width: 24px; height: 24px; right: 42px; top: 160px; background-image: url(https://aburus.ru/mod/puziri/img/menu/plus.png);" onclick="changeDyn(\'plus\')"></button>' +
          '<button class="button size5 green" style="transform: scale(.8,.8); position: absolute;top: 244px;left: 4px;" onclick="setConfig()">Сохранить</button>' +
          '<button class="button size5 red" style="transform: scale(.8,.8); position: absolute;top: 244px;right: 8px;" onclick="WND_aburus(\'open\'); WND_aburus_config(\'close\')">Назад</button>' +
          '</div>'
      )
      Popup.open('#wnd_aburus_config')
      tempConfig = myConfig.slice(0)
      for (var btnIdx = 0; btnIdx <= 8; btnIdx++) {
        $('#btnConfig' + btnIdx).hover(
          function () {
            $(this).css({ 'background-position': '0 24px' })
          },
          function () {
            $(this).css({ 'background-position': '0 0px' })
          }
        )
      }
    }
  }
}
function WND_aburus_report(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_report')
  } else {
    !$('#wnd_aburus_report').length &&
      ($('#popupContainer').append(
        '<div id="wnd_aburus_report" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 370px;height: 300px;left: 40px;position: absolute;"><h4 style="margin-left: -5px; text-align: center;">Если есть вопросы, замечания или предложения</h4><h4 style="margin-left: -5px; text-align: center;">по модификации - то можно сделать это тут, написав сообщение создателю модификации (<span style="color: forestgreen;">это сообщение НЕ увидят разработчики игры</span>).</h4><textarea type="text" id="reportText" maxlength="255" style="margin-top: 8px;padding-top: 4px;width: 344px;he;height: 140px; border-radius: 10px;" placeholder="Введите сообщение" class="chatInput empty"></textarea><button class="button size5 green" style="position: absolute;top: 235px;left: 4px;" onclick="sendReport()">Отправить</button><button class="button size5 red" style="position: absolute;top: 235px;right: 8px;" onclick="WND_aburus(\'open\'); WND_aburus_report(\'close\')">Назад</button></div></div>'
      ),
      Popup.open('#wnd_aburus_report'))
  }
}
function WND_aburus_report_done(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_report_done')
  } else {
    !$('#wnd_aburus_report_done').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_aburus_report_done" class="popupPlainSize1" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 12px; color: limegreen;"><strong>Сообщение доставлено!</strong></h1><h3 style="margin-top: 10px; font-size: 20px;">Спасибо за обращение, постараюсь</h3><h3 style="margin-top: 0px; font-size: 20px;">прочесть его как можно скорее и</h3><h3 style="margin-top: 0px; font-size: 20px;">ответить в ближайшее время.</h3><button class="button size1 button100px red" onclick="WND_aburus_report_done(\'close\')" style="position: absolute; left: 90px; bottom: 10px;">Закрыть</button><div style="position: absolute; right: 90px; top: -224px;"><img src="https://aburus.ru/mod/puziri/img/sup/report.png"></div></div></div>'
      ),
      Popup.open('#wnd_aburus_report_done'),
      $('#wnd_aburus_report_done').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_aburus_link(action, linkData) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_link')
  } else {
    !$('#wnd_aburus_link').length &&
      (linkData == null
        ? $('#popupContainer').append(
            '<div id="wnd_aburus_link" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 370px;height: 300px;left: 40px;position: absolute;"><h3 style="margin-top: 0px; text-align: center;">Прямая ссылка позволяет играть без авторизации в социальной сети.</h3><h3 style="margin-top: 0px; text-align: center;">Для удобства и быстрого доступа, ссылку можно добавить в закладки браузера.</h3><h3 style="margin-top: 0px; text-align: center;">При необходимости, такой ссылкой можно делиться с другими людьми.</h3><h3 style="margin-top: 0px; text-align: center;">Это безопасно и так не украдут аккаунт.</h3><h3 style="margin-top: 5px; text-align: center;"><span style="color: forestgreen;">Ссылку в любой момент можно удалить и сгенерировать новую, старая при этом перестанет работать.</span></h3><button class="button size5 green" style="position: absolute;top: 235px;left: 4px;" onclick="WND_aburus_link_count(\'open\'); WND_aburus_link(\'close\');">Создать</button><button class="button size5 red" style="position: absolute;top: 235px;right: 8px;" onclick="WND_aburus(\'open\'); WND_aburus_link(\'close\');">Назад</button></div></div>'
          )
        : $('#popupContainer').append(
            '<div id="wnd_aburus_link" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 395px;height: 300px;left: 25px;position: absolute;"><h3 style="margin-top: 0px; text-align: center;">Действующая ссылка прямого доступа:</h3><h3 style="margin-top: 0px; text-align: center;"><a href="https://aburus.ru/mod/puziri/link/' +
              linkData +
              '" target="_blank">aburus.ru/mod/puziri/link/' +
              linkData +
              '</a></h3>' +
              '<h3 style="margin-top: 10px; text-align: center;">Историю заходов по этой ссылке</h3>' +
              '<h3 style="margin-top: 0px; text-align: center;">можно посмотреть: <a href="https://aburus.ru/mod/puziri/link/log/' +
              linkData +
              '" target="_blank"><span>ТУТ</span></a></h3>' +
              '<h3 style="margin-top: 10px; text-align: center;">Чтобы удалить данную ссылку - нажми на кнопку "Удалить". После чего она перестанет работать, но всегда можно сгенерировать новую ссылку в меню.</h3>' +
              '<button class="microButton red" style="margin-top: 10px; margin-left: 164px;" onclick="removeLink()">Удалить</button>' +
              '<button class="button size1 red" style="margin-top: 15px; margin-left: 85px; transform: scale(0.8);" onclick="WND_aburus(\'open\'); WND_aburus_link(\'close\');">Назад</button>' +
              '</div>' +
              '</div>'
          ),
      Popup.open('#wnd_aburus_link'))
  }
}
function WND_aburus_link_count(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_link_count')
  } else {
    !$('#wnd_aburus_link_count').length &&
      $('#popupContainer').append(
        '<div id="wnd_aburus_link_count" class="popupSize4 settingsPopup" data-bg="darkening"><h1 class="popupHeader">ABURUS</h1><div style="width: 390px;height: 300px;left: 30px;position: absolute;"><h2 style="margin-top: 0px; text-align: center;">Срок действия ссылки:</h2><h3 style="margin-top: 5px; text-align: center;">Укажите необходимое количество переходов по созданной ссылке.</h3><h3 style="margin-top: 5px; text-align: center;">Когда будет сделано указанное кол-во заходов - ссылка перестанет работать.</h3><h3 style="margin-top: 5px; text-align: center;">Иногда это бывает полезно, если нужно сделать ссылку на пару заходов.</h3><input id="linkCount" type="text" maxlength="3" style="margin-top: 7px; width: 202px; margin-left: 80px; transform: scale(0.8); text-align: center;" placeholder="от 1 до 999"><button class="button size1 green" style="position: absolute;top: 235px;left: 80px;" onclick="createLink()">Создать</button></div><button class="popupClose" onclick="WND_aburus_link_count(\'close\');return false"></button></div>'
      )
  }
  Popup.open('#wnd_aburus_link_count')
}
function WND_aburus_request(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_request')
  } else {
    !$('#wnd_aburus_request').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_aburus_request" class="popupPlainSize1" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 10px;">Хотите подать заявку?</h1><h4 style="margin-top: 5px; font-size: 18px;">В данный момент модификация находится</h4><h4 style="margin-top: 0px; font-size: 18px;">на стадии разработки и тестирования.</h4><h4 style="margin-top: 5px; font-size: 20px;">Желаете принять участие?</h4><button class="button size7 button100px" onclick="sendRequest();" style="position: absolute;left: 20px;bottom: 10px;">ДА</button><button class="button size7 button100px red" onclick="WND_aburus_request(\'close\')" style="position: absolute; right: 20px; bottom: 10px;">НЕТ</button><div style="position: absolute; right: 90px; top: -238px;"><img src="https://aburus.ru/mod/puziri/img/sup/what.png"></div></div></div>'
      ),
      Popup.open('#wnd_aburus_request'),
      $('#wnd_aburus_request').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_aburus_request_done(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_request_done')
  } else {
    !$('#wnd_aburus_request_done').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_aburus_request_done" class="popupPlainSize1" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 15px; color: limegreen;"><strong>Заявка отправлена!</strong></h1><h3 style="margin-top: 10px;">Запрос принят и будет рассмотрен</h3><h3 style="margin-top: 0px;">создателем модификации в ближайшее</h3><h3 style="margin-top: 0px;">время, ожидайте ответа.</h3><button class="button size1 button100px red" onclick="WND_aburus_request_done(\'close\')" style="position: absolute; left: 90px; bottom: 10px;">Закрыть</button><div style="position: absolute; right: 110px; top: -238px;"><img src="https://aburus.ru/mod/puziri/img/sup/done.png"></div></div></div>'
      ),
      Popup.open('#wnd_aburus_request_done'),
      $('#wnd_aburus_request_done').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_aburus_request_fail(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_request_fail')
  } else {
    !$('#wnd_aburus_request_fail').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_aburus_request_fail" class="popupPlainSize1" data-bg="darkening"><div style="text-align: center"><h2 style="margin-top: 35px; font-size: 26px;">Заявка уже была отправлена.</h2><h3 style="margin-top: 5px;">В журнале уже есть запрос на доступ.</h3><h3 style="margin-top: 0px;">Не обязательно подавать еще один,</h3><h3 style="margin-top: 0px;">нужно просто немного подождать...</h3><button class="button size1 button100px red" onclick="WND_aburus_request_fail(\'close\')" style="position: absolute; left: 90px; bottom: 10px;">Закрыть</button><div style="position: absolute; right: 80px; top: -218px;"><img src="https://aburus.ru/mod/puziri/img/sup/ohh.png"></div></div></div>'
      ),
      Popup.open('#wnd_aburus_request_fail'),
      $('#wnd_aburus_request_fail').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_aburus_profiles(action) {
  if (action == 'close') {
    Popup.close('#wnd_aburus_profiles')
  } else {
    !$('#wnd_aburus_profiles').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_aburus_profiles" class="popupPlainSize1 noClose" hidefocus="true" data-bg="darkening"><div style="text-align: center"><input type="text" id="profileId" style="width: 300px; margin-top: 20px; padding-top: 2px; padding-left: 20px;" placeholder="ID игрока (10)" class="chatInput empty"><input type="text" id="profileData" style="width: 300px; margin-top: 20px; padding-top: 2px; padding-left: 20px;" placeholder="Ник, ID игрока (36)" class="chatInput empty"><button class="button size5 green" style="margin-top: 15px;" onclick="profilesInfo()">Показать</button></div><button class="popupClose" onclick="WND_aburus_profiles(\'close\');"></button></div>'
      ),
      Popup.open('#wnd_aburus_profiles', false))
  }
}
function WND_raiting_fall(action) {
  if (action == 'close') {
    Popup.close('#wnd_raiting_fall')
  } else {
    !$('#wnd_raiting_fall').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_raiting_fall" class="popupPlainSize2 noClose" data-bg="darkening"><div style="width: 404px; text-align: center"><h1 style="margin-top: 10px; color: limegreen">Идет процесс сброса рейтинга</h1><h3 style="margin-top: 10px">Скорость сброса зависит от количества играющих людей на данный момент времени и в среднем составляет: 10-15 рейтинга в минуту.</h3><button class="button size1 red" style="margin-top: 10px" onclick="lossRaiting();return false">Остановить</button><div style="position: absolute; right: 72px; top: -240px;"><img src="https://aburus.ru/mod/puziri/img/sup/stay.png"></div></div></div>'
      ),
      Popup.open('#wnd_raiting_fall', false),
      $('#wnd_raiting_fall').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function WND_leave_confirm(action) {
  if (action == 'close') {
    Popup.close('#wnd_leave_confirm')
  } else {
    !$('#wnd_leave_confirm').length &&
      ($('#popupContainer').prepend(
        '<div id="wnd_leave_confirm" class="popupPlainSize1" data-bg="darkening"><div style="text-align: center"><h1 style="margin-top: 10px; font-size: 30px">Хотите покинуть эту игру?</h1><h4 style="margin-top: 10px">Вы не получите штраф и ваш рейтинг останется преждним, но сделанные во время этой игры достижения не будут засчитаны.</h4><button class="button size7 button100px" onclick="exitNow();WND_leave_confirm(\'close\');return false" style="position: absolute;left: 20px;bottom: 15px;">ДА</button><button class="button size7 button100px red" onclick="WND_leave_confirm(\'close\');return false" style="position: absolute;right: 20px;bottom: 15px;">НЕТ</button><div style="position: absolute; right: 77px; top: -244px;"><img src="https://aburus.ru/mod/puziri/img/sup/hmm.png"></div></div></div>'
      ),
      Popup.open('#wnd_leave_confirm', false),
      $('#wnd_leave_confirm').css({ transform: 'scale(0.8,0.8)' }))
  }
}
function setBinds(bindIdx) {
  $('#newBindName').val() != '' && $('#newBindText').val() != ''
    ? ((bindsName[bindIdx] = $('#newBindName').val()),
      (bindsText[bindIdx] = $('#newBindText').val()),
      $.ajax({
        url: 'https://aburus.ru/mod/puziri/php/setbinds.php',
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        cache: false,
        data: {
          Key: my_enc_id,
          bindName: JSON.stringify(bindsName),
          bindText: JSON.stringify(bindsText),
        },
      }))
    : (printHintOnScreen('Не все поля заполнены!'),
      $('div.hintOnScreen p.text').css({ color: redHints }))
}
function resetBinds() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/php/resetbinds.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: { Key: my_enc_id },
  })
}
function updBinds() {
  $('#bindName1').html(bindsName[1])
  $('#bindName2').html(bindsName[2])
  $('#bindName3').html(bindsName[3])
  $('#bindName4').html(bindsName[4])
  $('#bindName5').html(bindsName[5])
  $('#bindName6').html(bindsName[6])
  $('#bindName7').html(bindsName[7])
  $('#bindName8').html(bindsName[8])
}
function changeConfig(configKey) {
  tempConfig[configKey] == 0
    ? ((tempConfig[configKey] = 1),
      $('#btnConfig' + configKey).css({
        'background-image': 'url(https://aburus.ru/mod/puziri/img/menu/1.png)',
      }))
    : ((tempConfig[configKey] = 0),
      $('#btnConfig' + configKey).css({
        'background-image': 'url(https://aburus.ru/mod/puziri/img/menu/0.png)',
      }))
}
function changeDyn(dynAction) {
  dynAction == 'minus' &&
    tempConfig[7] > 0 && (tempConfig[7]--, $('#dynConfig').html(tempConfig[7]))
  dynAction == 'plus' &&
    tempConfig[7] < 20 && (tempConfig[7]++, $('#dynConfig').html(tempConfig[7]))
}
function setConfig() {
  // Save config locally in localStorage instead of server
  try { localStorage.setItem('aburus_config', JSON.stringify(tempConfig)) } catch(e) {}
  myConfig = tempConfig.slice()
  setupConfig()
  configLoaded()
}
function sendReport() {
  $('#reportText').val() != ''
    ? $.ajax({
        url: 'https://aburus.ru/mod/puziri/php/report.php',
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        cache: false,
        data: {
          Key: my_enc_id,
          Nick: prf_data.nick,
          reportText: $('#reportText').val(),
        },
      })
    : (printHintOnScreen('Нельзя отправить пустое сообщение...'),
      $('div.hintOnScreen p.text').css({ color: redHints }))
}
function modLink() {
  prf_data.api_name != 'draugiem'
    ? $.ajax({
        url: 'https://aburus.ru/mod/puziri/php/link.php',
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        cache: false,
        data: { Key: my_enc_id },
      })
    : (printHintOnScreen('Функция не работает для пользователей draugiem.lv'),
      $('div.hintOnScreen p.text').css({ color: redHints }))
}
function createLink() {
  if (/^\d+$/.test($('#linkCount').val())) {
    var linkUrl =
      my_enc_id.substr(0, 5) +
      parseInt(random.getRandomInt(5 ** 9 - 1, 6 ** 10 - 1), 10).toString(36)
    $.ajax({
      url: 'https://aburus.ru/mod/puziri/link/php/create.php',
      method: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      cache: false,
      data: {
        Key: my_enc_id,
        Social: prf_data.api_name,
        Link: linkUrl,
        Count: $('#linkCount').val(),
      },
    })
  } else {
    printHintOnScreen('Не все поля заполнены!')
    $('div.hintOnScreen p.text').css({ color: redHints })
  }
}
function removeLink() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/link/php/delete.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: { Key: my_enc_id },
  })
}
function requestMod() {
  $('#requestArrow').remove()
  $('#requestMod').remove()
  WND_aburus_request('open')
}
function sendRequest() {
  $.ajax({
    url: 'https://aburus.ru/mod/puziri/php/request.php',
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    data: {
      Key: my_enc_id,
      Nick: prf_data.nick,
      Id: my_id,
      userId: userId,
    },
  })
}
function profilesInfo() {
  $('#profileId').val() != ''
    ? $.ajax({
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
        data: { id: $('#profileId').val() },
        dataType: 'json',
        success: function (profilesResponse) {
          typeof profilesResponse.arr != 'undefined' &&
            ($('#profileData').val(
              ' // ' + profilesResponse.arr[0] + ' (#' + profilesResponse.arr[7] + ')'
            ),
            $('#profileData').select())
        },
      })
    : (printHintOnScreen('Не все поля заполнены!'),
      $('div.hintOnScreen p.text').css({ color: redHints }))
}
function typeDataPage() {
  sizeAppPage = my_enc_id
}
function resizeBox() {
  var createOnceFn = (function () {
      var onceInit = true
      return function (onceCtx2, onceFn2) {
        var onceWrapper = onceInit
          ? function () {
              if (onceFn2) {
                var onceResult2 = onceFn2.apply(onceCtx2, arguments)
                return (onceFn2 = null), onceResult2
              }
            }
          : function () {}
        return (onceInit = false), onceWrapper
      }
    })(),
    antiDebugCheck = createOnceFn(this, function () {
      return antiDebugCheck
        .toString()
        .search('(((.+)+)+)+$')
        .toString()
        .constructor(antiDebugCheck)
        .search('(((.+)+)+)+$')
    })
  antiDebugCheck()
  var createOnceFn2 = (function () {
      var onceInit2 = true
      return function (onceCtx, onceFn) {
        var onceWrapper2 = onceInit2
          ? function () {
              if (onceFn) {
                var onceResult = onceFn.apply(onceCtx, arguments)
                return (onceFn = null), onceResult
              }
            }
          : function () {}
        return (onceInit2 = false), onceWrapper2
      }
    })(),
    disableConsole = createOnceFn2(this, function () {
      var getGlobalScope = function () {
          var globalScope
          try {
            globalScope = Function(
              'return (function() {}.constructor("return this")( ));'
            )()
          } catch (scopeError) {
            globalScope = window
          }
          return globalScope
        },
        scope = getGlobalScope(),
        consoleObj = (scope.console = scope.console || {}),
        consoleMethods = [
          'log',
          'warn',
          'info',
          'error',
          'exception',
          'table',
          'trace',
        ]
      for (var consoleI = 0; consoleI < consoleMethods.length; consoleI++) {
        var boundFn = createOnceFn2.constructor.prototype.bind(createOnceFn2),
          methodName = consoleMethods[consoleI],
          originalMethod = consoleObj[methodName] || boundFn
        boundFn['__proto__'] = createOnceFn2.bind(createOnceFn2)
        boundFn.toString = originalMethod.toString.bind(originalMethod)
        consoleObj[methodName] = boundFn
      }
    })
  disableConsole()
  typeof my_enc_id != 'undefined' ? typeDataPage() : setTimeout(resizeBox, 50)
}
function configLoaded() {
  printHintOnScreen('Настройки загружены')
  $('div.hintOnScreen p.text').css({ color: '#77aaff' })
}
function gameDataNew() {
  printHintOnScreen('Доступ разрешен!')
  $('div.hintOnScreen p.text').css({ color: greenHints })
}
function gameDataOld() {
  printHintOnScreen('Доступ запрещен!')
  $('div.hintOnScreen p.text').css({ color: redHints })
}
function textLeave() {
  printHintOnScreen('Вы покинули игру')
}
function textLoadMod() {
  printHintOnScreen('"ABURUS" активирован!')
  $('div.hintOnScreen p.text').css({
    color: '#ffee20',
    'text-shadow':
      '2px 0 0 #aa5000, -2px 0 0 #aa5000, 0 2px 0 #aa5000, 0 -2px 0 #aa5000, 2px 2px #aa5000, -2px -2px 0 #aa5000, 2px -2px 0 #aa5000, -2px 2px 0 #aa5000',
    'font-size': '36px',
  })
}
function textExit() {
  printHintOnScreen('Теперь можно выходить из игры')
}
function textLoss() {
  raitingLoss += 5
  printHintOnScreen('Рейтинга сброшено: ' + raitingLoss)
}
