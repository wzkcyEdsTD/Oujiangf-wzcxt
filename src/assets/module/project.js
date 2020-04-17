const url = window.baseUrlHost || '';
export default function ($api) {
  return {
    ssologin(data) {
      //政务网登录
      return $api.post(url + '/xypt/zww/ssologin', data)
    },
    getmark(data) {
      //查询分数
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/mark/getmark', data)
    },
    getmarklevel(data) {
      //信用等级
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/mark/getmarklevel', data)
    },
    getemp(data) {
      //授权查询
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/mark/getemp', data);
    },
    useremp(data) {
      //授权
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/mark/useremp', data)
    },
    postmsgtolibrary(data) {
      //图书馆信息推送
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/mark/postmsgtolibrary', data)
    },
    cancleemp(data) {
      //取消授权
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/mark/cancelemp', data)
    },
    edutable(data) {
      //获取学历信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/edutable/edu', data)
    },
    updatedu(data) {
      //修改学历信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/edutable/upedu', data)
    },
    insertedu(data) {
      //新增学历信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/edutable/insertedu', data)
    },
    identable(data) {
      //获取身份信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/identable/iden', data)
    },
    updatiden(data) {
      //修改身份信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/identable/upiden', data)
    },
    insertiden(data) {
      //修改身份信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/identable/insertiden', data)
    },
    cartable(data) {
      //获取车辆信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/cartable/car', data)
    },
    updatcar(data) {
      //修改车辆信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/cartable/upcar', data)
    },
    insertcar(data) {
      //新增车辆信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/cartable/insertcar', data)
    },
    dritable(data) {
      //获取驾驶信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/dritable/dri', data)
    },
    updatdri(data) {
      //修改驾驶信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/dritable/updri', data)
    },
    insertdri(data) {
      //新增驾驶信息
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/dritable/insertdri', data)
    },
    wxshare(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/wx/getsign', data)
    },
    verifytoken(data) {
      //验证token
      return $api.post(url + '/xypt/zww/verifytoken', data)
    },
    settoken(data) {
      //获取token
      return $api.post(url + '/xypt/zww/settoken', data)
    },
    // 停车记录
    getpark(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/search/getpark', data);
    },
    // 历史借阅
    gethismessage(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/search/gethismessage', data);
    },
    // 当前借阅
    getmessage(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/search/getmessage', data);
    },
    getuser(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/usertable/user', data);
    },
    insertuser(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/usertable/insertuser', data);
    },
    updateuser(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/usertable/upuser', data);
    },
    uploadCanvasImg(data) {
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/share/sharepic', data);
    },
    getShareImg(data) { // signid
      return $api.post(url + '/xypt/pictable/Pic', data);
    },
    insertShareImg(data) { // imgstr
      return $api.post(url + '/xypt/pictable/insertpic', data);
    },
    getrank(data) {
      //排名接口
      data.append('token', window.localStorage.getItem("token"));
      return $api.post(url + '/xypt/mark/getrank', data);
    },
    getremaintic(data) {
      //排名接口
      return $api.post(url + '/xypt/zww/getTicketNum', data);
    },
    getjsmsg(data) {
      //健身票领取接口
      return $api({
        method: 'get',
        url: 'http://wz-api.jfree.com.cn/cust-bill/custaccount/queryUseByPhoneNumber',
        params: data
      });
    }
  }
}
