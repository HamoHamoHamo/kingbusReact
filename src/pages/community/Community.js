import React, { useEffect, useState, useRef } from 'react';
import { Api } from '../../utils/Api';
import routes from '../../utils/Routes';
import { CommunityNav } from './Component';

export default function Community(){
    return(
        <>
            <CommunityNav />
        </>
    )
}