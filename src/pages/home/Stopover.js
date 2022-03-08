import React from "react";
import styles from './Order.module.css'

export default function Stopover({ index, onClickRoute, onRemove }) {
    return (
        index.map(index => {
            return (
                <div class="orderInputCell itIsWaypoit" key={index}>
                    <input onClick={onClickRoute} readOnly id={`stopover${index}`} autoComplete="off" name='stopover' type="text" class="orderInputCellText" placeholder="경유지" />
                    <div className={styles.stopoverImgBox} onClick={() => onRemove(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="1.5rem" viewBox="0 0 12.102 13.83">
                            <path id="Icon_awesome-trash-alt" data-name="Icon awesome-trash-alt" d="M.864,12.534a1.3,1.3,0,0,0,1.3,1.3h7.78a1.3,1.3,0,0,0,1.3-1.3V3.458H.864ZM8.212,5.619a.432.432,0,1,1,.864,0v6.051a.432.432,0,0,1-.864,0Zm-2.593,0a.432.432,0,1,1,.864,0v6.051a.432.432,0,0,1-.864,0Zm-2.593,0a.432.432,0,1,1,.864,0v6.051a.432.432,0,0,1-.864,0ZM11.669.864H8.428L8.174.359A.648.648,0,0,0,7.593,0H4.506a.641.641,0,0,0-.578.359L3.674.864H.432A.432.432,0,0,0,0,1.3v.864a.432.432,0,0,0,.432.432H11.669a.432.432,0,0,0,.432-.432V1.3A.432.432,0,0,0,11.669.864Z" fill="#fff"/>
                        </svg>
                    </div>
                </div>
            )
        })
        
    )
}