exports.newarticle = function createArticle(item){
        var newarticle =new Article({
            title: item.title,
            link: item.link,
            pubdate: item.pubdate
        });
        return newarticle;
};