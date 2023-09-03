import './aboutUs.scss'
import Jewel from '../photo/jewel.jpg'
import Laith from '../photo/laith.jpg'
import Meery from '../photo/meery.jpg'
import Mary from '../photo/mary.jpg'
import aboutUs from '../photo/aboutUs1.jpg';
function AboutUs() {
    return (
        <div className='aboutUs'>
            <img src={aboutUs} className='aboutUsImg' />
            <section class="page-section" id="about">
                <div class="container">
                    <div class="text-center">
                        <h2 class="section-heading text-uppercase">من نحن؟</h2>

                    </div>
                    <br></br>
                    <h3 class="section-subheading text-muted">يسعدنا ان تتعرف علينا أكثر من خلال لمحة بسيطة عن اعضاء الفريق</h3>
                    <div className='aboutTeam'>
                        <ul class="timeline">
                            <li>
                                <div class="timeline-image">
                                    <img class="rounded-circle img-fluid" src={Meery} /></div>
                                <div class="timeline-panel ">
                                    <div class="timeline-heading">
                                        {/* <h4>2009-2011</h4> */}
                                        <h4 class="subheading p1">Meery Awad</h4>
                                    </div>
                                    <div class="timeline-body "><p class="text-muted b1 ">تصميم مواقع ويب</p></div>
                                </div>
                            </li>
                            <li >
                                <div class="timeline-image">
                                    <img class="rounded-circle img-fluid" src={Jewel} /></div>
                                <div class="timeline-panel ">
                                    <div class="timeline-heading">
                                        {/* <h4>March 2011</h4> */}
                                        <h4 class="subheading p2">Jewel Elias</h4>
                                    </div>
                                    <div class="timeline-body"><p class="text-muted b2">تصميم مواقع ويب </p></div>
                                </div>
                            </li>

                            <li>
                                <div class="timeline-image">
                                    <img class="rounded-circle img-fluid" src={Laith} /></div>
                                <div class="timeline-panel ">
                                    <div class="timeline-heading">
                                        {/* <h4>2009-2011</h4> */}
                                        <h4 class="subheading p3 ">Laith Helwany</h4>
                                    </div>
                                    <div class="timeline-body"><p class="text-muted b3">Backend</p></div>
                                </div>
                            </li>
                            <li >
                                <div class="timeline-image">
                                    <img class="rounded-circle img-fluid" src={Mary} /></div>
                                <div class="timeline-panel">
                                    <div class="timeline-heading">
                                        {/* <h4>March 2011</h4> */}
                                        <h4 class="subheading p4">Mary Alrayes</h4>
                                    </div>

                                    <div class="timeline-body"><p class="text-muted b4">تصميم تطبيقات اندرويد
                                        يمكنك تحميل التطبيق من خلال الرابط: <a href='#'>من هنا</a></p>
                                    </div>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default AboutUs;
