import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import './ourServices.scss'

function OurServices() {
  const state = useSelector((state) => state.data);
  const { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);
  document.body.style.background = 'none';
 
  return (
    <div>
      <section class="amazing_feature">
        <div class="container">

          <div class="row">
            <div class="col-md-12 text-center heading-main">
              <h2 class="heading">خدماتنا</h2>
              <div class="separator"><i class="fa fa-home below-line-about-icon"></i></div>

            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'business' ? 'none' : 'block' }}>
              <div class="single_feature">
                <div class="feature_icon"><i className='fas fa-route'></i></div>
                <h3>التنقل عبر الخريطة</h3>
                <p>يمكن للمستخدم من خلالها رؤية جميع المتاجر الموجودة على الموقع و البحث عنها،كما يتم تحديدأقصر طريق
                  و المسافة و الوقت لكل المتاجر</p>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="far fa-heart"></i></div>
                <h3>مخزن للمنتجات</h3>
                <p>يستطيع صاحب العمل اضافة مُنتجاته و تصنيفها و تعديلها و حذفها و كتابة معلومات عنها بسهولة</p>
              </div>
            </div>
            {/* <!-- END COL-->                */}
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness != '' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="far fa-money-bill-alt"></i></div>
                <h3> الاشعارات </h3>
                <p>تلقي اشعارات بكل جديد </p>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'user' ? 'block' : 'none' }} >
              <div class="single_feature">
                <div class="feature_icon"><i class="fas fa-location-arrow"></i></div>
                <h3>اقتراحات</h3>
                <p>يمكن للمستخدم رؤية اقتراحات مشابهة  للمتاجر و المنتجات التي تابعها و قيمها</p>
              </div>
            </div>
            {/* <!-- END COL-->              */}
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="fas fa-location-arrow"></i></div>
                <h3>تلقي شكاوي</h3>
                <p>عرض جميع الشكاوي التي ارسلها المستخدمين</p>
              </div>
            </div>
            {/* <!-- END COL-->              */}
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="fas fa-location-arrow"></i></div>
                <h3>احصائيات المتجر</h3>
                <p>يمكن لصاحب العمل معرفة نسبة المتابعين خلال السنوات و الأشهر و التقيمات التي حصل عليها</p>
              </div>
            </div>
            {/* <!-- END COL-->              */}

            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="fas fa-location-arrow"></i></div>
                <h3>عرض  معلومات المتجر</h3>
                <p>يمكن لصاحب العمل عرض كافة معلومات متجره التي يمكن رؤيتها من قبل كافة الزبائن على الموقع</p>
              </div>
            </div>
            {/* <!-- END COL-->              */}

            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'user' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="fas fa-location-arrow"></i></div>
                <h3>حفظ المتاجر و المنتجات</h3>
                <p>يمكن العودة إلى المتاجر و المنتجات التي تابعها و قيمها التي تتخزن تلقائياً في صفحته الشخصية</p>
              </div>
            </div>
         
            {/* <!-- END COL-->          */}
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="single_feature">
                <div class="feature_icon"><i className='fas fa-medal'></i></div>
                <h3> المتاجر الأكثر تقيماً</h3>
                <p>يمكن للمستخدم معرفة المتاجر الأكثر تقيماً من قبل المستخدمين الاَخرين،كما يمكنه تصنيفها تبعأ لنوع المتجر و الأماكن المهتم بها </p>
              </div>
            </div>
            {/* <!-- END COL-->          */}

            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'user' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="fa fa-cog"></i></div>
                <h3>التفاعل على المنتجات</h3>
                <p>يمكن للمستخدم التعليق على كافة المنتجات و تقييمها</p>
              </div>
            </div>
            {/* <!-- END COL-->          */}
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="fa fa-cog"></i></div>
                <h3>التفاعل مع الزبائن</h3>
                <p>يمكن لصاحب العمل الاطلاع على تعاليق الزبائن على المنتجات و الرد عليها و تتبع التقييمات عليها</p>
              </div>
            </div>
            {/* <!-- END COL-->          */}
            <div class="col-md-4 col-sm-6 col-xs-12" style={{ display: isUserOrBuisness !='' ? 'none' : 'block' }}>
              <div class="single_feature">
                <div class="feature_icon"><i class="fa fa-database"></i></div>
                <h3>خدمات إضافية</h3>
                <p>للمزيد من الخدمات يجب انشاء حساب و تسجيل دخول كصاحب عمل أو كزبون</p>
              </div>
            </div>
            {/* <!-- END COL-->            */}
          </div>
          {/* <!--- END ROW -->      */}
        </div>
        {/* <!--- END CONTAINER -->    */}
      </section>
    </div>
  )
}
export default OurServices