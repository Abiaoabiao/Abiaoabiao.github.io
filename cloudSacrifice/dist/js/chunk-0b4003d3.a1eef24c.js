(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b4003d3"],{"468b":function(e,t,r){"use strict";r("9745")},9745:function(e,t,r){},edfd:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"memorial-article"},[r("div",{staticClass:"article"},[e._m(0),r("article-item",{attrs:{hallId:e.hallId,type:1},model:{value:e.isUpdate,callback:function(t){e.isUpdate=t},expression:"isUpdate"}})],1),r("div",{staticClass:"send-article"},[e._m(1),r("el-form",{ref:"addArticleFormRef",staticClass:"article-form",attrs:{model:e.addArticleForm,rules:e.addArticleRules,"label-width":"0px"}},[r("el-form-item",{attrs:{prop:"title"}},[r("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.addArticleForm.title,callback:function(t){e.$set(e.addArticleForm,"title",t)},expression:"addArticleForm.title"}})],1),r("el-form-item",{attrs:{prop:"content"}},[r("quill-editor",{attrs:{options:e.editorOption},on:{blur:e.questiononblur},model:{value:e.addArticleForm.content,callback:function(t){e.$set(e.addArticleForm,"content",t)},expression:"addArticleForm.content"}})],1),r("el-form-item",{staticClass:"btn-box"},[r("el-button",{attrs:{loading:e.pubLoading},on:{click:e.onSubmit}},[e._v("快速发表")])],1)],1)],1)])},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header"},[r("span",{staticClass:"title"},[e._v("追思文章·"),r("span",{staticClass:"green"},[e._v("超越时空的情感")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header"},[r("span",{staticClass:"title"},[e._v("快速发表·"),r("span",{staticClass:"green"},[e._v("纪念文章")])])])}],l=r("1da1"),n=(r("96cf"),r("fb6a"),r("6ea2")),s=r("2423"),c={name:"MemorialArticle",components:{ArticleItem:n["a"]},props:{hallPath:{type:String,require:!0}},data:function(){return{addArticleForm:{title:"",content:""},addArticleRules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],content:[{required:!0,message:"请输入标题"}]},editorOption:{placeholder:"请输入内容",modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],[{align:[]}],["clean"],["image"]]}},pubLoading:!1,isUpdate:!1}},computed:{hallId:function(){return parseInt(this.hallPath.slice(1))}},watch:{},created:function(){},mounted:function(){},methods:{questiononblur:function(){this.$refs.addArticleFormRef.validateField("content")},onSubmit:function(){var e=this;this.$refs.addArticleFormRef.validate(function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(r){var a,i,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return",e.$message({message:"信息格式填写正确了，再点击快速发表哦！",type:"warning"}));case 2:return e.pubLoading=!0,t.prev=3,a={content:e.addArticleForm.content,hallId:e.hallId,title:e.addArticleForm.title,type:1},t.next=7,Object(s["d"])(a);case 7:if(i=t.sent,l=i.data,0===l.code){t.next=11;break}return t.abrupt("return",e.$message.error(l.msg));case 11:console.log(l),e.$message.success("发表成功"),e.isUpdate=!0,e.$refs.addArticleFormRef.resetFields(),t.next=20;break;case 17:t.prev=17,t.t0=t["catch"](3),e.$message.error("发表文章失败！");case 20:e.pubLoading=!1;case 21:case"end":return t.stop()}}),t,null,[[3,17]])})));return function(e){return t.apply(this,arguments)}}())}}},o=c,d=(r("468b"),r("2877")),u=Object(d["a"])(o,a,i,!1,null,"4a773c3c",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-0b4003d3.a1eef24c.js.map