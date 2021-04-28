// phina.js をグローバル領域に展開
phina.globalize();


//画面変数定義
var SCREEN_X = 640;
var SCREEN_Y = 960;
var scale = 1;
var P_size = 48 * scale;
var ladders_x = ["580","100","580"];
var ladders_y = ["300","500","700"];

var p_position_x = 100;
var p_position_y = 150;

var dice=0;

var ASSETS = {
    image: {
        'bg' : 'under.png',
        'p'  : 'p.png',
        'masu' : 'masu.png',
        'ladder':'ladder.png',
    },
};

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',

    init: function(option) {
        this.superInit(option);
        //背景
        this.bg = Sprite("bg").addChildTo(this);
        this.bg.origin.set(0, 0);
        this.bg.width = SCREEN_X;
        this.bg.height = SCREEN_Y;

        //マス
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                this.masu = Masu().addChildTo(this);
                this.masu.setPosition(100 + i*120, 200 + j*200);
                this.masu.width = 80;
                this.masu.height = 80;
            }
        }

        //梯子
        for(let i = 0; i < 3; i++){
            this.ladder = Ladder().addChildTo(this);
            this.ladder.setPosition(ladders_x[i],ladders_y[i]);
            this.ladder.width = 100;
            this.ladder.height = 170;
        }

        
        //プレイヤー
        this.player = Player().addChildTo(this);
        this.player.setPosition(p_position_x, p_position_y);
        this.player.width = 100;
        this.player.height = 100;

        document.getElementById("button").onclick = function(){
            
        };
    },
});


//プレイヤークラス
phina.define("Player", {
    //継承
    superClass: 'Sprite',
    //コンストラクタ
    init: function() {
        this.superInit('p');
    },

});

//マスクラス
phina.define("Masu", {
    //継承
    superClass: 'Sprite',
    //コンストラクタ
    init: function() {
        this.superInit('masu');
    },

});

//梯子クラス
phina.define("Ladder", {
    //継承
    superClass: 'Sprite',
    //コンストラクタ
    init: function() {
        this.superInit('ladder');
    },

});

var clickfunc= function(){
    
    dice = Math.floor(Math.random() * 6 + 1);
    alert(dice);

    this.player.update = function(){
        p_position_x += dice * 100;
    };
};










// メイン処理
phina.main(function () {
    // アプリケーション生成
    var app = GameApp({
        startLabel: 'main', // メインシーンから開始する
        width: SCREEN_X,
        height: SCREEN_Y,
        assets: ASSETS,
    });

    // アプリケーション実行
    app.run();
});

