async function imageUsingOCR(worker, img) {
    var answer = "";

    if (!img || img.width == 0 || img.height == 0) {
        console.warn("OCR cannot be performed on this image");
        return "";
    }

    try {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
            tessedit_pageseg_mode: '6',
            preserve_interword_spaces: '1',
            tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,@!*-',
            //tessedit_ocr_engine_mode:'1'
        });

        await worker.recognize(img, "eng").then(async function (result) {
            answer = result.data.text.trim();
            // console.log("Captcha Answer::" + answer);
        });

        //  await worker.terminate();
    } catch (err) {
        console.error(err.message);
        await worker.terminate();

    }

    return answer;
}

export default imageUsingOCR;