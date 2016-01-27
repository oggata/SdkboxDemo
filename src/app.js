
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        if (typeof sdkbox === "undefined") {
            cc.log("sdkbox undefined");
            return true;
        }
        sdkbox.PluginFacebook.init();
        sdkbox.PluginFacebook.setListener({
            onLogin: function(isLogin, msg) {
              if(isLogin){
                cc.log("login successful");
              }
              else {
                cc.log("login failed");
              }
            },
            onAPI: function(tag, data) {
              cc.log(tag);
              cc.log(data);
            },
            onSharedSuccess: function(data) {
              cc.log("share successful");
            },
            onSharedFailed: function(data) {
              cc.log("share failed");
            },
            onSharedCancel: function() {
              cc.log("share canceled");
            },
            onPermission: function(isLogin, msg) {
              if(isLogin) {
                cc.log("request permission successful");
              }
              else {
                cc.log("request permission failed");
              }
            }
        });

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                sdkbox.PluginFacebook.login();
                cc.log("UserID: " + sdkbox.PluginFacebook.getUserID());
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var shareItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Share is clicked!");
                var info = new Object();
                info.type  = "link";
                info.link  = "http://www.cocos2d-x.org";
                info.title = "cocos2d-x";
                info.text  = "Best Game Engine";
                info.image = "http://cocos2d-x.org/images/logo.png";
                sdkbox.PluginFacebook.dialog(info);
            }, this);
        shareItem.attr({
            x: size.width - 20,
            y: 100,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem,shareItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

