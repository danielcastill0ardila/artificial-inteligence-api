'use strict'

import { options, params } from '../utils/faceParams';
import { getUrlParams } from '../utils/index';
import fetch from 'node-fetch';

const requestFace = async ({ imageUrl }) => {

    try {

        const response = await fetch(`${process.env.URL_API_AZURE}?${getUrlParams()}`, options(imageUrl));

        const data = await response.json();

        return data;
        
    } catch (error) {
        throw new Error(error.message);
    }

};

export default {
    requestFace
}
