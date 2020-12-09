import React, { useEffect } from 'react';
import { Row, Col } from 'antd'
import { Helmet } from 'react-helmet'
import Laside from '../Component/baseAside'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import '../publicCSS/style.css'
import {
    withRouter,
} from 'react-router-dom'

function About() {
    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, [])
    return (
        <div className='center'>
            <Helmet>
                <title>博客 | Lemon-LimCong的个人博客</title>
            </Helmet>
            <div className="wrap-title">一个伪全能且却黑的准程序员。</div>
            <Row justify="space-between">
                <Col xs={24} sm={24} md={24} lg={17} xl={17} id='main-left'>
                    <div className="about-wrap">
                        <h2>关于 LimCong本人</h2>
                        <div className="about-line">
                            李明聪，男，一个爱吉他爱篮球爱唱歌的伪全能前端实习生。性格开朗外向。希望可以通过这个博客分享一些我对于技术上的理解，对于人生上的感悟，还有我的小故事。
                            </div>
                        <div className="about-line">
                            上文的外向指的是上了高中以后的李明聪，在这之前，李明聪就是个伪自闭症患者，内向自卑，不敢与人交流，被打不敢还手，被骂不敢还口，一个校园暴力受害者。
                            </div>
                        <div className="about-line">
                            1年+ React开发经验，2年 Node.js开发经验，以及一次C#的开发经验。其他语言多少会点，至少看代码能大概知道是什么语言。C调吉他手（笑哭），人类跑调精华，四肢不协调版Crossover大师，投篮顶级神经塑料刀，准不准全看缘分。
                            </div>
                        <h2>关于 这个博客</h2>
                        <div className="about-line">
                            做这个网站的初衷是想把自己学的一些技术踩得一些坑分享给大家，希望可以帮助大家解决一些问题，后来在我设计栏目的时候我觉得我应该把这个网站做的稍微多元化一点，只有技术主题的话会不会太单调了，所以我决定把我的一切都分享到这个网站上，不管是我的感悟也好，踩得坑也好，我的一些经历也好，都会作为网站的一个元素。无聊的时候可以看一看我的小故事们，也许大家会在看故事的同时发现一些跟自己的经历共鸣的部分。
                            </div>
                        <div className="about-line">
                            不出意外的话这个博客会一直更新到我不干这行，如果我的技术更新了，那构成这个网站的技术也一定会更新，这个网站的一切我都会开源。
                            </div>
                        <h2>关于 Lemon</h2>
                        <div className="about-line">
                            <strong> Lemon </strong>其实是我的英文名字，我的小学英语老师April给全班每个孩子都取了一个跟自己名字读音很像的英文名，写在卡片上，每次上英语课都要把自己的英文卡片摆在桌子上。
                            </div>
                        <div className="about-line">
                            因为我以前特别内向，是个小透明，所以我的英文名被落下了，大家都有英文名之后，有一天老师突然发现我的桌子上没有英文名，说我为什么没带卡片，我不敢说话，还是我的后桌跟老师说的：“老师他还没有英文卡片”，老师这才给我取了这个<strong> Lemon </strong>。
                            </div>
                        <h2>关于 聪霸霸语录</h2>
                        <div className="about-line">
                            我是一个闲不下来的人，但我一旦闲下来，我就会真的放空自己，坐在椅子上望着天空，想人生像未来想当下，想亲情想友情想爱情，每次发呆都有很多感悟，我知道我一个20出头的年轻人，很多想法是很片面的，考虑的不够充分，不过我还是想把自己的一些感悟发表到这个栏目里，希望能够跟大家共勉。
                            </div>
                        <h2>关于 小故事栏目</h2>
                        <div className="about-line">
                            因为我记性特别不好，很多很重要的事随着时间就变得模糊褪色了，所以我想把那些模糊褪色的回忆公开，写一本名叫李明聪的故事集，里面装着零零散散的小故事，或者关于我，或者关于我的朋友，或者关于我朋友的朋友，或者关于大家。
                            </div>
                        <div className="about-line">
                            欢迎投稿，如果你不匿名那我可以标注你的名字，如果匿名的话我也会把它标注为转载，这点请放心。
                            </div>
                        <h2>关于 版权</h2>
                        <div className="about-line">
                            本站采用「 <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh">署名-非商业性使用 4.0 国际 (CC BY-NC 4.0)</a>  」创作共享协议。 只要在使用时注明出处，那么您可以可以对本站所有原创内容进行转载、节选、二次创作，但是您不得对其用于商业目的。
                            </div>
                        <div className='waiting'>-- 已经到底了 --</div>
                    </div>
                </Col>
                <Col xs={0} sm={0} md={0} lg={7} xl={7} id='main-right'>
                    <Laside />
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(About);