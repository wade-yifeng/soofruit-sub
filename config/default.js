/*!     
 * 配置文件（开发环境）：
 * 1. 站点配置（端口，Host地址）       
 * 2. 数据库配置（mongodb，redis）
 * 3. 微信公众号配置       
 * 4. 微信开放平台配置      
*/
module.exports = {
    // 站点端口
    port: 80,
    // 数据库连接字符串
    db : "mongodb://localhost/test",
    WeChat: {
        // 公众号ID
        appid: "wx94911ed9aa3ef58c",
        // 公众号密钥
        appSecret: "c2f8def6c499b979bc46f7beee43091d",
        // 公众号预设Token    
        token: "Soostep123"
    }
}