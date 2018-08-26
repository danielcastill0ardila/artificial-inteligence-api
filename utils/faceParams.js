
export const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

export const options = imageURL =>
(
    {
        uri: process.env.URL_API_AZURE,
        qs: params,
        body: '{"url": ' + '"' + imageURL + '"}',
        headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': process.env.API_KEY
            }
    }
)