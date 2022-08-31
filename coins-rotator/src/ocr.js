const MODULE_LOG_PREFIX = "[AB links OCR]";

async function OCR(worker, img) {
    let answer = "";

    if (!img || img.width == 0 || img.height == 0) {
        console.warn(`${MODULE_LOG_PREFIX}: OCR cannot be performed on this image`);
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
        });

        await worker.recognize(img, "eng").then(async function (result) {
            answer = result.data.text.trim();
        });
    } catch (err) {
        console.error(`${MODULE_LOG_PREFIX}: ${err.message}`);

        await worker.terminate();
    }

    return answer;
}

export default OCR;