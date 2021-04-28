// phina.js をグローバル領域に展開
phina.globalize();

//画面変数定義
var SCREEN_X = 640;
var SCREEN_Y = 960;
var scale = 1;
var P_size = 48 * scale;
//梯子位置配列
var ladders_x = ["580","100","580"];
var ladders_y = ["300","500","700"];

//プレイヤーの移動座標
var p_position_x = ["100", "220", "340", "460", "580",
                    "580", "460", "340", "220", "100",
                    "100", "220", "340", "460", "580",
                    "580", "460", "340", "220", "100",
                    ];
var p_position_y = ["150", "150", "150", "150", "150",
                    "330", "330", "330", "330", "330",
                    "530", "530", "530", "530", "530",
                    "720", "720", "720", "720", "720",
                    ];
//場所配列インデックス
var index=10;
//サイコロの目保持変数
var dice;

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
 /*        this.player = Player().addChildTo(this);
        this.player.setPosition(p_position_x[index] , p_position_y[index]);
        this.player.width = 100;
        this.player.height = 100; */

        //最初の人間
        var sprite = Sprite('p', 100, 100).addChildTo(this);
        // 初期位置
        sprite.x = p_position_x[index];
        sprite.y = p_position_y[index];
        //クリックしたらサイコロふる
        this.onclick = function(){
            //乱数作成
            dice = Math.floor(Math.random() * 6 + 1);
            alert("出目は " + dice + " !!");
            //出た目の分移動
            //下まで行ったら最初から
            var newIndex = index + dice;
            // 更新イベント
            //動き方条件分岐
            //さいころの目の数
/*             for(i=0; i<dice; i++){
                //動き方によって分岐
                if(index<=3　|| (index>=10 && index<=13)){
                    //次のマスまで
                    sprite.update = function() {
                        // 移動
                        sprite.y += 2;
                    };
                }
            } */
            sprite.update = function() {
            // 移動
                sprite.y += 2;
                
            } 

            if (index >= 20){
                //alert("最初に戻るよ");
                index -= 20;
            }
            //console.log(this);
            // function draw(){
            //     counter++;
            //     this.player.setPosition( p_position_x[index] + counter, p_position_y[index]);
            //     window.requestAnimationFrame((ts) => draw(ts));
            // }
            // window.requestAnimationFrame((ts) => draw(this.player));
            //新しいものを描画
            // for(i=0; i<dice; i++){
            //     index++;
            //     for(j=0; j<10;j++){

            //         this.player.setPosition( p_position_x[index], p_position_y[index]);
            //     }
            // }
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

