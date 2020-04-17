<template>
  <div v-show="flag">
    <div class="topbg">
      <div class="userid">你好！{{username}}</div>
      <ProgressCanvas class="pcshow" :score="this.usermark"></ProgressCanvas>
      <div class="markshow" v-on:click="goPage('WenchowMark')">
        <div class="xymark" id="ojfmark">{{usermark}}</div>
        <div class="xylevel">信用{{marklevel}}</div>
        <div class="scoretime">评估时间：{{updatetime}}</div>
      </div>
      <div class="share-icon" @click="goToShare"></div>
    </div>
    <div class="middlebg">
      <div class="servicebtn">
        <div class="firbtn">
          <div class="onebtn" v-on:click="goPage('book')">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/jieyue.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">借阅</div>
          </div>
          <div class="onebtn" v-on:click="goPage('park')">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/park.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">停车</div>
          </div>
          <div class="onebtn" v-on:click="goPage('trip')">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/trip.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">旅游</div>
          </div>
          <div class="onebtn" v-on:click="goPage('exercise')">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/jianshen.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">健身</div>
          </div>
        </div>
        <div class="secbtn">
          <div class="onebtn" v-on:click="goPage('finance')">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/jinrong.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">金融</div>
          </div>
          <div class="onebtn" v-on:click="didclick">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/zufang.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">租房</div>
          </div>
          <div class="onebtn" v-on:click="didclick">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/chuxing.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">出行</div>
          </div>
          <div class="onebtn" v-on:click="$messagebox.alert('暂无更多服务')">
            <div class="imgdiv"
                 style="background: url('../../static/xyptIndex/gengduo.png') no-repeat;background-size: 100% 100%;"></div>
            <div class="textdiv">更多</div>
          </div>
        </div>
      </div>
      <!--      <div class="imgshow"></div>-->
      <div class="imgshow">
        <lunbo :lun-bo-list="imglist" @img-click="imgClick"></lunbo>
      </div>
    </div>
    <div class="allin" id="cs">
      <div class="choseservice">
        <div class="stitle">&nbsp;瓯江分用户授权协议</div>
        <div class="scroll">
          <h4>一、声明</h4>
          <p>
            （一）《瓯江分服务协议和授权须知》（以下简称“本协议”），是您和温州市信用信息中心签订的，是关于您在使用瓯江分服务时，约定我们提供的服务内容以及您和我们之间权利义务关系的有效协议。
          </p>
          <p>（二）我们提醒您认真阅读、充分理解本协议各条款，特别是以粗体标注部分。</p>
          <p>
            （三）为了保障您的权益，当您在相关页面上点击确认的时候，例如，您点击“同意授权”或类似文字的按钮，或者实际使用瓯江分服务(以下简称“服务”），请您事先仔细阅读本协议内容，您点击确认或实际使用服务即代表您充分理解并同意接受本协议的全部内容。</p>
          <p>（四）本协议内容包含现在及将来我们通过信用温州公众号及其他网络及通讯方式告知您的各项操作提示、规则、公告、说明等（以下简称服务规则）。</p>
          <p>（五）您保证，作为自然人，在您同意接受本协议成为瓯江分用户时，您已年满18周岁，不具备前述条件的，您应立即终止注册或停止使用本服务。</p>
          <p>（六）如果您在任何时候对任何内容存在疑虑或者异议，请您及时联系我们（客服或客户投诉建议等通道
            ），以便我们对相关内容进行解释和说明，使您充分理解协议内容，从而帮助您决定是否接受我们的服务规则，使用我们的服务。</p>
          <h4>二、定义解释</h4>
          <p>
            瓯江分服务：我们对用户个人信用信息进行采集、整理、加工、保存，通过科学合理的统计分析数据模型进行计算并形成评分，以及围绕瓯江分提供的相关应用服务。
          </p>
          <p>
            瓯江分指标维度：包括身份特质、遵纪守法、商业用信、生活用信、社会贡献5个指标维度。
          </p>
          <p>
            书面：一切能够通过载体记载内容的形式，包括纸质及电子形式。
          </p>
          <h4>三、瓯江分服务</h4>
          <strong>
            <p>
              您理解并同意，为了您能安全且方便地使用本服务，在我们允许的情况下，您可以通过浙江省政务服务网账号登录查询您的瓯江分并使用相关服务，但您登录时，需在相关页面点击确认本协议的情况下，才能查询您的瓯江分并使用相关服务。为此您同意：
            </p>
            <p>
              （一）您会准确提供并及时更新您正确、最新及完整的身份信息及相关资料。如果您提供的上述信息错误、不实、不准确、过时或不完整，或者您没有及时配合补充提供相关资料，您对本服务的使用可能会受到部分或全部地限制、暂停或终止。我们就上述行为不承担任何责任，
              您将承担因此产生的任何直 接或间接的不利影响。
            </p>
            <p>
              （二）您应妥善保管您的账户名、密码、与瓯江分服务绑定的手机号码、手机校验码等与瓯江服务有关的一切信息。您应确保不向其他任何人泄露您登录瓯江分服务的密码。对于因密码泄露所致的损失，由您自行承担。如您发现有他人冒用或盗用您的瓯江分服务登录账户及密码或任何其他未经合法授权之情形时，应立即以有效方式通知我们，要求我们暂停本服务。同时，您理解我们对您的请求采取行动需要合理期限，在此之前，对您已发生的损失不承担任何责任。为了您的账户与信息安全，建议您定期更换瓯江分服务登录账户的密码。
            </p>
            <p>
              （三）您应遵守中国有关的法律和法规，不得为任何非法目的而使用本协议项下的服务，遵守所有与网络服务有关的网络协议、规定和程序，不得利用本协议项下服务进行任何可能对互联网的正常运转造成不利影响的行为，以及进行任何不利于浙江政务服务网的行为。
            </p>
          </strong>
          <h4>四、服务规则</h4>
          <strong>
            <p>
              （一）为了给您提供本协议项下服务以及客观、全面、科学的信用管理及评价需要，您理解并同意授权我们可以从合法保存您信息的第 三方，采集和处理您的的相关信息，对其进行整理、保存、加工和使用。
              前述第三方是指温州市信用信息综合服务平台、温州市个人“诚信分”应用平台、金融机构、电信运营商及事业单位等一切盈利性、非盈利性、公共、民间的机构及组织。为免除您重复授权的不便，您做出前述授权，表明前述第三方机构无需再逐一向您另行获取相关授权，该第三方可以依您在本协议的授权向我们提供您的相关信息。采集您的信息包括但不限于您的个人信息、行为信息、交易信息、资产信息、设备信息等。您同意我们向第三方采集并在适用的法律法规许可及本协议约定范围内向信息使用者依法提供这些信息。即可依照您的前述授权采集、整理、保存、加工您的相关信息，并且您知晓并同意，上述第三方机构采集的信息可能包括您的不良信息以及较为私密的信息，您在作出前述授权前已经知晓、充分理解并接受上述信息被提供、采集和使用可能产生的不利后果。
              同时我们向您承诺，不会采集您的宗教信仰、基因、指纹、血型、疾病和病史信息以及法律、行政法规明确禁止采集的其他个人信息。
            </p>
            <p>
              （二）您理解并同意，我们会将您的瓯江分反馈至温州市个人“诚信分”应用平台。此外，当第三方向我们查询您的相关信息时，该第三方应当获得您的事先书面同意并在约定范围使用，但是法律规定可以不经您授权即可查询的除外。因此，当您在此场景下希望我们向第三方提供您的用户信息时，您应当向第三方做出清楚明确的授权，否则可能导致不能提供该项服务，或错误提供该项服务，因此产生的后果应当由您自行承担。
            </p>
            <p>
              （三）您可以向我们请求撤销对第三方的信用信息查询授权。但如果您和第三方的业务关系尚未终止，您同意第三方可在业务存续期间持续查询您的信用信息，同时我们有权不支持您撤销对相关第三方的信用信息查询授权，以及终止/关闭瓯江分服务。
            </p>
          </strong>
          <h4>五、服务限制及终止</h4>
          <strong>
            <p>您同意如您违反以下保证或发生相关情形，我们将有权限制或终止向您提供本协议项下的部分或全部服务。</p>
            <p>（一）您作为自然人用户，您向我们保证您已经年满18周岁，并具备完全民事行为能力。</p>
            <p>（二）您不可以在任何时候将我们的服务用于任何非法目的，比如侵害他人合法权益，或者以非法方式使用我们的服务。</p>
            <p>
              （三）您保证，在我们为您提供服务期间，您向我们提供的所有资料和信息都是真实、完整、准确的并能够及时更新。为了保障为您提供有效完整的服务，您同意在我们发现您的身份存疑或涉嫌冒用他人身份信息时，有权基于保护您及（或）其他第三方合理利益的需要，要求您配合补全或更新相关身份信息及资料。</p>
            <p>
              （四）您保证，您不会授权他人使用我们的服务。比如您将使用本协议项下服务所需的载体，包括但不限于用于登录的账户、手机等披露或提供给其他人代替您操作、使用我们的服务。我们善意的提醒您，上述操作可能导致他人冒用您的身份使用本协议项下服务，因此给您造成损失或导致不良行为记录。</p>
            <p>
              （五）如果我们认为您没有遵守本协议的约定，或者我们认为继续为您提供服务将会导致我们或第三方的合理利益受到损失。服务终止后，为了后续异议或纠纷处理及未来查询相关信息的需要，从而保障我们及您的合法权益，您同意在服务终止后，我们仍可继续保留您使用我们的服务期间形成的所有信息和数据，但我们不会再主动采集您的任何信息。</p>
          </strong>
          <h4>六、服务中断或故障</h4>
          <strong>
            <p>您理解，我们的系统在下列状况发生时会无法正常运作，所以下列情形中我们无法向您提供服务。并同意我们无须就下述情况所导致服务无法正常提供时给您造成的各种影响或损失承担责任：</p>
            <p>
              （一）我们公告的系统停机维护期间。 <br>
              （二）电信设备出现故障不能进行数据传输的。 <br>
              （三）台风、地震、海啸、洪水、战争等不可抗力因素，造成互联网不能正常执行业务。 <br>
              （四）计算机病毒、黑客攻击、网络通信故障、网站升级等不能控制的因素。
            </p>
          </strong>
          <h4>七、责任限制</h4>
          <strong>
            <p>您理解，如因您主动授权第三方查询您的信息，从而导致第三方拒绝向您提供服务或做出了对您不利的决定时，考虑到该信息的提供是由您自主同意提供的，您同意我们无须就此承担责任或赔偿。</p>
          </strong>
          <h4>八、协议变更</h4>
          <p>
            作为本协议服务的提供方，我们将根据国家法律、法规及其他规范性文件的规定变化，增加、变更了新的服务类型或服务方式，进一步明 确协议双方的权利义务的需要对本协议进行调整变更。<strong>同时，您同意未来我们可以通过我们或合作伙伴的网站、客户端或其他适当的地
            方进行公布的方式通知您， 而不需要另行单独通知您协议发生变更。您在本协议内容公告变更后继续使用本服务，视为您已充分阅读、理
            解并接受变更后的协议内容，并受其约束；若您不同意修改后的协议内容，您应停止使用本服务。</strong>
          </p>
          <h4>九、法律适用与管辖</h4>
          <strong>
            <p>本协议相关的所有问题均适用中华人民共和国法律。本合同在履行过程中发生争议，可以协商解决，协商不成，均提交温州市信用信息中心所在地有管辖权的人民法院诉讼解决</p>
          </strong>
          <div class="clickdiv clickdiv-proto">
            <input type="checkbox" id="agreejieyue" v-model="agreeJieYue" style="vertical-align: middle;">
            <label for="agreejieyue">确认开通信用借阅</label>
          </div>
          <div class="clickdiv clickdiv-proto" style="text-align: right;">
            <input type="checkbox" id="agreejiepark" v-model="agreePark" style="vertical-align: middle;">
            <label for="agreejiepark">确认开通信用停车</label>
          </div>
          <div class="clickdiv clickdiv-proto">
            <input type="checkbox" id="agreetrip" v-model="agreeTrip" style="vertical-align: middle;">
            <label for="agreetrip">确认开通信用旅游</label>
          </div>
          <div class="clickdiv clickdiv-proto" style="text-align: right;">
            <input type="checkbox" id="agreeexercise" v-model="agreeExercise" style="vertical-align: middle;">
            <label for="agreeexercise">确认开通信用健身</label>
          </div>
        </div>
        <div class="clickdiv" style="">
          <input type="checkbox" id="agreeProtocol" v-model="ckeckVal" @change="clickMe">
          <label for="agreeProtocol">我已仔细阅读并同意以上服务协议</label>
        </div>
        <div class="allow" v-on:click="allow($event)" id="allowbtn">同意</div>
      </div>
    </div>
  </div>
</template>
<script>
    const appid = window.allAppId;
    import ProgressCanvas from "../components/MarkCanvas"
    import projectApi from '../assets/index'
    import lunbo from "../components/lunbo"
    import axios from 'axios'
    import wx from 'weixin-js-sdk';

    export default {
        name: "WenchowMark2",
        data() {
            return {
                username: undefined,
                maxmark: 800,
                usermark: undefined,
                marklevel: undefined,
                updatetime: undefined,
                ckeckVal: false,
                agreeJieYue: true, // 开通信用借阅
                agreePark: true, // 开通信用停车
                agreeTrip: true, // 开通信用旅游
                agreeExercise: true,//开通信用健身
                imglist: [
                    {
                        src: require('../../static/xyptIndex/cx123.png')
                    },
                    {
                        src: require('../../static/xyptIndex/chengxin.png')
                    },
                    {
                        src: require('../../static/xyptIndex/gonggao.png'),
                        routerTo: 'gonggao'
                    }
                ],
                flag: false
            }
        },
        components: {
            ProgressCanvas,
            lunbo,
        },
        methods: {
            goToShare() {
                this.$router.push({name: 'shareojf'});
            },
            imgClick(item) {
                // if (item['routerTo'] === 'help') {
                //     window.open('/static/help/index.html', '_self', null, false);
                // } else if (item['routerTo'] === 'gotomap') {
                //     this.$router.push({name: 'oujiangmap'});
                // }
                if (item['routerTo'] === 'gonggao') {
                    this.$router.push({name: 'gonggao'});
                }
            },
            allow(e) {
                if (e.target.allowFlag) return;
                e.target.allowFlag = true;
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid['oujiangfen']['appId']);
                projectApi.useremp(params).then(rs => {
                    if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                        this.$toast("开通成功");
                        this.init();
                    }
                });
                if (this.agreePark) {
                    const params = new URLSearchParams();
                    params.append('idcard', window.localStorage.getItem('idcard'));
                    params.append('username', window.localStorage.getItem('username'));
                    params.append("appid", appid['park']['appId']);
                    projectApi.useremp(params);
                }
                if (this.agreeTrip) {
                    const params = new URLSearchParams();
                    params.append('idcard', window.localStorage.getItem('idcard'));
                    params.append('username', window.localStorage.getItem('username'));
                    params.append("appid", appid['trip']['appId']);
                    projectApi.useremp(params);
                }
                if (this.agreeExercise) {
                    const params = new URLSearchParams();
                    params.append('idcard', window.localStorage.getItem('idcard'));
                    params.append('username', window.localStorage.getItem('username'));
                    params.append("appid", appid['exercise']['appId']);
                    projectApi.useremp(params);
                }
                if (this.agreeJieYue) {
                    const params = new URLSearchParams();
                    params.append('idcard', window.localStorage.getItem('idcard'));
                    params.append('username', window.localStorage.getItem('username'));
                    params.append("appid", appid['jieyue']['appId']);
                    projectApi.useremp(params).then((res) => {
                        if (res.code === 200 && res.message === "Success" && typeof (res.data) != "undefined") {
                            const params1 = new URLSearchParams();
                            params1.append('idcard', window.localStorage.getItem('idcard'));
                            params1.append('username', window.localStorage.getItem('username'));
                            params1.append("appid", appid['oujiangfen']['appId']);
                            params1.append("key", appid['oujiangfen']['key']);
                            projectApi.getmark(params1).then(rs1 => {
                                if (rs1.code === 200 && rs1.message === "Success" && typeof (rs1.data) != "undefined") {
                                    const params2 = new URLSearchParams();
                                    params2.append('certify', window.localStorage.getItem('idcard'));
                                    params2.append('score', rs1.data.score);
                                    projectApi.postmsgtolibrary(params2).then(res2 => {
                                        console.log(res2)
                                    })
                                }
                            })
                        }
                    });
                }
                if (this.agreeTrip) {
                    const params = new URLSearchParams();
                    params.append('idcard', window.localStorage.getItem('idcard'));
                    params.append('username', window.localStorage.getItem('username'));
                    params.append("appid", appid['trip']['appId']);
                    projectApi.useremp(params);
                }
            },
            goPage(name) {
                if (name === 'WenchowMark') {
                    this.$emit('change-page', 'WenchowMark');
                    return;
                }
                ;
                this.$router.push({
                    name
                });
            },
            // back() {
            //     this.$router.push({
            //         name: 'login'
            //     });
            // },
            clickMe() {
                var that = this;
                if (that.ckeckVal) {
                    document.getElementById("allowbtn").style.pointerEvents = "auto";
                    document.getElementById("allowbtn").style.background = "#36B1FF";
                } else {
                    document.getElementById("allowbtn").style.pointerEvents = "none";
                    document.getElementById("allowbtn").style.background = "#aaa";
                }
            },
            didclick() {
                this.$messagebox.alert("服务尚未开通");
            },
            getmarklevel(params) {
                return projectApi.getmarklevel(params).then(rs2 => {
                    if (rs2.code === 200 && rs2.message === "Success" && typeof (rs2.data) != "undefined") {
                        return Promise.resolve(rs2);
                    }
                });
            },
            getemp(params) {
                projectApi.getemp(params).then(rs3 => {
                    const that = this;
                    if (rs3.code === 200 && rs3.message === "Success" && typeof (rs3.data) != "undefined") {
                        if (rs3.data.auth.length <= 0) {
                            that.appApendCs(); // 解决IOS中协议弹出 阴影后会滑动
                            document.querySelector('.index-container-scroll').style.overflow = 'hidden'; // 解决IOS中协议弹出
                        }
                        rs3.data.auth.forEach(function (e) {
                            if (e.appName === '瓯江分') {
                                if (e.authStatus == 1) {
                                    document.getElementById("cs").style.display = "none";
                                    document.querySelector('.index-container-scroll').style.overflow = 'auto'; // 解决IOS中协议弹出 阴影后会滑动
                                    that.appApendCs(); // 解决IOS中协议弹出 阴影后会滑动
                                    // 执行getmark和getmarklevel
                                    that.getAllData(params);
                                } else if (e.authStatus == 0) {
                                    document.getElementById("cs").style.display = "inherit";
                                    that.appApendCs(); // 解决IOS中协议弹出 阴影后会滑动
                                    document.querySelector('.index-container-scroll').style.overflow = 'hidden'; // 解决IOS中协议弹出 阴影后会滑动
                                    document.getElementById("allowbtn").style.pointerEvents = "none";
                                }
                            }
                        });
                        this.flag = true;
                    }
                })
            },
            appApendCs() {
                const app = document.body || document.documentElement,
                    children = app.children;
                for (let i = 0; i < children.length; i++) {
                    if (children[i].id === 'cs') {
                        app.removeChild(children[i]);
                    }
                }
                app.appendChild(document.getElementById("cs"));
            },
            getmark(params) {
                return projectApi.getmark(params).then(rs1 => {
                    if (rs1.code === 200 && rs1.message === "Success" && typeof (rs1.data) != "undefined") {
                        return Promise.resolve(rs1);
                    }
                });
            },
            getAllData(params) {
                Promise.all([
                    this.getmark(params),
                    this.getmarklevel(params)
                ]).then((res) => {
                    const [rs1, rs2] = res;
                    // rs1
                    this.usermark = rs1.data.score;
                    // rs2
                    //this.marklevel = rs2.data.creditDesc;
                    switch (rs2.data.creditDesc) {
                        case "1":
                            this.marklevel = '待提高';
                            break;
                        case "2":
                            this.marklevel = '一般';
                            break;
                        case "3":
                            this.marklevel = '良好';
                            break;
                        case "4":
                            this.marklevel = '优秀';
                            break;
                        case "5":
                            this.marklevel = '极优';
                            break;
                        default:
                            this.marklevel = '评估中';
                    }
                    const time_str = rs2.data.updateTime;
                    const t = time_str.substr(0, 10);
                    this.updatetime = t;
                });
            },
            init() {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid['oujiangfen']['appId']);
                params.append("key", appid['oujiangfen']['key']);
                this.getemp(params);
                this.username = window.localStorage.getItem('username');
            }
        },
        mounted() {
            //瓯江分
            this.init();
        }
    }
</script>

<style scoped>
  .topbg {
    position: relative;
    z-index: 4;
    height: 74.3vw;
    width: 100vw;
    background: url('../../static/xyptIndex/title_bg.png') no-repeat;
    background-size: 100% 100%;
  }

  .userid {
    position: absolute;
    z-index: 10;
    height: 6vw;
    line-height: 6vw;
    font-size: 3.5vw;
    top: 3.5vw;
    left: 6vw;
    color: #FFF;
    text-align: center;
  }

  .share-icon {
    position: absolute;
    width: 6vw;
    height: 6vw;
    top: 3.5vw;
    right: 6vw;
    background: url('../../static/xyptIndex/share.png') no-repeat;
    background-size: 100% 100%;
  }

  .markshow {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 45%;
    top: 25vw;
  }

  .xymark {
    width: 100%;
    text-align: center;
    font-size: 12vw;
    color: #FFF;
    font-family: Gadget, sans-serif;
  }

  .xylevel {
    width: 100%;
    text-align: center;
    font-size: 4vw;
    color: #FFF;
    margin-top: -2px;
  }

  .scoretime {
    font-family: Times New Roman;
    width: 100%;
    text-align: center;
    font-size: 3.5vw;
    color: #FFF;
    margin-top: 1.5vw;
  }

  .middlebg {
    position: relative;
    z-index: 5;
    margin: -7.8vw auto 0;
    width: 94vw;
    background: #FFF;
    box-shadow: 0px 0px 3px #aaa;
    border-radius: 5px;
  }

  .servicebtn {
    margin: auto;
    width: 94vw;
    height: 45.6vw;
    border-bottom: 1px solid rgba(170, 170, 170, 0.4);
  }

  .imgshow {
    position: relative;
    padding-top: 5.5vw;
    padding-bottom: 5.5vw;
    width: 94vw;
    border-radius: 10px;
  }

  .firbtn {
    margin: auto;
    position: relative;
    top: 6vw;
    width: 100%;
    height: 19vw;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
  }

  .secbtn {
    margin: auto;
    position: relative;
    top: 6vw;
    width: 100%;
    height: 19vw;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
  }

  .onebtn {
    text-align: center;
  }

  .imgdiv {
    width: 10vw;
    height: 10vw;
  }

  .textdiv {
    font-size: 3.5vw;
    margin-top: 1.5vw;
  }

  .pcshow {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 16vw;
  }

  .allin {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    text-align: center;
  }

  .allin::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99997;
    background-color: rgba(0, 0, 0, .5);
  }

  .choseservice {
    z-index: 99998;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    position: absolute;
    background: #FFF;
    border-radius: 10px;
  }

  .stitle {
    width: 90vw;
    font-size: 5vw;
    text-align: left;
    padding: 10px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #E5E5E5;
  }

  .scroll {
    margin: 0 auto;
    width: 80vw;
    height: 115vw;
    font-size: 4vw;
    text-align: left;
    line-height: 7vw;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .clickdiv {
    margin: 10px 0;
  }

  .clickdiv-proto {
    margin: 0;
    display: inline-block;
    width: 49%;
  }

  .allow {
    margin: 4px auto;
    width: 30vw;
    height: 10vw;
    font-size: 6vw;
    color: #FFF;
    text-align: center;
    line-height: 10vw;
    background: #aaa;
    border-radius: 10px;
  }
</style>
