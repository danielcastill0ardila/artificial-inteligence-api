'use strict'
import verificationFace from '../services/verificationFace';
const verificationController = async(req, res) => {
    try {
        const { imageUrl='https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg' } = req.body;
        const response = await verificationFace.requestFace({ imageUrl });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
    }
};
export default {
    verificationController
}