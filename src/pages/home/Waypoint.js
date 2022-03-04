import { useRef } from 'react';

export default function Stopover({ index }) {
    return (
        index.map(index => {
            return (
                <div class="orderInputCell itIsWaypoit">
                    <input autoComplete="off" name='stopover' type="text" class="orderInputCellText" placeholder="경유지" />
                    <img src="/assets/location.png" alt="위치아이콘" />
                </div>
            )
        })
        
    )
}