'use strict'
import {options} from '../utils/faceParams';
import request from 'request';

const requestFace = async ({imageUrl}) =>{
    try {
        const data = await request.post(options(imageUrl));
        return data;
    } catch (error) {
        throw new Error('MALPARIDO');
    }
};
export default{
    requestFace
}