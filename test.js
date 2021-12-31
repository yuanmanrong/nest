
 /**
 * @method urlConnect url后拼接参数
 * @param url {string} 传入URL
 * @param params {object} 需要拼接的参数
 * @param getFirst {boolean} 参数重复默认保留第一个
 * @return url {string} 拼接的url
 */

// 判断hash ===> 处理url , 参数整合, 参数去重  ===》 params处理 ===》 url拼参数 ===》 拼hash  ===》 返回
// 没有考虑Vue的hash路由情况,没有做入参校验

  function urlConnect (url = "", params = {}, getFirst = true) {
    let paramsList = []; // key=value形式
    let paramsUrl = ""; // params拼接
    let paramsKeyList = []; // 取出key
    let hash = "";  // hash处理

    // TODO：入参校验

    // hash判断
    if (url.indexOf("#") !== -1) {
        hash = url.split("#")[1]
        url = url.split("#")[0]
    }
    
    // 没?没参数
    // 传入的url带?
    if (url.indexOf("?") !== -1) {
        // 以? 或者 ?&结尾 后面没参数
        if(url.substr(-1,1) === "?" || url.substr(-1,1) === "&" && url.substr(-2,1) === "?") {
            url = url.slice(0,-1)
        } else {
            // 以&结尾,且不是？&有参数
            let originParams = url.split("?")[1]
            url = url.split("?")[0]
            let originList = originParams.split("&")
            originList.forEach(item => {
                let itemkey = item.split("=")[0]
                let itemVal = item.split("=")[1]
               if(params.hasOwnProperty(itemkey)){
                   getFirst ?  params[itemkey] = itemVal : null
               } else {
                   itemkey ? params[itemkey] = itemVal : null
               }
            })
        }
    }
    
    paramsKeyList = Object.keys(params)
    // params参数处理
    paramsKeyList.forEach((item) => {
        let paramValue = params[item] !== undefined ? params[item] : "";
        if(/^(http|https):/.test(paramValue)){
            paramsList.push(`${item}=${encodeURIComponent(paramValue)}`);
        } else {
            paramsList.push(`${item}=${paramValue}`);
        }
    })
    // 参数整合
    paramsUrl = paramsList.join("&");
   
    // 拼接参数
    url += url.indexOf("?") === -1 ? "?" + paramsUrl : paramsUrl
    
    // 拼接hash
    url =  hash ? `${url}#${hash}`: url 

    return url;
}


let mock_1 = "http://www.baidu.com?name=ymr1&#hash=1"
let mock_2 = "http://www.baidu.com?"
let mock_3 = "http://www.baidu.com?&"
let mock_4 = "http://www.baidu.com?test=lalala"
let mock_5 = "hidu.com?test=lalala"

let mockParam_1 = {name: "ymr", url: "http://www.baidu.com"}
let mockParam_2 = {}

let url =  urlConnect(mock_5, mockParam_1, false)


console.log("结果在这里---->>>",url)