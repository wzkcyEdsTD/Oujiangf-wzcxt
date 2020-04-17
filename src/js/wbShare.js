let url = 'http://service.weibo.com/share/share.php';
// count=表示是否显示当前页面被分享数量(1显示)(可选，允许为空)
// url=将页面地址转成短域名，并显示在内容文字后面。(可选，允许为空)
// appkey=用于发布微博的来源显示，为空则分享的内容来源会显示来自互联网。(可选，允许为空)
// title=分享时所示的文字内容，为空则自动抓取分享页面的title值(可选，允许为空)
// pic=自定义图片地址，作为微博配图(可选，允许为空)
// ralateUid=转发时会@相关的微博账号(可选，允许为空)
// language=语言设置(zh_cn|zh_tw)(可选)
// searchPic= true/false 用于控制是否自动爬取页面的图片，和pic不共存
export function WBShare (options) {
	let param = '', arr = [];
	for (let key in options) {
		if (options.hasOwnProperty(key)) {
			arr.push(key + '=' + options[key]);
		}
	}
	param = arr.length > 0 ? '?' + arr.join('&') : '';
	window.open(url + param, '_self', null, false);
}