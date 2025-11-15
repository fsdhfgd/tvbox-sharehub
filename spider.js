var rule = {
    title: '网盘短剧 Pro',
    host: 'https://pan.sharehub.club',
    homeUrl: '/api/search?page_no=1&page_size=20&title=',
    searchUrl: '/api/search?page_no=1&page_size=20&title=**',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    headers: { 'User-Agent': 'TVBox/1.0' },
    
    class_name: '短剧&热门&最新',
    class_url: '短剧&热门&最新',

    timeout: 5000,
    play_parse: true,
    lazy: `js:
        let url = input.split('$')[1];
        if (url.includes('quark.cn')) {
            input = { jx: 0, url: url, parse: 0, flag: 'quark' };
        } else {
            input = url;
        }
        log('播放链接: ' + url);
    `,

    // 首页推荐（模拟热门）
    一级: `js:
        let d = [];
        let titles = ['反推娇妻', '闪婚', '重生', '总裁', '替身'];
        titles.forEach((key, i) => {
            let html = request(HOST + '/api/search?page_no=1&page_size=5&title=' + encodeURIComponent(key));
            let json = JSON.parse(html);
            if (json.code == 200 && json.data.items) {
                json.data.items.forEach(item => {
                    d.push({
                        title: item.title || item.name,
                        pic_url: 'https://fsdf.sffs.netlib.re/cover/' + item.id + '.jpg',  // 封面占位
                        desc: item.times + ' | ' + (item.category?.name || '短剧'),
                        url: item.id + '$' + item.url,
                        content: item.title
                    });
                });
            }
        });
        setResult(d);
    `,

    // 搜索
    搜索: `js:
        let d = [];
        let html = request(HOST + '/api/search?page_no=1&page_size=20&title=' + encodeURIComponent(KEY));
        let json = JSON.parse(html);
        if (json.code == 200 && json.data.items) {
            json.data.items.forEach(item => {
                d.push({
                    title: item.title || item.name,
                    pic_url: 'https://fsdf.sffs.netlib.re/cover/' + item.id + '.jpg',
                    desc: item.times + ' | ' + (item.category?.name || '短剧'),
                    url: item.id + '$' + item.url,
                    content: item.title
                });
            });
        }
        setResult(d);
    `
};
