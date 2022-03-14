/* global kakao */
import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from './Order.module.css'
import axios from 'axios';

const { kakao } = window;

function CreateMap({ setCenter, center, setAddress }) {
    
    return (
        <Map className={styles.mapContainer} center={center} level={2}
            onCenterChanged={(map) => setCenter({
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
                
            })}
            onDragEnd={async (map) => {
                const headers = {
                    Authorization: 'KakaoAK 89c319742a7efca01255c48b9579a68a'
                };
                const lat = map.getCenter().getLat();
                const lng = map.getCenter().getLng();
                let addressResult = '';
                try {
                    addressResult = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, { headers })
                }
                catch (err) {
                    console.log("Kakao Address API ERROR", err);
                }
                const { data: { documents } } = addressResult;
                // console.log('addressResult', documents[0]);
                

                const address = documents[0].road_address ? documents[0].road_address.address_name : documents[0].address.address_name;
                console.log("AADDRESS", address);
                setAddress(address)
            }}
            
        >
            <MapMarker position={center}></MapMarker>
        </Map>
    )
}

export default Map;

export function SearchAddress({ onChange, type, datas, onClose, onClickButton }) {
    const [center, setCenter] = useState({lat: 37.24548819705312, lng: 126.9925381461988});
    const [address, setAddress] = useState('');

    const searchInput = useRef();
    
    

    function SearchRes({ name, datas, text, id }) {

        const onClickRes = (title, x, y) => {
            setCenter(() => ({
                lat: y,
                lng: x
            }));
            searchInput.current.value = title;
            setAddress('');
        }
        if (datas) {
            return (
                datas.map((data) => {
                    let { place_name: title, address_name: detail, x, y } = data;
                    if (!title) {
                        console.log("KEYWORD");
                        title = detail
                    }

                    //console.log("DATA", data)
                    return (
                        
                        <div class={styles.routeDataCell} onClick={(e) => { onClickRes(title, x, y) }}>
                            <div class={styles.routeDataCellRow}>
                                <p class={styles.routeDataTextTitle}>{title}</p>
                                <p class={styles.routeDataTextDetail}>{detail}</p>
                            </div>
                            <div class={styles.routeDataCellRow}>
                                <button className={styles.routeDataCellRowButton} onClick={(e) => {onClickButton(e, title, name, id)}}>{text}</button>
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


    const { title, display, name, text, value, id } = type ? type : '';
    
    console.log("TITLE", title, display, name, text, value, id)

    useEffect(() => {
        searchInput.current.value = value
    },[value])

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
                        <input ref={searchInput} autoComplete="off" id={name} onChange={onChange} className={`${styles.headerTitle} ${styles.headerSearchInput}`} />
                        <svg className={styles.searchImg} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30">
                            <path id="Icon_map-search" data-name="Icon map-search" d="M23.392,19.4A11.864,11.864,0,1,0,19.4,23.391l8.05,8.049,3.992-3.994ZM13.277,20.6A7.319,7.319,0,1,1,20.6,13.286,7.331,7.331,0,0,1,13.277,20.6Z" transform="translate(-1.44 -1.44)" fill="#7f7f7f" />
                        </svg>
                    </div>

                </div>
                <CreateMap setAddress={setAddress} center={center} setCenter={setCenter}></CreateMap>
                {/* 마우스로 지도 움직이면 주소 보여줌 */}
                {address && <div className={styles.addressRes}>
                    <div className={styles.addressResText}>
                        <div>{address}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.494" height="24.992" viewBox="0 0 17.494 24.992">
                            <path id="Icon_material-location-on" data-name="Icon material-location-on" d="M16.247,3A8.741,8.741,0,0,0,7.5,11.747c0,6.56,8.747,16.245,8.747,16.245s8.747-9.684,8.747-16.245A8.741,8.741,0,0,0,16.247,3Zm0,11.871a3.124,3.124,0,1,1,3.124-3.124A3.125,3.125,0,0,1,16.247,14.871Z" transform="translate(-7.5 -3)" fill="#7f7f7f"/>
                        </svg>
                    </div>
                    <div className={`${styles.routeDataCellRow} ${styles.addressResButton}`}>
                        <button className={`${styles.routeDataCellRowButton}`} onClick={(e) => {onClickButton(e, address, name, id)}}>{text}</button>
                    </div>
                    
                </div>}
                
                <div className={styles.searchRes}>
                    <SearchRes name={name} datas={datas} text={text} id={id} />
                </div>
            </div>
        </div>
    )
}