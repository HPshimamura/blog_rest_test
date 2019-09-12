Vue.component('v-loading', {
    props: {
        text: {
            default: 'ちょっと待ってね',
            type:String
        },
        show: {
            default: false,
            type:Boolean
        }
    },
    template:'<div v-if="show"><img src="89-88.gif">&nbsp;<span v-text="text"></span></div>'
}

)
var app = new Vue({
    el: "#posts",
    data: {
        posts: [],
        show: false
    },
    created: function () {
        var _this = this;
        this.show = true;
        axios.get("https://akros-ac.jp/wp-json/wp/v2/posts/?_embed")
            .then(function (response) {
                response.data.forEach(function (elm) {
                    var data = {
                        title: elm.title.rendered,
                        content: elm.excerpt.rendered,
                        link: elm.link,
                        category: elm._embedded["wp:term"],
                        thumb: elm._embedded["wp:featuredmedia"]
                    }
                    _this.posts.push(data);
                });
            })
            .catch(function (error) {
                console.log("記事が取得できません。");
            })
            .then(function () {
                _this.show = false;
            });
    }
});