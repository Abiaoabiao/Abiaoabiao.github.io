// 模拟 menu 菜单接口返回的数据
// 这是 Mock 应该生成的数据接口实例
// {
//     data : [{
//         titles : [{
//             name : '家用电器',
//             href : '####'
//         }],
//         content : {
//             tabs : [{
//                 name : '家用电器',
//                 href : '####'
//             }],
//             details : [{
//                 category : '电视',
//                 items : [{
//                     name : '超薄电视',
//                     href : '####'
//                 }]
//             }]
//         }
//     }]
// }

Mock.mock('/menu',{
    'data|18' : [{
        'titles|2-4' : [{
            name : '@cword(2,3)',
            href : '@url(http)'
        }],
        content : {
            'tabs|2-5' : [{
                name : '@cword(2,3)',
                href : '@url(http)'
            }],
            'details|8-15' : [{
                category : '@cword(2,4)',
                'items|8-16' : [{
                    name : '@cword(2,3)',
                    href : '@url(http)'
                }]
            }]
        }
    }]
})