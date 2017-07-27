/*
  文章数据导入测试
*/

var articles = {
    a0:{
        id:0,
        title:"This is Just Going To Be Another Test Post",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, lectus at varius tincidunt, tellus urna molestie ligula, aliquam luctus nisl nisi sed ante. Pellentesque",
        access:1,
        classi:1,
        recommid:3
    },
    a1:{
        id:1,
        title:"Another Test Post",
        content:"Sed faucibus, lectus at varius tincidunt, tellus urna molestie ligula, aliquam luctus nisl nisi sed ante. Pellentesque",
        access:1,
        classi:1,
        recommid:3
    },
    a2:{
        id:2,
        title:"Test Post",
        content:"at varius tincidunt, tellus urna molestie ligula, aliquam luctus nisl nisi sed ante. Pellentesque",
        access:1,
        classi:1,
        recommid:3
    },
    a3:{
        id:3,
        title:"my best Test Post",
        content:"the three is at varius tincidunt, tellus urna molestie ligula, aliquam luctus nisl nisi sed ante. Pellentesque",
        access:1,
        classi:1,
        recommid:3
    },
    a4:{
        id:5,
        content : "Free Basic Html5 Templates created More Templates. You can use and modify the template for both personal and commercial use. You must keep all copyright information and credit links in the template and associated files.",
        access : 1,
        classi : 2
    }
};



/*
  友情链接数据导入测试

*/

var links = {
    a0:{
       linkid:1, 
       title : 'Free html5 templates',
       content : "Free html5 templates is best",
       access:1, 
       classi:3,
       linkcommid:1,
       imgsrc:''
    },
    a1:{
       linkid:2, 
       title : 'css3 menus',
       content : "css3 menus is best",
       access:1, 
       classi:3,
       linkcommid:1,
       imgsrc:''
    },
    a3:{
       linkid:3, 
       title : 'responsive html5',
       content : "responsive html5 is best",
       access:1, 
       classi:3,
       linkcommid:1,
       imgsrc:''
    },
    a4:{
       linkid:4, 
       title : 'onepage',
       content : "onepage html5 is best",
       access:1, 
       classi:3,
       linkcommid:1,
       imgsrc:''
    },
    a5:{
       linkid:5, 
       title : 'animated html5',
       content : "animated html5 is best",
       access:1, 
       classi:3,
       linkcommid:1,
       imgsrc:''
    }
};


/*
  分类数据导入测试
*/
var categories = {
    a0:{
        cid:1,
        cateid:1,
        title:"Html5 Templates",
        classi:1,
        catecommid:1,
        access:1
    },
    a1:{
        cid:2,
        cateid:2,
        title:"Mobile Templates",
        classi:1,
        catecommid:3,
        access:1
    },
    a2:{
        cid:2,
        cateid:1,
        title:"Js Templates",
        classi:1,
        catecommid:1,
        access:1
    },
    a3:{
        cid:3,
        cateid:2,
        title:"Gulp Templates",
        classi:1,
        catecommid:1,
        access:1
    },
    a4:{
        cid:4,
        cateid:2,
        title:"C++ Templates",
        subclassi:1,
        catecommid:1,
        access:1
    },
    a5:{
        cid:5,
        cateid:3,
        title:"JAVA Templates",
        classi:1,
        catecommid:3,
        access:1
    },
    a6:{
        cid:6,
        cateid:3,
        title:"PHP Templates",
        classi:1,
        catecommid:3,
        access:1
    },
    a7:{
        cid:7,
        cateid:1,
        title:"Jquery Templates",
        classi:1,
        catecommid:3,
        access:1
    }
};


/*
  热门帖子数据导入测试
*/

var posts = {
    a0:{
        pid:1,
        access:1,
        classi:1,
        cateid:1,
        postcommid:3,
        title:"Sample post with, links, paragraphs and comments",
        content:"Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices",
        imgsrc:"",
    }, 
    a1:{
        pid:2,
        access:1,
        classi:1,
        cateid:2,
        postcommid:3,
        title:"This is Just Going To Be Another Test Post",
        content:"sNulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet.",
        imgsrc:"",
    },
    a2:{
        pid:3,
        access:1,
        classi:1,
        cateid:2,
        postcommid:1,
        title:"Length Title With Little Text",
        content:"feugiat mi a tellus consequat imperdiet",
        imgsrc:"",
    },
    a3:{
        pid:4,
        access:1,
        classi:1,
        cateid:3,
        postcommid:3,
        title:"Going To Be A Decent",
        content:"acilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices",
        imgsrc:"",
    },
    a4:{
        pid:5,
        access:1,
        classi:1,
        cateid:3,
        postcommid:1,
        title:"Going To",
        content:"Be A Decent. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices",
        imgsrc:"",
    }
};


/*
  导航栏推送表
*/
var navs = {
  a0:{
     nid:0,
     access:1,
     fg:'home',
     title:'Home',
     recommid:3 
  },
  a1:{
     nid:1,
     access:1,
     fg:'blog',
     title:'Blog',
     recommid:3 
  },
  a2:{
     nid:2,
     access:1,
     fg:'gallery',
     title:'Gallery',
     recommid:1 
  },
  a3:{
     nid:3,
     access:1,
     fg:'contact',
     title:'Contact',
     recommid:1 
  },
  a4:{
     nid:4,
     access:1,
     fg:'about',
     title:'About',
     recommid:1 
  },
  a5:{
     nid:5,
     access:1,
     fg:'other',
     title:'Other',
     recommid:1 
  }    
};



var datas = {
    articles:articles,
    links:links,
    categories:categories,
    posts:posts,
    navs:navs
};

module.exports = datas;