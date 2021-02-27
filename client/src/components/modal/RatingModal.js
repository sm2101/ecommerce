import React , {useState} from 'react'
import {Modal, Button} from 'antd'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {StarOutlined} from '@ant-design/icons';
import {useHistory, useParams} from 'react-router-dom';
const RatingModal = ({children }) => {
    const {user} = useSelector((state) => ({...state}));
    const [visible, setVisibile] = useState(false);

    const history = useHistory();
    const {slug} = useParams();
    const handleModal = () =>{
        if(user && user.token){
            setVisibile(true);
        } else {
            history.push({
                pathname:'/login',
                state:{
                    from:`product/${slug}`
                }
            });
        }
    }

    return (
        <>
          <div
          onClick = {handleModal}
          >
              <StarOutlined className = "text-warning"/><br/>
              {user?"Leave a rating" : "Login to leave a rating"}
            </div>  
            <Modal
            title = "Leave your rating"
             centered
             visible = {visible}
             onOk = {() =>{
                 setVisibile(false)
                 toast.success("Rating Saved!")
                }}
                onCancel = {()=>{
                    setVisibile(false)
                }}
            >
                {children}
            </Modal>
        </>
    )
}

export default RatingModal
