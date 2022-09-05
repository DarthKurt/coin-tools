import { PSM, Worker } from 'tesseract.js';

export default class OCR {

    private readonly _logprefix = "[AB links OCR]";

    constructor(private readonly _worker: Worker) {
    }




    public async initWorker() {
        try {
            await this._worker.load();
            await this._worker.loadLanguage('eng');
            await this._worker.initialize('eng');
            await this._worker.setParameters({
                tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
                preserve_interword_spaces: '1',
                tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,@!*-',
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error(`${this._logprefix}: ${error.message}`);
            }
            await this._worker.terminate();
            throw error;
        }

    }

    public async detect(img: string): Promise<string | null> {
        try {
            const result = await this._worker.recognize(img);
            return result.data.text.trim();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`${this._logprefix}: ${error.message}`);
            }
            await this._worker.terminate();
            throw error;
        }
    }
}