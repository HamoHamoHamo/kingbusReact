import React from "react";

export function WayPoint({ id, onRemove, onChange, onFocus, onBlur, Box }) {

    
    return (
        id.map((index) => {
            return (
                <div style={{position: 'relative'}}>
                    <div class="orderInputCell itIsWaypoit" id={`waypoint${index}`} key={index} style={{position:'static'}}>
                        <input autoComplete="off" onChange={onChange} onFocus={onFocus} onBlur={onBlur} class="orderInputCellTextWaypoint" placeholder="경유지" name="wayPointList" />
                        <img src="/assets/location.png" alt="위치아이콘" />
                        <div class='routeDataCon'>
                            <Box type='departure' />
                        </div>
                        <div class="removeWaypoint">
                            <img src="/assets/trashbin.png" onClick={() => onRemove(index)} alt="쓰레기통 아이콘" style={{height: "auto"}} />
                        </div>
                    </div>
                    
                </div>
            )
        })
    )
}