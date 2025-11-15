var rule = {
    title: 'ShareHub短剧',
    host: 'https://pan.sharehub.club',
    url: '/api/search?page_no=1&page_size=20&title=fykeyword',
    searchUrl: '/api/search?page_no=1&page_size=20&title=**',
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: { 'User-Agent': 'Mozilla/5.0' },
    
    class_name: '短剧',
    class_url: '短剧',

    play_parse: true,
    lazy: `js:
        let url = input;
        if (/quark\\.cn/.test(url)) {
            input = { 
                jx: 0, 
                url: url, 
                parse: 0 
            };
        } else {
            input = url;
        }
    `,

    一级: `js:
        let d = [];
        let html = request(HOST + '/api/search?page_no=1&page_size=20&title=' + KEY);
        let json = JSON.parse(html);
        if (json.code == 200) {
            json.data.items.forEach(item => {
                d.push({
                    title: item.title || item.name,
                    pic_url: '',
                    desc: (item.times || '') + ' | ' + (item.category?.name || '短剧'),
                    url: item.url,
                    content: item.name || ''
                });
            });
        }
        setResult(d);
    `,

    二级: `js:
        let d = [];
        d.push({
            title: VOD.vod_name,
            pic_url: '',
            desc: VOD.vod_remarks,
            url: VOD.vod_play_url,
            content: VOD.vod_content || ''
        });
        setResult(d);
    `,

    搜索: `js:
        let d = [];
        let html = request(HOST + '/api/search?page_no=1&page_size=20&title=' + encodeURIComponent(KEY));
        let json = JSON.parse(html);
        if (json.code == 200) {
            json.data.items.forEach(item => {
                d.push({
                    title: item.title || item.name,
                    pic_url: '',
                    desc: (item.times || '') + ' | ' + (item.category?.name || '短剧'),
                    url: item.url,
                    content: item.name || ''
                });
            });
        }
        setResult(d);
    `
};
