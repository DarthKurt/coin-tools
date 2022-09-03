import {
    Mat,
    Size,
    Point,
    imread,
    imshow,
    erode,
    morphologyDefaultBorderValue,
    GaussianBlur,
    medianBlur,
    morphologyEx,
    CV_8U,
    BORDER_CONSTANT,
    BORDER_DEFAULT,
    MORPH_OPEN,
} from "@techstark/opencv-js";

import Jimp from "Jimp";
import OCR from "./ocr";
import { createWorker } from 'tesseract.js';

const MODULE_LOG_PREFIX = "[AB links solver]";

function solver(timeout) {
    const worker = createWorker({
        // Dont forget to update when library is updated
        workerPath: "https://unpkg.com/tesseract.js@3.0.2/dist/worker.min.js",
        corePath: "https://unpkg.com/tesseract.js-core@3.0.1/tesseract-core-simd.wasm.js",
        errorHandler: e => console.error(e),
        logger: m => console.log(m)
    });

    let questions = [];
    let questionImages = [];
    let questionImage = "";
    let questionImageSource = "";

    function waitForImage(imgElement) {
        return new Promise(res => {
            if (imgElement.complete) {
                return res();
            }
            imgElement.onload = () => res();
            imgElement.onerror = () => res();
        });
    }

    async function createImageFrom(src) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        
        await waitForImage(img);

        return img;
    }

    function toDataURL(c) {
        return new Promise(function (resolve) {
            const dataURI = c.toDataURL('image/png');
            return resolve(dataURI);
        });
    }

    function removeNoiseUsingImageData(imgdata, width, height, threshold) {
        return new Promise(function (resolve) {
            let noiseCount = 0;
            let noiseRowStart = 0;

            for (let column = 0; column < width; column++) {
                for (let row = 0; row < height; row++) {

                    const position = row * width + column;
                    const pixelAtPosition = imgdata[position];

                    //Remove noise from first row and last row
                    if (row == 0 || row == height - 1) {
                        imgdata[position] = 0xFFFFFFFF;
                    }

                    if (pixelAtPosition == 0xFF000000) {
                        if (noiseCount == 0) {
                            noiseRowStart = row;
                        }
                        noiseCount++;
                    } else {
                        //Define the number of consecutive pixels to be considered as noise
                        if (noiseCount > 0 && noiseCount <= threshold) {
                            //Start from noiseRow till current row and remove noise
                            while (noiseRowStart < row) {
                                const noisePosition = noiseRowStart * width + column;
                                imgdata[noisePosition] = 0xFFFFFFFF;
                                noiseRowStart++;
                            }
                        }
                        noiseCount = 0;
                    }
                }
            }
            return resolve(imgdata);
        })
    }

    async function imageUsingOCRAntibotQuestion(image) {

        if (!image || !image.src) {
            console.warn(`${MODULE_LOG_PREFIX}: No images found`);
            return;
        }

        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        ctx.putImageData(imageData, 0, 0);

        let src = imread(c);
        let dst = new Mat();
        let ksize = new Size(3, 3);
        // You can try more different parameters
        GaussianBlur(src, dst, ksize, 0, 0, BORDER_DEFAULT);
        imshow(c, dst);

        src.delete();
        dst.delete();

        let imageDataURI = await toDataURL(c);
        return OCR(worker, imageDataURI);
    }

    async function imageUsingOCRAntibotLowValues(image) {

        if (!image || !image.src) {
            console.warn(`${MODULE_LOG_PREFIX}: No images found`);
            return;
        }

        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        //Make the image visible
        for (let i = 0; i < data.length; i += 4) {

            if ((data[i] < 100 || data[i + 1] < 100 || data[i + 2] < 100) && data[i + 3] > 0) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            } else {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            }
            data[i + 3] = 255;
        }

        //Remove Noise from Image
        let imgdata = new Uint32Array(data.buffer);
        await removeNoiseUsingImageData(imgdata, c.width, c.height, 1);

        ctx.putImageData(imageData, 0, 0);

        let imageDataURI = await toDataURL(c);
        return OCR(worker, imageDataURI);
    }

    async function imageUsingOCRAntibotHighValues(image) {

        if (!image || !image.src) {
            console.warn(`${MODULE_LOG_PREFIX}: No images found`);
            return;
        }

        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        //Make the image visible
        for (let i = 0; i < data.length; i += 4) {

            if ((data[i] > 100 || data[i + 1] > 100 || data[i + 2] > 100) && data[i + 3] > 0) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;

            } else {

                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            }
            data[i + 3] = 255;
        }

        //Remove Noise from Image
        let imgdata = new Uint32Array(data.buffer);
        await removeNoiseUsingImageData(imgdata, c.width, c.height, 1);

        ctx.putImageData(imageData, 0, 0);

        let imageDataURI = await toDataURL(c);
        return OCR(worker, imageDataURI);
    }

    async function splitImageUsingOCRAntibotLowValues(imgSrc) {
        const img = await createImageFrom(imgSrc);
        const c = document.createElement("canvas")
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        //Make the image visible
        for (let i = 0; i < data.length; i += 4) {
            if ((data[i] < 100 || data[i + 1] < 100 || data[i + 2] < 100) && data[i + 3] > 0) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;

            } else {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;

            }
            data[i + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);
        let imageDataURI = await toDataURL(c);
        return splitImage(imageDataURI);

    }

    async function splitImageUsingDefaultValues(imgSrc) {
        const img = await createImageFrom(imgSrc);
        const c = document.createElement("canvas")
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        //Make the image visible
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] > 0 && data[i + 1] > 0 && data[i + 2] > 100 && data[i + 3] > 0) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;

            } else {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;

            }
            data[i + 3] = 255;
        }

        //Remove Noise from Image
        let imgdata = new Uint32Array(data.buffer);
        await removeNoiseUsingImageData(imgdata, c.width, c.height, 1);

        ctx.putImageData(imageData, 0, 0);

        let imageDataURI = await toDataURL(c);
        return splitImage(imageDataURI);
    }

    async function splitImageUsingOCRAntibotHighValues(imgSrc) {
        const img = await createImageFrom(imgSrc);
        const c = document.createElement("canvas")
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        //Make the image visible

        for (let i = 0; i < data.length; i += 4) {

            if ((data[i] > 100 || data[i + 1] > 100 || data[i + 2] > 100) && data[i + 3] > 0) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;

            } else {

                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            }
            data[i + 3] = 255;
        }

        //Remove Noise from Image
        let imgdata = new Uint32Array(data.buffer);
        await removeNoiseUsingImageData(imgdata, c.width, c.height, 1);

        ctx.putImageData(imageData, 0, 0);

        let imageDataURI = await toDataURL(c);

        return splitImage(imageDataURI);

    }

    async function splitImage(imgSrc) {
        const img = await createImageFrom(imgSrc);
        const c = document.createElement("canvas")
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        //Scan from left to right
        //Get the weight of white spaces
        //Ignore first white space and last white space
        let sequenceLength = 0;
        let prevColumn = 0;
        let first = 0;
        let second = 0;
        let third = 0;
        let firstMaxColumn = 0;
        let secondMaxColumn = 0;
        let thirdMaxColumn = 0;

        //Remove Noise from Image
        let imgdata = new Uint32Array(data.buffer);
        imgdata = await removeNoiseUsingImageData(imgdata, c.width, c.height, 1);

        for (let column = Math.floor(0.1 * c.width); column < c.width; column++) {
            let count = 0;
            for (let row = 0; row < c.height; row++) {
                const position = row * c.width + column;
                const pixelAtPosition = imgdata[position];

                if (pixelAtPosition == 0xFFFFFFFF) {
                    count++;
                }
            }

            //Get the blank spaces based on weight of the column
            if (count > Math.floor(0.88 * c.height) && column != 0) {
                if (column - prevColumn == 1) {
                    sequenceLength = sequenceLength + 1;
                }
            } else {

                if ((column - sequenceLength != 1) && (column != 0 || sequenceLength != 0 || column != c.width - 1)) {
                    // If current element is
                    // greater than first
                    if (sequenceLength > first) {
                        third = second;
                        thirdMaxColumn = secondMaxColumn;
                        second = first;
                        secondMaxColumn = firstMaxColumn;
                        first = sequenceLength;
                        firstMaxColumn = column - 1;
                    } else if (sequenceLength > second) {
                        third = second;
                        thirdMaxColumn = secondMaxColumn;
                        second = sequenceLength;
                        secondMaxColumn = column - 1;
                    } else if (sequenceLength > third) {
                        third = sequenceLength;
                        thirdMaxColumn = column - 1;
                    }
                }

                sequenceLength = 0;
            }

            prevColumn = column;
        }

        firstMaxColumn = firstMaxColumn - Math.floor(first / 2)
        secondMaxColumn = secondMaxColumn - Math.floor(second / 2)
        thirdMaxColumn = thirdMaxColumn - Math.floor(third / 2)

        let columnArray = [firstMaxColumn, secondMaxColumn, thirdMaxColumn];
        columnArray = columnArray.sort(function (a, b) {
            return a - b;
        });

        imageData.data.set(imgdata);
        ctx.putImageData(imageData, 0, 0);

        let url = await questionImage.src.replace(/^data:image\/\w+;base64,/, "");
        let buffer = new Buffer(url, 'base64');
        //Check if overlaps are detected and split the images
        const len = [];
        len[0] = columnArray[0] - 0;
        len[1] = columnArray[1] - columnArray[0];
        len[2] = columnArray[2] - columnArray[1];
        len[3] = c.width - columnArray[2];

        for (const element of len) {
            if (element < Math.floor(0.1 * c.width)) {
                console.warn(`${MODULE_LOG_PREFIX}: Overlap detected`);
                return;
            }
        }

        await new Promise((resolve, _reject) => {

            Jimp.read(buffer).then(async function (imgData) {
                imgData.crop(0, 0, columnArray[0], questionImage.height)
                    .getBase64(Jimp.AUTO, async function (_err, src) {
                        const newImage = await createImageFrom(src);
                        questionImages[0] = newImage;
                        resolve();
                    })
            });
        });

        await new Promise((resolve, _reject) => {
            Jimp.read(buffer).then(async function (imgData) {
                imgData.crop(columnArray[0], 0, columnArray[1] - columnArray[0], questionImage.height)
                    .getBase64(Jimp.AUTO, async function (_err, src) {
                        const newImage = await createImageFrom(src);
                        questionImages[1] = newImage;
                        resolve();
                    })
            });
        });

        await new Promise((resolve, _reject) => {
            Jimp.read(buffer).then(async function (imgData) {
                imgData.crop(columnArray[1], 0, columnArray[2] - columnArray[1], questionImage.height)
                    .getBase64(Jimp.AUTO, async function (_err, src) {
                        const newImage = await createImageFrom(src);
                        questionImages[2] = newImage;
                        resolve();
                    })
            });
        });

        await new Promise((resolve, _reject) => {
            Jimp.read(buffer).then(async function (imgData) {
                imgData.crop(columnArray[2], 0, c.width - columnArray[2], questionImage.height)
                    .getBase64(Jimp.AUTO, async function (_err, src) {
                        const newImage = await createImageFrom(src);
                        questionImages[3] = newImage;
                        resolve();
                    })
            });
        });
    }

    async function imageUsingOCRAntibotQuestion1(image) {

        if (!image || !image.src) {
            console.warn(`${MODULE_LOG_PREFIX}: No images found`);
            return;
        }

        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = image.width;
        c.height = image.height;
        const ctx = c.getContext("2d");
        ctx.filter = 'grayscale(1)';
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        ctx.putImageData(imageData, 0, 0);

        const src = imread(c);
        const dst = new Mat();

        medianBlur(src, dst, 3)
        imshow(c, dst);

        src.delete();
        dst.delete();

        let imageDataURI = await toDataURL(c);

        return OCR(worker, imageDataURI);
    }

    async function imageUsingOCRAntibot1(image) {
        const img1 = image;

        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = img1.width;
        c.height = img1.height;
        const ctx = c.getContext("2d");

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        let hashMap = new Map();

        for (let i = 0; i < data.length; i += 4) {

            const rgba = data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3];

            if (hashMap.has(rgba)) {
                hashMap.set(rgba, hashMap.get(rgba) + 1)
            } else {
                hashMap.set(rgba, 1)
            }

        }

        for (let i = 0; i < data.length; i += 4) {

            if (data[i + 3] > 130 && data[i] < 100 && data[i + 1] < 100 && data[i + 2] < 100) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 255;

            } else {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;

            }
        }

        ctx.putImageData(imageData, 0, 0);
        let imageDataURI = await toDataURL(c);

        return OCR(worker, imageDataURI);
    }

    async function imageUsingOCRAntibotFiltered(image) {
        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = image.width;
        c.height = image.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 130 && data[i] < 100) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        let src = imread(c);
        let dst = new Mat();
        let M = Mat.ones(2, 1, CV_8U);
        let anchor = new Point(-1, -1);

        // Opening , remove small particles from image
        morphologyEx(src, dst, MORPH_OPEN, M, anchor, 1,
            BORDER_CONSTANT, morphologyDefaultBorderValue());
        imshow(c, dst);

        //Image erode, thinning the text
        src = imread(c);
        M = Mat.ones(2, 1, CV_8U);
        erode(src, dst, M, anchor, 1, BORDER_CONSTANT, morphologyDefaultBorderValue());
        imshow(c, dst);

        src.delete();
        dst.delete();
        M.delete();

        let imageDataURI = await toDataURL(c);
        return OCR(worker, imageDataURI);

    }

    async function imageUsingOCRAntibotFiltered1(image) {
        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = image.width;
        c.height = image.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 130 && data[i] > 70) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 255;
            }

        }

        ctx.putImageData(imageData, 0, 0);

        let src = imread(c);
        let dst = new Mat();
        let M = Mat.ones(2, 1, CV_8U);
        let anchor = new Point(-1, -1);

        // Opening morphology, remove noise from image
        morphologyEx(src, dst, MORPH_OPEN, M, anchor, 1,
            BORDER_CONSTANT, morphologyDefaultBorderValue());
        imshow(c, dst);

        //Image erode
        src = imread(c);
        M = Mat.ones(2, 1, CV_8U);
        erode(src, dst, M, anchor, 1, BORDER_CONSTANT, morphologyDefaultBorderValue());
        imshow(c, dst);
        src.delete();
        dst.delete();
        M.delete();

        let imageDataURI = await toDataURL(c);

        return OCR(worker, imageDataURI);

    }

    async function imageUsingOCRAntibot(image) {
        const img = await createImageFrom(image.src);
        const c = document.createElement("canvas")
        c.width = image.width;
        c.height = image.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imageData.data;

        let hashMap = new Map();

        for (let i = 0; i < data.length; i += 4) {

            const rgba = data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3];

            if (hashMap.has(rgba)) {
                hashMap.set(rgba, hashMap.get(rgba) + 1)
            } else {
                hashMap.set(rgba, 1)
            }
        }

        let maxCount = 0;
        let objectKey = "0,0,0,0";
        hashMap.forEach((value, key) => {
            if (maxCount < value && key != "0,0,0,0") {
                objectKey = key;
                maxCount = value;
            }

        });

        let alphaValues = objectKey.split(",");
        let alpha = Number(alphaValues[alphaValues.length - 1]);

        let data_tmp = [];

        for (let i = 0; i < data.length; i += 4) {

            if (data[i + 3] == alpha) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;
                //Giving some value for representation
                data_tmp[i] = 1;
                data_tmp[i + 1] = 1;
                data_tmp[i + 2] = 1;


            } else if (data[i + 3] > 0) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 255;

            } else {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;

            }
        }


        //Fill if the adjacent value was present earlier
        for (let k = 0; k < 20; k++) {
            for (let i = 4; i < data.length; i += 4) {

                if (data[i] == 0 && data_tmp[i - 4] == 1) {
                    data[i - 4] = 0;
                    data[i - 3] = 0;
                    data[i - 2] = 0;
                    data[i - 1] = 255;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        let imageDataURI = await toDataURL(c);

        return OCR(worker, imageDataURI);
    }

    // Compare similar strings
    function LevenshteinDistance(a, b) {
        if (a.length == 0) {
            return b.length;
        }
        if (b.length == 0) {
            return a.length;
        }

        const matrix = [];

        // increment along the first column of each row
        let i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        let j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }

        return matrix[b.length][a.length];
    };

    function countPairs(s1, s2) {
        let n1 = s1.length;
        let n2 = s2.length;

        // To store the frequencies of
        // characters of string s1 and s2
        let freq1 = new Array(26);
        let freq2 = new Array(26);
        freq1.fill(0);
        freq2.fill(0);

        // To store the count of valid pairs
        let i, count = 0;

        // Update the frequencies of
        // the characters of string s1
        for (i = 0; i < n1; i++) {
            freq1[s1[i].charCodeAt() - 'a'.charCodeAt()]++;
        }

        // Update the frequencies of
        // the characters of string s2
        for (i = 0; i < n2; i++) {
            freq2[s2[i].charCodeAt() - 'a'.charCodeAt()]++;
        }

        // Find the count of valid pairs
        for (i = 0; i < 26; i++) {
            count += (Math.min(freq1[i], freq2[i]));
        }

        return count;
    }

    async function getFinalOCRResultFromImage(image, leastLength) {
        let ocrResult = "";
        let tempResult = "";
        ocrResult = await imageUsingOCRAntibotLowValues(image);

        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim();
        } else {
            ocrResult = await imageUsingOCRAntibotHighValues(image);
        }

        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim();
        } else {
            ocrResult = await OCR(worker, image);
        }


        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim();
        } else {
            ocrResult = await imageUsingOCRAntibotQuestion(image);
        }

        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim();
        } else {
            ocrResult = await imageUsingOCRAntibotQuestion1(image);
        }


        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim()
        } else {
            ocrResult = await imageUsingOCRAntibot(image)
        }


        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim()
        } else {
            ocrResult = await imageUsingOCRAntibot1(image);
        }

        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim()
        } else {
            ocrResult = await imageUsingOCRAntibotFiltered(image)
        }

        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim()
        } else {
            ocrResult = await imageUsingOCRAntibotFiltered1(image)
        }

        if (ocrResult.length > leastLength || ocrResult.length > tempResult.length) {
            tempResult = ocrResult.trim()
        }

        ocrResult = tempResult;

        return ocrResult;


    }

    async function solverImpl() {

        let answerSelector = "";
        let questionSelector = "";
        let addCount = 0;
        let leastLength = 0;

        if (document.querySelectorAll(".modal-content [href='/'] img").length == 4 && document.querySelectorAll(".modal-content img").length >= 5) {
            questionSelector = ".modal-content img";
            answerSelector = ".modal-content [href='/'] img";
        } else if (document.querySelector(".modal-header img") && document.querySelectorAll(".modal-body [href='/'] img").length == 4) {
            questionSelector = ".modal-header img";
            answerSelector = ".modal-body [href='/'] img";
        } else if (document.querySelector(".alert.alert-info img") && document.querySelectorAll(".antibotlinks [href='/'] img").length == 4) {
            questionSelector = ".alert.alert-info img";
            answerSelector = ".antibotlinks [href='/'] img";
        } else {
            console.warn(`${MODULE_LOG_PREFIX}: AB links were not detected`);
            return;
        }

        for (const _element of document.querySelectorAll(answerSelector)) {
            if (document.querySelector(answerSelector).width <= document.querySelector(answerSelector).height) {
                 //Using this as reference to move to next url
                document.querySelector(answerSelector).value = "####";
                console.warn(`${MODULE_LOG_PREFIX}: Numeric/Roman captcha Detected , captcha cannot be solved at the moment`);
                console.warn(`${MODULE_LOG_PREFIX}: Reload the page to see if the captcha changes`);
                //   solveNumberCaptchaByAnswer()
                return;
            }
        }

        if (document.querySelector(questionSelector).width < 5 * document.querySelector(questionSelector).height) {
             //Using this as reference to move to next url
            document.querySelector(answerSelector).value = "####";
            console.warn(`${MODULE_LOG_PREFIX}: Numeric/Roman captcha Detected , captcha cannot be solved at the moment`);
            console.warn(`${MODULE_LOG_PREFIX}: Reload the page to see if the captcha changes`);
            //  solveNumberCaptchaByQuestion()
            return;
        }

        if (document.querySelector(questionSelector).width < 10 * document.querySelector(questionSelector).height) {
            leastLength = 2;
        } else {
            leastLength = 3;
        }

        console.log(`${MODULE_LOG_PREFIX}: Solving Ab Links...`);

        if (!document.querySelector(questionSelector) || !document.querySelector(questionSelector).src) {
            //Using this as reference to move to next url
            document.querySelector(answerSelector).value = "####";
            console.warn(`${MODULE_LOG_PREFIX}: No image source found for question`);

            return
        }

        questionImage = document.querySelector(questionSelector);
        questionImageSource = document.querySelector(questionSelector).src;
        await waitForImage(questionImage);
        let optionImages = [];

        for (let i = 0; i < 4; i++) {
            optionImages[i] = document.querySelectorAll(answerSelector)[i + addCount];
        }

        let questionSolution = await imageUsingOCRAntibotLowValues(questionImage);
        questionSolution = questionSolution.replace(/,$/, "");

        if (!questionSolution || !questionSolution.includes(",") || questionSolution.split(",").length != 4) {
            questionSolution = await imageUsingOCRAntibotHighValues(questionImage);
            questionSolution = questionSolution.replace(/,$/, "");
        }

        if (!questionSolution || !questionSolution.includes(",") || questionSolution.split(",").length != 4) {
            questionSolution = await OCR(worker, questionImage);
            questionSolution = questionSolution.replace(/,$/, "");
        }

        if (!questionSolution || !questionSolution.includes(",") || questionSolution.split(",").length != 4) {
            questionSolution = await imageUsingOCRAntibotQuestion(questionImage);
            questionSolution = questionSolution.replace(/,$/, "");
        }


        if (!questionSolution || !questionSolution.includes(",") || questionSolution.split(",").length != 4) {

            await splitImageUsingDefaultValues(questionImageSource);

            if (questionImages.length < 4) {
                questionImages = [];
                await splitImageUsingOCRAntibotLowValues(questionImageSource);
            }


            if (questionImages.length < 4) {
                questionImages = [];
                await splitImageUsingOCRAntibotHighValues(questionImageSource);
            }


            if (questionImages.length < 4) {
                 //Using this as reference to move to next url
                document.querySelector(answerSelector).value = "####";
                console.warn(`${MODULE_LOG_PREFIX}: Captcha cannot be solved`);
                return;
            }

            for (let i = 0; i < 4; i++) {

                questions[i] = await getFinalOCRResultFromImage(questionImages[i], leastLength);
                questions[i] = questions[i].replaceAll("5", "s").replaceAll("3", "e").replaceAll(",", "")
                    .replaceAll("8", "b").replaceAll("1", "l").replaceAll("@", "a").replaceAll("*", "").replaceAll("9", "g")
                    .replaceAll("!", "i").replaceAll("0", "o").replaceAll("4", "a").replaceAll("2", "z").toLowerCase();

            }
        } else {
            questionSolution = questionSolution.toLowerCase();
            questionSolution = questionSolution.replaceAll("5", "s").replaceAll("3", "e")
                .replaceAll("8", "b").replaceAll("1", "l").replaceAll("@", "a").replaceAll("*", "").replaceAll("9", "g")
                .replaceAll("!", "i").replaceAll("0", "o").replaceAll("4", "a").replaceAll("2", "z").toLowerCase();
            questions = questionSolution.split(',');
        }

        leastLength = 1000;
        for (let i = 0; i < 4; i++) {
            if (questions[i].length < leastLength) {
                leastLength = questions[i].length;
            }
        }

        leastLength = leastLength - 1;

        let answers = [];

        for (let i = 0; i < 4; i++) {
            answers[i] = await getFinalOCRResultFromImage(optionImages[i], leastLength);
            answers[i] = answers[i].replaceAll("5", "s").replaceAll("3", "e")
                .replaceAll("8", "b").replaceAll("1", "l").replaceAll("@", "a").replaceAll("9", "g")
                .replaceAll("!", "i").replaceAll("0", "o").replaceAll("4", "a").replaceAll("2", "z").toLowerCase();

        }

        await worker.terminate();

        let length = questions.length;

        if (length == 4) {

            let map = new Map();
            for (let i = 0; i < length; i++) {
                questions[i] = questions[i].replaceAll(",", "").replaceAll(" ", "").trim();
                for (let j = 0; j < length; j++) {
                    let score = "";
                    answers[j] = answers[j].replaceAll(",", "").replaceAll(" ", "").trim();
                    score = LevenshteinDistance(questions[i], answers[j]);
                    map.set(questions[i] + "::" + answers[j], score);
                }
            }

            map[Symbol.iterator] = function* () {
                yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
            }

            let tempMap = new Map();
            let finalMap = new Map();
            let preValue = "";
            let count = 0;
            for (let [key, value] of map) {
                count = count + 1;
                //Sort by same score
                if (!preValue) {
                    preValue = value;
                    tempMap.set(key, value)
                    continue;
                }

                if (preValue == value) {
                    tempMap.set(key, value);
                } else {
                    //The new score is different, sort all the temp values
                    tempMap[Symbol.iterator] = function* () {
                        yield* [...this.entries()].sort((a, b) => a[0] - b[0]);
                    }

                    finalMap = new Map([...finalMap, ...tempMap]);
                    tempMap = new Map();
                    tempMap.set(key, value)
                    preValue = value;
                }

                if (count == map.size) {
                    tempMap.set(key, value);
                    tempMap[Symbol.iterator] = function* () {
                        yield* [...this.entries()].sort((a, b) => a[0] - b[0]);
                    }

                    finalMap = new Map([...finalMap, ...tempMap]);
                }

            }

            let questionAnswerMap = new Map();
            let answerSet = new Set();
            let prevKey = "";
            map = finalMap;
            for (let [key] of map) {
                if (!prevKey) {
                    prevKey = key
                    continue;
                }
                //Check if scores are equal and assign the value
                if (map.get(prevKey) == map.get(key) && prevKey.split("::")[0] == key.split("::")[0] && !answerSet.has(prevKey.split("::")[1]) &&
                    !answerSet.has(key.split("::")[1]) && !questionAnswerMap.has(prevKey.split("::")[0]) && !questionAnswerMap.has(key.split("::")[0])) {
                    const prevCount = countPairs(prevKey.split("::")[1], prevKey.split("::")[0]);
                    const currCount = countPairs(key.split("::")[1], key.split("::")[0]);

                    if (prevCount > currCount) {
                        key = prevKey;
                    } else {
                        prevKey = key;
                    }
                } else {
                    if (!questionAnswerMap.has(prevKey.split("::")[0]) && !answerSet.has(prevKey.split("::")[1])) {
                        questionAnswerMap.set(prevKey.split("::")[0], prevKey.split("::")[1]);
                        answerSet.add(prevKey.split("::")[1]);
                    }
                    prevKey = key;
                }
            }

            if (questionAnswerMap.size == 3 && !questionAnswerMap.has(prevKey.split("::")[0]) && !answerSet.has(prevKey.split("::")[1])) {
                questionAnswerMap.set(prevKey.split("::")[0], prevKey.split("::")[1]);
                answerSet.add(prevKey.split("::")[1]);
            }

            let answersMap = new Map();

            for (let i = 0; i < length; i++) {
                answersMap.set(answers[i], i);
            }

            //Selecting the Answers
            for (let i = 0; i < length; i++) {
                let ans = questionAnswerMap.get(questions[i]);
                let j = answersMap.get(ans);
                console.log(`${MODULE_LOG_PREFIX}: Answer for ${questions[i]}:: ${answers[j]}`);
                if (document.querySelectorAll(answerSelector)[j + addCount]) {
                    document.querySelectorAll(answerSelector)[j + addCount].click();
                } else {
                    console.warn(`${MODULE_LOG_PREFIX}: Answer Selector could not be identified`);
                }
            }

        }
    }

    setTimeout(solverImpl, timeout);
}

export default solver;
