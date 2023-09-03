import {toast} from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import './NotiAlert.scss'
// toast-configuration method,
 // it is compulsory method.
 toast.configure()
const NotiAlert= () => {
 
 var cnt=0;
    const Msg = ({ closeToast }) => (
       <div>
         <h5>FreshMap</h5>
         <p className='NotiMess'><bdi> لديك
        <b style={{color:'black'}}> 9+ </b> 
              اشعارات جديدة </bdi></p>
        </div> 

        
      )
      const Msg1 = ({ closeToast }) => (
        <div>
          <h5>FreshMap</h5>
          <p className='NotiMess'><bdi> لديك
          <b style={{color:'black'}}> 4 </b>
               اقتراحات جديدة </bdi></p>
         </div> 
 
         
       )
    return (
      <div className="page">
          {/* <button onClick={() => {toast(<Msg />, {position: toast.POSITION.BOTTOM_RIGHT})
          toast(<Msg1 />, {position: toast.POSITION.BOTTOM_RIGHT})
        }} className="button">
           Hello world.
          </button> */}
      </div>
    );
  }
  export default NotiAlert;
