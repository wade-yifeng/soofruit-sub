GLOBAL._ = require('underscore');
var express = require('express');
var http = require('http');
var wechat = require('wechat');
var config = require('config');
var wechatAPI = require('wechat-api');

var app = new express();
var server = http.Server(app);

app.use(express.query());

var Order = require('./models').Order;

app.get('/wechat', function (req, res) {
    console.log(req.query);

    // 签名成功
    if (wechat.checkSignature(req.query, config.WeChat.token)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
}).post('/wechat', wechat(config.WeChat, function (req, res, next) {
    console.log(req.weixin);
    // 微信输入信息都在req.weixin上
    var message = req.weixin;

    if(message != undefined) {
        if(message.Content.startsWith("*")) {
            var target = message.Content.substring(1);
            var args = _.filter(target.split(' '), function(s){ return s != ''; });
            console.log(args);
            if(args.length != 3) {
                res.reply({
                    content: '亲，输入的格式不对哦！',
                    type: 'text'
                });
            }
            else {
                var order = new Order({
                    type: args[0],
                    cname: args[1],
                    expressNo: args[2]
                });

                order.save(function (err) {
                    if (err) {
                        res.reply({
                            content: '亲，订单录入失败，麻烦联系技术哥哥吧！',
                            type: 'text'
                        });
                    }
                    else {
                        var article = {
                            "articles": [
                                {
                                 "title": args[0],
                                 "thumb_media_id": THUMB_MEDIA_ID,
                                 "author": "Wade",
                                 "digest": DIGEST,
                                 "show_cover_pic": SHOW_COVER_PIC(0 / 1),
                                 "content": CONTENT,
                                 "content_source_url": CONTENT_SOURCE_URL
                                }
                            ]
                        };

                        api.uploadNewsMaterial(news, callback);

                        res.reply({
                            content: '亲，您的运单信息已经录入成功！记录编号为：' + order._id.toString(),
                            type: 'text'
                        });
                    }
                });
            }
        }
    }
}));

server.listen(config.port, function () {
    console.log('Site is up on http://localhost:' + config.port);
});