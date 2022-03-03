/* global kakao */
import React, { useEffect, useState, useRef } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import styles from './Order.module.css'

const { kakao } = window;

function Map({ center }) {
    useEffect(() => {
        center = new kakao.maps.LatLng(center.lat, center.lon)
        let options = {
            center,
            level: 5
        };
        let container = document.getElementById("map");
        let map = new kakao.maps.Map(container, options);
        

        
        let marker = new kakao.maps.Marker({
            position: center
        });
        marker.setMap(map);

        console.log("loading kakaomap");
    }, [center]);

    return (
        <div>
            <div className={styles.mapContainer} id="map"></div>
        </div>
    );
};

export default Map;

export function SearchAddress({ onChange, type, datas, onClose, onClickButton }) {
    const [center, setCenter] = useState({lat: 37.24548819705312, lon: 126.9925381461988});
    const searchInput = useRef();
    function SearchRes({ datas, text }) {

        const onClickRes = (title, x, y) => {
            console.log("TODDDDO 결과 클릭할때 값 넣어줘야됨");
            setCenter(() => ({
                lat: y,
                lon: x
            }));
            searchInput.current.value = title;
        }

        
        if (datas) {
            return (
                datas.map((data) => {
                    let { place_name: title, address_name: detail, x, y } = data;
                    if (!title) {
                        console.log("KEYWORD");
                        title = detail
                    }

                    console.log("DATA", data)
                    return (
                        //<div class="routeDataCell" onMouseDown={(e) => {searchResult(e, title)}}>
                        <div class="routeDataCell" onMouseDown={(e) => { onClickRes(title, x, y) }}>
                            <div class='routeDataCellRow'>
                                <p class="routeDataTextTitle">{title}</p>
                                <p class="routeDataTextDetail">{detail}</p>
                            </div>
                            <div class='routeDataCellRow'>
                                <button onClick={() => {onClickButton(title)}}>{text}</button>
                            </div>
                        </div>
                    )
                })
            )
        }
        else {
            return (
                <div></div>
            )
        }
    
    }
    let title = ''
    let display = ''
    let name = ''
    let text = ''
    if (type) {
        title = type['title'];
        display = type['display'];
        name = type['name'];
        text = type['text'];

    } else {
        title = ''
    }

    return (
        <div className={styles.searchCon} style={{ visibility: display }}>
            <div className={styles.searchConBox}>
                <div className={styles.searchHeader}>
                    <div className={styles.headerTitle}>
                        <div className={styles.headerText}>{title} 검색</div>
                        <svg onClick={onClose} className={styles.headerX} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.536 33.536">
                            <g id="그룹_1052" data-name="그룹 1052" transform="translate(-1209.732 -198.732)">
                                <line id="선_1568" data-name="선 1568" y1="25" x2="25" transform="translate(1211.5 200.5)" fill="none" stroke="#7f7f7f" stroke-width="5" />
                                <line id="선_1569" data-name="선 1569" x2="25" y2="25" transform="translate(1211.5 200.5)" fill="none" stroke="#7f7f7f" stroke-width="5" />
                            </g>
                        </svg>
                    </div>
                    <div>
                        <input ref={searchInput} autoComplete="off" name={name} onChange={onChange} className={`${styles.headerTitle} ${styles.headerSearchInput}`} />
                        <svg className={styles.searchImg} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30">
                            <path id="Icon_map-search" data-name="Icon map-search" d="M23.392,19.4A11.864,11.864,0,1,0,19.4,23.391l8.05,8.049,3.992-3.994ZM13.277,20.6A7.319,7.319,0,1,1,20.6,13.286,7.331,7.331,0,0,1,13.277,20.6Z" transform="translate(-1.44 -1.44)" fill="#7f7f7f" />
                        </svg>
                    </div>


                </div>
                <Map center={center}></Map>
                <div className={styles.searchRes}>
                    <SearchRes datas={datas} text={text} />
                </div>
            </div>
        </div>
    )
}