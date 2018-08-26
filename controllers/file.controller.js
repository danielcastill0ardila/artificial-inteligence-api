'use strict'
import verificationFace from '../services/verificationFace';
const verificationController = async(req, res) => {
    try {
        const { imageUrl } = req.body;
        const response = await verificationFace.requestFace({ imageUrl });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
    }
};
export default {
    verificationController
}