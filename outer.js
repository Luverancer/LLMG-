const outerScr = true;
const currentVers = '0.9.4';

var fraz_kill = [', ты просто чудо :)',                                         //0 Мирные
                 ', благодарю!',                                                //1
                 ', очень мило с твоей стороны ;)',                             //2
                 ', очень признателен!',                                        //3
                 ', ты - сама доброта :3',                                      //4
                 ', мне очень жаль :(',                                         //5
                 ', прости что так вышло :(',                                   //6
                 ', спасибо за эту жертву',                                     //7
                 ' получает большой респект',                                   //8
                 ' своих в беде не бросает',                                    //9
                 ' получает плюс к карме',                                      //10
                 ' приносит себя в жертву',                                     //11
                 ' умирает во благо клана',                                     //12
                 ' делает благородный поступок',                                //13
                 ' берет тактическую паузу',                                    //14
                 ' достойный игрок - проверено!',                               //15
                 ' очень вкусный и сочный пузырь',                              //16
                 ', твоя душа теперь моя',                                      //17 Нейтральные
                 ', твоя смерть была неизбежна',                                //18
                 ', вечная память твоему глупому виду',                         //19
                 ', что-то в глаз попало?',                                     //20
                 ', поработай над собой и будешь как Я!',                       //21
                 ', учись пока я жив',                                          //22
                 ', земля тебе пухом',                                          //23
                 ', покойся с миром',                                           //24
                 ', твой исход был очевиден',                                   //25
                 ', ты никогда не победишь',                                    //26
                 ', я принимаю твою смерть',                                    //27
                 ', твоя очередь умирать',                                      //28
                 ', ты это заслужил',                                           //29
                 ', оставайся мертвым и не воскресай',                          //30
                 ', тебе нужно лучше стараться!',                               //31
                 ', черти в аду тебя уже заждались',                            //32
                 ', я освобождаю тебя от бремени жизни',                        //33
                 ', ты будешь отлично смотреться с яблоком во рту!',            //34
                 ', прими мой совет - оставайся мертвым',                       //35
                 ', ну в следующей жизни точно повезет!',                       //36
                 ', это честь для тебя - умереть от моей руки',                 //37
                 ', грань между твоей храбростью и глупостью довольно тонкая',  //38
                 ', и это все, что требуется для твоего убийства?',             //39
                 ', будь ты в моем клане - остался бы жив',                     //40
                 ', не жди что я стану тебя отпевать',                          //41
                 ' на вкус как тухлая курица',                                  //42
                 ' успешно съеден',                                             //43
                 ' раздавлен и унижен',                                         //44
                 ' отправился ко всем чертям',                                  //45
                 ' все равно был скучным и не интересным',                      //46
                 ' жил как бот и умер как бот',                                 //47
                 ' откисает, помянем бедолагу',                                 //48
                 ' теперь разглядывает бустеры',                                //49
                 ' помер, кто следующий?',                                      //50
                 ' У ТЕБЯ НЕТ ДОСТУПА К ЭТИМ ФУНКЦИЯМ!'];

var fraz_resp = ['Скучали по мне?',                                             //0
                 'Нет ничего лучше небольшой передышки',                        //1
                 'Жил без страха и умер без страха',                            //2
                 'Только что из могилы!',                                       //3
                 'Вновь вернулся!',                                             //4
                 'Смерть не властна надо мной!',                                //5
                 'Теперь ваша очередь умирать',                                 //6
                 'У меня была великолепная экскурсия по кладбищу',              //7
                 'Одно сражение - еще не война',                                //8
                 'Я был повержен, но не побежден',                              //9
                 'Ваш бог явился!',                                             //10
                 'Я снизошел до хождения среди смертных',                       //11
                 'Человек ошибается — бог возрождается',                        //12
                 'Окровавленный, но непокоренный',                              //13
                 'Короткий отдых, и я снова в строю',                           //14
                 'Вновь за дело!',                                              //15
                 'Я вновь на охоте',                                            //16
                 'Разбегайтесь, пока можете!',                                  //17
                 'Меня так легко не остановить',                                //18
                 'Гляньте, кто вернулся',                                       //19
                 'Пришло время отомстить',                                      //20
                 'Претенденты на мой трон будут сильно разочарованы',           //21
                 'Не думайте, что справились со мной',                          //22
                 'Готов поспорить, вы рады снова видеть меня',                  //23
                 'Я вернулся с новым списком жертв',                            //24
                 'Кто-то объявил цену за мою голову?',                          //25
                 'Я не был мертв. Я просто стал невидимым',                     //26
                 'В этом мире неизбежны только смерть и налоги',                //27
                 'Моё сердце снова бьётся!',                                    //28
                 'Моя смерть - лишь капля в море пролитой мной крови!',         //29
                 'Это была всего лишь царапина'];                               //30

var fraz_live = ['Чуть не помер',                                               //0
                 'Выжил!',                                                      //1
                 'Повезло, повезло..',                                          //2
                 'Второе дыхание',                                              //3
                 'Ха, бессмертие!',                                             //4
                 'В этот раз смерть прошла мимо',                               //5
                 'Вжух и чуть не съели',                                        //6
                 'Минус бустер воскрешения',                                    //7
                 'Лети маленький призрак, лети',                                //8
                 'Встречайте маленькое привидение',                             //9
                 'Вызывайте охотников за привидениями',                         //10
                 'Так просто не убить',                                         //11
                 'Легко отделался',                                             //12
                 'Оп и почти в гроб',                                           //13
                 'Вроде живой, а вроде и нет',                                  //14
                 'Не убил..'];                                                  //15

function newFraz() {
    if (my_id == 819203) {
            fraz_kill = [', Ты просто чудо :)',                                 //0 Мирные
                 ', Благодарна за помощь!',                                     //1
                 ', Очень мило с твоей стороны ;)',                             //2
                 ', Очень признательна!',                                       //3
                 ', Ты - сама доброта :3',                                      //4
                 ', Мне очень жаль :(',                                         //5
                 ', Прости, что так вышло :(',                                  //6
                 ', Спасибо за эту жертву',                                     //7
                 ' Сам погибай, а товарища выручай',                            //8
                 ' Своих в беде не бросаем',                                    //9
                 ' Ты просто прелесть',                                         //10
                 ' Принес себя в жертву',                                       //11
                 ' Все во благо клана',                                         //12
                 ' Очень благородный поступок',                                 //13
                 ' Большое тебе «спасибо»',                                     //14
                 ' Достойный игрок - проверено!',                               //15
                 ' Ты очень вкусненький',                                       //16
                 ', Забавный малый',                                            //17 Нейтральные
                 ', Да мне цены нет',                                           //18
                 ', Проблема решена',                                           //19
                 ', Только бы не подавится',                                    //20
                 ', Улыбнись, смех продлевает жизнь',                           //21
                 ', Учись пока я жива',                                         //22
                 ', А что другие так не делают',                                //23
                 ', Эники-беники ели вареники...',                              //24
                 ', За битого двух небитых дают',                               //25
                 ', Ты никогда не победишь',                                    //26
                 ', Танцуй Россия и плачь Европа',                              //27
                 ', Один в поле не воин',                                       //28
                 ', Улыбнись пока у тебя есть еще зубы',                        //29
                 ', Какая гадость это ваша заливная рыба',                      //30
                 ', Тебе нужно лучше стараться!',                               //31
                 ', В схватке побеждает лучший',                                //32
                 ', Бедность - не порок',                                       //33
                 ', Заморила червячка',                                         //34
                 ', Не переживай все в твоих руках',                            //35
                 ', Ну в следующей раз точно повезет!',                         //36
                 ', Я немного тебя покусаю)',                                   //37
                 ', Ни чего личного',                                           //38
                 ', И это все, на что ты способен?',                            //39
                 ', Случайных совпадений не бывает',                            //40
                 ', Не трогай проблему пока проблема не трогает тебя',          //41
                 ' Это будет не больно',                                        //42
                 ' Преимущество на моей стороне',                               //43
                 ' Это мне уже нравится',                                       //44
                 ' Прокачай пузырь, а то не тянешь',                            //45
                 ' Лучше со мной дружить',                                      //46
                 ' Мир очень жесток',                                           //47
                 ' Только чур без мата',                                        //48
                 ' Бери бобосы и вперед',                                       //49
                 ' Это всего лишь игра',                                        //50
                 ' Момент истины!'];

    fraz_resp = ['Скучали по мне?',                                             //0
                 'Нет ничего лучше отпуска',                                    //1
                 'Наслаждаюсь жизнью',                                          //2
                 'Люблю пельмешки, булки и плюшки! Все кроме сухарей)',         //3
                 'А это я, не ждали?',                                          //4
                 'Надеюсь тебе понравилось так же как и мне)',                  //5
                 'Все за одного и одна за всех',                                //6
                 'Я буду жить)))',                                              //7
                 'Одно сражение - еще не война',                                //8
                 'Победа будет за мной)',                                       //9
                 'Догони если сможешь',                                         //10
                 'Хорошо там где нас нет',                                      //11
                 'Корону поправлю и дальше играть',                             //12
                 'От куда в вас так много злости',                              //13
                 'Короткий отдых, и я снова в строю',                           //14
                 'Вновь за дело!',                                              //15
                 'Я вновь на охоте',                                            //16
                 'Разбегайтесь, пока можете!',                                  //17
                 'Меня так легко не остановить',                                //18
                 'Гляньте, кто вернулся',                                       //19
                 'Пришло время отомстить',                                      //20
                 'Чтобы меня сьесть нужно сильно постараться',                  //21
                 'Не думайте, что справились со мной',                          //22
                 'Готова поспорить, вы рады снова видеть меня',                 //23
                 'Я вернулась с новыми силами',                                 //24
                 'Вы без ума от меня, я это знаю',                              //25
                 'И опять я невидимка',                                         //26
                 'Еще чего захотели, ни чего не вышло',                         //27
                 'Моё сердце снова бьётся!',                                    //28
                 'Это было не больно',                                          //29
                 'Это была всего лишь царапина'];                               //30

    fraz_live = ['Фух чуть не сьели',                                           //0
                 'Выжила!',                                                     //1
                 'Повезло, так повезло..',                                      //2
                 'Второе дыхание',                                              //3
                 'Ха, бессмертие!',                                             //4
                 'Дело недоделано',                                             //5
                 'Все идет по плану',                                           //6
                 'Минус бустер воскрешения',                                    //7
                 'Ребята давайте жить дружно',                                  //8
                 'Встречайте маленькое привидение',                             //9
                 'Это возбудительно',                                           //10
                 'Меня так просто не убить',                                    //11
                 'Легко отделалась',                                            //12
                 'Фигвам — это название индейской народной избы',               //13
                 'Рожденный ползать куда ты лезешь?',                           //14
                 'Не убил..'];                                                  //15
    }
}

setTimeout(newFraz, 5000);

var bodySkins = ["1","2","3","4","46","47","48","49","50","51","52","53","120","121","122","123","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","273","345","346","347","348","349","350","351","352","353","354","355","356","357","358","359","360","361","362","363","364","365","366","411","412","421","422","423","424","425","430","431","432","433","434","435","436","437","438","439","440","441","442","443","444","445","446","447","448","479","480","481","482","483","484","485","486","487","488","489","490","531","532","533","534","535","536","537","538","539","540","541","542"];
var eyesSkins = ["5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","274","275","285","286","287","288","289","290","291","292","293","294","295","296","297","298","299","300","301","302","303","304","367","368","369","370","371","372","373","374","375","376","377","378","379","380","381","382","383","384","385","386","407","408","413","414","415","416","449","450","451","452","453","454","455","456","457","458","459","460","461","462","463","501","502","503","504","505","506","507","508","509","510","555","556","557","558","559","560","561","562","563","564","565","566"];
var mouthSkins = ["28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","157","158","159","160","161","162","237","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","253","254","276","277","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","387","388","389","390","391","392","393","394","395","396","397","398","399","400","401","402","403","404","405","406","409","410","417","418","419","420","464","465","466","467","468","469","470","471","472","473","474","475","476","477","478","521","522","523","524","525","526","527","528","529","530","543","544","545","546","547","548","549","550","551","552","553","554"];
var beardSkins = ["102","103","104","105","106","107","108","109","110","163","164","165","166","167","168","169","170","171","172","173","174","175","255","256","257","258","259","260","261","262","263","264","265","266","267","268","269","270","271","272","280","491","492","493","494","495","496","497","498","499","500","574","575","576"];
var hairSkins = ["88","89","90","91","92","93","94","95","96","97","98","99","100","101","136","137","138","139","140","141","142","143","144","145","146","147","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","511","512","513","514","515","516","517","518","519","520","567","568","569","570","571","572","573"];
var decaSkins = [0,0,0,1,0,0,0,1,0,0,0];

var origSkins = [];
var muteChat = [];

var myConfig = [];
var tempConfig = [];

var attacSpeed = 500;

var counterLnk = 12;

var skinded1 = 527242; // _BANDIT_ (#batm)
var skinDed2 = 239722; // НЕ буди ЛИХО (#54yy)
var skinDed3 = 156503; // _SeNaToR_ (#3crb)
var skinDed4 = 443723; // EVIL (#9idn)
var skinDed5 = 1153751; // muhomor
var skinDed6 = 1194961; // mozay
var skinDed7 = 11;
var skinDed8 = 11;
var skinDed9 = 11;
var skinDed10 = 11;
var skinSnow1 = 365954; // Melek (#7ude)
var skinSnow2 = 456584; // Ваша Иллюзия (#9saw)
var skinSnow3 = 60617; // Čīņērarīa (#1art)
var skinSnow4 = 137672; // Amelia (#2y88)
var skinSnow5 = 406459; // _-Li Li Я-_ (#8pmj)
var skinSnow6 = 848481; // Atlantean (#i6ox)
var skinSnow7 = 1008509; // РоМаШкАsЯдоМ (#lm65)
var skinSnow8 = 11;
var skinSnow9 = 11;
var skinSnow10 = 11;
var skinSvet1 = 43410911; // Sweet Cheeks (#9ayl)
var skinSvet2 = 211455; // _RoSiNkA_ (#4j5r)
var skinSvet3 = 261486; // СВЕХА (#5lri)
var skinSvet4 = 700949; // ОСА (#f0ut)
var skinSvet5 = 543316; // plazma
var skinSvet6 = 366630; // СливаЛиловаЯ (#7uw6)
var skinSvet7 = 825693; // _ШаХинЯ_ (#hp3x)
var skinSvet8 = 134605; // Нервотрёпка (#2vv1)
var skinSvet9 = 11;
var skinSvet10 = 11;
var skinEvil1 = 597460; // Графиня (#ct04)
var skinEvil2 = 819203; // Вершинка (#hk3n)
var skinEvil3 = 428928; // Изжога (#96yo)
var skinEvil4 = 1108738; // Доктор Aleks (#nria)
var skinEvil5 = 610988; // New York (#d3fw)
var skinEvil6 = 282763; // indu (#626j)
var skinEvil7 = 420094; // lana
var skinEvil8 = 343364; // tashihgi
var skinEvil9 = 19268; // elnara
var skinEvil10 = 11;
var skinMehb1 = 11; // -DrāmāQuēēn- (#ghx6)
var skinMehb2 = 13241; // _SHE-DEVIL_ (#a7t)
var skinMehb3 = 287886; // H_i_M_E_R_A (#664u)
var skinMehb4 = 1103563; // РыжиК-ПыЖиК (#nnij)
var skinMehb5 = 155174; // P_A_N_I_K_A (#3bqe)
var skinMehb6 = 11;
var skinMehb7 = 11;
var skinMehb8 = 11;
var skinSwag1 = 11; // S A K U R A (#1mhg)
var skinSwag2 = 1195867; // ВИНИШКОсЧАЕМ (#pmqj)
var skinSwag3 = 897847; // Anti-Christ (#j8s7)
var skinSwag4 = 563035; // Semper Simul (#c2fv)
var skinSwag5 = 175951; // _BOMB_ (#3rrj)
var skinSwag6 = 11;
var skinSwag7 = 11;
var skinSwag8 = 11;
var skinSvit1 = 991323; // Starlette (#l8wr)
var skinSvit2 = 158098; // Dārk MiĻādy (#3dzm)
var skinSvit3 = 973719; // Taya (#kvbr)
var skinSvit4 = 1064573; // ПЛЮШКА (#mtfh)
var skinSvit5 = 15670; // SDM 2908 (#c3a)
var skinSvit6 = 11;
var skinSvit7 = 11;
var skinSvit8 = 11;
var skinMonh1 = 89606; // -MīDāZolāM- (#1x52)
var skinMonh2 = 351530; // _ЮпИтеР_ (#7j8q)
var skinMonh3 = 274546; // ЕнотхимеВРот (#5vua)
var skinMonh4 = 260918; // anunah
var skinMonh5 = 680845; // kolovrat
var skinMonh6 = 11;
var skinMonh7 = 11;
var skinMonh8 = 11;
var skinPuhb1 = 430800; // UNREALITY (#98eo)
var skinPuhb2 = 477241; // м_АНЬ_як (#a88p)
var skinPuhb3 = 1000296; // Yury Artemye (#lfu0)
var skinPuhb4 = 340996; // Semper Simul (#7b44)
var skinPuhb5 = 229990; // Atlantean (#4xgm)
var skinPuhb6 = 1240290; // dreamer
var skinPuhb7 = 850977; // lacis
var skinPuhb8 = 11;
var skinCrys1 = 615488; // dochka
var skinCrys2 = 131328; // fscm
var skinCrys3 = 959234; // gagra
var skinCrys4 = 948128; // beyond
var skinCrys5 = 551717; // swallowed
var skinCrys6 = 813591; // ama
var skinCrys7 = 329551; // м_АНЬ_яч_КА (#72a7)
var skinCrys8 = 11;
var skinMuda1 = 750075; // mjir
var skinMuda2 = 639187; // bobr
var skinDram1 = 769722;
var skinDram2 = 11;
var skinBipo1 = 75796;
var skinBipo2 = 11;

var skinClred1 = 46;
var skinClred2 = 14990;
var skinClred21 = 297;
var skinClred22 = 12770;
var skinClblue1 = 15174;
var skinClblue2 = 3155;
var skinClblue21 = 13844;
var skinClblue22 = 128;
var skinClgreen1 = 14531;
var skinClgreen2 = 63;
var skinClblack1 = 15024;
var skinClblack2 = 15075;
var skinClblack21 = 15232;
var skinClblack22 = 14901;
var skinClyellow1 = 15003;
var skinClyellow2 = 285;
var skinClyellow21 = 116;
var skinClyellow22 = 4693;

var creatorGamer = 790743;//1240290;//1286928
var creatorSkins = ["2005", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "4", "0"];
var creatorWings = 'rb';

function setModSkin(idx, id, clan, boss, team, skin) {
    if(skinPlayers == true){
        if( id == skinded1  ||
            id == skinDed2  ||
            id == skinDed3  ||
            id == skinDed4  ||
            id == skinDed5  ||
            id == skinDed6  ||
            id == skinDed7  ||
            id == skinDed8  ||
            id == skinDed9  ||
            id == skinDed10 ||
            id == skinSnow1 ||
            id == skinSnow2 ||
            id == skinSnow3 ||
            id == skinSnow4 ||
            id == skinSnow5 ||
            id == skinSnow6 ||
            id == skinSnow7 ||
            id == skinSnow8 ||
            id == skinSnow9 ||
            id == skinSnow10||           
            id == skinSvet1 ||
            id == skinSvet2 ||
            id == skinSvet3 ||
            id == skinSvet4 ||
            id == skinSvet5 ||
            id == skinSvet6 ||
            id == skinSvet7 ||
            id == skinSvet8 ||
            id == skinSvet9 ||
            id == skinSvet10||
            id == skinEvil1 ||
            id == skinEvil2 ||
            id == skinEvil3 ||
            id == skinEvil4 ||
            id == skinEvil5 ||
            id == skinEvil6 ||
            id == skinEvil7 ||
            id == skinEvil8 ||
            id == skinEvil9 ||
            id == skinEvil10||
            id == skinMehb1 ||
            id == skinMehb2 ||
            id == skinMehb3 ||
            id == skinMehb4 ||
            id == skinMehb5 ||
            id == skinMehb6 ||
            id == skinMehb7 ||
            id == skinMehb8 ||
            id == skinSwag1 ||
            id == skinSwag2 ||
            id == skinSwag3 ||
            id == skinSwag4 ||
            id == skinSwag5 ||
            id == skinSwag6 ||
            id == skinSwag7 ||
            id == skinSwag8 ||
            id == skinSvit1 ||
            id == skinSvit2 ||
            id == skinSvit3 ||
            id == skinSvit4 ||
            id == skinSvit5 ||
            id == skinSvit6 ||
            id == skinSvit7 ||
            id == skinSvit8 ||
            id == skinMonh1 ||
            id == skinMonh2 ||
            id == skinMonh3 ||
            id == skinMonh4 ||
            id == skinMonh5 ||
            id == skinMonh6 ||
            id == skinMonh7 ||
            id == skinMonh8 ||
            id == skinPuhb1 ||
            id == skinPuhb2 ||
            id == skinPuhb3 ||
            id == skinPuhb4 ||
            id == skinPuhb5 ||
            id == skinPuhb6 ||
            id == skinPuhb7 ||
            id == skinPuhb8 ||
            id == skinCrys1 ||
            id == skinCrys2 ||
            id == skinCrys3 ||
            id == skinCrys4 ||
            id == skinCrys5 ||
            id == skinCrys6 ||
            id == skinCrys7 ||
            id == skinCrys8 ||
            id == skinMuda1 ||
            id == skinMuda2 ||
            id == skinDram1 ||
            id == skinDram2 ||
            id == skinBipo1 ||
            id == skinBipo2 ||
            id == -1 ){
		                        
            if( id == skinded1 ||
                id == skinDed2 ||
                id == skinDed3 ||
                id == skinDed4 ||
                id == skinDed5 ||
                id == skinDed6 ||
                id == skinDed7 ||
                id == skinDed8 ||
                id == skinDed9 ||
                id == skinDed10){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], "0", "1240", "1241", "0", "0", "1", "0", "0", skin[12], "1"], null, 'red2');
            }else
            if( id == skinSnow1 ||
                id == skinSnow2 ||
                id == skinSnow3 ||
                id == skinSnow4 ||
                id == skinSnow5 ||
                id == skinSnow6 ||
                id == skinSnow7 ||
                id == skinSnow8 ||
                id == skinSnow9 ||
                id == skinSnow10){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], "0", "1310", "0", "0", "0", "1", "0", "0", skin[12], "1"], null, 'yellow2');
            }else
            if( id == skinSvet1 ||
                id == skinSvet2 ||
                id == skinSvet3 ||
                id == skinSvet4 ||
                id == skinSvet5 ||
                id == skinSvet6 ||
                id == skinSvet7 ||
                id == skinSvet8 ||
                id == skinSvet9 ||
                id == skinSvet10){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], "0", "1320", "0", "0", "0", "1", "0", "0", skin[12], "1"], null, 'yellow');
            }else
            if( id == skinEvil1 ||
                id == skinEvil2 ||
                id == skinEvil3 ||
                id == skinEvil4 ||
                id == skinEvil5 ||
                id == skinEvil6 ||
                id == skinEvil7 ||
                id == skinEvil8 ||
                id == skinEvil9 ||
                id == skinEvil10){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1300", "1301", "0", "0", "1", "0", "0", skin[12], "1"], null, 'red5');
            }else
            if( id == skinMehb1 ||
                id == skinMehb2 ||
                id == skinMehb3 ||
                id == skinMehb4 ||
                id == skinMehb5 ||
                id == skinMehb6 ||
                id == skinMehb7 ||
                id == skinMehb8 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1260", "1261", "0", "0", "1", "0", "0", skin[12], "1"], null, 'white');
            }else
            if( id == skinSwag1 ||
                id == skinSwag2 ||
                id == skinSwag3 ||
                id == skinSwag4 ||
                id == skinSwag5 ||
                id == skinSwag6 ||
                id == skinSwag7 ||
                id == skinSwag8 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], "0", "1330", "0", "0", "0", "1", "0", "0", skin[12], "1"], null, 'bip');
            }else
            if( id == skinSvit1 ||
                id == skinSvit2 ||
                id == skinSvit3 ||
                id == skinSvit4 ||
                id == skinSvit5 ||
                id == skinSvit6 ||
                id == skinSvit7 ||
                id == skinSvit8 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1270", "1271", "0", "0", "1", "0", "0", skin[12], "1"], null, 'pink');
            }else
            if( id == skinMonh1 ||
                id == skinMonh2 ||
                id == skinMonh3 ||
                id == skinMonh4 ||
                id == skinMonh5 ||
                id == skinMonh6 ||
                id == skinMonh7 ||
                id == skinMonh8 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], "0", "1290", "1291", "0", "0", "1", "0", "0", skin[12], "1"], null, 'red');
            }else
            if( id == skinPuhb1 ||
                id == skinPuhb2 ||
                id == skinPuhb3 ||
                id == skinPuhb4 ||
                id == skinPuhb5 ||
                id == skinPuhb6 ||
                id == skinPuhb7 ||
                id == skinPuhb8 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1280", "1281", "0", "0", "1", "0", "0", skin[12], "1"], null, 'blue');
            }else
            if( id == skinCrys1 ||
                id == skinCrys2 ||
                id == skinCrys3 ||
                id == skinCrys4 ||
                id == skinCrys5 ||
                id == skinCrys6 ||
                id == skinCrys7 ||
                id == skinCrys8 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1250", "1251", "0", "0", "1", "0", "0", skin[12], "1"], null, 'white2');
            }else
            if( id == skinDram1 ||
                id == skinDram2 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1260", "0", "0", "0", "1", "0", "0", skin[12], "1"], null, 'white');
            }else
            if( id == skinBipo1 ||
                id == skinBipo2 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1040", "0", "0", "0", "1", "0", "0", skin[12], "1"], null, 'black');
            }else
            if( id == skinMuda1 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin(["2001", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
            }else
            if( id == skinMuda2 ){
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin(["2002", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
            }else
            if( id == -1 && boss == 0 ){
                var deca = decaSkins[random.getRandomInt(0, decaSkins.length - 1)];
                var body = bodySkins[random.getRandomInt(0, bodySkins.length - 1)];
                var eyes = eyesSkins[random.getRandomInt(0, eyesSkins.length - 1)];
                var mouth = mouthSkins[random.getRandomInt(0, mouthSkins.length - 1)];
                var hat = random.getRandomInt(1031, 1057);
                if (deca == 0) {
                    var beard = "0";
                } else {
                    var beard = beardSkins[random.getRandomInt(0, beardSkins.length - 1)];
                }
                game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([body, eyes, mouth, beard, "0", hat, "0", "0", "0", "1", "0", "0", "0", "0"]);
            }
        } else {
            if ( clan == skinClred1 ||
                 clan == skinClred2 ) {
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1110", "1111", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'red2');
            }else
            if ( clan == skinClred21 ||
                 clan == skinClred22 ) {
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1140", "1141", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'red3');
            }else
            if ( clan == skinClblue1 ||
                 clan == skinClblue2 ){
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1120", "1121", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'blue2');
            }else
            if ( clan == skinClblue21 ||
                 clan == skinClblue22 ){
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1130", "1131", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'blue3');
            }else
            if ( clan == skinClgreen1 ||
                 clan == skinClgreen2 ){
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1150", "1151", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'green');
            }else
            if ( clan == skinClblack1 ||
                 clan == skinClblack2 ){
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1160", "1161", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'red4');
            }else
            if ( clan == skinClblack21 ||
                 clan == skinClblack22 ){
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1170", "1171", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'red4');
            }else
            if ( clan == skinClyellow1 ||
                 clan == skinClyellow2 ){
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1180", "1181", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'blue4');
            }else
            if ( clan == skinClyellow21 ||
                 clan == skinClyellow22 ){
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], "1190", "1191", "0", "0", "1", skin[10], "0", skin[12], "1"], null, 'yellow3');
            } else {
                 var hat;
                 var dress;
                 if (team == 1) {
                     hat = random.getRandomInt(1001, 1010);
                     dress = 1211;
                 }else
                 if (team == 2) {
                     hat = random.getRandomInt(1011, 1020);
                     dress = 1221;
                 }else
                 if (team == 3) {
                     hat = random.getRandomInt(1021, 1030);
                     dress = 1231;
                 }
                 game.playersInfo[idx].mesh.texture[0] = createPlayerSkin([skin[0], skin[1], skin[2], skin[3], skin[4], hat, dress, "0", "0", "1", skin[10], "0", skin[12], skin[13]]);
            }
        }
    } else {
        if( id == creatorGamer) {
            game.playersInfo[idx].mesh.texture[0] = createPlayerSkin(creatorSkins, null, creatorWings);
        }
    }
}