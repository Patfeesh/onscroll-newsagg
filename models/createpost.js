exports.newarticle = function createArticle(item){
        new Article({
            title: item.title,
            link: item.link,
            pubdate: item.pubdate
        });
        return newarticle;
}